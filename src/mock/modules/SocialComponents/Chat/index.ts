import { userAvatarImage, userSender } from '@/assets/images';

export const chatsData = [
  {
    userId: '1',
    userImage: userAvatarImage,
    message: 'Hi Michael <br/> Hope you are doing well.',
    timeStamp: '10:39 AM',
    role: 'receiver',
  },
  {
    userId: '2',
    userImage: userSender,
    message: 'Hi Janetta <br/> Rotolo I am Fine.',
    timeStamp: '10:40 AM',
    role: 'sender',
    chatReaction: '&#x2764;',
  },
  {
    userId: '1',
    userImage: userAvatarImage,
    message: 'So, What is your plan this Weekend?',
    timeStamp: '10:39 AM',
    role: 'receiver',
  },
];
