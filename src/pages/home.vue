<script setup lang="ts">
import primaryBox from '../components/primary-box.vue'
import Navbar from '../components/navbar.vue'
</script>

<template>
  <navbar />
  <div class="flex flex-col items-center gap-24 p-0 py-16">
    <div class="flex w-3/4 flex-col items-start px-8">
      <h1 class="mb-4 text-6xl font-semibold leading-[72px] tracking-tight text-gray-900">
        The Ultimate Quiz Platform <br />
        for Software Engineers
      </h1>
      <span class="mb-8 text-xl font-normal leading-8 text-gray-600"
        >Sharpen Your Coding and Design Skills with <br />
        our Engaging and Challenging Quizzes</span
      >
      <router-link to="/register">
        <primary-box>Sign up now and level up your skills!</primary-box>
      </router-link>
    </div>
  </div>
</template>
