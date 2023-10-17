import { setChatModes } from '@/redux/slices/chat/slice';
import { useDispatch } from 'react-redux';

export const useContacts = () => {
  const dispatch = useDispatch();
  // const [chatMode, setChatMode] = useState('personalChat');

  const handleSelection = (_: any, newValue: any) => {
    dispatch(setChatModes({ chatModeState: newValue }));
    // if (newValue !== null) {
    //   setChatMode(newValue);
    // }
  };

  return {
    // chatMode,
    handleSelection,
  };
};
