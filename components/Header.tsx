
import React from 'react';
import YoutubeIcon from './icons/YoutubeIcon';

interface HeaderProps {
  currentUser: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <YoutubeIcon className="w-10 h-10 text-red-600 mr-3" />
          <h1 className="text-3xl font-bold tracking-wider text-white">
            MyTube<span className="text-red-500">Collection</span>
          </h1>
        </div>
        {currentUser && (
          <div className="flex items-center gap-4">
            <span className="text-gray-300 hidden sm:block truncate max-w-[150px] md:max-w-xs" title={currentUser}>{currentUser}</span>
            <button
              onClick={onLogout}
              className="bg-gray-700 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm flex-shrink-0"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
