import { VotesNotification } from "seedengine.client/lobby/VoteMessage";
import { OperationResult } from "seedengine.client/core/OperationResult";
import { DisposeCallback } from "../common/DisposeCallback";

export type VoteNotificationCallback = (votes: VotesNotification) => void;

export interface VoteClient {
    onVoteNotification(callback: VoteNotificationCallback): DisposeCallback;

    vote(sessionId: string, vote: boolean): Promise<OperationResult>;

    getVotes(sessionId: string): Promise<{ voted: number, unvoted: number }>;
}