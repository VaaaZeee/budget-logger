import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionPageRoutingModule } from './transactions-routing.module';

import { TransactionsPage } from './transactions.page';
import { TransactionComponent } from './transaction/transaction.component';
import { IsEqualDatesPipeModule } from 'src/app/shared/pipes/compare/dates/is-equal-dates-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IsEqualDatesPipeModule,
    TransactionPageRoutingModule,
  ],
  declarations: [TransactionsPage, TransactionComponent],
})
export class TransactionsPageModule {}
