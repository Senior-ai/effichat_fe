import { useRef, useState } from 'react'

export default function Picture({ readablePicture, setReadablePicture, setPicture }) {
    const [error, setError] = useState('');
    const inputRef = useRef();
    const handlePicture = (e) => {
        let pic = e.target.files[0];
        if (pic === undefined) {
            setError('')
            return;
        }
        else if (pic.type !== 'image/jpeg' && pic.type !== 'image/png' && pic.type !== 'image/webp') {
            setError(`${pic.name} format is not supported`)
            return;
        } else if (pic.size > 1024 * 1024 * 5) {//5mb 
            setError(`${pic.name} size is too large, Maximum 5MB allowed.`)
            return;
        } else {
            setError('');
            setPicture(pic);
            const reader = new FileReader();
            reader.readAsDataURL(pic);
            reader.onload = (e) => {
                setReadablePicture(e.target.result);
            }
        }
    }
    const removePicture = () => {
        setReadablePicture();
        setPicture();
    } 
    return (
        <div className="mt-2 content-center space-y-1">
            {readablePicture ?
                <div className='justify-center items-center flex flex-col'>
                    <div className='flex flex-row ml-5'>
                        <img src={readablePicture} alt="profile" className='w-20 h-20 object-cover rounded-full'></img>
                        <div className='justify-start items-start flex cursor-pointer' onClick={() => removePicture()}>
                            <div className='w-5 bg-red-300 text-red-500 rounded-full text-sm font-medium items-center justify-center flex'>X</div>
                        </div>
                    </div>
                </div>
                :
                <div className='w-full h-12 bg-dark_bg_3 text-dark_text_1 text-sm rounded-md font-medium flex items-center justify-center cursor-pointer'
                    onClick={() => inputRef.current.click()}>
                    Upload picture (Optional)
                </div>}
            <input type="file" name="picture" hidden ref={inputRef} accept="image/png,image/jpeg,image/webp"
                onChange={handlePicture} />
            <p className='text-red-400'>{error}</p>
        </div>
    )
}
