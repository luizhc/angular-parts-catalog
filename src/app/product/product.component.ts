import { ProductService } from '../services/product.service';
import { ModelsService } from '../services/models.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { Product } from '../models/product.interface';

export interface Fabricantes {
  id: number;
  nome: string;
}

export interface Modelos {
  id: number;
  idFabricante: number;
  nome: string;
}

export interface Group {
  uid: number;
  nome: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  modelos$: Observable<Modelos[]>;
  fabricantes$: Observable<Fabricantes[]>;
  groups$: Observable<Group[]>;
  product: Product;
  productsTableSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['uid', 'manufacturer', 'brand', 'group', 'parts', 'actions'];

  constructor(private _modelsService: ModelsService, private fb: FormBuilder,
    private _productsService: ProductService) { }

  ngOnInit() {
    this.buildForm();
    this.fabricantes$ = this._modelsService.getFabricantes();

    this.groups$ = this._productsService.getGroups();

    this._productsService.getData().subscribe(data => {
      this.productsTableSource.data = data;
    });
  }

  getModelos(manufacturerId: number) {
    this.modelos$ = this._modelsService.getModelos().pipe(map(modelos => {
      return modelos.filter(modelo => modelo.idFabricante === manufacturerId);
    }));
  }

  buildForm() {
    this.productForm = this.fb.group({
      manufacturer: this.fb.group({
        id: ['', Validators.required],
      }),
      brand: this.fb.group({
        id: ['', Validators.required],
      }),
      createdAt: [new Date().toISOString().split('T')[0]],
      group: this.fb.group({
        uid: ['', Validators.required],
      }),
      parts: this.fb.group({
        uid: ['', Validators.required],
      })
    });
  }

  reset() {
    this.productForm.reset();
    this.product = null;
  }

  save({ value, valid }: { value: Product, valid: boolean }) {
    if (valid) {
      if (!value.uid) {
        this._productsService.createProduct(value);
      } else {
        this._productsService.updateProduct(this.product.uid, value);
      }
      this.productForm.reset();
    }
  }

  edit(obj: Product) {
    this.productForm.patchValue({
      uid: obj.uid, manufacturer: { id: obj.manufacturer.id }, brand: { id: obj.brand.id },
      group: { uid: obj.group.uid }, parts: { uid: obj.parts.uid }, createdAt: obj.createdAt
    });
    this.getModelos(obj.manufacturer.id);
    this.product = obj;
  }

  delete(obj) {
    this._productsService.deleteProduct(obj.uid);
    this.productForm.reset();
  }


  filter(value: string) {
    this.productsTableSource.filter = value.trim().toLowerCase();
  }
}
