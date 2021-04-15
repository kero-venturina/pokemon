<template>
  <div class="fullscreen text-dark text-center flex flex-center bg-pokemon">
    <div class="q-mx-auto">
      <!-- title -->
      <common-title />

      <!-- search -->
      <common-field-search
        :loading="loading"
        @handle-submit="searchDocument()"
        @input="search = $event"
        style="width: 390px;"
      />

      <!-- content -->
      <q-card
        class="shadow-10 bg-pokemon-color"
        style="height: 568px; width: 900px; border-radius: 8px;"
      >
        <div class="row">
          <!-- table -->
          <div class="col-4 q-ma-none">
            <desktop-table
              :documents="documents"
              @mode-detail="modeDetail($event)"
            />
          </div>

          <!-- detail -->
          <div class="col">
            <desktop-detail v-if="!notfound" :document="document" />

            <!-- not found -->
            <div
              v-if="notfound"
              class="flex flex-center"
              style="height: 100%; margin-top: -20px;"
            >
              <div>
                <img
                  style="width: 96px;"
                  src="https://pngimg.com/uploads/pokeball/pokeball_PNG24.png"
                />
                <div class="text-h3 text-vt text-grey-8">
                  Pokemon not found
                </div>
                <div class="text-body1 text-vt">
                  search exact name/id of pokemon (that's how it works).
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card>

      <!-- footer -->
      <div class="text-vt text-white q-mt-md text-right q-pr-md">
        by: Kero Venturina
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {
    "common-field-search": () => import("components/common/CommonFieldSearch"),
    "common-title": () => import("components/common/CommonTitle"),
    "desktop-table": () => import("components/desktop/DesktopTable"),
    "desktop-detail": () => import("components/desktop/DesktopDetail")
  },

  props: {
    documents: Array
  },

  data: () => ({
    selected: "",
    search: "",
    loading: false,
    notfound: false,
    document: {} // temporary data for viewing detials
  }),

  methods: {
    modeDetail(event) {
      this.search = "";
      this.notfound = false;
      this.document = event;
    },

    async searchDocument() {
      if (this.search.trim()) {
        this.loading = true;
        await axios({
          method: "get",
          url: `https://pokeapi.co/api/v2/pokemon/${this.search}`
        })
          .then(async response => {
            if (response.data) {
              this.document = response.data;
              this.notfound = false;
            } else {
              this.document = {};
              this.notfound = true;
            }
          })
          .catch(error => {
            this.notfound = true;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>
