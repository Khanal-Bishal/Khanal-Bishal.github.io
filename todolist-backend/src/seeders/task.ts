import Task from "../models/task"
const dummyTasks = [
    {
        name: "Work hard play hard",
        description: "DO something good",
        completed: false
    },
    {
        name: "Do do do ",
        description: "play dota ",
        completed: false
    },
    {
        name: "Do something",
        description: "plat football",
        completed: false
    },


]
export async function seedTasks() {
    for (const dummyTask of dummyTasks) {
        await Task.create(dummyTask)
    }
}

