const { test, expect } = require('@playwright/test');
const{calculatorPage} = require('../pages/calculatorPage.js');

test.describe('', () => {
    let page;
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    calculator = new calculatorPage(page, 'Prototype');
}); 

test.beforeEach(async () => {
    await calculator.goto();
})

const AddNumbers1 = [1, 5, 7];
const AddNumbers2 = [2, 3, 11];
    AddNumbers1.forEach(n1 => {
        AddNumbers2.forEach(n2 => {
            test(`Add ${n1} and ${n2} to be ${n1+n2}`, async () => {
                await calculator.selectOperation('Add');
                await calculator.calculate(n1, n2);
                const answer = await page.inputValue('#numberAnswerField');
                expect(answer).toBe(String(n1+n2));
            });
        })
    });


const SubNumbers1 = [11, 9, 7];
const SubNumbers2 = [2, 9, 11];
    SubNumbers1.forEach(n1 => {
        SubNumbers2.forEach(n2 => { 
            test(`Subtract ${n2} from ${n1} to be ${n1-n2}`, async () => {
                await calculator.selectOperation('Subtract');
                await calculator.calculate(n1, n2);
                const answer = await page.inputValue('#numberAnswerField');
                expect(answer).toBe(String(n1-n2));
            });
        })
    });
const MulNumbers1 = [1, 5, 11];
const MulNumbers2 = [2, 3, 7];
    MulNumbers1.forEach(n1 => {
        MulNumbers2.forEach(n2 => {
            test(`Multiply ${n1} and ${n2} to be ${n1*n2}`, async () => {
                await calculator.selectOperation('Multiply');
                await calculator.calculate(n1, n2);
                const answer = await page.inputValue('#numberAnswerField');
                expect(answer).toBe(String(n1*n2));
            });
        })
    });
const DivNumbers1 = [64, 5, 2];
const DivNumbers2 = [1, 6, 17];
    DivNumbers1.forEach(n1 => {
        DivNumbers2.forEach(n2 => {
            test(`Divide ${n1} by ${n2} to be ${n1/n2}`, async () => {
                await calculator.selectOperation('Divide');
                await calculator.calculate(n1, n2);
                const answer = await page.inputValue('#numberAnswerField');
                expect(answer).toBe(String(n1/n2));
            });
        })
    });
const Conc1 = ['Dab', 'AAAAAA', '1'];
const Conc2 = ['2', 'E', 'OOOOO'];
    Conc1.forEach(c1 => {
        Conc2.forEach(c2 => {
            test.only(`Concatenate ${c1} and ${c2} to be ${c1+c2}`, async () => {
                await calculator.selectOperation('Concatenate');
                await calculator.calculate(c1, c2);
                const answer = await page.inputValue('#numberAnswerField');
                expect(answer).toBe(String(c1+c2));
            });
        })
    });
test.only(`Test Integer only`, async () => {
    await calculator.selectOperation('Divide');
    await calculator.integerOnly(true);
    await calculator.calculate(5, 2);
    const answer = await page.inputValue('#numberAnswerField');
    expect(answer).toBe('2');
    });
test(`Test Integer only is unchecked on load`, async () => {
    const isChecked = await page.isChecked('#integerSelect');
    expect(isChecked).toBeFalsy();
    });
test.only('Test error in input field 1', async () => {
    await calculator.calculate('a', 2);
    const errormsg = await page.textContent('#errorMsgField');
    expect(errormsg).toBe('Number 1 is not a number');
    });
test('Test error in input field 2', async () => {
    await calculator.calculate(1, 'a');
    const errormsg = await page.textContent('#errorMsgField');
    expect(errormsg).toBe('Number 2 is not a number');
    });
test('Test clear', async () => {
    await calculator.calculate(1, 1);
    await page.click('#clearButton');
    const answer = await page.inputValue('#numberAnswerField');
    expect(answer).toBe('');
    });
test.only(`Divide by zero`, async () => {
        await calculator.selectOperation('Divide');
        await calculator.calculate(5, 0);
        const errormsg = await page.textContent('#errorMsgField');
    expect(errormsg).toBe('Divide by zero error!');
    });
test.only(`Clear button available on load`, async () => {
    const isChecked = await page.isEnabled('#clearButton');
    expect(isChecked).toBeTruthy();
    });
test(`Calculate button avaialable on load`, async () => {
    const isChecked = await page.isEnabled('#calculateButton');
    expect(isChecked).toBeTruthy();
    });
});