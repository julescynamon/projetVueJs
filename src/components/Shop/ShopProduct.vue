<template>
    <div class="product d-flex flex-column">
        <div class="product-image" :style="{ backgroundImage: `url(${product.image})` }"></div>
        <div class="p-10  d-flex flex-column">
            <h4>{{ product.title }}</h4>
            <p>{{ product.description }}</p>
            <div class="d-flex flex-row align-items-center">
                <span class="flex-fill"><strong>{{ product.price }}€</strong></span>
                <button class="btn btn-primary" @click="emmit('addProductToCart', product.id)">Ajouter au panier</button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

    import type { ProductInterface } from '@/interfaces';

    
    defineProps<{
        product: ProductInterface;
    }>();

    const emmit = defineEmits<{
        (e: 'addProductToCart', productId: number): void;
    }>();

</script>

<style lang="scss" scoped>
    .product {
        background-color: white;
        border: var(--border);
        border-radius: var(--border-radius);
            &-image {
                border-top-right-radius: var(--border-radius);
                border-top-left-radius: var(--border-radius);
                height: 150px;
                background-size: cover;
                background-position: center;
            }
    }


</style>