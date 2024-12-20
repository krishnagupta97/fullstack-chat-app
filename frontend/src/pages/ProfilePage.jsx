import { RiAccountBoxLine, RiAccountCircleLine, RiCameraFill, RiMailAddLine, RiProfileLine, RiReactjsFill, RiUserFill, RiUserLine } from '@remixicon/react'
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import Avatar from "../assets/avatar.png"
import { formatMessageTime } from '../lib/utils'

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const imageUploadHandler = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    }
  }

  return (
    <div className='min-h-screen flex justify-center'>
      <div className='w-full sm:mx-8 md:w-[700px] min-h-full my-4'>
        {/* up */}
        <div className='flex flex-col gap-8 px-2 md:px-10 rounded-3xl py-6 pb-10  my-8 bg-base-300'>
          <div className='flex flex-col items-center'>
            <h2 className='text-2xl bold'>Edit Profile</h2>
            <p className='text-base mt-0.5'>Your Current Details</p>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <label htmlFor="profile" className={`${isUpdatingProfile ? "cursor-wait" : "cursor-pointer"}`}>
              <img src={selectedImg || authUser.profilePic || Avatar} className='size-20 border rounded-full object-cover' />
              <input disabled={isUpdatingProfile} onChange={imageUploadHandler} className='hidden' type="file" name="profile" id="profile" />
            </label>
            <p className='text-xs'>
              {
                isUpdatingProfile ? "Uploading..." : "Click to update your profile picture"
              }
            </p>
          </div>
          <div>
            <div className='flex flex-col'>
              <label htmlFor="" className='label flex justify-start items-center gap-2 text-base'>
                <RiUserLine size={15} />
                <span>Name</span>
              </label>
              <input
                disabled={true}
                type="text"
                placeholder={authUser?.fullName}
                className="input input-bordered input-primary w-full" />
            </div>
            <div className='flex flex-col justify-center mt-2'>
              <label htmlFor="" className='label flex justify-start items-center gap-2 text-base'>
                <RiMailAddLine size={15} />
                <span>Email</span>
              </label>
              <input
                disabled={true}
                type="email"
                placeholder={authUser?.email}
                className="input input-bordered input-primary w-full" />
            </div>
          </div>
        </div>
        {/* down */}
        <div className='mt-6 rounded-3xl pb-6 bg-base-300'>
          <div>
            <h2 className='px-4 py-4 pb-8 text-lg'>Account Information</h2>
            <div className='px-4 py-4 text-sm flex justify-between'>
              <p>Account Created Since</p>
              <p>{formatMessageTime(authUser.createdAt)}</p>
            </div>
            <div className='flex justify-center'>
              <hr className='w-[95%] h-0.5 border-none bg-[#262626]' />
            </div>
            <div className='px-4 py-4 text-sm flex justify-between'>
              <p>Account status</p>
              <p className='text-green-500'>&#9679; Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
