import {
  Box,
  FormLabel,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import CommonTabs from '@/components/Tabs';
import useForecast from '../useForecast';
import BasicInfo from './BasicInfo';
import { CodeTagIcon } from '@/assets/icons';
import FieldType from './FieldType';
import ConditionalOptions from './ConditionalOptions';
import Used from './Used';

const EditForecast = ({ isOpenDrawer, onClose }: any) => {
  const theme: any = useTheme();
  const { setActiveTab } = useForecast();

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Edit Property'}
      isOk
      footer={false}
    >
      <Typography
        variant="body2"
        color={theme?.palette?.grey[900]}
        bgcolor={theme?.palette?.custom?.light_cream}
        border={`1px solid ${theme?.palette?.warning?.main}`}
        p={1}
        borderRadius={'8px'}
      >
        This property is provided by Air Apple Cart, and only some of the
        options can be modified.
      </Typography>

      <Box display={'flex'} alignItems={'end'} justifyContent={'space-between'}>
        <Box width={'90%'}>
          <FormLabel>
            <Typography variant="body2" fontWeight={'500'} mt={2}>
              Label{' '}
              <span style={{ color: theme?.palette?.error?.main }}>*</span>
            </Typography>
          </FormLabel>
          <TextField
            fullWidth
            id="fullWidth"
            sx={{ '& input': { height: '12px' } }}
          />
        </Box>
        <Tooltip
          title={
            <Typography variant="body4">
              If you are using this property for an integration, you can access
              its internal name here.
            </Typography>
          }
          placement="top-start"
          arrow
          sx={{ ml: 1 }}
        >
          <Box sx={{ width: 'fit-content', cursor: 'pointer' }}>
            <CodeTagIcon />
          </Box>
        </Tooltip>
      </Box>

      <Box sx={{ width: '100%' }}>
        <CommonTabs
          getTabVal={(val: any) => setActiveTab(val)}
          tabsArray={[
            'Basic Info',
            'Field Type',
            'Conditional Options',
            'Used in (1)',
          ]}
        >
          <BasicInfo />
          <FieldType />
          <ConditionalOptions />
          <Used />
        </CommonTabs>
      </Box>
    </CommonDrawer>
  );
};
export default EditForecast;
