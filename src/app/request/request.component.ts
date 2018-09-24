import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product.interface';
import { RequestService } from '../services/request.service';
import { Request } from '../models/request.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  form: FormGroup;
  request: Request;
  reqTableSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['uid', 'product', 'unitary', 'quantity', 'total', 'actions'];

  constructor(public fb: FormBuilder,
    private _productService: ProductService,
    private route: ActivatedRoute,
    private _requestService: RequestService) { }

  ngOnInit() {
    this.form = this.fb.group({
      uid: [''],
      quantity: ['', Validators.required],
      total: ['', Validators.required],
      createdAt: [new Date().toISOString().split('T')[0]],
      product: this.fb.group({
        name: ['', Validators.required],
        unitary: ['', Validators.required]
      })
    });

    this.route.params.pipe(
      switchMap((params: Params) => this._productService.getProductById(params['id']).valueChanges())
    ).subscribe(product => {
      this.form.patchValue({
        product: {
          name: product.parts.name,
          unitary: product.unitary
        }
      });
    });

    this._requestService.getData().subscribe(data => {
      this.reqTableSource.data = data;
    });
  }

  calculateTotal(value) {
    const total = value *= +this.form.get('product.unitary').value;
    this.form.controls['total'].patchValue(total);
  }

  save({ value, valid }: { value: Request, valid: boolean }) {
    console.log(valid);
    console.log(value);
    if (valid) {
      if (!value.uid) {
        this.form.controls['uid'].patchValue(null);
        this._requestService.create(value);
      } else {
        this._requestService.update(this.request.uid, value);
      }
      this.form.reset();
    }
  }

  edit(obj: Request) {
    this.form.patchValue(obj);
    this.request = obj;
  }

  delete(obj: Request) {
    this._requestService.delete(obj.uid);
    this.form.reset();
  }


  filter(value: string) {
    this.reqTableSource.filter = value.trim().toLowerCase();
  }

  reset() {
    this.form.reset();
    this.request = null;
  }

}
