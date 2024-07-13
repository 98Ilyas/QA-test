class ProductsPage {
  async getTitle() {
      return browser.getTitle();
  }
}

export default new ProductsPage();
