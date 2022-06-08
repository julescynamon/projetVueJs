<template>
    <div class="d-flex flex-row">
        <ShopFilters class="shop-filter"
                    :nbr-of-products="products.length"
                    :filters="filters"
                    @update-filter="emmit('updateFilter', $event)"/>
        <ShopProductList
            class="flex-fill"
            :products="products" 
            @add-product-to-cart="emmit('addProductToCart', $event)" 
            />
    </div>
</template>

<script setup lang="ts">
    import type { FiltersInterface, FilterUpdate, ProductInterface } from '@/interfaces';
    import ShopProductList from './ShopProductList.vue';
import ShopFilters from './ShopFilters.vue';
    
    defineProps<{
        products: ProductInterface[],
        filters: FiltersInterface
    }>();

    const emmit = defineEmits<{
        (e: 'addProductToCart', productId: number): void;
        (e: 'updateFilter', updateFilter: FilterUpdate): void;
    }>();

</script>

<style lang="scss" scoped>

.shop-filter {
    flex: 0 0 200px;
}

</style>