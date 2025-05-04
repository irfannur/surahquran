<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen">
    <div class="bg-white dark:bg-gray-800 p-6 relative">

      <div class="flex items-center justify-between mb-6">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Al Qur'an</span>
            <img class="h-11 w-auto" src="/logo.svg" alt="Logo">
          </a>
        </div>

        <!-- Judul -->
        <div class="text-3xl font-bold text-center flex-1 p-3">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Pencarian Surat Al-Qur'an
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
      <!-- <h1 class="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Pencarian Surat Al-Qur'an</h1> -->

      <input v-model="searchQuery" type="text" placeholder="Cari nama surat..."
        class="w-full max-w-lg mx-auto block px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700" />

      <div class="mt-6 max-w-lg mx-auto space-y-3">
        <div v-for="surah in filteredSurahs" :key="surah.no"
          class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md flex justify-between">
          <span class="text-gray-900 dark:text-white">{{ surah.name }}</span>
          <span class="font-semibold text-blue-600 dark:text-blue-400">Surat ke-{{ surah.no }}</span>
        </div>

        <div v-if="filteredSurahs.length === 0" class="text-center text-gray-500 mt-4">
          Tidak ditemukan
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { surahs } from './data/surahs';

const searchQuery = ref('');
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');

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
