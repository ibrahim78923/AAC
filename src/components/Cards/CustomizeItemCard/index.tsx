import { CheckboxField } from '@/components/InputFields/CheckboxField';
import { DragIndicator } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { CustomizeItemCardPropsI } from '../Cards.interface';

export const CustomizeItemCard = (props: CustomizeItemCardPropsI) => {
  const { name, onChange, checked, id } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        border: `1px solid `,
        borderColor: 'primary.main',
        borderRadius: 2,
        gap: 1,
        marginTop: 1.5,
        padding: 1,
      }}
    >
      <Box
        sx={{
          color: 'grey.600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DragIndicator sx={{ color: 'grey.600' }} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 'auto',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="body1"
          color="slateBlue.main"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </Typography>
        <Box>
          <CheckboxField name={id} checked={checked} onChange={onChange} />
        </Box>
      </Box>
    </Box>
  );
};
