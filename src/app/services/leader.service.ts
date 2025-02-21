import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }

  getLeaders(): Observable<Leader[]> {
    // return Promise.resolve(LEADERS);
    // return new Promise(resolve => {
    //   //Simulate Latency with 2 sec delay
    //   setTimeout(() => resolve(LEADERS), 2000);
    // })
    // return of(LEADERS).pipe(delay(2000));
    return this.http.get<Leader[]>(environment.baseURL + 'leaders')
  }

  getLeader(id: string): Observable<Leader> {
    // return Promise.resolve(LEADERS.filter((lead) => (lead.id === id))[0]);
    // return new Promise(resolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => resolve(LEADERS.filter((lead) => (lead.id === id))[0]), 2000);
    // })
    // return of(LEADERS.filter((lead) => (lead.id === id))[0]).pipe(delay(2000));
    return this.http.get<Leader>(environment.baseURL + 'leaders/' + id);
  }

  getFeaturedLeader(): Observable<Leader> {
    // return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
    // return new Promise(resolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    // })
    // return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    return this.http.get<Leader[]>(environment.baseURL + 'leaders?featured=true').pipe(map(leaders => leaders[0]));
  }
}
