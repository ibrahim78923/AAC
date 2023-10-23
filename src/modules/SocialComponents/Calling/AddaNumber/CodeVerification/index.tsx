import React, { useState, useRef } from 'react';

import CommonModal from '@/components/CommonModal';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const CodeVerification = ({
  setIsCodeVerificationModal,
  isCodeVerificationModal,
}: any) => {
  const router = useRouter();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = code.map(() => useRef<any>());
  const [userInteracted, setUserInteracted] = useState(false);

  const handleInputChange = (index: any, event: any) => {
    const value = event.target.value;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setUserInteracted(true);

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };
  /* eslint-disable */
  const handleBackspace = (index: any, event: any) => {
    if (event.key === 'Backspace' && index > 0 && code[index] === '') {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      setUserInteracted(true);
      inputRefs[index - 1].current.focus();
    }
  };
  /* eslint-disable */

  // const isCodeValid = code.join('').length === 6;
  const isCodeIncomplete = code.some((value) => value === '');

  const handelVerifyCode = () => {
    setUserInteracted(true);
    if (!isCodeIncomplete) {
      router.push('/social-components/calling/call');
    }
  };

  return (
    <CommonModal
      open={isCodeVerificationModal}
      handleClose={() => setIsCodeVerificationModal(false)}
      handleSubmit={() => isCodeVerificationModal}
      title=""
      okText="Send Code"
      cancelText=""
      footer={false}
    >
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4">Enter the code you received</Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
            }}
          >
            {code.map((value, index) => (
              <TextField
                key={index}
                inputRef={inputRefs[index]}
                variant="outlined"
                type="text"
                inputProps={{
                  maxLength: 1,
                }}
                value={value}
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleBackspace(index, e)}
                error={userInteracted && value === ''}
                helperText={userInteracted && value === '' ? '' : ''}
                sx={{
                  width: '54px',
                  height: '52px',
                  '& .css-a3nyho-MuiInputBase-input-MuiOutlinedInput-input': {
                    textAlign: 'center',
                  },
                }}
              />
            ))}
          </Box>
          {userInteracted && isCodeIncomplete ? (
            <Typography variant="body2" color="error">
              Please fill in all fields.
            </Typography>
          ) : null}
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              mb: 1,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setIsCodeVerificationModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handelVerifyCode}
            >
              Verify
            </Button>
          </Box>
        </Box>
      </>
    </CommonModal>
  );
};

export default CodeVerification;
