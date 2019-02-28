
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
        this.valueArea.type = 'textarea';
        this.valueArea.classList.add('valueArea');
        this.valueArea.value = this.Current;
        this.filledArea.classList.add('filledArea');
        this.slider.id = 'slider';
        this.toddler.classList.add('thumb');
        this.toddler.style.left = `calc(${(this.Current - this.Min) / (this.Max - this.Min) * 100}%`;
        this.filledArea.style.width = this.toddler.style.left;
        this.slider.appendChild(this.filledArea);
        this.slider.appendChild(this.toddler);
        this.Target.appendChild(this.slider);
        this.Target.appendChild(this.stepBar);
        // this.stepBar.style.width = this.Target.style.width;
        this._addSteps(this.stepBar);
        this.Target.appendChild(this.valueArea);
        this.slider.addEventListener('mousedown', this._onMouseDown.bind(this));
        document.addEventListener('mousemove', this._onMouseMove.bind(this));
        document.addEventListener('mouseup', this._onMouseUp.bind(this))
    }

    _onMouseDown(e) {
        e.preventDefault();
        this.isMouseDown = true;
        this.toddlerCoords = ValueBar.getCoords.call(this, this.toddler);
        this.shiftX = e.pageX - this.toddlerCoords.left;
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

    Progress(Step = this._Config.Step){

    }

    _addSteps (targetForSteps) {
        let countOfSteps = this.Max / this.Step;
        const   stepBarWidth = parseInt(targetForSteps.style.width),
                numbersBar = document.createElement('div'),
                startStepValue = document.createElement('div'),
                endStepValue = document.createElement('div'),
                startStep = document.createElement('div'),
                endStep = document.createElement('div');
        numbersBar.classList.add('numbersBar');
        startStepValue.innerText = this.Min;
        endStepValue.innerText = this.Max;
        startStepValue.classList.add('startStep');
        endStepValue.classList.add('endStep');
        startStep.classList.add('startStep');
        endStep.classList.add('endStep');
        this.Target.appendChild(numbersBar);
        numbersBar.appendChild(startStepValue);
        targetForSteps.appendChild(startStep);
        let currentInnerValue = this.Min;
        for (let i = 1; i < countOfSteps; i++) {
            currentInnerValue = currentInnerValue + this.Step;
            numbersBar.appendChild(this._createStepsValue(currentInnerValue));
        }
        targetForSteps.appendChild(endStep);
        numbersBar.appendChild(endStepValue);
        const children = numbersBar.children;
        let commonWidth = 0;
        for (let child of children) {
            commonWidth = commonWidth + child.offsetWidth;
        }
        const averageWidth = commonWidth / children.length / 0.8;
        countOfSteps = this.Target.offsetWidth / averageWidth;
        console.log(Math.round(countOfSteps));
        const n = Math.round(countOfSteps / 20);
        console.log(n);
        if (commonWidth > this.Target.offsetWidth) {
            for (let i = 0; i <= countOfSteps; i = i + n) {
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
