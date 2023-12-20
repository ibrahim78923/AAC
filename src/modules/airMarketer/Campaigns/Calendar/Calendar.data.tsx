import {
  TaskAvatarImage,
  CampaignAvatarImage,
  YouTubeAvatarImage,
} from '@/assets/images';

// const theme:any = useTheme();

export const taskEvents: any = [
  {
    title: 'Tasks',
    SocailMedia: TaskAvatarImage,
    // bgColor: `${theme?.palette?.primary?.main}`,
    // textColor: `${theme?.palette?.common?.white}`,

    start: '2023-11-09T10:00:00',
    end: '2023-11-09T12:00:00',
  },
  {
    title: 'Campaigns.',
    SocailMedia: CampaignAvatarImage,
    bgColor: '#FFEEF4',
    // textColor: `${theme?.palette?.error?.main}`,
    start: '2023-11-09T10:00:00',
    end: '2023-11-09T10:00:00',
  },
  {
    title: 'Campaign',
    SocailMedia: CampaignAvatarImage,
    bgColor: '#FFEEF4',
    // textColor: `${theme?.palette?.error?.main}`,
    start: '2023-11-20T10:00:00',
    end: '2023-11-20T12:00:00',
  },
  {
    title: 'Youtube data',
    SocailMedia: YouTubeAvatarImage,
    // borderColor: `${theme?.palette?.grey[700]}`,
    start: '2023-11-22T10:00:00',
    end: '2023-11-22T12:00:00',
  },
];
