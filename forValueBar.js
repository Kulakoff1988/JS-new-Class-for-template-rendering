const valueBar = document.querySelector('.sliderContainer');

const Bar = new ValueBar ({
    Target: valueBar,
    Max: 100,
    Min: -100,
    Current: 0,
    isShowStep: true,
    Step: -100
});
