<template>
  <div class="text-left">
    <!-- strengths -->
    <div class="text-center row">
      <!-- double damage to -->
      <div class="col-4">
        <div>
          DOUBLE DAMAGE TO
        </div>
        <span
          v-for="(strength, index) in strengths.double_damage_to"
          :key="`${index}-double_damage_to`"
        >
          <img
            style="width: 32px;"
            class="q-mr-sm"
            :src="`https://veekun.com/dex/media/types/en/${strength.name}.png`"
          />
        </span>
      </div>

      <!-- half damage from -->
      <div class="col-4">
        <div>
          HALF DAMAGE FROM
        </div>
        <span
          v-for="(strength, index) in strengths.half_damage_from"
          :key="`${index}-half_damage_from`"
        >
          <img
            style="width: 32px;"
            class="q-mr-sm"
            :src="`https://veekun.com/dex/media/types/en/${strength.name}.png`"
          />
        </span>
      </div>

      <!-- no damage from -->
      <div class="col-4">
        <div>
          NO DAMAGE FROM
        </div>
        <span
          v-for="(strength, index) in strengths.no_damage_from"
          :key="`${index}-no_damage_from`"
        >
          <img
            style="width: 32px;"
            class="q-mr-sm"
            :src="`https://veekun.com/dex/media/types/en/${strength.name}.png`"
          />
        </span>
      </div>
    </div>

    <!-- weaknesses -->
    <q-separator inset class="q-my-sm"></q-separator>
    <div class="text-center row">
      <!-- double damage to -->
      <div class="col-4">
        <div>
          DOUBLE DAMAGE FROM
        </div>
        <span
          v-for="(weakness, index) in weaknesses.double_damage_from"
          :key="`${index}-double_damage_from`"
        >
          <img
            style="width: 32px;"
            class="q-mr-sm"
            :src="`https://veekun.com/dex/media/types/en/${weakness.name}.png`"
          />
        </span>
      </div>

      <!-- half damage from -->
      <div class="col-4">
        <div>
          HALF DAMAGE TO
        </div>
        <span
          v-for="(weakness, index) in weaknesses.half_damage_to"
          :key="`${index}-half_damage_to`"
        >
          <img
            style="width: 32px;"
            class="q-mr-sm"
            :src="`https://veekun.com/dex/media/types/en/${weakness.name}.png`"
          />
        </span>
      </div>

      <!-- no damage from -->
      <div class="col-4">
        <div>
          NO DAMAGE TO
        </div>
        <span
          v-for="(weakness, index) in weaknesses.no_damage_to"
          :key="`${index}-no_damage_to`"
        >
          <img
            style="width: 32px;"
            class="q-mr-sm"
            :src="`https://veekun.com/dex/media/types/en/${weakness.name}.png`"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    types: Array
  },

  data: () => ({
    sext: "",
    strengths: {
      double_damage_to: [],
      half_damage_from: [],
      no_damage_to: []
    },
    weaknesses: {
      double_damage_from: [],
      half_damage_to: [],
      no_damage_from: []
    }
  }),

  mounted() {
    this.getAttributes();
  },

  methods: {
    async getAttributes() {
      for (let i = 0; i < this.types.length; i++) {
        const element = this.types[i];
        await axios({
          method: "get",
          url: element.type.url
        }).then(async response => {
          this.pushAttributes(response.data.damage_relations);
        });
      }
    },

    pushAttributes(damageRelations) {
      // strengths
      this.strengths.double_damage_to = [];
      if (damageRelations.double_damage_to.length > 0) {
        for (let a = 0; a < damageRelations.double_damage_to.length; a++) {
          const element = damageRelations.double_damage_to[a];
          this.strengths.double_damage_to.push(element);
        }
      }

      this.strengths.half_damage_from = [];
      if (damageRelations.half_damage_from.length > 0) {
        for (let b = 0; b < damageRelations.half_damage_from.length; b++) {
          const element = damageRelations.half_damage_from[b];
          this.strengths.half_damage_from.push(element);
        }
      }

      this.strengths.no_damage_from = [];
      if (damageRelations.no_damage_from.length > 0) {
        for (let c = 0; c < damageRelations.no_damage_from.length; c++) {
          const element = damageRelations.no_damage_from[c];
          this.strengths.no_damage_from.push(element);
        }
      }

      // weaknesses
      this.weaknesses.half_damage_to = [];
      if (damageRelations.half_damage_to.length > 0) {
        for (let d = 0; d < damageRelations.half_damage_to.length; d++) {
          const element = damageRelations.half_damage_to[d];
          this.weaknesses.half_damage_to.push(element);
        }
      }

      this.weaknesses.no_damage_to = [];
      if (damageRelations.no_damage_to.length > 0) {
        for (let e = 0; e < damageRelations.no_damage_to.length; e++) {
          const element = damageRelations.no_damage_to[e];
          this.weaknesses.no_damage_to.push(element);
        }
      }

      this.weaknesses.double_damage_from = [];
      if (damageRelations.double_damage_from.length > 0) {
        for (let f = 0; f < damageRelations.double_damage_from.length; f++) {
          const element = damageRelations.double_damage_from[f];
          this.weaknesses.double_damage_from.push(element);
        }
      }
    }
  },

  watch: {
    types() {
      this.getAttributes();
    }
  }
};
</script>
