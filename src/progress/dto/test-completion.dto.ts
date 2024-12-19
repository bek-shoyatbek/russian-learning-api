import { IsInt, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class TestCompletionDto {
    @IsInt()
    userId: number;

    @IsInt()
    testId: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    score?: number;
}