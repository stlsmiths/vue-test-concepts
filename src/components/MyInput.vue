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
  disabled: {
   type: Boolean,
    default: false
  },
 maxLen: {
  type: Number,
  default: 8
 }
})

const emits = defineEmits(['change','update:model-value'])

const local = ref<string | null>(null)

const slen = computed<number>( () => local.value ? local.value.length : 0 )

watch(
  () => props.modelValue,
  (v) => {
    if (v) {
      local.value = v.substring(0,props.maxLen)
    }
  },
  {immediate: true}
)

function onUpdate(val: string) {
  local.value = val.substring(0,props.maxLen)
  emits('update:model-value', local.value)
}

</script>

<template>
  <div data-testid="container">
    <label data-testid="label">{{ label }}</label>
    <input  type="text"
            name="myinput"
            v-model="local"
            data-testid="input"
            :class="localClass"
            :maxlength="maxLen"
            :disabled="disabled"
            @change="emits('change',$event)"
            @update:model-value="onUpdate"
            />
    <div data-testid="slen">( There are {{ slen }} characters )</div>
  </div>
</template>
