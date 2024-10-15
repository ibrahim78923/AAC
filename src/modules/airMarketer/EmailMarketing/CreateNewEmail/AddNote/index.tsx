import React, { useEffect, useState } from 'react';
import CommonDrawer from '@/components/CommonDrawer';
import { styles } from './styles';
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SendPrimaryIcon } from '@/assets/icons';
import { AvatarImage } from '@/assets/images';
import { getSession } from '@/utils';
import { v4 as uuidv4 } from 'uuid';
import { IMG_URL } from '@/config';
import { useUpdateEmailTemplatesMutation } from '@/services/airMarketer/emailMarketing';
import { enqueueSnackbar } from 'notistack';
import { TableIconActions } from './AddNoteMenu';

interface noteProps {
  isDrawerOpen: boolean;
  onClose: () => void;
  notesData: any;
  setNotesData: any;
  notesDataArray: any;
  edit: any;
}

const AddANote = ({
  isDrawerOpen,
  onClose,
  notesData,
  setNotesData,
  notesDataArray,
  edit,
}: noteProps) => {
  const { user }: any = getSession();

  const theme = useTheme();

  const [comment, setComment] = useState('');
  const [renderTrack, setRenderTrack] = useState(0);

  const handleAddNoteClick = () => {
    const id = uuidv4();
    const newData = {
      message: comment,
      createdBy: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      uuid: id,
      avatar: user?.avatar,
    };
    setNotesData((prevNotesData: any) => [...prevNotesData, newData]);
    setComment('');
  };

  const deleteNotes = (id: string) => {
    const updatedNotes = notesData?.filter((item: any) => item?.uuid !== id);
    setNotesData(updatedNotes);
  };

  useEffect(() => {
    if (notesDataArray?.notes) setNotesData(notesDataArray?.notes);
  }, [notesDataArray?.notes]);

  useEffect(() => {
    setRenderTrack(renderTrack + 1);
    if (renderTrack > 1) {
      if (edit) {
        onNotesUpdateAndPost();
      }
    }
  }, [notesData]);

  const [updateEmailTemplate] = useUpdateEmailTemplatesMutation();

  const onNotesUpdateAndPost = async () => {
    const mappedData = notesData?.map(({ message, createdBy, uuid }: any) => ({
      message,
      createdBy,
      uuid,
    }));
    try {
      await updateEmailTemplate({
        id: notesDataArray?._id,
        body: {
          notes: mappedData,
        },
      })?.unwrap();
      enqueueSnackbar('Note posted', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  return (
    <CommonDrawer
      title="Add a Note"
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      isOk
      okText={'Add'}
      footer={false}
      zIndex={13000}
    >
      <>
        {edit && (
          <>
            <Box sx={styles?.subjectWrapper}>
              <SubjectComp
                title="To"
                value={notesDataArray?.to?.map((item: any) => item)}
              />
              <SubjectComp title="From" value={notesDataArray?.from} />
              <SubjectComp title="Subject" value={notesDataArray?.subject} />
            </Box>

            <Typography
              variant="body2"
              sx={{ fontWeight: '500' }}
              mt={0.8}
              mb={2.4}
              dangerouslySetInnerHTML={{ __html: notesDataArray?.message }}
            ></Typography>
          </>
        )}

        {notesData?.map((item: any) => (
          <>
            <Box key={uuidv4()}>
              <Box sx={styles?.chatCardContent}>
                <Box sx={styles?.chatWrap}>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Image
                      src={
                        item?.avatar?.url
                          ? `${IMG_URL}${item?.avatar?.url}`
                          : AvatarImage
                      }
                      width={35}
                      height={35}
                      style={{ borderRadius: '50%' }}
                      alt=""
                    />
                    <Typography variant="body4">
                      {item?.firstName}&nbsp;{item?.lastName}
                    </Typography>
                  </Box>
                  <TableIconActions icon={<MoreVertIcon />}>
                    <MenuItem>
                      <Typography variant="subtitle2">Edit</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => deleteNotes(item?.uuid)}>
                      <Typography variant="subtitle2">Delete</Typography>
                    </MenuItem>
                  </TableIconActions>
                </Box>

                <Box sx={styles?.chatContent}>
                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.custom?.black_pearl }}
                  >
                    {item?.message}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        ))}
      </>
      <Box sx={{ mt: '26px' }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={comment}
          placeholder="Add Your Note Here"
          onChange={(e: any) => setComment(e?.target?.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={comment?.length < 1 ? true : false}
                  onClick={() => handleAddNoteClick()}
                >
                  <SendPrimaryIcon
                    color={
                      comment?.length < 1
                        ? theme?.palette?.grey[500]
                        : theme?.palette?.primary?.main
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </CommonDrawer>
  );
};

export default AddANote;

const SubjectComp = ({ title, value }: { title: string; value: string }) => {
  return (
    <Box display="flex" alignItems="center" gap="6px" mb="16px">
      <Typography variant="body3" fontWeight={700} color="#000">
        {title}:
      </Typography>
      <Typography variant="body4" fontWeight={400}>
        {value}
      </Typography>
    </Box>
  );
};
