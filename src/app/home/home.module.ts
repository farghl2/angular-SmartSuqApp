import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';




import { CategoriesComponent } from './categories/categories.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { MessageComponent } from './message/message.component';
import { HomeService } from './home.service';

import { SliderComponent } from './slider/slider.component';






@NgModule({
    declarations: [
        HomeComponent,
        CategoriesComponent,
        MessageComponent,
        SliderComponent

    ],

    exports: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatIconModule,
        SharedModule,
        FormsModule,
        Ng2SearchPipeModule,
        MatButtonModule,
        MatChipsModule,






    ],
    providers:[HomeService]

})
export class HomeModule { }
