
const sing = document.querySelector('#table');



const newData = new Project1 ({
    Target: sing,
    Template: `<div class="user-card">
                  <div class="caption">%Name%</div>
                  <input class="date-of-birth" type="text" value="%Age%">
                  <textarea class="textarea">%Comment%</textarea>   
                  <button class="button p1-btn-save">Save</button>
                </div>`,
    Users: []
});


newData.Slaves = [{Name: 'Niger', Age: 25, Comment: 'best courier'}, {Name: 'Tor', Age: 80, Comment: 'God'}];