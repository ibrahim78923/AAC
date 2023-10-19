import React, { useState } from 'react';

import { ScheduleModals } from '@/components/ScheduleModals';

const AssignModalBox = () => {
  const [isAssign, setAssign] = useState(false);

  return (
    <ScheduleModals
      type={'assign'}
      open={isAssign}
      handleClose={() => {}}
      handleSubmit={() => {
        setAssign(true);
      }}
      submitButonText={''}
      isFooter
    >
      sdbfjsdfbhsdfb
    </ScheduleModals>
  );
};

export default AssignModalBox;
