import type { Category } from "./filters.interfaces"; 

export interface ProductInterface {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: Category;
}