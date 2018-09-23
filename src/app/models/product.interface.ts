import { Fabricantes, Modelos, Group } from '../product/product.component';
import { Part } from './part.interface';

export interface Product {
    uid?: string;
    manufacturer: Fabricantes;
    brand: Modelos;
    createdAt: string;
    parts: Part;
    group: Group;
}
