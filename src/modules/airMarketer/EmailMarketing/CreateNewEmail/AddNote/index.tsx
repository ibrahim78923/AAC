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
} from '@mui/material';
import Image from 'next/image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SendPrimaryIcon, SmileIcon } from '@/assets/icons';
import { AvatarImage, EmailMockupImage } from '@/assets/images';
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

  const [comment, setComment] = useState('');
  const [renderTrack, setRenderTrack] = useState(0);

  const handleAddNoteClick = () => {
    const newData = {
      message: comment,
      createdBy: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      avatar: user?.avatar,
      _id: uuidv4(),
      notesId: uuidv4(),
    };
    setNotesData((prevNotesData: any) => [...prevNotesData, newData]);
    setComment('');
  };

  const deleteNotes = (id: string) => {
    const updatedNotes = notesData?.filter((item: any) => item?._id !== id);
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
    const mappedData = notesData?.map(({ message, createdBy }: any) => ({
      message,
      createdBy,
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
        <Box sx={styles?.subjectWrapper}>
          <SubjectComp title="To" value="CustomerCare@Airapplecart.com" />
          <SubjectComp title="From" value="Mr.RobertFox413@Gmail.com" />
          <SubjectComp title="Subject" value="Business Consultant" />
        </Box>

        <Image src={EmailMockupImage} alt="" style={{ paddingTop: '15px' }} />
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
                    <MenuItem onClick={() => deleteNotes(item?._id)}>
                      <Typography variant="subtitle2">Delete</Typography>
                    </MenuItem>
                  </TableIconActions>
                </Box>

                <Box sx={styles?.chatContent}>
                  <Typography variant="body3" sx={{ color: '#14142B' }}>
                    {item?.message}
                  </Typography>
                  <SmileIcon />
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
                <IconButton onClick={() => handleAddNoteClick()}>
                  <SendPrimaryIcon />
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
