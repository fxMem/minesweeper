import * as React from "react";
import { Button } from "../common/Button";
import { useState } from "react";
import { SessionClient } from "../client/SessionClient";
import { SessionInfo } from "seedengine.client/session/SessionInfo";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { HeaderPanel } from "../common/HeaderPanel";

const lightGreen = '#70d48b';

export function LobbyComponent({ sessionClient }: { sessionClient: SessionClient }) {

    const history = useHistory();
    const [joiningError, setJoiningError] = useState('');
    const [newSessionDescription, setNewSessionDescription] = useState('');
    const [activeSesions, setActiveSessions] = useState([] as SessionInfo[]);
    const [creationFormVisible, setCreationFormVisible] = useState(false);

    React.useEffect(() => { updateActiveSessions(); }, [])

    function toggleCreatePanelVisibility() {
        setCreationFormVisible((prev) => !prev);
    }

    async function updateActiveSessions() {
        let sessions = await sessionClient.getSessions();
        setActiveSessions(sessions);
    }

    async function join(sessionId: string) {
        const { success, message } = await sessionClient.joinSession(sessionId);
        if (success) {
            history.push('/room', { sessionId });
        }
        else {
            setJoiningError(message);
        }
    }

    async function createNew() {
        await sessionClient.createSession(false, newSessionDescription, false);
        updateActiveSessions();
    }

    return <>
        <HeaderPanel>
            <span style={{ marginRight: '1em' }}>List of active sessions</span>
            <Button onClick={updateActiveSessions}>Update</Button>
        </HeaderPanel>

        {
            activeSesions && <div style={{ margin: '1em 1em 0' }}>
                {
                    activeSesions.map
                        (s =>
                            <div>
                                <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>
                                    {
                                        s.id || s.description
                                    }
                                </span>

                                <span>
                                    {`(Players count: ${s.playersCount})`}
                                </span>

                                <Button style={{ margin: '0 0.5em 0' }} onClick={() => join(s.id)}>Join</Button>
                                <Button>Create invite</Button>
                                {joiningError && <span style={{ color: 'red' }}>{joiningError}</span>}
                            </div>
                        )
                }
            </div>
        }

        <div style={{ margin: '1em' }}>
            <Button onClick={toggleCreatePanelVisibility}>
                {!creationFormVisible ? 'Create new session' : 'Hide'}
            </Button>

            {
                creationFormVisible &&
                <div>
                    <input type='text' value={newSessionDescription} onChange={e => setNewSessionDescription(e.target.value)}></input>
                    <Button style={{ margin: '0 1em 0' }} onClick={createNew}>
                        Create
                    </Button>
                </div>
            }
        </div>
    </>
}