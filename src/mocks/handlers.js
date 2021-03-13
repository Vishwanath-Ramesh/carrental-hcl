import { rest } from 'msw'

export const handlers = [
  rest.post('/request', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "success!"
      })
    )
  }),

  rest.get('/vehicle', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        [
          {
            "id": 1,
            "name": "Mruti Swft 2050",
            "price": 5.20,
            "available": false,
            "rental_price": 5000,
            "type": "Hatchback"
          },
          {
            "id": 2,
            "name": "Rnault Kger",
            "price": 5.20,
            "available": true,
            "rental_price": 3000,
            "type": "SUV"
          },
          {
            "id": 3,
            "name": "Adi x-ton",
            "price": 5.20,
            "available": false,
            "rental_price": 5000,
            "type": "SUV"
          },
          {
            "id": 4,
            "name": "And over ange over port",
            "price": 209,
            "available": false,
            "rental_price": 100000,
            "type": "Luxury"
          },
          {
            "id": 5,
            "name": "Aton rtin BS",
            "price": 500,
            "available": true,
            "rental_price": 500000,
            "type": "Luxury"
          },
          {
            "id": 6,
            "name": "Ercedes-Enz A",
            "price": 35,
            "available": false,
            "rental_price": 50000,
            "type": "Sedan"
          },
          {
            "id": 7,
            "name": "MW 2 Series",
            "price": 32,
            "available": false,
            "rental_price": 50000,
            "type": "Hatchback"
          },
        ]
      ),
    )
  }),
]
