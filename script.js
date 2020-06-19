let app = new Vue({
  el: '#app',
  data: {
    newTaskName: "",
    newTaskDuration: 0,
    tasks: [],
    tasksDone: 0,
    tasksDuration: 0,
    tasksDoneDuration: 0
  },
  methods:{
    addTask(){
      this.tasks.push({name:this.newTaskName,duration:parseInt(this.newTaskDuration),done:false});
      this.newTaskName = '';
      document.getElementById("name").focus();
      document.getElementById("duration").value = '';
    },
    remTask(index){
      this.tasks.splice(index, 1);
    }
  },
  watch:{
    tasks: {
      handler: function(newVal){
        let json = JSON.stringify(newVal);
        localStorage.setItem('tasks', json);
        this.tasksDone = this.tasks.map(function(t){
          return t.done?1:0;
        }).reduce((a,b)=>parseInt(a)+parseInt(b),0);
        this.tasksDuration = this.tasks.map(function(t){
          return t.duration;
        }).reduce((a,b)=>parseInt(a)+parseInt(b),0);
        this.tasksDoneDuration = this.tasks.map(function(t){
          return t.done?0:t.duration;
        }).reduce((a,b)=>parseInt(a)+parseInt(b),0);
        var unith_width = this.tasksDone/this.tasks.length*100;
        var perc_width = 100 - this.tasksDoneDuration/this.tasksDuration*100;
        console.log(unith_width + ' / ' + perc_width);
        $("#determinate_unit").css('width', unith_width+'%');
        $("#determinate_perc").css('width', perc_width+'%');
      },
      deep: true
    }
  }
});
let loaded = JSON.parse(localStorage.getItem('tasks'));
if(Array.isArray(loaded)){
  app.tasks = loaded;
}