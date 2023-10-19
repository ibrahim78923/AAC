import { useForm } from 'react-hook-form';
import ConversationModel from '@/components/Model/CoversationModel';
import { FormProvider, RHFSearchableSelect } from '@/components/ReactHookForm';
import { Box, Button, Divider, Grid } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { style } from './SoftwareAssignCategory.style';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

function SoftwareAssignCategory({
  openAssignModal,
  setOpenAssignModal,
  dataArray,
  cancelText,
  okText,
  successMessage,
  setData,
}: any) {
  const methods: any = useForm({});
  const [disable, setDisable] = useState(true);

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
                    <Box
                      sx={style.searchField}
                      onClick={() => {
                        setDisable(false);
                      }}
                    >
                      <RHFSearchableSelect
                        name="Search or add category"
                        options={item.options}
                        control={methods.control}
                      />
                    </Box>
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
                setDisable(true);
              }}
            >
              {cancelText}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                enqueueSnackbar(successMessage, {
                  variant: 'success',
                  autoHideDuration: 2000,
                });
                setOpenAssignModal(false);
                setData(true);
              }}
              disabled={disable}
            >
              {okText}
            </Button>
          </Box>
        </Box>
      </ConversationModel>
    </>
  );
}

export default SoftwareAssignCategory;
