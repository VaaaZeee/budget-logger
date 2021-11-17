import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { COLOR_LIST } from '../../constants/color-list';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss'],
})
export class ColorListComponent implements OnInit {
  @Input() selectedColor: string;
  @Output() setSelectedColor = new EventEmitter<string>();
  colors: string[];

  constructor() {
    this.colors = COLOR_LIST;
  }

  ngOnInit() {}

  onColorSelect(color: string) {
    this.selectedColor = color;
    this.setSelectedColor.emit(color);
  }
}
