import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SectionsService } from 'src/app/sections/sections.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @Output() newItem = new EventEmitter();
  sortCategories:any[] =[];
  allCategories: any[] =[];
  unsubcribeCat!:Subscription

  constructor(private sectionService: SectionsService){}

  ngOnInit(): void {
    this.getAllCategories();



  }


  getAllCategories():any{



     this.unsubcribeCat=  this.sectionService.getAllcategories().subscribe(res=>{
      this.allCategories=[];
      this.sortCategories=[];
       this.allCategories = res;

       let others='';
     this.allCategories.forEach((ele:any)=>{

     

        if((ele.name === "اخري")){
          others = ele;

        }
        else
          this.sortCategories.push(ele);


      });


      this.sortCategories.push(others)

   });
  }

  getItem(item:string){
    this.newItem.emit(item);

  }

  ngOnDestroy(): void {
    this.unsubcribeCat.unsubscribe();
  }

}
