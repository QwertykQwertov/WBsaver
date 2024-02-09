<script setup lang="ts">
import { ref } from 'vue'
import { DxTextBox, DxButton } from 'devextreme-vue'
import { DxValidator, DxRequiredRule, DxCustomRule } from 'devextreme-vue/validator'
import { wb_img_url } from '../useImages'
import { useImagesStore } from '@/stores/images'

const imageStore = useImagesStore()
const inputValue = ref('')
const placeholder = 'https://www.wildberries.ru/catalog/76091735/detail.aspx'

const emit = defineEmits<{ searchClick: [value: string] }>()

function getValue(): void {
  const article: string = inputValue.value.replace(/[\D]/g, '')
  const url: string = `https:${wb_img_url(article)}/images/big/`

  imageStore.setArticle(Number(article))

  emit('searchClick', url)
}

function validateLink({ value }: { value: string }): boolean {
  return /https:\/\/www.wildberries.ru\/catalog\/\d*\/detail.aspx/.test(value)
}
</script>

<template>
  <div class="search-wrapper">
    <DxTextBox
      class="search-input"
      v-model="inputValue"
      mode="text"
      styling-mode="outlined"
      validationMessageMode="always"
      :placeholder="placeholder"
      :show-clear-button="true"
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
  </div>
</template>

<style scoped lang="scss">
.search-wrapper {
  // padding: 10px 100px;
  margin: 0 auto;
  display: flex;
  width: 70%;
  gap: 10px;

  .search-input {
    flex: 1;
    border: 1px solid #2d6da3;
    border-radius: 5px;
  }
}
</style>
