import { query } from "./_generated/server"
import { mutation } from "./_generated/server"
import { v } from "convex/values"

export const list = query({
  args: {},
  handler: async(ctx) =>{
    return await ctx.db
      .query("tasks")
      .collect()
  },
})


export const create = mutation({
  args: {
    text: v.string(),
  },
  returns: v.id("tasks"),
  handler: async(ctx , args) => {
    const text = args.text.trim();

    if(text.length === 0){
      throw new Error("Task Text can't be empty")
    } 
     return await ctx.db.insert("tasks",{
      text,
      isCompleted:false
     })

  }
})


export const setCompleted = mutation({
  args: {
    id: v.id('tasks'),
    isCompleted: v.boolean(),
  },
  returns: v.null(),
  handler: async(ctx , args) => {

    await ctx.db.patch("tasks",args.id,{
      isCompleted: args.isCompleted
    })
    return null;
  }
 
})




export const updateText = mutation({
  args: {
    id: v.id('tasks'),
    text: v.string(),
  },
  returns: v.null(),
  handler: async(ctx , args) => {

    const text = args.text.trim()
    if(text.length === 0){
      throw new Error("Task Text can't be empty")
    }

    await ctx.db.patch("tasks",args.id,{
      text: text
    })

    return null;
    
  }
 
})



export const deleteText = mutation({
  args: {
    id: v.id('tasks')
  },
  returns: v.null(),
  handler: async(ctx , args) => {


    await ctx.db.delete("tasks",args.id)
    return null;
  
  }
 
})


