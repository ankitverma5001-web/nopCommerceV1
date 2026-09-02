// Author - AnkitQA
class LoginPage {

    constructor(page) {

        this.page = page;
        // this.login = page.locator('.ico-login');
        this.username = page.locator("input[data-test ='username']");
        this.password = page.locator("input[data-test ='password']");
        this.loginbutton = page.locator('.submit-button');

    }


    async navigateToLoginPage(username, password) {

        await this.page.goto('https://www.saucedemo.com/');
        //await this.loginbutton.waitFor({ state: 'visible' });
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginbutton.click();

    }

}
module.exports = LoginPage;