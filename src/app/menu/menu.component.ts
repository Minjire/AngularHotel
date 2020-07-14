import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;
  BaseURL = environment.baseURL;

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    // Using Promises in the services
    // this.dishService.getDishes()
    //   .then(dishes => this.dishes = dishes);
    
    // Using Observables in the service
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes, 
      errmess => this.errMess = <any>errmess)   
  }
}
