<template>
    <div class="app-container" :class="{
            gridEmpty: cartEmpty
        }">
        <TheHeader class="header b1" />
        <Shop @update-filter="updateFilter" 
            @add-product-to-cart="addToCart" 
            :products="filteredProduct" 
            :filters="state.filters"
            class="shop"
            />
        <Cart v-if="!cartEmpty" 
            :cart="state.cart" 
            class="cart" 
            @remove-product-from-cart="removeProductFromCart"
            />
        <TheFooter class="footer"/>
    </div>

</template>

<script setup lang="ts">
    import TheHeader from './components/Header.vue';
    import TheFooter from './components/Footer.vue';
    import Cart from './components/Cart/Cart.vue';
    import Shop from './components/Shop/Shop.vue';
    import data from './data/products';
    import { computed, reactive } from 'vue';
    import type { FiltersInterface, FilterUpdate, ProductCartInterface, ProductInterface } from './interfaces';
import { DEFAULT_FILTERS } from './data/filters';


    const state = reactive<{
        products: ProductInterface[],
        cart: ProductCartInterface[],
        filters: FiltersInterface
    }>({
        products: data,
        cart: [],
        filters: { ...DEFAULT_FILTERS }
    });

    function addToCart(productId: number) : void {
        // on cherche si le produit qu'on souhaite ajouter existe
        const product = state.products.find(product => product.id === productId);
        // si il y a un produit on regarde si il est déjà dans le panier
        if (product) {

            const productInCart = state.cart.find(productInCart => productInCart.id === product.id);
            // si le produit est déjà dans le panier on incrémente la quantité
            if (productInCart) {

                productInCart.quantity++;
            // sinon on l'ajoute au panier
            } else {

                state.cart.push({ ...product, quantity: 1 });
            }
        }
            
    }
    // on supprime un produit du panier
    function removeProductFromCart(productId: number) : void {
        const productFromCart = state.cart.find(product => product.id === productId);
        if (productFromCart) {
            if (productFromCart?.quantity === 1) {
                state.cart= state.cart.filter(product => product.id !== productId);
            } else {
                productFromCart.quantity--;
            }
        }
    }

    const cartEmpty = computed(() => state.cart.length === 0);

    const filteredProduct = computed(() => {
        return state.products.filter(product => {
            if (product.title.toLowerCase().startsWith(state.filters.search.toLowerCase()) && 
                product.price >= state.filters.priceRange[0] &&
                product.price <= state.filters.priceRange[1] &&
                (product.category === state.filters.category || state.filters.category === 'all')) {
                return true;
            } else {
                return false;
            }
        });
    });

    function updateFilter(filterUpdate: FilterUpdate) : void {
        if(filterUpdate.search !== undefined) {
            state.filters.search = filterUpdate.search;
        } else if(filterUpdate.priceRange) {
            state.filters.priceRange = filterUpdate.priceRange;
        } else if(filterUpdate.category) {
            state.filters.category = filterUpdate.category;
        } else {
            state.filters = DEFAULT_FILTERS;
        }
    }

</script>

<style lang="scss">
    @import './assets/scss/base.scss';
    @import './assets/scss/debug.scss';

    .app-container {
        min-height: 100vh;
        display: grid;
        grid-template-areas: "header header" "shop cart" "footer footer";
        grid-template-columns: 75% 25%;
        grid-template-rows: 48px auto 48px;
    }

    .gridEmpty {
        grid-template-areas: "header" "shop" "footer";
        grid-template-columns: 100%;
    }

    .header {
        grid-area: header;
    }

    .shop {
        grid-area: shop;
    }

    .cart {
        grid-area: cart;
        border-left: var(--border);
        background-color: white;
    }

    .footer {
        grid-area: footer;
    }
</style>

