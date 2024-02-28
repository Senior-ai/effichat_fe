import React from 'react'
import { Ringing } from './Ringing'
import { Header } from './Header';
import { CallArea } from './CallArea';
import { CallActions } from './CallActions';

export const Call = ({call, setCall, callAccepted}) => {
    const {receivingCall, callEnded} = call;
  return (
    <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 
    rounded-2xl overflow-hidden callbg`}>
        {/* Container */}
        <div>
            <div>
                {/* Header */}
                <Header/>
                {/* Call Area */}
                <CallArea name='placeholder name'/>
                <CallActions/>
            </div>
        </div>
        {/* Ringing */}
        {
            receivingCall && !callAccepted && (
                <Ringing call={call} setCall={setCall}/>
            )
        }
    </div>
  )
}
