import { useForm } from 'react-hook-form';
import ConversationModel from '@/components/Model/CoversationModel';
import { FormProvider, RHFSearchableSelect } from '@/components/ReactHookForm';
import { Box, Button, Divider, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { SoftwareAssignCategoryPropsI } from './SoftwareAssignCategory.interface';

function SoftwareAssignCategory({
  title,
  openAssignModal,
  setOpenAssignModal,
  dataArray,
  cancelText,
  okText,
  successMessage,
  setData,
}: SoftwareAssignCategoryPropsI) {
  const methods: any = useForm({});
  const theme: any = useTheme();
  const [disable, setDisable] = useState(true);

  return (
    <>
      <ConversationModel
        selectedItem={title}
        open={openAssignModal}
        handleClose={() => {
          setOpenAssignModal(false);
        }}
      >
        <Box>
          <Box width={{ xs: '18rem', sm: '24rem', lg: '28rem' }} mt={1}>
            <FormProvider methods={methods}>
              {dataArray?.map((item: any) => (
                <Box
                  width={{ xs: '18rem', sm: '24rem', lg: '28rem' }}
                  onClick={() => {
                    setDisable(false);
                  }}
                  key={uuidv4()}
                >
                  <RHFSearchableSelect
                    name="Search or add category"
                    options={item.options}
                    control={methods.control}
                  />
                </Box>
              ))}
            </FormProvider>
          </Box>
          <Divider
            sx={{
              height: '.1rem',
              backgroundColor: theme.palette?.grey[700],
              marginTop: '1.5rem',
            }}
          />
          <Box
            marginTop={'1.5rem'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            gap={'1rem'}
          >
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
