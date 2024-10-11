import React from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { MoveFolderIcon, TickCirclePrimary } from '@/assets/icons';

type FolderProps = {
  folder: any;
  selectedMoveToFolderId: string;
  handleClickListItem: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
  ) => void;
  selectedFolderId?: string;
};

const RenderFolder: React.FC<FolderProps> = ({
  folder,
  selectedMoveToFolderId,
  handleClickListItem,
}) => {
  const theme = useTheme();

  return (
    <>
      <ListItemButton
        selected={selectedMoveToFolderId === folder?._id}
        onClick={(event) => handleClickListItem(event, folder?._id)}
        sx={{
          mt: '12px',
          p: '14px 20px',
          '&:hover': {
            backgroundColor: `${theme?.palette?.grey[100]}`,
          },
          '&.Mui-selected': {
            backgroundColor: `${theme?.palette?.grey[100]}`,
          },
        }}
      >
        <ListItemIcon sx={{ mr: '6px' }}>
          <MoveFolderIcon />
        </ListItemIcon>
        <ListItemText
          primary={folder?.name}
          sx={{
            '& .MuiListItemText-primary': {
              fontSize: '14px',
              fontWeight: '400',
              color: `${theme?.palette?.blue?.dull_blue}`,
            },
          }}
        />
        {selectedMoveToFolderId === folder?._id && <TickCirclePrimary />}
      </ListItemButton>

      {folder?.nestedFolders?.length > 0 && (
        <List component="div" disablePadding sx={{ pl: '16px' }}>
          {folder?.nestedFolders?.map((nestedItem: any) => (
            <React.Fragment key={nestedItem?._id}>
              <RenderFolder
                folder={nestedItem}
                selectedMoveToFolderId={selectedMoveToFolderId}
                handleClickListItem={handleClickListItem}
              />
            </React.Fragment>
          ))}
        </List>
      )}
    </>
  );
};

export default RenderFolder;
