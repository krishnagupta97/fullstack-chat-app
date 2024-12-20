import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from "../components/Sidebar"
import ChatContainer from "../components/ChatContainer"
import NoChatSelected from "../components/NoChatSelected"

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[94vh] bg-base-200 mt-10 mb-0">
      <div className="flex items-center justify-center pt-2 px-1 sm:px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-4rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
