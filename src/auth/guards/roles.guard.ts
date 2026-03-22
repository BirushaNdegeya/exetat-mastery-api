import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole, UserRoleEnum } from '../../models/user-role.model';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new ForbiddenException("Utilisateur non authentifié");
    }

    const userRoles = await this.userRoleModel.findAll({
      where: { userId: user.id },
    });

    const hasRole = userRoles.some((role) => requiredRoles.includes(role.role));
    if (!hasRole) {
      throw new ForbiddenException(
        `Vous devez avoir l'un des rôles suivants : ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
