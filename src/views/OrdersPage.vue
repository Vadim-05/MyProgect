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
            @click.stop="confirmOrderRemoval(order)"
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
              @click.stop="confirmProductRemoval(productId)"
            >
          </li>
        </ul>
      </aside>
    </transition>

<ModalWindow class='modal-window' :isVisible="isModalVisible" @close="closeModal">
  <template #default>
    <div>
      <div>
        <h2 class="modal-window__title">
          {{ modalType === 'order' ? 'Вы уверены, что хотите удалить заказ?' : 'Вы уверены, что хотите удалить продукт?' }}
        </h2>
      </div>
      <div class="modal-window__body">
        <div class="modal-window__details">
          <p class="product__modal-window__info">
            {{ modalType === 'order' ? 'Удаление всего заказа. Это действие необратимо.' : '' }}</p>
          <div v-if="modalType === 'product'" class="product__modal-window__product-details">
            <div class="modal-window__product-info">
              <img 
                class="modal-window__product-photo" 
                :src="productInfo[itemToRemove].photo" 
                alt="Product Photo"
              />
              <div>
                <h3 class="modal-window__product-description">
                  {{ productInfo[itemToRemove].title }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product__modal-window__actions">
        <button class="product__modal-window__button--cancel" @click="closeModal">ОТМЕНИТЬ</button>
        <button class="product__modal-window__button--remove" @click="confirmRemoval">
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

  </section>
</template>


<script setup>
import { ref, computed } from 'vue';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import ordersData from '../data/orders.json';
import productsData from '../data/products.json';
import ModalWindow from '@/components/ModalWindow.vue';

const orders = ref(ordersData);
const products = ref(productsData);
const selectedOrder = ref(null);
const isModalVisible = ref(false);
const modalType = ref(null);
const itemToRemove = ref(null);

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

const selectOrder = (order) => {
  selectedOrder.value = order;
};

const confirmOrderRemoval = (order) => {
  itemToRemove.value = order;
  modalType.value = 'order';
  isModalVisible.value = true;
};

const confirmProductRemoval = (productId) => {
  itemToRemove.value = productId;
  modalType.value = 'product';
  isModalVisible.value = true;
};

const confirmRemoval = () => {
  if (modalType.value === 'order' && itemToRemove.value) {
    orders.value = orders.value.filter(order => order.id !== itemToRemove.value.id);
  } else if (modalType.value === 'product' && selectedOrder.value) {
    selectedOrder.value.productIds = selectedOrder.value.productIds.filter(id => id !== itemToRemove.value);
  }
  isModalVisible.value = false;
  itemToRemove.value = null;
};

const closeModal = () => {
  isModalVisible.value = false;
  itemToRemove.value = null;
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
    &__title{
      font-size: 20px;
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
  &__price{
    width: 83px;
    padding: 0 69px;
  }
  &__item--compact {
    width: 207px;
  }
  &__item{
    display: flex;
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
    width: 80px;
    padding: 0 36px 0 0;
  }
  &__info{
    display: flex;
    flex-direction: column;
  }
  &__title{
    padding-right: 55px;
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
.modal-window{

  &__title{
    border-bottom: 1px solid silver;
    font-size: 21px;
    padding: 21px 0 30px 29px; 
  }
  &__body{
    display: flex;
    padding: 38px 29px;
    align-items: center;

    &::before{
      content: "•"; 
      color: black; 
      font-size: 30px; 
      margin-right: 10px;
      color: green;
    }
  }
  &__product-photo{
    height: 80px;
    width: 120px;
  }
  &__product-description{
      font-size: 15px;
      margin: 0 25px;
      border-bottom: 1px solid silver; 
  }
  &__serial-number{
    padding-top: 8px;
    font-size: 15px;
    color: black;
    opacity: 0.6;
    border-bottom: 1px solid silver;
    width: fit-content;
  }
  &__product-info{
    display: flex;  
    align-items: center;
  }
}
</style>
