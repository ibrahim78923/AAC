import {
  PreviewOneImage,
  PreviewThreeImage,
  PreviewTwoImage,
  UserAvatarImage,
  UserSenderImage,
  GroupAvatarImage,
  GroupAvatarTwoImage,
} from '@/assets/images';

export const chatContactsData = [
  {
    chatId: '01',
    userAvatar: UserAvatarImage,
    userName: 'Paula Griffin',
    lastMessage: 'How are you?',
    notification: '2',
    time: '12:48PM',
  },
  {
    chatId: '01',
    userAvatar: UserAvatarImage,
    userName: 'Bessie Cooper',
    lastMessage: 'How are you?',
    notification: '2',
    time: '12:48PM',
  },
  {
    chatId: '01',
    userAvatar: UserAvatarImage,
    userName: 'Brooklyn Simmons',
    lastMessage: 'How are you?',
    notification: '2',
    time: '12:48PM',
  },
];
export const chatGroupsData = [
  {
    chatId: '01',
    userAvatar: GroupAvatarImage,
    userName: 'Product Catalogue',
    lastMessage: 'How are you?',
    notification: '2',
    time: '12:48PM',
  },
  {
    chatId: '01',
    userAvatar: GroupAvatarTwoImage,
    userName: 'Sport',
    lastMessage: "i'll be there in 2 minutes",
    notification: '2',
    time: '12:48PM',
  },
];

export const chatsData = [
  {
    chatID: '1',
    userId: '1',
    userImage: UserAvatarImage,
    message: 'Hi Michael <br/> Hope you are doing well.',
    timeStamp: '10:39 AM',
    role: 'receiver',
  },
  {
    chatID: '2',
    userId: '2',
    userImage: UserSenderImage,
    message: 'Hi Janetta <br/> Rotolo I am Fine.',
    timeStamp: '10:40 AM',
    role: 'sender',
    chatReaction: '&#x2764;',
  },
  {
    chatID: '3',
    userId: '1',
    userImage: UserAvatarImage,
    message: 'So, What is your plan this Weekend?',
    timeStamp: '10:39 AM',
    role: 'receiver',
  },
];

export const mediaAssetsData = [
  {
    date: 'lastWeek',
    media: [
      {
        id: '1',
        img: PreviewOneImage,
      },
      {
        id: '2',
        img: PreviewTwoImage,
      },
      {
        id: '13',
        img: PreviewOneImage,
      },
    ],
  },
  {
    date: 'lastWeek',
    media: [
      {
        id: '2',
        img: PreviewThreeImage,
      },
    ],
  },
];
