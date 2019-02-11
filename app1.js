class Project1 {
    constructor({   Target = void 0,
                    Template = ``,
                    Users = [],
                }) {
        this.Users = Users;
        this.Target = Target;
        this.Template = Template;

        const Name = '';
        const Age = '';
        const Comment = '';
        
        const addLine = document.querySelector('#add');
        /*
        const name = document.querySelector('#name');
        const age = document.querySelector('#age');
        const comment = document.querySelector('#comment');
        */
        const clearForm = () => {
            name.value = '';
            age.value = '';
            comment.value = '';
        };

        addLine.addEventListener('click', () => {
            this.Add({Name: name.value, Age: age.value, Comment: comment.value})
            clearForm();
        });
        
        document.addEventListener('keydown', evt => {
            if(evt.keyCode === 13) {
                this.Add({Name: name.value, Age: age.value, Comment: comment.value});
                clearForm()
            }
        });
        console.log(this.Users);
        this.Target.innerHTML = this.Template;
        //this._initialRender();
    }
    
    get Slaves() {
     return this.Users;
    }
    
    set Slaves(data) {
        this.Users = data;
        this._initialRender();
    }

    set Element(data) {
        this.Line = data;
        console.log(this.Line);
    }
    
    Add (item) {
        this.Users.push(item);
        console.log(this.Users);
        //this._addLine(item);
    };

    RemoveAll () {
        this.Users = [];
    }
    /*
    _initialRender () {
        for (let u of this.Users) {
            this._addLine(u);
        }
    }
    
    _addLine (item) {
        const nameLine = document.createElement(this.Line);
        nameLine.innerText = item.Name;
        this.Target.appendChild(nameLine);
        const ageLine = document.createElement(this.Line);
        ageLine.innerText = item.Age;
        this.Target.appendChild(ageLine);
        const commentLine = document.createElement(this.Line);
        commentLine.innerText = item.Comment;
        this.Target.appendChild(commentLine);
        this._removeButton(item, nameLine, ageLine, commentLine);
    };

    _removeButton (item, nameLine, ageLine, commentLine) {
        const remove = document.createElement('input');
        remove.type = 'button';
        remove.value = 'Delete';
        remove.id = 'remove';
        remove.class = 'remove';
        this.Target.appendChild(remove);

        remove.addEventListener('click', () => {
            this.Users.splice(this.Users.indexOf(item), 1);
            this.Target.removeChild(nameLine);
            this.Target.removeChild(ageLine);
            this.Target.removeChild(commentLine);
            this.Target.removeChild(remove);
        });
    };*/
}
