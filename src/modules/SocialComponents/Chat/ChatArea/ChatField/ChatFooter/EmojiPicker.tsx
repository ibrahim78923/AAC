// components/EmojiPicker.tsx
import React from 'react';

import EmojiPicker from 'emoji-picker-react';

import { EmojiPickerProps } from './ChatFooter.interface';

const EmojiPickerComponent: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
}) => {
  const handleEmojiSelect = (emoji: string) => {
    onEmojiSelect(emoji);
  };

  return <EmojiPicker onEmojiClick={handleEmojiSelect} />;
};

export default EmojiPickerComponent;
