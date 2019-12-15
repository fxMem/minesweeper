import { MinerClient } from './MinerClient';
import { OperationResult } from 'seedengine.client/core/OperationResult';
import { VoteClient, VoteNotificationCallback } from './VoteClient';
import { SessionClient, SessionStateChangedCallback } from './SessionClient';
import { SessionInfo } from 'seedengine.client/session/SessionInfo';
import { GameClient, MinerGameStageChangedCallback } from './GameClient';
import { InviteClient } from './InviteClient';
import { InviteInfo } from 'seedengine.client/invite/InviteInfo';
import { MinerGameState } from '../../../core/MinerGameState';
import { TileActionResult, Coordinates } from '../../../core/Field';
import { LoginClient, ConnectionStateChangedCallback, ConnectionInfo } from './LoginClient';
import { ReportProgressCallback } from '../common/ReportProgressCallback';
import { DisposeCallback } from '../common/Callbacks';
import { EventEmitter } from '../common/EventEmitter';
import { VotesNotification } from 'seedengine.client/lobby/VoteMessage';
import { SessionStateChangedNotification } from 'seedengine.client/session/SessionMessage';
import { ClientType } from './ClientType';
import { ClientBuilder, SimpleIdentityClient, DefaultSessionClient, VoteLobbyClient, KeyInvitationClient, GroupClient, ChatClient } from 'seedengine.client';


export class Client implements VoteClient, SessionClient, GameClient, InviteClient, LoginClient {
    

    private client: ClientType & ClientBuilder;
    private nickname: string;
    private connected: boolean;

    private voteNotificationEvent = new EventEmitter<VotesNotification>();
    private sessionChangedEvent = new EventEmitter<SessionStateChangedNotification>();
    private gameStateChangedEvent = new EventEmitter<MinerGameState>();
    private connectionStatusChangedEvent = new EventEmitter<ConnectionInfo>();

    get Nickname() {
        return this.nickname;
    }

    constructor(
        private reportProgress: ReportProgressCallback
    ) { }

    private async connectedClient(): Promise<ClientType> {
        if (!this.connected) {
            let client = new ClientBuilder()
                .addClientInterface({ auth: new SimpleIdentityClient() })
                .addClientInterface({ sessions: new DefaultSessionClient() })
                .addClientInterface({ votes: new VoteLobbyClient() })
                .addClientInterface({ invites: new KeyInvitationClient() })
                .addClientInterface({ groups: new GroupClient() })
                .addClientInterface({ chat: new ChatClient() })
                .addClientInterface({ game: new MinerClient() });

            client.onMessage((message) => {

                return null;
            });

            client.votes.onVotesUpdate((v) => {
                this.voteNotificationEvent.emit(v);
            });

            client.sessions.onSessionNotification((d) => {
                this.sessionChangedEvent.emit(d);
            });

            client.game.onGameStateUpdate((d) => {
                this.gameStateChangedEvent.emit(d);
            });

            client.onConnectionError(() => {
                this.connectionStatusChangedEvent.emit({ connected: false });
            })

            this.client = await client.connect();
            this.connected = true;
        }

        return this.client;
    }

    public onVoteNotification(callback: VoteNotificationCallback): DisposeCallback {
        return this.voteNotificationEvent.subscribe(callback);
    }

    public async vote(sessionId: string, vote: boolean): Promise<OperationResult> {
        return this.reportProgress(
            (await this.connectedClient()).votes.vote(sessionId, vote)
        );
    }

    async getVotes(sessionId: string): Promise<{ voted: number; unvoted: number; }> {
        return this.reportProgress(
            (await this.connectedClient()).votes.getVotesSummary(sessionId)
        );
    }

    public onSessionStateChange(callback: SessionStateChangedCallback): DisposeCallback {
        return this.sessionChangedEvent.subscribe(callback);
    }

    public async getSessions(): Promise<SessionInfo[]> {
        return this.reportProgress((await this.connectedClient()).sessions.allSessions());
    }

    public async getSession(sessionId: string): Promise<SessionInfo> {
        return this.reportProgress((await this.connectedClient()).sessions.getSingleSessionInfo(sessionId));
    }

    public async createSession(isPrivate: boolean, sessionDescription?: string, join?: boolean): Promise<{
        sessionId: string
        joined?: OperationResult
    }> {
        return this.reportProgress(
            (await this.connectedClient()).sessions.createSession(isPrivate, sessionDescription, join)
        );
    }

    public async joinSession(sessionId: string): Promise<OperationResult> {
        return this.reportProgress(
            (await this.connectedClient()).sessions.joinSession(sessionId)
        );
    }

    public async leaveSession(sessionId: string): Promise<void> {
        return this.reportProgress(
            (await this.connectedClient()).sessions.leaveSession(sessionId)
        );
    }

    public async getInviteInfo(key: string): Promise<InviteInfo> {
        return this.reportProgress((await this.connectedClient()).invites.getInviteInfo(key));
    }

    public async createInvite(sessionId: string, note?: string): Promise<{
        success: boolean;
        inviteKey: string;
    }> {
        return this.reportProgress((await this.connectedClient()).invites.createInvite(sessionId, null, null, note));
    }

    public async useInvite(key: string): Promise<OperationResult> {
        return this.reportProgress((await this.connectedClient()).invites.acceptInvite(key));
    }

    public onGameStateChanged(callback: MinerGameStageChangedCallback): DisposeCallback {
        return this.gameStateChangedEvent.subscribe(callback);
    }

    public async getState(sessionId: string): Promise<MinerGameState> {
        return this.reportProgress((await this.connectedClient()).game.getState(sessionId));
    }

    public async probe(sessionId: string, pos: Coordinates): Promise<TileActionResult> {
        return this.reportProgress((await this.connectedClient()).game.probe(sessionId, pos));
    }

    public async open(sessionId: string, pos: Coordinates): Promise<TileActionResult> {
        return this.reportProgress((await this.connectedClient()).game.open(sessionId, pos));
    }

    public async flag(sessionId: string, pos: Coordinates): Promise<TileActionResult> {
        return this.reportProgress((await this.connectedClient()).game.flag(sessionId, pos));
    }

    public onConnectionStateChanged(callback: ConnectionStateChangedCallback): DisposeCallback {
        return this.connectionStatusChangedEvent.subscribe(callback);
    }

    public async connect(nickname: string, password?: string): Promise<boolean> {
        // var pp = this.connectedClient();
        // let client = await this.reportProgress(
        //     pp
        // );

        // let res = await this.reportProgress(client.auth.authenticate(nickname, password));


        await this.reportProgress(
            (await this.connectedClient()).auth.authenticate(nickname, password)
        );

        this.nickname = nickname;
        this.connectionStatusChangedEvent.emit(
            {
                connected: this.connected
            }
        );

        return this.connected;
    }
}