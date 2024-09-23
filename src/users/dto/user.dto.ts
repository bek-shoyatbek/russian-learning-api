import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: number;
    @ApiProperty()
    email: number;
    @ApiProperty()
    avatar: number;
    @ApiProperty()
    createdAt?: number;
    @ApiProperty()
    updatedAt?: number;
}
