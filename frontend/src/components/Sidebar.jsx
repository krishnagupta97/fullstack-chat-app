import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from "../skeletons/SidebarSkeleton"
import { RiUserLine } from '@remixicon/react';
import { useAuthStore } from "../store/useAuthStore"
import Avatar from "../assets/avatar.png"

const Sidebar = () => {

  const { users, isUsersLoading, getUsers, selectedUser, setSelectedUser } = useChatStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    console.log("sidebar useEffect",users);
    getUsers();
    console.log("sidebar useEffect",users);
  }, [getUsers])

  if (isUsersLoading) return <SidebarSkeleton />

  const filteredUsers = Array.isArray(users) ? (showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users) : [];
  console.log("sidebar filter",filteredUsers);
  

  return (
    <aside className="h-full w-22 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <RiUserLine className="size-5" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className='cursor-pointer gap-2 flex items-center'>
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={e => setShowOnlineOnly(e.target.checked)}
              className='checkbox checkbox-sm'
            />
            <span className='text-sm select-none'>Show online only</span>
          </label>
          <span className='cursor-pointer flex items-center gap-2 select-none'>({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || Avatar}
                alt={user.name}
                className="size-10 sm:size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className='text-center text-zinc-500 py-4'>No online users</div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar;
