import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
});

test('"Login" page displays the "Username" field, the "Password" field, and the [Login] button.', async ({ page }) => {

  // Expect a field "Username" is visible.
  await expect (page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  // Expect a field "Password" is visible.
  await expect (page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  // Expect a [Login] button is visible.
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('Check that the message "You logged into a secure area!" appears after successfull login.', async ({ page }) => {
    
    // Expect message after successfull login.
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('https://the-internet.herokuapp.com/secure');
    await expect(page.locator('#flash')).toContainText(`You logged into a secure area!`);
});

test('Assert error message for empty "Username" field in "Login" form.', async ({ page }) => {
    
    // Expect error message for empty "Username" field.
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('https://the-internet.herokuapp.com/login');
    await expect(page.locator('#flash')).toContainText(`Your username is invalid!`);
});

test('Assert error message for empty "Password" field in "Login" form.', async ({ page }) => {
    
    // Expect error message for empty "Password" field.
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('https://the-internet.herokuapp.com/login');
    await expect(page.locator('#flash')).toContainText(`Your password is invalid!`);
});

test('User is not able to log in by entering invalid Username and valid Password.', async ({ page }) => {
    
    // Expect failed login.
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmithsss');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('https://the-internet.herokuapp.com/login');
    await expect(page.locator('#flash')).toContainText(`Your username is invalid!`);
});

test('User is not able to log in by entering invalid Password and valid Username.', async ({ page }) => {
    
    // Expect failed login.
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('https://the-internet.herokuapp.com/login');
    await expect(page.locator('#flash')).toContainText(`Your password is invalid!`);
});
