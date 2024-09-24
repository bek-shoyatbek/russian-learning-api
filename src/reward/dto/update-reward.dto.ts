import { OmitType } from "@nestjs/swagger";
import { RewardDto } from "./reward.dto";

export class UpdateRewardDto extends OmitType(RewardDto, ['id', 'createdAt', 'updatedAt']) { }