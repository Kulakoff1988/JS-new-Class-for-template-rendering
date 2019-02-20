
const sing = document.querySelector('#table');
const newData = new Project1 ({
    Target: sing,
    Template: `<div class="user-card">
                    <div class="template">%Name%</div>
                    <div class="template" id="date-of-birth">%Age%</div>
                    <textarea class="template" id="textarea">%Comment%</textarea>
                    <button class="template" id="btn-save">Save</button>
                    <button class="template" id="btn-remove">Remove</button>
               </div>`,

    Users: []
});

newData.Slaves = [{Name: 'Niger', Age: 25, Comment: 'best courier'}];