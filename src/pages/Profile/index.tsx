import React from 'react';

import '@fontsource/lexend';
import '@fontsource/lexend-deca';

import { useGetProfileDataQuery } from '@/redux/slices/ApiSlice';

import themeIcon from '../../assets/Icons/Profile/Group.svg';
import lockIcon from '../../assets/Icons/Profile/lock-reset.svg';
import ProfileImg from '../../assets/Icons/Profile/profileImg.png';
import languageIcon from '../../assets/Icons/Profile/uil_language.svg';
// Lexend Deca font
import '../Profile/profile.css';

// Placeholder icons - replace with actual icons from a library like Heroicons or Font Awesome
const BackArrowIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {' '}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    ></path>{' '}
  </svg>
);

const EditIcon = () => (
  <svg
    className="w-4 h-4 text-white"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
  </svg>
);
const ReminderIcon = () => (
  <svg
    className="w-5 h-5 text-[#005B24]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {' '}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    ></path>{' '}
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    className="w-5 h-5 text-black"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
  </svg>
);

// Tailwind class constants for repeated use (no px-based classes are changed)
const badgeClass =
  'bg-[radial-gradient(circle,rgba(54,195,96,0.2))] font-normal text-sm text-[#005B24] pl-2 pr-2 rounded-md flex items-center h-[30px] justify-center';
const infoLabel = 'block text-[#858585]';

const ProfilePage = () => {
  const { data } = useGetProfileDataQuery({});
  const profileInfo = data?.data?.user || {};

  console.log('profile info: ', profileInfo);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-[#005B24] h-[10px] p-4 text-white flex items-center z-20">
        <button className="mr-4 pt-6" onClick={() => window.history.back()}>
          <BackArrowIcon />
        </button>
      </div>

      {/* Profile Info */}
      <div className="relative pb-[16px] ">
        <div
          className="bg-[#005B24] h-[210px] w-[100%] absolute "
          style={{
            top: '-110px',
            borderRadius: '90%',
          }}
        ></div>
        <div className="flex flex-col items-center">
          <div className="relative z-20 flex items-center justify-center mt-8">
            {/* Light green circle background */}
            <div
              className="absolute"
              style={{
                width: '120px',
                height: '120px',
                background: '#E6F4EA', // light green
                borderRadius: '50%',
                top: 0,
                left: 0,
                right: 0,
                margin: 'auto',
                zIndex: 1,
              }}
            ></div>
            {/* Profile image */}
            <img
              className="w-28 h-28 rounded-full shadow-lg relative z-10"
              src={ProfileImg}
              alt="Rahul Malviya"
            />
            {/* Edit icon button (if needed) */}
            <button
              className="absolute bottom-1 right-1 bg-green-700 rounded-md flex items-center justify-center z-20"
              style={{ width: 28, height: 28 }}
            >
              <EditIcon />
            </button>
          </div>
          <h1 className="text-lg  font-semibold text-green-800 mt-1">{profileInfo.name}</h1>
          <p className="text-gray-600 text-sm">+91 {profileInfo.contact_no}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className=" border-t-2 py-[22px] px-[25px] rounded-lg   ">
        <div className="grid grid-cols-2 gap-x-6 gap-y-[12px] text-sm">
          <div>
            <label className={infoLabel}>Gender</label>
            <p className={badgeClass}>{profileInfo.gender}</p>
          </div>
          <div>
            <label className={infoLabel}>Date Of Birth</label>
            <p className={badgeClass}>
              {new Date(profileInfo.date_of_birth).toLocaleDateString('en-IN')}
            </p>
          </div>
          <div>
            <label className={infoLabel}>State</label>
            <p className={badgeClass}>{profileInfo.state_name}</p>
          </div>
          <div>
            <label className={infoLabel}>Tehsil</label>
            <p className={badgeClass}>{profileInfo.tehsil_name}</p>
          </div>
          <div>
            <label className={infoLabel}>Assign Village</label>
            <div className="flex gap-2">
              {profileInfo.village_names?.map((name: string, index: number) => (
                <span key={index} className={badgeClass}>
                  {' '}
                  {name}{' '}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t-2  px-7 rounded-lg border-b-2 mb-[22px] text-sm">
        <div className="flex justify-between border-b-2 py-[22px] items-center ">
          <div>
            <h3 className="font-semibold text-base text-[#005B24]">Total Farmer Registered</h3>
            <p className="text-gray-600">2,350 Regiestered</p>
          </div>
          <ChevronRightIcon />
        </div>
        <div className="flex justify-between items-center py-[22px]">
          <div>
            <h3 className="font-semibold text-base  text-[#005B24]">Total Farm Registered</h3>
            <p className="text-gray-600">2,350 Regiestered</p>
          </div>
          <ChevronRightIcon />
        </div>
      </div>

      {/* Preferences Section */}
      <div className=" px-4 rounded-lg border-b-2  text-sm">
        <h3 className="text-base font-semibold text-[#005B24] pb-[15px]">Preferences</h3>
        <ul className="space-y-[13px]">
          <li className="flex justify-between items-center  ">
            <div className="flex items-center">
              <img src={languageIcon} alt="language" className="w-5 h-5" />
              <span className="ml-3 text-[#858585]">Language</span>
            </div>
            <ChevronRightIcon />
          </li>
          <li className="flex justify-between items-center ">
            <div className="flex items-center">
              <img src={themeIcon} alt="theme" className="w-5 h-5" />
              <span className="ml-3 text-[#858585]">Theme</span>
            </div>
            <ChevronRightIcon />
          </li>
          <li className="flex justify-between  items-center  ">
            <div className="flex items-center">
              <ReminderIcon />
              <span className="ml-3 text-[#858585]">Reminder</span>
            </div>
            <ChevronRightIcon />
          </li>
          <li className="flex justify-between items-center ">
            <div className="flex items-center">
              <img src={lockIcon} alt="change password" className="w-5 h-5" />
              <span className="ml-3 text-[#858585]">Change Password</span>
            </div>
            <ChevronRightIcon />
          </li>
        </ul>
      </div>

      {/* Log Out Button */}
      <div className="px-4 pt-[54px] mb-[22px]  pb-0 ">
        <button className="w-full bg-green-800 text-white py-2 rounded-lg font-semibold text-base">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
