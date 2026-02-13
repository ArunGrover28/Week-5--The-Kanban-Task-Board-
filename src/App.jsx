import React,{useState, useEffect} from "react";
import Column from "./components/Column";

function App() {

  const[inputTask,setInputTask] = useState("");
  const[priority,setPriority] = useState("red");
  const[tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("kanbanTasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});
  useEffect(() => {
  localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
}, [tasks]);


  

  function handleClick(){
    setTasks((prev)=>{
      return[
        ...prev,
        {
          id:new Date(),
          task:inputTask,
          status:"todo",
          ptr:priority
        }
      ];
    });
    alert(inputTask);
    console.log(tasks);
    setInputTask("") 
  }

  function deleteTask(id) {
    
    setTasks(prev => prev.filter(task => task.id !== id));
    
  }


  function moveTask(id,stat){
   
    setTasks(prev=>{
      return prev.map(singlets=>{
        if(singlets.id === id){
          return {...singlets,status: stat}
        }else{
          return singlets;
        }
      })
    })

  }

 


  function editTask(id, newText) {
  setTasks(prev =>
    prev.map(task =>
      task.id === id ? { ...task, task: newText } : task
    )
  );
}


  
  return (
    <div className="flex  flex-col items-center gap-6 ">
      <h1 className="text-4xl font-serif ">Kanban Task Board</h1>
    
      <div className="w-80 flex flex-row justify-around items-center "> 
           
          <input 
          type="text" 
          placeholder="Enter task"
          value={inputTask}
          onChange={(e)=>setInputTask(e.target.value)}
          className="border border-gray-400 px-3 py-1 rounded outline-none focus:ring-2 focus:ring-blue-400"/>
          
          <select name="" id="" onChange={(e)=>setPriority(e.target.value)}>
            <option value="red">High</option>
            <option value="yellow">Medium</option>
            <option value="green">Low</option>
          </select>

          <button
           onClick={handleClick}
           className="w-20  bg-blue-500 text-white px-4 py-1.5 rounded">Enter</button>
      
      </div>  

      <div className="container">
          <div className="column">
          
            <Column
            title="To Do"
            tasks={tasks}
            status="todo"
            nextStatus="pending"
            deleteTask={deleteTask}
            moveTask={moveTask}
            editTask = {editTask}
          />
            {/* {tasks.map(single=>{
              if(single.status === 'todo'){
                return <div key={single.id} className="card mt-4 p-5 bg-amber-400">
                <p >{single.task} {single.status}</p>
                <div className="w-50 flex flex-row justify-evenly">
                    <button onClick={()=>deleteTask(single.id)} className="w-20 hover:opacity-50 bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                    <button onClick={()=>moveTask(single.id,"pending")} className="w-20 hover:opacity-50  bg-orange-500 text-white px-3 py-1 rounded">Move</button>
                </div>
                
              </div>
              }
               
            })} */}
          </div>
          <div className="column">
             
            <Column
            title="Pending"
            tasks={tasks}
            status="pending"
            nextStatus="done"
            deleteTask={deleteTask}
            moveTask={moveTask}
            editTask={editTask}
          />
          </div>
          <div className="column">
            <Column
              title="Done"
              tasks={tasks}
              status="done"
              nextStatus={null}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </div> 
      </div>
      
    </div>
  )
}

export default App;