const roundToStep = (value, step) => {
    return Math.round(value / step) * step;
};


class ValueBar {
    constructor({
                    Target = null,
                    Max = null,
                    Min = 0,
                    Current = Min,
                    isShowStep = false,
                    Step = null,
                    isRoundScale = false
                }) {
        this.Target = Target;
        this.Width = this.Target.offsetWidth;
        this.Max = Max;
        this.Min = Min;
        this.Current = Current;
        this.isShowStep = isShowStep;
        this.Step = Step ? Math.abs(Step) : 1;
        this.isRoundScale = isRoundScale;
        this.isEvenlyStep = (this.Max - this.Min) % this.Step === 0;
        this.targetCoords = this._getCoords.call(this, this.Target);

        this.slider = document.createElement('div');
        this.toddler = document.createElement('div');
        this.filledArea = document.createElement('div');
        this.valueArea = document.createElement('input');
        this.stepBar = document.createElement('div');

        this.stepBar.classList.add('stepBar');
        this.valueArea.classList.add('valueArea');
        this.filledArea.classList.add('filledArea');
        this.toddler.classList.add('thumb');
        this.slider.classList.add('slider');
        this.valueArea.type = 'number';

        if (this.Current % this.Step !== 0) {
            this.Current = roundToStep(this.Current, this.Step);
            this.Current = this.Current < this.Min ? this.Min : this.Current;
            this.Current = this.Current > this.Max ? this.Max : this.Current;
        }

        this.valueArea.value = this.Current;
        this.toddler.style.left = `calc(${(this.Current - this.Min) / (this.Max - this.Min) * 100}%`;
        this.filledArea.style.width = this.toddler.style.left;

        this.slider.appendChild(this.filledArea);
        this.slider.appendChild(this.toddler);
        this.Target.appendChild(this.slider);
        this.Target.appendChild(this.stepBar);
        if (this.isShowStep) this._addScale(this.stepBar);
        this.Target.appendChild(this.valueArea);

        this.slider.addEventListener('mousedown', this._onMouseDown.bind(this));
        document.addEventListener('mousemove', this._onMouseMove.bind(this));
        document.addEventListener('mouseup', this._onMouseUp.bind(this));
        this.valueArea.addEventListener('input', () => {
            this.Current = this.valueArea.value > this.Max ? this.Max : this.valueArea.value;
            this.Current = roundToStep(this.Current, this.Step);
            this.toddler.style.left = `calc(${(this.Current - this.Min) / (this.Max - this.Min) * 100}%`;
            this.filledArea.style.width = this.toddler.style.left;
        });
        window.addEventListener(`resize`, () => {
            if (this.isShowStep) {
                // const numbersBar = this.Target.querySelector('numbersBar');
                // this._addScale();
                this._countCommonWidth();
            }
        })
    }

    _onMouseDown(e) {
        e.preventDefault();
        this.isMouseDown = true;
        this.toddlerCoords = this._getCoords.call(this, this.toddler);
        this.shiftX = e.pageX - this.toddlerCoords.left;
        if (this.isShowStep && this.Target.offsetWidth % this.shiftX !== this.Max % this.Step ||
            this.shiftX < this.Target.offsetWidth / this.CountOfSteps) {
            this.shiftX = roundToStep(this.shiftX, (this.Target.offsetWidth / ((this.Max - this.Min) / this.Step)));
        }
        this.toddler.style.left = `calc(${this.toddler.style.left} + ${this.shiftX}px)`;
        this.filledArea.style.width = this.toddler.style.left;
        this.newCurrent = Math.round((this.Max - this.Min) * this.filledArea.offsetWidth /
            this.Target.offsetWidth + this.Min);
        this.Current = this.newCurrent;
        this.valueArea.value = this.Current;
    }

