import { useState, useEffect } from 'react'
import { Ringing } from './Ringing'
import { Header } from './Header';
import { CallInfo } from './CallInfo';
import { CallActions } from './CallActions';
import ringingAudio from '../../../audio/ringing.mp3'

export const Call = ({ call, setCall, callAccepted, userVideo, myVideo, stream, setIsCalling, answerCall, show, endCall }) => {
    const { receivingCall, callEnded } = call;
    const [showActions, setShowActions] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [timer, setTimer] = useState(0);
    let interval;
    const handleTimer = () => {
        interval = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, (1000));
    };

    useEffect(() => {
        if (!callAccepted) {
            if (timer < 10) {
                handleTimer();
            } else {
                setIsCalling(false);
                setCall({ ...call, receivingCall: false, signal: '' })
            }
            return () => clearInterval(interval)
        }

    }, [callAccepted])


    return (
        <>
            {
                receivingCall && !callAccepted ? ('') : (<div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 
            rounded-2xl overflow-hidden callbg`} onMouseOver={() => setShowActions(true)} onMouseOut={() => setShowActions(false)}>
                    {/* Container */}
                    <div>
                        <div>
                            {/* Header */}
                            <Header />
                            {/* Call Area */}
                            <CallInfo name={call.name} callAccepted={callAccepted} />
                            {showActions ? <CallActions endCall={endCall} /> : ''}
                        </div>
                        {/* Stream */}
                        <div>
                            {callAccepted && !callEnded && (<div>
                                <video ref={userVideo} playsInline muted autoPlay className={toggle ? 'SmallVideoCall' : 'largeVideoCall'}
                                    onClick={() => setToggle((prev) => !prev)} />
                            </div>)}
                            {/* My vid */}
                            {stream && (
                                <div>
                                    <video
                                        ref={myVideo}
                                        playsInline
                                        muted
                                        autoPlay
                                        className={`${toggle ? 'largeVideoCall' : 'SmallVideoCall'} ${showActions ? "moveVideoCall" : ""
                                            }`}
                                        onClick={() => setToggle((prev) => !prev)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>)
            }
            {/* Ringing */}
            {
                receivingCall && !callAccepted ? (
                    <Ringing call={call} answerCall={answerCall} endCall={endCall} />
                ) : ('')
            }
        </>
    )
}
