import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  errMess: string;
  BaseURL = environment.baseURL;

  constructor(private leaderService: LeaderService) { }

  ngOnInit(): void {
    // Using Promises in the service
    // this.leaderService.getLeaders()
    //   .then(leaders => this.leaders = leaders);
    
    // Using Observables in the services
    // this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders);

    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders, 
      errmess => this.errMess = <any>errmess)
  }

}
