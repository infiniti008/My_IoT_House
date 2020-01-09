var fs = require("fs");

class Tasker{
    constructor(config){
        this.actions = require("./actions.js");
        this.interval = config.TASKER_INTERVAL_MS;
        this.tasksPath = "./tasks.json";

        this.checkTasks();
        this.intervalId = setInterval(this.checkTasks, this.interval);
    };

    addZero(number){
        var str = number > 10 ? number : "0" + number
        return str;
    }

    runAction(action){
        this.actions[action]();
    }

    checkTasks(){
        var tasks = require(this.tasksPath);
        var currentDate = new Date();
        var arr = [];
        arr[0] = currentDate.getFullYear();
        arr[1] = this.addZero(currentDate.getMonth() + 1);
        arr[2] = this.addZero(currentDate.getDate());
        arr[3] = this.addZero(currentDate.getHours());
        arr[4] = this.addZero(currentDate.getMinutes());

        var currentTimeStr = arr.join(":");
        var updatedTasks = [];

        tasks.forEach(element => {
            var taskTime = element.split("-")[0];
            var action = element.split("-")[1];
            var repeat = element.split("-")[2];
            if(taskTime === currentTimeStr){
                if(repeat){
                    updatedTasks.push(element);
                    var dayOfWeek = currentDate.getDay();
                    if( repeat[dayOfWeek - 1] === "1"){
                        this.runAction(action);
                    }
                }
                else{
                    this.runAction(action);
                }
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
        var tasks = require(this.tasksPath);
        var existsTask = tasks.find( element => element === task );
        
        if(!existsTask){
            tasks.push(task);
            fs.writeFileSync(this.tasksPath, JSON.stringify(tasks));
        }
    }
    
    updateTask(oldTask, newTask){
        var tasks = require(this.tasksPath);
        tasks.forEach((element, index) => {
            if(element === oldTask){
                tasks[index] = newTask;
            }
        });
        fs.writeFileSync(this.tasksPath, JSON.stringify(tasks));
    }
    
    removeTask(task){
        var tasks = require(this.tasksPath);
        var updatedTasks = [];
        tasks.forEach((element, index) => {
            if(element !== task){
                updatedTasks.push(element);
            }
        });
        fs.writeFileSync(this.tasksPath, JSON.stringify(updatedTasks));
    }

    allTasks(){
        var tasks = require(this.tasksPath);
        return tasks;
    }
}

module.exports = {
    Tasker: Tasker
}