import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  resetModeAction,
  switchModeAction,
} from 'src/app/core/state/header/header.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentMounth: Date;
  isEditMode: boolean;
  private year = new Date().getFullYear();
  private mounth = new Date().getMonth() + 1;

  constructor(private store: Store, private menuCtrl: MenuController) {
    this.currentMounth = new Date(this.year, this.mounth, 0);
  }

  ngOnInit() {}

  switchToEdit() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.store.dispatch(switchModeAction({ mode: 'edit' }));
    } else {
      this.store.dispatch(resetModeAction());
    }
  }

  onOpenMenu() {
    this.menuCtrl.toggle('main');
  }

  nextMounth() {
    this.mounth += 1;
    this.currentMounth = new Date(this.year, this.mounth, 0);
  }

  previousMounth() {
    this.mounth -= 1;
    this.currentMounth = new Date(this.year, this.mounth, 0);
  }
}
