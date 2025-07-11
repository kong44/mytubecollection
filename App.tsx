
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import VideoInputForm from './components/VideoInputForm';
import VideoCard from './components/VideoCard';
import { Video } from './types';
import Login from './components/Login';

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('mytube-current-user');
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      try {
        const storedVideos = localStorage.getItem(`youtube-embed-videos-${currentUser}`);
        setVideos(storedVideos ? JSON.parse(storedVideos) : []);
      } catch (e) {
        console.error("Failed to parse videos from localStorage", e);
        setVideos([]);
      }
    } else {
      setVideos([]); // Clear videos when logged out
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`youtube-embed-videos-${currentUser}`, JSON.stringify(videos));
    }
  }, [videos, currentUser]);

  const handleLogin = (email: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail) {
      setCurrentUser(trimmedEmail);
      localStorage.setItem('mytube-current-user', trimmedEmail);
    }
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mytube-current-user');
  };

  const extractVideoId = (url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAddVideo = useCallback((url: string) => {
    setError(null);
    if (!url.trim()) {
      setError("Please enter a YouTube URL.");
      return;
    }
    
    const videoId = extractVideoId(url);

    if (!videoId) {
      setError("Invalid YouTube URL. Please check the link and try again.");
      return;
    }

    if (videos.some(video => video.id === videoId)) {
      setError("This video is already in your list.");
      return;
    }

    const newVideo: Video = {
      id: videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
    };

    setVideos(prevVideos => [newVideo, ...prevVideos]);
  }, [videos]);

  const handleRemoveVideo = useCallback((id: string) => {
    setVideos(prevVideos => prevVideos.filter(video => video.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-white">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        {!currentUser ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl font-bold text-center text-red-500 mb-2">Add a New Video</h2>
              <p className="text-center text-gray-400 mb-6">Paste any YouTube link to add it to your personal collection.</p>
              <VideoInputForm onAddVideo={handleAddVideo} />
              {error && <p className="text-red-400 text-center mt-4">{error}</p>}
            </div>

            {videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map(video => (
                  <VideoCard key={video.id} video={video} onRemove={handleRemoveVideo} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-6 bg-gray-800 rounded-lg shadow-xl">
                <h3 className="text-2xl font-semibold text-gray-300">Your Collection is Empty</h3>
                <p className="text-gray-400 mt-2">Use the form above to add your favorite YouTube videos.</p>
              </div>
            )}
          </>
        )}
      </main>
       <footer className="text-center py-4 mt-8 text-gray-500 text-sm">
        <p>Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
