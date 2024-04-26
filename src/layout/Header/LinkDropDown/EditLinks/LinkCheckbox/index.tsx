import { Box, Checkbox, FormControlLabel, ListItemText } from '@mui/material';

const LinkCheckbox = ({ label, name, quickLinkIds, onChange }: any) => {
  return (
    <FormControlLabel
      checked={quickLinkIds.includes(name)}
      onChange={() => onChange(name)}
      name={name}
      control={<Checkbox />}
      label={
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <ListItemText
            primary={label}
            primaryTypographyProps={{ variant: 'body2' }}
            sx={{ color: (theme) => theme?.palette?.grey[600] }}
          />
        </Box>
      }
    />
  );
};

export default LinkCheckbox;
