import { softwareUserDataI } from './Users.interface';

export const softwareUserData: softwareUserDataI[] = [
  {
    title: 'Allocate',
    handleClick: (handleClose) => {
      // console.log('Allocate clicked');
      handleClose(); // Close the menu
    },
  },
  {
    title: 'Deallocate',
    handleClick: (handleClose) => {
      // console.log('Deallocate clicked');
      handleClose(); // Close the menu
    },
  },
  {
    title: 'Remove',
    handleClick: (handleClose) => {
      // console.log('Remove clicked');
      handleClose(); // Close the menu
    },
  },
];
