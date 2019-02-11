const sing = document.querySelector('#table');

const newData = new Project1({
    Target: sing,
    Template: `<td>${Comment}</td>>`,
    Users: []
});


//newData.Slaves = [{Name: 'Niger', Age: 12, Comment: 'best courier'}];
newData.Add({Name: 'Gustav', Age: 12, Comment: 'best courier'});
