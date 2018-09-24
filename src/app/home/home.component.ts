import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.interface';
import { MatTableDataSource } from '@angular/material';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  product: Product;
  productsTableSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['uid', 'manufacturer', 'brand', 'group', 'parts', 'unitary', 'actions'];

  constructor(private _productsService: ProductService) { }

  ngOnInit() {
    this._productsService.getData().subscribe(data => {
      this.productsTableSource.data = data;
    });
  }

  view(obj: Product) {
    this.product = obj;
  }

  onShopping(obj) {
  }

  filter(value: string) {
    this.productsTableSource.filter = value.trim().toLowerCase();
  }
}
