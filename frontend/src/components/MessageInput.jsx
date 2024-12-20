import { RiCrossFill, RiCrossLine, RiImageFill, RiMultiImageLine, RiSendPlaneFill, RiSendPlaneLine } from '@remixicon/react'
import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';

const MessageInput = () => {

    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const fileInfoRef = useRef(null);
    const { sendMessage } = useChatStore();

    const imageChangeHandler = (e) => {
        const file = e.target.files[0];

        if(!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file);
    }

    const removeImage = () => {
        setImagePreview(null);
        if(fileInfoRef.current) fileInfoRef.current.value = "";
    }

    const sendMessageHandler = async (e) => {
        e.preventDefault();
        if(!text.trim() && !imagePreview) return;
        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            setText("");
            setImagePreview(null);
        } catch (error) {
            console.log("Failed to send message: ", error);
        }
    }

    return (
        <div className='p-4 w-full'>
            {imagePreview && (
                <div className='mb-3 flex items-center gap-2'>
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className='w-20 h-20 object-cover rounded-lg border border-zinc-700'
                        />
                        <button
                            onClick={removeImage}
                            className='absolute -top1.5 -right1.5 w-5 h -5 rounded-full bg-base-300 flex items-center justify-center'
                        >
                            <RiCrossLine className='size-3' />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={sendMessageHandler} className='flex items-center gap-2'>
                <div className="flex-1 flex gap-2 items-center">
                    <input
                        placeholder='Type a message...'
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        className='w-full input input-bordered input-sm rounded-lg sm:input-md'
                        type="text"
                    />
                    <input
                        type="file"
                        accept='image/*'
                        className='hidden'
                        ref={fileInfoRef}
                        onChange={imageChangeHandler}
                    />
                    <button
                        type='button'
                        className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInfoRef.current?.click()}
                    >
                        <RiImageFill size={20} />
                    </button>
                    <button
                        className='btn btn-circle'
                        type='submit'
                        disabled={!text.trim() && !imagePreview}
                    >
                        <RiSendPlaneFill size={22} />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MessageInput
