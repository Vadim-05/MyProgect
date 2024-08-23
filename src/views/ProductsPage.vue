<template>
  <article class="product">
    <section class="product__wrapper">
      <h2 class="product__main-title">ПРОДУКТИ</h2>

      <input 
        type="text" 
        v-model="searchQuery" 
        class="product__search-input" 
        placeholder="Пошук продукту..." 
      />

      <select v-model="selectedType" class="product__type-select">
        <option value="">Всі типи</option>
        <option v-for="type in productTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>

      <section 
        class="product__item" 
        v-for="product in filteredProducts" 
        :key="product.id"
      >
        <figure>
          <img class="product__image" :src="product.photo" alt="Product image" />
        </figure>
        <div class="product__section">
          <h3 class="product__font-size product__title">{{ product.title }}</h3>
          <p class="product__font-size product__serial-number">{{ product.serialNumber }}</p>
        </div>
        <p class="product__font-size product__status">{{ product.status }}</p>

        <section class="product__date">
          <p class="product__font-size product__guarantee-start">
            с {{ formatDate(product.guarantee.start, 'dd.MM.yyyy') }}
          </p>
          <p class="product__font-size product__guarantee-end">
            по {{ formatDate(product.guarantee.end, 'dd.MM.yyyy') }}
          </p>
        </section>

        <section class="product__prices">
          <div v-for="price in product.price" :key="price.id">
            <span>{{ price.value }}</span>
            <span class="product__price-symbol">{{ price.symbol }}</span>
          </div>
        </section>

        <img 
          class="orders__item_remove" 
          src="@/assets/remove.png" 
          alt="Remove"
          @click="confirmRemoveProduct(product)"
        />
      </section>
    </section>

    <ModalWindow class='product__modal-window' :isVisible="isModalVisible" @close="closeModal">
      <template #default>
        <div>
          <div>
            <h2 class="product__modal-window__title">Вы уверены, что хотите удалить продукт?</h2>
          </div>
          <div class="product__modal-window__section">
            <img class='product__modal-window__image'  :src="selectedProduct.photo">
            <div class="product__modal-window__details">
              <span class="product__modal-window__product-title">{{ selectedProduct.title }}</span>
              <p class="product__modal-window__serial-number">{{ selectedProduct.serialNumber }}</p>
            </div>
          </div>
          <div class="product__modal-window__actions">
            <button class="product__modal-window__button--cancel" @click="closeModal">ОТМЕНИТЬ</button>
            <button class="product__modal-window__button--remove" @click="removeConfirmedProduct">
              <img 
                class="product__modal-window__remove-icon" 
                src="@/assets/remove.png" 
                alt="Remove"
              />
              УДАЛИТЬ
            </button>
          </div>
        </div>
      </template>
    </ModalWindow>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue';
import { format } from 'date-fns';
import productsData from '../data/products.json';
import ModalWindow from '@/components/ModalWindow.vue';

const isModalVisible = ref(false);
const selectedProduct = ref(null);
const searchQuery = ref('');
const selectedType = ref('');
const products = ref([...productsData]);

const productTypes = computed(() => {
  return [...new Set(products.value.map(product => product.type))];
});

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
    (selectedType.value === '' || product.type === selectedType.value)
  );
});

const confirmRemoveProduct = (product) => {
  selectedProduct.value = product;
  isModalVisible.value = true;
};

const removeConfirmedProduct = () => {
  products.value = products.value.filter(product => product.id !== selectedProduct.value.id);
  closeModal();
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedProduct.value = null;
};

const formatDate = (date, formatString) => {
  return format(new Date(date), formatString);
};
</script>


<style lang="scss">
.product{
  padding-top: 60px;

  &__item{
    display: flex;
    background: white;
    margin-bottom: 10px;
    margin-top: 10px;
    align-items: center;
    padding: 12px;
    box-sizing: border-box;
  }
  &__main-title{
    padding-bottom: 30px;
  }
  &__wrapper{
    width: 1030px;
    margin: 0 auto;
  }
  &__price-symbol{
    padding-left: 6px;
  }
  &__prices,
  &__date{
    padding-right: 80px;
    width: 107px;
  }
  &__image{
    height: 80px;
    width: 120px;
  }
  &__font-size{
    font-size: 15px;
  }
  &__modal-window{

    &__title{
      border-bottom: 1px solid silver;
      font-size: 21px;
      padding: 21px 0 30px 29px;
    }
    &__section{
      display: flex;  
      padding: 38px 29px;

      &::before{
        content: "•"; 
        color: black; 
        font-size: 30px; 
        margin-right: 10px;
        color: green;
      }
    }
    &__image{
      height: 40px;
    }
    &__serial-number{
      padding-top: 8px;
      font-size: 15px;
      color: black;
      opacity: 0.6;
      border-bottom: 1px solid silver;
      width: fit-content;
    }
    &__product-title{
      font-size: 15px;
      border-bottom: 1px solid silver;
    }
    &__actions{
      height: 96px;
      background: green;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 40px;
    }
    &__button--cancel{
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 11px;
      margin-right: 31px;
    }
    &__button--remove{
      color: red;
      display: flex;
      cursor: pointer;
      align-items: center;
      height: 41px;
      width: 136px;
      justify-content: center;
      border-radius: 20px;
      border: none;
      font-size: 12px;
    }
    &__details{
      padding-left: 75px;
    }
    &__remove-icon{
      filter: brightness(0) saturate(100%) invert(39%) sepia(100%) saturate(7357%) hue-rotate(-3deg) brightness(105%) contrast(106%);
       height: 16px;
      margin-right: 8px;
    }
  }
  &__section{
    width: 300px;
    padding: 0 80px 0 80px;
  }
}
</style>

