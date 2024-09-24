import { OmitType } from "@nestjs/swagger";
import { UserRewardDto } from "./user-reward.dto";

export class UpdateUserRewardDto extends OmitType(UserRewardDto, ['id', 'createdAt', 'updatedAt']) { }