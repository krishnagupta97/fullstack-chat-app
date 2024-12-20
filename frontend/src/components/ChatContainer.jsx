import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import Avatar from "../assets/avatar.png"
import { formatMessageTime } from "../lib/utils"

const ChatContainer = () => {
  const { messages, isMessagesLoading, selectedUser, getMessages, subscribeToMessages, unsubscribeToMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const safeMessages = Array.isArray(messages) ? messages : [];


  const messageEndRef = useRef();

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeToMessages()
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeToMessages]);

  useEffect(() => {
    if(messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages])

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {
          safeMessages.map(message => (
            <div key={message._id} ref={messageEndRef} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img src={message.senderId === authUser._id ? authUser.profilePic || Avatar : selectedUser.profilePic || Avatar} alt="" />
                </div>
              </div>
              <div className='chat-header mb-1'>
                <time className='text-xs opacity-50 ml-1'> {formatMessageTime(message.createdAt)} </time>
              </div>
              <div className='chat-bubble flex flex-col'>
                {message.image && (
                  <img src={message.image} alt="Attachment" className='sm:max-w-[200px] rounded-md mb-2' />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))
        }
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer;
