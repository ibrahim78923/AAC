import { useTheme } from '@mui/material';

import {
  setActiveChat,
  setActiveChatId,
  setActiveConversation,
  setActiveParticipant,
  setActiveReceiverId,
  setChatContacts,
  setChatMessages,
  setChatModes,
} from '@/redux/slices/chat/slice';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';

export const useContacts = () => {
  const dispatch = useDispatch();
  const handleSelection = (_: any, newValue: any) => {
    dispatch(setChatModes({ chatModeState: newValue }));
    dispatch(setActiveChatId(''));
    dispatch(setActiveChat([]));
    dispatch(setActiveReceiverId(''));
    dispatch(setActiveConversation({}));
    dispatch(setChatMessages([]));
    dispatch(setChatContacts([]));
    dispatch(
      setActiveParticipant({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
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
