import { InfoCircleGreenIcon } from '@/assets/icons';
import { RHFFileImport } from '@/components/ReactHookForm';
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  useTheme,
} from '@mui/material';
import { style } from './SecondStep.style';

const SecondStep = ({ requiredColumns = [] }: any) => {
  const { palette } = useTheme();
  return (
    <>
      <Typography fontWeight={600} color="custom.main" pt={1.6}>
        Select Product and Object you’d like to Import
      </Typography>
      <List>
        {requiredColumns?.map?.((columnName: string) => (
          <ListItem key={columnName} sx={style?.listItem(palette)}>
            {columnName}
          </ListItem>
        ))}
      </List>
      <Box my={2.4}>
        <Typography fontWeight={500} color="grey.600" pb={1.2}>
          Import Deals
        </Typography>
        <RHFFileImport name="importDeals" label="Import Deals" />
      </Box>
      <Button
        variant="text"
        sx={{ fontWeight: 500 }}
        startIcon={<InfoCircleGreenIcon />}
      >
        Click here to preview Sample File.
      </Button>
    </>
  );
};

export default SecondStep;
