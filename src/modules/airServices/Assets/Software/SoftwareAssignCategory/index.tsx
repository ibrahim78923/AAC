import { useForm } from 'react-hook-form';
import ConversationModel from '@/components/Model/CoversationModel';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Divider, Grid, MenuItem, Select } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { dataArray } from './SoftwareAssignCategory.data';
import { style } from './SoftwareAssignCategory.style';
import { v4 as uuidv4 } from 'uuid';

function SoftwareAssignCategory({ openAssignModal, setOpenAssignModal }: any) {
  const methods: any = useForm({});
  return (
    <>
      <ConversationModel
        selectedItem={'Assign Category'}
        open={openAssignModal}
        handleClose={() => {
          setOpenAssignModal(false);
        }}
      >
        <Box>
          <Box mt={1} sx={style.dropdownBox}>
            <FormProvider methods={methods}>
              <Grid container spacing={4} sx={{}}>
                {dataArray?.map((item: any) => (
                  <Grid item key={uuidv4()}>
                    <Select sx={style.dropdownItems} size={'small'}>
                      {item?.options?.map((option: any) => (
                        <MenuItem key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
          </Box>
          <Divider sx={style.divider} />
          <Box sx={style.buttonBox}>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenAssignModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                enqueueSnackbar('Assign successfully', {
                  variant: 'success',
                  autoHideDuration: 2000,
                });
                setOpenAssignModal(false);
              }}
            >
              Assign
            </Button>
          </Box>
        </Box>
      </ConversationModel>
    </>
  );
}

export default SoftwareAssignCategory;
