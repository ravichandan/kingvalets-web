import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
// import { HomeComponent } from './home/home.component';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kingvalets-web';
  config: any
  constructor(private appService: AppService){
    this.config = this.appService.getConfig();
  }
}
