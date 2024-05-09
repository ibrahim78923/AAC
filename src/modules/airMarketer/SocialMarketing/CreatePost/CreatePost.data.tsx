import { RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';
import RHFMultiSearchableSelectWithAccordion from './MultiSearchableSelectWithAccordion';
import {
  FacebookLogo,
  InstagramLogo,
  UserProfileAvatarImage,
} from '@/assets/images';
import PostDetailsField from './PostDetailsField';
import UploadMedia from './UploadMedia';

export const validationSchema = Yup?.object()?.shape({
  SocialAccount: Yup?.string(),
  Campaign: Yup?.string(),
  PostDetails: Yup?.string(),
  Media: Yup?.string(),
});

export const defaultValues = {
  SocialAccount: '',
  Campaign: '',
  PostDetails: '',
  Media: '',
};

export const createPostDataArray = (campaignsViewData: any) => {
  return [
    {
      componentProps: {
        name: 'SocialAccount',
        isCheckBox: false,
        isSearch: true,
        isAllSelect: false,
        placeholder: 'Add Social Account',
        options: [
          {
            label: 'Facebook',
            image: FacebookLogo,
            options: [
              {
                image: UserProfileAvatarImage,
                value: 'JohnDoe',
                label: 'John Doe',
              },
              {
                image: UserProfileAvatarImage,
                value: 'Andrew',
                label: 'Andrew',
              },
            ],
          },
          {
            label: 'Instagram',
            image: InstagramLogo,
            options: [
              {
                image: UserProfileAvatarImage,
                value: 'RichardRobertson',
                label: 'Richard robertson',
              },
              {
                image: UserProfileAvatarImage,
                value: 'Franksten',
                label: 'Franksten',
              },
            ],
          },
        ],
      },
      component: RHFMultiSearchableSelectWithAccordion,
      md: 12,
    },
    {
      componentProps: {
        name: 'Campaign',
        label: 'Campaign',
        fullWidth: true,
        select: true,
      },
      options: campaignsViewData?.data?.views?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,

      md: 12,
    },
    {
      componentProps: {
        name: 'PostDetails',
        label: 'Post Details',
        fullWidth: true,
        select: false,
      },

      component: PostDetailsField,

      md: 12,
    },
    {
      componentProps: {
        name: 'Media',
        label: 'Media',
        fullWidth: true,
        select: false,
      },

      component: UploadMedia,

      md: 12,
    },
  ];
};
