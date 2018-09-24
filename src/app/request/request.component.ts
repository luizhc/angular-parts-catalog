import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product.interface';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  form: FormGroup;

  constructor(public fb: FormBuilder,
    private _productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      event: this.fb.group({
        title: ['', Validators.required],
        location: ['', Validators.required]
      })
    });

    this.route.params.pipe(
      switchMap((params: Params) => this._productService.getProductById(params['id']).valueChanges())
    ).subscribe((product: Product) => {
      console.log(product);
      // update the form controls
    });
  }

}
