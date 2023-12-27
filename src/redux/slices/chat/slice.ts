import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ChatStateI {
  chatModeState: any;
  chatMessages: any;
  chatContacts: any;
  activeChatId: any;
  activeReceiverId: any;
  isNewChat: any;
  socket: any;
  isConnected: boolean;
  messageStatus: boolean;
  activeParticipant: any;
  typingUserData: any;
}

const initialState: ChatStateI = {
  chatModeState: 'personalChat',
  chatMessages: [],
  chatContacts: [],
  activeChatId: '',
  activeReceiverId: '',
  isNewChat: false,
  socket: {},
  isConnected: false,
  messageStatus: false,
  activeParticipant: {},
  typingUserData: {},
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
    setActiveReceiverId(state, action) {
      state.activeReceiverId = action?.payload;
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
  },
});
export const {
  setChatModes,
  setAddMessage,
  setChatMessages,
  setChatContacts,
  setUpdateChatContacts,
  setActiveChatId,
  setActiveReceiverId,
  setSocketConnection,
  setIsNewChat,
  setMessageStatus,
  setActiveParticipant,
  setTypingUserData,
} = chatSlice.actions;
export default chatSlice.reducer;
