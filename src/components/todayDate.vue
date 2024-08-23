<template>
  <section class="date-time">
    <p class="date-time__day">
      {{ now.toLocaleDateString('uk-UA', { weekday: 'long' }) }}
    </p>
    <p class="date-time__details">
      <span class="date-time__date">
        {{ format(now, 'dd MMM, yyyy', { locale: uk }) }}
      </span>
      <img src='@/assets/clock.png' class="date-time__icon" alt='clock'/>
      <span class="date-time__time">
        {{ format(now, 'HH:mm') }}
      </span>
    </p>
  </section>
</template>

<script setup>
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

const now = new Date();
</script>
<style lang="scss">
.date-time{
  &__details{
    display: flex;
    align-items: center;
  }
  &__icon{
    width: 20px;
    padding: 0 10px 0 20px;
  }
}
</style>