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
        // Updated path to reference the public directory
        const response = await fetch('/stories.json');
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        const data = await response.json();
        
        // Process stories without trying to import images as modules
        // Since images are now in the public directory, we can reference them directly
        const storiesWithImages = data.stories.map((story: Story) => ({
          ...story,
          // Convert relative paths to absolute paths for public directory
          image: story.image.replace('src/', '/'),
          avatar: story.avatar.replace('src/', '/')
        }));
        
        setStories(storiesWithImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        console.error('Error loading stories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return { stories, loading, error };
};