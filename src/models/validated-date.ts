import { Err, Ok, Result } from "ts-results"
import validator from 'validator'
import { InvalidDataError } from "../error"

export class ValidatedDate {
    private constructor(readonly value: Date) {}
    static create(value: string): Result<ValidatedDate, InvalidDataError> {
        return validator.isISO8601(value)
            ? Ok(new ValidatedDate
            (new Date(value)))
            : Err(new InvalidDataError(`Invalid ValidatedDate. Value must be ISO8601 string, but actually ${value}`))
    }
}
