const CharmTick = ({ isRead }: any) => {
  return (
    <>
      {isRead ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
        >
          <path
            d="M1.75 10.3906L4.25 12.8906M7.75 8.89062L10.25 6.39062M5.75 10.3906L8.25 12.8906L14.25 6.39062"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.75 5.39062L3.25 7.89062L9.25 1.39062"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );
};

export default CharmTick;
