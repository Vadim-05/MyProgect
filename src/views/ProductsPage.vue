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
      <section 
        class="product__item" 
        v-for="product in filteredProducts" 
        :key="product.id"
      >
        <figure>
          <img class="product__image" :src="product.photo" alt="Product image" />
        </figure>
        <div>
          <h3 class="product__font-size product__title">{{ product.title }}</h3>
          <p class="product__font-size product__serial-number">SN-12-347897</p>
        </div>
        <p class="product__font-size product__status">Свободен</p>
        <section>
          <p class="product__font-size product__guarantee-start">с {{ product.guarantee.start }}</p>
          <p class="product__font-size product__guarantee-end">по {{ product.guarantee.end }}</p>
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
        <h2>Вы уверены, что хотите удалить продукт?</h2>
        <div>
          <img class='product__modal-window-img'  :src="selectedProduct.photo">
          <div>
            <span>{{ selectedProduct.title }}</span>
            <p>{{ selectedProduct.serialNumber }}</p>
          </div>
          <div class="modal__actions">
            <button @click="removeConfirmedProduct">Да, удалить</button>
            <button @click="closeModal">Отмена</button>
          </div>
        </div>
      </div>
    </template>
    </ModalWindow>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue';
import productsData from '../data/products.json';
import ModalWindow from '@/components/ModalWindow.vue';
const isModalVisible = ref(false);
const selectedProduct = ref(null);
const searchQuery = ref('');
const products = ref([...productsData]);

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
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
</script>


<style lang="scss">
.product{
	padding-top: 60px;

	&__item{
		display: flex;
		background: white;
		margin-bottom: 10px;
		margin-top: 10px;
		justify-content: space-between;
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
	&__image{
		height: 80px
	}
	&__font-size{
		font-size: 15px;
	}
  &__modal-window-img{
    height: 40px;
  }
}
</style>
