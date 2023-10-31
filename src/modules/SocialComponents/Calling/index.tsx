import React, { useState } from 'react';

import { Box } from '@mui/material';

import CallingMain from './CallingMain';
import AddaNumber from './AddaNumber';

const Calling = () => {
  const [addaNumber, setAddaNumber] = useState(false);

  return (
    <Box>
      {addaNumber ? (
        <AddaNumber />
      ) : (
        <CallingMain setAddaNumber={setAddaNumber} />
      )}
    </Box>
  );
};

export default Calling;
