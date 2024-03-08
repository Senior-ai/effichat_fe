import { useState, useEffect } from 'react'
import { Ringing } from './Ringing'
import { Header } from './Header';
import { CallInfo } from './CallInfo';
import { CallActions } from './CallActions';
import Draggable from 'react-draggable';

export const Call = ({ call, setCall, callAccepted, userVideo, myVideo, stream, setIsCalling, answerCall }) => {
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
                            <CallInfo name={call.name} callAccepted={callAccepted} /> {/* //TODO - i suggest to rename it to something more intuative like "CallInfo" */}
                            {showActions ? <CallActions /> : ''}
                        </div>
                        {/* Stream */}
                        <div>
                            {callAccepted && !callEnded && (<div>
                                <video ref={userVideo} playsInline muted autoPlay className={`largeVideoCall`} /> {/* //TODO -remove unnecessary closing tags */}
                            </div>)}
                            {/* My vid */}
                            {stream && (
                                <div> {/* //TODO - Check if any divs are unnecesery and remove if needed */}
                                    <video
                                        ref={myVideo}
                                        playsInline
                                        muted
                                        autoPlay
                                        className={`SmallVideoCall ${showActions ? "moveVideoCall" : ""
                                            }`}
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
                    <Ringing call={call} answerCall={answerCall} />
                ) : ('')
            }
        </>
    )
}
