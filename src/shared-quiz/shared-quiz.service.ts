import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CustomQuestionSet } from '../models/custom-question-set.model';
import { CustomQuestion } from '../models/custom-question.model';
import { Invitation, InvitationStatusEnum } from '../models/invitation.model';
import { User } from '../models/user.model';

@Injectable()
export class SharedQuizService {
  constructor(
    @InjectModel(CustomQuestionSet)
    private customSetModel: typeof CustomQuestionSet,
    @InjectModel(CustomQuestion)
    private customQuestionModel: typeof CustomQuestion,
    @InjectModel(Invitation)
    private invitationModel: typeof Invitation,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async getSharedQuiz(userId: string, setId: string): Promise<any> {
    const set = await this.customSetModel.findByPk(setId, {
      include: [CustomQuestion],
    });

    if (!set) {
      throw new NotFoundException('Quiz not found');
    }

    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user is the creator
    if (set.creator_id === userId) {
      return {
        set: {
          id: set.id,
          title: set.title,
          description: set.description,
        },
        questions: set.questions,
      };
    }

    // Check if user has accepted invitation
    const invitation = await this.invitationModel.findOne({
      where: {
        set_id: setId,
        invitee_email: user.email,
        status: InvitationStatusEnum.ACCEPTED,
      },
    });

    if (!invitation) {
      throw new ForbiddenException(
        'You do not have access to this quiz. Only the creator or invited users can access it.',
      );
    }

    return {
      set: {
        id: set.id,
        title: set.title,
        description: set.description,
      },
      questions: set.questions,
    };
  }
}
