import { Grid, Box } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { dataArray } from './FilterQuotes.data';
import { useLazyGetUsersDropdownListQuery } from '@/services/airOperations/data-management/export';
import { FilterQuotesI } from '../Quotes.interface';

const FilterQuotes = ({
  open,
  onClose,
  methods,
  onFilterSubmit,
}: FilterQuotesI) => {
  const getDropdownAllUsers = useLazyGetUsersDropdownListQuery();
  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title={'Filters'}
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={onFilterSubmit}
    >
      <Box sx={{ pt: '24px' }}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {dataArray(getDropdownAllUsers)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.name}>
                <item.component {...item?.componentProps} size={'small'}>
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

export default FilterQuotes;
