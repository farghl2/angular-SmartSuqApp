import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() data:any ='';
  @Output() item = new EventEmitter();
  itemQuantity:number =0;

  constructor(private cartService: CartService){}



  added:boolean = false;
  // product:any= {};







  ngOnInit(): void {
    // this.addedToCart();
    this.itemQuantity =  this.cartService.getQuantity(this.data);
    if(this.itemQuantity > 0) {
      this.added = true;
    }


  }

  add(){
    this.item.emit(this.data);
    this.added =true
    // this.addedToCart();




  }


  addItem(data:any){
    this.cartService.addToCart({
      quantity: 1,
      id: data.id,
      amount: data.amount,
      imageUrl: data.imageUrl,
      title: data.title
    })
    this.itemQuantity = this.cartService.getQuantity(data);
    if(this.itemQuantity > 0){
      this.added = true;
    }

  }

  removeItem(data:any){

    this.cartService.decreaseQuantity({
      quantity: 1,
      id: data.id,
      amount: data.amount,
      imageUrl: data.imageUrl,
      title: data.title

    })
    this.itemQuantity =  this.cartService.getQuantity(data)
    if(this.itemQuantity === 0){
      this.added = false;
    }


  }

  addedToCart(){

  }

}

