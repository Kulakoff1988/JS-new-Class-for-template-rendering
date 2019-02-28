
class ValueBar {
    constructor({
                    Target = null,
                    Max = null,
                    Min = 0,
                    Current = Min,
                    isShowStep = false,
                    Step = null
                }){
        this.Target = Target;
        this.Max = Max;
        this.Min = Min;
        this.Current = Current;
        this.isShowStep = isShowStep;
        this.Step = Math.abs(Step);
        this._Config = {
            Step: Step ? this.Step : 1,
        };

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
        this.valueArea.type = 'textarea';

        this.roundToStep = (value, step) => {
            return Math.round(value/step)*step;
        };

        if (this.Current % this.Step !== 0) {
            this.Current = this.roundToStep(this.Current, this.Step);
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
        if (isShowStep) this._addSteps(this.stepBar);
        this.Target.appendChild(this.valueArea);

        this.slider.addEventListener('mousedown', this._onMouseDown.bind(this));
        document.addEventListener('mousemove', this._onMouseMove.bind(this));
        document.addEventListener('mouseup', this._onMouseUp.bind(this));
        this.valueArea.addEventListener('keydown', evt => {
            if (evt.keyCode === 13) {
                this.Current = this.valueArea.value;
                this.toddler.style.left = `calc(${(this.Current - this.Min) / (this.Max - this.Min) * 100}%`;
                this.filledArea.style.width = this.toddler.style.left;
            }
        })
    }

    _onMouseDown(e) {
        e.preventDefault();
        this.isMouseDown = true;
        this.toddlerCoords = ValueBar.getCoords.call(this, this.toddler);
        this.shiftX = e.pageX - this.toddlerCoords.left;
        if (this.isShowStep && this.Target.offsetWidth % this.shiftX !== this.Max % this.Step || this.shiftX < this.Target.offsetWidth / this.CountOfSteps) {
            this.shiftX = this.roundToStep(this.shiftX, (this.Target.offsetWidth / this.CountOfSteps))
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
            this.sliderCoords = ValueBar.getCoords.call(this, this.slider);
            this.newLeft = e.pageX - this.sliderCoords.left;
            if (this.isShowStep && this.Target.offsetWidth % this.newLeft !== this.Max % this.Step || this.newLeft < this.Target.offsetWidth / this.CountOfSteps) {
                this.newLeft = this.roundToStep(this.newLeft, (this.Target.offsetWidth / this.CountOfSteps))
            }
            if (this.newLeft < 0) this.newLeft = 0;
            let rightSide = this.slider.clientWidth - this.toddler.offsetWidth;
            if (this.newLeft > rightSide) this.newLeft = rightSide;
            this.toddler.style.left = this.newLeft + 'px';
            this.filledArea.style.width = this.toddler.style.left;
            this.newCurrent = Math.round((this.Max - this.Min) * this.filledArea.offsetWidth /
                this.Target.offsetWidth + this.Min);
            this.Current = this.newCurrent;
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
        if (this.Target.offsetWidth - parseInt(this.toddler.style.left) < this.Target.offsetWidth / this.CountOfSteps) {
            this.toddler.style.left = `${this.Target.offsetWidth}px`;
        }
        else {
            this.toddler.style.left = (this.filledArea.offsetWidth + this.Target.offsetWidth / this.CountOfSteps) + `px`;
        }
        this.filledArea.style.width = this.toddler.style.left;
        this.newCurrent = Math.round((this.Max - this.Min) * this.filledArea.offsetWidth /
            this.Target.offsetWidth + this.Min);
        this.Current = this.newCurrent;
        this.valueArea.value = this.Current;
    }


    _addSteps (targetForSteps) {
        const   numbersBar = document.createElement('div');
        numbersBar.classList.add('numbersBar');
        this.Target.appendChild(numbersBar);
        let currentInnerValue = this.Min;
        this.CountOfSteps = (this.Max - this.Min) / this.Step;
        for (let i = 0; i < this.CountOfSteps + 1; i++) {
            targetForSteps.appendChild(this._createStep());
            numbersBar.appendChild(this._createStepsValue(currentInnerValue));
            currentInnerValue = currentInnerValue + this.Step;
            if (currentInnerValue > this.Max) {
                currentInnerValue = this.Max;
            }
        }
        if ((this.Max - this.Min) % this.Step !== 0) {
            const newMarginLeft = this.Target.offsetWidth *
                ((this.Max - this.Min) % this.Step) / (this.Max - this.Min) * 0.5;
            targetForSteps.lastChild.style.cssText = `margin-left: -${newMarginLeft}px`;
            // numbersBar.lastChild.style.cssText = `margin-left: -${newMarginLeft}px`;
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
        this.stepValue.innerText = String(innerStepValue);
        return this.stepValue;
    }
}

/*class Toddler {
    constructor({ slider, toddler }) {
        this.slider = document.querySelector(slider);
        this.toddler = document.querySelector(toddler);

        this.toddler.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this))

    }

    onMouseDown(e) {
        e.preventDefault();
        this.isMouseDown = true;
        this.toddlerCoords = this.getCoords.call(this, this.toddler);
        this.shiftX = e.pageX - this.toddlerCoords.left
    }

    onMouseMove(e) {
        if (this.isMouseDown) {
            this.sliderCoords = this.getCoords.call(this, this.slider);
            this.newLeft = e.pageX - this.shiftX - this.sliderCoords.left;

            if (this.newLeft < 0) this.newLeft = 0;
            let rightSide = this.slider.clientWidth - this.toddler.offsetWidth;
            if (this.newLeft > rightSide) this.newLeft = rightSide;

            this.toddler.style.left = this.newLeft + 'px'
        }
    }

    onMouseUp() {
        this.isMouseDown = false
    }

    getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            left: box.left,
            top: box.top + pageYOffset
        }
    }

}*/

/*new Toddler({
    slider: '#slider',
    toddler: '.thumb'
});*/

/*let Bar = new ValueBar({Max: 100, Step: 1,});


let inter = setInterval(()=>{
    Bar.Progress();
    //let isFinish = checkForFinish();
    if (isFinish){
        Bar.Value = 100;
        clearInterval(inter);
    }
}, 2000);*/



// |===============--------|
//  , , ,  ,, , , , , , , , ,
// 0  10  20  30  40  50  60
