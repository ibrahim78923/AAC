import { useState } from 'react';

export const useBufferTime = (props: any) => {
  const { setValue } = props;
  const [beforeChecked, setBeforeChecked] = useState(false);
  const [afterChecked, setAfterChecked] = useState(false);

  const handleBeforeChange = (e: any) => {
    const isChecked = e?.target?.checked;
    setBeforeChecked(isChecked);
    if (!isChecked) {
      setValue('bufferTime.bufferBefore', null);
    }
  };

  const handleAfterChange = (e: any) => {
    const isChecked = e?.target?.checked;
    setAfterChecked(isChecked);
    if (!isChecked) {
      setValue('bufferTime.bufferAfter', null);
    }
  };
  return {
    beforeChecked,
    setBeforeChecked,
    afterChecked,
    setAfterChecked,
    handleBeforeChange,
    handleAfterChange,
  };
};
