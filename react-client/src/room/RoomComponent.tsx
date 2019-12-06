import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { VoteClient } from "../client/VoteClient";
import { GameClient } from "../client/GameClient";
import { useState, useEffect } from "react";
import { VoteCommand } from "seedengine.client/lobby/VoteMessage";
import { HeaderPanel } from "../common/HeaderPanel";
import { SessionClient } from "../client/SessionClient";
import { SessionInfo } from "seedengine.client/session/SessionInfo";
import { Button } from "../common/Button";

export function RoomComponent({ vote, session, game }: { vote: VoteClient, game: GameClient, session: SessionClient }) {
    const history = useHistory();
    const { sessionId } = history.location.state;
    const [votes, setVotes] = useState(null);
    const [currrentSession, setCurrentSession] = useState<SessionInfo>(null);
    const [voted, setVoted] = useState(false);
    useEffect(() => {
        session.getSession(sessionId).then(s => setCurrentSession(s));
        vote.getVotes(sessionId).then(v => setVotes(v));
    }, []);

    vote.onVoteNotification(v => {
        setVotes(v);
    });

    const canVote = votes && currrentSession;
    function setReady(value: boolean) {
        setVoted(value);
        vote.vote(sessionId, value);
    }

    return <>
        <HeaderPanel>
            {
                currrentSession && <span style={{ fontWeight: 'bold' }}>
                    {
                        `Session "${currrentSession.description}", 
currently ${currrentSession.playersCount} players in
${currrentSession.private ? `, [private]` : ''}
${currrentSession.timePassed ? `, started at ${currrentSession.timePassed.toLocaleTimeString()}` : `, still not started`}`
                    }
                </span>
            }
            {
                votes && <span style={{ margin: '0 0.5em 0' }}>Ready: {`${votes.voted}/${votes.voted + votes.unvoted}`}</span>
            }
            {
                canVote ? (voted
                 ? <Button onClick={() => setReady(false)}>Not ready!</Button>
                    : <Button onClick={() => setReady(true)}>Ready!</Button>)
                    : null
            }
        </HeaderPanel>
        <div>

        </div>
    </>
}