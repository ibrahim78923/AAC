import { Box, Checkbox, Typography, useTheme } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { v4 as uuidv4 } from 'uuid';
export const TicketsColumnDrag = (props: any) => {
  const { tableColumns = [], checkboxClick, customizeColumn } = props;
  const theme = useTheme();
  return (
    <>
      {tableColumns?.map((column: any) => (
        <Box
          key={uuidv4()}
          display={'flex'}
          alignItems={'center'}
          flexWrap={'wrap'}
          border={`1px solid ${theme?.palette?.primary?.main}`}
          borderRadius={'.3rem'}
          gap={'.5rem'}
          marginTop={1.5}
          padding={1}
        >
          <DragIndicatorIcon
            style={{ flex: '0.1', textAlign: 'center' }}
            sx={{ color: theme.palette.grey[600] }}
          />
          <Box
            display={'flex'}
            flex={'auto'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography variant="body1" whiteSpace={'nowrap'}>
              {column?.header}
            </Typography>
            <div>
              <Checkbox
                color="primary"
                name={column?.id}
                defaultChecked={customizeColumn[column?.id]}
                onClick={(): any => checkboxClick?.(column)}
              />
            </div>
          </Box>
        </Box>
      ))}
    </>
  );
};
