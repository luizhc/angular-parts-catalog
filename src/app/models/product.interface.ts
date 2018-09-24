import { Modelos, Group } from '../product/product.component';
import { Part } from './part.interface';
import { Manufacturer } from './manufacturer.interface';

export interface Product {
    uid?: string;
    manufacturer: Manufacturer;
    brand: Modelos;
    createdAt: string;
    parts: Part;
    group: Group;
    url: string;
    unitary: number;
}
