<template>
  <section class="main-section">
    <div class="main-section-container">
      <div class="main-section-content">
        <h1 class="main-section-content-header">Сохраняй изображения с карточки товара</h1>

        <ol class="main-section-content-list">
          <li>Укажите ссылку на товар WB</li>
          <li>Нажмите на кнопку "Начать поиск"</li>
          <li>Дождитесь загрузки всех фото</li>
          <li>Скачайте архив или фотографии поштучно</li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.main-section {
  width: 100%;
  height: 100vh;

  color: #ededed;

  &-container {
    margin: 50px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 80%;
    border-radius: 10px;

    background-image: url('../assets/Group 18.png');
    background-size: cover;
  }

  &-content {
    width: 50%;
    // height: 50%;
    border: 1px solid #ededed;
    border-radius: 5px;
    padding: 10px;

    background-color: rgba(92, 85, 92, 0.7);

    backdrop-filter: blur(5px);

    &-header {
      text-align: center;
    }

    &-list {
      margin-top: 10px;
      // text-align: center;
      font-size: 1.1em;
    }
  }
}
</style>
