import { DesignIcon, FinanceIcon, HrIcon, ItIcon } from '@/assets/icons';
import {
  AttendeeAvatarImage,
  AvatarImage,
  AvatarConversationImage,
  UsersAvatarRoundedImage,
} from '@/assets/images';

export const departmentsData = [
  {
    id: 1,
    icon: ItIcon,
    department: 'IT',
    description: `The IT department is responsible for managing the IT related issues of the company.`,
    avatar: [
      { id: 1, src: AvatarConversationImage },
      { id: 2, src: UsersAvatarRoundedImage },
      { id: 3, src: AttendeeAvatarImage },
      { id: 4, src: AvatarImage },
    ],
  },
  {
    id: 2,
    icon: HrIcon,
    department: 'Human Resources',
    description: `The human resources department is responsible for a company's most important asset its people.`,
    avatar: [
      { id: 1, src: AvatarConversationImage },
      { id: 2, src: UsersAvatarRoundedImage },
      { id: 3, src: AttendeeAvatarImage },
      { id: 4, src: AvatarImage },
    ],
  },
  {
    id: 3,
    icon: DesignIcon,
    department: 'Design',
    description: `Designers are responsible for the design and implementation of all the experiences and resolved designing related issues.`,
    avatar: [
      { id: 1, src: AvatarConversationImage },
      { id: 2, src: UsersAvatarRoundedImage },
      { id: 3, src: AttendeeAvatarImage },
      { id: 4, src: AvatarImage },
    ],
  },
  {
    id: 4,
    icon: FinanceIcon,
    department: 'Finance',
    description: `The finance department is responsible for the financial planning and management of the company.`,
    avatar: [
      { id: 1, src: AvatarConversationImage },
      { id: 2, src: UsersAvatarRoundedImage },
      { id: 3, src: AttendeeAvatarImage },
      { id: 4, src: AvatarImage },
    ],
  },
];
