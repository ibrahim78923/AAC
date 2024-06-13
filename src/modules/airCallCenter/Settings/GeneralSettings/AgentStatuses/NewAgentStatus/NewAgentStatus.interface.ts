export interface NewAgentStatusPropsI {
  isDrawerOpen: boolean;
  onClose: () => void;
  handleSubmit: any;
  formMethods: any;
  isLoading?: boolean;
}
export interface EmojiPickerPropsInterface {
  onEmojiSelect: (emoji: string) => void;
}
