import { ApiProperty } from "@nestjs/swagger";

export class RewardDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    coins: number;
    @ApiProperty()
    userId: number;
    @ApiProperty()
    createdAt?: Date;
    @ApiProperty()
    updatedAt?: Date;
}