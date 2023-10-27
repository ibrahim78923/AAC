import { UsersAvatarRoundedImage } from '@/assets/images';

export const callsContactsData = [
  {
    id: '1',
    userImage: UsersAvatarRoundedImage,
    userName: 'John Doe',
    callType: 'inComing',
    callTime: '4:35',
    phone: '(319) 555-0115',
    callingDetails: [
      {
        type: 'Incoming',
        time: '4:36 PM',
        date: 'Sun Mar 21, 2023',
        duration: '1 min',
      },
      {
        type: 'Outgoing',
        time: '4:36 PM',
        date: 'Sun Mar 21, 2023',
        duration: '1 min',
      },
    ],
  },
  {
    id: '2',
    userImage: UsersAvatarRoundedImage,
    userName: 'William marks',
    callType: 'inComing',
    callTime: '4:35',
    phone: '(319) 555-0115',
    callingDetails: [
      {
        type: 'Outgoing',
        time: '4:36 PM',
        date: 'Sun Mar 21, 2023',
        duration: '1 min',
      },
      {
        type: 'Incoming',
        time: '4:36 PM',
        date: 'Sun Mar 21, 2023',
        duration: '1 min',
      },
    ],
  },
  {
    id: '3',
    userImage: UsersAvatarRoundedImage,
    userName: 'Sara Andrew',
    callType: 'inComing',
    callTime: '4:35',
    phone: '(319) 555-0115',
    callingDetails: [
      {
        type: 'Outgoing',
        time: '4:36 PM',
        date: 'Sun Mar 21, 2023',
        duration: '1 min',
      },
      {
        type: 'Outgoing',
        time: '4:36 PM',
        date: 'Sun Mar 21, 2023',
        duration: '1 min',
      },
      {
        type: 'Incoming',
        time: '4:36 PM',
        date: 'Sun Mar 21, 2023',
        duration: '1 min',
      },
    ],
  },
];

export const callingChats = [
  {
    id: '01',
    userProfile: UsersAvatarRoundedImage,
    userName: 'Glenn Maxwell',
    lastRead: 'Do you have any task today?',
    lastMessageTime: 'today',
    userPhone: '(319) 555-0115',
    messages: [
      {
        ownerName: 'Glenn Maxwell',
        message: 'Do you have any task today?',
        time: '04:32 PM',
        type: 'receiver',
      },
      {
        ownerName: 'John Doe',
        message: 'Yes',
        time: '04:33 PM',
        type: 'sender',
      },
      {
        ownerName: 'Glenn Maxwell',
        message: 'Great',
        time: '04:35 PM',
        type: 'receiver',
      },
      {
        ownerName: 'Glenn Maxwell',
        message: 'Then how long will it take to complete ?',
        time: '04:35 PM',
        type: 'receiver',
      },
      {
        ownerName: 'John Doe',
        message: 'Not more than a day',
        time: '04:36 PM',
        type: 'sender',
      },
    ],
  },
  {
    id: '02',
    userProfile: UsersAvatarRoundedImage,
    userName: 'Michael Miller',
    lastRead: 'Do you have any task today?',
    lastMessageTime: 'today',
    userPhone: '(318) 333-9562',
    messages: [
      {
        ownerName: 'Michael Miller',
        message: 'Do you have any task today?',
        time: '04:32 PM',
        type: 'receiver',
      },
      {
        ownerName: 'John Doe',
        message: 'Yes',
        time: '04:33 PM',
        type: 'sender',
      },
      {
        ownerName: 'Michael Miller',
        message: 'Great',
        time: '04:35 PM',
        type: 'receiver',
      },
      {
        ownerName: 'Michael Miller',
        message: 'Then how long will it take to complete ?',
        time: '04:35 PM',
        type: 'receiver',
      },
      {
        ownerName: 'John Doe',
        message: 'Not more than a day',
        time: '04:36 PM',
        type: 'sender',
      },
    ],
  },
];
