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
