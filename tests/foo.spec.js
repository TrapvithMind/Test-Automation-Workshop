const { test, expect } = require('@playwright/test');
const{duckpage} = require
test('Check if logo is visible', async ({ page }) => {
    await page.goto('https://duckduckgo.com');
    const isLogoVisible = await page.isVisible("#logo_homepage_link");
    expect (isLogoVisible).toBe(true);
});

test('Checks that results page opens and results are correct', async ({ page }) => {
    await page.goto('https://duckduckgo.com');
    await page.fill('#search_form_input_homepage', "Test");
    await page.click('#search_button_homepage');
    const text  = await page.textContent('#r1-0');
    expect (text).toContain('Test');
});

test('Record test', async ({ page }) => {
    await page.goto('https://duckduckgo.com');
    
});

test('check duck.com', async ({ page }) => {
    await page.goto('https://DUCK.COM');
    expect(page.url()).toBe('https://duckduckgo.com/')
});
test('Check lithuania', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', "Lithuania");
    await page.click('#search_button_homepage');
    const text = await page.textContent('.module__title__link')
    expect (text).toContain('Lithuania');
});
test('Check MS cheat sheet', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', "microsoft word cheat sheet");
    await page.click('#search_button_homepage');
    const text = await page.textContent('h3.c-base__title');
    const isCheatSheetVisible = await page.isVisible('#zero_click_wrapper')
    expect (text).toContain('Microsoft Word 2010');
    expect (isCheatSheetVisible).toBe(true)
});

test('Check Password 8', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', "Password 8");
    await page.click('#search_button_homepage');
    const pass1 = await page.textContent('h3.c-base__title');
    await page.click('#search_button');
    const pass2 = await page.textContent('h3.c-base__title');
    expect (pass1).not.toBe(pass2);
});
test('Check Twitter down', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', "is twitter down");
    await page.click('#search_button_homepage');
    const text = await page.textContent('h3.c-base__title');
    expect (text).toContain('twitter.com seems up')
});

test('Check Devbridge qr', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', "qr www.devbridge.com");
    await page.click('#search_button_homepage');

});


test('Check Lowercase Hellow world', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', "lowercase HEllO wORld");
    await page.click('#search_button_homepage');
    const text = await page.textContent('h3.c-base__title');
    expect (text).toBe('hello world');
});

test('Check ❤️', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', "❤️");
    await page.click('#search_button_homepage');
    const text = await page.textContent('h1.c-info__title');
    const text2 = await page.textContent('.module__title__link')
    expect (text).toContain('Red Heart');
    expect(text2).toBe('Heart symbol');
});

test('Check calendar', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', "calendar 21st March 1989");
    await page.click('#search_button_homepage');
    const text = await page.textContent('tr:nth-child(6) > td:nth-child(3)');
    expect (text).toContain('21');
});

test('Check sadfkasdflkasdlkfasldkfjlaskjdflkasjdfkajsdfkjaskldfjaklsdjfa', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', "sadfkasdflkasdlkfasldkfjlaskjdflkasjdfkajsdfkjaskldfjaklsdjfa");
    await page.click('#search_button_homepage');
    const isVisible = await page.textContent('.no-results__title');
    expect (isVisible).toContain('No results found');
});

const passwordsLengths = ['8', '16', '64'];
    passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async ({ page }) => {
        await page.goto('https://duckduckgo.com');
        await page.waitForSelector("#search_form_input_homepage");
        await page.fill('#search_form_input_homepage', ("password " + passwordLength));
        await page.click("#search_button_homepage");
        const generatedPassword = await page.textContent(".c-base__title");
        expect(generatedPassword.length).toEqual(+passwordLength)
    });
  });