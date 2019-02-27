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

const   switchButtonsHandler = handlerList => {
        for (let areaToShow of handlerList) {
            switchCurrentRender(areaToShow.ActiveButton, areaToShow.Area, handlerList);
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
            areaToRemove.Area.classList.remove('displayOn');
        }
    };

const   dataAreasContainer = document.querySelector('.maincontent'),
        navigatorButtons = document.querySelector('.navigator'),
        dataAreasList = dataAreasContainer.children,
        tabsForHumans = document.querySelector('.tabsForHumans'),
        humansPanels = document.querySelector('.Humans'),
        tabsButtons = document.querySelectorAll('.humansChoiceInput'),
        contentPanels = document.querySelectorAll('.panelsForHumans');

const mainContentHandler = [
    {
        ActiveButton: navigatorButtons.querySelector('#Humans'),
        Area: dataAreasContainer.querySelector('.Humans'),
    },
    {
        ActiveButton: navigatorButtons.querySelector('#Elfs'),
        Area: dataAreasContainer.querySelector('.Elfs'),
    },
    {
        ActiveButton: navigatorButtons.querySelector('#Orcs'),
        Area: dataAreasContainer.querySelector('.Orcs'),
    },
    {
        ActiveButton: navigatorButtons.querySelector('#Trolls'),
        Area: dataAreasContainer.querySelector('.Trolls'),
    },
    {
        ActiveButton: navigatorButtons.querySelector('#Gnomes'),
        Area: dataAreasContainer.querySelector('.Gnomes'),
    },
    {
        ActiveButton: navigatorButtons.querySelector('#Ogres'),
        Area: dataAreasContainer.querySelector('.Ogres'),
    },
    {
        ActiveButton: navigatorButtons.querySelector('#Protos'),
        Area: dataAreasContainer.querySelector('.Protos'),
    }
    ],

    tabsForHumansHandler = [
    {
        ActiveButton: tabsForHumans.querySelector('#humansChoice-1'),
        Area: humansPanels.querySelector('#area8'),
    },
    {
        ActiveButton: tabsForHumans.querySelector('#humansChoice-2'),
        Area: humansPanels.querySelector('#area9'),
    },
    {
        ActiveButton: tabsForHumans.querySelector('#humansChoice-3'),
        Area: humansPanels.querySelector('#area10'),
    }
    ];

switchButtonsHandler(mainContentHandler);
switchButtonsHandler(tabsForHumansHandler);
