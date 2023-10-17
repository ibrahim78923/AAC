import CommonDrawer from '@/components/CommonDrawer';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createTicketDefaultValues,
  createTicketValidationSchema,
  existingData,
} from './AssosiationsDrawerForm/AssociationsDrawer.data';
import TasksForm from './AssosiationsDrawerForm';
import Search from '@/components/Search';
import { uuid } from 'uuidv4';

export const AssociationsDrawer = ({ openDrawer, setOpenDrawer }: any) => {
  const theme = useTheme();
  const methodsCreateNewTicketForm = useForm({
    resolver: yupResolver(createTicketValidationSchema),
    defaultValues: createTicketDefaultValues,
  });
  const submitCreateNewTicket = async () => {};
  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => setOpenDrawer(false)}
      isOk
      okText="Create"
      title="Create and Link a new Incident to this asset"
      footer
      submitHandler={() => {
        methodsCreateNewTicketForm.handleSubmit(submitCreateNewTicket)();
      }}
    >
      <Box>
        <RadioGroup
          sx={{ '&.MuiFormGroup-root': { flexDirection: 'row', gap: 3 } }}
          defaultValue="New Incident"
        >
          <FormControlLabel
            value="New Incident"
            control={<Radio />}
            label="New Incident"
          />
          <FormControlLabel
            value="Existing Incident"
            control={<Radio />}
            label="Existing Incident"
          />
        </RadioGroup>
      </Box>
      <TasksForm
        submitCreateNewTicket={submitCreateNewTicket}
        methods={methodsCreateNewTicketForm}
        handleSubmit={methodsCreateNewTicketForm.handleSubmit}
      />
      <Box mt={1}>
        <div style={{ marginBottom: '1rem' }}>
          <Search sx={{ width: '100%' }} />
        </div>
        {existingData?.map((item) => (
          <Grid
            container
            xs={12}
            key={uuid()}
            sx={{
              border: `1px solid ${theme.palette.primary.lighter}`,
              justifyContent: 'space-between',
              alignItems: 'center',
              p: '20px',
              borderRadius: '12px',
              mt: 1,
            }}
          >
            <FormControlLabel
              value="#NIC-5 checking"
              control={<Checkbox />}
              label={item?.tital}
            />
            <Box
              sx={{
                color:
                  item?.status === 'Open'
                    ? theme.palette.success.main
                    : theme.palette.common.white,
                bgcolor:
                  item?.status === 'Open'
                    ? '#47B26333'
                    : theme.palette.warning.main,
                width: 'fit-content',
                p: '4px 12px',
                borderRadius: '16px',
              }}
            >
              {item?.status}
            </Box>
          </Grid>
        ))}
      </Box>
    </CommonDrawer>
  );
};
