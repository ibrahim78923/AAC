import { setSocialInboxMode } from '@/redux/slices/socialInbox';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useTheme } from '@mui/material';

export const useSocialInbox = () => {
  const dispatch = useAppDispatch();
  const handleSelection = (_: any, newValue: any) => {
    dispatch(setSocialInboxMode(newValue));
  };
  const theme = useTheme();
  const socialModeState = useAppSelector(
    (state: any) => state?.socialInbox?.socialInboxState,
  );

  return {
    handleSelection,
    theme,
    socialModeState,
  };
};
