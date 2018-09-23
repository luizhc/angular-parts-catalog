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
  subtitle = 'Gerenciar Clientes';
  button = 'Adicionar';
  customers = new MatTableDataSource<Customer>();
  form: FormGroup;
  customer: Customer;

  displayedColumns: string[] = ['name', 'cpf', 'email', 'phone', 'address', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild('inputFocus') focusIn: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customerService.get().subscribe(data => {
      this.customers.data = data;
    });

    this.customers.paginator = this.paginator;
    this.customers.sort = this.sort;

    this.form = this.formBuilder.group({
      uid: new FormControl({ value: null, disabled: true }),
      name: [null, Validators.compose([Validators.required])],
      // tslint:disable-next-line:max-line-length
      cpf: [null, Validators.compose([Validators.required, Validators.pattern('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})')])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      phone: null,
      address: null
    });
    this.focusIn.nativeElement.focus();
  }

  getErrorMessage(field: string, nameField: string) {
    return this.form.get(field).hasError('required') ? `${nameField} obrigátorio.` :
      this.form.get(field).hasError(field) ? `${nameField} inválido.` : '';
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
    this.form.patchValue({ uid: obj.uid, name: obj.name, cpf: obj.cpf, email: obj.email, phone: obj.phone, address: obj.address });
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
