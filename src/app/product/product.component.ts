import { ProductService } from '../services/product.service';
import { ModelsService } from '../services/models.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, switchMap, combineLatest } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { Product } from '../models/product.interface';
import { ManufacturerService } from '../services/manufacturer.service';
import { Manufacturer } from '../models/manufacturer.interface';
import { PartService } from '../services/part.service';
import { Part } from '../models/part.interface';

export interface Modelos {
  id: number;
  idFabricante: string;
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
  manufacturers$: Observable<Manufacturer[]>;
  groups$: Observable<Group[]>;
  parts$: Observable<Part[]>;
  product: Product;
  productsTableSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['uid', 'manufacturer', 'brand', 'group', 'parts', 'unitary', 'actions'];

  constructor(private _modelsService: ModelsService, private fb: FormBuilder,
    private _productsService: ProductService, private _manufacturesService: ManufacturerService,
    private _partService: PartService) { }

  ngOnInit() {
    this.buildForm();

    this.manufacturers$ = this._manufacturesService.get();

    this.groups$ = this._productsService.getGroups();

    this._productsService.getData().subscribe(data => {
      this.productsTableSource.data = data;
    });

    this.parts$ = this._partService.get();
  }

  getModelos(obj: Manufacturer) {
    this.modelos$ = this._modelsService.getModelos().pipe(map(modelos => {
      return modelos.filter(modelo => modelo.idFabricante === obj.uid);
    }));
  }

  buildForm() {
    this.productForm = this.fb.group({
      manufacturer: ['', Validators.required],
      brand: this.fb.group({
        nome: ['', Validators.required],
      }),
      createdAt: [new Date().toISOString().split('T')[0]],
      url: ['', Validators.required],
      unitary: ['', Validators.required],
      group: this.fb.group({
        nome: ['', Validators.required],
      }),
      parts: this.fb.group({
        name: ['', Validators.required],
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
    this.productForm.patchValue(obj);
    this.getModelos(obj.manufacturer);
    this.product = obj;
  }

  delete(obj: Product) {
    this._productsService.deleteProduct(obj.uid);
    this.productForm.reset();
  }


  filter(value: string) {
    this.productsTableSource.filter = value.trim().toLowerCase();
  }
}
