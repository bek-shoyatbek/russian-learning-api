import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    avatar: string;
    @ApiProperty()
    createdAt?: number;
    @ApiProperty()
    updatedAt?: number;
}
