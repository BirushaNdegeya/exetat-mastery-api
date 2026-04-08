import { Injectable } from '@nestjs/common';
import { ProfilesService } from '../profiles/profiles.service';
import { StreaksService } from '../streaks/streaks.service';
import { ProgressService } from '../progress/progress.service';
import { CustomSetsService } from '../custom-sets/custom-sets.service';

export interface DashboardPageResponse {
  display_name: string | null;
  profile_complete: boolean;
  xp: number;
  current_streak: number;
  longest_streak: number;
  total_answered: number;
  correct_answers: number;
  custom_set_count: number;
}

@Injectable()
export class DashboardService {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly streaksService: StreaksService,
    private readonly progressService: ProgressService,
    private readonly customSetsService: CustomSetsService,
  ) {}

  async getDashboardPage(userId: string): Promise<DashboardPageResponse> {
    const [profile, streak, progressSummary, customSetCount] = await Promise.all([
      this.profilesService.getProfileByUserId(userId),
      this.streaksService.getStreakByUserId(userId),
      this.progressService.getUserProgressSummary(userId),
      this.customSetsService.getUserCustomSetCount(userId),
    ]);

    return {
      display_name: profile.display_name ?? profile.prenom ?? null,
      profile_complete: Boolean(profile.nom && profile.prenom),
      xp: profile.xp ?? 0,
      current_streak: streak.current_streak ?? 0,
      longest_streak: streak.longest_streak ?? 0,
      total_answered: progressSummary.totalAnswered,
      correct_answers: progressSummary.correctAnswers,
      custom_set_count: customSetCount,
    };
  }
}
