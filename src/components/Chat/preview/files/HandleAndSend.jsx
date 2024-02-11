import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from "react-icons/ai";
import { AddFile } from './AddFile';
import { IoSendSharp } from "react-icons/io5";
import { uploadFiles } from '../../../../utils/file';
import { clearFiles, removeFile, sendMessage } from '../../../../features/chatSlice';
import SocketContext from '../../../../context/SocketContext';
import { ClipLoader } from 'react-spinners';
import VideoThumbnail from 'react-video-thumbnail';


const HandleAndSend = ({activeIndex, setActiveIndex, message, socket}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => state.user);
    const {token} = user;
    const {files, activeConversation} = useSelector((state) => state.chat);

    const sendMessageHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const uploadedFiles = await uploadFiles(files);
        const values = {
            token,
            message,
            convoId: activeConversation._id,
            files: uploadedFiles.length > 0? uploadedFiles : []
        }
        let newMsg = await dispatch(sendMessage(values));
        socket.emit('send message', newMsg.payload);
        setLoading(false);
        await dispatch(clearFiles());
    }

    const handleRemoveFile = (index) => {
        dispatch(removeFile(index))
    }

  return (
    <div className='w-[80%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2 border-indigo-300' >
        <span></span>
        <div className="flex gap-x-2">
            {
                files.map((file,i) => (
                    <div key={i} className={`fileThumbnail relative w-14 h-14 border border-indigo-400  mt-2 rounded-md overflow-hidden cursor-pointer ${activeIndex === i? 'border-[3px] border-indigo-600 ' : ''}`} onClick={() => setActiveIndex(i)}>
                        {
                            file.type === 'IMAGE'  ? <img src={file.fileData} alt="File preview" className='w-full h-full object-contain'/> 
                            : file.type === 'VIDEO' ? <VideoThumbnail videoUrl={file.fileData}></VideoThumbnail> : 
                            <img src={`../../../../images/file/${file.type}.png`} alt="File preview" className='w-8 h-10 mt-1.5 ml-2.5' />
                            
                        }
                        <div className='removeFileIcon hidden' onClick={() => handleRemoveFile(i)}>
                            <AiOutlineClose size={14} className='absolute right-0 top-0'/>
                        </div>
                    </div>
                ))
            }
            <AddFile/>
        </div>
        {/* Send button */}
        <div className='bg-indigo-600 hover:bg-indigo-700 w-12 h-12 mt-2 rounded-full flex items-center justify-center cursor-pointer'
        onClick={(e) => sendMessageHandler(e)}> 
        {loading? <ClipLoader color='#fff' loading={loading} size={22} /> : 
            <IoSendSharp color='white' size={24} className='ml-1' />
        }
        </div>
    </div>
  )
}

const HandleAndSendwithContext = (props) => (
    <SocketContext.Consumer>
        {(socket) => <HandleAndSend {...props} socket={socket}/>}
    </SocketContext.Consumer>
)

export default HandleAndSendwithContext