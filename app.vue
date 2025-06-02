<script setup>
// const configAppStore = useUserConfigAppStore();

// const { configApps } = storeToRefs(configAppStore);
// const logo = computed(() => configApps.value?.logo || '/seav_logo.ico');

// useHead({
//   link: [
//     {
//       rel: 'icon',
//       type: 'image/png',
//       href: logo
//     }
//   ]
// })
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
