import type { Result } from 'ts-results'
import { Err, Ok } from 'ts-results'
import validator from 'validator'
import { InvalidDataError } from '../error'
import { ValidatedDate } from './validated-date'

export class OrderId {
    private constructor(readonly value: string) {}
    static async create(generate: () => Promise<string>): Promise<OrderId> {
        return new OrderId(await generate())
    }
}

export class OrderPrice {
    private static MIN_VALUE = 1
    private static MAX_VALUE = 1_000_000
    private constructor(readonly value: number) {}

    static create(value: number): Result<OrderPrice, InvalidDataError> {
        return value < this.MIN_VALUE || value > this.MAX_VALUE
            ? Err(new InvalidDataError(`Invalid OrderPrice. Value must ${this.MIN_VALUE}>= and ${this.MAX_VALUE}<= but actually ${value}`))
            : Ok(new OrderPrice(value))
    }
}

export class CustomerEmail {
    private constructor(readonly value: string) {}

    static create(value: string): Result<CustomerEmail, InvalidDataError> {
        return validator.isEmail(value)
            ? Ok(new CustomerEmail(value))
            : Err(new InvalidDataError(`Invalid CustomerEmail. Passed value is ${value}`))
    }
}

export class Customer {
    private constructor(readonly email: CustomerEmail) {}
    static create(params: { email: CustomerEmail }): Customer {
        return new Customer(params.email)
    }
}

export class Order {
    private constructor(
        readonly id: OrderId,
        readonly price: OrderPrice,
        readonly orderedBy: Customer,
        readonly orderedAt: ValidatedDate
    ) {}

    static create(params: { id: OrderId, price: OrderPrice, orderedBy: Customer, orderedAt: ValidatedDate }): Order {
        return new Order(params.id, params.price, params.orderedBy, params.orderedAt)
    }
}
