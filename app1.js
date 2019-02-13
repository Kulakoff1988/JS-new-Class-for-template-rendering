const   elem = document.querySelector('#add'),                              // кнопка добавления элементов из заполненных форм
        name = document.querySelector('#name'),                             // форма заполнения имени
        age = document.querySelector('#age'),                               // форма заполнения возраста
        comment = document.querySelector('#comment'),                       // форма заполнения комментария
        htmlOfButton = '<input type="button" value="Remove" id="remove">',  // шаблон кнопки удаления в HTML представлении

        clearForm =() => {                                                  //функция очистки форм
            name.value = '';
            age.value = '';
            comment.value = '';
        },

        replacer = (item, template) => {                                           // функция создания создания строки с требуемыми словами из шаблона
            for (let key of Object.getOwnPropertyNames(item)) {                     // принимает на вход объект с набором необходимых значений ключей
                template = template.replace(new RegExp(`%${key}%`), item[key]);     // возвращает строку
            }
            return template;
        },

        createDOM = (tagValue, tagName = 'div') => {                    // функция создания DOM-элемента, принимает на вход строку с HTML-содержанием
            const DOM_name = document.createElement(tagName);           // будущего элемента
            DOM_name.innerHTML = tagValue;                              // второй параметр передавать не обязательно (он затирается во время выполнения функции)
            return DOM_name.firstChild;                                 // возвращает DOM-элемент
        };


class Project1 {
    constructor({   Target = void 0,
                    Template = ``,
                    Users = [],
                }) {
        this.Users = Users;
        this.Target = Target;
        this.Template = Template;

        elem.addEventListener('click', () => {                          // триггер по клику на кнопке "Add", вызов метода Add и функции очистки форм
            this.Add({  Name: name.value,
                        Age: age.value,
                        Comment: comment.value});
            clearForm()
        });

        document.addEventListener('keydown', evt => {                   // триггер по нажатию Enter, вызов метода Add и функции очистки форм
            if(evt.keyCode === 13) {
                this.Add({Name: name.value, Age: age.value, Comment: comment.value});
                clearForm()
            }
        });

    }
    
    get Slaves() {                                                      // получение списка пользователей в виде массива объектов
     return this.Users;
    }
    
    set Slaves(data) {                                                  // присваивание данных списку пользователей
        this.Users = data;
        this._removeCurrentRendering();                                 // вызов очистки текущего рендеринга списка пользователей
        this._render();                                                 // вызов функции рендеринга
    }
    
    Add (item) {                                                        // добавление нового пользователя, принимает на вход объект
        this.Users.push(item);                                          // добавление нового пользователя в общий список пользователей
        this.Target.appendChild(this._addElementRendering({             // вызов метода отображения нового элемента
            Name: item.Name || 'Not specified',
            Age: item.Age || 'Not specified',
            Comment: item.Comment || 'Not specified'
        }));
    };

    RemoveAll () {                                                      // очистка списка пользователей, также очищает текущий рендеринг
        this.Users.length = 0;
        this._removeCurrentRendering();
    }

    _render () {                                                        // рендеринг страницы на основании полученных данных из списка пользователей
        for (let u of this.Users) {                                     // и шаблона
            this.Target.appendChild(this._addElementRendering(u));
        }
    }

    _removeCurrentRendering (parent = this.Target) {                    // очистка текущего рендеринга списка пользователей
        while (parent.firstChild) parent.removeChild(parent.lastChild);
    }
    
    _addElementRendering (user) {                                       // добавление рендеринга элемента, принимает на вход объект с данными пользователя
        const replaceStr = this.Template;
        const newLine = createDOM(replacer(user, replaceStr));          // создаём DOM-элемент из данных пользователя по шаблону
        const removeButton = createDOM(htmlOfButton);                   // создаём кнопку удаления элемента
        newLine.insertAdjacentElement('beforeend', removeButton);
        removeButton.addEventListener('click', user => {
            this.Users.splice(this.Users.indexOf(user), 1);
            this.Target.removeChild(newLine);
        });
        return newLine;
    };
}
