

const   ButtonAdd = document.querySelector('#add'),
        name = document.querySelector('#name'),
        age = document.querySelector('#age'),
        comment = document.querySelector('#comment'),
        TemplateButtonSave = '<input type="button" value="Remove" id="remove">',

        clearForm =() => {
            name.value = '';
            age.value = '';
            comment.value = '';
        },


        replacer = (item, template) => {
            for (let key of Object.getOwnPropertyNames(item)) {
                template = template.replace(new RegExp(`%${key}%`), item[key]);
            }
            return template;
        },

    /**
     *
     * @param tagValue
     * @param tagName
     * @returns {Element}
     */
        create_DOM_element = (tagValue, tagName = 'div') => {
            const DOM_name = document.createElement(tagName);
            DOM_name.innerHTML = tagValue;
            return DOM_name.firstChild;
        };


class Project1 {
    constructor({   Target = void 0,
                    Template = ``,
                    Users = [],
                }) {
        this.Users = Users;
        this.Target = Target;
        this.Template = Template;

        ButtonAdd.addEventListener('click', () => {
            this.Add({  Name: name.value,
                        Age: age.value,
                        Comment: comment.value});
            clearForm()
        });

        document.addEventListener('keydown', evt => {
            if(evt.keyCode === 13) {
                this.Add({Name: name.value, Age: age.value, Comment: comment.value});
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
        this.Target.appendChild(this._addElementRendering({
            Name: item.Name || 'Not specified',
            Age: item.Age || 'Not specified',
            Comment: item.Comment || 'Not specified'
        }));
    };

    RemoveAll () {
        this.Users.length = 0;
        this._removeCurrentRendering();
    }

    _render () {
        for (let u of this.Users) {
            this.Target.appendChild(this._addElementRendering(u));
        }
    }

    _removeCurrentRendering (parent = this.Target) {
        while (parent.firstChild) parent.removeChild(parent.lastChild);
    }

    _addElementRendering (user) {
        const replaceStr = this.Template;
        const newLine = create_DOM_element(replacer(user, replaceStr));
        const ButtonSave = newLine.querySelector('.btn-save');

        const removeButton = create_DOM_element(TemplateButtonSave);
        newLine.insertAdjacentElement('beforeend', removeButton);
        removeButton.addEventListener('click', user => {
            this.Users.splice(this.Users.indexOf(user), 1);
            this.Target.removeChild(newLine);
        });
        return newLine;
    };
}
