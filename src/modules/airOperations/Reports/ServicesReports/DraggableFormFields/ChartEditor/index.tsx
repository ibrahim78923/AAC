import { PageTitledHeader } from '@/components/PageTitledHeader';
import { RHFTextField } from '@/components/ReactHookForm';
import { Box, Button, Typography } from '@mui/material';
import { useChartEditor } from './useChartEditor';

export const ChartEditor = (props: any) => {
  const { handleCancel, handleChartCancel } = props;
  const { handleSave } = useChartEditor(props);
  return (
    <>
      <PageTitledHeader title={'Chart'} canMovedBack moveBack={handleCancel} />
      <Typography variant={'h6'}>Title</Typography>
      <Box p={1}>
        <RHFTextField
          name="chartTitle"
          variant="outlined"
          placeholder="Untitled"
          size="small"
          required
        />
      </Box>
      <Typography variant={'h6'}>Metric</Typography>

      <Box
        sx={{
          mt: 50,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => handleChartCancel()}
          color="secondary"
        >
          Reset
        </Button>
        <Button variant="contained" onClick={() => handleSave()}>
          Save
        </Button>
      </Box>
    </>
  );
};
