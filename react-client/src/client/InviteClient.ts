import { OperationResult } from "seedengine.client/core/OperationResult";
import { InviteInfo } from "seedengine.client/invite/InviteInfo";

export interface InviteClient {

    getInviteInfo(key: string): Promise<InviteInfo>;
    
    useInvite(key: string): Promise<OperationResult>;

    createInvite(sessionId: string, note?: string): Promise<{
        success: boolean;
        inviteKey: string;
    }>;
    
}