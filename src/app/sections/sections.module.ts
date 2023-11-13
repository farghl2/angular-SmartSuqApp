import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsComponent } from './sections.component';
import { SectionCardComponent } from './section-card/section-card.component';
import { SharedModule } from "../shared/shared.module";

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';





@NgModule({
    declarations: [
        SectionsComponent,
        SectionCardComponent
    ],
    exports: [
        SectionsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        BrowserModule,
        FormsModule,
        Ng2SearchPipeModule,
        MatButtonModule,
        MatIconModule


    ]
})
export class SectionsModule { }
