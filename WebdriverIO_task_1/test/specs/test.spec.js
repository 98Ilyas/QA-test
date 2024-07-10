describe('Pastebin Automation', () => {
    it('should create a new paste with specified attributes', async () => {
        try {
            // Open Pastebin
            await browser.url('https://pastebin.com/');
            console.log('Opened Pastebin');

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

            // Wait for page change
            await browser.waitUntil(async () => {
                const url = await browser.getUrl();
                return url !== 'https://pastebin.com/';
            }, {
                timeout: 20000,
                timeoutMsg: 'Page did not change after submission'
            });

            // Get the new URL after paste is created
            const newPasteUrl = await browser.getUrl();
            console.log('New paste URL:', newPasteUrl);

            // Navigate to the new paste URL
            await browser.url(newPasteUrl);

            // Check final state
            const pageTitle = await browser.getTitle();
            if (!pageTitle.includes('helloweb - Pastebin.com')) {
                throw new Error(`Page title does not match. Expected to contain: "helloweb - Pastebin.com", Found: "${pageTitle}"`);
            }
            console.log('Page title verified successfully');

            // Verify the code content
            const codeContent = await $('div.de1').getText();
            const expectedContent = 'Hello from WebDriver';
            if (codeContent.trim() !== expectedContent.trim()) {
                throw new Error('Code content does not match expected values');
            }
            console.log('Code content verified successfully');

        } catch (error) {
            console.error('Test failed:', error);
            await browser.saveScreenshot('./error-screenshot.png');
            throw error;
        }
    });
});



