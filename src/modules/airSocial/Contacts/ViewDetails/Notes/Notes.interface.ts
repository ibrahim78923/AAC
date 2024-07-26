export interface AddNoteI {
  title: string;
  description: string;
  attachment?: Blob | File;
}
