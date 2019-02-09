const sing = document.querySelector('#table');

const newData = new Project1({
    Target: sing,
    Users: []
});

newData.Add({Name: 'Gustav', Age: 12, Comment: 'best courier'});
newData.Slaves = [{Name: 'Niger', Age: 12, Comment: 'best courier'}];
