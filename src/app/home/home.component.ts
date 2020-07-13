import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  featuredLeader: Leader;

  constructor(private dishService: DishService, 
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('baseURL') private baseURL) { }

  ngOnInit(): void {
    // Using Promises in services
    // this.dishService.getFeaturedDish()
    //   .then(dish => this.dish = dish);
    // this.promotionService.getFeaturedPromotion()
    //   .then(promotion => this.promotion = promotion);
    // this.leaderService.getFeaturedLeader()
    //   .then(featuredLeader => this.featuredLeader = featuredLeader);

    //Using Observables in service
    this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish);
    console.log(this.dish)
    this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    this.leaderService.getFeaturedLeader().subscribe(featuredLeader => this.featuredLeader = featuredLeader);
  }

}
