import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnakBarComponent } from '../shared/snak-bar/snak-bar.component';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';
  cart = new BehaviorSubject<Cart>(this.getCartFromLocalStorage());
  subscribiton: Subscription |undefined;

  constructor(private _snackBar: MatSnackBar,  private router:Router) {}
    private getCartFromLocalStorage(): Cart {
      const cartData = localStorage.getItem(this.cartKey);

      return  cartData ? JSON.parse(cartData) : { items: [] };

    }

    private updateLocalStorage(cart: Cart): void {
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
    }


  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemCart = items.find((_item) => _item.id === item.id);

    if (itemCart) {
      itemCart.quantity += 1;
    } else {
      items.push(item);
    }

    const newCart = {items};
    this.cart.next(newCart);
    this.updateLocalStorage(newCart)

    this.snackBar('تم اضافة 1 منتج للعربة')
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.amount * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart() {

    this.cart.next({items:[]})
    this.updateLocalStorage({items:[]});
    this.router.navigate(['/home']);
   this.snackBar('تم مسح كل المنتجات من العربة')
  }

  decreaseQuantity(item: CartItem) {
    let removal: CartItem | undefined;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          removal = _item;
        }
      }
      return _item;
    });

    if (removal) {
      filteredItems = this.removeItem(removal, false);
    }

    this.cart.next({ items: filteredItems });
    this.updateLocalStorage({items:filteredItems});
    this.snackBar('تم مسح 1 منتج من العربة')
  }

  removeItem(item: CartItem, updated = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    if (updated) {
      this.cart.next({ items: filteredItems });
      // this.updateLocalStorage({items:filteredItems});
      this.snackBar('تم مسح 1 منتج من العربة')
    }
    return filteredItems;
  }

  snackBar(message:string){
    this._snackBar.open(message, 'Ok', {

      duration:2000,
      panelClass:['green-snackbar'],
      // direction:'rtl',
      horizontalPosition:'start',
      verticalPosition:'top'



    })

  }
  getQuantity(data:CartItem):number{


    let cart: CartItem[]= []
     let quantity:number =0
    this.subscribiton = this.cart.subscribe((res)=>{
      cart =res.items
      cart.map((item)=>{
        if(data.id === item.id ){
          quantity =  item.quantity
        }
      })
      this.subscribiton?.unsubscribe()

      return quantity
    })
    this.subscribiton?.unsubscribe()
    return quantity



  }


}
