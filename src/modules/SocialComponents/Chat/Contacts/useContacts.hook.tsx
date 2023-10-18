import { useTheme } from '@mui/material';

import { setChatModes } from '@/redux/slices/chat/slice';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';

export const useContacts = () => {
  const dispatch = useDispatch();
  const handleSelection = (_: any, newValue: any) => {
    dispatch(setChatModes({ chatModeState: newValue }));
  };
  const theme = useTheme();
  const chatModeState = useAppSelector(
    (state: any) => state.chat.chatModeState,
  );
  const chatMode = chatModeState.chatModeState;

  return {
    handleSelection,
    theme,
    chatModeState,
    chatMode,
  };
};
