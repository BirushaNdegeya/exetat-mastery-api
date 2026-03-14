import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from '../models/question.model';
import { Section } from '../models/section.model';
import { User } from '../models/user.model';
import { UserRole } from '../models/user-role.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Question)
    private questionModel: typeof Question,
    @InjectModel(Section)
    private sectionModel: typeof Section,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
  ) {}

  async getStats(): Promise<any> {
    const totalQuestions = await this.questionModel.count();
    const totalSections = await this.sectionModel.count();
    const totalUsers = await this.userModel.count();

    const adminRoles = await this.userRoleModel.findAll({
      where: { role: 'admin' },
      include: [User],
    });

    const totalAdmins = adminRoles.length;
    const adminList = adminRoles.map((role) => ({
      user_id: role.userId,
      display_name: role.user.name,
    }));

    return {
      totalQuestions,
      totalSections,
      totalUsers,
      totalAdmins,
      adminList,
    };
  }
}
