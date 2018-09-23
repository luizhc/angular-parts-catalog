import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Part } from '../models/part.interface';
import { PartService } from '../services/part.service';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {

  title = 'Peças';
  subtitle = 'Gerenciar Peças';
  button = 'Adicionar';
  parts = new MatTableDataSource<Part>();
  form: FormGroup;
  part: Part;

  displayedColumns: string[] = ['name', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild('inputFocus') focusIn: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private partService: PartService,
    public dialog: MatDialog,
    // private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.partService.get().subscribe(data => {
      this.parts.data = data;
    });

    this.parts.paginator = this.paginator;
    this.parts.sort = this.sort;

    this.form = this.formBuilder.group({
      uid: new FormControl({ value: null, disabled: true }),
      name: [null, Validators.compose([Validators.required])]
    });
    this.focusIn.nativeElement.focus();
  }

  save() {
    if (!this.form.get('uid').value) {
      this.partService.post(this.form.value);
    } else {
      this.partService.put(this.part.uid, this.form.value);
    }
    this.form.reset();
    this.button = 'Adicionar';
    this.focusIn.nativeElement.focus();
  }

  edit(obj) {
    this.form.patchValue({ uid: obj.uid, name: obj.name });
    this.part = obj;
    this.button = 'Atualizar';
    this.focusIn.nativeElement.focus();
  }

  delete(obj) {
    this.partService.delete(obj.uid);
    this.form.reset();
    this.button = 'Adicionar';
    this.focusIn.nativeElement.focus();
  }

  filter(value: string) {
    this.parts.filter = value.trim().toLowerCase();
  }

}
