import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Story } from '../types/story';

interface StoryViewerProps {
  stories: Story[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StoryViewer = ({ stories, currentIndex, onClose, onNext, onPrevious }: StoryViewerProps) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentStory = stories[currentIndex];
  const progressDuration = 5000; // 5 seconds

  const resetProgress = useCallback(() => {
    setProgress(0);
    setIsLoading(true);
    setImageLoaded(false);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setIsLoading(false);
  };

  useEffect(() => {
    resetProgress();
  }, [currentIndex, resetProgress]);

  useEffect(() => {
    if (!imageLoaded) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / progressDuration) * 100, 100);
      
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(timer);
        if (currentIndex < stories.length - 1) {
          onNext();
        } else {
          onClose();
        }
      }
    }, 50);

    return () => clearInterval(timer);
  }, [imageLoaded, currentIndex, stories.length, onNext, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const screenWidth = window.innerWidth;
    const touchX = touch.clientX;
    
    if (touchX < screenWidth / 2) {
      if (currentIndex > 0) {
        onPrevious();
      }
    } else {
      if (currentIndex < stories.length - 1) {
        onNext();
      } else {
        onClose();
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const elementWidth = rect.width;
    
    if (clickX < elementWidth / 2) {
      if (currentIndex > 0) {
        onPrevious();
      }
    } else {
      if (currentIndex < stories.length - 1) {
        onNext();
      } else {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black animate-fade-in">
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 z-10 flex space-x-1">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: index < currentIndex ? '100%' : 
                       index === currentIndex ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-4 right-4 z-10 flex items-center justify-between pt-8">
        <div className="flex items-center space-x-3">
          <img
            src={currentStory.image}
            alt={currentStory.user}
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white font-medium text-sm">{currentStory.user}</p>
            <p className="text-white/70 text-xs">{currentStory.timestamp}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Story content */}
      <div 
        className="w-full h-full flex items-center justify-center cursor-pointer relative"
        onTouchStart={handleTouchStart}
        onClick={handleClick}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <img
          src={currentStory.image}
          alt={currentStory.user}
          className="max-w-full max-h-full object-contain"
          onLoad={handleImageLoad}
        />

        {/* Navigation hints */}
        <div className="absolute inset-0 flex">
          <div className="flex-1 flex items-center justify-start pl-4">
            {currentIndex > 0 && (
              <ChevronLeft className="text-white/30 w-8 h-8" />
            )}
          </div>
          <div className="flex-1 flex items-center justify-end pr-4">
            {currentIndex < stories.length - 1 ? (
              <ChevronRight className="text-white/30 w-8 h-8" />
            ) : (
              <X className="text-white/30 w-8 h-8" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;