export class SendMailDto {
  to: string; // the recipient email address
  subject: string; // the subject of the email
  template: string; // the email template name
  context: Record<string, unknown>; // the data to be passed to the email template
}
