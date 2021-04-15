<template>
  <div
    v-if="Object.keys(document).length"
    class="fullscreen text-center text-vt"
    :style="`background: ${backgroundColor};`"
  >
    <div
      style="height: 150px; width: 100%;"
      class="text-left q-pa-md text-body1 text-white text-weight-bold"
      @click="$emit('mode-read')"
    >
      <q-btn rounded no-caps :ripple="false" color="white" class="q-px-sm">
        <q-icon name="arrow_left" color="dark" class="q-mr-sm"></q-icon>
        <span class="text-dark">
          Back
        </span>
      </q-btn>
    </div>

    <q-card
      flat
      class="border text-center bg-white"
      style="height: 100%; border-radius: 40px 40px 0 0"
    >
      <!-- image -->
      <img
        class="q-mx-auto"
        :src="
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${document.id}.png`
        "
        style=" width: 196px; margin-top: -115px;"
      />

      <!-- number -->
      <div class="row text-center">
        <div class="q-mx-auto row">
          <img
            style="width: 24px;"
            src="https://veekun.com/dex/media/items/poke-ball.png"
            alt=""
          />
          <div class="q-my-auto q-ml-xs text-body1 text-weight-medium">
            No. {{ getDocumentId() }}
          </div>
        </div>
      </div>

      <!-- name -->
      <div class="text-h4 text-space text-grey-9 text-weight-bolder q-mb-sm">
        {{ document.name.toUpperCase() }}
      </div>

      <!-- button groups -->
      <div class="q-mb-md">
        <common-button-group
          :mode="mode"
          @mode-stats="mode = 'stats'"
          @mode-damage="mode = 'damage'"
          @mode-moves="mode = 'moves'"
        />
      </div>

      <!-- type -->
      <template v-if="mode == 'stats'">
        <q-separator inset></q-separator>
        <div class="row text-h6 text-grey-8 q-mx-lg q-my-xs">
          <div class="col-4 text-left">TYPE</div>
          <div class="q-my-auto">
            <img
              style="width: 42px;"
              class="q-mr-sm q-mt-sm"
              :src="`https://veekun.com/dex/media/types/en/fire.png`"
            />
            <img
              style="width: 42px;"
              class="q-mt-sm"
              :src="`https://veekun.com/dex/media/types/en/flying.png`"
            />
          </div>
        </div>

        <!-- height -->
        <q-separator inset></q-separator>

        <div class="row text-h6 text-grey-8 q-mx-lg q-my-xs">
          <div class="col-4 text-left">HEIGHT</div>
          <div>{{ document.height / 10 }} m</div>
        </div>

        <!-- weight -->
        <q-separator inset></q-separator>
        <div class="row text-h6 text-grey-8 q-mx-lg q-my-xs">
          <div class="col-4 text-left">WEIGHT</div>
          <div>{{ document.weight }} lbs</div>
        </div>

        <template v-for="(stat, indexStats) in document.stats">
          <div :key="indexStats">
            <q-separator inset></q-separator>
            <div class="row text-h6 text-grey-8 q-mx-lg q-my-xs">
              <div class="col-4 text-left">
                {{ stat.stat.name.toUpperCase() }}
              </div>
              <div>
                {{ stat.base_stat }}
              </div>
            </div>
          </div>
        </template>
      </template>

      <!-- details -->
      <detail-damage v-show="mode == 'damage'" :types="document.types" />

      <detail-moves
        v-show="mode == 'moves'"
        :abilities="document.abilities"
        :moves="document.moves"
      />
    </q-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {
    "common-button-group": () => import("components/common/CommonButtonGroup"),
    "detail-damage": () => import("components/detail/DetailDamage"),
    "detail-moves": () => import("components/detail/DetailMoves")
  },

  props: {
    document: Object,
    method: String
  },

  data: () => ({
    backgroundColor: "grey",
    mode: "stats"
  }),

  methods: {
    getDocumentId() {
      if (this.document.id) {
        let documentId = this.document.id;
        if (this.document.id.toString().length < 3) {
          documentId = `00${this.document.id}`;
        }
        return documentId;
      }
    },

    async getPokemonColor() {
      await axios({
        method: "get",
        url: `https://pokeapi.co/api/v2/pokemon-species/${this.document.id}/`
      }).then(response => {
        this.getColor(response.data.color.name);
      });
    },

    getColor(rawColor) {
      switch (rawColor) {
        case "black":
          this.backgroundColor = "#f5f5f5";
          break;
        case "blue":
          this.backgroundColor = "#bbdefb";
          break;
        case "brown":
          this.backgroundColor = "#d7ccc8";
          break;
        case "gray":
          this.backgroundColor = "#f5f5f5";
          break;
        case "green":
          this.backgroundColor = "#c8e6c9";
          break;
        case "pink":
          this.backgroundColor = "#f8bbd0";
          break;
        case "purple":
          this.backgroundColor = "#e1bee7";
          break;
        case "red":
          this.backgroundColor = "#ffcdd2";
          break;
        case "white":
          this.backgroundColor = "#f5f5f5";
          break;
        case "yellow":
          this.backgroundColor = "#fff9c4";
          break;
        default:
          this.backgroundColor = "#f5f5f5";
          break;
      }
    }
  },

  watch: {
    method() {
      this.backgroundColor = null;
      if (this.method == "detail") {
        this.getPokemonColor();
      }
    }
  }
};
</script>
