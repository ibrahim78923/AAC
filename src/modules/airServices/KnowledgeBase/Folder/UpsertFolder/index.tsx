import { FormProvider } from '@/components/ReactHookForm';
import { Box, TextField } from '@mui/material';
import { upsertFolderDataArray } from './UpsertFolder.data';
import { v4 as uuidv4 } from 'uuid';
import ConversationModel from '@/components/Model/CoversationModel';

export const UpsertFolder = ({ methods }: any) => {
  return (
    <ConversationModel
      open={true}
      selectedItem={'Create Folder'}
      okText={'Create'}
    >
      <>
        <Box mt={1}>
          <FormProvider methods={methods} key={uuidv4()}>
            {upsertFolderDataArray?.map((item: any) => (
              <>
                <label>{item.label}</label>
                <TextField {...item?.componentProps} size="small">
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </TextField>
              </>
            ))}
          </FormProvider>
        </Box>
      </>
    </ConversationModel>
  );
};
