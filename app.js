const sing = document.querySelector('#table');

const newData = new Project1({
    Target: sing,
    Template:  `<tr class="title">
                <td>${Name}</td>
                <td>${Age}</td>
                <td>${Comment}</td>
                </t>`,
    Users: []
});


//newData.Slaves = [{Name: 'Niger', Age: 12, Comment: 'best courier'}];
newData.Add({Name: 'Gustav', Age: 12, Comment: 'best courier'});
