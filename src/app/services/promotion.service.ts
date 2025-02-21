import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    // return Promise.resolve(PROMOTIONS);
    // return new Promise(resolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => resolve(PROMOTIONS), 2000);
    // })
    // return of(PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(environment.baseURL + 'promotions')
  }

  getPromotion(id: string): Observable<Promotion> {
    // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
    // return new Promise(resolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
    // })
    // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(environment.baseURL + 'promotions/' + id)

  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    // return new Promise(resolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
    // })  
    // return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    return this.http.get<Promotion[]>(environment.baseURL + 'promotions?featured=true')
      .pipe(map(promotions => promotions[0]));
  }  
}

