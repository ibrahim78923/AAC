import { UsersAvatarRoundedImage } from '@/assets/images';

export const callsContactsData = [
  {
    id: '1',
    userImage: UsersAvatarRoundedImage,
    userName: 'John Doe',
    callType: 'inComing',
    callTime: '4:35',
    phone: '3195557745',
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
    phone: '3195552698',
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
    phone: '2195552557',
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
    userPhone: '3195550115',
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
    userPhone: '3195558596',
    messages: [
      {
        ownerName: 'Michael Miller',
        message: "Good morning, Hope you're doing well today.",
        time: '04:32 PM',
        type: 'receiver',
      },
      {
        ownerName: 'John Doe',
        message:
          "I've been working on a project, and I've hit a roadblock. I'm not sure how to proceed",
        time: '04:33 PM',
        type: 'sender',
      },
      {
        ownerName: 'Michael Miller',
        message:
          "I'm here to help. Could you please describe the issue you're facing?",
        time: '04:35 PM',
        type: 'receiver',
      },
      {
        ownerName: 'Michael Miller',
        message:
          "Sure. I'm trying to implement a new feature, but I'm having difficulty with the authentication process. It's a bit tricky.",
        time: '04:35 PM',
        type: 'receiver',
      },
    ],
  },
];

export const callingData = [
  {
    id: '1',
    name: 'Call With AA Traders',
    status: 'Missed',
    outcome: 'Interested',
    date: 'Interested',
    linkedDeal: 'deal',
    scheduledBy: 'Alex Shaw',
    callType: 'Conference Call',
  },
];
