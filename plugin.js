var btn = document.getElementById('add');
var tList = document.getElementById('tList');
var cList = document.getElementById('cList');
var dataInp = document.getElementById('data');
var users = document.getElementById('users');
var search = document.getElementById('search');
var arryOfObj = [];
var arryOfObj2 = [];
 
btn.addEventListener('click',saveData);
GetLocalData();
getCompleteData();
function saveData() {
    var NewObj =new rowObject();
    NewObj.task = dataInp.value; 
    NewObj.user = users.value;
    if (arryOfObj.length == 0){
        arryOfObj = [];
        NewObj.id = 1;
    }
    else{
        NewObj.id = arryOfObj[arryOfObj.length-1].id+1
    }
    arryOfObj.push(NewObj)
    localStorage.setItem("tasks",JSON.stringify(arryOfObj));
    dataInp.value = "";
    tList.textContent = "";
    GetLocalData();
}
//our user obect 
var rowObject = function(){
    this.id;
    this.task;
    this.user;
}

function GetLocalData() {
    arryOfObj = JSON.parse(localStorage.getItem("tasks"));
    for( const i in arryOfObj){
        if (users.value == arryOfObj[i].user){
            item = document.createElement('li');
            var markBtn = document.createElement('button');
            var delBtn = document.createElement('button');
            item.textContent = arryOfObj[i].task;
            item.setAttribute('id',arryOfObj[i].id);
            markBtn.textContent = 'OK';
            markBtn.setAttribute("id","markBtn");
            delBtn.setAttribute("id","delBtn");
            delBtn.textContent = 'Del';
            item.appendChild(markBtn);
            item.appendChild(delBtn);
            tList.appendChild(item);
            markBtn.addEventListener('click', moveItem);
            delBtn.addEventListener('click', deleteTaskItem);
        }
    }
}

function moveItem(event){
    var NewObj =new rowObject();
    NewObj.task= event.currentTarget.parentElement.textContent; 
    NewObj.user = users.value;
    NewObj.id=  event.currentTarget.parentElement.id; 
    arryOfObj2.push(NewObj)
    localStorage.setItem("complete",JSON.stringify(arryOfObj2));
    cList.textContent = "";
    deleteTaskItem(event);
    getCompleteData();
}
function getCompleteData(){
    arryOfObj2 = JSON.parse(localStorage.getItem("complete"));
    for( const i in arryOfObj2){
        if (users.value == arryOfObj2[i].user){
        var item = document.createElement('li');
        var delBtn = document.createElement('button');
        item.textContent = arryOfObj2[i].task;
        item.setAttribute('id',arryOfObj2[i].id)
        delBtn.setAttribute("id","delBtn");
        delBtn.textContent = 'Del';
        item.appendChild(delBtn);
        cList.appendChild(item);
        delBtn.addEventListener('click', deleteCpmpleteItem);
    }
    }
}
function deleteTaskItem(event) {
    arryOfObj = JSON.parse(localStorage.getItem("tasks"));
    
        for (const i in arryOfObj){
            if (arryOfObj[i].id == event.currentTarget.parentElement.id){ 
                arryOfObj.splice(i, 1);
               break; 
            }
        }
    localStorage.setItem("tasks",JSON.stringify(arryOfObj));
    tList.textContent = "";
    GetLocalData();
}
function deleteCpmpleteItem(event) {
    arryOfObj2 = JSON.parse(localStorage.getItem("complete"));

        for (const i in arryOfObj2){
            if (arryOfObj2[i].id == event.currentTarget.parentElement.id){ 
                arryOfObj2.splice(i, 1);
               break; 
            }
        }

    localStorage.setItem("complete",JSON.stringify(arryOfObj2));
    cList.textContent = "";
    getCompleteData();
}
users.addEventListener('change', (e) => {
    tList.textContent = "";
    cList.textContent = "";
    getCompleteData();
    GetLocalData();
}) 
search.addEventListener('keyup', (e) => {
    tList.textContent = "";
    cList.textContent = "";
    arryOfObj = JSON.parse(localStorage.getItem("tasks"));
    for( const i in arryOfObj){
        var strValue = arryOfObj[i].task.slice(0, search.value.length);
        console.log(strValue);
        
        if (users.value == arryOfObj[i].user && search.value == strValue){
            item = document.createElement('li');
            var markBtn = document.createElement('button');
            var delBtn = document.createElement('button');
            item.textContent = arryOfObj[i].task;
            item.setAttribute('id',arryOfObj[i].id);
            markBtn.textContent = 'OK';
            markBtn.setAttribute("id","markBtn");
            delBtn.setAttribute("id","delBtn");
            delBtn.textContent = 'Del';
            item.appendChild(markBtn);
            item.appendChild(delBtn);
            tList.appendChild(item);
            markBtn.addEventListener('click', moveItem);
            delBtn.addEventListener('click', deleteTaskItem);
        }
    }
    arryOfObj2 = JSON.parse(localStorage.getItem("complete"));
    for( const i in arryOfObj2){
        var strValue = arryOfObj2[i].task.slice(0, search.value.length);
        if (users.value == arryOfObj2[i].user && search.value == strValue){
        var item = document.createElement('li');
        var delBtn = document.createElement('button');
        item.textContent = arryOfObj2[i].task;
        item.setAttribute('id',arryOfObj2[i].id)
        delBtn.setAttribute("id","delBtn");
        delBtn.textContent = 'Del';
        item.appendChild(delBtn);
        cList.appendChild(item);
        delBtn.addEventListener('click', deleteCpmpleteItem);
    }
    }
})
   