    _onMouseMove(e) {
        if (this.isMouseDown) {
            this.sliderCoords = this._getCoords.call(this, this.slider);
            this.newLeft = e.pageX - this.sliderCoords.left;
            if (this.isShowStep && this.Target.offsetWidth % this.newLeft !== this.Max % this.Step ||
                this.newLeft < this.Target.offsetWidth / (this.Max - this.Min) / this.Step) {
                this.newLeft = roundToStep(this.newLeft, (this.Target.offsetWidth / ((this.Max - this.Min) / this.Step)));
            }
            if (this.newLeft < 0) this.newLeft = 0;
            let rightSide = this.slider.clientWidth - this.toddler.offsetWidth;
            if (this.newLeft > rightSide) this.newLeft = rightSide;
            this.toddler.style.left = this.newLeft + 'px';
            this.filledArea.style.width = this.toddler.style.left;
            this.newCurrent = Math.round((this.Max - this.Min) * this.filledArea.offsetWidth / this.Target.offsetWidth + this.Min);
            this.Current = this.Current > this.Max ? this.Max : this.isShowStep ? roundToStep(this.newCurrent, this.Step) : this.newCurrent;
            this.valueArea.value = this.Current
        }
    }

    _onMouseUp() {
        this.isMouseDown = false;
    }

    _getCoords(elem) {
        const box = elem.getBoundingClientRect();
        return {
            left: box.left,
            top: box.top + pageYOffset
        }
    }

    get Value(){
        return this.Current;
    }

    set Value(newValue){
        this.Current = newValue;
        this.Current = this.Current < this.Min ? this.Min : this.Current;
        this.Current = this.Current > this.Max ? this.Max : this.Current;
        this.Current = this.isShowStep ? roundToStep(this.Current, this.Step) : this.Current;
        this.valueArea.value = this.Current;
        this.toddler.style.left = `calc(${(this.Current - this.Min) / (this.Max - this.Min) * 100}%`;
        this.filledArea.style.width = this.toddler.style.left;
    }

    Progress () {
        if (this.Target.offsetWidth - parseInt(this.toddler.style.left) < this.Target.offsetWidth / ((this.Max - this.Min) / this.Step ||
            this.newLeft < this.Target.offsetWidth / (this.Max - this.Min))) {
            this.toddler.style.left = `${this.Target.offsetWidth}px`;
        }
        else {
            this.toddler.style.left = (this.filledArea.offsetWidth + this.Target.offsetWidth / ((this.Max - this.Min) / this.Step)) + `px`;
        }
        this.filledArea.style.width = this.toddler.style.left;
        this.newCurrent = roundToStep((this.Max - this.Min) * this.filledArea.offsetWidth /
            this.Target.offsetWidth + this.Min, this.Step);
        this.Current = this.newCurrent;
        this.valueArea.value = this.Current;
    }

    _addScale (targetForSteps) {
        this.CountOfDivisions = this._countOfDivisions();

        this._countCommonWidth(targetForSteps);

        if (!this.isEvenlyStep) {
            targetForSteps.lastChild.style.marginLeft = -((this.Max - this.Min) % this.Step / this.Max) * this.Target.offsetWidth / 2 + `px`;
        }

        const numbersBar = document.createElement('div');
        numbersBar.classList.add('numbersBar');
        numbersBar.style.width = this.Target.offsetWidth + this.Target.offsetWidth * 0.05 + `px`;
        this.Target.appendChild(numbersBar);

        let currentInnerValue = this.Min;
        this.Multiplier = roundToStep((this.Max - this.Min) / this.CountOfDivisions, this.Step);

        for (let j = 0; j < this.CountOfDivisions + 1; j++) {
            if (j === this.CountOfDivisions) {
                currentInnerValue = this.Max;
            }
            numbersBar.appendChild(this._createNumberValue(currentInnerValue));
            currentInnerValue = currentInnerValue + this.Multiplier;
        }

        let valueOfStep = this.Min;
        for (let i = 0; i < this.CountOfDivisions + 1; i++) {
            targetForSteps.appendChild(this._createDivisionContainer(valueOfStep));
            valueOfStep = valueOfStep + this.Step;
        }

        this._countCommonWidth(numbersBar);
        this._countCommonWidth(targetForSteps);

        this._alignElements(targetForSteps, numbersBar);
        this._alignNumbers(targetForSteps, numbersBar);
    }

    _countOfDivisions () {
        return (this.Max - this.Min) % this.CountOfDivisions ?
            roundToStep(this.CountOfDivisions, ((this.Max - this.Min) / this.Step)) : (this.Max - this.Min) / this.Step;
    }

