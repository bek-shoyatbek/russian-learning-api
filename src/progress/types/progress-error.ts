export class ProgressError extends Error {
    constructor(
        message: string,
        public readonly code?: string,
        public readonly status: number = 400
    ) {
        super(message);
        this.name = 'ProgressError';
    }
}