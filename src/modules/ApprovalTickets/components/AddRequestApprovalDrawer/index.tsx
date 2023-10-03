import CommonDrawer from '@/components/CommonDrawer';
import InputField from '@/components/InputField';
import TextEditor from '@/components/TextEditor';
import { Box, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useAddRequestApprovalDrawer } from './useAddRequestApproval';

const AddRequestApprovalDrawer: React.FC = (props) => {
  const { isDrawerOpen, setIsDrawerOpen }: any = props;
  const {
    handleSubmit,
    onSubmit,
    control,
    errors,
    setEditorValue,
    editorValue,
    theme,
  } = useAddRequestApprovalDrawer();
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        title="Send for Approval"
        okText="Send"
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ height: '9vh' }}>
          <label style={{ marginBottom: '8px', marginTop: '5px' }}>
            To <span style={{ color: 'red' }}>*</span>
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'required field',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => (
              <InputField
                field={{ ...field }}
                name="email"
                placeholder="Enter email"
                width="100%"
                height="23px"
                autoComplete="off"
                type="text"
                hasError={!!errors?.email}
                InputProps={undefined}
              />
            )}
          />

          {errors?.email && (
            <Typography
              variant="body1"
              sx={{ color: theme?.palette?.error?.main }}
            >
              {errors?.root?.message}
            </Typography>
          )}
        </Box>
        <label style={{ marginBottom: '8px', marginTop: '5px' }}>
          Description <span style={{ color: 'red' }}>*</span>
        </label>
        <TextEditor value={editorValue} onChange={setEditorValue} />
      </CommonDrawer>
    </>
  );
};

export default AddRequestApprovalDrawer;
