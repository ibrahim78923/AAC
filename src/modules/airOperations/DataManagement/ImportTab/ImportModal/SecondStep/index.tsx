import { InfoCircleGreenIcon } from '@/assets/icons';
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  useTheme,
} from '@mui/material';
import { style } from './SecondStep.style';
import { importDataField } from '../ImportModal.data';
import { FIELD_TYPES } from '@/constants/strings';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

const SecondStep = (props: any) => {
  const { handlePreview, requiredColumns = [], productOptions } = props;
  const { palette } = useTheme();
  return (
    <>
      <Typography fontWeight={600} color="custom.main" pt={1.6}>
        Uploaded file must have these columns
      </Typography>
      <List>
        {requiredColumns?.map?.(
          (columnName: any) =>
            columnName?.groupBy == FIELD_TYPES?.MANDATORY_FIELD && (
              <ListItem key={columnName?._id} sx={style?.listItem(palette)}>
                {columnName?.label}
              </ListItem>
            ),
        )}
      </List>
      <Box my={2.4}>
        <ContainerGrid>
          {importDataField(productOptions)?.map(
            (item: any) =>
              item?.tag === 'import' && (
                <CustomGrid key={item?.id}>
                  <item.component {...item?.componentProps} />
                </CustomGrid>
              ),
          )}
        </ContainerGrid>
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
