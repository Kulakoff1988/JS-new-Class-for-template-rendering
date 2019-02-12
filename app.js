const sing = document.querySelector('#table');

const newData = new Project1 ({
    Target: sing,
    Template: `<div class="user-card">
                  <div class="caption">%Name%</div>
                  <input class="date-of-birth" type="text" value="%Age%">
                  <textarea class="textareat">%Comment%</textarea>   
                  <button class="button">Save</button>
                </div>`,
    Users: []
});


newData.Slaves = [{Name: 'Niger', Age: 25, Comment: 'best courier'}, {Name: 'Gustav', Age: 21, Comment: 'best seller'}];
