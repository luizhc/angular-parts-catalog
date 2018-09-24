import { Component, OnInit } from '@angular/core';

import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  opened = true;
  over = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat';
  watcher: Subscription;
  user: User;

  constructor(media: ObservableMedia, private dialog: MatDialog, public _auth: AuthService) {
    this.watcher = media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });
  }

  ngOnInit() {
    this._auth.user$.subscribe(user => { this.user = user; });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(CustomDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: NgForm) => {
      console.log('Dialog output:', data);
      if (data.valid) {
        this._auth.emailLogin(data.value['email'], data.value['password']);
      }
    }
    );
  }

  logout() {
    this._auth.logOut();
  }

}
