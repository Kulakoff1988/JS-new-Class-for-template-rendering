const DocumentList = [
    {ID: 1,   Description: 'Description1', Name: 'example-a.js', HeadingID: 1, MasterDocumentID: -1},
    {ID: 2,   Description: 'Description1', Name: 'example-h.js', HeadingID: 1, MasterDocumentID: 201},
    {ID: 3,   Description: 'Descripjpspf', Name: 'example-b.js', HeadingID: 3, MasterDocumentID: -1},
    {ID: 4,   Description: 'Description2', Name: 'example-i.js', HeadingID: 2, MasterDocumentID: -1},
    {ID: 5,   Description: 'Description2', Name: 'example-c.js', HeadingID: 2, MasterDocumentID: 4},
    {ID: 6,   Description: 'Description8', Name: 'example-j.js', HeadingID: 3, MasterDocumentID: -1},
    {ID: 7,   Description: 'Description1', Name: 'example-d.js', HeadingID: 1, MasterDocumentID: 201},
    {ID: 8,   Description: 'Descript9238', Name: 'example-k.js', HeadingID: 4, MasterDocumentID: 6},
    {ID: 9,   Description: 'cat1;kldfgdk', Name: 'example-e.js', HeadingID: 1, MasterDocumentID: -1},
    {ID: 10,   Description: 'rgh;kldfgdk', Name: 'example-l.js', HeadingID: 2, MasterDocumentID: -1},
    {ID: 11,   Description: 'catfdjdfgdk', Name: 'example-f.js', HeadingID: 3, MasterDocumentID: 1},
    {ID: 12,   Description: 'ca54654ldfgdk', Name: 'example-m.js', HeadingID: 5, MasterDocumentID: -1},
    {ID: 13,   Description: 'cahfgh46dfgdk', Name: 'example-g.js', HeadingID: 4, MasterDocumentID: -1},
];

const HeadingDict = {
    1: 'Palaces',
    2: 'Shakalo',
    3: 'Furbedo',
    4: 'Butarosuggo',
    5: 'Dubelo',
};

const Target = document.querySelector('.documents');

const newDoc = doc => {
    let newDoc = document.createElement('div');
    newDoc.innerHTML = `<div class="id">ID: ${doc.ID}</div>
                        <div class="name">Name: ${doc.Name}</div>
                        <div class="description">Description: ${doc.Description}</div>`;
    newDoc.classList.add(`newTag`);
    return newDoc;
};

const newTag = (tagName, doc) => {
    let newMaster = document.createElement('div');
    if (tagName === `HeadingID`) {
        newMaster.classList.add(`newTag`);
        newMaster.innerHTML = `<span>${HeadingDict[doc[tagName]]}</span>`;
    }
    if (tagName === `MasterDocumentID`) {
        newMaster.classList.add(`newTag`);
        newMaster.innerHTML = `<span>${tagName}: ${doc[tagName]}</span>`;
    }
    return newMaster;
};

const newHead = (dict, index) => {
    let newHead = document.createElement('div');
    newHead.innerText = dict[index];
    newHead.classList.add(`headingID`);
    return newHead;
};

const Render = (list, dict) => {
    let result;
    let newHeadTag;
    let newMasterTag;
    let masterID = null;
    let filtered;
    for (let head of Object.keys(dict)) {
        newHeadTag = newHead(dict, head);
        result = list.filter(item => item.HeadingID === +head)
                     .sort((a, b) => a.MasterDocumentID - b.MasterDocumentID);
        let newTargetTag = document.createElement('div');
        newTargetTag.classList.add('newDocList');
        for (let doc of result) {
            if (masterID !== doc.MasterDocumentID) {
                masterID = doc.MasterDocumentID;
                filtered = result.filter(item => item.MasterDocumentID === masterID);
                newMasterTag = newTag(masterID);
                for (let doc of filtered) {
                    newMasterTag.appendChild(newDoc(doc));
                }
                newTargetTag.appendChild(newHeadTag);
                newTargetTag.appendChild(newMasterTag);
                Target.appendChild(newTargetTag);
            }
        }
    }
};

//Render(DocumentList, HeadingDict);

const testRender = (list, ...arguments) => {
    let newTopTag;
    let currentComparator = null;
    let filtered;
    const iter = (arg, documentsList) => {
        const sorted = documentsList.sort((a, b) => {
            if (a[arg] > b[arg]) return 1;
            if (a[arg] < b[arg]) return -1;
            return 0;
        });
        for (let doc of sorted) {
            let newTargetTag = document.createElement('div');
            newTargetTag.classList.add('newDocList');
            if (currentComparator !== doc[arg]) {
                currentComparator = doc[arg];
                filtered = sorted.filter(item => item[arg] === currentComparator);
                newTopTag = newTag(arg, doc);
                for (let doc of filtered) {
                    newTopTag.appendChild(newDoc(doc));
                }
                newTargetTag.appendChild(newTopTag);
                Target.appendChild(newTargetTag);
                console.log(Target);
            }
        }
    };
    for (let argument of arguments) {
      iter(argument, list);
    }
};

testRender(DocumentList, `MasterDocumentID`);