import { DesignIcon, FinanceIcon, HrIcon, ItIcon } from '@/assets/icons';
import {
  AttendeeAvatarImage,
  AvatarImage,
  AvatarImageCoversation,
  UsersAvatarRoundedImage,
} from '@/assets/images';

export const departmentsData = [
  {
    icon: ItIcon,
    department: 'IT',
    description: `The IT department is responsible for managing the   IT related issues of the company.`,
    avatar: [
      AvatarImageCoversation,
      UsersAvatarRoundedImage,
      AttendeeAvatarImage,
      AvatarImage,
    ],
  },
  {
    icon: HrIcon,
    department: 'Human Resources',
    description: `The human resources department is responsible for a company's most important asset its people.`,
    avatar: [
      AvatarImageCoversation,
      UsersAvatarRoundedImage,
      AttendeeAvatarImage,
      AvatarImage,
    ],
  },
  {
    icon: DesignIcon,
    department: 'Design',
    description: `Designers are responsible for the design and implementation of all the experiences and resolved designing related issues.`,
    avatar: [
      AvatarImageCoversation,
      UsersAvatarRoundedImage,
      AttendeeAvatarImage,
      AvatarImage,
    ],
  },
  {
    icon: FinanceIcon,
    department: 'Finance',
    description: `The finance department is responsible for the financial planning and management of the company.`,
    avatar: [
      AvatarImageCoversation,
      UsersAvatarRoundedImage,
      AttendeeAvatarImage,
      AvatarImage,
    ],
  },
];
