<template>
  <q-card
    flat
    outlined
    class="bg-grey-1 q-pa-md"
    style="height: 568px; border-radius: 8px; overflow-y: scroll!important;"
    ref="scrollTargetRef"
  >
    <q-infinite-scroll
      @load="requestDocuments"
      :offset="250"
      :scroll-target="$refs.scrollTargetRef"
    >
      <q-card
        v-for="(document, index) in documents"
        :key="index"
        class="border row q-mb-md glossy clickable"
        style="border-radius: 8px;"
        @click="$emit('mode-detail', document)"
      >
        <!-- image -->
        <div class="q-px-sm">
          <img style="width: 72px;" :src="document.sprites.front_default" />
        </div>

        <div class="q-my-auto">
          <div class="text-vt">
            <!-- id -->
            <div
              class="row text-left"
              style="margin-bottom: -8px; margin-left: -5px;"
            >
              <img
                style="width: 24px;"
                src="https://veekun.com/dex/media/items/poke-ball.png"
                alt=""
              />
              <div class="q-my-auto text-body2">
                No. {{ getDocumentId(document.id) }}
              </div>
            </div>

            <!-- name -->
            <div class="text-h6 text-left text-grey-8">
              {{ document.name.toUpperCase() }}
            </div>

            <!-- types -->
            <div class="text-left">
              <span
                v-for="(documentType, index2) in document.types"
                :key="index2"
              >
                <img
                  style="width: 32px;"
                  class="q-mr-sm"
                  :src="
                    `https://veekun.com/dex/media/types/en/${documentType.type.name}.png`
                  "
                />
              </span>
            </div>
          </div>
        </div>
      </q-card>

      <template v-if="loading">
        <q-card
          v-for="n in 10"
          :key="`${n}-loader`"
          class="q-mb-md glossy q-pa-md shadow-3 text-left"
          style="border-radius: 8px;"
        >
          <div class="row text-left">
            <div class="q-my-auto q-mr-md">
              <q-skeleton size="42px" type="QAvatar" />
            </div>
            <div class="q-my-auto">
              <div class="text-body1 text-weight-medium text-dark">
                <q-skeleton height="10px" width="100px" type="text" />
              </div>
              <div class="caption text-grey-6">
                <q-skeleton height="10px" width="80%" type="text" />
              </div>
              <div class="caption text-grey-6">
                <q-skeleton height="10px" width="50%" type="text" />
              </div>
            </div>
          </div>
        </q-card>
      </template>
    </q-infinite-scroll>
  </q-card>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    documents: [],
    loading: false,
    inital: false,
    offset: 0
  }),

  mounted() {
    this.initial = true;
  },

  methods: {
    async requestDocuments(index, done) {
      this.loading = true;
      await axios({
        method: "get",
        url: `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${this.offset}`
      })
        .then(async response => {
          await this.populateFields(response.data.results);
          this.loading = false;
          this.offset += 10;
        })
        .finally(() => {
          done();
        });
    },

    async populateFields(results) {
      for (let i = 0; i < results.length; i++) {
        const element = results[i];
        await axios({
          method: "get",
          url: element.url
        }).then(async response => {
          this.documents.push(response.data);
          if (this.initial && this.$q.screen.width > 768) {
            this.$emit("mode-detail", response.data);
            this.initial = false;
          }
        });
      }
    },

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
    }
  }
};
</script>
