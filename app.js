const sing = document.querySelector('#table');



const newData = new Project1 ({
    Target: sing,
    Template: `<div class="user-card">
                  <div class="caption">Name%</div>
                  <input class="date-of-birth" type="number" value="Age%">
                  <textarea class="textarea">Comment%</textarea>
                  <button class="btn-save">Save</button>
                  <input type="button" class="btn-remove" value="Remove">
                </div>`,

    Users: []
});

newData.Slaves = [{Name: 'Niger', Age: 25, Comment: 'best courier'}, {Name: 'Gustav', Age: 20, Comment: 'best HR'}];

