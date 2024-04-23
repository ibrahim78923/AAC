import { InfoCircleGreenIcon } from '@/assets/icons';
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Typography,
  useTheme,
} from '@mui/material';
import { style } from './SecondStep.style';
import { importDataField } from '../ImportModal.data';

const SecondStep = (props: any) => {
  const { handlePreview, requiredColumns = [] } = props;
  const { palette } = useTheme();
  return (
    <>
      <Typography fontWeight={600} color="custom.main" pt={1.6}>
        Uploaded file must have these columns
      </Typography>
      <List>
        {requiredColumns?.map?.((columnName: string) => (
          <ListItem key={columnName} sx={style?.listItem(palette)}>
            {columnName}
          </ListItem>
        ))}
      </List>
      <Box my={2.4}>
        <Grid container>
          {importDataField?.map(
            (item: any) =>
              item?.tag === 'import' && (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} />
                </Grid>
              ),
          )}
        </Grid>
      </Box>
      <Button
        variant="text"
        sx={{ fontWeight: 500 }}
        startIcon={<InfoCircleGreenIcon />}
        onClick={handlePreview}
      >
        Click here to preview Sample File.
      </Button>
    </>
  );
};

export default SecondStep;
