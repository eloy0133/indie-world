import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as homeGames from '../../shared/js/homeGames.json'
import * as topSellers from '../../shared/js/topSellers.json'
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameSource = new Subject<any>()
  games$ = this.gameSource.asObservable()
  private homeGames: any = undefined
  private topSellers: any = undefined

  constructor(private apiService: ApiService) {
    this.sendHomeGames()
    this.sendTopSellers()
  }

  sendHomeGames(): void {
    if (!this.homeGames) {
      const data = homeGames as any
      this.apiService.getSteamGames(data.default).subscribe(games => {
        this.homeGames = games
        this.gameSource.next(games)
      })
    } else {
      this.gameSource.next(this.homeGames)
    }
  }

  sendTopSellers(): void {
    if (!this.topSellers) {
      const data = topSellers as any
      this.apiService.getSteamGames(data.default).subscribe(games => {
        this.topSellers = games
      })
    } else {
      this.gameSource.next(this.topSellers)
    }
  }
}
