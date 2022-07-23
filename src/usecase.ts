import { nanoid } from "nanoid/async";
import { Result } from "ts-results";
import { Customer, CustomerEmail, Order, OrderId, OrderPrice } from "./models/order";
import { ValidatedDate } from "./models/validated-date";

export interface PlaceOrderCommand extends Readonly<{
    price: number
    orderedBy: { email: string }
    orderedAt: string
}> {}

export type SaveOrder = (order: Order) => Promise<void>

export function placeOrder(saveOrder: SaveOrder) {
    return async (command: PlaceOrderCommand) => {
        const id = await OrderId.create(nanoid)
        // If error occurs, `unwrap` will throw Err which wraps original error, that I think is not good API.
        const [price, orderedBy, orderedAt] = Result.all(
            OrderPrice.create(command.price),
            CustomerEmail.create(command.orderedBy.email).map(email => Customer.create({email})),
            ValidatedDate.create(command.orderedAt)
            ).unwrap()
        const order = Order.create({id, price, orderedBy, orderedAt })
        await saveOrder(order)
    }
}
