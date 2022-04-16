import { useEffect,useState } from "react";
import css from "./Todo.css" 

export const Todo=()=>{
  const [todos,setTodo]=useState([]);
  const [text,setText]=useState("");
  const [deletedText,setDeleted]=useState([]);

useEffect(()=>{

  getData();
  getdata()

},[]);

async function getData(){

const data=await fetch("http://localhost:8080/todo").then((d)=>
d.json() 
);

setTodo(data);
}

async function getdata(){

  const data=await fetch("http://localhost:8080/deletedTodo").then((d)=>
  d.json() 
  );
  
  setDeleted(data);
  }

return (
  <div className="Todo">
    <h1  className="khushy">KHUSHY'S TODO</h1>
    <input
    
    onChange={(e)=>{
      setText(e.target.value);
    }}
    type="text"
    placeholder="Type Something"
    />
    <button
    onClick={()=>{
const payload={
  title:text
  } 


fetch("http://localhost:8080/todo",{
method:"POST",
headers:{
  "content-type":"application/json"
},
body:  JSON.stringify(payload)

      })
     getData();
    }}
    
    >+</button>
  <h1 className="text">TODOS</h1>
   <div className="Todos">{todos.map(todo=>(
    <div className="Maintodo">{todo.title}
    <button
    onClick={()=>{


      const deletedTodotitle=todo
      
            fetch(`http://localhost:8080/deletedTodo`,{
             method:"POST",
             headers:{
               "content-type":"application/json"
             }, 
             body:JSON.stringify(deletedTodotitle)
     
      })


const id=todo.id;



fetch(`http://localhost:8080/todo/${id}`,{
  method:"DELETE"
})  
        getData()
        getdata();

    }}
    >Done</button>
    
    </div>
    
  ))}</div> 
  <div>

     <h1 className="text">FINISH
     
     </h1> 
     
     <div className="DeletedTodo">
       {deletedText.map((deleted)=>(
       <div className="delete" >{deleted.title}</div>
     ))}
     </div>
     
    </div>
  
  </div>
)
  
} 