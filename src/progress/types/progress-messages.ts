export const PROGRESS_MESSAGES = {
    TEST_COMPLETED: 'Test completed successfully',
    TEST_ALREADY_COMPLETED: 'Test has already been completed by this user',
    TEST_NOT_FOUND: 'Test not found',
    SECTION_COMPLETED: 'Section completed successfully',
    CATEGORY_COMPLETED: 'Category completed successfully',
    INVALID_SCORE: 'Score must be between 0 and 100',
    INVALID_USER: 'Invalid user ID',
    INVALID_TEST: 'Invalid test ID',
    DATABASE_ERROR: 'An error occurred while updating progress',
} as const;