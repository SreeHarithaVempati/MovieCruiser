import { AppPage } from './app.po';
import { browser, by, element, protractor } from 'protractor';
import { async } from 'q';

describe('movie-cruiser-frontend App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  fit('should display title', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('Moviecruiserfrontend');
  });

  fit('should be redirected to /login route on opening the application', () => {
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  fit('should be redirected to /register route', () => {
    browser.element(by.css('.register-button')).click();
    expect(browser.getCurrentUrl()).toContain('/register');
  });

  fit('should be able to register user', () => {
    browser.element(by.id('firstName')).sendKeys('loginuser4');
    browser.element(by.id('lastName')).sendKeys('loginuser4 ');
    browser.element(by.id('userId')).sendKeys('loginuser4');
    browser.element(by.id('password')).sendKeys('123456');
   
    browser.element(by.css('.register-user')).click();
  
    expect(browser.getCurrentUrl()).toContain('/login');
   
  });
  

  fit('should be able to login user and navigate to popular movies', () => {
    browser.element(by.id('userId')).sendKeys('loginuser');
    browser.element(by.id('password')).sendKeys('123456');
    browser.element(by.css('.login-user')).click();
    expect(browser.getCurrentUrl()).toContain('/movies/popular');
  });

  fit('should be able to search movies', () => {
    browser.element(by.css('.search-button')).click();
    expect(browser.getCurrentUrl()).toContain('/movies/search');
    browser.element(by.id('search-button-input')).sendKeys('Super');
    browser.element(by.id('search-button-input')).sendKeys(protractor.Key.ENTER);
    const searchItems = element.all(by.css('.movietitle'));
    expect(searchItems.count()).toBe(20);
    for(let i = 0; i < 1; i += 1) {
      expect(searchItems.get(i).getText()).toContain('Super');
    }
  });

  fit('should be able to add movie to watchlist', async() => {
    browser.driver.manage().window().maximize();
    browser.driver.sleep(1000);
    const searchItems = element.all(by.css('.moviecard'));
    expect(searchItems.count()).toBe(20);
    searchItems.get(0).click();
    browser.element(by.css('.addButton')).click();
    browser.driver.sleep(10000);
  });
 
});
