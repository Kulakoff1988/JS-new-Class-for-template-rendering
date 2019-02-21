const   choiceButton1 = document.querySelector('#choice-1-1'),
        choiceButton2 = document.querySelector('#choice-1-2'),
        display_area_1 = document.querySelector('#display-area-1'),
        display_area_2 = document.querySelector('#display-area-2');

console.log(display_area_1.getAttribute('display'), display_area_2.classList);

choiceButton1.addEventListener('click', () => {
        display_area_2.classList.add('displayOff');
        display_area_1.classList.remove('displayOff');
});

choiceButton2.addEventListener('click', () => {
        display_area_1.classList.add('displayOff');
        display_area_2.classList.remove('displayOff');
});