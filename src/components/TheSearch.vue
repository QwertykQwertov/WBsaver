<script setup lang="ts">
import { ref } from 'vue'
import { DxTextBox, DxButton } from 'devextreme-vue'
import { DxValidator, DxRequiredRule, DxCustomRule } from 'devextreme-vue/validator'
import { wb_img_url } from '../useImages'

const inputValue = ref('')
const placeholder = 'https://www.wildberries.ru/catalog/76091735/detail.aspx'

const emit = defineEmits<{ searchClick: [value: string] }>()

function getValue(): void {
  const id: string = inputValue.value.replace(/[\D]/g, '')
  const url: string = `https:${wb_img_url(id)}/images/big/`

  emit('searchClick', url)
}

function validateLink({ value }: { value: string }): boolean {
  return /https:\/\/www.wildberries.ru\/catalog\/\d*\/detail.aspx/.test(value)
}
</script>

<template>
  <DxTextBox
    v-model="inputValue"
    mode="text"
    styling-mode="outlined"
    validationMessageMode="always"
    :placeholder="placeholder"
  >
    <DxValidator ref="validate">
      <DxRequiredRule message="Укажите ссылку на товар" />
      <DxCustomRule
        :validation-callback="validateLink"
        message="The vacation period must not exceed 25 days"
      />
    </DxValidator>
  </DxTextBox>
  <DxButton
    text="Начать поиск"
    type="default"
    styling-mode="outlined"
    icon=""
    hint="Начать поиск"
    @click="getValue"
    :use-submit-behavior="true"
  />
</template>
