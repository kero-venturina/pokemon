<template>
  <div class="text-center">
    <q-img
      :width="getResponsiveWidth()"
      src="https://cdn.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png"
    />
    <div
      class="q-mb-sm text-h5 text-vt"
      :class="[
        { 'text-white': $q.screen.width > 768 },
        { 'text-dark': $q.screen.width < 769 }
      ]"
    >
      Discover all {{ numeral(count).format("0,0") }} pokemons!
    </div>
  </div>
</template>

<script>
import axios from "axios";
import numeral from "numeral";

export default {
  data: () => ({
    count: 0
  }),

  mounted() {
    this.countDocuments();
  },

  methods: {
    numeral,
    async countDocuments() {
      await axios({
        method: "get",
        url: `https://pokeapi.co/api/v2/pokemon`
      }).then(async response => {
        this.count = response.data.count;
      });
    },

    getResponsiveWidth() {
      if (this.$q.screen.width > 768) {
        return "256px";
      } else {
        return "196px";
      }
    }
  }
};
</script>
