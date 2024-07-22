import { useState } from 'react';

export const useBufferTime = () => {
  const [beforeChecked, setBeforeChecked] = useState(false);
  const [afterChecked, setAfterChecked] = useState(false);

  return {
    beforeChecked,
    setBeforeChecked,
    afterChecked,
    setAfterChecked,
  };
};
