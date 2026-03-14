import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRole } from '../models/user-role.model';
import { User } from '../models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([UserRole, User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
