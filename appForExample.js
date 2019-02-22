// const targetTag = document.querySelector('#tab-Target1');
// const newData1 = new Project1 ({
//     Target: targetTag,
//     Template: `<div class="user-card">
//                     <div class="template">%Name%</div>
//                     <div class="template" id="date-of-birth">%Age%</div>
//                     <textarea class="template" id="textarea">%Comment%</textarea>
//                     <button class="template" id="btn-save">Save</button>
//                     <button class="template" id="btn-remove">Remove</button>
//                </div>`,
//     Users: []
// });
//
// newData1.Slaves =[{Name: 'Sara Conor', Age: 40, Comment: 'killer'}];

const   dataAreasContainer = document.querySelector('.maincontent');

const   navigatorButtons = document.querySelectorAll('.visually-hidden');
        dataAreasList = dataAreasContainer.children;
        switchCurrentRender = buttonsToCheck => {
          [currentButton, ...restOfButtons] = buttonsToCheck;
          return currentButton.hasAttribute('checked') ? currentButton : switchCurrentRender(restOfButtons);
        };

const pusherFunction = (buttons, domsToRender) => {
    // if (buttons.length === 0) return;
    // const [button, ...buttonsRest] = buttons;
    // const [domToRender, ...domsToRenderRest] = domsToRender;
    // button.addEventListener('click', () => {
    //     domToRender.classList.add('displayOn');
    //     dataAreasList.map(e => e.classList.remove('displayOn'));
    // });
    // return pusherFunction(buttonsRest, domsToRenderRest);
    console.log(buttons.indexOf(switchCurrentRender(buttons)));
    for (let i = 0; i < domsToRender.length; i ++) {
        domsToRender[buttons.indexOf(switchCurrentRender(buttons))].classList.add('displayOn');
    }
};

pusherFunction(navigatorButtons, dataAreasList);