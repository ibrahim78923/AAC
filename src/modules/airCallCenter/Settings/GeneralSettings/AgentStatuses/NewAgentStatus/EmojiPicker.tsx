import React from 'react';

import EmojiPicker from 'emoji-picker-react';
import { EmojiPickerPropsInterface } from './NewAgentStatus.interface';

const EmojiPickerComponent: React.FC<EmojiPickerPropsInterface> = ({
  onEmojiSelect,
}) => {
  const handleEmojiSelect = (emoji: any) => {
    onEmojiSelect(emoji);
  };

  return (
    <EmojiPicker
      onEmojiClick={handleEmojiSelect}
      width="29rem"
      style={{ margin: 'auto' }}
    />
  );
};

export default EmojiPickerComponent;
