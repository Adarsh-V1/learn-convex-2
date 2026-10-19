'use client'

import {  useQuery,useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { toast} from "sonner"
import { Id } from "../../../../convex/_generated/dataModel";




function TaskList(){
  const tasks = useQuery(api.task.list);
  const setCompleted = useMutation(api.task.setCompleted)

  if(tasks?.length === 0){
    return <p>No tasks yet</p>
  }

  async function toggleText(id: Id<"tasks">,isCompleted: boolean){
    try{
      await setCompleted({id,isCompleted} )
      toast.success(`todo marked successfully`)
    }
    catch{
      toast.error("Could not update task")
    }
  }

  return (
    <ul className="space-y-3">
      {tasks?.map((task)=>(
        <li
        key={task._id}
        className="rounded-lg border p-3"
        >
          <input
          type="checkbox"
          checked= {task.isCompleted}
          onChange={(e)=>toggleText(task._id, e.target.checked)}
          />
          <span className={task.isCompleted? "line-through":""}> 
            {task.text}
          </span>
         
        </li>
      ))}

    </ul>
  )

}


export {TaskList}