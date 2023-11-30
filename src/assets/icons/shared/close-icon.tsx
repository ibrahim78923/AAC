const CloseIcon = ({ size, color }: any) => {
  return (
    <svg
      width={size ? size[0] : '23'}
      height={size ? size[1] : '24'}
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.264 20L4.30469 4M19.264 4L4.30469 20"
        stroke={color ?? '#373A3C'}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CloseIcon;
