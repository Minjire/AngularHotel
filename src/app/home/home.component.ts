import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  dishErrMess: string;
  promotion: Promotion;
  featuredLeader: Leader;
  // dishes: Dish[];
  BaseURL = environment.baseURL;
  

  constructor(private dishService: DishService, 
    private promotionService: PromotionService,
    private leaderService: LeaderService,) { }

  ngOnInit(): void {
    // Using Promises in services
    // this.dishService.getFeaturedDish()
    //   .then(dish => this.dish = dish);
    // this.promotionService.getFeaturedPromotion()
    //   .then(promotion => this.promotion = promotion);
    // this.leaderService.getFeaturedLeader()
    //   .then(featuredLeader => this.featuredLeader = featuredLeader);

    //Using Observables in service
    // this.dishService.getDishes().pipe(first()).subscribe(dishes => {
    //   this.dishes = dishes;
    //   console.log(this.dishes);
    // })

    this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish, 
      errmess => this.dishErrMess = <any>errmess);
    this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    this.leaderService.getFeaturedLeader().subscribe(featuredLeader => this.featuredLeader = featuredLeader);
  }

}
