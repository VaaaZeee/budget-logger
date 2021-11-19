import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionPageRoutingModule } from './transaction-routing.module';

import { TransactionPage } from './transaction.page';
import { CompareDatesPipeModule } from 'src/app/shared/pipes/compare/compare-dates-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompareDatesPipeModule,
    TransactionPageRoutingModule,
  ],
  declarations: [TransactionPage],
})
export class TransactionPageModule {}
