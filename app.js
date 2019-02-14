
const sing = document.querySelector('#table');



const newData = new Project1 ({
    Target: sing,
    TemplateName: {
        Tag: 'div',
        NameProperties: {
            value: 'Name',
            class: 'caption'
        }
    },
    TemplateAge: {
        Tag: 'div',
        AgeProperties: {
            value: 'Age',
            class: 'date-of-birth',
            type: 'text'
        }
    },
    TemplateCommet: {
        Tag: 'textarea',
        CommentProperties: {
            value: 'Comment',
            class: 'textarea'
        }
    },
    TemplateSaveButton: {
        Tag: 'button',
        TemplateSaveButtonProperties: {
            class: 'Button',
            value: 'Save'
        }
    },
    TemplateRemoveButton: {
        Tag: 'input',
        TemplateRemoveButtonProperties: {
            type: 'button',
            value: 'Remove',
            id: 'remove'
        }
    },
    Users: []
});


newData.Slaves = [{Name: 'Niger', Age: 25, Comment: 'best courier'}];