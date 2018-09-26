# Checkout Example

This is a test application using an Express server to serve some API endpoints for products, cupons and checkout informations in order to build a simple checkout summary screen.

## Usage

Install both the server and client dependencies run:

```
npm install
```

Fire up the development server and the client:

```
npm run dev
```

This will run the client on http://localhost:3000 and the Expresss server on http://localhost:5000

The client is already proxified to the server

### Implementation details

1. You can get all the data you need for the checkout interface with a `GET` request to `/api/checkouts/:checkoutId`.

2. If you pass the id of the selected coupon in the query of the previous request you get the data with an updated total price.

3. The confirmation action should be a `POST` request to `/api/checkouts/:checkoutId` with the id of the selected coupon in the body.

### Implementation requirements

1. When the user selects a coupon the summary of the purchase must update with the new values.

2. When the user clicks on _cancelar_ a modal must appear with the cancellation message.

3. When the user clicks on _confirmar_ a modal must appear with the success message.

## Authors

* [Guilherme Oliveira](https://github.com/guibfo)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
