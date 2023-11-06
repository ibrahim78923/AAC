import { MenuItem, Select } from '@mui/material';

import { ScheduleModals } from '@/components/ScheduleModals';

import { RestoreModalData } from './RestoreAssign.data';

import { v4 as uuidv4 } from 'uuid';

const RestoreAssignModalBox = ({ open, onClose, handleAssignModal }: any) => {
  return (
    <ScheduleModals
      type={'assign'}
      open={open}
      handleClose={onClose}
      handleSubmit={handleAssignModal}
      submitButonText={'Update'}
      isFooter
    >
      <Select sx={{ width: '100%' }} {...RestoreModalData.componentProps}>
        {RestoreModalData.options.map((option) => (
          <MenuItem key={uuidv4()}>{option.value}</MenuItem>
        ))}
      </Select>
    </ScheduleModals>
  );
};

export default RestoreAssignModalBox;
