import { ProgressBuilder, ProgressInfo, OperationStatus } from './progress';

export class ProgressReporter implements ProgressBuilder, ProgressInfo {
    
    status: OperationStatus;
    progressPercentage?: number = 0;
    error?: any = null;
    
    constructor(public operationName: string, private reportCalback: (data: ProgressReporter) => void) {
        
    }
    
    start(): this {
        this.status = OperationStatus.Started;
        this.reportCalback(this);

        return this;
    }

    reportError(error: any): this {
        this.status = OperationStatus.Error;
        this.error = error;
        this.reportCalback(this);

        return this;
    }

    reportProgress(percentage: number): this {
        this.status = OperationStatus.Running;
        this.progressPercentage = percentage;
        this.reportCalback(this);

        return this;
    }

    done(): void {
        this.status = OperationStatus.Finished;
        this.reportCalback(this);
    }
}
