import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICON_LIST } from '../../constants/icon-list.consts';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss'],
})
export class IconListComponent implements OnInit {
  @Input() selectedIcon: string;
  @Output() setSelectedIcon = new EventEmitter<string>();
  iconList: string[] = ICON_LIST;

  constructor() {}

  ngOnInit() {}

  setSelectedItem(name: string) {
    this.selectedIcon = name;
    this.setSelectedIcon.emit(name);
  }
}
