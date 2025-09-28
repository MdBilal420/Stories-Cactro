import { useState } from 'react';
import StoryThumbnail from '../components/story-thumbnail';
import StoryViewer from '../components/stroy-viewer';
import { useStories } from '../hooks/use-stories';

const Index = () => {
  const { stories, loading, error } = useStories();
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);

  const handleStorySelect = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const handleCloseViewer = () => {
    setSelectedStoryIndex(null);
  };

  const handleNextStory = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex < stories.length - 1) {
      setSelectedStoryIndex(selectedStoryIndex + 1);
    }
  };

  const handlePreviousStory = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
      setSelectedStoryIndex(selectedStoryIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-destructive mb-2">Error loading stories</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="pt-safe-top px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">Stories</h1>
        
        {/* Stories thumbnails */}
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {stories.map((story, index) => (
            <div key={story.id} className="flex-shrink-0">
              <StoryThumbnail
                story={story}
                onClick={() => handleStorySelect(index)}
                gradientIndex={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Story Viewer */}
      {selectedStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          currentIndex={selectedStoryIndex}
          onClose={handleCloseViewer}
          onNext={handleNextStory}
          onPrevious={handlePreviousStory}
        />
      )}
    </div>
  );
};

export default Index;