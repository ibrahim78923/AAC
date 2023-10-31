import React from 'react';

import useToggle from '@/hooks/useToggle';

import Documents from './Documents';
import Folders from './Folders';

const MyDocuments = () => {
  const [isToggled, toggle] = useToggle(false);
  return (
    <>
      {isToggled ? <Folders toggle={toggle} /> : <Documents toggle={toggle} />}
    </>
  );
};

export default MyDocuments;
