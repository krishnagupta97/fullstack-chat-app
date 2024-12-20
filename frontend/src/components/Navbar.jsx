import { RiAccountCircleFill, RiLogoutBoxFill, RiToolsFill, RiWechatFill } from '@remixicon/react'
import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  const navigate = useNavigate();

  return (
    <div className="bg-base-100 fixed border-b border-base-300 w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80">
      <div className='grid grid-cols-3 min-h-10'>
        {/* left - profile, setting */}
        <div className='flex gap-4 items-center'>
          <div className='pl-4'>
            <div onClick={() => navigate("/profile")} className='flex justify-center items-center gap-1 cursor-pointer px-1 py-1 rounded-md bg-opacity-30 bg-black'>
              <RiAccountCircleFill />
              <span className='hidden md:inline'>Profile</span>
            </div>
          </div>
          <div>
            <div onClick={() => navigate("/setting")} className='flex justify-center items-center gap-1 cursor-pointer px-1 py-1 rounded-md bg-opacity-30 bg-black'>
              <RiToolsFill />
              <span className='hidden md:inline'>Settings</span>
            </div>
          </div>
        </div>
        {/* center - logo */}
        <div className='flex justify-center items-center'>
          <RiWechatFill className='cursor-pointer hover:opacity-80 transition-all' onClick={() => navigate("/")} size={30} />
        </div>
        {/* right - logout */}
        <div className='flex items-center justify-end pr-4'>
          {
            authUser && <Link onClick={logout} className='flex cursor-pointer justify-end items-center gap-1 cursor-pointe  px-2 py-1 rounded-md'>
              <RiLogoutBoxFill />
              <span className='hidden md:inline'>Logout</span>
            </Link>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
