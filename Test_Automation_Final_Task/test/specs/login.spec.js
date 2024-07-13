import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import ProductsPage from '../pageobjects/products.page.js';

describe('Login Form', () => {
    beforeEach(async () => {
        console.log('Opening login page...');
        await LoginPage.open();
    });

    it('UC-1: Test Login form with empty credentials', async () => {
        console.log('Clicking login button...');
        await LoginPage.loginButton.click();
        console.log('Verifying error message...');
        try {
            await expect(LoginPage.errorMessage).toBeDisplayed();
            await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Username is required');
        } catch (err) {
            await browser.takeScreenshot();
            throw err;
        }
    });

    it('UC-2: Test Login form with credentials by passing Username', async () => {
        console.log('Logging in with username only...');
        await LoginPage.login('error_user', '');
        console.log('Verifying error message...');
        try {
            await expect(LoginPage.errorMessage).toBeDisplayed();
            await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Password is required');
        } catch (err) {
            await browser.takeScreenshot();
            throw err;
        }
    });

    it('UC-3: Test Login form with credentials by passing Username & Password', async () => {
        console.log('Logging in with valid credentials...');
        await LoginPage.login('standard_user', 'secret_sauce');
        console.log('Verifying product page title...');
        try {
            await expect(await ProductsPage.getTitle()).toBe('Swag Labs');
        } catch (err) {
            await browser.takeScreenshot();
            throw err;
        }
    });

    // Data Provider to parametrize tests
    const users = [
        { username: 'standard_user', password: 'secret_sauce' },
        { username: 'performance_glitch_user', password: 'secret_sauce' },
        { username: 'problem_user', password: 'secret_sauce' },
    ];

    users.forEach((user) => {
        it(`UC-3: Test Login form with credentials by passing Username & Password for ${user.username}`, async () => {
            console.log(`Logging in with ${user.username} and ${user.password}...`);
            await LoginPage.login(user.username, user.password);
            console.log('Verifying product page title...');
            try {
                await expect(await ProductsPage.getTitle()).toBe('Swag Labs');
            } catch (err) {
                await browser.takeScreenshot();
                throw err;
            }
        });
    });
});