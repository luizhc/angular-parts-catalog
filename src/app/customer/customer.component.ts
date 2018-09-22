import { Customer } from './../models/customer.interface';
import { CustomerService } from './../services/customer.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  title = 'Clientes';
  subtitle = 'Cadastro de Clientes';
  button = 'Adicionar';
  customers = new MatTableDataSource<Customer>();
  form: FormGroup;
  customer: Customer;

  displayedColumns: string[] = ['uid', 'name', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild('inputFocus') focusIn: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.customerService.get().subscribe(data => {
      this.customers.data = data;
    });

    this.customers.paginator = this.paginator;
    this.customers.sort = this.sort;

    this.form = this.formBuilder.group({
      uid: new FormControl({ value: null, disabled: true }),
      name: [null, Validators.compose([Validators.required])]
    });
    this.focusIn.nativeElement.focus();
  }

  save() {
    if (!this.form.get('uid').value) {
      this.customerService.post(this.form.value);
    } else {
      this.customerService.put(this.customer.uid, this.form.value);
    }
    this.form.reset();
    this.button = 'Adicionar';
    this.focusIn.nativeElement.focus();
  }

  edit(obj) {
    this.form.patchValue({ uid: obj.uid, name: obj.name });
    this.customer = obj;
    this.button = 'Atualizar';
    this.focusIn.nativeElement.focus();
  }

  delete(obj) {
    this.customerService.delete(obj.uid);
    this.form.reset();
    this.button = 'Adicionar';
    this.focusIn.nativeElement.focus();
  }

  filter(value: string) {
    this.customers.filter = value.trim().toLowerCase();
  }

}
