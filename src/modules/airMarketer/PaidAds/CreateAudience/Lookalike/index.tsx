import CommonDrawer from '@/components/CommonDrawer';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { Box, Grid } from '@mui/material';
import useLookalike from './useLookalike';
import { BackArrowIcon } from '@/assets/icons';

const Lookalike = ({ open, onClose }: any) => {
  const { methods } = useLookalike();

  const { handleSubmit } = methods;

  const onSubmit = () => {};

  const formValues = [
    {
      componentProps: {
        name: 'contactList',
        label: 'Contact List',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'ALL', label: 'All' },
        { value: 'DRAFT', label: 'Draft' },
        { value: 'PUBLISHED', label: 'Published' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'accounts',
        label: 'Ad accounts',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'ALL', label: 'All' },
        { value: 'DRAFT', label: 'Draft' },
        { value: 'PUBLISHED', label: 'Published' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'audienceName',
        label: 'Audience name',
        placeholder: 'Lookalike-BBA',
      },
      options: [{ label: 'label', value: 'value' }],
      component: RHFTextField,
    },
  ];

  return (
    <CommonDrawer
      isDrawerOpen={open}
      okText="Create Audience"
      isOk
      footer
      onClose={onClose}
      title="Lookalike"
      headerIcon={
        <Box sx={{ cursor: 'pointer' }} onClick={onClose}>
          <BackArrowIcon />
        </Box>
      }
      submitHandler={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {formValues?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component
                {...item.componentProps}
                size={'small'}
                disabled={
                  item?.componentProps?.name === 'contactList' ? true : false
                }
              >
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={uuidv4()} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default Lookalike;
