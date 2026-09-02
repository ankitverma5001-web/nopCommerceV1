const { expect } = require("@playwright/test")


class APiUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {

        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            { data: this.loginPayload })

        //expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log('token below');
        console.log(token);
        return token;
    }

    async createOrder(orderPayload) {

        let response = {};
        response.token = await this.getToken();
        const orderIDResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderPayload,
                headers: {

                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                },
            });

        const orderIDResponseJSON = await orderIDResponse.json();
        console.log('orderIDResponse below');
        console.log(orderIDResponseJSON);
        const orderID = orderIDResponseJSON.orders[0];
        response.orderID = orderID;
        return response;

    }

    async deleteOrder(orderID) {
        const token = await this.getToken();

        const deleteResponse = await this.apiContext.delete(
            `https://rahulshettyacademy.com/api/ecom/order/delete-order/${orderID}`,
            {
                headers: {
                    Authorization: token
                }
            }
        );

        console.log("Delete status:", deleteResponse.status());

        expect(deleteResponse.ok()).toBeTruthy();

        const deleteResponseJSON = await deleteResponse.json();

        console.log("Delete response:", deleteResponseJSON);

        return deleteResponseJSON;
    }
}
module.exports = { APiUtils };