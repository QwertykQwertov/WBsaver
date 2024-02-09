import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useImagesStore = defineStore('image', () => {
  const images = ref<ImageItem[]>([])
  const article = ref<number | null>(null)

  function addImage(image: ImageItem) {
    images.value.push(image)
  }

  function deleteImage(id: number) {
    images.value = images.value.filter((img) => img.id !== id)
  }

  function setArticle(newArticle: number){
    article.value = newArticle
  }

  return { images, article, setArticle, addImage, deleteImage }
})

interface ImageItem {
  src: string
  id: number
  blob: null | Blob
}
