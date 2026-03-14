import { InvitationStatusEnum } from '../../models/invitation.model';

export class SendInvitationDto {
  set_id: string;
  invitee_email: string;
}

export class RespondInvitationDto {
  status: InvitationStatusEnum;
}
