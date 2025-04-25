import React from 'react';
import { Avatar, Box, Button, Grid, useTheme } from '@mui/material';
import { styles } from './MainContent.style';
import Image from 'next/image';
import { IconDefaultAttachment, IconSigningDigitally } from '@/assets/icons';
import DocumentHistory from '../../CreateContract/components/DocumentHistory';
import { ENUM_CONTRACT_STATUS, getPartyName } from '@/utils/contracts';
import { generateImage } from '@/utils/avatarUtils';
import EditablePDF from './EditablePDF';

type MainContentProps = {
  contractData: any;
  signeeId: any;
  handleOpenModalSignAndSend: (_?: any, data?: any) => void;
  handleOpenModalDismissAgreement: () => void;
  handleOpenModalRequestChanged: () => void;
};

export default function MainContent({
  contractData,
  signeeId,
  handleOpenModalSignAndSend,
  handleOpenModalDismissAgreement,
  handleOpenModalRequestChanged,
}: MainContentProps) {
  const theme = useTheme();
  const currentSignee: any = contractData?.signees?.find(
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
    const party: any = contractData?.parties?.find(
      (p: any) => p?._id === partyId,
    );
    return party?.moduleData;
  };

  const sizeMB = contractData?.attachment?.size / (1024 * 1024);

  return (
    <Grid container spacing="30px">
      <Grid item xs={12} sm={6}>
        <Box sx={styles?.contractTitle}>{contractData?.name}</Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        {contractData?.logo && (
          <Box sx={styles?.contractLogo}>
            <Image
              src={generateImage(contractData?.logo?.url)}
              alt="Contract Logo"
              width={108}
              height={18}
              style={styles?.logo}
            />
          </Box>
        )}
      </Grid>

      {contractData?.parties?.map((party: any) => (
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

      {contractData?.signees?.map((signee: any) => (
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

      {contractData?.contractType === 'PDF' && (
        <Grid item xs={12}>
          <EditablePDF
            contractData={contractData}
            onSignatureClick={handleOpenModalSignAndSend}
            signees={contractData?.signees}
          />
        </Grid>
      )}

      {contractData?.status === ENUM_CONTRACT_STATUS?.PENDING && (
        <Grid item xs={12}>
          <Grid container spacing="12px">
            {contractData?.contractType === 'BASIC' && (
              <Grid item xs={12}>
                <Button
                  variant={'contained'}
                  className={'small'}
                  fullWidth
                  onClick={handleOpenModalSignAndSend}
                >
                  Sign & Send
                </Button>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Button
                onClick={handleOpenModalDismissAgreement}
                variant={'contained'}
                className={'small'}
                fullWidth
                color={'error'}
              >
                Dismiss Agreement
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={handleOpenModalRequestChanged}
                variant="outlined"
                className="small"
                color="inherit"
                sx={{ color: theme?.palette?.custom['main'] }}
                fullWidth
              >
                Suggest Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {contractData?.contractType === 'BASIC' && contractData?.attachment && (
        <Grid item xs={12}>
          <Box sx={styles?.attachmentPreview}>
            <Box className="previewLabel">Default attachment</Box>
            <Box className="previewInfobar">
              <Box className="previewInfo">
                <Box className="previewFileIcon">
                  <IconDefaultAttachment />
                </Box>
                <Box>
                  <Box className="previewFileName">
                    {contractData?.attachment?.name}
                  </Box>
                  <Box className="previewFileSize">
                    {sizeMB < 1
                      ? Math.round(contractData?.attachment?.size / 1024) +
                        ' KB'
                      : Math.round(sizeMB) + ' MB'}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={styles?.embedPdf}>
              <embed
                src={generateImage(contractData?.attachment?.url)}
                type="application/pdf"
              />
            </Box>
          </Box>
        </Grid>
      )}

      {contractData?.signees?.length > 0 && (
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

      {contractData?.activityHistory && (
        <Grid item xs={12}>
          <DocumentHistory data={contractData?.activityHistory || []} />
        </Grid>
      )}
    </Grid>
  );
}
