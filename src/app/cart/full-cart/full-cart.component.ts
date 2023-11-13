import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { min, retry } from 'rxjs/operators';
import { TelegramService } from 'src/app/services/telegram.service';








interface orderData {
  itemId: string;
  itemName: string;
  itemPrice: number;
  itemQuntity: number;
}
@Component({
  selector: 'app-full-cart',
  templateUrl: './full-cart.component.html',
  styleUrls: ['./full-cart.component.css'],
})
export class FullCartComponent implements OnInit {
  cartGoods: Cart = {items:[]};
  count: number = 0;
  total: number = 0;
  empty: boolean = false;
  orderedData: any[] = [];
  deliveryPrice:number=7;
  orderData: orderData = {
    itemId: '',
    itemName: '',
    itemPrice: 0,
    itemQuntity: 0,
  };

  telegramData:string =`الصنف|\tالكمية|\tسعرال1|\tالاجمالي\n`;

  constructor(private cartService:CartService,
    private fs: AngularFirestore,
    private httpClient:HttpClient,
    private datePipe: DatePipe,
    private router: Router,
    private modal:MatDialog,
    private tl:TelegramService
    ) {



  }


  ngOnInit(): void {
    this.getAllGoods();
    // this.noData();
    // this.ordersTime();

  }

  deleteAll(){
    this.cartService.clearCart();
  }

  getAllGoods() {
    // if ('cart' in localStorage) {
    //   this.cartGoods = JSON.parse(localStorage.getItem('cart')!);
    //   this.getTotal();
    // }
    this.cartService.cart.subscribe((res)=>{
      this.cartGoods = res;
      this.noData()
    })


  }

  plus(item:CartItem) {
    // this.cartGoods[index].quntity++;
    // localStorage.setItem('cart', JSON.stringify(this.cartGoods));
    // this.getTotal();

    this.cartService.addToCart(item)

  }

  minus(item: CartItem) {

    this.cartService.decreaseQuantity(item)
    this.noData()
  }

  deleteItem(item: CartItem) {
    // this.cartGoods.splice(index, 1);
    // localStorage.setItem('cart', JSON.stringify(this.cartGoods));
    this.cartService.removeItem(item);
    // this.getTotal();
    this.noData();
  }

  noData() {
    if (this.cartGoods.items.length == 0) {
      this.empty = true;
    }
  }



  getTotalCount(items: Array<CartItem>):number {

    return this.total = this.cartService.getTotal(items) +this.deliveryPrice;
  }
  getOrderData() {
    this.orderedData = this.cartGoods.items.map((item) => {
      return {
        itemId: item.id,
        itemName: item.title,
        itemPrice: item.amount,
        itemQuntity: item.quantity,
      };
    });

    for(const i of this.orderedData){
      this.telegramData +=`_________________________________\n${i.itemName}\t|\t${i.itemQuntity}\t|\t${i.itemPrice}\tج|\t${i.itemQuntity*i.itemPrice}\n`
    }
  }


orderTime(form:NgForm){
  let currentDate = new Date();
  const hour = currentDate.getHours() +1;
  const minuts = currentDate.getMinutes();
  if(hour >= 12 && !(hour >= 24 && minuts >=1 )){
    return this.onSubmit(form, true)
  }

    const dialogRef= this.modal.open(CartModalComponent,{
      width:'25rem',
      disableClose:true,


    });

    dialogRef.afterClosed().subscribe(res=>{
       return this.onSubmit(form, res);
    });



}

orderRes(){


}

onSubmit(form: NgForm, res:any) {
if(res){
  if (form.valid) {


    if(this.getTotalCount(this.cartGoods.items) >= 50){
    this.getOrderData();
    let currentTime = new Date();
   const currentDate= this.datePipe.transform(currentTime, 'short')
    this.fs
      .collection('orders')
      .add({
        name: form.value.firstN,
        number: form.value.phoneN,
        address: form.value.address,
        date: currentDate?.toString(),
        order: this.orderedData,
        netPrice:this.total,
        id:new Date().getTime().toString(),
        done:false,
      })
      .then((res) => {
        this.tl.sendMessage(`الاسم: ${form.value.firstN}\nالرقم: ${form.value.phoneN}\nالعنوان: ${form.value.address}\nالاجمالي: ${this.total}ج\n\n*******************************\n${this.telegramData}`).subscribe(msg=>{
          console.log('done');
        })
        this.cartGoods.items =[];
        this.cartService.clearCart();
        localStorage.clear();
        alert('تم الطلب بنجاح');
        this.empty = true;
        this.router.navigate(['/home'])

      })
      .catch((e) => {
        console.log(e);
      });
    }else {
      alert('يجب ان يكون الطلب اعلي من 50 جنية')
    }
  } else {

    console.log('Form is invalid');
  }
}
}




}
