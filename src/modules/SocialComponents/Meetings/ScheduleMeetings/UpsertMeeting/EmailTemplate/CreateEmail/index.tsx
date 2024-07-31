import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box, Button } from '@mui/material';
import { useCreateEmail } from './useCreateEmail';
import PreviewModal from '../PreviewModal';
import { FormProvider, RHFEditor } from '@/components/ReactHookForm';

const CreateEmail = () => {
  const {
    openDialog,
    setOpenDialog,
    value,
    handleChange,
    router,
    theme,
    methods,
  } = useCreateEmail();
  const customModules = {
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link', 'image'],
        ['clean'],
      ],
    },
  };
  return (
    <>
      <FormProvider methods={methods}>
        <PageTitledHeader
          title={`Email Template`}
          canMovedBack
          moveBack={() => router?.back()}
        />
        <Box pb={1.4}>
          <RHFEditor
            name="emailTemplate"
            style={{ height: 600 }}
            toolbar={customModules?.toolbar}
          />
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Button
            sx={{
              color: theme?.palette?.grey[500],
              border: ' 1px solid grey.700',
            }}
            onClick={() => setOpenDialog?.(true)}
          >
            Preview
          </Button>
          <Box display={'flex'} gap={1}>
            <Button
              sx={{
                color: theme?.palette?.grey[500],
                border: ' 1px solid grey.700',
              }}
              onClick={() => router?.back()}
            >
              Cancel
            </Button>
            <Button variant="contained">Save</Button>
          </Box>
        </Box>
        <PreviewModal
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          value={value}
          handleChange={handleChange}
        />
      </FormProvider>
    </>
  );
};

export default CreateEmail;
