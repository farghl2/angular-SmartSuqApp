import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from './home.service';
import { CartService } from '../services/cart.service';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  // private goodsCollection:AngularFirestoreCollection<GoodsModel>
  // good:Observable<goodId[]>

  goods:any[]= [];
  goodsObesrvable!:Subscription;
  loading:boolean = false;
  cartGoods:any[] = [];
  cat:any;
  searchText:any;
  search:any
  someGoods:any[]=[];
  click:boolean = false;




  constructor(private readonly hs:HomeService, private cartService: CartService){
    // this.goodsCollection = fs.collection<GoodsModel>('goods');
    // this.good = this.goodsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as GoodsModel;
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // );
    }

  ngOnInit(): void {
     this.getAllGoods();
  }
  // goods:Observable<any>[]=[];

  getAllGoods(){
    this.loading = true;
    this.goodsObesrvable= this.hs.getAllGoods().subscribe(data=>{
      this.goods = data
      this.someGoods = [];
      for(let i=0;i<51;i++){
        this.someGoods.push(this.goods[i]);
      }
      this.loading =false;
    });
   }



   getFuilterGoods(cat:any){
    this.loading = true;
    if(cat == 'كل المنتجات'){
      this.getAllGoods();
    }
    else{
    this.goodsObesrvable =this.hs.getFuilterGoods(cat).subscribe(data=>{
      this.someGoods =[];
      this.someGoods = data;
      this.loading = false;
    })

  }


   }




   ngOnDestroy(): void {
    this.goodsObesrvable.unsubscribe();
  }

  // onSearch(searchText:any){
  //   this.search =searchText

  // }

  performSearch(){
    if(this.searchText){
      this.search = this.searchText;
      this.searchText=''

  }
}

}

