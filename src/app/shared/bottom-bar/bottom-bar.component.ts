import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent implements OnInit {
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
