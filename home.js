var existsTask = "21:30|0001100|1|LAMP_1_ON|LAMP_2_ON";

var actions = {};

function init(){
    actions = {};
}

function addActionToList(){
    var selectedAction = document.getElementById('actionsSelect').value;
    var actionsList = document.getElementById('actionsList');
    actionsList.innerHTML = "";
    actions[selectedAction] = null;
    updateSelectedActionsList();
}

function updateSelectedActionsList(){
    
    actionsList.innerHTML = "";

    for (const p in actions) {
        actionsList.innerHTML += "<li>" + p + "  <span class='button-delete-action' onclick='deleteOptionFromList(\"" + p + "\")'>Удалить</span></li>";
    }
}

function deleteOptionFromList(a){
    delete actions[a];
    updateSelectedActionsList();
}

function saveAction(){
    // console.log()
    
    var actionsArr = [];
    for (const p in actions) {
        actionsArr.push(p);
    }
    if(actionsArr.length == 0) {
        console.log("Действия не выбраны!");
        return;
    }

    var time = document.getElementById("actionTime").value;

    if( !time ){
        console.log("Время не выбрано!");
        return;
    }

    var daysNodes = document.getElementsByName("daysOfWeek");
    var daysOfWeek = [];
    daysNodes.forEach(function(dayNode){
        if(dayNode.checked){
            daysOfWeek.push(1);
        }
        else{
            daysOfWeek.push(0);
        }
    });
    if( eval(daysOfWeek.join("+")) == 0 ){
        console.log("День недели не выбран!");
        return;
    }

    var repeateNodes = document.getElementsByName("repeate");
    var needToRepeat = 0;
    if( repeateNodes[1].checked ){
        needToRepeat = 1;
    }

    formateTaskRecord(time, daysOfWeek, needToRepeat, actionsArr)
    
}

function formateTaskRecord(time, days, weaklyRepeate, actionsList){
    


    var arr = [];
    arr[0] = time;
    arr[1] = days.join("");
    arr[2] = weaklyRepeate;
    arr[3] = actionsList.join("|");

    console.log(arr.join("|"));
}

if(existsTask) {
    updateWithExistsTask();
}

function updateWithExistsTask(){
    console.log(existsTask);
    var taskArr = existsTask.split("|");
    var days = taskArr[1];
    document.getElementById("actionTime").value = taskArr[0];


    var daysNodes = document.getElementsByName("daysOfWeek");
    daysNodes.forEach(function(dayNode, index){
        if( days[index] == 1 ){
            dayNode.checked = true;
        }
    });

    if( taskArr[2] == 1 ) {
        document.getElementsByName("repeate")[1].checked = true;
    }

    var taskActions = taskArr.slice(3);
    console.log(taskActions);
    taskActions.forEach(function(action){
        actions[action] = null;
    });

    updateSelectedActionsList();

}