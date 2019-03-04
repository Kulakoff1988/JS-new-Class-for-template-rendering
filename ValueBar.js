const roundToStep = (value, step) => {
    return Math.round(value / step) * step;
};


class ValueBar {
    constructor({
                    Target = null,
                    Width = null,
                    Max = null,
                    Min = 0,
                    Current = Min,
                    isShowStep = false,
                    Step = null
                }){
        this.Target = Target;
        this.Width = Width;
        this.Max = Max;
        this.Min = Min;
        this.Current = Current;
        this.isShowStep = isShowStep;
        this.Step = Step ? Math.abs(Step) : 1;

        this.slider = document.createElement('div');
        this.toddler = document.createElement('div');
        this.filledArea = document.createElement('div');
        this.valueArea = document.createElement('input');
        this.stepBar = document.createElement('div');

        this.stepBar.classList.add('stepBar');
        this.valueArea.classList.add('valueArea');
        this.filledArea.classList.add('filledArea');
        this.toddler.classList.add('thumb');
        this.slider.id = 'slider';
        this.valueArea.type = 'number';
        this.Target.style.width = this.Width;
        this.valueArea.style.width = `80px`;

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
        if (this.isShowStep) this._addSteps(this.stepBar);
        this.Target.appendChild(this.valueArea);

        this.slider.addEventListener('mousedown', this._onMouseDown.bind(this));
        document.addEventListener('mousemove', this._onMouseMove.bind(this));
        document.addEventListener('mouseup', this._onMouseUp.bind(this));
        this.valueArea.addEventListener('input', () => {
            this.Current = this.valueArea.value > this.Max ? this.Max : this.valueArea.value;
            this.Current = roundToStep(this.Current, this.Step);
            this.toddler.style.left = `calc(${(this.Current - this.Min) / (this.Max - this.Min) * 100}%`;
            this.filledArea.style.width = this.toddler.style.left;
        })
    }

    _onMouseDown(e) {
        e.preventDefault();
        this.isMouseDown = true;
        this.toddlerCoords = ValueBar.getCoords.call(this, this.toddler);
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
        console.log(this.toddler.style.left);
    }

    _onMouseMove(e) {
        if (this.isMouseDown) {
            this.sliderCoords = ValueBar.getCoords.call(this, this.slider);
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
            this.newCurrent = Math.round((this.Max - this.Min) * this.filledArea.offsetWidth /
                this.Target.offsetWidth + this.Min);
            this.Current = this.Current > this.Max ? this.Max : this.isShowStep ? roundToStep(this.newCurrent, this.Step) : this.newCurrent;
            this.valueArea.value = this.Current
        }
    }

    _onMouseUp() {
        this.isMouseDown = false;
    }

    static getCoords(elem) {
        const box = elem.getBoundingClientRect();
        return {
            left: box.left,
            top: box.top + pageYOffset
        }
    }

    get Value (){
        return this.Current;
    }

    set Value (newValue){
        this.Current = newValue;
    }

    Progress () {
        if (this.Target.offsetWidth - parseInt(this.toddler.style.left) < this.Target.offsetWidth / ((this.Max - this.Min) / this.Step ||
            this.newLeft < this.Target.offsetWidth / (this.Max - this.Min))) {
            this.toddler.style.left = `${this.Target.offsetWidth}px`;
        }
        else {
            console.log(this.Target.offsetWidth / ((this.Max - this.Min) / this.Step));
            this.toddler.style.left = (this.filledArea.offsetWidth + this.Target.offsetWidth / ((this.Max - this.Min) / this.Step)) + `px`;
        }
        this.filledArea.style.width = this.toddler.style.left;
        this.newCurrent = roundToStep((this.Max - this.Min) * this.filledArea.offsetWidth /
            this.Target.offsetWidth + this.Min, this.Step);
        this.Current = this.newCurrent;
        this.valueArea.value = this.Current;
    }

    _addSteps (targetForSteps) {
        const numbersBar = document.createElement('div');
        numbersBar.classList.add('numbersBar');
        numbersBar.style.width = this.Target.offsetWidth + this.Target.offsetWidth * 0.05 + `px`;
        this.Target.appendChild(numbersBar);
        let currentInnerValue = this.Min;
        this.CountOfSteps = (this.Max - this.Min) / this.Step;
        this.Multiplier = roundToStep(this.Max / this.CountOfSteps, this.Step);
        for (let i = 0; i < this.CountOfSteps + 1; i++) {
            targetForSteps.appendChild(this._createStep());
        }
        for (let j = 0; j < this.Max / this.Multiplier + 1; j++) {
            numbersBar.appendChild(this._createStepsValue(currentInnerValue));
            currentInnerValue = currentInnerValue + this.Multiplier;
            if (currentInnerValue > this.Max) {
                currentInnerValue = this.Max;
            }
        }
    }

    _createStep () {
        this.division = document.createElement('div');
        this.division.classList.add('division');
        return this.division;
    }

    _createStepsValue (innerStepValue) {
        this.stepValue = document.createElement('div');
        this.stepValue.classList.add('numbers');
        this.stepValue.innerText = this._roundStepValue(innerStepValue);
        return this.stepValue;
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


// |===============--------|
//  , , ,  ,, , , , , , , , ,
// 0  10  20  30  40  50  60
