const targetTag = document.querySelector('.targetForHumans');
const newData1 = new Project1 ({
    Target: targetTag,
    Template: `<div class="user-card">
                    <div class="template">%Name%</div>
                    <div class="template" id="date-of-birth">%Age%</div>
                    <textarea class="template" id="textarea">%Comment%</textarea>
                    <button class="template" id="btn-save">Save</button>
                    <button class="template" id="btn-remove">Remove</button>
               </div>`,
    Users: []
});

newData1.Slaves =[{Name: 'Sara Conor', Age: 40, Comment: 'killer'}, {Name: 'John Conor', Age: 15, Comment: "Sara's son"}];

const   dataAreasContainer = document.querySelector('.maincontent'),
        navigatorButtons = document.querySelectorAll('.visually-hidden'),
        dataAreasList = dataAreasContainer.children,
        tabsButtons = document.querySelectorAll('.humansChoiceInput'),
        contentPanels = document.querySelectorAll('.panelsForHumans');

const   switchButtonsHandler = (buttons, switchableAreas) => {
            for (let i = 0; i < switchableAreas.length; i ++) {
                switchCurrentRender(buttons[i], switchableAreas[i], switchableAreas);
            }
        },

        switchCurrentRender = (activeButton, areaToActive, areasToRemove) => {
            activeButton.addEventListener('click', () => {
                removeInactiveAreas(areasToRemove);
                areaToActive.classList.add('displayOn');
            });
        },

        removeInactiveAreas = areasToRemove => {
            for (let areaToRemove of areasToRemove) {
                areaToRemove.classList.remove('displayOn');
            }
        };

switchButtonsHandler(navigatorButtons, dataAreasList);
switchButtonsHandler(tabsButtons, contentPanels);


const Areas = {
    ButtonToShow: '',
    Area: ''
};