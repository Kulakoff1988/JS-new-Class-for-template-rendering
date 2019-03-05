const valueBar = document.querySelector('.sliderContainer');

const Bar = new ValueBar ({
    Target: valueBar,
    Max: 2000,
    Min: 0,
    Current: 200,
    isShowStep: true,
    Step: 200
});
