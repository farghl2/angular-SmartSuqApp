import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SpinnerComponent } from './spinner/spinner.component';
import { CardComponent } from './card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { SnakBarComponent } from './snak-bar/snak-bar.component';
import { ScrollUpButtonComponent } from './scroll-up-button/scroll-up-button.component';
import { SearchComponent } from './search/search.component';





@NgModule({
  declarations: [
    HeaderComponent,
    BottomBarComponent,
    SpinnerComponent,
    CardComponent,
    SnakBarComponent,
    ScrollUpButtonComponent,
    SearchComponent,


  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    RouterModule,
    BrowserModule,
    MatButtonModule
  ],
  exports:[
    HeaderComponent,
    BottomBarComponent,
    SpinnerComponent,
    CardComponent,
    ScrollUpButtonComponent

  ]

})
export class SharedModule { }
