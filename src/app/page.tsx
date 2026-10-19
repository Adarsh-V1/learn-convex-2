import { TaskForm } from "@/features/todos/components/todo-form";
import { TaskList } from "@/features/todos/components/todo.list";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <TaskForm />
        <TaskList/>
    </div>
  );
}
