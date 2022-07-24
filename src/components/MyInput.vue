<script setup lang="ts">
import {ref,computed, watch} from 'vue'
const props = defineProps({
 modelValue: {
  type: String,
  required: true
 },
 label: {
   type: String,
   default: 'My Label',
   required: false
 },
 localClass: {
  type: String,
  default: 'my-class'
 },
 maxLen: {
  type: Number,
  default: 8
 }
})

const emits = defineEmits(['change'])

const local = ref<string | null>(null)

const slen = computed<number>( () => props.modelValue ? props.modelValue.length : 0 )

watch(
  () => props.modelValue,
  (v) => {
    if (v) {
      local.value = v
    }
  },
  {immediate: true}
)

</script>

<template>
  <div data-testid="container">
    <label for="myinput" data-testid="label">{{ label }}</label>
    <input  type="text"
            name="myinput"
            v-model="local"
            data-testid="input"
            :class="localClass"
            :maxlength="maxLen"
            @change="emits('change',$event)"
            />
    <div data-testid="slen">( There are {{ slen }} characters )</div>
  </div>
</template>
