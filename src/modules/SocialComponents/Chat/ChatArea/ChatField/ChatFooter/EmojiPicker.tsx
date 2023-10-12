// components/EmojiPicker.tsx
import React from 'react';
import EmojiPicker from 'emoji-picker-react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPickerComponent: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
}) => {
  const handleEmojiSelect = (emoji: string) => {
    onEmojiSelect(emoji);
  };

  return <EmojiPicker onEmojiClick={handleEmojiSelect} />;
};

export default EmojiPickerComponent;
