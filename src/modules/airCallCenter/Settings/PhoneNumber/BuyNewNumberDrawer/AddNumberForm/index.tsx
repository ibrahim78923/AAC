import { FormProvider } from '@/components/ReactHookForm';
import useBuyNewNumber from '../useBuyNewNumber';
import { Box, Button, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { newNumberArray, numberDetails } from '../BuyNewNumber.data';
import usePhoneNumber from '../../usePhoneNumber';
import { style } from '../BuyNewNumber.style';

const AddNumberForm = ({ isNumberDetail, handleNextDetail }: any) => {
  const { theme } = usePhoneNumber();
  const { methods } = useBuyNewNumber();
  return (
    <FormProvider methods={methods}>
      <Grid container spacing={2}>
        {newNumberArray?.map((item: any) => (
          <>
            {item?.isNumberDatils?.includes(isNumberDetail) && (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                {item?.componentProps?.name === 'formType' && (
                  <Typography variant="body2" component="span">
                    Toll-Free
                  </Typography>
                )}
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            )}
          </>
        ))}
      </Grid>
      {!isNumberDetail && (
        <Box>
          {numberDetails?.map((item: any) => (
            <Box sx={style?.detailBoxWrapper(theme?.palette)} key={uuidv4()}>
              <Box display="flex" gap={2} alignItems="center">
                <Box>
                  <Typography
                    variant="body3"
                    color={theme?.palette?.blue?.dull_blue}
                    fontWeight={500}
                  >
                    {item?.no}
                  </Typography>
                  <Typography
                    variant="body3"
                    color={theme?.palette?.custom?.light}
                    fontWeight={500}
                    component="p"
                  >
                    {item?.state}
                  </Typography>
                </Box>
                <Typography
                  variant="body3"
                  color={theme?.palette?.blue?.dull_blue}
                  fontWeight={500}
                >
                  {item?.ammount}
                </Typography>
              </Box>
              <Button
                variant="contained"
                className="small nextBtn"
                onClick={handleNextDetail}
              >
                Next
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </FormProvider>
  );
};

export default AddNumberForm;
