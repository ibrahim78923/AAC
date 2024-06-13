import { AvatarContactImage } from '@/assets/images';
import dayjs from 'dayjs';

export const callFromDropDownData: any = ['Contacts', 'Groups'];
export const callFromDropDown = (setButtonName: any) =>
  callFromDropDownData?.map((item: any) => ({
    title: item,
    handleClick: (close: any) => {
      setButtonName(item);
      close();
    },
  }));
export const formatTime = (time: string) => {
  const now = dayjs();
  const callTime = dayjs(time);
  const daysPassed = now.diff(callTime, 'day');
  return `${daysPassed} days ago`;
};
export const recentCallsData = [
  {
    id: 1,
    avatar: AvatarContactImage,
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    time: formatTime('2022-01-01T12:34:56Z'), // Replace with actual timestamp from backend
  },
  {
    id: 2,
    avatar: AvatarContactImage,
    name: 'Jane Smith',
    phoneNumber: '987-654-3210',
    time: formatTime('2024-01-02T09:12:34Z'), // Replace with actual timestamp from backend
  },
  {
    id: 21,
    avatar: AvatarContactImage,
    name: 'Jan Smith',
    phoneNumber: '987-654-3210',
    time: formatTime('2024-01-02T09:12:34Z'), // Replace with actual timestamp from backend
  },
  {
    id: 11,
    avatar: AvatarContactImage,
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    time: formatTime('2024-01-01T12:34:56Z'), // Replace with actual timestamp from backend
  },
];
