<template>
  <div class="bg-green">
    <mobile-table
      v-show="method == 'read'"
      :documents="documents"
      @mode-detail="modeDetail($event)"
      @load-documents="$emit('load-documents')"
    />

    <mobile-detail
      v-show="method == 'detail'"
      :document="document"
      :method="method"
      @mode-read="modeRead()"
    />
  </div>
</template>

<script>
export default {
  components: {
    "mobile-table": () => import("components/mobile/MobileTable"),
    "mobile-detail": () => import("components/mobile/MobileDetail")
  },

  props: {
    documents: Array
  },

  data: () => ({
    method: "read",
    document: {} // temporary data for viewing for details
  }),

  methods: {
    modeRead() {
      this.method = "read";
    },

    modeDetail(event) {
      this.method = "detail";
      this.document = event;
    }
  }
};
</script>
