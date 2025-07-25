import React from 'react';

// Placeholder icons - replace with actual icons from a library like Heroicons or Font Awesome
const BackArrowIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>;
const EditIcon = () => <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>;
const LanguageIcon = () => <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m4 13l4-4M19 9V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h4l3 3l3-3h4a2 2 0 002-2v-4M12 15v2m0-10V5"></path></svg>; // Placeholder
const ThemeIcon = () => <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>; // Placeholder
const ReminderIcon = () => <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>; // Placeholder
const ChangePasswordIcon = () => <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 017.743-5.743L13 5h2v2h2v2m-6 4h4m-2 2v2m-2-2H9m2-2V9m0 0H9m2 2h2"></path></svg>; // Placeholder
const ChevronRightIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>;

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-green-800 p-4 text-white flex items-center">
        <button className="mr-4">
          <BackArrowIcon />
        </button>
      </div>

      {/* Profile Info */}
      <div className="relative pb-24" >
        <div className='bg-green-800 h-[200px] w-[100%] absolute ' style={{top: '-110px',
    borderRadius: '100%'}}></div>
        <div className="flex flex-col items-center">
          <div className="relative">
            <img 
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
              src="https://via.placeholder.com/150" // Replace with actual image URL
              alt="Rahul Malviya"
            />
            <button className="absolute bottom-0 right-0 bg-green-600 p-1.5 rounded-full border-2 border-white">
              <EditIcon />
            </button>
          </div>
          <h1 className="text-2xl font-semibold text-green-800 mt-3">Rahul Malviya</h1>
          <p className="text-gray-600 text-sm">+91 9770458688</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="-mt-16 border-t-2 p-6 rounded-lg border-b-2 mb-6 ">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div>
            <label className="block text-gray-500">Gender</label>
            <p className="bg-green-200 text-green-700 p-2 rounded-md pl-4">Male</p>
          </div>
          <div>
            <label className="block text-gray-500">Date Of Birth</label>
            <p className="bg-green-200 text-green-700 p-2 rounded-md pl-4">03/10/2002</p>
          </div>
          <div>
            <label className="block text-gray-500">State</label>
            <p className="bg-green-200 text-green-700 p-2 rounded-md pl-4">Madhya Pradesh</p>
          </div>
          <div>
            <label className="block text-gray-500">Tehsil</label>
            <p className="bg-green-200 text-green-700 p-2 rounded-md pl-4">Khategaon</p>
          </div>
          <div >
            <label className="block text-gray-500">Assign Village</label>
            <p className="bg-green-200 text-green-700 p-2 rounded-md pl-4">Kahtegaon</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t-2 p-4 rounded-lg border-b-2 mb-6 text-sm">
        <div className="flex justify-between items-center py-3 ">
          <div>
            <h3 className="font-semibold text-green-800">Total Farmer Registered</h3>
            <p className="text-gray-600">2,350 Regiestered</p>
          </div>
          <ChevronRightIcon />
        </div>
        <div className="flex justify-between items-center py-3">
          <div>
            <h3 className="font-semibold text-green-800">Total Farm Registered</h3>
            <p className="text-gray-600">2,350 Regiestered</p>
          </div>
          <ChevronRightIcon />
        </div>
      </div>

      {/* Preferences Section */}
      <div className="border-t-2 p-4 rounded-lg border-b-2 mb-6 text-sm">
        <h3 className="text-base font-semibold text-gray-700 mb-3">Preferences</h3>
        <ul>
          <li className="flex justify-between items-center py-3 ">
            <div className="flex items-center">
              <LanguageIcon />
              <span className="ml-3 text-gray-700">Language</span>
            </div>
            <ChevronRightIcon />
          </li>
          <li className="flex justify-between items-center py-3 ">
            <div className="flex items-center">
              <ThemeIcon />
              <span className="ml-3 text-gray-700">Theme</span>
            </div>
            <ChevronRightIcon />
          </li>
          <li className="flex justify-between items-center py-3 ">
            <div className="flex items-center">
              <ReminderIcon />
              <span className="ml-3 text-gray-700">Reminder</span>
            </div>
            <ChevronRightIcon />
          </li>
          <li className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <ChangePasswordIcon />
              <span className="ml-3 text-gray-700">Change Password</span>
            </div>
            <ChevronRightIcon />
          </li>
        </ul>
      </div>

      {/* Log Out Button */}
      <div className="px-4 pb-6 mt-auto">
        <button className="w-full bg-green-800 text-white py-3 rounded-lg font-semibold text-base">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;