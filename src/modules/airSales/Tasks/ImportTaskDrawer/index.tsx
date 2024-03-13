import { Typography, Box } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import ImportMapColumnsDeal from './ImportColumns';

import { styles } from './ImportTaskDrawer.style';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import useImportTask from './useImportTask';

const ImportTaskDrawer = ({ open, onClose }: any) => {
  const {
    handleSubmit,
    isColumnsSelect,
    theme,
    okTitle,
    stepOneSubmit,
    StepOneHandleSubmit,
    stepOneMethods,
  } = useImportTask();
  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      submitHandler={handleSubmit}
      footer
      isOk
      okText={okTitle}
      title="Import Tasks"
      cancelText="Back"
    >
      <Typography variant="h6" sx={styles?.Typograpghy(theme)}>
        Step {isColumnsSelect ? '2' : '1'} of 2
      </Typography>
      <Typography sx={styles?.selectColTypography(theme)}>
        {isColumnsSelect
          ? 'Map Columns from your file to the right CRM fields. Your 5 unmapped columns won’t be imported'
          : 'Uploaded file must have these columns'}
      </Typography>

      {!isColumnsSelect ? (
        <Box sx={{ mt: '10px' }}>
          <ul
            style={{
              paddingLeft: '30px',
              color: theme?.palette?.grey[900],
            }}
          >
            <li>Name</li>
            <li>Task Value</li>
          </ul>
          <Typography
            variant="h6"
            sx={{ color: theme?.palette?.grey[600], my: '10px' }}
          >
            Import Task
          </Typography>
          <FormProvider
            methods={stepOneMethods}
            onSubmit={StepOneHandleSubmit(stepOneSubmit)}
          >
            <RHFDropZone name={'multipleFileDropZone'} />
          </FormProvider>
        </Box>
      ) : (
        <ImportMapColumnsDeal />
      )}
    </CommonDrawer>
  );
};

export default ImportTaskDrawer;
