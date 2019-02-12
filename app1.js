class Project1 {
    constructor({   Target = void 0,
                    Users = [],
                }) {
        this.Users = Users;
        this.Target = Target;
        
        const elem = document.querySelector('#add');
        const name = document.querySelector('#name');
        const age = document.querySelector('#age');
        const comment = document.querySelector('#comment');
        const clearForm = () => {
            name.value = '';
            age.value = '';
            comment.value = '';
        };

        elem.addEventListener('click', () => {
            this.Add({Name: name.value, Age: age.value, Comment: comment.value})
            clearForm()
        });
        
        document.addEventListener('keydown', evt => {
            if(evt.keyCode === 13) {
                this.Add({Name: name.value, Age: age.value, Comment: comment.value});
                clearForm()
            }
        });
     
        this.initialRender();
    }
    
    get Slaves() {
     return this.Users;
    }
    
    set Slaves(data) {
        this.Users = data;
        initialRender();
    }
    
    Add (item) {
        this.Users.push(item);
        this.addLine(item.Name, item.Age, item.Comment);
    };

    RemoveAll () {
        this.Users = [];
    }
    
    initialRender () {
        for (let i = 0; i < this.Users.length; i++) {
            this.addLine(this.Users[i].Name, this.Users[i].Age, this.Users[i].Comment);
        }
    }
    
    addLine (col1, col2, col3) {
        let newTr = document.createElement('tr');
        let newTd = document.createElement('td');
        newTd.innerText = col1;
        newTr.appendChild(newTd);
        let newTd1 = document.createElement('td');
        newTd1.innerText = col2;
        newTr.appendChild(newTd1);
        let newTd2 = document.createElement('td');
        newTd2.innerText = col3;
        newTr.appendChild(newTd2);
        this.Target.appendChild(newTr);
    };
}
