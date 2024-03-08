import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function useRolesCards() {
  const router: any = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [roleId, setRoleId] = useState<any>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const theme: any = useTheme();

  return { router, setAnchorEl, setRoleId, id, open, anchorEl, theme, roleId };
}
