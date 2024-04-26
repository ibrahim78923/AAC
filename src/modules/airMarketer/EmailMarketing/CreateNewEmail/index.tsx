import { FormProvider } from '@/components/ReactHookForm';
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useCreateNewEmail } from './useCreateNewEmail';
import { createNewEmailData } from './CreateNewEmail.data';
import AddANote from './AddNote';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import { BackArrIcon, PlusIcon } from '@/assets/icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateNewEmail = () => {
  const {
    methodsCreateEmail,
    handleCreateEmailSubmit,
    isBcc,
    setIsBcc,
    isActive,
    setIsActive,
    isAddNoteDrawer,
    handleAddNoteDrawer,
    openCalendar,
    setOpenCalendar,
    theme,
    router,
    anchorEl,
    handlePopverClick,
    handlePopverClose,
    menuOpen,

    sendAnchorEl,
    handleSendMenuClick,
    handleSendMenuClose,
    sendMenuOpen,
  } = useCreateNewEmail();
  const [value, setValue] = useState('');

  const modules = {
    toolbar: [['image', 'video', 'bold', 'italic', 'underline']],
  };

  const formats = [
    'image',
    'video',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
  ];
  return (
    <>
      <Box sx={styles?.createNewEmailWrap}>
        <Typography variant="h4">
          <span style={{ cursor: 'pointer' }} onClick={() => router.back()}>
            <BackArrIcon />
          </span>
          &nbsp; Create New Email
        </Typography>
        <Box>
          <Button variant="contained" onClick={handleAddNoteDrawer}>
            <PlusIcon />
            &nbsp; Add a note
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <FormProvider methods={methodsCreateEmail}>
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="space-between"
          >
            {createNewEmailData?.map((item: any) => {
              return (
                item?.isBCCField?.some((val: any) => isBcc?.includes(val)) && (
                  <Grid item xs={12} md={item?.md} key={item?.componentProps}>
                    <item.component
                      {...item?.componentProps}
                      key={item?.id}
                      size={'small'}
                    >
                      {item?.componentProps?.select &&
                        item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                    </item.component>
                    {item?.componentProps?.name === 'buttons' && (
                      <Stack
                        direction={'row'}
                        gap={1}
                        justifyContent="start"
                        ml={2}
                        mt={{ md: 2.7 }}
                      >
                        <Button
                          variant={isActive?.bcc ? 'contained' : 'outlined'}
                          color={isActive?.bcc ? 'primary' : 'inherit'}
                          onClick={() => {
                            const activeNewArray = [...isBcc, 'bcc'];
                            const inActiveNewArray = isBcc.filter(
                              (element) => element !== 'bcc',
                            );
                            setIsActive({ ...isActive, bcc: !isActive?.bcc });
                            setIsBcc(
                              !isActive?.bcc
                                ? activeNewArray
                                : inActiveNewArray,
                            );
                          }}
                        >
                          BCC
                        </Button>
                        <Button
                          variant={isActive?.cc ? 'contained' : 'outlined'}
                          color={isActive?.cc ? 'primary' : 'inherit'}
                          onClick={() => {
                            const activeNewArray = [...isBcc, 'cc'];
                            const inActiveNewArray = isBcc.filter(
                              (element) => element !== 'cc',
                            );
                            setIsActive({ ...isActive, cc: !isActive?.cc });
                            setIsBcc(
                              !isActive?.cc ? activeNewArray : inActiveNewArray,
                            );
                          }}
                        >
                          CC
                        </Button>
                      </Stack>
                    )}
                  </Grid>
                )
              );
            })}
          </Grid>
          <Box sx={styles?.reactQuill(theme?.palette)}>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
              formats={formats}
              placeholder="Write something..."
            />
          </Box>
        </FormProvider>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            className="small"
            color="primary"
            variant="contained"
            endIcon={<ArrowDropDownIcon />}
            onClick={handleSendMenuClick}
            classes={{ outlined: 'outlined_btn' }}
            type="button"
          >
            Send
          </Button>
          <Menu
            anchorEl={sendAnchorEl}
            open={sendMenuOpen}
            onClose={handleSendMenuClose}
            PaperProps={{
              style: {
                width: '112px',
              },
            }}
          >
            <MenuItem onClick={() => handleCreateEmailSubmit('send')}>
              Send
            </MenuItem>
            <MenuItem onClick={() => handleCreateEmailSubmit('schedule')}>
              Schedule
            </MenuItem>
            <MenuItem onClick={() => handleCreateEmailSubmit('saveAsDraft')}>
              Save as Draft
            </MenuItem>
          </Menu>
          {openCalendar && (
            <SwitchableDatepicker
              placement="right"
              isCalendarOpen={openCalendar}
              setIsCalendarOpen={setOpenCalendar}
            />
          )}
        </Box>
      </Box>

      <AddANote
        isDrawerOpen={isAddNoteDrawer}
        onClose={handleAddNoteDrawer}
        isMenuOpen={menuOpen}
        handlePopverClick={handlePopverClick}
        handlePopverClose={handlePopverClose}
        anchorEl={anchorEl}
      />
    </>
  );
};

export default CreateNewEmail;

const styles = {
  createNewEmailWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  emailBccWrap: { display: 'flex', alignItems: 'center', gap: '8px' },
  reactQuill: (theme: any) => ({
    marginTop: '20px',
    '.ql-container.ql-snow': {
      display: 'flex',
      flexDirection: 'column',
      order: 1,
      height: '300px',
      border: `1px solid ${theme?.grey[700]} !important`,
      p: 1,
      borderRadius: '16px',
    },
    '.ql-editor.ql-blank::before': {
      left: '24px !important',
    },
    '.ql-toolbar.ql-snow': {
      background: `${theme?.grey[400]}`,
      border: 'none',
      borderRadius: '8px',
      display: 'flex',
      order: 2,
      p: '18px 24px',
      mt: 1.5,
    },
    '.quill': {
      display: 'flex',
      flexDirection: 'column',
    },
  }),
};
