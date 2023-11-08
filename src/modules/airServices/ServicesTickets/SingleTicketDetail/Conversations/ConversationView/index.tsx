import ConversationForwardView from '../ConversationForwardView';
import ConversationReplyView from '../ConversationReplyView';
import ConversationNoteView from '../ConversationNoteView';

const ConversationView = () => {
  return (
    <>
      <ConversationReplyView />
      <ConversationNoteView />
      <ConversationForwardView />
    </>
  );
};

export default ConversationView;
