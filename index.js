let UlElement = document.getElementById('listElement');
let addButton = document.getElementById('addBtnId');
let SaveButton = document.getElementById('SaveBtn');

function getItemsFromLocalstorage(){
   let  stringifiedTodoList= localStorage.getItem("todosList")
    let parsedData = JSON.parse( stringifiedTodoList)
    if(parsedData === null){
        return []
    }else{
        return parsedData;
    }
}

let todosList = getItemsFromLocalstorage();

let idCount = todosList.length; 

SaveButton.onclick = function(){
    let TodoList = JSON.stringify(todosList)
    localStorage.setItem('todosList',TodoList)
}

function CreateAndAppendTodo(todos) {

    let CheckBoxId = "checkBoxId" + todos.id;
    let LabelElId = 'labelId'+ todos.id;
    let DeleteId = "deleteIconId"+todos.id;
    let listItemId = "ListItemId" + todos.id;

    let listItemEl = document.createElement('li')
    listItemEl.classList.add('listItem','d-flex','flex-row')
    listItemEl.id = listItemId;
    UlElement.appendChild(listItemEl);
    
    let checkBoxEl = document.createElement('input')
    checkBoxEl.type = "checkbox"
    checkBoxEl.classList.add('checkBox')
    checkBoxEl.id = CheckBoxId;
    checkBoxEl.checked = todos.isChecked
    checkBoxEl.onclick = function(){
        let CheckBoxEle = document.getElementById(CheckBoxId)
        let LableEle = document.getElementById(LabelElId);
        LableEle.classList.toggle('checked');

        let todoItem = todosList.findIndex((eachObj)=>{
            let eachobjId = "ListItemId"+eachObj.id
            if(eachobjId === listItemId ){
                return true
            }else{
                return false
            } 
        })
        let todoObject = todosList[todoItem]
        if(todoObject.isChecked === true){
            todoObject.isChecked = false
        }else{
            todoObject.isChecked = true
        }
    }
    listItemEl.append(checkBoxEl);
    
    let labelContainerEl = document.createElement('div')
    labelContainerEl.classList.add('labelContainer')
    listItemEl.appendChild(labelContainerEl);
    
    let labelEle = document.createElement('label')
    labelEle.classList.add('labelText')
    labelEle.textContent = todos.text
    labelEle.htmlFor = CheckBoxId;
    labelEle.id = LabelElId;
    if(todos.isChecked === true){
        labelEle.classList.add('checked')
    }
    labelContainerEl.appendChild(labelEle);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainerEl.appendChild(deleteIconContainer);
    
    let deleteIcon = document.createElement("i");
    deleteIcon.id = DeleteId
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);
    deleteIcon.onclick = function(){
        let  listItemEl = document.getElementById(listItemId);
        UlElement.removeChild(listItemEl);

       let deleteItemIndex = todosList.findIndex((eachObj)=>{
            let eachobjId = "ListItemId"+eachObj.id
            if(eachobjId === listItemId ){
                return true
            }else{
                return false
            }
        })
        todosList.splice(deleteItemIndex,1)
    }
}
for(let eachTodo of todosList){
    CreateAndAppendTodo(eachTodo)
}
addButton.onclick = function(){
    let inputEle = document.getElementById('inputid');
    let userinputValue = inputEle.value;
    if(userinputValue === ""){
        alert('Please Enter Valid Input');
        return;
    }
    idCount = idCount +1
    let newTodo = {
        text: userinputValue,
        id:idCount,
        isChecked: false
    }
    todosList.push(newTodo)
    CreateAndAppendTodo(newTodo)
    inputEle.value = '';
}
