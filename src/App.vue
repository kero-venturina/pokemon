<template>
  <div id="q-app">
    <q-layout view="lHh lpR fff">
      <q-page-container>
        <q-page class="q-mx-auto" style="max-width: 1080px;">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>
