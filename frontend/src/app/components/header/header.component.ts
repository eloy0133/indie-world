import { Component, ElementRef, ViewChild } from '@angular/core';
import { GameService } from '../../shared/services/game.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('home') home ?:ElementRef;
  @ViewChild('topSellers') topSellers ?:ElementRef;

  constructor (private gameService: GameService) {}

  loadHomeGames(): void {
    this.topSellers!.nativeElement.className = ""
    this.home!.nativeElement.className = "active"
    this.gameService.sendHomeGames()
  }

  loadTopSellers(): void {
    this.home!.nativeElement.className = ""
    this.topSellers!.nativeElement.className = "active"
    this.gameService.sendTopSellers()
  }

}
