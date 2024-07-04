describe('Pastebin Automation', () => {
    it('should create a new paste with specified attributes and verify content', async () => {
        try {
            // Open Pastebin
            await browser.url('https://pastebin.com/');
            console.log('Opened Pastebin');

            // Interact with the main text area
            const textArea = await $('#postform-text');
            await textArea.waitForExist({ timeout: 10000 });
            await textArea.setValue('git config --global user.name "New Sheriff in Town"\ngit reset $(git commit-tree HEAD^{tree} -m "Legacy code")\ngit push origin master --force');
            console.log('Set text area value');

            // Set Syntax Highlighting to Bash
            const syntaxHighlightingDropdown = await $('#select2-postform-format-container');
            await syntaxHighlightingDropdown.waitForClickable({ timeout: 5000 });
            await syntaxHighlightingDropdown.click();
            console.log('Clicked syntax highlighting dropdown');
            const bashOption = await $('//li[text()="Bash"]');
            await bashOption.waitForClickable({ timeout: 5000 });
            await bashOption.click();
            console.log('Selected Bash option');

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
            await titleInput.setValue('how to gain dominance among developers');
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
            if (!pageTitle.includes('how to gain dominance among developers - Pastebin.com')) {
                throw new Error(`Page title does not match. Expected to contain: "how to gain dominance among developers", Found: "${pageTitle}"`);
            }
            console.log('Page title verified successfully');

            // Verify Syntax Highlighting for Bash
            const syntaxHighlighted = await $('//div[@class="highlighted-code"]//a[text()="Bash"]');
            if (!await syntaxHighlighted.isExisting()) {
                throw new Error('Syntax highlighting for Bash is not applied');
            }
            console.log('Syntax highlighting for Bash verified successfully');

            // Verify the code content
            const codeContent = await $('div.highlighted-code').getText();
            const expectedContent = `git config --global user.name "New Sheriff in Town"
git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
git push origin master --force`;
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
