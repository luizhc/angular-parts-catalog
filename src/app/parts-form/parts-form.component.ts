import { PartsService } from './../services/parts.service';
import { ModelsService } from './../services/models.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

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
  id: number;
  Nome: string;
}

@Component({
  selector: 'app-parts-form',
  templateUrl: './parts-form.component.html',
  styleUrls: ['./parts-form.component.css']
})
export class PartsFormComponent implements OnInit {

  partsForm: FormGroup;
  modelos$: Observable<Modelos[]>;
  fabricantes$: Observable<Fabricantes[]>;
  groups$: Observable<Group[]>;

  constructor(private _modelsService: ModelsService, private fb: FormBuilder,
  private _partsService: PartsService) { }

  ngOnInit() {
    this.buildForm();
    this.fabricantes$ = this._modelsService.getFabricantes();

    this.groups$ = this._partsService.getGroups();
  }

  getModelos(manufacturer) {
    this.modelos$ = this._modelsService.getModelos().pipe(map(modelos => {
      return modelos.filter(modelo => modelo.idFabricante === manufacturer.value);
    }));
  }

  buildForm() {
    this.partsForm = this.fb.group({
      manufacturer: ['', Validators.required],
      brand: ['', Validators.required],
      createdAt: [new Date().toISOString().split('T')[0]],
      parts: ['', Validators.required],
      aplication: ['', Validators.required]
    });
  }

}
