import { useTheme } from '@mui/material';

export const useSocialInbox = () => {
  const handleSelection = () => {
    //   dispatch(setChatModes({ chatModeState: newValue }));
  };
  const theme = useTheme();
  // const chatModeState = useAppSelector(
  //     (state: any) => state.chat.chatModeState,
  // );
  // const chatMode = chatModeState.chatModeState
  //     ? chatModeState.chatModeState
  //     : 'personalChat';

  return {
    handleSelection,
    theme,
    // chatModeState,
    // chatMode,
  };
};
