const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
	"#buttons-container button"
)
const currDiv = document.querySelector("#current-operation")
const prevDiv = document.querySelector("#previous-operation")
const swapButton = document.querySelector("#change-btn")
const resButton = document.querySelector("#res-btn")
const zeroButton = document.querySelector("#zero")
const oneButton = document.querySelector("#one")

class Calculator {
	private prevDiv: Element
	private currDiv: Element
	private digit: string

	constructor(curr: Element, prev: Element) {
		this.currDiv = curr
		this.prevDiv = prev
		this.digit = ""
	}
	public process(input: string): void {
		console.log(input)

		switch (input) {
			case ".":
				if (this.digit.includes(".")) {
					return
				}
				break

			case "CA":
				this.clearScreen()
				break

			case "CE":
				this.deleteScreenDigit()
				break

			default:
				if (!isNaN(Number(input))) {
					this.digit += input
					this.currDiv.innerHTML = this.digit
				} else {
					this.processOperation(input)
				}
				break
		}
	}

	private processOperation(operation: string): void {
		switch (operation) {
			case "BINARY":
				this.toBinery()
				break

			case "DECIMAL":
                this.prevDiv.innerHTML = this.digit
                this.currDiv.innerHTML = this.toDecimal().toString()
				break

			case "BCD":
				// "BCD"
				break

			default:
				break
		}
	}

	private toBinery(): void {
		this.prevDiv.innerHTML = this.digit

		if (this.digit.includes(".")) {
			const parts = this.digit.split(".")
			const intText: string = this.toIntegerBinery(Number(parts[0]))
			const frText: string = this.toFractionBinary(
				Number("0." + parts[1])
			)

			this.currDiv.innerHTML = intText + "." + frText
		} else {
			this.currDiv.innerHTML = this.toIntegerBinery(Number(this.digit))
		}
		this.digit = ""
	}

	private toIntegerBinery(num: number): string {
		let bin: number[] = []
		while (num >= 1) {
			const rest = num % 2
			bin.push(rest)
			if (rest === 1) {
				num--
			}
			num /= 2
		}
		return bin.reverse().join("")
	}
	private toFractionBinary(num: number): string {
		const tolerance = 1e-15
		let bin: number[] = []

		while (Math.abs(num - 1) > tolerance) {
			if (bin.length >= 16) {
				break
			}

			num *= 2
			bin.push(Math.floor(num))
			num -= Math.floor(num)

			console.log(num)

			if (Math.abs(num) < tolerance) {
				break
			}
		}
		return bin.join("")
	}

    private toDecimal(): number{
        let result: number = 0
        let bin: string = this.digit
        for(let i = bin.length-1; i >= 0; i--){
            let bit = Number(bin[i])
            result += bit * Math.pow(2, bin.length - 1 - i)
            console.log(result)
        }
        return result
    }

	private deleteScreenDigit(): void {
		this.digit = this.digit.slice(0, -1)
		this.currDiv.innerHTML = this.digit
	}

	private clearScreen(): void {
		this.currDiv.innerHTML = ""
		this.prevDiv.innerHTML = ""
		this.digit = ""
	}
}



const convertons: string[] = ["BINARY", "DECIMAL", "BCD"]

const calculator = new Calculator(currDiv!, prevDiv!)

let index = 0
swapButton?.addEventListener("click", () => {
	index = (index + 1) % convertons.length
	const operation: string = convertons[index]
	if (resButton) resButton.innerHTML = operation

    
})

buttons.forEach((btn) => {
	btn.addEventListener("click", () => {
		const value = btn.textContent
		if (value) {
			calculator.process(value)
		}
	})
})

