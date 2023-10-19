import { softwareUserDataI } from './Users.interface';

export const softwareUserData: softwareUserDataI[] = [
  {
    title: 'Allocate',
    handleClick: (handleClose) => {
      // console.log('Allocate clicked');
      handleClose();
    },
  },
  {
    title: 'Deallocate',
    handleClick: (handleClose) => {
      // console.log('Deallocate clicked');
      handleClose();
    },
  },
  {
    title: 'Remove',
    handleClick: (handleClose) => {
      // console.log('Remove clicked');
      handleClose();
    },
  },
];
