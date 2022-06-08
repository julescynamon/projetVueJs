<template>
    <div class="p-20 d-flex flex-column">
        <section class="mb-20">
            <h3 class="mb-10">rechercher</h3>
            <input :value="filters.search"
                    @input="emit('updateFilter', { search: ($event.target as HTMLInputElement).value})"
                    type="text"
                    placeholder="rechercher"
                    >
        </section>
        <section class="mb-20">
            <h3 class="mb-10">Trier par prix</h3>
            <div class="mb-5"
                v-for="priceRange of ([[0, 10000], [800, 1000], [1000, 1500], [1500, 2000], [2000, 10000] ] as [number, number][])" 
                >
                <input  
                        :checked="filters.priceRange[0] === priceRange[0]"
                        type="radio" 
                        name="priceRange" 
                        :id="priceRange[0] + ''" 
                        @input="emit('updateFilter', { priceRange })"
                        >
                <label :for="priceRange[0] + ''">{{
                    priceRange[0] === 0 ? 'Tous les prix' :
                    priceRange[0] === 2000 ? '2000€ et plus' :
                    `Entre ${priceRange[0]}€ et ${priceRange[1]}€`
                }}</label>
            </div>
        </section>
        <section class="mb-20 flex-fill">
            <h3 class="mb-10">Trier par catégorie</h3>
            <p 
                class="category"
                :class="{ selected: filters.category === category }"
                v-for="category in (['all', 'desktop', 'streaming', 'gamer'] as Category[])"
                @click="emit('updateFilter', { category })"
                > 
                {{ category }}
                </p>
        </section>
        <small>Nombres de résultats : {{ nbrOfProducts }}</small>
        <button class="btn btn-danger" @click="emit('updateFilter', {})">Supprimer les filtres</button>
    </div>
</template>

<script setup lang="ts">
    
    import type { FiltersInterface, FilterUpdate, Category } from '@/interfaces';


    defineProps<{
        filters: FiltersInterface,
        nbrOfProducts: number
    }>();

    const emit = defineEmits<{
        (e: 'updateFilter', filterUpdate: FilterUpdate): void;
    }>();

</script>

<style lang="scss" scoped>

    .category {
        cursor: pointer;
        font-size: 14px;
        line-height: 18px;
        &:hover{
            text-decoration: underline;
        }
    }

    .selected {
        font-weight: bold;
        text-decoration: underline;
    }

</style>