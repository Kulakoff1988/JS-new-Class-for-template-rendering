
const   ButtonAdd = document.querySelector('#add'),
        nameForm = document.querySelector('#nameForm'),
        ageForm = document.querySelector('#ageForm'),
        commentForm = document.querySelector('#commentForm'),

        clearForm =() => {
            nameForm.value = '';
            ageForm.value = '';
            commentForm.value = '';
        },

        replacer = (item, template) => {
            const words = template.match(/\b\w+\b(?=%)/g);
            for (word of words) {
                if (!item.hasOwnProperty(word)) item[word] = ``;
            }
            for (let key of Object.getOwnPropertyNames(item)) {
                template = template.replace(/\b\w+\b(?=%)/g, item[key]);
            }
            words.map(word => {
                template.replace(new RegExp(`${word}%`), item[word]);
            });
            console.log(template);
            return template;
        },

        create_DOM_element = (tagValue, tagName = 'div') => {
            const DOM_name = document.createElement(tagName);
            DOM_name.innerHTML = tagValue;
            return DOM_name.firstChild;
        };

class Project1 {
    constructor ({  Target = void 0,
                    Template = ``,
                    Users = [],
                }) {
        this.Users = Users;``
        this.Target = Target;
        this.Template = Template;

        ButtonAdd.addEventListener('click', () => {
            this.Add({  Name: nameForm.value,
                        Age: +ageForm.value,
                        Comment: commentForm.value});
            clearForm();
        });

        document.addEventListener('keydown', evt => {
            if(evt.keyCode === 13) {
                this.Add({Name: nameForm.value, Age: ageForm.value, Comment: commentForm.value});
                clearForm()
            }
        });

    }

    get Slaves() {
     return this.Users;
    }

    set Slaves(data) {
        this.Users = data;
        this._removeCurrentRendering();
        this._render();
    }

    Add (item) {
        this.Users.push(item);
        this._addElementRendering(item);
    }

    RemoveAll () {
        this.Users.length = 0;
        this._removeCurrentRendering();
    }

    _render () {
        for (let u of this.Users) {
            this._addElementRendering(u);
        }
    }

    _removeCurrentRendering (parent = this.Target) {
        while (parent.firstChild) parent.removeChild(parent.lastChild);
    }

    _addElementRendering (user) {
        const replaceStr = this.Template;
        const newLine = create_DOM_element(replacer(user, replaceStr));
        const saveButton = newLine.querySelector('.btn-save');
        const removeButton = newLine.querySelector('.btn-remove');
        const ageArea = newLine.querySelector('.date-of-birth');
        const commentArea = newLine.querySelector('.textarea');
        removeButton.addEventListener('click', user => {
            this.Users.splice(this.Users.indexOf(user), 1);
            this.Target.removeChild(newLine);
        });
        saveButton.addEventListener('click', () => {
            user.Age = ageArea.value || user.Age;
            user.Comment = commentArea.value || user.Comment;
        });
        this.Target.appendChild(newLine);
    };
}
