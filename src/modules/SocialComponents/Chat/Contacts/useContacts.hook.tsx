import { useTheme } from '@mui/material';

import {
  setActiveChatId,
  setActiveConversation,
  setActiveParticipant,
  setActiveReceiverId,
  setChatModes,
} from '@/redux/slices/chat/slice';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';

export const useContacts = () => {
  const dispatch = useDispatch();
  const handleSelection = (_: any, newValue: any) => {
    dispatch(setChatModes({ chatModeState: newValue }));
    dispatch(setActiveChatId(''));
    dispatch(setActiveReceiverId(''));
    dispatch(setActiveConversation({}));
    dispatch(
      setActiveParticipant({
        firstName: '',
        lastName: '',
      }),
    );
  };
  const theme = useTheme();
  const chatModeState = useAppSelector(
    (state: any) => state?.chat?.chatModeState,
  );
  const chatMode = chatModeState?.chatModeState
    ? chatModeState?.chatModeState
    : 'personalChat';

  return {
    handleSelection,
    theme,
    chatModeState,
    chatMode,
  };
};
