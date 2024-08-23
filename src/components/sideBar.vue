<template>
  <nav class="navigation">
    <img class="navigation__image" src="@/assets/people.jpeg" alt="Людина">
    <ul class="navigation__menu">
      <li class="navigation__menu__item">
        <router-link to="/OrdersPage" class='navigation__menu__route' active-class="active">ПРИХОД</router-link>
      </li>
      <li class="navigation__menu__item">
        <router-link to="/#" class='navigation__menu__route' active-class="active">ГРУПИ</router-link>
      </li>
      <li class="navigation__menu__item">
        <router-link to="/ProductsPage" class='navigation__menu__route' active-class="active">ПРОДУКТИ</router-link>
      </li>
      <li class="navigation__menu__item">
        <router-link to="/#" class='navigation__menu__route' active-class="active">ПОЛЬЗОВАТЕЛІ</router-link>
      </li>
      <li class="navigation__menu__item">
        <router-link to="/#" class='navigation__menu__route' active-class="active">НАСТРОЙКИ</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.navigation{
	width: 300px;
	background: white;
	display: flex;
	align-items: center;
	flex-direction: column;
	height: 100vh;
	padding-top: 40px;
	&__image{
		border-radius: 50%;
		width: 100px;
	}
	&__menu__route{
		color: black;
    text-decoration: none;
  }
  &__menu__route.router-link-exact-active{
    border-bottom: 2px solid green;
  }
	&__menu{
		padding-top: 40px;

		&__item{
			list-style-type: none;
			padding-top: 12px;
		}
	}
}
</style>