import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from '../models/profile.model';
import { User } from '../models/user.model';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile)
    private profileModel: typeof Profile,
  ) {}

  async getProfileByUserId(userId: string): Promise<Profile> {
    const profile = await this.profileModel.findOne({
      where: { userId },
      include: [User],
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async updateProfile(userId: string, data: any): Promise<Profile> {
    const profile = await this.profileModel.findOne({
      where: { userId },
      include: [User],
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    await profile.update(data);
    return profile;
  }

  async createProfile(userId: string, displayName?: string): Promise<Profile> {
    return this.profileModel.create({
      userId,
      display_name: displayName || null,
    });
  }
}
