import { Header } from './Header';
import { ConversationList } from './ConversationList';
import { useAppDispatch } from '@/redux/store';
import { resetComponentState } from '@/redux/slices/airServices/ticket-conversation/slice';
import { useEffect } from 'react';

const Conversations = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, []);

  return (
    <>
      <Header />
      <br />
      <ConversationList />
    </>
  );
};

export default Conversations;
