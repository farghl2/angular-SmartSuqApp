import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  count:number =0
  more_1: boolean = false

  constructor(private cartService: CartService){}
  ngOnInit(): void {
     this.cartService.cart.subscribe((res)=>{
      this.count = res.items.length
      if(this.count){
        this.more_1 = true;
      }else{
        this.more_1 =false
      }
     })



  }



}
