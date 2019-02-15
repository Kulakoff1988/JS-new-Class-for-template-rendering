
const   ButtonAdd = document.querySelector('#add'),
        nameForm = document.querySelector('#nameForm'),
        ageForm = document.querySelector('#ageForm'),
        commentForm = document.querySelector('#commentForm'),

        clearForm =() => {
            nameForm.value = '';
            ageForm.value = '';
            commentForm.value = '';
        },

        userPropertyDefiner = (user, propertyTemplate) => {
            const words = propertyTemplate.match(/\b\w+\b(?=%)/g);
            for (let word of words) {
                if (!user.hasOwnProperty(word) || user[word] === ``) user[word] = `Not specified`;
            }
            return user;
        },

        replacer = (item, template) => {
            for (let key of Object.getOwnPropertyNames(item)) {
                template = template.replace(new RegExp(`${key}%`), item[key]);
            }
            return template;
        },

        create_DOM_element = (tagValue, tagName = 'div') => {
            const DOM_name = document.createElement(tagName);
            DOM_name.innerHTML = tagValue;
            return DOM_name.firstChild;
        },

        makeCurrentRender = (user, template) => {

        };

class Project1 {
    constructor ({  Target = void 0,
                    Template = ``,
                    Users = [],
                }) {
        this.Users = Users;
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
        this.Users = data.map(user => {
             return userPropertyDefiner(user, this.Template);
        });
        this._removeCurrentRendering();
        this._render();
    }

    Add (item) {
        this.Users.push(userPropertyDefiner(item, this.Template));
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
        const replaceStr = this.Template,
            newDOM = create_DOM_element(replacer(user, replaceStr)),
            saveButton = newDOM.querySelector('.btn-save'),
            ageArea = newDOM.querySelector('.date-of-birth'),
            commentArea = newDOM.querySelector('.textarea'),
            removeButton = newDOM.querySelector('.btn-remove');
        removeButton.addEventListener('click', user => {
            this.Users.splice(this.Users.indexOf(user), 1);
            this.Target.removeChild(newDOM);
        });
        saveButton.addEventListener('click', () => {
            user.Age = +ageArea.value < 0 ? user.Age : +ageArea.value;
            user.Comment = commentArea.value || user.Comment;
        });
        for (let element of newDOM.getElementsByTagName('*')) {
            if (element.outerHTML.search(/Not specified/) != -1) element.classList.add('hidden');
        }   
        this.Target.appendChild(newDOM);
    };
}
