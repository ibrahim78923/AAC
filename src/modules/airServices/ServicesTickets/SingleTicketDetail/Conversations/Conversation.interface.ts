export interface ConversationDataI {
  note?: string;
  notify?: string;
  noteDescription?: string;
  file?: any;
  reply?: string;
  replyFrom?: string;
  replyTo?: string;
  replyDescription?: string;
  forward?: string;
  forwardFrom?: string;
  forwardTo?: string;
  forwardDescription?: string;
}

export interface ConversationSelectedValuesI {
  [id: string]: ConversationDataI;
}
