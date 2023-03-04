<script setup lang="ts">
import { ref } from 'vue'
import Tabs from '../components/tabs/tabs.vue'
import tabsHeader from '../components/tabs/tabs-header.vue'
import tabsItem from '../components/tabs/tabs-item.vue'
import TabsContent from '../components/tabs/tabs-content.vue'
import UpdateDetails from '../components/update-details.vue'
import UpdatePassword from '../components/update-password.vue'
import Tab from '../components/tabs/tab.vue'
import { AuthStatus, useAuthStore } from '../store/auth'

const { auth } = useAuthStore()
const selectedTabId = ref('details_tab')
</script>

<template>
  <div
    class="mx-auto mt-10 flex w-full max-w-5xl flex-col items-center gap-10 border border-purple-100 bg-purple-50 p-10"
    v-if="auth.status === AuthStatus.loggedIn"
  >
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold capitalize text-gray-800">Update profile</h1>
      <span class="text-sm font-semibold text-gray-600">Update Your Information and Settings</span>
    </div>
    <tabs v-model:selected-tab-id="selectedTabId">
      <tabs-header>
        <tabs-item tab-id="details_tab">update account details</tabs-item>
        <tabs-item tab-id="email_tab">update email</tabs-item>
        <tabs-item tab-id="password_tab">update password</tabs-item>
      </tabs-header>
      <tabs-content>
        <tab tab-id="details_tab">
          <update-details />
        </tab>
        <tab tab-id="email_tab"> update email </tab>
        <tab tab-id="password_tab">
          <update-password />
        </tab>
      </tabs-content>
    </tabs>
  </div>
</template>
