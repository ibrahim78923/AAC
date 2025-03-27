import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { ROLES } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useLazyGetServicesKnowledgeBaseUsersDropdownListForAuthorsQuery } from '@/services/airServices/knowledge-base/articles';
import { Box, Typography } from '@mui/material';

export const AuthorsFields = () => {
  const apiQueryAuthor =
    useLazyGetServicesKnowledgeBaseUsersDropdownListForAuthorsQuery();

  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};

  return (
    <RHFAutocompleteAsync
      name="authorId"
      label="Author"
      placeholder="Select an author"
      size="small"
      fullWidth
      externalParams={{ admin: true, productId }}
      apiQuery={apiQueryAuthor}
      getOptionLabel={(option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`
      }
      renderOption={(option: any) => (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Box>
            <Typography
              variant={'body2'}
              color={'grey.600'}
              fontWeight={'fontWeightSmall'}
            >
              {option?.firstName} {option?.lastName}
            </Typography>
            {option?.role !== ROLES?.ORG_REQUESTER && (
              <Typography variant={'body4'} color={'grey.900'}>
                {option?.timezone}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    />
  );
};

export default AuthorsFields;
