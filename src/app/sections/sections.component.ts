import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { SectionsService } from './sections.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css'],
})
export class SectionsComponent implements OnInit, OnDestroy {
  @Output() newItem = new EventEmitter();

  allCategories: any[] = [];
  sortCategories: any[] = [];
  categoriesObservable!: Subscription;
  loading: boolean = false;

  clickItem: boolean = false;

  goods: any[] = [];

  cartGoods: any[] = [];
  searchText: any;
  search: string = 'قسم';

  constructor(private ss: SectionsService, private cartService: CartService) {}
  ngOnInit(): void {
    this.getAllCategories();
  }

  getItem(item: any) {
    this.loading = true;
    this.goods = [];
    this.categoriesObservable = this.ss
      .getFuilterGoods(item.name)
      .subscribe((res) => {
        this.goods = res;

        this.clickItem = true;
        this.search = 'المنتجات';
        this.loading = false;
      });
  }

  addToCart(event: any) {
    this.cartService.addToCart({
      quantity: 1,
      id: event.id,
      amount: event.amount,
      imageUrl: event.imageUrl,
      title: event.title,
    });
  }

  getAllCategories() {
    this.loading = true;
    this.categoriesObservable = this.ss.getAllcategories().subscribe((res) => {
      this.allCategories = res.filter((ele) => {
        let item: any = ele;
        if (!(item.name == 'كل المنتجات')) {
          return item;
        }
      });

      this.sortCategories = [];
      this.getSortCategories();
      this.loading = false;
    });
  }
  getSortCategories() {
    this.allCategories.forEach((ele) => {
      if (!(ele.name == 'اخري')) {
        this.sortCategories.push(ele);
      }
    });

    for (let i of this.allCategories) {
      if (i.name == 'اخري') {
        this.sortCategories.push(i);
        break;
      }
    }
  }

  goToSections() {
    this.clickItem = false;
    this.search = 'قسم';
    this.getAllCategories();
  }
  ngOnDestroy(): void {
    this.categoriesObservable.unsubscribe();
  }
}
