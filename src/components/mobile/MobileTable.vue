<template>
  <div class="bg-grey-1">
    <!-- title -->
    <common-title class="q-px-md q-pt-md" />

    <!-- search -->
    <common-field-search
      :loading="loading"
      @handle-submit="searchDocument()"
      @input="search = $event"
    />

    <desktop-table
      :documents="documents"
      @mode-detail="$emit('mode-detail', $event)"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {
    "common-field-search": () => import("components/common/CommonFieldSearch"),
    "common-title": () => import("components/common/CommonTitle"),
    "desktop-table": () => import("components/desktop/DesktopTable")
  },

  props: {
    documents: Array
  },

  data: () => ({
    loading: false,
    search: ""
  }),

  methods: {
    getDocumentId(documentId) {
      if (documentId) {
        let formattedId = documentId;
        if (documentId.toString().length < 2) {
          formattedId = `00${documentId}`;
        } else if (documentId.toString().length < 3) {
          formattedId = `0${documentId}`;
        }
        return formattedId;
      }
    },

    async searchDocument() {
      if (this.search.trim()) {
        console.log(this.search);
        this.loading = true;
        await axios({
          method: "get",
          url: `https://pokeapi.co/api/v2/pokemon/${this.search}`
        })
          .then(async response => {
            if (response.data) {
              this.$emit("mode-detail", response.data);
            }
          })
          .catch(error => {
            console.log(error.message);
            this.$q.notify({
              message: "Pokemon not found.",
              caption: `Search exact name of pokemon or id.`,
              icon: "info"
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>
