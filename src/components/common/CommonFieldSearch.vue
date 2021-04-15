<template>
  <q-input
    :value="fieldValue"
    outlined
    rounded
    :spellcheck="false"
    :loading="loading"
    debounce="500"
    bg-color="white"
    color="blue-10"
    class="q-mx-auto q-px-md q-pb-md q-pt-xs"
    placeholder="Search pokemon here .."
    @keyup.enter="$emit('handle-submit')"
    @input="$emit('input', $event)"
    @blur="$emit('blur')"
  >
    <template #prepend>
      <q-icon name="search" class="q-ml-sm" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    fieldValue: String
  }
};
</script>
