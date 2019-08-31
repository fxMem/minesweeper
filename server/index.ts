import { ChatManager } from 'seedengine.server/chat/ChatManager';
import { ChatPipeline } from 'seedengine.server/chat/ChatPipeline';
import { Bootstrapper, CoreDependencies } from 'seedengine.server/core/Bootstrapper';
import { Instance } from 'seedengine.server/core/Instance';
import { GroupPipeline } from 'seedengine.server/groups/GroupPipeline';
import { InvitationManager } from 'seedengine.server/invite/InvitationManager';
import { InvitesPipeline } from 'seedengine.server/invite/InvitesPipeline';
import { KeyInvitationMethod } from 'seedengine.server/invite/KeyInvitationMethod';
import { LobbyPipeline } from 'seedengine.server/lobby/LobbyPipeline';
import { VoteLobbyModule } from 'seedengine.server/lobby/VoteLobbyModule';
import { DefaultConsoleLogger, Log } from 'seedengine.server/log/Logger';
import { initializeLogger } from 'seedengine.server/log/LoggerScopes';
import { DefaultSessionManager } from 'seedengine.server/session/DefaultSessionManager';
import { SessionPipeline } from 'seedengine.server/session/SessionPipeline';
import { ExpressFacadeFactory } from 'seedengine.server/transport/HttpFacade';
import { MessageHandler } from 'seedengine.server/transport/MessagePipeline';
import { makeRegularHandler } from 'seedengine.server/transport/SpecificMessageTypeHandler';
import { InMemoryUserStorage } from 'seedengine.server/users/InMemoryUserStorage';
import { SimpleIdentity } from 'seedengine.server/users/SimpleIdentity';
import { MinerGameFactory } from './MinerGameFactory';

function buildMinerServer(): Instance {

    initializeLogger(new Log([new DefaultConsoleLogger()]));

    const bootstrapper = new Bootstrapper();
    bootstrapper
        .withHttpFacade(new ExpressFacadeFactory())
        .withAuthMethod(new SimpleIdentity.SimpleAuthModule())
        .withStorage(SimpleIdentity.WithSuperUser(new InMemoryUserStorage()))
        .add(_ => createSessionRelatedHandlers(_))
        .add(_ => createGroupsHandler(_))
        .add(_ => createChatHandler(_))
        .withGame(new MinerGameFactory());

    return bootstrapper.build();

    function createGroupsHandler(_: CoreDependencies): MessageHandler[] {
        const groupHandler = makeRegularHandler(new GroupPipeline(_.groups));

        return [groupHandler];
    }

    function createChatHandler(_: CoreDependencies): MessageHandler[] {
        const chatManager = new ChatManager(_.messageSender);
        const chatHandler = makeRegularHandler(new ChatPipeline(chatManager, _.users, _.groups));

        return [chatHandler];
    }

    function createSessionRelatedHandlers(_: CoreDependencies): MessageHandler[] {
        const sessionManager = new DefaultSessionManager({ allowJoinAfterSessionStart: false }, _.messageSender, _.groups, _.game);

        const sessionPipeline = makeRegularHandler(new SessionPipeline(sessionManager));

        const lobbyModule = new VoteLobbyModule();
        const lobbyPipeline = makeRegularHandler(new LobbyPipeline(lobbyModule, sessionManager));

        const invitesManager = new InvitationManager(sessionManager);
        const inviteMethod = new KeyInvitationMethod(invitesManager);
        const invitesPipeline = makeRegularHandler(new InvitesPipeline([inviteMethod], invitesManager));

        return [sessionPipeline, lobbyPipeline, invitesPipeline];
    }
}

const instance = buildMinerServer();
instance.start();