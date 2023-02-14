<script setup lang="ts">
import primaryBox from '../components/primary-box.vue'
</script>

<template>
  <div class="w-full border border-b-gray-100 bg-white">
    <div class="flex flex-col items-center justify-center p-0">
      <div class="flex w-full items-center justify-between px-8 py-4">
        <div class="flex items-center gap-8">
          <router-link to="/" class="text-base font-semibold capitalize leading-6 text-gray-600"
            >home</router-link
          >
        </div>
        <div class="flex items-center gap-8">
          <router-link to="/login" class="font-bold capitalize text-primary-600">
            login
          </router-link>
          <router-link to="/register">
            <primary-box>sign up</primary-box>
          </router-link>
        </div>
      </div>
    </div>
  </div>
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
