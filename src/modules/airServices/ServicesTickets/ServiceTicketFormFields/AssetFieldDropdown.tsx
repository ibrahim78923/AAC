import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { AIR_SERVICES, DATE_FORMAT } from '@/constants';
import { useLazyGetAssociateAssetsDropdownForTicketsQuery } from '@/services/airServices/tickets';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { AddCircle } from '@mui/icons-material';
import useAuth from '@/hooks/useAuth';
import { ARRAY_INDEX } from '@/constants/strings';

export const AssetFieldDropdown = (props: any) => {
  const { required = false } = props;
  const router = useRouter();
  const apiQueryAssociateAsset =
    useLazyGetAssociateAssetsDropdownForTicketsQuery();
  const auth: any = useAuth();
  const { _id: companyId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company;

  return (
    <RHFAutocompleteAsync
      name="associatesAssets"
      label="Associate Assets"
      placeholder="Choose Asset"
      fullWidth
      required={required}
      multiple
      size="small"
      apiQuery={apiQueryAssociateAsset}
      EndIcon={AddCircle}
      externalParams={{ companyId }}
      endIconSx={{ color: 'primary.main' }}
      endIconClick={() => {
        router?.push(AIR_SERVICES?.UPSERT_INVENTORY);
      }}
      renderOption={(option: any) => (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Box>
            <Typography variant={'body2'} color={'grey.600'} fontWeight={500}>
              {option?.displayName}
            </Typography>
            <Typography variant={'body4'} color={'grey.900'}>
              {option?.assetType}
            </Typography>
          </Box>
          <Typography variant={'body4'} color={'grey.900'}>
            EOL:{' '}
            {!!option?.assetLifeExpiry
              ? dayjs(option?.assetLifeExpiry)?.format(DATE_FORMAT?.UI)
              : '---'}
          </Typography>
        </Box>
      )}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        option?.displayName
      }
    />
  );
};
