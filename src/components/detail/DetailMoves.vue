<template>
  <div class="text-left">
    <!-- abilities -->
    <q-separator inset></q-separator>

    <div class="row text-body1 text-grey-8 q-mx-lg q-my-xs">
      <div class="col-3 text-left">Abilities</div>
      <div class="text-caption col-9">
        <span v-for="(ability, index) in abilities" :key="index">
          {{ ability.ability.name
          }}<span v-if="index + 1 != abilities.length">,</span>
        </span>
      </div>
    </div>

    <!-- moves -->
    <q-separator inset></q-separator>
    <div class="row text-body1 text-grey-8 q-mx-lg q-my-xs">
      <div class="col-3 text-left">Moves</div>
      <div class="text-caption col-9" :style="getResponsiveStyle()">
        <span v-for="(move, index) in moves" :key="index">
          {{ move.move.name }}<span v-if="index + 1 != moves.length">,</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    abilities: Array,
    moves: Array
  },

  methods: {
    getResponsiveStyle() {
      if (this.$q.screen.width > 768) {
        return "height: 180px; overflow-y: scroll;";
      }
    }
  }
};
</script>
