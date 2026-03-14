import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SendInvitationDto, RespondInvitationDto } from './dto/invitation.dto';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Get('received')
  @UseGuards(JwtAuthGuard)
  async getReceivedInvitations(@CurrentUser() user: any) {
    return this.invitationsService.getReceivedInvitations(user.id);
  }

  @Get('sent')
  @UseGuards(JwtAuthGuard)
  async getSentInvitations(
    @CurrentUser() user: any,
    @Query('set_id') setId?: string,
  ) {
    return this.invitationsService.getSentInvitations(user.id, setId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async sendInvitation(
    @CurrentUser() user: any,
    @Body() sendInvitationDto: SendInvitationDto,
  ) {
    return this.invitationsService.sendInvitation(user.id, sendInvitationDto);
  }

  @Patch(':id/respond')
  @UseGuards(JwtAuthGuard)
  async respondToInvitation(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() respondInvitationDto: RespondInvitationDto,
  ) {
    return this.invitationsService.respondToInvitation(
      user.id,
      id,
      respondInvitationDto.status,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteInvitation(@CurrentUser() user: any, @Param('id') id: string) {
    await this.invitationsService.deleteInvitation(user.id, id);
    return { message: 'Invitation deleted successfully' };
  }
}
