import { EbizAppPage } from './app.po';

describe('ebiz-app App', function() {
  let page: EbizAppPage;

  beforeEach(() => {
    page = new EbizAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
