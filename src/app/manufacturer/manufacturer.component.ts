import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Manufacturer } from '../models/manufacturer.interface';
import { ManufacturerService } from '../services/manufacturer.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

  title = 'Fabricantes';
  subtitle = 'Gerenciar Fabricantes';
  button = 'Adicionar';
  manufacturers = new MatTableDataSource<Manufacturer>();
  form: FormGroup;
  manufacturer: Manufacturer;

  displayedColumns: string[] = ['name', 'cnpj', 'email', 'phone', 'address', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild('inputFocus') focusIn: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private manufacturerService: ManufacturerService
  ) { }

  ngOnInit() {
    this.manufacturerService.get().subscribe(data => {
      this.manufacturers.data = data;
    });

    this.manufacturers.paginator = this.paginator;
    this.manufacturers.sort = this.sort;

    this.form = this.formBuilder.group({
      uid: new FormControl({ value: null, disabled: true }),
      name: [null, Validators.compose([Validators.required])],
      // tslint:disable-next-line:max-line-length
      cnpj: [null, Validators.compose([Validators.required])],
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
      this.manufacturerService.post(this.form.value);
    } else {
      this.manufacturerService.put(this.manufacturer.uid, this.form.value);
    }
    this.form.reset();
    this.button = 'Adicionar';
    this.focusIn.nativeElement.focus();
  }

  edit(obj) {
    this.form.patchValue({ uid: obj.uid, name: obj.name, cnpj: obj.cnpj, email: obj.email, phone: obj.phone, address: obj.address });
    this.manufacturer = obj;
    this.button = 'Atualizar';
    this.focusIn.nativeElement.focus();
  }

  delete(obj) {
    this.manufacturerService.delete(obj.uid);
    this.form.reset();
    this.button = 'Adicionar';
    this.focusIn.nativeElement.focus();
  }

  filter(value: string) {
    this.manufacturers.filter = value.trim().toLowerCase();
  }

}
