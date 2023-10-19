import CommonModal from '@/components/CommonModal';
import React, { FC, useState } from 'react';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { GrayPlusIcon } from '@/assets/icons';

const options = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
];

const AddDevice: FC<{
  isModalOpen: boolean;
  setIsmodalOpen: any;
  //   setIsmodalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: any) => void;
  options: any;
}> = () => {
  const [isModalOpen, setIsmodalOpen] = useState(false);
  const methods: any = useForm({
    defaultValues: { device: '' },
  });

  const onSubmit = (data: any) => {
    alert(JSON?.stringify(data));
    setIsmodalOpen(false);
  };
  const handleAddDevice = () => {
    setIsmodalOpen(true);
  };

  return (
    <>
      <Button
        color="secondary"
        onClick={handleAddDevice}
        sx={{ px: 2 }}
        startIcon={<GrayPlusIcon />}
      >
        Add Device
      </Button>
      {isModalOpen && (
        <CommonModal
          open={isModalOpen}
          handleClose={() => setIsmodalOpen(false)}
          handleSubmit={methods?.handleSubmit(onSubmit)}
          title="Add Device"
          okText="add"
          footer
        >
          <FormProvider
            methods={methods}
            onSubmit={methods?.handleSubmit(onSubmit)}
          >
            <RHFSelect
              name="device"
              placeholder="Search or add category"
              size="small"
              label="Device"
            >
              {options?.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </RHFSelect>
          </FormProvider>
        </CommonModal>
      )}
    </>
  );
};

export default AddDevice;
