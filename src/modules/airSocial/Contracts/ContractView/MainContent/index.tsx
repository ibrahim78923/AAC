import React from 'react';
import { Avatar, Box, Button, Grid, useTheme } from '@mui/material';
import { styles } from './MainContent.style';
import Image from 'next/image';
import { IconDefaultAttachment, IconSigningDigitally } from '@/assets/icons';
import DocumentHistory from '../../CreateContract/components/DocumentHistory';
import { getPartyName } from '@/utils/contracts';
import { generateImage } from '@/utils/avatarUtils';

type MainContentProps = {
  title: string;
  logo: any;
  parties: [];
  signees: [];
  attachment: any;
  activityHistory: [];
  signeeId: any;
};

export default function MainContent({
  title,
  logo,
  parties,
  signees,
  attachment,
  activityHistory,
  signeeId,
}: MainContentProps) {
  const theme = useTheme();
  const currentSignee: any = signees?.find(
    (signee: any) => signee?._id === signeeId,
  );

  const getAvatarPlaceholder = (name: string) => {
    return name
      ?.split(' ')
      ?.map((n: string) => n.charAt(0))
      ?.join('')
      ?.slice(0, 2);
  };

  const getOnBehalfOf = (partyId: string) => {
    const party: any = parties?.find((p: any) => p?._id === partyId);
    return party?.moduleData;
  };

  return (
    <Grid container spacing="30px">
      <Grid item xs={12} sm={6}>
        <Box sx={styles?.contractTitle}>{title}</Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        {logo && (
          <Box sx={styles?.contractLogo}>
            <Image
              src={generateImage(logo?.url)}
              alt="Contract Logo"
              width={108}
              height={18}
              style={styles?.logo}
            />
          </Box>
        )}
      </Grid>

      {parties?.map((party: any) => (
        <Grid item xs={12} sm={6} key={party?._id || party?.id}>
          <Box sx={styles?.fieldCard}>
            <Box sx={styles?.fieldCardField}>
              <Box sx={styles?.fieldCardLabel}>{'Full name'}</Box>
              <Box sx={styles?.fieldCardValue}>
                {getPartyName(party?.moduleData)}
              </Box>
            </Box>
            <Box sx={styles?.fieldCardField}>
              <Box sx={styles?.fieldCardLabel}>
                {'Hereinafter referred to as'}
              </Box>
              <Box sx={styles?.fieldCardValue}>
                {party?.referredAs ? party?.referredAs : '--'}
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}

      <Grid item xs={12}>
        {/* <Box>Start adding document content here...</Box>
        <Box>Make sure that the “Full text editing” mode is switched on.</Box> */}
      </Grid>

      {signees?.map((signee: any) => (
        <Grid item xs={12} sm={6} key={signee?._id || signee?.id}>
          <Box sx={styles?.signatureCard(theme, signee?.signatureStatus)}>
            <Box sx={styles?.signatureCardBody}>
              <Box sx={styles?.signatureCardField}>
                <Box sx={styles?.fieldCardLabel}>{'On behalf of'}</Box>
                <Box sx={styles?.fieldCardValue}>
                  {getPartyName(getOnBehalfOf(signee?.partyId)) ?? '--'}
                </Box>
              </Box>
              <Box sx={styles?.signatureCardField}>
                <Box sx={styles?.fieldCardLabel}>{'Email'}</Box>
                <Box sx={styles?.fieldCardValue}>
                  {signee?.email ? signee.email : '--'}
                </Box>
              </Box>
              <Box sx={styles?.signatureCardField}>
                <Box sx={styles?.fieldCardLabel}>{'Full name'}</Box>
                <Box sx={styles?.fieldCardValue}>
                  {signee?.name ? signee?.name : '--'}
                </Box>
              </Box>
              <Box sx={styles?.signatureCardField}>
                <Box sx={styles?.fieldCardLabel}>{'IP Address'}</Box>
                <Box sx={styles?.fieldCardValue}>{'-'}</Box>
              </Box>
            </Box>
            <Box
              sx={styles?.signatureCardFooter(theme, signee?.signatureStatus)}
            >
              <Box sx={styles?.signatureCardFooterInner}>
                <Box sx={styles?.signingDigitally}>
                  <IconSigningDigitally />
                  <Box>Signing digitally</Box>
                </Box>
              </Box>

              <Box
                sx={styles?.signatureCardFooterStripe(signee?.signatureStatus)}
              />
            </Box>
          </Box>
        </Grid>
      ))}

      {attachment && (
        <Grid item xs={12}>
          <Box sx={styles?.attachmentPreview}>
            <Box className="previewLabel">Default attachment</Box>
            <Box className="previewInfobar">
              <Box className="previewInfo">
                <Box className="previewFileIcon">
                  <IconDefaultAttachment />
                </Box>
                <Box>
                  <Box className="previewFileName">{attachment?.name}</Box>
                  <Box className="previewFileSize">
                    {Math.floor(attachment?.size / 1024)} MB
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={styles?.embedPdf}>
              <embed
                src={generateImage(attachment?.url)}
                type="application/pdf"
              />
            </Box>
          </Box>
        </Grid>
      )}

      {signees?.length > 0 && (
        <Grid item xs={12}>
          <Box sx={styles?.labelWrapper}>
            <Box sx={styles.label}>Default Signatures</Box>
          </Box>

          <Box sx={styles?.fieldGroup}>
            <Box sx={styles?.individual}>
              <Box sx={styles?.signees}>
                <Avatar
                  alt={currentSignee?.name}
                  src=""
                  sx={{
                    width: 36,
                    height: 36,
                    backgroundColor: 'primary.main',
                    fontSize: 14,
                    textTransform: 'uppercase',
                  }}
                >
                  {getAvatarPlaceholder(currentSignee?.name)}
                </Avatar>

                <Box sx={styles?.signeeName}>{currentSignee?.name}</Box>
              </Box>
              <Box sx={styles?.fieldActions}>
                <Box sx={styles?.signatureValue}>
                  {currentSignee?.signatureType}
                </Box>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  className="small"
                  disabled
                >
                  Change
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      )}
      {activityHistory && (
        <Grid item xs={12}>
          <DocumentHistory data={activityHistory || []} />
        </Grid>
      )}
    </Grid>
  );
}
