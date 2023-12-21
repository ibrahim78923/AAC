import {
  PreviewVegImage,
  PreviewColorsImage,
  PreviewTrainImage,
  UserAvatarImage,
  UserSenderImage,
  GroupAvatarImage,
  GroupAvatarAdidasImage,
  UserProfileImage,
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
    chatId: '02',
    userAvatar: UserAvatarImage,
    userName: 'Bessie Cooper',
    lastMessage: 'How are you?',
    notification: '2',
    time: '12:48PM',
  },
  {
    chatId: '03',
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
    chatId: '02',
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
    attachment: {
      document: 'A_Project_guide.pdf',
    },
  },
  {
    chatID: '4',
    userId: '1',
    userImage: UserAvatarImage,
    message: 'Have a look on these',
    timeStamp: 'Just now',
    role: 'receiver',
    attachment: {
      // document: 'A_Project_guide.tsx',
      images: [
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
  },
];
export const groupChatsData = [
  {
    chatID: '1',
    userId: '1',
    userImage: UserProfileImage,
    userName: 'Anamiya',
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
    userName: 'Anamiya',
    message: 'So, What is your plan this Weekend?',
    timeStamp: '10:39 AM',
    role: 'receiver',
    messageReplyContents: {
      replyTo: 'You',
      messageRefference: 'Hey Buddy, Yes i am Fine <br/> What About You?',
    },
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

export const groupMembers = [
  {
    id: '01',
    name: 'Brooklyn Simmons',
    image: UserAvatarImage,
    role: 'admin',
  },
  {
    id: '02',
    name: 'Robert Fox',
    image: UserSenderImage,
    role: 'member',
  },
  {
    id: '03',
    name: 'Esther Howard',
    image: UserAvatarImage,
    role: 'admin',
  },
  {
    id: '04',
    name: 'Guy Hawkins',
    image: UserSenderImage,
    role: 'member',
  },
  {
    id: '05',
    name: 'Eleanor Pena',
    image: UserAvatarImage,
    role: 'member',
  },
  {
    id: '06',
    name: 'Robert Fox',
    image: UserSenderImage,
    role: 'member',
  },
  {
    id: '07',
    name: 'Esther Howard',
    image: UserAvatarImage,
    role: 'admin',
  },
  {
    id: '08',
    name: 'Guy Hawkins',
    image: UserSenderImage,
    role: 'member',
  },
  {
    id: '09',
    name: 'Eleanor Pena',
    image: UserAvatarImage,
    role: 'member',
  },
];

export const options = [
  {
    id: '655dcbb8425d2c04a46a3830',
    firstName: 'waqas',
    lastName: 'khan',
    email: 'testWAQASKhan@example.com',
    src: UserAvatarImage,
  },
  {
    id: '655dcda7425d2c04a46a3836',
    firstName: 'zahir',
    lastName: 'khan',
    email: 'testZahirKhan@example.com',
    src: GroupAvatarImage,
  },
  {
    id: '655dcdc8425d2c04a46a3838',
    firstName: 'ahsan',
    lastName: 'khan',
    email: 'testAhsanKhan@example.com',
    src: UserAvatarImage,
  },
  {
    id: '655dcde8425d2c04a46a383a',
    firstName: 'nabeel',
    lastName: 'khan',
    email: 'testNableeKhan@example.com',
    src: UserAvatarImage,
  },
  {
    id: '655dcdfd425d2c04a46a383c',
    firstName: 'waseem',
    lastName: 'khan',
    email: 'testWaseemKhan@example.com',
    src: UserAvatarImage,
  },
];
