export class InvalidDataError extends Error {
    constructor(public message: string) {
        super()
    }
}
