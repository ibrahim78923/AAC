import { useEffect, useState } from 'react';

export const useBufferTime = (props: any) => {
  const { setValue } = props;
  const [beforeChecked, setBeforeChecked] = useState(false);
  const [afterChecked, setAfterChecked] = useState(false);

  useEffect(() => {
    if (!beforeChecked) setValue('bufferTime.bufferBefore', null);
  }, [beforeChecked]);

  useEffect(() => {
    if (!afterChecked) setValue('bufferTime.bufferAfter', null);
  }, [afterChecked]);

  return {
    beforeChecked,
    setBeforeChecked,
    afterChecked,
    setAfterChecked,
  };
};
