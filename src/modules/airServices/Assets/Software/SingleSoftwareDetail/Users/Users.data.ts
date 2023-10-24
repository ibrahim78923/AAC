import { UserActionI } from './User.interface';

export const userDropdown = (
  setActionModalOpen: any,
  userActionClickHandler: any,
): UserActionI[] => {
  return [
    {
      title: 'Allocate',
      handleClick: () => {
        userActionClickHandler('Allocate');
        setActionModalOpen(true);
      },
    },
    {
      title: 'Deallocate',
      handleClick: () => {
        userActionClickHandler('Deallocate');
        setActionModalOpen(true);
      },
    },
    {
      title: 'Remove',
      handleClick: () => {
        userActionClickHandler('Remove');
        setActionModalOpen(true);
      },
    },
  ];
};
