import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Profile } from '../models/profile.model';
import { User } from '../models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Profile, User])],
  providers: [ProfilesService],
  controllers: [ProfilesController],
  exports: [ProfilesService],
})
export class ProfilesModule {}
