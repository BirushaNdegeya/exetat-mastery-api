import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole, UserRoleEnum } from '../models/user-role.model';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async getUserRoles(userId: string): Promise<UserRole[]> {
    return this.userRoleModel.findAll({
      where: { userId },
    });
  }

  async isAdmin(userId: string): Promise<boolean> {
    const adminRole = await this.userRoleModel.findOne({
      where: { userId, role: UserRoleEnum.ADMIN },
    });
    return !!adminRole;
  }

  async getAllAdmins(): Promise<any[]> {
    const admins = await this.userRoleModel.findAll({
      where: { role: UserRoleEnum.ADMIN },
      include: [User],
    });
    return admins.map((admin) => ({
      user_id: admin.userId,
      display_name: admin.user.name,
    }));
  }
}
