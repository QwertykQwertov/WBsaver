<script setup lang="ts">
import { ref } from 'vue'
import ThePreview from './ThePreview.vue'
import TheSearch from './TheSearch.vue'
import { DxButton } from 'devextreme-vue'

import JSZip from 'jszip'
import FileSaver from 'file-saver'

// https://www.wildberries.ru/catalog/76091735/detail.aspx

const images = ref<string[]>([])
const imagesBlob = ref<Blob[]>([])



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
    zip.file(`${i}.jpg`, img, { base64: true })
  })

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    FileSaver.saveAs(content, 'example.zip')
  })
}
</script>

<template>
  <ThePreview/>
  <TheSearch @searchClick="getImages"/>
  <div class="images-wrapper">
    <img v-for="image in images" :key="image" :src="image" alt="" />
  </div>
  <!-- <DxButton
    :visible="imagesBlob.length"
    text="Сохранить архив"
    type="default"
    styling-mode="outlined"
    icon=""
    hint="Начать поиск"
    @click="zip"
  /> -->
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
