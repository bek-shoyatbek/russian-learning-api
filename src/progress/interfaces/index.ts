export interface TestProgress {
    testId: number;
    completed: boolean;
    score?: number;
    completedAt?: Date;
}

export interface SectionProgress {
    sectionId: number;
    completed: boolean;
    percentage: number;
    completedTests: number;
    totalTests: number;
    completedAt?: Date;
}

export interface CategoryProgress {
    categoryId: number;
    completed: boolean;
    percentage: number;
    completedSections: number;
    totalSections: number;
    completedAt?: Date;
}

export interface UserOverallProgress {
    testCompletion: {
        total: number;
        completed: number;
        percentage: number;
    };
    categoryCompletion: {
        total: number;
        completed: number;
    };
    totalXP: number;
    totalStars: number;
}