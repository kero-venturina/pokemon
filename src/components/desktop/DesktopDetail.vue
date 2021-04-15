<template>
  <div v-if="Object.keys(document).length" class="text-vt">
    <!-- image -->
    <img
      class="q-mx-auto"
      :src="
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${document.id}.png`
      "
      style=" width: 196px;"
    />

    <!-- name -->
    <div class="text-h4 text-grey-9">
      {{ document.name.toUpperCase() }}
    </div>

    <!-- types -->
    <div class="text-center q-mb-sm">
      <span v-for="(documentType, index2) in document.types" :key="index2">
        <img
          style="width: 32px;"
          class="q-mr-sm"
          :src="
            `https://veekun.com/dex/media/types/en/${documentType.type.name}.png`
          "
        />
      </span>
    </div>

    <!-- details -->
    <div style="height: 240px;" class="q-mx-sm">
      <detail-status
        v-show="mode == 'stats'"
        :weight="document.weight"
        :height="document.height"
        :stats="document.stats"
      />
      <detail-damage v-show="mode == 'damage'" :types="document.types" />
      <detail-moves
        v-show="mode == 'moves'"
        :abilities="document.abilities"
        :moves="document.moves"
      />
      <detail-evolution v-show="mode == 'evolution'" :id="document.id" />
    </div>

    <!-- button groups -->
    <common-button-group
      :mode="mode"
      @mode-stats="mode = 'stats'"
      @mode-damage="mode = 'damage'"
      @mode-moves="mode = 'moves'"
      @mode-evolution="mode = 'evolution'"
    />
  </div>
</template>

<script>
export default {
  components: {
    "common-button-group": () => import("components/common/CommonButtonGroup"),
    "detail-status": () => import("components/detail/DetailStatus"),
    "detail-damage": () => import("components/detail/DetailDamage"),
    "detail-moves": () => import("components/detail/DetailMoves"),
    "detail-evolution": () => import("components/detail/DetailEvolution")
  },

  props: {
    document: Object
  },

  data: () => ({
    mode: "stats"
  })
};
</script>
