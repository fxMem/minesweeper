import { OperationStatus, ProgressInfo } from "./ProgressContext"

export async function reportProgress<T>(
    updateProgress: (info: ProgressInfo) => void,
    operation: Promise<T>,
    operationName?: string
): Promise<T> {
    updateProgress({ operationName, status: OperationStatus.Running });
    try {
        const result = await operation;
        updateProgress({ operationName, status: OperationStatus.Finished });
        return result;
    }
    catch (error) {
        updateProgress({ operationName, status: OperationStatus.Error, error });
        throw error;
    }
}
