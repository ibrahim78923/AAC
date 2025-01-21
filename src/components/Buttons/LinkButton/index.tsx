import { Button } from '@mui/material';
import Link from 'next/link';

export const LinkButton = (props: any) => {
  const { link = '#', name, color = 'primary', variant = 'contained' } = props;
  return (
    <Link href={link}>
      <Button className="small" color={color} variant={variant}>
        {name}
      </Button>
    </Link>
  );
};
