export interface TestCompletionDto {
    userId: number;
    testId: number;
    score?: number;
}

export interface ProgressUpdateResult {
    success: boolean;
    message: string;
    data?: any;
}