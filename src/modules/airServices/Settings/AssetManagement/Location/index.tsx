import { LocationHeader } from './LocationHeader';
import { ListLocation } from './ListLocation/Index';
import { ImportLocation } from './ImportLocation';
import { useState } from 'react';

export const Location = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <LocationHeader setIsDrawerOpen={setIsDrawerOpen} />
      <br />
      <ListLocation />
      {isDrawerOpen && (
        <ImportLocation
          setIsDrawerOpen={setIsDrawerOpen}
          isDrawerOpen={isDrawerOpen}
        />
      )}
    </>
  );
};
