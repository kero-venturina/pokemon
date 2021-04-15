<template>
  <div>
    <!-- height weight -->
    <div class="row">
      <div class="col-6">
        <div class="text-h5">{{ height / 10 }} m</div>

        <div class="q-mb-md text-body1 text-grey-7">
          HEIGHT
        </div>
      </div>

      <div class="col-6">
        <div class="text-h5">{{ weight }} lbs</div>

        <div class="q-mb-md text-body1 text-grey-7">
          WEIGHT
        </div>
      </div>
    </div>

    <!-- stats -->
    <div class="row">
      <div v-for="(stat, indexStats) in stats" :key="indexStats" class="col-4">
        <div class="text-h5">
          {{ stat.base_stat }}
        </div>

        <div class="q-mb-md text-body1 text-grey-7">
          {{ stat.stat.name.toUpperCase() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: Array,
    weight: Number,
    height: Number
  }
};
</script>
