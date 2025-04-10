import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MissionComponent } from './mission/mission.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'index.html',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'mission',
    component: MissionComponent,
  },
  {
    path: 'how-it-works',
    component: HowItWorksComponent,
  },
  {
    path: 'contact-us',
    component: ContactInfoComponent,
  },
];
