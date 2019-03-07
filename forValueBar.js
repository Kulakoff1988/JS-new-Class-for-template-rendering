const valueBar = document.querySelector('.target');

const Bar = new ValueBar ({
    Target: valueBar,
    Max: 2000,
    Min: -2000,
    Current: -500,
    Step: 20,
    isShowStep: true,
});
