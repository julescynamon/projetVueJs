<template>
    <div>
        <ShopProductList :products="products" @add-product-to-cart="emmit('addProductToCart', $event)" />
    </div>
</template>

<script setup lang="ts">
    import type { ProductInterface } from '@/interfaces';
    import ShopProductList from './ShopProductList.vue';
    
    defineProps<{
        products: ProductInterface[];
    }>();

    const emmit = defineEmits<{
        (e: 'addProductToCart', productId: number): void;
    }>();

</script>

<style lang="scss" scoped>



</style>