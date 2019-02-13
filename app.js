
const sing = document.querySelector('#table');



const newData = new Project1 ({
    Target: sing,
    Template: {
        Name: 'div',
            NameProperties: {
                value: 'Name',
                class: 'caption'
        },
        Age: 'div',
            AgeProperties: {
                value: 'Age',
                class: 'date-of-birth',
                type: 'text'
        },
        Comment: 'textarea',
            CommentProperties: {
                value: 'Comment',
                class: 'textarea'
        },
        SaveButtonTemplate: 'button',
            SaveButtonTemplateProperties: {
                class: 'Button',
                value: 'Save'
        },
        RemoveButtonTemplate: 'input',
            RemoveButtonTemplateProperties: {
                type: 'button',
                value: 'Remove',
                id: 'remove'
        }
    },
    Users: []
});


newData.Slaves = [{Name: 'Niger', Age: 25, Comment: 'best courier'}];