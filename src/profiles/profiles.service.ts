import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from '../models/profile.model';
import { User } from '../models/user.model';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile)
    private readonly profileModel: typeof Profile,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  private toProfileResponse(profile: Profile, user: User): ProfileResponseDto {
    return {
      id: profile.id,
      email: user.email,
      display_name: profile.display_name ?? null,
      prenom: profile.prenom ?? null,
      postnom: profile.postnom ?? null,
      nom: profile.nom ?? null,
      matricule: profile.matricule ?? null,
      section: profile.section ?? null,
      avatar_url: profile.avatar_url ?? null,
      xp: profile.xp ?? 0,
      created_at: profile.createdAt,
      updated_at: profile.updatedAt,
    };
  }

  private async getUserOrFail(userId: string): Promise<User> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    return user;
  }

  async getProfileByUserId(userId: string): Promise<ProfileResponseDto> {
    const user = await this.getUserOrFail(userId);

    let profile = await this.profileModel.findOne({
      where: { userId },
    });

    if (!profile) {
      profile = await this.profileModel.create({
        userId,
        display_name: user.name || user.email.split('@')[0] || null,
      });
    }

    return this.toProfileResponse(profile, user);
  }

  async updateProfile(userId: string, data: UpdateProfileDto): Promise<ProfileResponseDto> {
    const user = await this.getUserOrFail(userId);

    let profile = await this.profileModel.findOne({
      where: { userId },
    });

    if (!profile) {
      profile = await this.profileModel.create({
        userId,
        display_name: user.name || user.email.split('@')[0] || null,
      });
    }

    await profile.update(data);

    return this.toProfileResponse(profile, user);
  }

  async createProfile(userId: string, displayName?: string): Promise<Profile> {
    return this.profileModel.create({
      userId,
      display_name: displayName || null,
    });
  }
}
