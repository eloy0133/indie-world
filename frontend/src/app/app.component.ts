import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { GamesControllerComponent } from './components/games-controller/games-controller.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, GamesControllerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'indie-world';
}
