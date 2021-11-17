import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { selectUserId } from 'src/app/core/state/user/user.selectors';
import { Category } from 'src/app/shared/models/category.model';

interface CategoryData {
  name: string;
  spent: number;
  iconName: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories = new BehaviorSubject<Category[]>([]);
  private userId$: Observable<string>;

  get categories$() {
    return this.categories.asObservable();
  }

  constructor(private http: HttpClient, private store: Store) {
    this.userId$ = this.store.pipe(select(selectUserId));
  }

  setDefaultCategoriesForNewUser(userId: string) {
    let generatedId: string;
    return this.http
      .get<{ [key: string]: Category }>(
        `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/default-categories.json`
      )
      .pipe(
        take(1),
        switchMap(async (resData) => {
          const defaultCategories: Category[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              const category = new Category(
                key,
                resData[key].name,
                resData[key].spent,
                resData[key].iconName
              );
              defaultCategories.push(category);
            }
          }
          return defaultCategories;
        }),
        map(async (defaultCategories) => {
          await Promise.all(
            defaultCategories.map(async (category) => {
              await this.http
                .post<{ name: string }>(
                  `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/categories.json`,
                  { ...category, id: null }
                )
                .pipe(
                  switchMap((resData) => {
                    generatedId = resData.name;
                    return this.categories$;
                  }),
                  take(1),
                  map((categories) => {
                    category.id = generatedId;
                    this.categories.next(categories.concat(category));
                    return generatedId;
                  })
                )
                .toPromise();
            })
          );
        })
      )
      .toPromise();
  }

  fetchCategories(): Observable<Category[]> {
    return this.userId$.pipe(
      take(1),
      switchMap((userId) =>
        this.http.get<{ [key: string]: Category }>(
          `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/categories.json`
        )
      ),
      take(1),
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
        this.categories.next(categories);
        return categories;
      })
    );
  }

  addCategoryToFireBase(newCategory: Category): Promise<string> {
    let generatedId: string;
    return this.userId$
      .pipe(
        take(1),
        switchMap((userId) =>
          this.http.post<{ name: string }>(
            `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/categories.json`,
            { ...newCategory, id: null }
          )
        ),
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
    return this.userId$.pipe(
      take(1),
      switchMap((userId) =>
        this.http.get<CategoryData>(
          `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/categories/${id}.json`
        )
      ),
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

  async updateCategory(category: Category): Promise<void> {
    let updatedCategories: Category[] = [];
    let userId: string;
    await this.userId$
      .pipe(
        take(1),
        switchMap((uid) => {
          userId = uid;
          return this.categories$;
        }),
        switchMap((categories) => {
          if (!categories || categories.length <= 0) {
            return this.fetchCategories();
          }
          return of(categories);
        }),
        switchMap((categories) => {
          const updatedCategoriesIndex = categories.findIndex(
            (cat) => cat.id === category.id
          );
          updatedCategories = [...categories];
          const oldCategory = updatedCategories[updatedCategoriesIndex];
          updatedCategories[updatedCategoriesIndex] = new Category(
            oldCategory.id,
            category.name,
            oldCategory.spent,
            category.iconName
          );
          return this.http.put(
            `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/categories/${category.id}.json`,
            { ...updatedCategories[updatedCategoriesIndex], id: null }
          );
        }),
        tap(() => {
          this.categories.next(updatedCategories);
        })
      )
      .toPromise();
  }

  async updateCategoryCost(categoryId: string, cost: number): Promise<void> {
    let updatedCategories: Category[] = [];
    let userId: string;
    await this.userId$
      .pipe(
        take(1),
        switchMap((uid) => {
          userId = uid;
          return this.categories$;
        }),
        switchMap((categories) => {
          if (!categories || categories.length <= 0) {
            return this.fetchCategories();
          }
          return of(categories);
        }),
        take(1),
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
            `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/categories/${categoryId}.json`,
            { ...updatedCategories[updatedCategoriesIndex], id: null }
          );
        }),
        tap(() => {
          this.categories.next(updatedCategories);
        })
      )
      .toPromise();
  }

  async deleteCategory(categoryId: string): Promise<void> {
    this.userId$
      .pipe(
        take(1),
        switchMap((userId) =>
          this.http.delete(
            `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/categories/${categoryId}.json`
          )
        ),
        switchMap(() => this.categories$),
        take(1),
        tap((listedCategories) => {
          const filteredCategories = listedCategories.filter(
            (category) => category.id !== categoryId
          );
          this.categories.next(filteredCategories);
        })
      )
      .toPromise();
  }
}
