import {
  PreviewVegImage,
  PreviewColorsImage,
  PreviewTrainImage,
  UserAvatarImage,
  UserSenderImage,
  GroupAvatarImage,
  GroupAvatarAdidasImage,
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
    userAvatar: GroupAvatarAdidasImage,
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
        img: PreviewVegImage,
      },
      {
        id: '2',
        img: PreviewTrainImage,
      },
      {
        id: '13',
        img: PreviewVegImage,
      },
    ],
  },
  {
    date: 'lastWeek',
    media: [
      {
        id: '2',
        img: PreviewColorsImage,
      },
    ],
  },
];

export const documentFolderArr: any = [
  {
    id: '1',
    parentId: null,
    folderName: 'Default',
    createdBy: 'Johan',
    createdAt: '06/01/21',
  },
  {
    id: '2',
    parentId: null,
    folderName: 'MyCv',
    createdBy: 'Johan',
    createdAt: '05/02/22',
  },
  {
    id: '3',
    parentId: null,
    folderName: 'Recent Pic',
    createdBy: 'Johan',
    createdAt: '05/02/22',
  },
  {
    id: '4',
    parentId: null,
    folderName: 'Fav Pic',
    createdBy: 'Johan',
    createdAt: '05/02/22',
  },
  {
    id: '5',
    parentId: null,
    folderName: 'Fav Pic',
    createdBy: 'Johan',
    createdAt: '05/02/22',
  },
  {
    id: '6',
    parentId: null,
    folderName: 'Fav Pic',
    createdBy: 'Johan',
    createdAt: '05/02/22',
  },
  {
    id: '7',
    parentId: null,
    folderName: 'Fav Pic',
    createdBy: 'Johan',
    createdAt: '05/02/22',
  },
  {
    id: '8',
    parentId: null,
    folderName: 'Fav Pic',
    createdBy: 'Johan',
    createdAt: '05/02/22',
  },
];
