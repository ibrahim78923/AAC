import {
  Box,
  Button,
  ButtonGroup,
  Container,
  InputAdornment,
  Toolbar,
} from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useTextEditor } from './useTextEditor';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { TEXT_FORMATE } from '@/constants/strings';
import { TextEditorI } from './TextEditor.interface';
import { RHFTextField } from '@/components/ReactHookForm';
import { CheckBox } from '@mui/icons-material';
import { EditInputIcon } from '@/assets/icons';

export const TextEditor = (props: TextEditorI) => {
  const { handleCancel, setValue } = props;
  const {
    handleSave,
    applyTextStyle,
    onColorChange,
    onFontSizeChange,
    saveDisable,
    textTitle,
    setEditValue,
    editValue,
    setEdit,
    edit,
    color,
    fontSize,
  } = useTextEditor(props);
  return (
    <Box minHeight="79vh" display="flex" flexDirection="column">
      <PageTitledHeader
        title={'Text Configuration'}
        canMovedBack
        moveBack={handleCancel}
      />
      <Box flex="1" overflow="scroll">
        <Container>
          <RHFTextField
            name={'textTitle'}
            size="small"
            label="Title"
            disabled={edit}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                  {edit ? (
                    <Box
                      onClick={() => {
                        setEdit(false), setValue === editValue;
                      }}
                    >
                      <EditInputIcon />
                    </Box>
                  ) : (
                    <Box
                      onClick={() => {
                        setEdit(true), setEditValue(textTitle);
                      }}
                    >
                      <CheckBox />
                    </Box>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Box
            display="flex"
            p={1}
            alignItems="center"
            justifyContent={'center'}
            flexWrap={'wrap'}
            gap={2}
          >
            <Button
              variant="outlined"
              onClick={() => applyTextStyle(TEXT_FORMATE?.BOLD)}
              color="secondary"
              className="small"
            >
              <FormatBoldIcon />
            </Button>
            <Button
              variant="outlined"
              onClick={() => applyTextStyle(TEXT_FORMATE?.ITALIC)}
              color="secondary"
              className="small"
            >
              <FormatItalicIcon />
            </Button>
            <Button
              variant="outlined"
              onClick={() => applyTextStyle(TEXT_FORMATE?.UNDERLINE)}
              color="secondary"
              className="small"
            >
              <FormatUnderlinedIcon />
            </Button>
            <ButtonGroup variant="outlined">
              <Button
                variant="outlined"
                onClick={() => applyTextStyle(TEXT_FORMATE?.UNORDERED_LIST)}
                color="secondary"
                className="small"
              >
                <FormatListBulletedIcon />
              </Button>
              <Button
                variant="outlined"
                onClick={() => applyTextStyle(TEXT_FORMATE?.ORDERED_LIST)}
                color="secondary"
                className="small"
              >
                <FormatListNumberedIcon />
              </Button>
            </ButtonGroup>
            <ButtonGroup variant="outlined" fullWidth>
              <Button
                variant="outlined"
                onClick={() => applyTextStyle(TEXT_FORMATE?.UPPER_CASE)}
                color="secondary"
                className="small"
              >
                <TextFormatIcon style={{ transform: 'scaleY(-1)' }} />
              </Button>
              <Button
                variant="outlined"
                onClick={() => applyTextStyle(TEXT_FORMATE?.LOWER_CASE)}
                color="secondary"
                className="small"
              >
                <TextFormatIcon />
              </Button>
              <Button
                variant="outlined"
                onClick={() => applyTextStyle(TEXT_FORMATE?.CAPITAL_CASE)}
                color="secondary"
                className="small"
              >
                <TextFormatIcon style={{ transform: 'scale(0.8)' }} />
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
        </Container>
      </Box>
      <Box position="static">
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            className="small"
            onClick={handleCancel}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="small"
            disabled={saveDisable || !textTitle}
            onClick={handleSave}
          >
            Save
          </Button>
        </Toolbar>
      </Box>
    </Box>
  );
};
