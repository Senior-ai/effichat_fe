import React, { useState } from 'react'
import { Ringing } from './Ringing'
import { Header } from './Header';
import { CallArea } from './CallArea';
import { CallActions } from './CallActions';

export const Call = ({ call, setCall, callAccepted, userVideo, myVideo, stream }) => {
    const { receivingCall, callEnded } = call;
    const [showActions, setShowActions] = useState(false);

    return (
        <>
            <div className={`${!receivingCall && !callAccepted ? 'hidden' : ''} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 
    rounded-2xl overflow-hidden callbg`} onMouseOver={() => setShowActions(true)} onMouseOut={() => setShowActions(false)}>
                {/* Container */}
                <div>
                    <div>
                        {/* Header */}
                        <Header />
                        {/* Call Area */}
                        <CallArea name='placeholder name' />
                        {showActions ? <CallActions /> : ''}
                    </div>
                    {/* Stream */}
                    <div>
                        <div>
                            <video ref={userVideo} playsInline muted autoPlay className={`largeVideoCall`}></video>
                        </div>
                        {/* My vid */}
                        <div>
                            <video ref={myVideo} playsInline muted autoPlay className={`SmallVideoCall ${showActions ? 'moveVideoCall' : ''}`}></video>
                        </div>
                    </div>
                </div>
            </div>
            {/* Ringing */}
            {
                receivingCall && !callAccepted ? (
                    <Ringing call={call} setCall={setCall} />
                ) : ('')
            }

        </>
    )
}
