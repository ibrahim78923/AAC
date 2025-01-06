import React from 'react';
import { Box, Grid } from '@mui/material';
import { styles } from './Preview.style';
import Image from 'next/image';
import LogoImage from './contract-logo.png';
import { IconDefaultAttachment, IconSigningDigitally } from '@/assets/icons';
import { useFormContext } from 'react-hook-form';
import DefaultSignatures from '../form-fields/DefaultSignatures';
import useCreateContract from '../useCreateContract';
import DocumentHistory from '../components/DocumentHistory';

export default function Preview() {
  const { watch } = useFormContext();
  const defaultAttachment = watch('defaultAttachment');

  const { signees, handleOpenModalManageSignature } = useCreateContract();

  return (
    <Grid container spacing="30px">
      <Grid item xs={12} sm={6}>
        <Box sx={styles?.contractTitle}>{'Untitled Draft'}</Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box sx={styles?.contractLogo}>
          <Image
            src={LogoImage}
            alt="Contract Logo"
            width={108}
            height={18}
            style={styles?.logo}
          />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box sx={styles?.fieldCard}>
          <Box sx={styles?.fieldCardField}>
            <Box sx={styles?.fieldCardLabel}>{'Full name'}</Box>
            <Box sx={styles?.fieldCardValue}>{'John Doe'}</Box>
          </Box>
          <Box sx={styles?.fieldCardField}>
            <Box sx={styles?.fieldCardLabel}>
              {'Hereinafter referred to as'}
            </Box>
            <Box sx={styles?.fieldCardValue}>{'Sender'}</Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box sx={styles?.fieldCard}>
          <Box sx={styles?.fieldCardField}>
            <Box sx={styles?.fieldCardLabel}>
              {'Hereinafter referred to as'}
            </Box>
            <Box sx={styles?.fieldCardValue}>{'Recipient'}</Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box>Start adding document content here...</Box>
        <Box>Make sure that the “Full text editing” mode is switched on.</Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box sx={styles?.signatureCard}>
          <Box sx={styles?.signatureCardBody}>
            <Box sx={styles?.signatureCardField}>
              <Box sx={styles?.fieldCardLabel}>{'On behalf of'}</Box>
              <Box sx={styles?.fieldCardValue}>{'Fiatsign'}</Box>
            </Box>
            <Box sx={styles?.signatureCardField}>
              <Box sx={styles?.fieldCardLabel}>{'Email'}</Box>
              <Box sx={styles?.fieldCardValue}>
                {'developers@orcalo.co.uk.'}
              </Box>
            </Box>
            <Box sx={styles?.signatureCardField}>
              <Box sx={styles?.fieldCardLabel}>{'Full name'}</Box>
              <Box sx={styles?.fieldCardValue}>{'John Doe'}</Box>
            </Box>
            <Box sx={styles?.signatureCardField}>
              <Box sx={styles?.fieldCardLabel}>{'IP Address'}</Box>
              <Box sx={styles?.fieldCardValue}>{'-'}</Box>
            </Box>
          </Box>
          <Box sx={styles?.signatureCardFooter}>
            <Box sx={styles?.signatureCardFooterInner}>
              <Box sx={styles?.signingDigitally}>
                <IconSigningDigitally />
                <Box>Signing digitally</Box>
              </Box>
            </Box>

            <Box sx={styles?.signatureCardFooterStripe} />
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box sx={styles?.signatureCard}>
          <Box sx={styles?.signatureCardBody}>
            <Box sx={styles?.signatureCardField}>
              <Box sx={styles?.fieldCardLabel}>{'On behalf of'}</Box>
              <Box sx={styles?.fieldCardValue}>{'Fiatsign'}</Box>
            </Box>
            <Box sx={styles?.signatureCardField}>
              <Box sx={styles?.fieldCardLabel}>{'Email'}</Box>
              <Box sx={styles?.fieldCardValue}>
                {'developers@orcalo.co.uk.'}
              </Box>
            </Box>
            <Box sx={styles?.signatureCardField}>
              <Box sx={styles?.fieldCardLabel}>{'Full name'}</Box>
              <Box sx={styles?.fieldCardValue}>{'John Doe'}</Box>
            </Box>
            <Box sx={styles?.signatureCardField}>
              <Box sx={styles?.fieldCardLabel}>{'IP Address'}</Box>
              <Box sx={styles?.fieldCardValue}>{'-'}</Box>
            </Box>
          </Box>
          <Box sx={styles?.signatureCardFooter}>
            <Box sx={styles?.signatureCardFooterInner}>
              <Box sx={styles?.signingDigitally}>
                <IconSigningDigitally />
                <Box>Signing digitally</Box>
              </Box>
            </Box>

            <Box sx={styles?.signatureCardFooterStripe} />
          </Box>
        </Box>
      </Grid>
      {defaultAttachment && (
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
                    {defaultAttachment?.name}
                  </Box>
                  <Box className="previewFileSize">
                    {Math.floor(defaultAttachment?.size / 1024)} MB
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={styles?.embedPdf}>
              <embed
                src={`${URL.createObjectURL(
                  new Blob([defaultAttachment], { type: 'application/pdf' }),
                )}`}
                type="application/pdf"
              />
            </Box>
          </Box>
        </Grid>
      )}

      <Grid item xs={12}>
        <DefaultSignatures
          signees={signees}
          onClickChange={handleOpenModalManageSignature}
        />
      </Grid>

      <Grid item xs={12}>
        <DocumentHistory />
      </Grid>
    </Grid>
  );
}
