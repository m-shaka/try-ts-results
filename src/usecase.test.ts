import { placeOrder, type PlaceOrderCommand, type SaveOrder } from "./usecase";


describe('placeOrder', () => {
    it('should throw error if price is invalid', () => {
        const command: PlaceOrderCommand = {
            price: 0,
            orderedAt: new Date().toISOString(),
            orderedBy: {
                email: 'foobar@example.com'
            }
        }
        const saveOrder: SaveOrder = jest.fn().mockImplementation(async () => {})
        
        expect(placeOrder(saveOrder)(command)).rejects.toThrow(/OrderPrice/)
    })
    it('should throw error if orderBy.email is invalid', () => {
        const command: PlaceOrderCommand = {
            price: 100,
            orderedAt: new Date().toISOString(),
            orderedBy: {
                email: 'foobar'
            }
        }
        const saveOrder: SaveOrder = jest.fn().mockImplementation(async () => {})
        
        expect(placeOrder(saveOrder)(command)).rejects.toThrow(/CustomerEmail/)
    })
    it('should throw error if orderAt is invalid', () => {
        const command: PlaceOrderCommand = {
            price: 100,
            orderedAt: 'invalid date string',
            orderedBy: {
                email: 'foobar@example.com'
            }
        }
        const saveOrder: SaveOrder = jest.fn().mockImplementation(async () => {})
        
        expect(placeOrder(saveOrder)(command)).rejects.toThrow(/ValidatedDate/)
    })
    it('should call saveOrder callback', async () => {
        const command: PlaceOrderCommand = {
            price: 100,
            orderedAt: new Date().toISOString(),
            orderedBy: {
                email: 'foobar@example.com'
            }
        }
        const saveOrder: SaveOrder = jest.fn().mockImplementation(async () => {})
        
        await placeOrder(saveOrder)(command)
        expect(saveOrder).toBeCalled()
    })

})
