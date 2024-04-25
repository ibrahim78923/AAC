import {
  CollectiveMeetingIcon,
  GroupMeetingIcon,
  OneToOneMeetingIcon,
} from '@/assets/icons';
import { SOCIAL_COMPONENTS } from '@/constants';

export const scheduleCards = [
  {
    id: 1,
    title: 'One to One Meeting',
    description:
      'A one-to-one meeting is a private and direct discussion between two individuals.',
    icon: OneToOneMeetingIcon,
    link: SOCIAL_COMPONENTS?.ONE_TO_ONE_MEETING,
  },
  {
    id: 2,
    title: 'Group Meeting',
    description:
      'A group meeting is a gathering of multiple individuals with a common purpose to discuss, collaborate, or address specific topics.',
    icon: GroupMeetingIcon,
    link: SOCIAL_COMPONENTS?.GROUP_MEETING,
  },
  {
    id: 3,
    title: 'Collective Meeting',
    description:
      'A collective meeting involves the participation of a group of people who come together to discuss, share ideas, and make decisions as a team.',
    icon: CollectiveMeetingIcon,
    link: SOCIAL_COMPONENTS?.COLLECTIVE_MEETING,
  },
];
