import { RHFMultiSearchableSelect } from '@/components/ReactHookForm';
import { UserProfileAvatarImage, UserSenderImage } from '@/assets/images';
import * as Yup from 'yup';
export const addMembersValidationSchema = Yup.object().shape({
  members: Yup.string().required('Field is Required'),
});

export const addMembersDefaultValues = {
  members: '',
};

export const addMembersDataArray = (setIsAddMembers: any) => {
  return [
    {
      componentProps: {
        name: 'members',
        label: 'Members',
        isCheckBox: true,
        defaultOpen: true,
        isFooter: true,
        footerText: 'Add',
        footerActionHandler: () => alert('Add'),
        setIsDropdownClose: setIsAddMembers,
      },
      options: [
        {
          image: UserProfileAvatarImage,
          value: 'JohnDoe',
          label: 'John Doe',
        },
        {
          image: UserSenderImage,
          value: 'Andrew',
          label: 'Andrew',
        },
        {
          image: UserProfileAvatarImage,
          value: 'RichardRobertson',
          label: 'Richard robertson',
        },
        {
          image: UserSenderImage,
          value: 'Franksten',
          label: 'Franksten',
        },
      ],
      component: RHFMultiSearchableSelect,
      md: 12,
    },
  ];
};
