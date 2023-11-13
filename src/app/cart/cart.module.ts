import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CartComponent } from './cart.component';
import { EmpCartComponent } from './emp-cart/emp-cart.component';
import { FullCartComponent } from './full-cart/full-cart.component';

import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';



import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CartModalComponent } from './full-cart/cart-modal/cart-modal.component';




@NgModule({
  declarations: [
    CartComponent,
    EmpCartComponent,
    FullCartComponent,
    CartModalComponent,

  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule

  ],
  exports: [
    EmpCartComponent,
    FullCartComponent
  ]
})
export class CartModule { }
