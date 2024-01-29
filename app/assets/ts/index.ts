const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#buttons-container button')
const currDiv = document.querySelector("#current-operation")
const prevDiv = document.querySelector("#previous-operation")

class Calculator {
    private prevDiv: Element
    private currDiv: Element
    private digit: string

    constructor(curr: Element, prev: Element){
        this.currDiv = curr
        this.prevDiv = prev
        this.digit = ""
    }
    public process(input: string):void {
        console.log(input)
        if(input === '.' && this.digit.includes('.')){
            return
        }

        if(input === 'CA'){
            this.clearScreen()
        }else if(input === 'CE'){
            this.deleteScreenDigit()
        }else if(input === 'BINARY'){
            this.updateScreen()
        }else{
            this.digit += input
            this.currDiv.innerHTML = this.digit
        }
    }
    private deleteScreenDigit():void {
        this.digit = this.digit.slice(0, -1)
        this.currDiv.innerHTML = this.digit
    }
    private clearScreen():void {
        this.currDiv.innerHTML = ""
        this.prevDiv.innerHTML = ""
    }
    private updateScreen():void {
        this.prevDiv.innerHTML = this.digit
        if(this.digit.includes('.')){
            const parts = this.digit.split('.')
            const intText = this.integerBineryConversion(Number(parts[0]))
            const frText = this.fractionBinaryConversion(Number(('0.'+parts[1])))
            console.log(frText)
        }else{
            this.currDiv.innerHTML = this.integerBineryConversion(Number(this.digit))
        }
        this.digit = ""
    }

    private	integerBineryConversion(num: number): string{
        let bin: number[] = []
        while(num >= 1)
        {
            const rest = num % 2
            bin.push(rest)
            if(rest === 1){
                num--
            }
            num /= 2
        }
        return bin.reverse().join('')
    }
    private	fractionBinaryConversion(num: number): string{
        let bin: number[] = []
        let curr = num*2
        while(num != 1.0)
        {
            console.log('num '+num)
            if(curr > 1){
                bin.push(1)
                console.log('curr>1 '+curr)
                num = curr-1
            }else{
                bin.push(0)
                num *= 2
            }
            curr = num*2
            if (bin.length >= 16) {
                break;
            }
        }
        bin.push(1)
        return bin.join('')
    }
}

const calculator = new Calculator(currDiv!, prevDiv!)

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const value = btn.textContent
        if(value){
            calculator.process(value)
        }
    })
})

