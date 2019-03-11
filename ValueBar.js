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
        this.Max = Max;
        this.Min = Min;
        this.Current = Current;
        this.isShowStep = isShowStep;
        this.Step = Step ? Math.abs(Step) : 1;
        this.isRoundScale = isRoundScale;
        this.commonValue = this.Max - this.Min;
        this.isEvenlyStep = this.commonValue % this.Step === 0;

        this.container = document.createElement('div');
        this.slider = document.createElement('div');
        this.toddler = document.createElement('div');
        this.filledArea = document.createElement('div');
        this.valueArea = document.createElement('input');
        this.stepBar = document.createElement('div');
        this.numbersBar = document.createElement('div');

        this.container.classList.add('sliderContainer');
        this.stepBar.classList.add('stepBar');
        this.valueArea.classList.add('valueArea');
        this.filledArea.classList.add('filledArea');
        this.toddler.classList.add('thumb');
        this.slider.classList.add('slider');
        this.numbersBar.classList.add('numbersBar');
        this.valueArea.type = 'number';

        if (this.Current % this.Step !== 0) {
            this.Current = roundToStep(this.Current, this.Step);
        }
        this.Current = this.Current < this.Min ? this.Min : this.Current;
        this.Current = this.Current > this.Max ? this.Max : this.Current;

        this.valueArea.value = this.Current;
        this.toddler.style.left = `calc(${(this.Current - this.Min) / this.commonValue * 100}%`;
        this.filledArea.style.width = this.toddler.style.left;

        this.slider.appendChild(this.filledArea);
        this.slider.appendChild(this.toddler);
        this.container.appendChild(this.slider);
        this.Target.appendChild(this.container);
        this.containerCoords = this._getCoords(this.container);
        this.container.appendChild(this.stepBar);
        this.container.appendChild(this.numbersBar);
        this._addNumberScale(this.numbersBar, this._widthInit(this.numbersBar));
        this._addStepScale(this.stepBar, this.numbersBar);
        this._alignElements(this.stepBar, this.numbersBar);
        if (!this.isShowStep) this.container.removeChild(this.numbersBar);
        this.container.appendChild(this.valueArea);

        this.slider.addEventListener('mousedown', this._onMouseDown.bind(this));
        document.addEventListener('mousemove', this._onMouseMove.bind(this));
        document.addEventListener('mouseup', this._onMouseUp.bind(this));
        this.valueArea.addEventListener('input', () => {
            this.Current = this.valueArea.value;
            this.Current = roundToStep(this.Current, this.Step);
            if (this.valueArea.value < this.Min) {
                this.Current = this.Min;
            }
            else if (this.valueArea.value > this.Max) {
                this.Current = this.Max;
            }
            this.toddler.style.left = `calc(${(this.Current - this.Min) / this.commonValue * 100}%)`;
            this.filledArea.style.width = this.toddler.style.left;
        });

        window.addEventListener(`resize`, () => {
            if (this.isShowStep) {
                this._removeForRecount(this.numbersBar);
                this._removeForRecount(this.stepBar);
                this._addNumberScale(this.numbersBar, this._widthInit(this.numbersBar));
                this._addStepScale(this.stepBar, this.numbersBar);
                this._alignElements(this.stepBar, this.numbersBar);
            }
        })
            }

    _onMouseDown(e) {
        e.preventDefault();
        this.isMouseDown = true;
        this.toddlerCoords = this._getCoords.call(this, this.toddler);
        this.shiftX = e.pageX - this.toddlerCoords.left;
        if (this.isShowStep && this.container.offsetWidth % this.shiftX !== Math.round(this.commonValue % this.Step) ||
            this.shiftX < this.container.offsetWidth / (this.numbersBar.children.length - 1)) {
            this.shiftX = roundToStep(this.shiftX, (this.container.offsetWidth / (this.commonValue / this.Step)));
        }
        this.toddler.style.left = `calc(${this.toddler.style.left} + ${this.shiftX}px)`;
        this.filledArea.style.width = this.toddler.style.left;
        this.filledArea.style.width = this.filledArea.offsetWidth > this.container.offsetWidth ? 
            this.container.offsetWidth + `px` : this.filledArea.style.width;
        this.newCurrent = Math.round(this.commonValue * this.filledArea.offsetWidth /
            this.container.offsetWidth + this.Min);
        this.Current = this.isShowStep ? roundToStep(this.newCurrent, this.Step) : this.newCurrent;
        this.Current = this.Current < this.Min ? this.Min : this.Current;
        this.Current = this.Current > this.Max ? this.Max : this.Current;
        this.valueArea.value = this.Current;
    }

    _onMouseMove(e) {
        if (this.isMouseDown) {
            this.sliderCoords = this._getCoords.call(this, this.slider);
            this.newLeft = e.pageX - this.sliderCoords.left;
            if (this.isShowStep && this.container.offsetWidth % this.newLeft !== this.commonValue % this.Step ||
                this.newLeft < this.container.offsetWidth / this.commonValue / this.Step) {
                this.newLeft = roundToStep(this.newLeft, (this.container.offsetWidth / (this.commonValue / this.Step)));
            }
            if (this.newLeft < 0) this.newLeft = 0;
            let rightSide = this.slider.clientWidth - this.toddler.offsetWidth;
            if (this.newLeft > rightSide) this.newLeft = rightSide;
            this.toddler.style.left = this.newLeft + 'px';
            this.filledArea.style.width = this.toddler.style.left;
            this.newCurrent = this.commonValue * this.filledArea.offsetWidth /
            this.container.offsetWidth + this.Min;
            this.Current = this.isShowStep ? roundToStep(this.newCurrent, this.Step) : Math.round(this.newCurrent);
            this.Current = this.Current < this.Min ? this.Min : this.Current;
            this.Current = this.Current > this.Max ? this.Max : this.Current;
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
        this.toddler.style.left = `calc(${(this.Current - this.Min) / this.commonValue * 100}%`;
        this.filledArea.style.width = this.toddler.style.left;
    }

    Progress () {
        if (this.container.offsetWidth - parseInt(this.toddler.style.left) < this.container.offsetWidth / (this.commonValue / this.Step ||
            this.newLeft < this.container.offsetWidth / this.commonValue)) {
            this.toddler.style.left = `${this.container.offsetWidth}px`;
        }
        else {
            this.toddler.style.left = (this.filledArea.offsetWidth + this.container.offsetWidth / (this.commonValue / this.Step)) + `px`;
        }
        this.filledArea.style.width = this.toddler.style.left;
        this.newCurrent = roundToStep(this.commonValue * this.filledArea.offsetWidth /
            this.container.offsetWidth + this.Min, this.Step);
        this.Current = this.newCurrent;
        this.valueArea.value = this.Current;
    }

    _widthInit (barForRender) {
        if (Math.abs(this.Max > Math.abs(this.Min))) {
            this.compareWidth = barForRender.appendChild(this._createNumberValue(this.Max));
        }
        else {
            this.compareWidth = barForRender.appendChild(this._createNumberValue(this.Min));
        }
        return this._countOfSteps(this.compareWidth);
    }

    _addNumberScale (numbersBar, countOfSteps) {
        let currentInnerValue = this.Min;
        this.Multiplier = this.commonValue / countOfSteps;
        this.Multiplier = (this.commonValue % this.Multiplier === 0) ?
            this.Multiplier : roundToStep(this.commonValue / countOfSteps, this.Step);
        for (let j = 0; j < countOfSteps + 1; j++) {
            if (j === Math.ceil(countOfSteps)) {
                currentInnerValue = this.Max;
            }
            numbersBar.appendChild(this._createNumberValue(currentInnerValue));
            currentInnerValue = currentInnerValue + this.Multiplier;
        }
    }

    _addStepScale (stepBar, numbersBar) {
        let valueOfStep = this.Min;
        for (let i = 0; i < numbersBar.children.length; i++) {
            stepBar.appendChild(this._createMainDivision(valueOfStep));
            valueOfStep = numbersBar.children[i].value;
            if (i !== numbersBar.children.length - 1 && this.Step !== this.commonValue / (numbersBar.children.length - 1)) {
                stepBar.appendChild(this._createAdditionalDivision());
            }
        }
        if (!this.isEvenlyStep && this.commonValue % (numbersBar.children.length - 1) !== 0) {
            this.stepBar.lastChild.style.marginLeft = -(this.commonValue % this.Step / this.commonValue) * this.container.offsetWidth + `px`;
            // this.stepBar.firstChild.style.marginRight = -(this.commonValue % this.Step / this.Max) * this.container.offsetWidth * 2 + `px`;
        }
    }

    _createMainDivision (valueOfStep) {
        this.divisionContainer = document.createElement('div');
        this.divisionContainer.classList.add('mainDivision');
        this.divisionContainer.value = String(valueOfStep);
        return this.divisionContainer;
    }

    _createAdditionalDivision () {
        this.division = document.createElement('div');
        this.division.classList.add('additionalDivision');
        return this.division;
    }

    _createNumberValue (innerStepValue) {
        this.numberValue = document.createElement('div');
        this.numberValue.classList.add('numbers');
        this.numberValue.value = innerStepValue;
        this.numberValue.innerText = this.isRoundScale ? this._roundStepValue(innerStepValue): innerStepValue;
        return this.numberValue;
    }

    _countOfSteps (element) {
        this.commonWidth = 0;
        let countElements = 1;
        while (this.commonWidth < this.container.offsetWidth) {
            this.commonWidth += element.offsetWidth;
            countElements++;
        }

        this.numbersBar.removeChild(element);
        this.averageWidth = this.commonWidth / countElements;
        this.CountOfSteps = this.isRoundScale ? Math.round(this.container.offsetWidth / this.averageWidth * 0.4) : 
            Math.round(this.container.offsetWidth / this.averageWidth * 0.8);
        if (this.commonValue %  this.CountOfSteps !== 0) {
            while (this.commonValue %  this.CountOfSteps !== 0) {
                this.CountOfSteps--;
            }
        }

        return this.CountOfSteps > this.commonValue / this.Step ? this.commonValue / this.Step : this.CountOfSteps;
    }

    _alignElements (steps, numbers) {
        let stepCoords = [];
        for (let step of steps.children) {
            let coord = this._getCoords.call(this, step);
            if (step.value) {
                stepCoords.push(coord.left);
            }
        }

        let previousWidth = 0;
        for (let i = 0; i < numbers.children.length; i++) {
            numbers.children[i].style.left = this._indentCalculation(numbers.children[i], stepCoords[i], previousWidth) + `px`;
            previousWidth = previousWidth + numbers.children[i].offsetWidth;
        }

        if (parseInt(numbers.children[numbers.children.length - 1].style.left) < parseInt(numbers.children[numbers.children.length - 2].style.left)) {
            numbers.removeChild(numbers.children[numbers.children.length - 2]);
            numbers.children[numbers.children.length - 1].style.left =
                this._indentCalculation(numbers.children[numbers.children.length - 1],
                    stepCoords[stepCoords.length - 1] + numbers.children[numbers.children.length - 2].offsetWidth * 2,
                    previousWidth) + `px`;
        }
    }

    _indentCalculation (item, stepLeft, previousWidth) {
        const indent = stepLeft - previousWidth - item.offsetWidth / 2 - this.containerCoords.left;
        return indent;
    }

    _removeForRecount (parent) {
        while (parent.firstChild) parent.removeChild(parent.lastChild);
    }

    _roundStepValue (value) {
        let innerText = value;
        if (Math.abs(value) >= 1000000) {
            if (value % 1000000 !== 0) {
                innerText = (value / 1000000).toFixed(2) + `m`;
            }
            else {
                innerText = value / 1000000 + `M`;
            }
            return innerText;
        }
        if (Math.abs(value) >= 1000 && Math.abs(value) < 1000000 && value !== 0) {
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
