import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CustomDialogComponent>) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]]
    });
  }


  login() {
    this.dialogRef.close(this.form);
  }

  close() {
    this.dialogRef.close();
  }

}
