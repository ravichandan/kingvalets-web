import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { join } from '@fireflysemantics/join';
import { map, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppService implements OnDestroy {
  private readonly destroy$: Subject<any>;

  constructor(private http: HttpClient) {
    this.destroy$ = new Subject<any>();
  }

  public getConfig() {
    return environment;
  }

  public joinWaitingList(data: any) {
    console.log('In joingWaitingList');
    const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    const url = join(this.getConfig().host, this.getConfig().waitingListEndpoint);
    return this.http.get(url, { headers }).pipe(
    //   map((items: any) => ({ data: items })),
      tap((_: any) => console.log('joinWaitingList response:: '))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
