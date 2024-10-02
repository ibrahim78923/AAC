import {
  StatsFacebookImage,
  StatsInstagramImage,
  StatsLinkedinImage,
  StatsTwitterImage,
  StatsYoutubeImage,
} from '@/assets/images';
import { useTheme } from '@mui/material';

const useProfileStatistics = () => {
  const theme = useTheme();
  const cardsArray = [
    {
      icon: StatsLinkedinImage,
      title: 'Linkedin',
      followers: 156.3,
      percentage: 3.5,
    },
    {
      icon: StatsTwitterImage,
      title: 'Twitter',
      followers: 156.3,
      percentage: 3.5,
    },
    {
      icon: StatsYoutubeImage,
      title: 'Youtube',
      followers: 156.3,
      percentage: 3.5,
    },
    {
      icon: StatsInstagramImage,
      title: 'Instagram',
      followers: 156.3,
      percentage: 3.5,
    },
    {
      icon: StatsFacebookImage,
      title: 'Facebook',
      followers: 156.3,
      percentage: 3.5,
    },
  ];
  const cardFooterColors = (name: string) => {
    switch (name) {
      case 'Linkedin':
        return `linear-gradient(180deg, 
              ${theme?.palette?.custom?.linkedin_linear_color1} 0%, 
              ${theme?.palette?.custom?.linkedin_linear_color2} 100%)`;
      case 'Twitter':
        return `linear-gradient(180deg, 
              ${theme?.palette?.custom?.twitter_linear_color1} 0%, 
              ${theme?.palette?.custom?.twitter_linear_color2} 100%)`;
      case 'Youtube':
        return `linear-gradient(180deg, 
              ${theme?.palette?.custom?.youtube_linear_color1} 0%, 
              ${theme?.palette?.custom?.youtube_linear_color2} 100%)`;
      case 'Instagram':
        return `linear-gradient(180deg, 
              ${theme?.palette?.custom?.instagram_linear_color1} 0%, 
              ${theme?.palette?.custom?.instagram_linear_color2} 100%)`;
      case 'Facebook':
        return `linear-gradient(180deg, 
              ${theme?.palette?.custom?.facebook_linear_color1} 0%, 
              ${theme?.palette?.custom?.facebook_linear_color1} 100%)`;
      default:
        return {};
    }
  };

  return {
    cardsArray,
    theme,
    cardFooterColors,
  };
};

export default useProfileStatistics;
