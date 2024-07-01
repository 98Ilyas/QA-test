import { browser } from '@wdio/globals';
import { expect } from '@wdio/globals/expect';
import { describe, it } from 'mocha';

describe('Get page title', () => {
  it('should get the title of the page', async () => {
    browser.url('https://ej2.syncfusion.com/angular/demos/#/fluent2/chart/overview-chart');
    var title = await browser.getTitle();
    console.log(`Page title: ${title}`);
    expect(title).toBe('Overview Chart | Chart | Syncfusion Angular UI Components');
  });
});

