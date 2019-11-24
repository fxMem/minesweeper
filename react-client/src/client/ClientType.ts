import {
    SimpleIdentityClient,
    DefaultSessionClient,
    VoteLobbyClient,
    KeyInvitationClient,
    GroupClient,
    ChatClient,
    ClientBuilder
} from 'seedengine.client/client';
import { MinerClient } from './MinerClient';

export type ClientType = {
    auth: SimpleIdentityClient,
    sessions: DefaultSessionClient,
    votes: VoteLobbyClient,
    invites: KeyInvitationClient,
    groups: GroupClient,
    chat: ChatClient,
    game: MinerClient
}