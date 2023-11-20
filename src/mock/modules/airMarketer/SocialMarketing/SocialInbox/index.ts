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

import {
  DysonAvatarImage,
  RandomPostImage,
  UserProfileAvatarImage,
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

export const inboxPostData = [
  {
    id: '1',
    userImage: DysonAvatarImage,
    userName: 'Live Broadcast',
    postedTime: '01:34 PM',
    discription:
      'Surround Yourself With The Dreams And The Doers, The Believers And Thinkers, But Most Of All Surround Yourself With Those Who See Greatness Within You, Even When You Don’t See It Yourself',
    postImage: RandomPostImage,
    likes: '159',
    comments: '65',
    shares: '30',
    postComments: [
      {
        id: '1',
        userImage: UserProfileAvatarImage,
        userName: 'Paula Griffin',
        comment:
          'People getting this type of rejection for AI images, or any images that contains A.I  generated comntnt, but this is definitely not AI',
        recomment: [
          {
            userImage: DysonAvatarImage,
            userName: 'Live Broadcast',
            comment: 'Thank you',
          },
        ],
      },
      {
        id: '2',
        userImage: UserProfileAvatarImage,
        userName: 'Jhon Doe',
        comment: 'Very good post',
        recomment: [
          {
            userImage: DysonAvatarImage,
            userName: 'Live Broadcast',
            comment: 'Really Appreciated',
          },
        ],
      },
    ],
  },
];

export const userProfile = {
  userImage: UserProfileAvatarImage,
  userName: 'Willam marks',
  stats: [
    {
      label: 'Likes',
      value: '20',
    },
    {
      label: 'Comments',
      value: '755',
    },
    {
      label: 'Shares',
      value: '78',
    },
  ],
};

export const LifeCycleStageTableData: any = [
  {
    Id: 1,
    name: `Subscriber`,
    usedIn: '8',
  },
  {
    Id: 2,
    name: `Lead`,
    usedIn: '0',
  },

  {
    Id: 3,
    name: `Customer`,
    usedIn: '3',
  },
];
