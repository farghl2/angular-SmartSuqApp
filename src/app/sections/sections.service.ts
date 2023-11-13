import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  constructor(private fs:AngularFirestore) { }


  getAllcategories(){
    return this.fs.collection('sections').valueChanges();
  }

  getFuilterGoods(category:any){
    return this.fs.collection('goods', ref=>ref.where('category', '==',category )).valueChanges()
  }

 
}
