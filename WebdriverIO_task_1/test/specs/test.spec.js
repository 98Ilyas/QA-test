describe('Pastebin Automation', () => {
    it('should create a new paste with specified attributes', async () => {
        try {
            // Open Pastebin
            await browser.url('https://pastebin.com/');
            console.log('Opened Pastebin');

            // Accept cookies
            const cookieAcceptButton = await $('button=OK, I Understand');
            if (await cookieAcceptButton.isDisplayed()) {
                await cookieAcceptButton.click();
                console.log('Accepted cookies');
            }

            // Close sign-up prompt if it appears
            const closeSignUpPrompt = async () => {
                const signUpPrompt = await $('div.popup-box-close');
                if (await signUpPrompt.isDisplayed()) {
                    await signUpPrompt.click();
                    console.log('Closed sign-up prompt');
                }
            };
            await closeSignUpPrompt();

            // Wait for the main text area to be visible and interact with it
            const textArea = await $('#postform-text');
            await textArea.waitForExist({ timeout: 10000 });
            await textArea.setValue('Hello from WebDriver');
            console.log('Set text area value');

            // Set Paste Expiration to 10 Minutes
            const expirationDropdown = await $('#select2-postform-expiration-container');
            await expirationDropdown.waitForClickable({ timeout: 5000 });
            await expirationDropdown.click();
            console.log('Clicked expiration dropdown');

            const tenMinutesOption = await $('//li[text()="10 Minutes"]');
            await tenMinutesOption.waitForClickable({ timeout: 5000 });
            await tenMinutesOption.click();
            console.log('Selected 10 Minutes option');

            // Set Paste Name / Title
            const titleInput = await $('#postform-name');
            await titleInput.waitForExist({ timeout: 5000 });
            await titleInput.setValue('helloweb');
            console.log('Set paste title');

            // Click the "Create New Paste" button
            const submitButton = await $('button.btn.-big');
            await submitButton.waitForClickable({ timeout: 5000 });
            await submitButton.click();
            console.log('Clicked submit button');

            // Close sign-up prompt again if it appears after submission
            await closeSignUpPrompt();

            // Wait for page change
            await browser.waitUntil(async () => {
                const url = await browser.getUrl();
                const errorMsg = await $('.alert-danger');
                return url !== 'https://pastebin.com/' || await errorMsg.isExisting();
            }, {
                timeout: 20000,
                timeoutMsg: 'Page did not change after submission'
            });

            // Check final state
            const currentUrl = await browser.getUrl();
            console.log('Final URL:', currentUrl);

            if (currentUrl.includes('/view/')) {
                console.log('Successfully created paste');
                const pageTitle = await $('h1');
                await expect(pageTitle).toHaveTextContaining('helloweb');
            } else {
                const errorMsg = await $('.alert-danger');
                if (await errorMsg.isExisting()) {
                    console.log('Error message:', await errorMsg.getText());
                }
                throw new Error('Failed to create paste');
            }
        } catch (error) {
            console.error('Test failed:', error);
            await browser.saveScreenshot('./error-screenshot.png');
            throw error;
        }
    });
});
