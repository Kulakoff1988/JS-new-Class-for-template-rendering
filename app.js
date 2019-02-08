const elem = document.querySelector('#add');
const sing = document.querySelector('#table');
const name = document.querySelector('#name');
const age = document.querySelector('#age');
const comment = document.querySelector('#comment');

//let Project1 = requre('SlaveControlle');

const newData = new Project1({
    Target: sing,
    Users: []
});

elem.addEventListener('click', () => newData.Add({Name: name.value, Age: age.value, Comment: comment.value}));
document.addEventListener('keydown', evt => {
    if(evt.keyCode === 13) {
        return newData.Add({Name: name.value, Age: age.value, Comment: comment.value});
    }
    if (evt.keyCode === 27) {
        newData.RemoveAll();
    }
});

newData.Add({Name: 'Gustav', Age: 12, Comment: 'best courier'});
newData.Slaves = [{Name: 'Nigel', Age: 12, Comment: 'best courier'}];
