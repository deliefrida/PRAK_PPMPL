import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('UI Testing using Selenium', function () {
    this.timeout(30000); // timeout 30 detik

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should load the login page', async function () {
        await driver.get('file:///D:/KULIAH%20SEMESTER%205/PENGUJIAN%20DAN%20PENJAMIN%20MUTU%20PERANGKAT%20LUNAK/ppmpl_prak4/test/login.html');
        await driver.wait(until.titleIs('Login Page'), 15000);

        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should input username and password', async function () {
        const usernameField = await driver.wait(until.elementLocated(By.id('username')), 15000);
        const passwordField = await driver.wait(until.elementLocated(By.id('password')), 15000);

        await usernameField.sendKeys('testuser');
        await passwordField.sendKeys('password123');

        const usernameValue = await usernameField.getAttribute('value');
        const passwordValue = await passwordField.getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function () {
        const loginButton = await driver.wait(until.elementLocated(By.id('loginButton')), 15000);
        await loginButton.click();
    });

    it('should display an error message for invalid login', async function () {
        const usernameField = await driver.findElement(By.id('username'));
        const passwordField = await driver.findElement(By.id('password'));
        await usernameField.clear();
        await passwordField.clear();
        await usernameField.sendKeys('wrongUser');
        await passwordField.sendKeys('wrongPassword');
        
        const loginButton = await driver.findElement(By.id('loginButton'));
        await loginButton.click();

        try {
            await driver.wait(until.alertIsPresent(), 5000);
            const alert = await driver.switchTo().alert();
            const alertText = await alert.getText();
            console.log("Alert ditemukan dengan teks: ", alertText);

            if (alertText.includes('Login berhasil!')) {
                await alert.accept(); // Tutup alert "Login berhasil!"
                throw new Error('Alert success muncul meskipun login invalid!');
            } else {
                await alert.accept(); // Tutup alert dengan pesan error
            }
        } catch (error) {
            if (error.name === 'TimeoutError') {
                console.log("Tidak ada alert, melanjutkan validasi pesan error.");
                
                const errorMessage = await driver.wait(until.elementLocated(By.id('errorMessage')), 15000);
                const isErrorDisplayed = await errorMessage.isDisplayed();
                expect(isErrorDisplayed).to.be.true;
            } else {
                throw error;
            }
        }
    });
    
    it('should input data using CSS Selector and XPath', async function () {
        const usernameField = await driver.findElement(By.css('#username'));
        await usernameField.clear();
        await usernameField.sendKeys('testuser');

        const passwordField = await driver.findElement(By.xpath('//*[@id="password"]'));
        await passwordField.clear();
        await passwordField.sendKeys('password123');
    });

    it('should verify the visibility of the login button', async function () {
        const loginButton = await driver.findElement(By.id('loginButton'));
        const isDisplayed = await loginButton.isDisplayed();
        expect(isDisplayed).to.be.true;
    });
});
