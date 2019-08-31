import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../common/client-service.service';
import { debounceTime } from 'rxjs/operators';
import { ErrorCode } from 'seedengine.client/transport/ErrorCodes';
import { Router } from '@angular/router';
import { PendingService } from '../common/loading-service.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loading: boolean;
  errorMessage: string;
  constructor(private pending: PendingService, private router: Router) { }

  ngOnInit() {
    this.pending.getPending().pipe(
      debounceTime(500)
    ).subscribe(p => {
      this.loading = p.pending;
      this.errorMessage = p.error;

      if(p.code == ErrorCode.Unauthorized && this.router.url != '/login') {
        this.router.navigate(['login']);
      }
    })
  }

}
