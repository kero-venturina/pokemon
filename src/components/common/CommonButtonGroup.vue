<template>
  <q-btn-group class="q-mx-auto " push>
    <q-btn
      :ripple="false"
      style="width: 100px;"
      push
      label="stats"
      class="border-right"
      :class="{ 'bg-grey-4': mode == 'stats' }"
      @click="$emit('mode-stats')"
    />
    <q-btn
      :ripple="false"
      style="width: 100px;"
      push
      label="DMG. REL"
      class="border-right"
      :class="{ 'bg-grey-4': mode == 'damage' }"
      @click="$emit('mode-damage')"
    />
    <q-btn
      :ripple="false"
      style="width: 100px;"
      push
      label="moves"
      class="border-right"
      :class="{ 'bg-grey-4': mode == 'moves' }"
      @click="$emit('mode-moves')"
    />
    <q-btn
      :ripple="false"
      style="width: 100px;"
      push
      label="evolution"
      :class="{ 'bg-grey-4': mode == 'evolution' }"
      @click="$emit('mode-evolution')"
    />
  </q-btn-group>
</template>

<script>
export default {
  props: {
    mode: String
  }
};
</script>
