import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2  } from '@angular/core';
import M from 'materialize-css'
import { Game } from '../../shared/models/game.model'
import { GameService } from '../../shared/services/game.service';

@Component({
  selector: 'app-games-controller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games-controller.component.html',
  styleUrl: './games-controller.component.css'
})
export class GamesControllerComponent implements AfterViewInit, OnInit {
  @ViewChild('carousel') carousel?: ElementRef;
  @ViewChild('carouselBox') carouselBox?: ElementRef;
  @ViewChild('metacritic') rating?: ElementRef;
  @ViewChild('title') title?: ElementRef;
  @ViewChild('year') year?: ElementRef;
  @ViewChild('playtime') playtime?: ElementRef;
  @ViewChild('genre') genre?: ElementRef;
  @ViewChild('description') description?: ElementRef;
  @ViewChild('backgroundSource') backgroundSource?: ElementRef;
  @ViewChild('trailer') trailer?: ElementRef;
  @ViewChild('trailerSource') trailerSource?: ElementRef;
  @ViewChild('trailerButton') trailerButton?: ElementRef;
  private games: Array<Game> = []

  constructor(private gameService: GameService, private renderer: Renderer2) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.gameService.games$.subscribe(games => {
        this.loadGames(games)
    })
  }

  loadGames(games: Array<Game>): void {
    this.games = games
    document.documentElement.style.setProperty('--background-image', `url(${this.games[0].background_image})`)
    this.title!.nativeElement.textContent = this.games[0].title
    this.year!.nativeElement.textContent = this.games[0].released
    this.genre!.nativeElement.textContent = this.games[0].genre
    this.description!.nativeElement.textContent = this.games[0].description
    if (this.carousel) {
      this.carousel.nativeElement.innerHTML = '';
    }
    for (const game in this.games) {
      const newGameDiv = this.renderer.createElement('div')
      const newGameImg = this.renderer.createElement('img');
      this.renderer.listen(newGameDiv, 'click', (event) => {
        this.changeGame(event);
      });
      newGameDiv.className = "carousel-item"
      newGameDiv.style.width = "470px"
      newGameDiv.style.height = "250px"
      newGameDiv.style.cursor = "pointer"
      newGameImg.style.borderRadius = "10px"
      newGameImg.src = this.games[game].header_image
      newGameImg.style.width = "100%"
      newGameImg.style.height = "100%"
      newGameImg.alt = game
      this.renderer.appendChild(newGameDiv, newGameImg);
      this.renderer.appendChild(this.carousel?.nativeElement, newGameDiv);
      this.trailerSource!.nativeElement.src = this.games[game].trailer
      this.trailer!.nativeElement.firstElementChild.load()
      this.trailer!.nativeElement.firstElementChild.volume = "0.2"
    }
    this.trailerButton!.nativeElement.style.display = "flex"
    M.Carousel.init(this.carousel?.nativeElement, {})
  }

  changeGame(event: any): void {
    this.title!.nativeElement.textContent = this.games[event.target.alt].title
    this.year!.nativeElement.textContent = this.games[event.target.alt].released
    this.genre!.nativeElement.textContent = this.games[event.target.alt].genre
    this.description!.nativeElement.textContent = this.games[event.target.alt].description
    document.documentElement.style.setProperty('--background-image', `url(${this.games[event.target.alt].background_image})`)
  }

  toggleTrailer(event: any): void {
    if (event.target.tagName.toLowerCase() !== "video") {
      if (this.trailer!.nativeElement.style.visibility === "visible") {
        this.trailer!.nativeElement.style.visibility = "hidden"
        this.trailer!.nativeElement.firstElementChild.pause()
      } else {
        const currentGame: any = this.games.find(game => game.title === this.title!.nativeElement.textContent)
        this.trailerSource!.nativeElement.src = currentGame.trailer
        this.trailer!.nativeElement.firstElementChild.load()
        this.trailer!.nativeElement.firstElementChild.play()
        this.trailer!.nativeElement.style.visibility = "visible"
      }
    }
  }
}
