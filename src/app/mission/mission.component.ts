import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-mission',
  imports: [],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.scss'
})
export class MissionComponent  implements OnDestroy, OnInit {

  private readonly destroy$: Subject<any>;
  config: any;

  constructor( private appService: AppService) {
    this.destroy$ = new Subject<any>();
    this.config = this.appService.getConfig();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
