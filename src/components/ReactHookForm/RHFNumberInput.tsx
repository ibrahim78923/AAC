// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Box, Typography, styled } from '@mui/material';
import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import {
  unstable_useNumberInput as useNumberInput,
  UseNumberInputParameters,
} from '@mui/base/unstable_useNumberInput';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
// ----------------------------------------------------------------------

export default function RHFNumberInput({ name, ...other }: any) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Layout>
            <CompactNumberInput
              aria-label="Compact number input"
              placeholder="Type a number…"
              readOnly
              min={0}
              {...field}
              onChange={(_event, val) => field?.onChange(val)}
              error={!!error}
              {...other}
            />

            <Box>
              <Typography variant="body2" fontWeight={500} color="grey.600">
                {field?.value ?? ' '}
              </Typography>
              <Typography variant="body2" color="grey.900">
                {other?.label}
              </Typography>
            </Box>
          </Layout>
        </>
      )}
    />
  );
}
const CompactNumberInput = forwardRef(function CompactNumberInput(
  props: Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
    UseNumberInputParameters,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    getRootProps,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput(props);

  const inputProps = getInputProps();

  inputProps.ref = useForkRef(inputProps.ref, ref);

  return (
    <StyledInputRoot {...getRootProps()}>
      <StyledStepperButton
        className="increment"
        type="button"
        {...getIncrementButtonProps()}
      >
        <ArrowDropUpRoundedIcon sx={{ fontSize: '28px' }} />
      </StyledStepperButton>
      <StyledStepperButton
        className="decrement"
        type="button"
        {...getDecrementButtonProps()}
      >
        <ArrowDropDownRoundedIcon sx={{ fontSize: '28px' }} />
      </StyledStepperButton>
      <HiddenInput {...inputProps} />
    </StyledInputRoot>
  );
});

const StyledInputRoot = styled('div')(
  ({ theme }) => `
      display: grid;
      grid-template-columns: 1rem;
      grid-template-rows: 1rem 1rem;
      grid-template-areas:
        "increment"
        "decrement";
      color: ${
        theme?.palette?.mode === 'dark'
          ? theme?.palette?.grey[300]
          : theme?.palette?.grey[900]
      };
    `,
);

const HiddenInput = styled('input')`
  display: none;
  position: absolute;
`;

const StyledStepperButton = styled('button')(
  ({ theme }) => `
  display: flex;
  flex-flow: nowrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 0;
  padding: 0;
  color: inherit;
  background:transparent;
  height: 12px;
  box-shadow: 0 0;
  &:hover {
    cursor: pointer;
    color: ${theme?.palette?.grey[600]};
  }

  &.increment {
    grid-area: increment;
  }

  &.decrement {
    grid-area: decrement;
  }
`,
);

const Layout = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: 1rem;
`;
