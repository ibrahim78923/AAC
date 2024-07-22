import {
  Box,
  CircularProgress,
  Grid,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { styles } from './CreateTemplatesForm.style';
import InnerTab from './InnerTab';
import {
  SideBarArray,
  customersAttributesArray,
  headerArray,
  sideBarMenuArray,
} from './CreateTemplatesForm.data';
import { v4 as uuidv4 } from 'uuid';
import useCreateForm from './useCreateTemplatesForm';
import { FormProvider } from '@/components/ReactHookForm';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { BackArrowIcon } from '@/assets/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEffect, useState } from 'react';
import FormBuilder from './FormBuilder';
import PreviewTemplate from './PreviewTemplate';
import {
  HeaderItemI,
  OptionI,
  SideBarItemI,
} from './CreateTemplateForm.interface';
import { useRouter } from 'next/router';
import { useGetEmailTemplatesByIDQuery } from '@/services/airMarketer/emailTemplates';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { enqueueSnackbar } from 'notistack';
import { TEMPLATES_CARDS } from '@/constants';

const CreateTemplatesForm = () => {
  const {
    addField,
    dynamicFields,
    deleteField,
    theme,
    headerValue,
    setHeaderValue,
    methodSideBar,
    handleSubmit,
    onSubmit,
    alignment,
    handleAlignment,
    templateContants,
  } = useCreateForm();

  const router = useRouter();

  let templateId: any;
  if (router?.query?.id) {
    templateId = router?.query?.id;
  }
  let send: any;
  if (router?.query?.id) {
    send = router?.query?.send;
  }

  const [isEditMode, setIsEditMode] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const [fields, setFields] = useState<any>([]);
  const [titleValue, setTitleValue] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const { data, isLoading, error } = useGetEmailTemplatesByIDQuery(
    {
      params: { id: templateId },
    },
    { skip: templateId ? false : true },
  );

  const isShowContent = false;

  useEffect(() => {
    if (data?.data) {
      setFields(data?.data?.data);
      setTitleValue(data?.data?.name);
    }
  }, [data?.data]);
  useEffect(() => {
    if (templateId) {
      setIsEditMode(true);
    } else {
      setIsEditMode(false);
    }
  }, [templateId]);
  useEffect(() => {
    if (send === undefined) {
      setIsSend(false);
    } else {
      setIsSend(true);
    }
  }, [send]);
  useEffect(() => {
    if (Object.keys(error || {})?.length > 0 && isEditMode) {
      enqueueSnackbar('Something went wrong!', {
        variant: 'error',
      });
      router.push(`${AIR_MARKETER?.EMAIL_TEMPLATES}`);
    } else {
      null;
    }
  }, [error]);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Grid sx={styles?.mainDiv()}>
          <Grid container sx={styles?.headerBar}>
            {headerArray?.map((item: HeaderItemI, index: number) => (
              <>
                <Grid item xs={6} md={4} lg={2} key={uuidv4()}>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    onClick={() => {
                      setHeaderValue(item?.name);
                    }}
                  >
                    <Box sx={styles.headerIcon(theme, headerValue, index)}>
                      {item?.icon}
                      <Typography
                        variant="body2"
                        sx={{ marginLeft: '10px', fontWeight: '500' }}
                      >
                        {item?.name}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Box
                  sx={{
                    borderRight:
                      index != 3
                        ? `1px solid ${theme?.palette?.grey[700]}`
                        : 'none',
                    height: '100px',
                  }}
                ></Box>
              </>
            ))}
          </Grid>

          <Box sx={{ pt: 2 }}>
            <DndProvider backend={HTML5Backend}>
              <FormBuilder
                fields={fields}
                setFields={setFields}
                titleValue={titleValue}
                setTitleValue={setTitleValue}
                setOpenModal={setOpenModal}
                isEditMode={isEditMode}
                templateId={templateId}
                isSend={isSend}
                data={data?.data}
              />
            </DndProvider>
          </Box>

          {isShowContent && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={8}>
                <Box>
                  <InnerTab
                    dynamicFields={dynamicFields}
                    deleteField={deleteField}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Box sx={styles.formSideBar}>
                  {headerValue === TEMPLATES_CARDS?.GIFT_CARD ||
                  headerValue === TEMPLATES_CARDS?.LOYALTY_TOKEN ||
                  headerValue === TEMPLATES_CARDS?.VOUCHER ||
                  headerValue === TEMPLATES_CARDS?.CREDITS ? (
                    <>
                      <Typography
                        variant="h5"
                        display={'flex'}
                        alignItems={'center'}
                      >
                        {' '}
                        <Box
                          sx={{ cursor: 'pointer', marginRight: '10px' }}
                          onClick={() => {
                            setHeaderValue('');
                          }}
                        >
                          {' '}
                          <BackArrowIcon />
                        </Box>{' '}
                        Edit Button
                      </Typography>
                      <FormProvider
                        methods={methodSideBar}
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ marginTop: '40px' }}
                      >
                        <Grid container spacing={5}>
                          {SideBarArray(headerValue)?.map(
                            (item: SideBarItemI, index: any) => (
                              <Grid
                                item
                                xs={12}
                                md={item?.md}
                                key={uuidv4()}
                                sx={{
                                  paddingTop:
                                    index === 4 &&
                                    headerValue === templateContants?.giftCard
                                      ? '0px !important'
                                      : (index === 4 || index === 3) &&
                                        (headerValue ===
                                          templateContants?.LoyaltyToken ||
                                          headerValue ===
                                            templateContants?.Credits ||
                                          headerValue ===
                                            templateContants?.Voucher)
                                      ? '0px !important'
                                      : index != 0
                                      ? '20px !important'
                                      : '20px !important',
                                  paddingLeft:
                                    index === 9 || index === 10
                                      ? '10px !important'
                                      : undefined,
                                }}
                              >
                                <item.component
                                  {...item.componentProps}
                                  size={'small'}
                                >
                                  {item?.componentProps?.select
                                    ? item?.options?.map((option: OptionI) => (
                                        <option
                                          key={option?.value}
                                          value={option?.value}
                                        >
                                          {option?.label}
                                        </option>
                                      ))
                                    : null}
                                </item.component>
                                {item?.componentProps?.color && (
                                  <Box
                                    sx={{
                                      width: '40px',
                                      height: '40px',
                                      background: theme?.palette?.blue?.main,
                                      borderRadius: '8px',
                                      cursor: 'pointer',
                                    }}
                                  ></Box>
                                )}

                                {item?.componentProps?.styleButton && (
                                  <ToggleButtonGroup
                                    value={alignment}
                                    exclusive
                                    onChange={handleAlignment}
                                    aria-label="text alignment"
                                  >
                                    <ToggleButton
                                      value="Bold"
                                      aria-label="left aligned"
                                    >
                                      <FormatBoldIcon />
                                    </ToggleButton>
                                    <ToggleButton
                                      value="under"
                                      aria-label="right aligned"
                                    >
                                      <FormatUnderlinedIcon />
                                    </ToggleButton>
                                    <ToggleButton
                                      value="center"
                                      aria-label="centered"
                                    >
                                      <FormatItalicIcon />
                                    </ToggleButton>
                                  </ToggleButtonGroup>
                                )}
                              </Grid>
                            ),
                          )}
                        </Grid>
                      </FormProvider>
                    </>
                  ) : (
                    <>
                      <Typography variant="h5">Content</Typography>

                      {sideBarMenuArray?.map((item: any) => (
                        <Box
                          display={'flex'}
                          alignItems={'center'}
                          gap={'10px'}
                          padding={'12px'}
                          sx={styles.customField(theme)}
                          key={uuidv4()}
                          onClick={() => addField(item?.type)}
                        >
                          {item?.drag}
                          <Box
                            sx={{
                              width: '2px',
                              height: '30px',
                              background: theme?.palette?.custom?.off_white_one,
                            }}
                          ></Box>
                          <Box sx={styles?.iconBoxStyling(theme)}>
                            {item?.icon}
                          </Box>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{ color: theme?.palette?.secondary?.main }}
                            >
                              {item?.name}
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{ color: theme?.palette?.custom?.dark }}
                            >
                              {item?.paragraph}
                            </Typography>
                          </Box>
                        </Box>
                      ))}

                      <Typography
                        variant="h5"
                        sx={{ fontWeight: '600', marginTop: '20px' }}
                      >
                        Layouts
                      </Typography>

                      {customersAttributesArray?.map(
                        (item: any, index: any) => (
                          <Box
                            display={'flex'}
                            alignItems={'center'}
                            gap={'10px'}
                            padding={'12px'}
                            sx={styles.customField(theme)}
                            key={uuidv4()}
                            onClick={() => addField(item?.type)}
                          >
                            {item?.drag}
                            <Box
                              sx={{
                                width: '2px',
                                height: '30px',
                                background:
                                  theme?.palette?.custom?.off_white_one,
                              }}
                            ></Box>
                            <Box sx={styles?.iconBoxStyling(theme)}>
                              {index === 3 ? (
                                <>
                                  <Box
                                    sx={{
                                      background:
                                        theme?.palette?.custom
                                          ?.light_gray_color,
                                      width: '25%',
                                      height: '20px',
                                    }}
                                  >
                                    {' '}
                                  </Box>
                                  <Box
                                    sx={{
                                      background:
                                        theme?.palette?.custom
                                          ?.light_gray_color,
                                      width: '75%',
                                      height: '20px',
                                      marginLeft: '2px',
                                    }}
                                  >
                                    {' '}
                                  </Box>
                                </>
                              ) : (
                                Array.from({ length: index + 1 }).map(() => (
                                  <Box
                                    key={uuidv4()}
                                    sx={{
                                      background:
                                        theme?.palette?.custom
                                          ?.light_gray_color,
                                      width:
                                        index === 0
                                          ? '100%'
                                          : index === 1
                                          ? '50%'
                                          : '33%',
                                      height: '20px',
                                      marginLeft: index !== 0 ? '2px' : '0',
                                    }}
                                  ></Box>
                                ))
                              )}
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{ color: theme?.palette?.secondary?.main }}
                            >
                              {item?.name}
                            </Typography>
                          </Box>
                        ),
                      )}
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}
        </Grid>

        {isLoading && templateId && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(5px)',
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backgroundColor: '#00000038 !important',
        }}
      >
        <Box sx={styles?.parentBox(theme)}>
          <PreviewTemplate setOpenModal={setOpenModal} fields={fields ?? []} />
        </Box>
      </Modal>
    </>
  );
};

export default CreateTemplatesForm;
