const template = `<div class="headingID">%HeadingID%</div>
                    <div class="documentData">
                        <div>%ID%</div>
                        <div>%Name%</div>
                        <div>%Description%</div>
                   </div>`;

const DocumentList = [
    {ID: 1,   Description: 'Description1', Name: 'expamle-part-1.js', HeadingID: 1, MasterDocumentID: -1},
    {ID: 2,   Description: 'Description1', Name: 'expamle-part-2.js', HeadingID: 1, MasterDocumentID: 201},
    {ID: 3,   Description: 'Descripjpspf', Name: 'e23rxpaml235e.js', HeadingID: 4, MasterDocumentID: -1},
    {ID: 4,   Description: 'Description2', Name: 'expa23rmle.js', HeadingID: 2, MasterDocumentID: -1},
    {ID: 5,   Description: 'Description2', Name: 'expaml235e.js', HeadingID: 2, MasterDocumentID: 4},
    {ID: 6,   Description: 'Description89238', Name: 'expa235mle.js', HeadingID: 3, MasterDocumentID: -1},
    {ID: 7,   Description: 'Description1', Name: 'expaml235235e.js', HeadingID: 1, MasterDocumentID: 201},
    {ID: 8,   Description: 'Description89238', Name: 'expaml235e.js', HeadingID: 3, MasterDocumentID: 6},
    {ID: 9,   Description: 'cat1', Name: 'expaml235e.js', HeadingID: 1, MasterDocumentID: -1},
];

const HeadingDict = {
    1: 'Palaces',
    2: 'Shakalo',
    3: 'Furbedo',
    4: 'Butarosuggo',
};

const Target = document.querySelector('.documents');

const newID = doc => {
    const idLine = document.createElement('div');
    idLine.innerText = `ID: ${doc.ID}`;
    idLine.classList.add('id');
    return idLine;
};

const newName = doc => {
    const nameLine = document.createElement('div');
    nameLine.innerText = `Name: ${doc.Name}`;
    nameLine.classList.add('name');
    return nameLine;
};

const newDescription = doc => {
    const descriptionLine = document.createElement('div');
    descriptionLine.innerText = `Description ${doc.Description}`;
    descriptionLine.classList.add('description');
    return descriptionLine;
};

const newHeading = heading => {
    let newHeadingLine = document.createElement('div');
    newHeadingLine.classList.add('headingID');
    newHeadingLine.innerText = HeadingDict[heading];
    return newHeadingLine;
};

const newDocumentData = doc => {
    let newDataLine = document.createElement('div');
    newDataLine.classList.add('documentData');
    newDataLine.appendChild(newID(doc));
    newDataLine.appendChild(newName(doc));
    newDataLine.appendChild(newDescription(doc));
    return newDataLine;
};

const newMasterDocId = (doc, masterID) => {
    let newMasterIdLine = document.createElement('div');
    newMasterIdLine.classList.add('masterList');
    newMasterIdLine.id = masterID;
    newMasterIdLine.innerText = `MasterID: ${masterID}`;
    return newMasterIdLine;
};

const newRender = (list, dict) => {
    for (let head of Object.getOwnPropertyNames(dict)) {
        let newDoc = document.createElement('div');
        newDoc.classList.add('newDocList');
        newDoc.appendChild(newHeading(head));
        for (let doc of list.filter(item => item.HeadingID === +head)) {
            console.log(+newMasterDocId(doc, doc.MasterDocumentID).firstChild.id === doc.MasterDocumentID);
            newDoc.appendChild(newMasterDocId(doc, doc.MasterDocumentID))
        }
        Target.appendChild(newDoc);
    }
};

newRender(DocumentList, HeadingDict);

