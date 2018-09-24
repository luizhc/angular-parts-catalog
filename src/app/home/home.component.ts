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
  displayedColumns = ['uid', 'manufacturer', 'brand', 'group', 'parts', 'unitary', 'actions'];
  productsTableSource = new MatTableDataSource<Product>();

  constructor(private _productsService: ProductService) {
    // function to filter inside nested object
    this.productsTableSource.filterPredicate = (order, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();

      const listAsFlatString = (obj): string => {
        let returnVal = '';

        Object.values(obj).forEach((val) => {
          if (typeof val !== 'object') {
            returnVal = returnVal + ' ' + val;
          } else if (val !== null) {
            returnVal = returnVal + ' ' + listAsFlatString(val);
          }
        });

        return returnVal.trim().toLowerCase();
      };

      return listAsFlatString(order).includes(transformedFilter);
    };
  }

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

  filter(filterValue: string) {
    this.productsTableSource.filter = filterValue;
  }
}
