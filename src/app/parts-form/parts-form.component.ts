import { Component, OnInit } from '@angular/core';
import { PartsService } from '../services/parts.service';
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

@Component({
  selector: 'app-parts-form',
  templateUrl: './parts-form.component.html',
  styleUrls: ['./parts-form.component.css']
})
export class PartsFormComponent implements OnInit {

  partsForm: FormGroup;
  modelos$: Observable<Modelos[]>;
  fabricantes$: Observable<Fabricantes[]>;

  constructor(private _partsService: PartsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.fabricantes$ = this._partsService.getFabricantes();
  }

  getModelos(manufacturer) {
    this.modelos$ = this._partsService.getModelos().pipe(map(modelos => {
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
