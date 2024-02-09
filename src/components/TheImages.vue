<script setup lang="ts">
import { ref } from 'vue'
import { DxButton } from 'devextreme-vue/button'
import { DxPopup } from 'devextreme-vue'
import { useImagesStore } from '@/stores/images'

const imageStore = useImagesStore()

const showPopUp = ref<Boolean>(false)
const currentImage = ref<string>('')

function openPopUp(src: string): void {
  currentImage.value = src
  showPopUp.value = true
}

function onPopUpHiding() {
  showPopUp.value = false
}

function deleteImage(id: number) {
  imageStore.deleteImage(id)
}

function saveImage(blob: Blob, index: number) {
  let link = document.createElement('a')
  link.setAttribute('href', URL.createObjectURL(blob))
  link.setAttribute('download', `${imageStore.article}_${index}.jpg`)
  link.click()
  link.remove()
}
</script>

<template>
  <div class="images-block-wrapper">
    <div v-for="(image, index) in imageStore.images" :key="image.id" class="card-image-item">
      <div class="image-wrapper">
        <img :src="image.src" alt="" />
        <div class="image-wrapper-overlay" @click="openPopUp(image.src)">
          <i class="dx-icon-search dx-icon-custom-style"></i>
        </div>
      </div>
      <div class="card-button-group">
        <DxButton
          @click="saveImage(image.blob as Blob, index)"
          type="success"
          styling-mode="outlined"
          icon="download"
          hint="Сохранить"
        />
        <DxButton
          @click="deleteImage(image.id)"
          type="danger"
          styling-mode="outlined"
          icon="trash"
          hint="Удалить"
        />
      </div>
    </div>
    <DxPopup
      v-model="showPopUp"
      :width="550"
      :height="550"
      :close-on-outside-click="true"
      :show-close-button="true"
      :visible="showPopUp"
      container=".dx-viewport"
      @hiding="onPopUpHiding"
    >
      <div class="popup-content">
        <img class="popup-image" :src="currentImage" alt="" />
      </div>
    </DxPopup>
  </div>
</template>

<style scoped lang="scss">
.images-block-wrapper {
  margin: 50px 15%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.card-image-item {
  border: 1px solid #2d6da3;
  border-radius: 5px;
  padding: 10px;

  & img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
  }
}

.image-wrapper {
  position: relative;

  &-overlay {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: rgba(71, 64, 64, 0.4);
    }

    &:hover .dx-icon-custom-style {
      opacity: 1;
    }

    .dx-icon-custom-style {
      color: white;
      font-size: 2.5rem;
      opacity: 0;
    }
  }
}
.card-button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.popup-content {
  display: flex;
  justify-content: center;
  height: 459px;
}
.popup-image {
  max-width: 480px;
  max-height: 480px;
  border-radius: 5px;
}
</style>
@/stores/images