    _createDivisionContainer (valueOfStep) {
        this.divisionContainer = document.createElement('div');
        this.divisionContainer.classList.add('divisionContainer');
        this.divisionContainer.value = String(valueOfStep);
        this.divisionContainer.appendChild(this._createStep());
        return this.divisionContainer;
    }

    _createStep () {
        this.division = document.createElement('div');
        this.division.classList.add('division');
        return this.division;
    }

    _createNumberValue (innerStepValue) {
        this.numberValue = document.createElement('div');
        this.numberValue.classList.add('numbers');
        this.numberValue.value = innerStepValue;
        this.numberValue.innerText = this.isRoundScale ? this._roundStepValue(innerStepValue): innerStepValue;
        return this.numberValue;
    }

    _countCommonWidth (parent) {
        this.commonWidth = 0;
        for (let dom of parent.children) {
            this.commonWidth += dom.offsetWidth;
        }

        if (this.commonWidth * 1.3 > parent.offsetWidth) {
            this._removeExcessElements(parent);
        }
    }

    _alignElements (steps, numbers) {
        let numbersCoords = [];
        for (let number of numbers.children) {
            let numCoord = this._getCoords.call(this, number);
            numbersCoords.push(numCoord.left);
        }

        let stepCoords = [];
        for (let step of steps.children) {
            let coord = this._getCoords.call(this, step);
            stepCoords.push(coord.left)
        }

        let previousWidth = 0;
        for (let i = 0; i < numbers.children.length; i++) {
            for (let j = 0; j < stepCoords.length; j++) {
                if (+steps.children[j].value === +numbers.children[i].value) {
                    numbers.children[i].style.left = this._indentCalculation(numbers.children[i], stepCoords[j], previousWidth) + `px`;
                    previousWidth = previousWidth + numbers.children[i].offsetWidth;
                }
            }
        }

        if (parseInt(numbers.children[numbers.children.length - 1].style.left) < parseInt(numbers.children[numbers.children.length - 2].style.left)) {
            numbers.removeChild(numbers.children[numbers.children.length - 2]);
            numbers.children[numbers.children.length - 1].style.left =
                this._indentCalculation(numbers.children[numbers.children.length - 1],
                    stepCoords[stepCoords.length - 1] + numbers.children[numbers.children.length - 2].offsetWidth * 2,
                    previousWidth) + `px`;
        }
    }

    _alignNumbers(steps, numbers) {
        const   numberSectionRate = (this.Max - this.Min) / (numbers.children.length - 1),
                stepSectionRate = Math.round(this.Target.offsetWidth / (steps.children.length - 1));
        for (let number of numbers.children) {
            number.innerText = roundToStep(+number.innerText, numberSectionRate);
            number.value = roundToStep(number.value, numberSectionRate);
        }
        for (let step of steps.children) {
            step.value = roundToStep(+step.value, stepSectionRate);
            if (roundToStep(+step.value, numberSectionRate) % numberSectionRate === 0) {
                step.value = roundToStep(+step.value, numberSectionRate);
            }
            console.log(step.value);
        }
        this._alignElements(steps,numbers);
    }

    _removeExcessElements (parent) {
        for (let child of parent.children) {
            if (child !== parent.firstChild && child !== parent.lastChild) {
                parent.removeChild(child);
            }
        }

        this._countCommonWidth(parent);

        this._alignElements(this.stepBar, parent);
    }

    _indentCalculation (item, stepLeft, previousWidth) {
        const indent = stepLeft - previousWidth - item.offsetWidth / 2 - this.targetCoords.left;
        return indent;
    }

    _roundStepValue (value) {
        let innerText = value;
        if (value >= 1000000) {
            if (value % 1000000 !== 0) {
                innerText = (value / 1000000).toFixed(2) + `m`;
            }
            else {
                innerText = value / 1000000 + `M`;
            }
            console.log(typeof innerText);
            return innerText;
        }
        if (value >= 1000 && value < 1000000 && value !== 0) {
            if (value % 1000 !== 0) {
                innerText = (value / 1000).toFixed(1) + `k`;
            }
            else {
                innerText = value / 1000 + `k`;
            }
            return innerText;
        }
        else {
            return innerText;
        }
    }
}
