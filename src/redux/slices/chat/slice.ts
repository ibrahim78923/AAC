import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ChatStateI {
  chatModeState: any;
  chatMessages: any;
  chatContacts: any;
  activeChatId: any;
  activeChat: any;
  activeConversation: any;
  changeChat: any;
  activeReceiverId: any;
  isNewChat: any;
  socket: any;
  isConnected: boolean;
  messageStatus: boolean;
  activeParticipant: any;
  typingUserData: any;
  activeReply: any;
  chatMetaInfo: any;
  isChatMessagesLoading: any;
  isChatContactsLoading: any;
}

const initialState: ChatStateI = {
  chatModeState: 'personalChat',
  chatMessages: [],
  chatContacts: [],
  activeChatId: '',
  activeChat: {},
  activeConversation: '',
  changeChat: '',
  activeReceiverId: '',
  isNewChat: false,
  socket: {},
  isConnected: false,
  messageStatus: false,
  activeParticipant: {},
  typingUserData: {},
  activeReply: {},
  chatMetaInfo: {},
  isChatMessagesLoading: false,
  isChatContactsLoading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    setChatModes: (state: any, action: PayloadAction<any>) => {
      state.chatModeState = action?.payload;
    },
    setAddMessage(state, action) {
      state.chatMessages = action?.payload;
    },
    setChatMessages(state, action) {
      if (Array.isArray(action?.payload)) {
        state.chatMessages = action?.payload;
        // state.chatMessages = [...state.chatMessages,...action?.payload];
      } else {
        const existingMessageIndex = state?.chatMessages?.findIndex(
          (message: any) => message?._id === action?.payload?._id,
        );
        if (existingMessageIndex === -1) {
          state.chatMessages?.unshift(action?.payload);
        } else {
          state.chatMessages[existingMessageIndex] = action?.payload;
        }
      }
    },

    setChatContacts(state, action) {
      if (Array.isArray(action?.payload)) {
        state.chatContacts = action?.payload;
      } else {
        const existingContactsIndex = state?.chatContacts?.findIndex(
          (contact: any) => contact?._id === action?.payload?._id,
        );
        if (existingContactsIndex === -1) {
          state.chatContacts.push(action?.payload);
        } else {
          state.chatContacts[existingContactsIndex] = action?.payload;
        }
      }
    },

    setUpdateChatContacts(state, action) {
      const updatedChatContacts = state?.chatContacts?.map((chat: any) => {
        if (chat?.ownerId === action?.payload?.ownerId) {
          return {
            ...chat,
            _id: action?.payload?.chatId,
          };
        }
        return chat;
      });
      return {
        ...state,
        chatContacts: updatedChatContacts,
      };
    },

    setActiveChatId(state, action) {
      state.activeChatId = action?.payload;
    },
    setActiveChat(state, action) {
      state.activeChat = action?.payload;
    },
    setActiveReceiverId(state, action) {
      state.activeReceiverId = action?.payload;
    },
    setActiveConversation(state, action) {
      state.activeConversation = action?.payload;
    },
    setIsNewChat(state, action) {
      state.isNewChat = action?.payload;
    },
    setSocketConnection(state, action) {
      state.socket = action?.payload?.socket ?? {};
      state.isConnected = action?.payload?.isConnected ?? false;
    },

    setMessageStatus(state, action) {
      state.messageStatus = action?.payload;
    },
    setActiveParticipant(state, action) {
      state.activeParticipant = action?.payload;
    },

    setTypingUserData(state, action) {
      state.typingUserData = action?.payload;
    },
    setActiveReply(state, action) {
      state.activeReply = action?.payload;
    },
    setChatMetaInfo(state, action) {
      state.chatMetaInfo = action?.payload;
    },
    setChatMessagesLoading(state, action) {
      state.isChatMessagesLoading = action?.payload;
    },
    setChatContactsLoading(state, action) {
      state.isChatContactsLoading = action?.payload;
    },
    setChangeChat(state, action) {
      state.changeChat = action?.payload;
    },
  },
});
export const {
  setChatModes,
  setAddMessage,
  setChatMessages,
  setChatContacts,
  setUpdateChatContacts,
  setActiveChatId,
  setActiveChat,
  setActiveReceiverId,
  setActiveConversation,
  setSocketConnection,
  setIsNewChat,
  setMessageStatus,
  setActiveParticipant,
  setTypingUserData,
  setActiveReply,
  setChatMetaInfo,
  setChatMessagesLoading,
  setChatContactsLoading,
  setChangeChat,
} = chatSlice.actions;
export default chatSlice.reducer;
