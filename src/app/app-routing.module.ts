import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { SectionsComponent } from './sections/sections.component';


const routes: Routes = [
{path:'',redirectTo:"/home", pathMatch:'full'},
{path:'home',component:HomeComponent},
{path:"sections", component:SectionsComponent},
{path:"cart", component:CartComponent},
{path:'**', redirectTo:"/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    useHash: true,
})],
  exports: [RouterModule],

})
export class AppRoutingModule { }
