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
  UserRetroImage,
  UserRoundImage,
  UsersAvatarRoundedImage,
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
    socialMode: 'fbPost',
  },
  {
    id: '02',
    userAvatar: GroupAvatarImage,
    userName: 'Mr Robert Fox',
    lastMessage: 'Mailed you on Gmail :  Hi James Henry',
    notification: '2',
    time: '12:48PM',
    socialIcon: GroupGmailImage,
    socialMode: 'mail',
  },
  {
    id: '03',
    userAvatar: GroupAvatarImage,
    userName: 'Steve Archer',
    lastMessage: 'Commented on your post :  “Nice Picture”',
    notification: '2',
    time: '12:48PM',
    socialIcon: GroupTwitterImage,
    socialMode: 'twitterPost',
  },
  {
    id: '04',
    userAvatar: GroupAvatarAdidasImage,
    userName: 'Kane Williamson',
    lastMessage: 'Mailed you on Gmail :  Hi James Henry',
    notification: '2',
    time: '12:48PM',
    socialIcon: GroupInstagramImage,
    socialMode: 'instagramPost',
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
      label: 'Private Messages',
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

export const mailingData: any = {
  id: '1',
  userName: 'Keith Thompson',
  userImage: UserRetroImage,
  timeStamp: 'Apr 6, 2023 at 09:49 GMT +5',
  from: 'keitht@gmail.com',
  to: 'robertfox@gmail.com',
  subject: 'Work from home request',
  body: '<strong>Hi James Henry,</strong><br /><br />Thank you so much for being a customer of Hycholic.ltdbr <br /> It’s because of people like you we have been able to be in business for such a long time. To thank you, we have created a discount coupon especially for you. <br /><br /> Use the code #000000000 to get a discount from any product in our store . But hurry! The offer is only available for the first people who make the purchase<br /><br /> <strong>Kind Regards,</strong> <br /> Mr. Robert Fox <br /><br />Hycholic.LTD<br /><strong>Mr.RobertFox314@gmail.com</strong>',
  reply: [
    {
      id: '2',
      userName: 'Robert Fox',
      userImage: UserRoundImage,
      timeStamp: 'Apr 6, 2023 at 10:56 GMT +5',
      from: 'robert@gmail.com',
      to: ['robertfox@gmail.com'],
      subject: 'Work from home request',
      body: '<strong>Hi James Henry,</strong><br /><br />Thank you so much for being a customer of Hycholic.ltdbr <br /> It’s because of people like you we have been able to be in business for such a long time. To thank you, we have created a discount coupon especially for you. <br /><br /> Use the code #000000000 to get a discount from any product in our store . But hurry! The offer is only available for the first people who make the purchase<br /><br /> <strong>Kind Regards,</strong> <br /> Mr. Robert Fox <br /><br />Hycholic.LTD<br /><strong>Mr.RobertFox314@gmail.com</strong>',
    },
  ],
};

export const quickReplies = [
  {
    title: 'Feedback',
    content:
      'Delighted with our customer support? Would you like to leave us a review of your experience with our team?',
  },
  {
    title: 'Query:',
    content:
      'Hey Paul,I’m getting back to you regarding the discount you mentioned in your last email.',
  },
  {
    title: 'Query:',
    content:
      'Hey Paul,I’m getting back to you regarding the discount you mentioned in your last email.',
  },
];

export const commentActivity = [
  {
    userImage: UsersAvatarRoundedImage,
    userName: 'Aditya Cah Tegal',
    date: '01/02/23',
    time: '01:34 PM',
    comment:
      'People getting this type of rejection for AI images, or any images that contains A.I  generated comntnt, but this is definitely not AI',
    commentNotification: '',
  },
  {
    userImage: UsersAvatarRoundedImage,
    userName: 'Robert fox',
    date: '01/02/23',
    time: '01:34 PM',
    comment: 'replied on this comment  “Thanks”',
    commentNotification: '',
  },
  {
    userImage: UsersAvatarRoundedImage,
    userName: 'Robert fox',
    date: '01/02/23',
    time: '01:34 PM',
    comment: 'reacted on this comment 😊',
    commentNotification: '',
  },
];
