import { Box, Button, Typography, ButtonGroup } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useTextEditor } from './useTextEditor';
import { RHFTextField } from '@/components/ReactHookForm';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { TEXT_FORMATE } from '@/constants/strings';

export const TextEditor = (props: any) => {
  const { handleCancel, fontSize, color, handleTextCancel } = props;
  const {
    handleSave,
    applyTextStyle,
    onColorChange,
    onFontSizeChange,
    saveDisable,
  } = useTextEditor(props);
  return (
    <>
      <PageTitledHeader title={'Text'} canMovedBack moveBack={handleCancel} />
      <Typography variant={'h6'}>Title</Typography>
      <Box p={1}>
        <RHFTextField
          name="textTitle"
          variant="outlined"
          placeholder="Untitled"
          size="small"
          required
        />
      </Box>
      <Typography variant={'h6'} mt={2}>
        Text
      </Typography>
      <Box
        display="flex"
        p={1}
        alignItems="center"
        justifyContent={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <ButtonGroup variant="outlined" fullWidth>
          <Button
            variant="outlined"
            onClick={() => applyTextStyle(TEXT_FORMATE?.UPPER_CASE)}
            color="secondary"
          >
            <TextFormatIcon style={{ transform: 'scaleY(-1)' }} />
          </Button>
          <Button
            variant="outlined"
            onClick={() => applyTextStyle(TEXT_FORMATE?.LOWER_CASE)}
            color="secondary"
          >
            <TextFormatIcon />
          </Button>
          <Button
            variant="outlined"
            onClick={() => applyTextStyle(TEXT_FORMATE?.CAPITAL_CASE)}
            color="secondary"
          >
            <TextFormatIcon style={{ transform: 'scale(0.8)' }} />
          </Button>
        </ButtonGroup>
        <Button
          variant="outlined"
          onClick={() => applyTextStyle(TEXT_FORMATE?.BOLD)}
          color="secondary"
        >
          <FormatBoldIcon />
        </Button>
        <Button
          variant="outlined"
          onClick={() => applyTextStyle(TEXT_FORMATE?.ITALIC)}
          color="secondary"
        >
          <FormatItalicIcon />
        </Button>
        <Button
          variant="outlined"
          onClick={() => applyTextStyle(TEXT_FORMATE?.UNDERLINE)}
          color="secondary"
        >
          <FormatUnderlinedIcon />
        </Button>
        <ButtonGroup variant="outlined">
          <Button
            variant="outlined"
            onClick={() => applyTextStyle(TEXT_FORMATE?.UNORDERED_LIST)}
            color="secondary"
          >
            <FormatListBulletedIcon />
          </Button>
          <Button
            variant="outlined"
            onClick={() => applyTextStyle(TEXT_FORMATE?.ORDERED_LIST)}
            color="secondary"
          >
            <FormatListNumberedIcon />
          </Button>
        </ButtonGroup>
        <select
          value={fontSize}
          onChange={onFontSizeChange}
          style={{ padding: 11, borderRadius: 4 }}
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
        <Box p={0.6} borderRadius={1} border={1} display={'flex'} gap={0.5}>
          <FormatColorFillIcon />
          <input type="color" value={color} onChange={onColorChange} />
        </Box>
      </Box>
      <Box
        sx={{
          mt: 35,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => handleTextCancel()}
          color="secondary"
        >
          Reset
        </Button>
        <Button
          variant="contained"
          disabled={saveDisable}
          onClick={() => handleSave()}
        >
          Save
        </Button>
      </Box>
    </>
  );
};
