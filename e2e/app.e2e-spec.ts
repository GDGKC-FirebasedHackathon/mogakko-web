import { PrimerPage } from './app.po';

describe('primer App', function() {
  let page: PrimerPage;

  beforeEach(() => {
    page = new PrimerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
