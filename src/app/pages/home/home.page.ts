import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public categoryService: CategoryService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.categoryService.fetchListedCategories().pipe(take(1)).subscribe();
  }
}
