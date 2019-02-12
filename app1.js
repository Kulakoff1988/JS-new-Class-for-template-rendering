class Project1 {
    constructor({   Target = void 0,
                    Template = ``,
                    Users = [],
                }) {
        this.Users = Users;
        this.Target = Target;
        this.Template = Template;
        
        const   doc = document,
                elem = doc.querySelector('#add'),
                name = doc.querySelector('#name'),
                age = doc.querySelector('#age'),
                comment = doc.querySelector('#comment'),
                clearForm = () => {
                    name.value = '';
                    age.value = '';
                    comment.value = '';
                };

        elem.addEventListener('click', () => {
            this.Add({Name: name.value, Age: age.value, Comment: comment.value})
            clearForm()
        });

        doc.addEventListener('keydown', evt => {
            if(evt.keyCode === 13) {
                this.Add({Name: name.value, Age: age.value, Comment: comment.value});
                clearForm()
            }
        });
     
        this._initialRender();
    }
    
    get Slaves() {
     return this.Users;
    }
    
    set Slaves(data) {
        this.Users = data;
        this._initialRender();
    }
    
    Add (item) {
        this.Users.push(item);
        this.Target.appendChild(this._addLine(item));
    };

    RemoveAll () {
        this.Users = [];
    }
    
    _initialRender () {
        this.newHtml = ``;
        for (let u of this.Users) {
            console.log(this._addLine(u));
            this.Target.appendChild(this._addLine(u));
        }
    }
    
    _addLine (user) {
        let replaceStr = this.Template;
        for (let i of Object.keys(user)) {
            replaceStr = replaceStr.replace(new RegExp(`%${i}%`), user[i]);
        }
        const replaceNode = document.createElement('div');
        replaceNode.innerHTML = replaceStr;
        const replaceChild = replaceNode.firstChild;
        const remove = document.createElement('input');
        remove.innerHTML = `<input type="button" value="Remove" id="remove">`;
        const removeButton = remove.firstChild;
        replaceChild.insertAdjacentElement('beforeend', removeButton);
        removeButton.addEventListener('click', user => {
            this.Users.splice(this.Users.indexOf(user), 1);
            this.Target.removeChild(replaceChild);
        });
        return replaceChild;
    };
}
