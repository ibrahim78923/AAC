import { Box, ButtonGroup, Button, Typography } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { RHFTextField } from '@/components/ReactHookForm';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const TextEditor = (props: any) => {
  const { handleCancel, setColor, setFontSize, applyFormat, fontSize, color } =
    props;

  return (
    <>
      <PageTitledHeader title={'Text'} canMovedBack moveBack={handleCancel} />
      <Typography variant={'h6'}>Title</Typography>
      <Box p={1}>
        <RHFTextField
          name="title"
          variant="outlined"
          placeholder="Untitled"
          fullWidth
        />
      </Box>
      <Typography variant={'h6'}>Position</Typography>
      <Box p={1}>
        <ButtonGroup variant="outlined" fullWidth>
          <Button onClick={() => applyFormat('top')} color="secondary">
            <VerticalAlignTopIcon />
          </Button>
          <Button onClick={() => applyFormat('middle')} color="secondary">
            <VerticalAlignCenterIcon />
          </Button>
          <Button onClick={() => applyFormat('bottom')} color="secondary">
            <VerticalAlignBottomIcon />
          </Button>
        </ButtonGroup>
      </Box>
      <Typography variant={'h6'}>Text</Typography>
      <Box display="flex" p={1} alignItems="center" flexWrap={'wrap'} gap={2}>
        <ButtonGroup variant="outlined">
          <Button onClick={() => applyFormat('bold')} color="secondary">
            <FormatBoldIcon />
          </Button>
          <Button onClick={() => applyFormat('italic')} color="secondary">
            <FormatItalicIcon />
          </Button>
          <Button onClick={() => applyFormat('underline')} color="secondary">
            <FormatUnderlinedIcon />
          </Button>
        </ButtonGroup>
        <Box p={0.4} borderRadius={1} border={1} display={'flex'} gap={0.5}>
          <FormatColorFillIcon />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </Box>
        <ButtonGroup variant="outlined">
          <Button onClick={() => applyFormat('upper')} color="secondary">
            <TextFormatIcon style={{ transform: 'scaleY(-1)' }} />
          </Button>
          <Button onClick={() => applyFormat('lower')} color="secondary">
            <TextFormatIcon />
          </Button>
          <Button onClick={() => applyFormat('capital')} color="secondary">
            <TextFormatIcon style={{ transform: 'scale(0.8)' }} />
          </Button>
        </ButtonGroup>

        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          style={{ padding: 11, borderColor: 'secondary', borderRadius: 4 }}
        >
          <option value="10px">10</option>
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="20px">20</option>
          <option value="22px">22</option>
          <option value="24px">24</option>
        </select>
        <ButtonGroup variant="outlined" fullWidth>
          <Button onClick={() => applyFormat('left')} color="secondary">
            <FormatAlignLeftIcon />
          </Button>
          <Button onClick={() => applyFormat('center')} color="secondary">
            <FormatAlignCenterIcon />
          </Button>
          <Button onClick={() => applyFormat('right')} color="secondary">
            <FormatAlignRightIcon />
          </Button>
        </ButtonGroup>
      </Box>
      <Box display={'flex'} gap={1} justifyContent={'flex-end'} mt={10}>
        <Button variant="outlined" onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleCancel}>
          Save
        </Button>
      </Box>
    </>
  );
};
