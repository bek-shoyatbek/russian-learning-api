import { OmitType } from "@nestjs/swagger";
import { RewardDto } from "./reward.dto";

export class CreateRewardDto extends OmitType(RewardDto, ['id', "createdAt", "updatedAt"]) { }