var config = require("./package.json").config;
var Tasker = require("./tasker.js").Tasker;


var tasker = new Tasker(config);



// tasker.addTask("2019:12:24:14:22-LIGHT_R1_ON-1111100");

// tasker.updateTask("2019:12:24:14:33-LIGHT_R1_ON", "2019:12:11:14:33-LIGHT_R1_ON");

// tasker.removeTask("2019:12:24:14:22-LIGHT_R1_ON");


console.log(tasker.allTasks());