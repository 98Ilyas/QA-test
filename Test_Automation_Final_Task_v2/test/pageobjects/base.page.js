export default class BasePage {
    // Opens a specific path
    async open(path) {
        await browser.url(path);
    }

    // Gets the page title
    async getPageTitle() {
        return await browser.getTitle();
    }
}