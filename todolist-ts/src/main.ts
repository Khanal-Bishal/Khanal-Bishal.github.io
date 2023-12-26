import './style.css'
import { TaskList } from "./TaskList";
import { Task } from "./Task";

const taskList= new TaskList()

const addTodoBtn= document.querySelector('.addTodo__btn') as HTMLButtonElement | null
const addTodoInput= document.querySelector('.addTodo__input') as HTMLButtonElement | null
const noTaskContainer = document.querySelector('.todoList__noTask') as HTMLElement | null
const todoLists=document.querySelector('.todoList__list') as HTMLUListElement | null 
const todoListContainer=document.querySelector('.todoList__container') as HTMLElement | null
const completedBtn=document.querySelector('.header__completed') as HTMLElement | null
const remainingBtn=document.querySelector('.header__remaining') as HTMLElement | null
const homeBtn=document.querySelector('.header__home') as HTMLElement | null

const searchForm=document.querySelector('.search') as HTMLFormElement | null
const searchInput=document.querySelector('.search__input') as HTMLFormElement | null

const outlay=document.querySelector('.outlay') as HTMLElement | null
const modalContainer=document.querySelector('.modal') as HTMLElement | null
const closeBtn=document.querySelector('.modal__close-btn') as HTMLElement | null
const cancelBtn=document.querySelector('.modal__cancel-btn') as HTMLElement | null

const headerOpenModalBtn= document.querySelector('.header__openModal')
const addTodoOpenModalBtn=document.querySelector('.addTodo__openModal')

const modalAddTodo=document.querySelector('.modal__addTodo-btn') as HTMLElement | null
const modalInput=document.querySelector('.modal__todo-name') as HTMLInputElement | null
const modalDesc=document.querySelector('.modal__todo-desc') as HTMLTextAreaElement | null


function createTask(value:string,completed:boolean=false,desc:string="")
{
  const task =new Task(value,completed,desc)
  taskList.addTask(task)
     
  return task;

}


function toogleTaskCompleted(id:string):Task
{
  const task = taskList.getTaskById(id)
  if (!task)
  {
    throw new Error(`Task not found`)
  }

  if(task)
  {
    task?.toogleTaskCompleted()
  }

  return task;
}

function search(searchTerm:string):TaskList
{
  const matchedTaskList= taskList.list.filter(item=>
    {
      return item.todo.toLowerCase().includes(searchTerm.toLowerCase())
    })
  return new TaskList(matchedTaskList);

}

//renders the todo list
function render(task: Task)
{
  if(todoListContainer)  
  {
    todoListContainer.style.display='block'
  }
    const liElement=document.createElement('li')
    liElement.classList.add('todoList__todo-item')

    const todoTopic= document.createElement('span')
    todoTopic.classList.add('todo-desc')
    todoTopic.innerText=task.todo
    liElement.appendChild(todoTopic)

    const descElement= document.createElement('span')
    descElement.classList.add('todo-desc')
    if(task.description)
    {
      descElement.innerText=task.description
    }
    liElement.appendChild(descElement)

    const controlBtn=document.createElement('div')
    controlBtn.classList.add('todoList__control-btn')
    const inputField = document.createElement('button');
     inputField.addEventListener('click', () => {
      toogleTaskCompleted(task.id)
     inputField.classList.toggle('todoList__uncheck-box')
     inputField.classList.toggle('todoList__check-box')

     if(task.completed)
     {
      todoTopic.style.textDecoration="line-through"
      todoTopic.style.color="gray"
      descElement.style.textDecoration="line-through"
      descElement.style.color="gray"

     }
     else 
     {
      todoTopic.style.textDecoration="none"
      todoTopic.style.color="crimson"
      descElement.style.textDecoration="none"
      descElement.style.color="crimson"
     }
      })

    const deleteBtn=document.createElement('img')
    deleteBtn.src="../src/assets/delete-svgrepo-com.svg"
    deleteBtn.addEventListener('click',()=>
    {
         const removeIndex=taskList.list.findIndex((t)=>
       {
        return t.id==task.id
       })
      
        taskList.list.splice(removeIndex,1)

       if(localStorage.getItem('tasklist'))
       {
        const storedData = localStorage.getItem('tasklist');
        const parsedData= storedData?JSON.parse(storedData): []
        parsedData.splice(removeIndex,1)
        localStorage.setItem('tasklist',JSON.stringify(parsedData))  
          
       }
       if(todoLists)
       {
         todoLists.innerHTML=""
       }
      taskList.list.forEach(list=>
        {
          render(list)
        })
      if(taskList.list.length<=0)
      {
        if(noTaskContainer) noTaskContainer.style.display="flex"
        
      }   
    })

    if(task.completed)
    {
      inputField.classList.remove('todoList__uncheck-box')
      inputField.classList.add('todoList__check-box')
      todoTopic.style.textDecoration="line-through"
      if(task.description) descElement.style.textDecoration="line-through"
    }
    else 
    {
      inputField.classList.remove('todoList__check-box')
      inputField.classList.add('todoList__uncheck-box')
      todoTopic.style.textDecoration="none"
      descElement.style.textDecoration="none"
    }
    
    controlBtn.appendChild(inputField)
    controlBtn.appendChild(deleteBtn)
    liElement.appendChild(controlBtn)
    todoLists?.appendChild(liElement)
}

