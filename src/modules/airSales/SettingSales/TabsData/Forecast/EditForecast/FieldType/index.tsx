import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { HeaderInfoIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';

const OptionRow = ({
  index,
  option,
  handleChange,
  handleDelete,
  handleCheck,
}: any) => (
  <Grid container spacing={2} alignItems="center" mb={1.5}>
    <Grid item xs={1} sx={{ paddingLeft: '5px !important' }}>
      <DragIndicatorIcon />
    </Grid>
    <Grid item xs={1} sx={{ paddingLeft: '5px !important' }}>
      <Checkbox
        checked={option?.checked || false}
        onChange={(e) => handleCheck(index, e?.target?.checked)}
      />
    </Grid>
    <Grid item xs={4}>
      <TextField
        value={option?.label}
        onChange={(e) => handleChange(index, 'label', e?.target?.value)}
        fullWidth
        sx={{ '& input': { height: '12px' } }}
      />
    </Grid>
    <Grid item xs={4}>
      <TextField
        value={option?.internationalValue}
        onChange={(e) =>
          handleChange(index, 'internationalValue', e?.target?.value)
        }
        fullWidth
        sx={{ '& input': { height: '12px' } }}
      />
    </Grid>
    <Grid item xs={1}>
      <Typography variant="body2">{option?.withValue}</Typography>
    </Grid>
    <Grid item xs={1}>
      <IconButton onClick={() => handleDelete(index)}>
        <DeleteIcon />
      </IconButton>
    </Grid>
  </Grid>
);

const FieldType = () => {
  const theme: any = useTheme();

  const [options, setOptions] = useState([
    { label: 'Not forecasted', internationalValue: 'OMIT', withValue: '0' },
    { label: 'Custom', internationalValue: 'Custom', withValue: '2' },
    { label: 'Custom', internationalValue: 'Custom', withValue: '4' },
    { label: 'Custom', internationalValue: 'Custom', withValue: '5' },
    { label: 'Custom', internationalValue: 'Custom', withValue: '6' },
  ]);

  const handleAddOption = () => {
    setOptions([
      ...options,
      { label: 'Custom', internationalValue: 'Custom', withValue: '' },
    ]);
  };

  const handleChange = (index: any, field: any, value: any) => {
    const newOptions = options?.map((option, i) =>
      i === index ? { ...option, [field]: value } : option,
    );
    setOptions(newOptions);
  };

  const handleDelete = (index: any) => {
    setOptions(options?.filter((_, i) => i !== index));
  };

  const handleCheck = (index: any, checked: any) => {
    const newOptions = options?.map((option, i) =>
      i === index ? { ...option, checked } : option,
    );
    setOptions(newOptions);
  };

  return (
    <Box>
      <FormLabel>
        <Typography variant="body2" fontWeight={'500'} mt={2}>
          Field Type{' '}
        </Typography>
      </FormLabel>
      <TextField
        variant="outlined"
        fullWidth
        sx={{ '& input': { height: '12px', borderRadius: '10px' } }}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormLabel>
            <Typography variant="body2" fontWeight={'500'} mt={2}>
              Sort
            </Typography>
          </FormLabel>
          <TextField
            variant="outlined"
            fullWidth
            sx={{ '& input': { height: '12px', borderRadius: '10px' } }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormLabel>
            <Typography variant="body2" fontWeight={'500'} mt={2}>
              Search{' '}
            </Typography>
          </FormLabel>
          <TextField
            variant="outlined"
            fullWidth
            sx={{ '& input': { height: '12px', borderRadius: '10px' } }}
          />
        </Grid>
      </Grid>

      <Box
        p={2}
        mt={2}
        sx={{
          border: `1px solid ${theme?.palette?.custom?.hawkes_blue}`,
          borderRadius: '8px',
          boxShadow: `0px 3px 6px 0px ${theme?.palette?.grey[1000]}`,
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          mb={1.5}
          pb={2}
          sx={{
            borderBottom: `1px solid ${theme?.palette?.custom?.hawkes_blue}`,
          }}
        >
          <Grid item xs={4}>
            <Typography variant="body2" fontWeight={'500'}>
              Label
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant="body2"
              fontWeight={'500'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-around'}
            >
              International value <HeaderInfoIcon />
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2" fontWeight={'500'}>
              With Value
            </Typography>
          </Grid>
        </Grid>

        {options?.map((option, index) => (
          <OptionRow
            key={uuidv4()}
            index={index}
            option={option}
            handleChange={handleChange}
            handleDelete={handleDelete}
            handleCheck={handleCheck}
          />
        ))}

        <Box
          pt={1}
          sx={{ borderTop: `1px solid ${theme?.palette?.custom?.hawkes_blue}` }}
        >
          <Button
            startIcon={<AddCircleIcon />}
            onClick={handleAddOption}
            sx={{ color: theme?.palette?.slateBlue?.main }}
            disableRipple
          >
            Add an Option
          </Button>

          <Button
            startIcon={<MenuIcon />}
            sx={{ color: theme?.palette?.slateBlue?.main }}
            disableRipple
          >
            Load Options
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default FieldType;
