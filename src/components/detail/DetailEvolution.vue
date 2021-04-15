<template>
  <div class="text-body1">
    <!-- first -->
    <!-- <span v-if="evolutions.species">
      {{ evolutions.species.name.toUpperCase() }}
    </span> -->

    <div v-for="(evolution, index) in evolutions.evolves_to" :key="index">
      <!-- next evolutions -->
      {{ evolution.species.name.toUpperCase() }}

      <!-- more evolutions -->
      <div
        v-for="(evolution2, index) in evolution.evolves_to"
        :key="`${index}-2`"
      >
        {{ evolution2.species.name.toUpperCase() }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    id: Number
  },

  data: () => ({
    evolutions: []
  }),

  mounted() {
    this.getPokemonSpecies();
  },

  methods: {
    async getPokemonSpecies() {
      await axios({
        method: "get",
        url: `https://pokeapi.co/api/v2/pokemon-species/${this.id}/`
      }).then(response => {
        this.getEvolutionChain(response.data.evolution_chain.url);
      });
    },

    async getEvolutionChain(url) {
      await axios({
        method: "get",
        url: url
      }).then(response => {
        this.evolutions = response.data.chain;
      });
    },

    async getPokemon(pokemonName) {
      await axios({
        method: "get",
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
      }).then(response => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`;
      });
    }
  },

  watch: {
    id() {
      this.getPokemonSpecies();
    }
  }
};
</script>
