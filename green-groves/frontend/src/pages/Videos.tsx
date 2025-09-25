import React, { useState, useEffect } from 'react';
import { Play, Clock, User } from 'lucide-react';
import Card from '../components/UI/Card';
import PageHeader from '../components/UI/PageHeader';
import { publicService } from '../services/api.ts';

const Videos: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const data = await publicService.getVideos();
        setVideos(data);
      } catch (err) {
        setError('Failed to load videos');
        console.error('Error loading videos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Educational Videos"
        subtitle="Learn from expert gardeners with our collection of instructional videos"
        icon={<Play className="h-10 w-10" />}
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-600">Loading videos...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Card key={video.id} className="h-full cursor-pointer" hover={true}>
              <div className="relative mb-4" onClick={() => setSelectedVideo(video.embed_url)}>
                <img
                  src={video.thumbnail || '/image.png'}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg hover:bg-opacity-30 transition-all duration-300">
                  <Play className="h-16 w-16 text-white opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">{video.title}</h3>
              <p className="text-emerald-600 mb-4 leading-relaxed">{video.description}</p>
            </Card>
          ))}
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-5xl w-full max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-emerald-800">Educational Video</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-emerald-600 hover:text-emerald-800 text-3xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={selectedVideo}
                className="w-full h-full rounded-lg"
                allowFullScreen
                title="Educational gardening video"
              />
            </div>
          </div>
        </div>
      )}

      {/* Video Categories */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
        <h3 className="text-2xl font-bold mb-6">📹 Video Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-3">🌱 Beginner Basics</h4>
            <ul className="space-y-1 text-purple-100">
              <li>• Getting started with gardening</li>
              <li>• Essential tools overview</li>
              <li>• Understanding soil types</li>
              <li>• Watering techniques</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">🌿 Advanced Techniques</h4>
            <ul className="space-y-1 text-purple-100">
              <li>• Grafting and propagation</li>
              <li>• Season extension methods</li>
              <li>• Integrated pest management</li>
              <li>• Specialized growing systems</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">🏠 Indoor Gardening</h4>
            <ul className="space-y-1 text-purple-100">
              <li>• Houseplant care guides</li>
              <li>• Hydroponic setups</li>
              <li>• Grow light systems</li>
              <li>• Air plant arrangements</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
        <h3 className="text-2xl font-bold mb-4">💡 Quick Video Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-2">⏰ Time-Saving Tips</h4>
            <ul className="space-y-1 text-green-100">
              <li>• Watch at 1.25x speed for efficiency</li>
              <li>• Take notes on key timestamps</li>
              <li>• Bookmark favorite videos</li>
              <li>• Practice alongside the video</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">📝 Learning Best Practices</h4>
            <ul className="space-y-1 text-green-100">
              <li>• Start with beginner videos</li>
              <li>• Rewatch complex techniques</li>
              <li>• Apply knowledge immediately</li>
              <li>• Join discussion communities</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Videos;