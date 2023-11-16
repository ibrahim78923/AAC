import {
  FacebookChannelImage,
  GroupAvatarAdidasImage,
  GroupAvatarImage,
  GroupFacebookImage,
  GroupGmailImage,
  GroupInstagramImage,
  GroupTwitterImage,
  InstagramChannelImage,
  TwitterChannelImage,
  YoutubeChannelImage,
} from '@/assets/images';

export const SocialTeamsData = [
  {
    id: '01',
    userAvatar: GroupAvatarImage,
    userName: 'Paula Griffin',
    lastMessage: 'Commented on your post :  “Nice Picture”',
    notification: '2',
    time: '12:48PM',
    socialIcon: GroupFacebookImage,
  },
  {
    id: '02',
    userAvatar: GroupAvatarImage,
    userName: 'Mr Robert Fox',
    lastMessage: 'Mailed you on Gmail :  Hi James Henry',
    notification: '2',
    time: '12:48PM',
    socialIcon: GroupGmailImage,
  },
  {
    id: '03',
    userAvatar: GroupAvatarImage,
    userName: 'Steve Archer',
    lastMessage: 'Commented on your post :  “Nice Picture”',
    notification: '2',
    time: '12:48PM',
    socialIcon: GroupTwitterImage,
  },
  {
    id: '04',
    userAvatar: GroupAvatarAdidasImage,
    userName: 'Kane Williamson',
    lastMessage: 'Mailed you on Gmail :  Hi James Henry',
    notification: '2',
    time: '12:48PM',
    socialIcon: GroupInstagramImage,
  },
];

export const socialChannelData = [
  {
    id: 1,
    image: InstagramChannelImage,
  },
  {
    id: 2,
    image: FacebookChannelImage,
  },
  {
    id: 3,
    image: TwitterChannelImage,
  },
  {
    id: 4,
    image: YoutubeChannelImage,
  },
  {
    id: 5,
    image: FacebookChannelImage,
  },
];

export const socialSubChannelData = [
  {
    id: 1,
    image: GroupAvatarImage,
    name: ' Paul',
  },
  {
    id: 2,
    image: GroupAvatarAdidasImage,
    name: 'ZeeTech',
  },
  {
    id: 3,
    image: GroupAvatarImage,
    name: 'SportsHub',
  },
];
