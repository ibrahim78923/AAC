export interface EmailViewPropsI {
  fromName: string;
  subject: string;
  sendDate: string;
  openRate: number;
  clickThroughRate: number;
  clickRate: number;
  blocked: number;
  numberOfLinksClicked: number;
  read: number;
  skimmed: number;
  glanced: number;
}
