export enum OperationStatus {
    Started,
    Running, 
    Finished,
    Error
}

export interface ProgressInfo {
    operationName: string;

    status: OperationStatus;

    progressPercentage?: number;
    error?: any;
}

export interface ProgressHandler {
    create(operationName: string): ProgressBuilder;
}

export interface ProgressBuilder {
    operationName: string;

    start(): this;

    reportError(error: any): this;
    reportProgress(percentage: number): this;

    done(): void;
}