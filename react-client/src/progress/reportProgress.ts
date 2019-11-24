import { useContext } from "react";
import { ProgressContext, ProgressInfo } from "./ProgressContext";

export function reportProgress(info: ProgressInfo) {
    const progressContext = useContext(ProgressContext);
    progressContext.reportProgress(info);
}