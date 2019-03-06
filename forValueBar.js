const valueBar = document.querySelector('.sliderContainer');

const Bar = new ValueBar ({
    Target: valueBar,
    Max: 1000,
    Min: 500,
    Current: 0,
    isShowStep: true,
});
