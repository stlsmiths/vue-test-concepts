<script setup lang="ts">
import {ref,watchEffect,watch,computed,unref,toRaw} from 'vue'
import {isEqualObjects} from '@/common/utility-funcs.js'
import {useSampleStore} from "@/stores/sample-store";

const props = defineProps<{
  title?: string,
  item: any,
  subtitle?: string,
  disabled?: boolean,
}>()

const emits = defineEmits(['save','reset','cancel','drop'])

const store = useSampleStore()
const localTitle = ref<string | undefined>()
const editItem = ref({...props.item})

const ldisabled = ref(props?.disabled === true)

const storeTitle = computed( () => store.appTitle )
const ctitle = computed<string>( () => props.title ? props.title : store.appTitle )

const isDirty = computed( () => !isEqualObjects( editItem.value, props.item ) )
const isDisabled = computed( () => props.disabled || ldisabled.value || !isDirty.value )

watchEffect( () => {
  // console.log('updating title', ctitle.value)
 // debugger
  localTitle.value = ctitle.value
})

watch(
    () => props.item,
    (v) => { editItem.value = {...v} },
    {immediate: true}
)

watch(
    () => props.disabled,
    (v) => { ldisabled.value = !!v },
    {immediate: true}
)

function touchItem() {
  editItem.value.time = new Date().getTime()
}

function onSave() {
  emits('save', editItem.value)
  // console.log('raw edititem', toRaw(editItem))
  // debugger
}
function onReset() {
  editItem.value = {...props.item}
  emits('reset')
}
function onCancel() {
  emits('cancel', editItem.value)
}
</script>

<template>
  <div>
    <h3 data-testid="title">{{ localTitle }}</h3>
    <h4 data-testid="subtitle">{{ subtitle }}</h4>
    <div>
      <fieldset>

        <label>Enter the item text ...</label>
        <input type="text"
               v-model="editItem.text"
               :disabled="ldisabled"
               data-testid="input-text" />

        <div style="padding-left: 10px;margin-top: 2rem;margin-bottom: 2rem">
          Controls are: <input type="checkbox" v-model="ldisabled" data-testid="disable-check" /> {{ ldisabled ? 'Disabled' : 'Enabled' }}
          <button style="padding-left: 10px" @click="touchItem">Touch Item</button>
        </div>

      </fieldset>
    </div>
    <button :disabled="isDisabled" @click="onSave" data-testid="btn-save">Save</button>
    <button :disabled="isDisabled" @click="onReset" data-testid="btn-reset">Reset</button>
    <button @click="onCancel" data-testid="btn-cancel">Cancel</button>
    <button @click="emits('drop', editItem)" data-testid="btn-drop">Drop Item</button>
  </div>
</template>
