import { OmitType } from "@nestjs/swagger";
import { UserRewardDto } from "./user-reward.dto";

export class CreateUserRewardDto extends OmitType(UserRewardDto, ['id', "createdAt", "updatedAt"]) { }