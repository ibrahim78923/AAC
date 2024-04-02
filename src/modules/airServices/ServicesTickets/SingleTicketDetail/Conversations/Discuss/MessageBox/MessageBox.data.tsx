import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';

export const chatMessagesDropdownDynamic = (
  authUser?: any,
  setSelectedMessage?: any,
  message?: any,
) => [
  {
    title: 'Reply',
    permissionKey: [
      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_DISCUSSIONS,
    ],
    handleClick: (closeMenu: any) => {
      closeMenu();
      setSelectedMessage({
        ...message,
        isReply: true,
      });
    },
  },
  ...(authUser === message?.createdBy
    ? [
        {
          title: 'Edit',
          permissionKey: [
            AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_DISCUSSIONS,
          ],
          handleClick: (closeMenu: any) => {
            setSelectedMessage({
              ...message,
              isEdit: true,
            });
            closeMenu();
          },
        },
      ]
    : []),
  {
    title: 'Delete',
    permissionKey: [
      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_DISCUSSIONS,
    ],
    handleClick: (closeMenu: any) => {
      setSelectedMessage({
        ...message,
        isDelete: true,
      });
      closeMenu();
    },
  },
];
