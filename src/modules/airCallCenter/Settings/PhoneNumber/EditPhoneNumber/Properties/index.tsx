import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Grid, MenuItem, Select } from '@mui/material';
import { propertiesArray } from './Properties.data';
import { v4 as uuidv4 } from 'uuid';
import useEditPhoneNumber from '../useEditPhoneNumber';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Properties = () => {
  const { methods, maskValue, callerIds } = useEditPhoneNumber();
  return (
    <FormProvider methods={methods}>
      <Grid container spacing={0.5}>
        {propertiesArray?.map((item: any) => (
          <Grid item xs={12} md={item?.md} key={uuidv4()}>
            <item.component {...item.componentProps} size={'small'}>
              {item?.componentProps?.select &&
                item?.options?.map((option: any) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
            </item.component>
            <Box mt={1}>
              {item?.componentProps?.name === 'maskNumber' && maskValue && (
                <Select
                  fullWidth
                  size="small"
                  placeholder="select"
                  value="jjciodeo"
                >
                  {callerIds?.map((item: any) => (
                    <MenuItem value={item?.value} key={uuidv4()}>
                      {item?.label}
                    </MenuItem>
                  ))}
                  <MenuItem value="option3">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<AddCircleIcon sx={{ width: '20px' }} />}
                      className="small"
                    >
                      Custom Button
                    </Button>
                  </MenuItem>
                </Select>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </FormProvider>
  );
};

export default Properties;