//closes the modal
function closeModal()
  {
    setTimeout(()=>
    {
      if(outlay && modalContainer)
      {
        modalContainer.style.animation="slideDown 1s forwards"
        outlay.style.display="none"
        modalContainer.style.display="none"
      }
    },200)
}

//opens modal 
function openModal()
  {
     setTimeout(()=>
    {
      if(outlay && modalContainer)
      {
        modalContainer.style.animation="slideIn 1s forwards"
        outlay.style.display="block"
        modalContainer.style.display="block"
      }
    },200)
}

//event listeners 
addTodoBtn?.addEventListener('click',(event)=>
{
  event.preventDefault()
  const userInput = addTodoInput?.value 
  if(addTodoInput) addTodoInput.value=""
  if(userInput)
  {
    const task=createTask(userInput as string)
    localStorage.setItem('tasklist',JSON.stringify(taskList.list))
    render(task)
  }
  
  if(noTaskContainer && todoListContainer && userInput)
  {
    noTaskContainer.style.display='none'
  }
})

completedBtn?.addEventListener('click',(e)=>
{
    e.preventDefault
    completedBtn.style.borderBottom="0.1px solid crimson"
    if(homeBtn && remainingBtn)
    {
      homeBtn.style.borderBottom="none"
      remainingBtn.style.borderBottom="none"
    }

    console.log("This is from the completed button");
    
    const completedTask=taskList.list.filter((task)=>
      {
        return task.completed
      })
      if(todoLists)
      {
        todoLists.innerHTML= ''
      }
      completedTask.forEach(task=>
        {

          render(task)
        })
})

remainingBtn?.addEventListener('click',(e)=>
{
    e.preventDefault
    remainingBtn.style.borderBottom="0.1px solid crimson"
    if(homeBtn && completedBtn)
    {
      homeBtn.style.borderBottom="none"
      completedBtn.style.borderBottom="none"
    }
       const remainingTask=taskList.list.filter((task)=>
      {
        return (task.completed==false)
      })
      if(todoLists)
      {
        todoLists.innerHTML= ''
      }
      remainingTask.forEach(task=>
        {
          render(task)
        })

})

homeBtn?.addEventListener('click',(e)=>
{
  e.preventDefault
  if(completedBtn && remainingBtn)
    {
      completedBtn.style.borderBottom="none"
      remainingBtn.style.borderBottom="none"
    }
    homeBtn.style.borderBottom="0.1px solid crimson"
    homeBtn.style.transition="1000ms"
    
   if(todoLists)
      {
        todoLists.innerHTML= ''
      }
  taskList.list.forEach((task)=>
  {
    render(task)
  })
})

searchForm?.addEventListener('submit',(e)=>
{
  e.preventDefault()
  const userSearchInput=searchInput?.value
  const matchingList=search(userSearchInput)
  if(todoLists)
  {
    todoLists.innerHTML=""
  }
  matchingList.list.forEach(list=>
  {
    render(list)
  })


})


//closing modal 
closeBtn?.addEventListener('click',closeModal)
outlay?.addEventListener('click',closeModal)
cancelBtn?.addEventListener('click',closeModal)


//opening modal 
headerOpenModalBtn?.addEventListener('click',openModal)
addTodoOpenModalBtn?.addEventListener('click',openModal)


//creating todo from modal 
modalAddTodo?.addEventListener('click',(event)=>
{
  event.preventDefault()
  const userInput = modalInput?.value 
  const userDesc=modalDesc?.value
  if(modalInput) modalInput.value=""
  if(userInput && userDesc)
  {
    const task=createTask(userInput as string ,false,userDesc as string)
    localStorage.setItem('tasklist',JSON.stringify(taskList.list))
    render(task)
  }
  
  if(noTaskContainer && todoListContainer && userInput)
  {
    noTaskContainer.style.display='none'

  }
  closeModal()

})

window.addEventListener('load',()=>
{
  const localTasklist= localStorage.getItem('tasklist')  
  const parsedLocalTaskList:Task[]= localTasklist?JSON.parse(localTasklist):[]
  console.log(parsedLocalTaskList.length);
  
  
  if(parsedLocalTaskList?.length)
  {
    if(noTaskContainer) noTaskContainer.style.display='none'
    // const localList=localTasklist? JSON.parse(localTasklist) :[]
   Object.values(parsedLocalTaskList).forEach(list=>
    {
      if(list)
      {
        const task = createTask(list.todo,list.completed,list.description);
        render(task)
      }
    })
  }
})
