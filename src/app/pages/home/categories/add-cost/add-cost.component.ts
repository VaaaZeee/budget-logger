import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/shared/models/category.model';

interface ArithmeticOperation {
  operation: '+' | '-' | '/' | 'x';
}

const OPREATIONS: ArithmeticOperation[] = [
  { operation: '+' },
  { operation: '-' },
  { operation: '/' },
  { operation: 'x' },
];

@Component({
  selector: 'app-add-cost',
  templateUrl: './add-cost.component.html',
  styleUrls: ['./add-cost.component.scss'],
})
export class AddCostComponent {
  @Input() category: Category;
  @Input() currency: string;
  newCost = '0';

  constructor(private modalCtrl: ModalController) {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel', 'add-cost-modal');
  }

  addCost() {
    if (this.isCalculated() && this.newCost !== '0') {
      this.modalCtrl.dismiss(
        {
          newCost: this.newCost,
        },
        'confirm',
        'add-cost-modal'
      );
    }
  }

  reset() {
    this.newCost = '0';
  }

  calculate() {
    let equationSplited = this.newCost.split(' ');
    for (let i = 1; i < equationSplited.length - 1; i++) {
      switch (equationSplited[i]) {
        case 'x':
          equationSplited[i + 1] = (
            +equationSplited[i - 1] * +equationSplited[i + 1]
          ).toString();
          equationSplited[i - 1] = null;
          equationSplited[i] = null;
          break;
        case '/':
          equationSplited[i + 1] = (
            +equationSplited[i - 1] / +equationSplited[i + 1]
          ).toString();
          equationSplited[i - 1] = null;
          equationSplited[i] = null;
          break;
      }
    }
    equationSplited = equationSplited.filter((num) => num !== null);
    let res = +equationSplited[0];
    for (let i = 1; i < equationSplited.length - 1; i++) {
      switch (equationSplited[i]) {
        case '+':
          res += +equationSplited[i + 1];
          break;
        case '-':
          res += -+equationSplited[i + 1];
          break;
      }
    }
    if (res === Infinity || res === -Infinity) {
      res = 0;
    }
    res = Math.round(res * 100) / 100;
    this.newCost = res.toString();
  }

  addNumber(num: string): void {
    if (this.newCost === '0') {
      this.newCost = num;
    } else {
      this.newCost += num;
    }
  }

  delete(): void {
    if (this.newCost[this.newCost.length - 1] === ' ') {
      this.newCost = this.newCost.substr(0, this.newCost.length - 3);
    } else {
      if (this.newCost.length - 1 <= 0) {
        this.newCost = '0';
      } else {
        this.newCost = this.newCost.substr(0, this.newCost.length - 1);
      }
    }
  }

  addSeparator(): void {
    const newCostSplit = this.newCost.split(' ');
    const lastNumber = newCostSplit[newCostSplit.length - 1];
    if (
      this.newCost[this.newCost.length - 1] !== ' ' &&
      !lastNumber.includes('.')
    ) {
      this.newCost += '.';
    }
  }

  addOperation(operation: ArithmeticOperation) {
    if (this.newCost !== '0') {
      if (this.newCost[this.newCost.length - 1] === ' ') {
        const replaceAt = this.newCost.length - 2;
        this.newCost =
          this.newCost.substr(0, replaceAt) + operation.operation + ' ';
      } else {
        this.newCost += ' ' + operation.operation + ' ';
      }
    }
  }

  isCalculated(): boolean {
    return !OPREATIONS.find((opp) => this.newCost.includes(opp.operation));
  }
}
