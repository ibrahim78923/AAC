import {
  DesignCardRefreshIcon,
  EditInputIcon,
  ImageIcon,
  RedoIcon,
  TextIcon,
  UndoIcon,
} from '@/assets/icons';
import FlipIcon from '@mui/icons-material/Flip';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import { useEditPhysicalCard } from './useEditPhysicalCard';
import { FireWorkBgImage, RQCodeImage } from '@/assets/images';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { RHFTextField } from '@/components/ReactHookForm';
import { CheckBox } from '@mui/icons-material';
import { FormProvider } from 'react-hook-form';
import Image from 'next/image';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

export const EditPhysicalCard = () => {
  const {
    theme,
    flip,
    setFlip,
    router,
    methods,
    setValue,
    shopTitle,
    enterText,
    cardTitle,
    editShop,
    setEditShop,
    setEditShopValue,
    editShopValue,
    editCard,
    setEditCard,
    editCardValue,
    setEditCardValue,
    editText,
    setEditText,
    editTextValue,
    setEditTextValue,
  } = useEditPhysicalCard();

  return (
    <FormProvider {...methods}>
      <Box bgcolor={theme?.palette?.grey[100]}>
        <Box
          p={'1rem 1rem 0 1rem'}
          borderBottom={`.1rem solid${theme?.palette?.grey[700]}`}
          bgcolor={'white'}
        >
          <PageTitledHeader
            title={'Share My Dine'}
            canMovedBack
            moveBack={() =>
              router?.push({
                pathname: AIR_LOYALTY_PROGRAM?.PHYSICAL_GIFT_CARD_DESIGN,
              })
            }
          >
            <Button variant="contained">Done</Button>
          </PageTitledHeader>
        </Box>

        <Grid container justifyContent={'space-between'} display={'flex'}>
          <Grid
            item
            xs={12}
            lg={8.7}
            bgcolor={'white'}
            border={`.1rem solid${theme?.palette?.grey[700]}`}
            borderRadius={1}
            mt={3}
            ml={3}
            p={2}
          >
            <>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <IconButton>
                    <UndoIcon />
                  </IconButton>
                  <IconButton>
                    <DesignCardRefreshIcon />
                  </IconButton>
                  <IconButton>
                    <RedoIcon />
                  </IconButton>
                </Box>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<FlipIcon />}
                  onClick={flip ? () => setFlip(false) : () => setFlip(true)}
                >
                  Flip
                </Button>
              </Box>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                mt={2}
                mb={5}
              >
                {!flip ? (
                  <Box
                    border={`.1rem solid${theme?.palette?.grey[700]}`}
                    borderRadius={5}
                    height={'18rem'}
                    width={'35rem'}
                    bgcolor={'primary.main'}
                  >
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      m={1}
                    >
                      <Image
                        src={FireWorkBgImage}
                        alt="designCardImg"
                        width={150}
                        height={140}
                      />
                      <Box
                        border={`.1rem solid${theme?.palette?.grey[700]}`}
                        p={0.5}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        borderRadius={3}
                        bgcolor={'white'}
                      >
                        <Image
                          src={RQCodeImage}
                          alt="designCardImg"
                          width={90}
                          height={90}
                        />
                        <Typography variant="h6">Phh123451</Typography>
                      </Box>
                    </Box>
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      gap={25}
                      mt={1.5}
                      p={1}
                    >
                      <Box>
                        <RHFTextField
                          name={'shopTitle'}
                          size="small"
                          sx={{ color: 'white' }}
                          disabled={editShop}
                          InputProps={{
                            onClick: () => {},
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                sx={{ cursor: 'pointer' }}
                              >
                                {editShop ? (
                                  <Box
                                    onClick={() => {
                                      setEditShop(false),
                                        setValue === editShopValue;
                                    }}
                                  >
                                    <EditInputIcon />
                                  </Box>
                                ) : (
                                  <Box
                                    onClick={() => {
                                      setEditShop(true),
                                        setEditShopValue(shopTitle);
                                    }}
                                  >
                                    <CheckBox />
                                  </Box>
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                        <RHFTextField
                          name={'cardTitle'}
                          size="small"
                          sx={{ color: 'white' }}
                          disabled={editCard}
                          InputProps={{
                            onClick: () => {},
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                sx={{ cursor: 'pointer' }}
                              >
                                {editCard ? (
                                  <Box
                                    onClick={() => {
                                      setEditCard(false),
                                        setValue === editCardValue;
                                    }}
                                  >
                                    <EditInputIcon />
                                  </Box>
                                ) : (
                                  <Box
                                    onClick={() => {
                                      setEditCard(true),
                                        setEditCardValue(cardTitle);
                                    }}
                                  >
                                    <CheckBox />
                                  </Box>
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                      <RHFTextField
                        name={'enterText'}
                        size="small"
                        sx={{ color: 'white' }}
                        disabled={editText}
                        InputProps={{
                          onClick: () => {},
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ cursor: 'pointer' }}
                            >
                              {editText ? (
                                <Box
                                  onClick={() => {
                                    setEditText(false),
                                      setValue === editTextValue;
                                  }}
                                >
                                  <EditInputIcon />
                                </Box>
                              ) : (
                                <Box
                                  onClick={() => {
                                    setEditText(true),
                                      setEditTextValue(enterText);
                                  }}
                                >
                                  <CheckBox />
                                </Box>
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    border={`.1rem solid${theme?.palette?.grey[700]}`}
                    borderRadius={5}
                    height={'18rem'}
                    width={'35rem'}
                    bgcolor={'primary.main'}
                    sx={{
                      backgroundImage: `url(${FireWorkBgImage?.src})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></Box>
                )}
              </Box>
            </>
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            bgcolor={'white'}
            border={`.1rem solid${theme?.palette?.grey[700]}`}
            borderRadius={1}
            height={'50rem'}
            p={2}
          >
            <Typography variant="h4">Edit Physical Card</Typography>
            <Typography variant="body1" color="secondary">
              Add logo, text or an image
            </Typography>
            <br />
            <Box
              display={'flex'}
              justifyContent={'start'}
              alignItems={'center'}
              p={1.5}
              gap={1.5}
              border={`.1rem solid${theme?.palette?.grey[700]}`}
              borderRadius={2}
              sx={{ cursor: 'pointer' }}
            >
              <TextIcon />
              <Typography variant="body1">Text</Typography>
            </Box>
            <Box
              display={'flex'}
              justifyContent={'start'}
              alignItems={'center'}
              p={1.5}
              gap={1.5}
              border={`.1rem solid${theme?.palette?.grey[700]}`}
              borderRadius={2}
              mt={1}
              sx={{ cursor: 'pointer' }}
            >
              <ImageIcon />
              <Typography variant="body1">Image</Typography>
            </Box>
            <br />
            <Box>
              <Typography variant="h6" mb={0.5}>
                Font
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
                    onClick={() => 'applyTextStyle(TEXT_FORMATE?.UPPER_CASE)'}
                    color="secondary"
                  >
                    <TextFormatIcon style={{ transform: 'scaleY(-1)' }} />
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => 'applyTextStyle(TEXT_FORMATE?.LOWER_CASE)'}
                    color="secondary"
                  >
                    <TextFormatIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => 'applyTextStyle(TEXT_FORMATE?.CAPITAL_CASE)'}
                    color="secondary"
                  >
                    <TextFormatIcon style={{ transform: 'scale(0.8)' }} />
                  </Button>
                </ButtonGroup>
                <Button
                  variant="outlined"
                  onClick={() => 'applyTextStyle(TEXT_FORMATE?.BOLD)'}
                  color="secondary"
                >
                  <FormatBoldIcon />
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => 'applyTextStyle(TEXT_FORMATE?.ITALIC)'}
                  color="secondary"
                >
                  <FormatItalicIcon />
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => 'applyTextStyle(TEXT_FORMATE?.UNDERLINE)'}
                  color="secondary"
                >
                  <FormatUnderlinedIcon />
                </Button>
                <ButtonGroup variant="outlined">
                  <Button
                    variant="outlined"
                    onClick={() =>
                      'applyTextStyle(TEXT_FORMATE?.UNORDERED_LIST)'
                    }
                    color="secondary"
                  >
                    <FormatListBulletedIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => 'applyTextStyle(TEXT_FORMATE?.ORDERED_LIST)'}
                    color="secondary"
                  >
                    <FormatListNumberedIcon />
                  </Button>
                </ButtonGroup>
                <select
                  value={'fontSize'}
                  onChange={() => 'onFontSizeChange'}
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
                <Box
                  p={0.6}
                  borderRadius={1}
                  border={1}
                  display={'flex'}
                  gap={0.5}
                >
                  <FormatColorFillIcon />
                  <input
                    type="color"
                    value={'color'}
                    onChange={() => 'onColorChange'}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};
