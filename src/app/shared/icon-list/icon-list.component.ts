import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ICON_LIST } from '../constants/icon-list.consts';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss'],
})
export class IconListComponent implements OnInit {
  @Input() selectedIcon: string;
  iconList: string[] = ICON_LIST;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel', 'icon-list-modal');
  }

  selectIcon() {
    if (!!this.selectedIcon) {
      this.modalCtrl.dismiss(
        {
          selectedIcon: this.selectedIcon,
        },
        'confirm',
        'icon-list-modal'
      );
    }
  }

  setSelectedItem(name) {
    this.selectedIcon = name;
  }
}
