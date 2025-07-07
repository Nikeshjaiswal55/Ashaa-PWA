import { useNavigate } from 'react-router-dom';

import { Bell } from 'lucide-react';

import headerImg from '../../assets/header/header.png';
import profileImg from '../../assets/header/profile.jpg';

const Header = (props: { hideText?: boolean; hideProfile?: boolean }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 w-full z-20">
      <div
        className=" h-15 text-white  px-4 py-3 flex justify-between items-center "
        style={{ backgroundColor: '#005b24' }}
      >
        <div
          className="flex items-center gap-3"
          onClick={() => {
            navigate('/profile');
          }}
        >
          {!props.hideProfile && (
            <img src={profileImg} alt="profile" className="rounded-lg object-cover w-10 h-10" />
          )}{' '}
          {!props.hideText && (
            <div>
              <h1 className="font-semibold text-base">Khategaon</h1>
              <h2 className="font-normal text-xs">Agarda ⌄</h2>
            </div>
          )}
        </div>
        {!props.hideText && <Bell size={24 as number} />}
      </div>
      <div>
        <img src={headerImg} alt="Header" className=" h-8 w-full block " />
      </div>
    </div>
  );
};
export default Header;
