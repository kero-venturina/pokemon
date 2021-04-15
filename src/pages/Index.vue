<template>
  <div>
    <!-- tablet/mobile view -->
    <mobile-base v-if="$q.screen.width < 769" />

    <!-- desktop view -->
    <desktop-base v-if="$q.screen.width > 768" />
  </div>
</template>

<script>
export default {
  components: {
    "mobile-base": () => import("components/mobile/MobileBase"),
    "desktop-base": () => import("components/desktop/DesktopBase")
  }
};
</script>
