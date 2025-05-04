<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen">
    <div class="fixed w-full bg-white dark:bg-gray-800 p-6 relative">

      <div class="flex items-center justify-between mb-6">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Al Qur'an</span>
            <img class="h-11 w-auto" src="/logo.svg" alt="Logo">
          </a>
        </div>

        <!-- Judul -->
        <div class="text-3xl font-bold text-center flex-1 p-3 mt-5 md:mt-0">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Pencarian Surah Al-Qur'an
          </span>
        </div>

        <!-- Tombol Dark Mode -->
        <button @click="toggleDarkMode" class="text-gray-900 dark:text-white focus:outline-none">
          <span v-if="isDarkMode">
            <!-- Icon Matahari -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414-1.414M18.364 18.364l-1.414-1.414M6.05 6.05L4.636 7.464M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          </span>
          <span v-else>
            <!-- Icon Bulan -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          </span>
        </button>
      </div>

      <div class="sticky top-0 z-50 bg-white dark:bg-gray-800 py-3 mt-4 md:mt-0">
        <input v-model="searchQuery" type="text" placeholder="Cari nama surat..."
          class="w-full max-w-lg mx-auto block px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700" />
      </div>

      <div class="mt-6 max-w-lg mx-auto space-y-3">
        <a @click.prevent="openSurah(surah.no)" v-for="surah in filteredSurahs" :key="surah.no"
          class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md flex justify-between cursor-pointer">
          <span class="text-gray-900 dark:text-white">{{ surah.name }}</span>
          <span class="font-semibold text-blue-600 dark:text-blue-400">Surat ke-{{ surah.no }}</span>
        </a>

        <div v-if="filteredSurahs.length === 0" class="text-center text-gray-500 mt-4">
          Tidak ditemukan
        </div>
      </div>
    </div>

    <!-- Offcanvas -->
    <div v-if="showOffcanvas"
      class="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-800 shadow-lg py-4 border-t border-gray-300 dark:border-gray-700">
      <button @click="closeOffcanvas" class="absolute top-2 right-4 text-gray-900 dark:text-white">
        ✕
      </button>
      <div class="relative w-full h-96 mt-6 mb-7">
        <!-- Loading Indicator -->
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <span class="text-gray-500 dark:text-gray-400">Loading...</span>
        </div>
        <!-- Iframe -->
        <iframe :src="`https://quran.com/id/${selectedSurah}`"
          class="w-full h-full border border-gray-300 dark:border-gray-700" frameborder="0"
          @load="onIframeLoad"></iframe>
      </div>
    </div>
  </div>

  <footer
    class="pl-5 fixed bottom-0 left-0 w-full flex justify-between items-center py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm shadow">
    <div class="text-center">
      © 2025 <span
        class="text-blue-600 dark:text-blue-400 hover:underline">Irfannurf</span>, Thanks to <a href="https://quran.com"
        target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">Quran.com</a>
    </div>
    <div class="flex space-x-4 pr-4">
      <!-- YouTube Icon -->
      <a href="https://www.youtube.com/@RockyDrive" target="_blank"
        class="text-gray-600 dark:text-gray-400 hover:text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M23.498 6.186a2.99 2.99 0 00-2.105-2.11C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.393.576a2.99 2.99 0 00-2.105 2.11C0 8.08 0 12 0 12s0 3.92.502 5.814a2.99 2.99 0 002.105 2.11C4.5 20.5 12 20.5 12 20.5s7.5 0 9.393-.576a2.99 2.99 0 002.105-2.11C24 15.92 24 12 24 12s0-3.92-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
        </svg>
      </a>
      <!-- GitHub Icon -->
      <a href="https://github.com/irfannur" target="_blank"
        class="text-gray-600 dark:text-gray-400 hover:text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.263.793-.587v-2.17c-3.338.725-4.037-1.613-4.037-1.613-.55-1.387-1.338-1.756-1.338-1.756-1.087-.75.088-.725.088-.725 1.2.088 1.837 1.238 1.837 1.238 1.075 1.837 2.825 1.3 3.513.988.113-.775.425-1.3.775-1.6-2.662-.3-5.462-1.337-5.462-5.962 0-1.312.475-2.387 1.237-3.237-.125-.3-.537-1.512.113-3.15 0 0 1.012-.325 3.3 1.237.962-.263 2-.4 3.037-.4 1.037 0 2.075.137 3.037.4 2.287-1.562 3.3-1.237 3.3-1.237.65 1.638.238 2.85.113 3.15.762.85 1.237 1.925 1.237 3.237 0 4.637-2.8 5.662-5.462 5.962.437.375.825 1.112.825 2.237v3.312c0 .325.2.7.8.587C20.563 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </a>
      <!-- GitLab Icon -->
      <a href="https://gitlab.com/irfannur238" target="_blank"
        class="text-gray-600 dark:text-gray-400 hover:text-orange-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M22.453 12.934l-2.1-6.463c-.2-.6-.8-.988-1.4-.988-.6 0-1.2.388-1.4.988l-1.5 4.612H8.447l-1.5-4.612c-.2-.6-.8-.988-1.4-.988-.6 0-1.2.388-1.4.988l-2.1 6.463c-.2.6 0 1.238.5 1.625l9.05 6.825c.4.3 1 .3 1.4 0l9.05-6.825c.5-.387.7-1.025.5-1.625z" />
        </svg>
      </a>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { surahs } from './data/surahs';

const searchQuery = ref('');
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');
const showOffcanvas = ref(false);
const selectedSurah = ref(null);
const isLoading = ref(true); // State untuk loading indikator

// Filter pencarian surah
const filteredSurahs = computed(() =>
  surahs.filter(surah =>
    surah.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

// Fungsi toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', isDarkMode.value);
};

// Fungsi untuk membuka offcanvas
const openSurah = (surahNo) => {
  selectedSurah.value = surahNo;
  showOffcanvas.value = true;
  isLoading.value = true; // Tampilkan loading saat iframe dimuat
};

// Fungsi untuk menutup offcanvas
const closeOffcanvas = () => {
  showOffcanvas.value = false;
};

// Fungsi untuk menyembunyikan loading setelah iframe selesai dimuat
const onIframeLoad = () => {
  isLoading.value = false;
};

// Tambahkan class dark ke body saat nilai berubah
watch(isDarkMode, (newVal) => {
  document.body.classList.toggle('dark', newVal);
});

// Inisialisasi class dark saat pertama kali mount
onMounted(() => {
  document.body.classList.toggle('dark', isDarkMode.value);
});
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
