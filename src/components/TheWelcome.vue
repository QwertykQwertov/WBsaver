<script setup lang="ts">
import { ref } from 'vue'
import { DxTextBox, DxButton } from 'devextreme-vue'
import { DxValidator, DxRequiredRule, DxCustomRule } from 'devextreme-vue/validator'
import { wb_img_url } from '../useImages'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

// https://www.wildberries.ru/catalog/76091735/detail.aspx
const inputValue = ref('')
const placeholder = 'https://www.wildberries.ru/catalog/76091735/detail.aspx'
const images = ref<string[]>([])
const imagesBlob = ref<Blob[]>([])

function getValue(): void {
  const id: string = inputValue.value.replace(/[\D]/g, '')
  const url: string = `https:${wb_img_url(id)}/images/big/`

  getImages(url)
}

function validateLink({ value }: { value: string }): boolean {
  return /https:\/\/www.wildberries.ru\/catalog\/\d*\/detail.aspx/.test(value)
}

async function getImages(url: string): Promise<void> {
  let end = false
  let counter = 1
  while (!end) {
    await fetch(`${url}${counter}.webp`, {
      method: 'GET'
    })
      .then((res) => {
        if (res.status === 404) {
          end = true
          return
        }
        console.log(res)
        images.value.push(res.url)
        return res.blob()
      })
      .then((data) => {
        if (!data) return

        imagesBlob.value.push(data)
        console.log(data)
      })
      .catch(() => (end = true))
    counter++
  }
  console.log(end)
}

// https://basket-05.wb.ru/vol760/part76091/76091735/images/big/2.webp
// fetch(`https://basket-05.wb.ru/vol760/part76091/76091735/images/big/2.webp`, {
//   method: 'GET'
// })
//   .then((res) => {
//     return res.blob()
//   })
//   .then((data) => zip(data))
function zip() {
  const zip = new JSZip()

  imagesBlob.value.forEach((img, i) => {
    zip.file(`${i}.webp`, img, { base64: true })
  })

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    FileSaver.saveAs(content, 'example.zip')
  })
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
  <div class="images-wrapper">
    <img v-for="image in images" :key="image" :src="image" alt="" />
  </div>
  <DxButton
    :visible="imagesBlob.length"
    text="Сохранить архив"
    type="default"
    styling-mode="outlined"
    icon=""
    hint="Начать поиск"
    @click="zip"
  />
</template>

<style scoped lang="scss">
.images-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  & img {
    width: 100px;
    height: 100px;
  }
}
</style>
