import { useState, useEffect } from 'react';
import { Story } from '../types/story';

export const useStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/stories.json');
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        const data = await response.json();
        
        // Import the actual image modules
        const storiesWithImages = await Promise.all(
          data.stories.map(async (story: Story) => {
            try {
              const imageModule = await import(story.image);
              return {
                ...story,
                image: imageModule.default,
                avatar: imageModule.default
              };
            } catch (err) {
              console.error(`Failed to load image for story ${story.id}:`, err);
              return story;
            }
          })
        );
        
        setStories(storiesWithImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return { stories, loading, error };
};