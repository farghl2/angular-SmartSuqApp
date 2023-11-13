import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';






@Injectable({
  providedIn: 'root'
})
export class HomeService  {

  constructor(private fs:AngularFirestore){}


  getAllGoods(){
    // return this.fs.collection('goods' , ref=>ref.limit(50)).valueChanges();
    return this.fs.collection('goods').valueChanges();
  }

  getFuilterGoods(category:any){
    return this.fs.collection('goods', ref=>ref.where('category', '==',category )).valueChanges()
  }






}



