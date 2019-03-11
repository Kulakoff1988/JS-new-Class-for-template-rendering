const valueBar = document.querySelector('.target');

const Bar = new ValueBar ({
    Target: valueBar,
    Max: 15000,
    Min: -15000,
    Current: 0,
    isShowStep: true,
    Step: 1000,
});
