<template>
<section class="orders">
  <div class="orders__container">
    <ul>
      <li 
        class="orders__item"
         :class="{
            'orders__item--compact': selectedOrder && selectedOrder.productIds.length > 0,
            'orders__item--full': !selectedOrder || selectedOrder.productIds.length === 0,
            'orders__item--active': selectedOrder && selectedOrder.id === order.id && selectedOrder.productIds.length > 0
          }"
        v-for="order in orders"
        :key="order.id"
        @click="selectOrder(order)"       
      >
        <h2 class="orders__title" v-if="!selectedOrder || selectedOrder.productIds.length === 0">
          Длинное название прихода
        </h2>
        <div class="orders__info_first">
          <p>{{ getProductCount(order.id) }}</p>
          <span>Продукты</span>
        </div>
        <div class="orders__info">
          <time>{{ formatShortDate(order.date) }}</time>
          <time>{{ formatLongDate(order.date) }}</time>
        </div>
        <p class="orders__price" v-if="!selectedOrder || selectedOrder.productIds.length === 0">
          {{ order.productIds.length > 0 ? productInfo[order.productIds[0]].price || 'No price' : '' }}
        </p>
        <img 
          v-if="!selectedOrder || selectedOrder.productIds.length === 0" 
          class="orders__item_remove" 
          src="@/assets/remove.png" 
          alt="remove"
          @click.stop="removeOrder(order.id)"
        >
      </li>
    </ul>
  </div>
  <transition name="fade">
  <aside v-if="selectedOrder && selectedOrder.productIds.length > 0" class="orders__product-details">
    <div class="orders__close-btn" @click="closeProductDetails">X</div>
    <h2>Длиное название прихода</h2>
    <section>
      <button class="orders__add-product" type="button">Добавить продукт</button>
    </section>
    <ul>
      <li 
        v-for="productId in selectedOrder.productIds" 
        :key="productId" 
        class="orders__product-item"
      >
        <img class="orders__product-photo" :src="productInfo[productId].photo" alt="laptop">
        <div>
          <h3 class="orders__product-name">
            {{ productInfo[productId].title }}
          </h3>
          <p class="orders__product-sn">SN-12-347897</p>
        </div>
        <span class="orders__product-status">Свободен</span>
        <img 
          class="orders__item_remove" 
          src="@/assets/remove.png" 
          alt="remove"
          @click="removeProduct(productId)"
        >
      </li>
    </ul>
  </aside>
</transition>
  </section>
</template>




<script setup>
import { ref, computed } from 'vue';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import ordersData from '../data/orders.json';
import productsData from '../data/products.json';

const orders = ref(ordersData);
const products = ref(productsData);
const selectedOrder = ref(null);

const productInfo = computed(() => {
  return products.value.reduce((acc, product) => {
    acc[product.id] = {
      photo: product.photo,
      title: product.title,
      price: product.price?.map(p => `${p.value} ${p.symbol}`).join(', ') || 'No price'
    };
    return acc;
  }, {});
});

const getProductCount = (orderId) => {
  const order = orders.value.find(order => order.id === orderId);
  return order ? order.productIds.length : 0;
};

const formatDate = (date, formatStr, locale) => format(parseISO(date), formatStr, { locale });

const formatShortDate = (date) => formatDate(date, 'MM/dd');
const formatLongDate = (date) => formatDate(date, 'dd/MMM/yyyy', ru);

const selectOrder = (order) => selectedOrder.value = order;

const removeOrder = (orderId) => {
orders.value = orders.value.filter(order => order.id !== orderId);
};
const removeProduct = (productId) => {
    const index = selectedOrder.value.productIds.indexOf(productId);
    if (index !== -1) {
      selectedOrder.value.productIds.splice(index, 1);
    }
};
const closeProductDetails = () => {
  selectedOrder.value = null;
};

</script>



<style lang="scss">
.orders{
    display: flex;
    margin: 0 auto;
    justify-content: center;
    padding-top: 95px;

    &__close-btn{
        background: white;
        border-radius: 50%;
        position: absolute;
        right: -8px;
        top: -17px;
        width: 30px;
        height: 27px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        font-size: 13px;
        cursor: pointer;
    }
    &__add-product{
        padding: 30px 0 20px 0;
        background: none;
        cursor: pointer;
        border: none;
        color: green;	
    }
    &__product-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &__product-name{
        font-size: 16px;
        text-decoration: underline;
    }
	&__container{
		display: flex;
	}
	&__item--active{
		background: red !important;
	}
	&__product-photo{
		height: 49px;
	}
	&__item_remove{
		height: 25px;
		cursor: pointer;
	}
	&__item--full{
		width: 770px;
	}
	&__product-sn{
		color: black;
		opacity: 0.6;
	}
	&__product-status{
		color: yellowgreen;
	}
	&__item--compact {
        width: 207px;
    }
	&__item{
		display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background: white;
        margin-bottom: 10px;
        cursor: pointer;
        transition: width 0.3s ease;
	}
	&__info_first{
		display: flex;
		flex-direction: column;
	}
	&__info{
		display: flex;
		flex-direction: column;
	}
	&__title{
		font-weight: bold;
	}
	&__product-details{
		position: relative;
		padding: 20px;
		background-color: #f9f9f9; 
		border-top: 1px solid #ddd;
		margin-left: 30px;
		height: 600px;
		width: 740px;
	}
	&__product-price{
		color: green;
		font-weight: bold;
	}
}
</style>
