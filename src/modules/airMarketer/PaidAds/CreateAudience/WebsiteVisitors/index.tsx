import { FormProvider } from '@/components/ReactHookForm';
import { Grid, Box } from '@mui/material';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import CommonDrawer from '@/components/CommonDrawer';
import {
  defaultValues,
  validationSchema,
  websiteVIisitorsData,
} from './WebsiteVisitors.data';
import { BackArrIcon } from '@/assets/icons';

const WebsiteVisitors = ({
  open,
  onClose,
  initialValueProps = defaultValues,
}: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title="Website Visitors"
      okText={'Create Audiance'}
      submitHandler={() => {}}
      cancelText={'cancel'}
      footer
      headerIcon={
        <Box onClick={onClose} sx={{ cursor: 'pointer' }}>
          <BackArrIcon />
        </Box>
      }
      footerActionText=""
      onFooterActionSubmit={() => {}}
      isOk
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {websiteVIisitorsData?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default WebsiteVisitors;
