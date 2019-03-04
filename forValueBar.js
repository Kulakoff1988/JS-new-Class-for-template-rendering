const valueBar = document.querySelector('.sliderContainer');

const Bar = new ValueBar ({
    Target: valueBar,
    Width: `300px`,
    Max: 1100,
    Min: 0,
    Current: 0,
    isShowStep: true,
    Step: 1
});
