
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
        this.filledArea.classList.add('filledArea');
        this.slider.id = 'slider';
        this.toddler.classList.add('thumb');
        this.toddler.style.left = `calc(${(this.Current - this.Min) / (this.Max - this.Min) * 100}%`;
        this.filledArea.style.width = this.toddler.style.left;
        this.slider.appendChild(this.filledArea);
        this.slider.appendChild(this.toddler);
        this.Target.appendChild(this.slider);
        this.Target.addEventListener('mousedown', this._onMouseDown.bind(this));
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
        console.log(this.filledArea.style.width)

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
            //console.log(this.Current)
        }
    }

    _onMouseUp() {
        this.isMouseDown = false;
        this.newCurrent = Math.round((this.Max - this.Min) * parseInt(this.filledArea.style.width) /
            parseInt(this.Target.style.width) + this.Min);
        this.Current = this.newCurrent;
        console.log(this.Target.style.width)
        //console.log(this.Current)
    }

    static getCoords(elem) {
        let box = elem.getBoundingClientRect();
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
    }

    Progress(Step = this._Config.Step){

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
