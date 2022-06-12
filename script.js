class Calculator {
	constructor(prevOperandText, currOperandText) {
		this.prevOperandText = prevOperandText;
		this.currOperandText = currOperandText;
		this.clear();
	}

	compute() {
		let computation;
		const prev = parseFloat(this.prevOperand);
		const current = parseFloat(this.currOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "-":
				computation = prev - current;
				break;
			case "*":
				computation = prev * current;
				break;
			case "÷":
				computation = prev / current;
				break;
			default:
				return;
		}
		this.currOperand = computation;
		this.operation = undefined;
		this.prevOperand = "";
	}

	getDisplayNum(number) {
		const stringNum = number.toString();
		const intDigits = parseFloat(stringNum.split(".")[0]);
		const decDigits = stringNum.split(".")[1];
		let intDisplay;
		if (isNaN(intDigits)) {
			intDisplay = "";
		} else {
			intDisplay = intDigits.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}
		if (decDigits != null) {
			return `${intDisplay}.${decDigits}`;
		} else {
			return intDisplay;
		}
	}

	chooseOperation(operation) {
		if (this.currOperand === "") return;
		if (this.prevOperand !== "") {
			this.compute();
		}
		this.operation = operation;
		this.prevOperand = this.currOperand;
		this.currOperand = "";
	}

	appendNum(number) {
		if (number === "." && this.currOperand.includes(".")) return;
		this.currOperand = this.currOperand.toString() + number.toString();
	}

	updateDisplay() {
		this.currOperandText.innerText = this.getDisplayNum(this.currOperand);
		if (this.operation != null) {
			this.prevOperandText.innerText = `${this.getDisplayNum(
				this.prevOperand
			)} ${this.operation}`;
		} else {
			this.prevOperandText.innerText = "";
		}
	}

	delete() {
		this.currOperand = this.currOperand.toString().slice(0, -1);
	}

	clear() {
		this.currOperand = "";
		this.prevOperand = "";
		this.operation = undefined;
	}
}

const numBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const clearBtn = document.querySelector("[data-all-clear]");

const prevOperandText = document.querySelector("[data-previous-operand]");
const currOperandText = document.querySelector("[data-current-operand]");

const calculator = new Calculator(prevOperandText, currOperandText);

numBtns.forEach(button => {
	button.addEventListener("click", () => {
		calculator.appendNum(button.innerText);
		calculator.updateDisplay();
	});
});

operationBtns.forEach(button => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalsBtn.addEventListener("click", button => {
	calculator.compute();
	calculator.updateDisplay();
});

clearBtn.addEventListener("click", button => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteBtn.addEventListener("click", button => {
	calculator.delete();
	calculator.updateDisplay();
});
