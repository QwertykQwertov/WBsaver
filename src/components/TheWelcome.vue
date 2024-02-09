<script setup lang="ts">
import { ref } from 'vue'
import ThePreview from './ThePreview.vue'
import TheSearch from './TheSearch.vue'
import TheImages from './TheImages.vue'
import { DxButton } from 'devextreme-vue'
import { useImagesStore } from '@/stores/images'

interface ImageItem {
  id: number
  src: string
  blob: null | Blob
}

const imageStore = useImagesStore()

import JSZip from 'jszip'
import FileSaver from 'file-saver'

// https://www.wildberries.ru/catalog/76091735/detail.aspx

async function getImages(url: string): Promise<void> {
  let end = false
  let counter = 1
  while (!end) {
    let imageItem: ImageItem = {
      id: Date.now(),
      src: '',
      blob: null
    }
    await fetch(`${url}${counter}.jpg`, {
      method: 'GET'
    })
      .then((res) => {
        if (res.status === 404) {
          end = true
          return
        }
        imageItem.src = res.url

        return res.blob()
      })
      .then((data) => {
        if (!data) return

        imageItem.blob = data
        imageStore.addImage(imageItem)
      })
      .catch(() => (end = true))
    counter++
  }
}

function saveZip() {
  const zip = new JSZip()
  console.log(imageStore.images)
  imageStore.images.forEach(({blob}, i) => {
    zip.file(`${i}.jpg`, blob as Blob, { base64: true })
  })

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    FileSaver.saveAs(content, 'example.zip')
  })
}
</script>

<template>
  <ThePreview />
  <TheSearch @searchClick="getImages" />
  <TheImages />

  <DxButton
    class="save-archiv-button"
    :visible="imageStore.images.length"
    text="Сохранить архив"
    type="success"
    styling-mode="outlined"
    icon=""
    hint="Начать поиск"
    @click="saveZip"
  />
</template>

<style scoped lang="scss">
.save-archiv-button {
  margin: 0 0 100px 15%;
}
</style>
