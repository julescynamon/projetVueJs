import type { ProductInterface } from "./product.interfaces";

export interface ProductCartInterface extends ProductInterface {
    quantity: number; 
}