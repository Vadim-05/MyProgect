<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo-container">
        <h2 class="header__logo-text">LOGO</h2>
        <input 
          class="header__search-input" 
          type="search" 
          name="search" 
          placeholder="Поиск" 
          aria-label="Поиск" 
        >
      </div>
      <TodayDate />
    </div>
  </header>
</template>
<script setup>
import TodayDate from './todayDate.vue'; 
</script>
<style lang="scss">
.header{
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
   &__container{
      width: 1440px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      padding: 20px 40px;
      box-sizing: border-box;
      align-items: center;
  }
  &__logo-container{
    display: flex;
  }
  &__logo-text{
    padding-right: 50px;
  }
  &__search-input{
    height: 27px;
    border: none;
    color: black;
    background: silver;
    padding:  5px 10px 5px 10px;
    border-radius: 5px;

    &::placeholder {
      color: #000;
    }
  }
}
</style>