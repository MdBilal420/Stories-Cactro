import { Story } from '../types/story';

interface StoryThumbnailProps {
  story: Story;
  onClick: () => void;
  gradientIndex: number;
}

const StoryThumbnail = ({ story, onClick, gradientIndex }: StoryThumbnailProps) => {
  const gradients = [
    'var(--gradient-story-1)',
    'var(--gradient-story-2)', 
    'var(--gradient-story-3)',
    'var(--gradient-story-4)',
    'var(--gradient-story-5)'
  ];

  return (
    <div className="flex flex-col items-center space-y-2 cursor-pointer" onClick={onClick}>
      <div 
        className="w-16 h-16 rounded-full p-[2px] transition-transform duration-200 hover:scale-105"
        style={{ background: gradients[gradientIndex % gradients.length] }}
      >
        <div className="w-full h-full rounded-full bg-background p-[2px]">
          <img
            src={story.image}
            alt={story.user}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs text-foreground text-center max-w-[70px] truncate">
        {story.user}
      </span>
    </div>
  );
};

export default StoryThumbnail