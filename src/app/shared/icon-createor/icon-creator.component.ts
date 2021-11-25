import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-icon-createor',
  templateUrl: './icon-creator.component.html',
  styleUrls: ['./icon-creator.component.scss'],
  animations: [],
})
export class IconCreatorComponent implements OnInit {
  @Input() selectedIcon: string;
  @Input() selectedColor: string;
  segmentValue = 'icon';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  segmentChanged(ev: any) {
    this.segmentValue = ev.detail.value;
  }

  setSelectedIcon(name: string) {
    this.selectedIcon = name;
  }

  setSelectedColor(color: string) {
    this.selectedColor = color;
  }

  createIcon() {
    if (this.selectedIcon && this.selectedColor) {
      this.modalCtrl.dismiss(
        {
          selectedIcon: this.selectedIcon,
          selectedColor: this.selectedColor,
        },
        'confirm',
        'icon-creator-modal'
      );
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel', 'icon-creator-modal');
  }
}
