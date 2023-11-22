import { useState } from 'react';

import { Box, Button, Typography, useTheme } from '@mui/material';

import Contacts from '@/modules/airSales/Contacts';
import GroupsCard from './GroupsCard';

import useScroll from '@/hooks/useScroll';

import { contactGroups } from '@/mock/modules/airMarketer/SMSMarketing/Contacts';

import CreateGroupModal from './CreateGroupModal';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { PlusRoundedIcon } from '@/assets/icons';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import { styles } from './Contacts.style';
import { v4 as uuidv4 } from 'uuid';

const ContactsSMSMarketing = () => {
  const theme = useTheme();

  const {
    containerRef,
    handleScroll,
    isRightButtonDisabled,
    isLeftButtonDisabled,
  } = useScroll();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Contact Groups
      </Typography>
      <Box sx={{ position: 'relative', mb: 1 }}>
        <Button
          sx={styles?.btnLeft}
          onClick={() => handleScroll(-100)}
          disabled={isLeftButtonDisabled}
        >
          <ArrowCircleLeftIcon />
        </Button>
        <Box sx={styles?.flexCards} ref={containerRef}>
          <Box
            sx={styles?.createGroupCard}
            onClick={() => setIsCreateModalOpen(true)}
          >
            <PlusRoundedIcon />
            <Typography
              sx={{
                fontSize: '12px',
                color: theme?.palette?.primary?.main,
                fontWeight: 500,
              }}
            >
              Create Group
            </Typography>
          </Box>
          <>
            {contactGroups?.map((info: any) => (
              <GroupsCard info={info} key={uuidv4()} />
            ))}
          </>
        </Box>

        <Button
          sx={styles?.btnRight}
          onClick={() => handleScroll(100)}
          disabled={isRightButtonDisabled}
        >
          <ArrowCircleRightIcon />
        </Button>
      </Box>
      {/* <Typography variant="h4" mt={2} mb={2}>
        All Contacts
      </Typography> */}
      {/* <TanstackTable columns={columns} data={smsMarketingContactsData} /> */}
      <Contacts />

      <CreateGroupModal
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
    </Box>
  );
};

export default ContactsSMSMarketing;
