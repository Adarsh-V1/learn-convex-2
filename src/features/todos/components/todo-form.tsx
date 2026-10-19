"use client";

import  { toast } from "sonner"
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { taskFormSchema, TaskFormValues } from "../schema/task-form-schema";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


function TaskForm() {
  'use no memo'
  const createTask = useMutation(api.task.create);
  

  const {
    register,
    handleSubmit,
    reset,
    getValues,

    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      text: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });

  async function onSubmit(values: TaskFormValues) {
    
    try {
      await createTask({ text: values.text });
      toast.success("Task Added Successfully")
      reset();     
      
    } catch(error) {
      console.log(error)
      toast.error("Task was not Added ")
    }
  }

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row gap-10">
        <span className="flex flex-col">
          <Input placeholder="Enter-Text" {...register("text")} />
          {errors.text && (
            <p className="text-red-400 ">{errors.text.message}</p>
          )}
        </span>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding... " : "Add Tasks"}
        </Button>
      </div>
    </form>
  );
}

export { TaskForm };
