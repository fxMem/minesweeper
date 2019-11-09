import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { ProgressHandler, ProgressBuilder, ProgressInfo, OperationStatus } from './progress';
import { ProgressReporter } from './progressReporter';
import { tap, map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProgressService implements ProgressHandler {

    private operations$ = new ReplaySubject<ProgressInfo>(1);
    private loading$ = new ReplaySubject<boolean>(1);
    private operationsCount = 0;

    get all(): Observable<ProgressInfo> {
        return this.operations$;
    }

    get loading() {
        return this.loading$.pipe(
            distinctUntilChanged()
        );
    }

    create(operationName: string): ProgressBuilder {
        return new ProgressReporter(operationName, (info) => this.pushProgressInfo(info));
    }

    async reportProgress<T>(input: Promise<T>): Promise<T> {
        const progress = this.create(`Promise`).start();
        
        try {
            const result = await input;
            progress.done();
            
            return result;
        }
        catch (e) {
            progress.reportError(e).done();
            throw e;
        }
    }

    private pushProgressInfo(info: ProgressInfo) {
        this.operations$.next(info);

        info.status === OperationStatus.Started && this.operationsCount++;
        info.status === OperationStatus.Finished && this.operationsCount--;
        this.loading$.next(!!this.operationsCount);
    }
}
