import {
  CollectiveMeetingIcon,
  GroupMeetingIcon,
  OneToOneMeetingIcon,
} from '@/assets/icons';

export const scheduleCards = (ticketId: any, moduleType: any) => {
  return [
    {
      id: 1,
      title: 'One to One Meeting',
      description:
        'A one-to-one meeting is a private and direct discussion between two individuals.',
      icon: OneToOneMeetingIcon,
      query: {
        type: 'one-to-one',
        ...(moduleType && { moduleType }),
        ...(ticketId && { ticketId }),
      },
    },
    {
      id: 2,
      title: 'Group Meeting',
      description:
        'A group meeting is a gathering of multiple individuals with a common purpose to discuss, collaborate, or address specific topics.',
      icon: GroupMeetingIcon,
      query: {
        type: 'group',
        ...(moduleType && { moduleType }),
        ...(ticketId && { ticketId }),
      },
    },
    {
      id: 3,
      title: 'Collective Meeting',
      description:
        'A collective meeting involves the participation of a group of people who come together to discuss, share ideas, and make decisions as a team.',
      icon: CollectiveMeetingIcon,
      query: {
        type: 'collective',
        ...(moduleType && { moduleType }),
        ...(ticketId && { ticketId }),
      },
    },
  ];
};
