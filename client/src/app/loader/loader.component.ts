import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, tap, map, filter, distinctUntilChanged } from 'rxjs/operators';
import { ErrorCode } from 'seedengine.client/transport/ErrorCodes';
import { Router } from '@angular/router';
import { ProgressService } from '../common/progress.service';
import { ServerError } from 'seedengine.client';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  
  constructor(private progress: ProgressService, private router: Router) { }

  get loading(): Observable<boolean> {
    return this.progress.loading.pipe(
      debounceTime(500)
    );
  }

  get errorMessage(): Observable<string> {
    return this.progress.all.pipe(
      map(p => p.error as ServerError),
      distinctUntilChanged((a, b) => (!!a === !!b) && ((!a && !b) || (a.code === b.code))),
      tap(e => {
        //TODO: We probably should put this in another service
        if(e && e.code == ErrorCode.Unauthorized && this.router.url != '/login') {
          this.router.navigate(['login']);
        }
      }),
      map(e => e && e.message)
    );
  }
}
