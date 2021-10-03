var node = document.getElementById("input");
var tasks=[];
node.addEventListener("keyup",function(event){
  if(event.key==="Enter"){
    insertTask();
  }
});
closeTask();
function fun(){
  tasks=JSON.parse(localStorage.getItem("tasks")) || [];
  if(tasks.length!=0){
  document.getElementById("unfinished").innerText="You have "+tasks.length+" unfinished Tasks";
  }
  for(var i=0;i<tasks.length;i++){
    var li = document.createElement("li");
    var t = document.createTextNode(tasks[i]);
    li.appendChild(t);
    document.getElementById("task").appendChild(li);
    var doneButton = document.createElement("Button");
    var txt = document.createTextNode("DONE");
    doneButton.className = "close";
    doneButton.appendChild(txt);
    li.appendChild(doneButton);
    

    closeTask();


  }
}
function decrementTasks(){
  if(tasks.length==0){
  document.getElementById("unfinished").innerText="Relax !! You have no Tasks to Do";
  }
  else{
    document.getElementById("unfinished").innerText="You have "+tasks.length+" unfinished Tasks";

  }

}

function insertTask(inputValue){
  var li = document.createElement("li");
  
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  }
  else {
    document.getElementById("task").appendChild(li);
  
  
  document.getElementById("input").value = "";
  tasks.push(inputValue);

  localStorage.setItem("tasks",JSON.stringify(tasks));

  var doneButton = document.createElement("Button");
  var txt = document.createTextNode("DONE");
  doneButton.className = "close";
  doneButton.appendChild(txt);
  li.appendChild(doneButton);
  console.log(tasks)
  if(tasks.length!=0){
  document.getElementById("unfinished").innerText="You have "+tasks.length+" unfinished Tasks";
  }
  closeTask();
}
}

function closeTask(){
var close = document.getElementsByClassName("close");

for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
  var div = this.parentElement;
  var ind=(tasks.indexOf(div.innerText.split("\n")[0]));
  tasks.splice(ind,1);
  console.log(tasks);
  localStorage.setItem("tasks",JSON.stringify(tasks));
  div.style.display = "none";
  decrementTasks();
  }
}


}
function takeTask(){

  var inputValue = document.getElementById("input").value;
  insertTask(inputValue);

}
function runSpeechRecognition() {
  // get output div reference
  // get action element reference
  var action = document.getElementById("action");
      // new speech recognition object
      var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
      var recognition = new SpeechRecognition();
  
      // This runs when the speech recognition service starts
      recognition.onstart = function() {
          action.innerHTML = "<p style='color:white'>listening, please speak...<p>";
      };
      
      recognition.onspeechend = function() {
          action.innerHTML = "";
          recognition.stop();
      }
    
      // This runs when the speech recognition service returns result
      recognition.onresult = function(event) {
          var transcript = event.results[0][0].transcript;
          var confidence = event.results[0][0].confidence;
          insertTask(transcript);
      };
    
       // start recognition
       recognition.start();
}
