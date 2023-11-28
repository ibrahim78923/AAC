export interface ConversationDataI {
  note?: string;
  notify?: string;
  noteDescription?: string;
  // noteFile?: {
  //   name: string;
  //   size: string;
  //   type: string;
  // };
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
  [id?: string]: ConversationDataI;
}
