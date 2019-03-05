const valueBar = document.querySelector('.sliderContainer');

const Bar = new ValueBar ({
    Target: valueBar,
    Max: 100,
    Min: 0,
    Current: 20,
    isShowStep: true,
    Step: 10
});
