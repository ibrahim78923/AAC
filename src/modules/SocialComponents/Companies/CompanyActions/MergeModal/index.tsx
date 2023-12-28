import { Box, Grid, Theme, Typography, useTheme } from '@mui/material';

import { AlertModals } from '@/components/AlertModals';

import { MergeCompaniesIcon } from '@/assets/icons';
import { CompanyLogoImage } from '@/assets/images';
import Image from 'next/image';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const MergeModal = ({ isMerge, setIsMerge }: any) => {
  const theme = useTheme<Theme>();
  const methods = useForm();

  const optionsArray = [
    { value: 'All Industries', label: 'All Industries' },
    { value: 'Computer Software', label: 'Computer Software' },
    { value: 'Construction', label: 'Construction' },
    { value: 'Electronics', label: 'Electronics' },
  ];

  return (
    <AlertModals
      typeImage={<MergeCompaniesIcon />}
      message={
        <Box>
          <Grid container>
            <Grid item lg={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Image
                  src={CompanyLogoImage}
                  alt="logo"
                  width={40}
                  height={40}
                />
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 500,
                      color: `${theme?.palette?.blue?.dull_blue}`,
                    }}
                  >
                    Share my dine
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 400,
                      color: `${theme?.palette?.custom?.light}`,
                    }}
                  >
                    smd.com
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={6}>
              <FormProvider methods={methods}>
                <RHFSelect name="mergeCompanies" select={true} size="small">
                  {optionsArray?.map((item: any) => (
                    <option key={uuidv4()} value={item?.value}>
                      {item?.label}
                    </option>
                  ))}
                </RHFSelect>
              </FormProvider>
            </Grid>
          </Grid>
        </Box>
      }
      type="Merge Companies"
      open={isMerge}
      cancelBtnText="Cancel"
      submitBtnText="Merge"
      handleClose={() => setIsMerge(false)}
      handleSubmit={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default MergeModal;
