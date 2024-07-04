describe('Google Cloud Platform Pricing Calculator', () => {
    it('should calculate and verify the price estimate', async () => {
        try {
            // 1. Open Google Cloud homepage in fullscreen mode
            await browser.url('https://cloud.google.com/');
            await browser.maximizeWindow();
            console.log('Opened Google Cloud homepage in fullscreen mode');

            // 2-3. Search for the pricing calculator
            const searchIcon = await $('span.DPvwY//div[contains(@class,"ND91id LLv0lb")]');
            let clickable = searchIcon.isclickable();
            console.log('Is clickable?' + clickable);
            await searchIcon.click();
            const searchInput = await $('input.devsite-search-field');
            await searchInput.setValue('Google Cloud Platform Pricing Calculator');
            await browser.keys('Enter');
            console.log('Performed search for pricing calculator');

            // 4. Click on the calculator link in search results
            const calculatorLink = await $('//a/b[text()="Google Cloud Platform Pricing Calculator"]');
            await calculatorLink.click();
            console.log('Clicked on calculator link');

            // 5. Switch to the calculator iframe
            const calculatorFrame = await $('iframe[src*="cloudpricingcalculator"]');
            await browser.switchToFrame(calculatorFrame);
            const myFrame = await $('#myFrame');
            await browser.switchToFrame(myFrame);

            // 6. Add to estimate and select Compute Engine
            const computeEngineSection = await $('//md-tab-item//div[text()="Compute Engine"]');
            await computeEngineSection.click();
            console.log('Selected Compute Engine');

            // 7. Fill out the form
            // Set number of instances
            const instancesInput = await $('input[ng-model="listingCtrl.computeServer.quantity"]');
            await instancesInput.setValue('4');

            // Set OS
            const osDropdown = await $('#select_value_label_89');
            await osDropdown.click();
            const freeOsOption = await $('//md-option//div[contains(text(), "Free: Debian, CentOS, CoreOS, Ubuntu")]');
            await freeOsOption.click();

            // Set provisioning model
            const provisioningModelDropdown = await $('#select_value_label_90');
            await provisioningModelDropdown.click();
            const regularOption = await $('//md-option//div[contains(text(), "Regular")]');
            await regularOption.click();

            // Set machine family, series, and type
            const machineTypeDropdown = await $('#select_value_label_92');
            await machineTypeDropdown.click();
            const n1Standard8Option = await $('//md-option//div[contains(text(), "n1-standard-8")]');
            await n1Standard8Option.click();

            // Add GPUs
            const addGpusCheckbox = await $('//md-checkbox[@aria-label="Add GPUs"]');
            await addGpusCheckbox.click();
            const gpuTypeDropdown = await $('#select_495');
            await gpuTypeDropdown.click();
            const teslaV100Option = await $('//md-option//div[contains(text(), "NVIDIA Tesla V100")]');
            await teslaV100Option.click();
            const gpuNumberDropdown = await $('#select_497');
            await gpuNumberDropdown.click();
            const oneGpuOption = await $('//md-option[@id="select_option_502"]');
            await oneGpuOption.click();

            // Set local SSD
            const localSsdDropdown = await $('#select_value_label_421');
            await localSsdDropdown.click();
            const ssd2x375Option = await $('//md-option//div[contains(text(), "2x375 GB")]');
            await ssd2x375Option.click();

            // Set datacenter location
            const locationDropdown = await $('#select_value_label_95');
            await locationDropdown.click();
            const frankfurtOption = await $('//md-option//div[contains(text(), "Frankfurt")]');
            await frankfurtOption.click();

            // Set committed usage
            const committedUsageDropdown = await $('#select_value_label_96');
            await committedUsageDropdown.click();
            const oneYearOption = await $('//md-option//div[contains(text(), "1 Year")]');
            await oneYearOption.click();

            console.log('Filled out the form');

            // 8. Check the calculated price
            const totalEstimatedCost = await $('//b[contains(text(), "Total Estimated Cost")]');
            const estimatedCostText = await totalEstimatedCost.getText();
            console.log('Estimated cost:', estimatedCostText);

            // 9. Click "Email Estimate" to see Total estimated cost
            const emailEstimateButton = await $('//button[@aria-label="Email Estimate"]');
            await emailEstimateButton.click();
            console.log('Clicked Email Estimate button');

            // Add your verification logic here
            // For example, you can check if certain values are present in the email estimate dialog

            console.log('Test completed successfully');

        } catch (error) {
            console.error('Test failed:', error);
            await browser.saveScreenshot('./error-screenshot.png');
            throw error;
        }
    });
});