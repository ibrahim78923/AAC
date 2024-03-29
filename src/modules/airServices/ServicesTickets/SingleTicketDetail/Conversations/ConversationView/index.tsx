import dayjs from 'dayjs';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { ConversationSelectedValuesI } from '../Conversation.interface';
import {
  AvatarConversationImage,
  NoAssociationFoundImage,
} from '@/assets/images';
import { styles } from '../Conversation.styles';
import NoData from '@/components/NoData';
import ConversationMenu from '../ConversationMenu';
import { UseConversation } from '../useConversation';

const ConversationView: React.FC<{
  selectedValues: ConversationSelectedValuesI;
  open: boolean;
  handleClickButtonMenu: (event: any) => void;
  addConversation: HTMLElement | null;
  handleCloseButtonMenu: (e: any) => void;
  setSelectedItem: (value: any) => void;
}> = ({
  // selectedValues,
  open,
  handleClickButtonMenu,
  addConversation,
  handleCloseButtonMenu,
  setSelectedItem,
}) => {
  const { emailData } = UseConversation();
  // const theme = useTheme();

  // const [currentTime, setCurrentTime] = useState<string>(
  //   dayjs().format('h:mm A -D MMMM, YYYY'),
  // );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(dayjs().format('h:mm A -D MMMM, YYYY'));
  //   }, 1000 * 60);

  //   return () => clearInterval(interval);
  // }, []);
  const renderConversationItem = (email: any) => {
    const { _id, recipients, subject, html, createdAt, performedBy } = email;

    return (
      <Grid
        container
        justifyContent="space-between"
        sx={styles?.parent}
        mb="1.25rem"
        key={_id}
        gap={2}
        alignItems={'center'}
        flexWrap={'wrap'}
      >
        <Grid item xs={12} paddingTop="0 !important" flex={1}>
          <Box sx={styles?.leftSideParent}>
            <Box
              display="flex"
              sx={{ flexDirection: { md: 'row', xs: 'column' } }}
            >
              <Image
                src={AvatarConversationImage?.src}
                alt="logo"
                width={32}
                height={32}
              />
              <Box sx={{ ml: { md: 2, xs: 0 } }}>
                <Typography variant="subtitle1">{subject}</Typography>
                <Typography variant="body2">
                  {performedBy.firstName} {performedBy.lastName}{' '}
                  <span
                    style={{
                      fontSize: '1rem',
                      color: 'black',
                      fontWeight: 600,
                    }}
                  >
                    notify to{' '}
                  </span>
                  {recipients.join(', ')}
                </Typography>
                {/* <Typography variant="body2">
                  To: {recipients.join(', ')}
                </Typography> */}
                <Typography sx={styles?.date}>
                  {dayjs(createdAt).format('h:mm A - D MMMM, YYYY')}
                </Typography>
              </Box>
            </Box>
            <Box mt={2}>
              <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  };
  return (
    <Box>
      {emailData?.length > 0 ? (
        emailData?.map((email: any) => renderConversationItem(email))
      ) : (
        <Box marginTop={-10}>
          <NoData
            message="There are no conversation available"
            image={NoAssociationFoundImage}
          >
            <ConversationMenu
              open={open}
              handleClickButtonMenu={handleClickButtonMenu}
              addConversation={addConversation}
              handleCloseButtonMenu={handleCloseButtonMenu}
              setSelectedItem={setSelectedItem}
              menuOptionsAddConversation={emailData}
            />
          </NoData>
        </Box>
      )}
    </Box>
  );
};

export default ConversationView;
