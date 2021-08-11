exports.calculatorPage = class duckpage {
    constructor(page, build){
        this.page = page;
        this.build = build;
    }
    async goto()
    {
        await this.page.goto('https://testsheepnz.github.io/BasicCalculator ');
        const dropdown = await this.page.$('#selectBuild');
        await dropdown.selectOption([{'label':this.build}]);
    }
    async selectOperation(option)
    {
        const dropdown = await this.page.$('#selectOperationDropdown');
        await dropdown.selectOption([{'label':option}]);
    }
    async calculate(value1, value2)
    {
        const button1Enabled = await this.page.isEnabled('#number1Field');
        const button2Enabled = await this.page.isEnabled('#number2Field');
        if(button1Enabled && button2Enabled)
        {
            await this.page.fill('#number1Field', String(value1));
            await this.page.fill('#number2Field', String(value2));
            await this.page.click('#calculateButton');
        }
        //await this.page.waitForSelector('#numberAnswerField', {visible: false});
        //await this.page.waitForSelector('#numberAnswerField', {visible: true});
    }
    async integerOnly(option)
    {
        if (option == true){
            await this.page.check('#integerSelect');
        }
        else
        { 
            await this.page.uncheck('#integerSelect');
        }
    }
}