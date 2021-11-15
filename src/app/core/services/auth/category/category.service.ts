import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { promise } from 'selenium-webdriver';
import {
  Category,
  DEFAULT_CATEGORIES,
  ListedCategories,
} from 'src/app/shared/models/category.model';

interface CategoryData {
  name: string;
  spent: number;
  iconName: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private listedCategories = new BehaviorSubject<Category[]>([]);
  private categories = new BehaviorSubject<Category[]>([]);

  get categories$() {
    return this.categories.asObservable();
  }

  get listedCategories$() {
    return this.listedCategories.asObservable();
  }

  constructor(private http: HttpClient) {}

  fetchCategories(): Observable<Category[]> {
    return this.http
      .get<{ [key: string]: Category }>(
        'https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/categories.json'
      )
      .pipe(
        map((resData) => {
          const categories: Category[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              categories.push(
                new Category(
                  key,
                  resData[key].name,
                  resData[key].spent,
                  resData[key].iconName
                )
              );
            }
          }
          return categories;
        }),
        take(1),
        tap((categories) => {
          this.categories.next(categories);
        })
      );
  }

  addCategoryToFireBase(newCategory: Category): Promise<string> {
    let generatedId: string;
    return this.http
      .post<{ name: string }>(
        'https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/categories.json',
        { ...newCategory, id: null, slot: null }
      )
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.categories$;
        }),
        take(1),
        map((categories) => {
          newCategory.id = generatedId;
          this.categories.next(categories.concat(newCategory));
          return generatedId;
        })
      )
      .toPromise();
  }

  fetchCategoryById(id: string): Observable<Category> {
    return this.http
      .get<CategoryData>(
        `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/categories/${id}.json`
      )
      .pipe(
        map(
          (categoryData) =>
            new Category(
              id,
              categoryData.name,
              categoryData.spent,
              categoryData.iconName
            )
        )
      );
  }

  async updateCategoryCost(categoryId: string, cost: number): Promise<void> {
    let updatedCategories: Category[] = [];
    await this.listedCategories$
      .pipe(
        take(1),
        switchMap((categories) => {
          if (!categories || categories.length <= 0) {
            return this.fetchListedCategories();
          }
          return of(categories);
        }),
        switchMap((categories) => {
          const updatedCategoriesIndex = categories.findIndex(
            (cat) => cat.id === categoryId
          );
          updatedCategories = [...categories];
          const oldCategory = updatedCategories[updatedCategoriesIndex];
          updatedCategories[updatedCategoriesIndex] = new Category(
            oldCategory.id,
            oldCategory.name,
            oldCategory.spent + cost,
            oldCategory.iconName
          );
          return this.http.put(
            `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/categories/${categoryId}.json`,
            { ...updatedCategories[updatedCategoriesIndex], id: null }
          );
        }),
        tap(() => {
          this.listedCategories.next(updatedCategories);
        })
      )
      .toPromise();
  }

  fetchListedCategories(): Observable<Category[]> {
    let listedCategories: ListedCategories[];
    return from(Storage.get({ key: 'listedCategories' })).pipe(
      switchMap((res) => {
        if (!res || !res.value) {
          const data = JSON.stringify(DEFAULT_CATEGORIES);
          Storage.set({ key: 'listedCategories', value: data });
          listedCategories = DEFAULT_CATEGORIES;
        } else {
          listedCategories = JSON.parse(res.value);
        }
        return this.fetchCategories();
      }),
      map((categories) => {
        const listedCategoryData: Category[] = [];
        if (categories) {
          listedCategories.forEach((listedCategory) => {
            const category = categories.find(
              (cat) => cat.id === listedCategory.id
            );
            if (category) {
              category.slot = listedCategory.slot;
              listedCategoryData.push(category);
            }
          });
        }
        return listedCategoryData;
      }),
      take(1),
      tap((listedCategoryData) => {
        this.listedCategories.next(listedCategoryData);
      })
    );
  }

  storeCategory(newCategory: Category): Observable<Category[]> {
    let listedCategories: ListedCategories[] = DEFAULT_CATEGORIES;
    return from(Storage.get({ key: 'listedCategories' })).pipe(
      switchMap((res) => {
        if (!!res || !!res.value) {
          listedCategories = JSON.parse(res.value);
        }
        listedCategories.push({ id: newCategory.id, slot: newCategory.slot });
        return from(
          Storage.set({
            key: 'listedCategories',
            value: JSON.stringify(listedCategories),
          })
        );
      }),
      switchMap(() => this.fetchListedCategories())
    );
  }
}
