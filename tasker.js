var fs = require("fs");

class Tasker{
    constructor(config){
        this.interval = config.TASKER_INTERVAL_MS;
        this.tasksPath = "tasks.json";
        this.actionsPath = "./actions.js";

        this.checkTasks();
        this.intervalId = setInterval(this.checkTasks.bind(this), this.interval);
    };

    addZero(number){
        var str = number > 10 ? number : "0" + number
        return str;
    }

    runAction(action){
        try{
            var actions = require(this.actionsPath);
            actions[action]();
        }
        catch(e){
            console.log(e);
        }
    }

    checkTasks(){
        var tasks = JSON.parse(fs.readFileSync(this.tasksPath).toString());
        var currentDate = new Date();
        var arr = [];
        arr[0] = this.addZero(currentDate.getHours());
        arr[1] = this.addZero(currentDate.getMinutes());

        var currentTimeStr = arr.join(":");
        var updatedTasks = [];

        tasks.forEach(element => {
            var taskArr = element.split("|");
            var actionsArr = taskArr.slice(3);
            var taskTime = taskArr[0];
            var daysOfWeek = taskArr[1];
            var repeat = taskArr[2];
            var dayOfWeek = currentDate.getDay() - 1; // start from 0
            
            if( taskTime === currentTimeStr && daysOfWeek[dayOfWeek] === "1" ){

                actionsArr.forEach(this.runAction.bind(this));

                if( repeat == "0" ){
                    var t = taskArr[1].split("");
                    t[dayOfWeek] = 0;
                    taskArr[1] = t.join("");
                }
                setTimeout( this.addTask.bind(this, taskArr.join("|")), 70000 );
            }
            else {
                updatedTasks.push(element);
            }
        });

        if(tasks.length !== updatedTasks.length){
            fs.writeFileSync(this.tasksPath, JSON.stringify(updatedTasks));
        }
    }
    
    addTask(task){
        var tasks = JSON.parse(fs.readFileSync(this.tasksPath).toString());
        var existsTask = tasks.find( element => element === task );
        
        if(!existsTask){
            tasks.push(task);
            fs.writeFileSync(this.tasksPath, JSON.stringify(tasks));
        }
    }
    
    updateTask(oldTask, newTask){
        var tasks = JSON.parse(fs.readFileSync(this.tasksPath).toString());
        tasks.forEach((element, index) => {
            if(element === oldTask){
                tasks[index] = newTask;
            }
        });
        fs.writeFileSync(this.tasksPath, JSON.stringify(tasks));
    }
    
    removeTask(task){
        var tasks = JSON.parse(fs.readFileSync(this.tasksPath).toString());
        var updatedTasks = [];
        tasks.forEach((element, index) => {
            if(element !== task){
                updatedTasks.push(element);
            }
        });
        fs.writeFileSync(this.tasksPath, JSON.stringify(updatedTasks));
    }

    allTasks(){
        var tasks = JSON.parse(fs.readFileSync(this.tasksPath).toString());
        return tasks;
    }
}

module.exports = {
    Tasker: Tasker
}