import {
  TaskAvatarImage,
  CampaignAvatarImage,
  YouTubeAvatarImage,
} from '@/assets/images';

// const theme:any = useTheme();

export const taskEvents: any = (todayDate: any, theme: any) => {
  return [
    {
      title: 'Tasks',
      SocailMedia: TaskAvatarImage,
      bgColor: `${theme?.palette?.primary?.main}`,
      textColor: `${theme?.palette?.common?.white}`,
      start: '2024-01-08T10:00:00',
      end: '2024-01-08T12:00:00',
    },
    {
      title: 'Campaigns.',
      SocailMedia: CampaignAvatarImage,
      bgColor: `${theme?.palette?.error?.lighter}`,
      textColor: `${theme?.palette?.error?.main}`,
      start: '2024-01-08T10:00:00',
      end: '2024-01-08T10:00:00',
    },
    {
      title: 'Campaign',
      SocailMedia: CampaignAvatarImage,
      bgColor: `${theme?.palette?.error?.lighter}`,
      textColor: `${theme?.palette?.error?.main}`,
      start: `${todayDate}T10:00:00`,
      end: `${todayDate}T12:00:00`,
    },
    {
      title: 'Tasks',
      SocailMedia: YouTubeAvatarImage,
      bgColor: `${theme?.palette?.primary?.main}`,
      textColor: `${theme?.palette?.common?.white}`,
      start: `${todayDate}T10:00:00`,
      end: `${todayDate}T12:00:00`,
    },
  ];
};
