const valueBar = document.querySelector('.sliderContainer');

const Bar = new ValueBar ({
    Target: valueBar,
    Max: 1000,
    Min: 0,
    Current: 743,
    isShowStep: true,
    Step: 50
});
