import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContactUsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kingvalets-web';
}
