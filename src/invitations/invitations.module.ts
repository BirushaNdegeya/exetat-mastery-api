import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { Invitation } from '../models/invitation.model';
import { CustomQuestionSet } from '../models/custom-question-set.model';
import { User } from '../models/user.model';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Invitation, CustomQuestionSet, User]),
    EmailModule,
  ],
  providers: [InvitationsService],
  controllers: [InvitationsController],
  exports: [InvitationsService],
})
export class InvitationsModule {}
