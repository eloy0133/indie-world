import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, filter, forkJoin, from, map, mergeMap, Observable, switchMap, tap, toArray } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  getSteamGames(games: Array<Game>): Observable<any> {
    let requests = Object.keys(games).map((name: any) =>
      this.getSteamAppId(name).pipe(
        switchMap(appid => this.getSteamGameData(appid).pipe(
          map(gameData => ({
            title: name,
            released: games[name].released,
            playtime: games[name].playtime,
            header_image: gameData.header_image,
            background_image: games[name].background_image,
            genre: games[name].genre,
            description: games[name].description,
            trailer: gameData.movies[gameData.movies.length - 1].webm.max,
          }))
        ))
      )
    );

    return forkJoin(requests);
  }

  private getSteamAppId(gameName: string): Observable<any> {
    return this.httpClient.get<any>(`https://indie-world.onrender.com/steam-community?name=${encodeURIComponent(gameName)}`).pipe(
      map(steamGames => steamGames.find((steamGame: any) => steamGame.name.toLowerCase() === gameName.toLowerCase())),
      filter(steamGame => steamGame !== undefined),
      map(steamGame => steamGame.appid)
    );
  }

  private getSteamGameData(appid: number): Observable<any> {
    return this.httpClient.get<any>(`https://indie-world.onrender.com/steam-store?appid=${encodeURIComponent(appid)}`).pipe(
      map(steamGame => steamGame[appid].data)
    )
  }
}
