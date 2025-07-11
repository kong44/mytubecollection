
import React from 'react';
import { Video } from '../types';
import TrashIcon from './icons/TrashIcon';

interface VideoCardProps {
  video: Video;
  onRemove: (id: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onRemove }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden group flex flex-col transition-all duration-300 hover:shadow-red-500/20 hover:scale-105">
      <div className="relative" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={video.embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4 mt-auto">
        <button
          onClick={() => onRemove(video.id)}
          className="w-full flex items-center justify-center gap-2 bg-red-800/50 hover:bg-red-700 text-red-200 hover:text-white font-semibold py-2 px-4 rounded-md transition-colors"
          aria-label={`Remove video ${video.id}`}
        >
          <TrashIcon className="w-5 h-5" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
