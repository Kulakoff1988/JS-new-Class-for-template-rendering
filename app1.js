/**
 * @typedef {object} ProjectObject
 * @property {string} Name
 * @property {number} Age
 * @property {string} Comment
 */

class Project1 {
    constructor({   Target = void 0,
                    Users = [],
                }) {
        this.Users = Users;
        this.Target = Target;
        for (let i = 0; i < Users.length; i++) {
            let newTr = document.createElement('tr');
            let newTd = document.createElement('td');
            newTd.innerText = Users[i].Name;
            newTr.appendChild(newTd);
            let newTd1 = document.createElement('td');
            newTd1.innerText = Users[i].Age;
            newTr.appendChild(newTd1);
            let newTd2 = document.createElement('td');
            newTd2.innerText = Users[i].Comment;
            newTr.appendChild(newTd2);
            this.Target.appendChild(newTr);
        };
    }
    get Slaves() {
     return this.Users;
    }
    set Slaves(data) {
        this.Users = data;
    }
    /**
     *
     * @param {ProjectObject} Data
     */
    Add (item) {
        this.Users.push(item);
        let newTr = document.createElement('tr');
        let newTd = document.createElement('td');
        newTd.innerText = item.Name;
        newTr.appendChild(newTd);
        let newTd1 = document.createElement('td');
        newTd1.innerText = item.Age;
        newTr.appendChild(newTd1);
        let newTd2 = document.createElement('td');
        newTd2.innerText = item.Comment;
        newTr.appendChild(newTd2);
        this.Target.appendChild(newTr);
    };

    RemoveAll () {
        this.Users = [];
    }

    /**
     *
     * @param {Element} Target
     * @param {ProjectObject[]} [Data]
     */

}
