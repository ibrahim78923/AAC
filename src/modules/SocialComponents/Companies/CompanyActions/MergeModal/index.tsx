import { Box, Grid, Typography } from '@mui/material';

import { AlertModals } from '@/components/AlertModals';

import { MergeCompaniesIcon } from '@/assets/icons';
import { CompanyLogoImage } from '@/assets/images';
import Image from 'next/image';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';

import useMergeModal from './useMergeModal';
import useCompanies from '../../useCompanies';
import { useMergeCompaniesMutation } from '@/services/commonFeatures/companies';

const MergeModal = ({ isMerge, setIsMerge, checkedRows }: any) => {
  const { theme, companyDetails, methods, seletedCompany } =
    useMergeModal(checkedRows);
  const { getAllCompanies } = useCompanies();
  const companiesDropdown = getAllCompanies?.data?.companies;
  const [mergeCompanies] = useMergeCompaniesMutation();

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
                    {companyDetails?.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 400,
                      color: `${theme?.palette?.custom?.light}`,
                    }}
                  >
                    {companyDetails?.domain}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={6}>
              <FormProvider methods={methods}>
                <RHFSelect name="mergeCompanies" select={true} size="small">
                  {companiesDropdown?.map((item: any) => (
                    <option key={uuidv4()} value={item?._id}>
                      {item?.name}
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
      handleClose={() => setIsMerge({ ...isMerge, mergeModal: false })}
      handleSubmitBtn={() => {
        mergeCompanies({
          primaryCompany: companyDetails?._id,
          secondaryCompany: seletedCompany,
        });
      }}
    />
  );
};

export default MergeModal;
