import { Box, Typography } from '@mui/material';

import { AlertModals } from '@/components/AlertModals';

import { MergeCompaniesIcon } from '@/assets/icons';
import { CompanyLogoImage } from '@/assets/images';
import Image from 'next/image';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';

import useMergeModal from './useMergeModal';
import useCompanies from '../../useCompanies';
import { useMergeCompaniesMutation } from '@/services/commonFeatures/companies';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

interface CompaniesDropdownI {
  _id: number;
  name: string;
  domain: string;
}

const MergeModal = ({
  isMerge,
  setIsMerge,
  checkedRows,
  setCheckedRows,
}: any) => {
  const { theme, companyDetails, methods, seletedCompany } =
    useMergeModal(checkedRows);
  const { getAllCompanies } = useCompanies();
  const companiesDropdown = getAllCompanies?.data?.companies;
  const [mergeCompanies] = useMergeCompaniesMutation();

  return (
    <AlertModals
      typeImage={<MergeCompaniesIcon />}
      message={
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row', lg: 'row' },
            gap: '16px',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image src={CompanyLogoImage} alt="logo" width={40} height={40} />
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

          <Box sx={{ width: { xs: '100%', md: '70%', lg: '70%' } }}>
            <FormProvider methods={methods}>
              <RHFSelect name="mergeCompanies" select={true} size="small">
                {companiesDropdown?.map((item: CompaniesDropdownI) => (
                  <option key={uuidv4()} value={item?._id}>
                    {item?.name ?? item?.domain}
                  </option>
                ))}
              </RHFSelect>
            </FormProvider>
          </Box>
        </Box>
      }
      type="Merge Companies"
      open={isMerge}
      cancelBtnText="Cancel"
      submitBtnText="Merge"
      handleClose={() => setIsMerge({ ...isMerge, mergeModal: false })}
      handleSubmitBtn={() => {
        if (seletedCompany != null) {
          mergeCompanies({
            body: {
              primaryCompany: companyDetails?._id,
              secondaryCompany: seletedCompany,
            },
          });
          setIsMerge({ mergeModal: false });
          setCheckedRows([]);
          successSnackbar(`Record has been Merged`);
        } else {
          errorSnackbar(`Please select a company`);
        }
      }}
    />
  );
};

export default MergeModal;
