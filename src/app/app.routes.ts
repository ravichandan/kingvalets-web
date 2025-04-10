import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MissionComponent } from './mission/mission.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';

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
    component: AppComponent,
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
