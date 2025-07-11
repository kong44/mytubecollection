
import React, { useState } from 'react';

interface VideoInputFormProps {
  onAddVideo: (url: string) => void;
}

const VideoInputForm: React.FC<VideoInputFormProps> = ({ onAddVideo }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddVideo(url);
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        className="flex-grow px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-colors"
      />
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500"
      >
        Add Video
      </button>
    </form>
  );
};

export default VideoInputForm;
