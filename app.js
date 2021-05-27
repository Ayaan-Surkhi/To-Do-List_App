const todoInterface = document.querySelector('.todos');  
const deafualtText = document.querySelector('.start');
const list = document.getElementById('todo-list');
const addTodo = document.getElementById('new');
const todos = [];

const controls = (newTodo) => {
    const editBtn = document.getElementById(`edit-${todos.length}`);
    const newText = document.getElementById(`new-todo-${todos.length}`);
     editBtn.addEventListener('click', () => {
      edit(newText, editBtn);
     });
      
      const deleteBtn = document.getElementById(`delete-${todos.length}`);
      deleteBtn.addEventListener('click', () => {
        newTodo.remove();     
        todos.forEach((todo, index) => {
         if(todo.todo === newText.textContent){
           todos.splice(index, 1); 
         }
        });

        localStorage.setItem('todos', JSON.stringify(todos));
    });    
      
      const checkBtn = document.getElementById(`check-${todos.length}`);    
      const undoCheck = document.getElementById(`undo-${todos.length}`);  
      
      checkBtn.addEventListener('click', () => {
          check(true, newText);
          checkBtn.style.display = 'none';
          undoCheck.style.display = 'inline';
      }); 
      
      undoCheck.addEventListener('click', () => {
          check(false, newText);
          checkBtn.style.display = 'inline';
          undoCheck.style.display = 'none';
      }); 
  }

if(localStorage.length !== 0){
   const previousValues = JSON.parse(localStorage.getItem('todos')); 
   previousValues.forEach(value => {
    todos.push(value); 
    const newTodo = document.createElement('div');
    newTodo.setAttribute('class', 'whole-todo');
    deafualtText.innerHTML = '';
    newTodo.innerHTML =  `<p class = 'point'>\u2022</p> <div class = 'new-todo'> <p class="todo" id = 'new-todo-${todos.length}'>${value.todo}</p> <h6 class="time">${value.time}</h6> </div><i class="far fa-check-square check" id = 'check-${todos.length}'></i> <i class="fas fa-undo undo" id = 'undo-${todos.length}'></i> <i class="fas fa-edit edit" id = 'edit-${todos.length}'></i> <i class="fas fa-trash-alt delete" id = 'delete-${todos.length}'></i>`;
    list.appendChild(newTodo);
    const newText = document.getElementById(`new-todo-${todos.length}`);
    const todoIndex = todos.findIndex((todo) => {
        return todo.todo === newText.textContent; 
    });        
    
    if(todos[todoIndex].checked === true){
    const checkBtn = document.getElementById(`check-${todos.length}`);    
    const undoCheck = document.getElementById(`undo-${todos.length}`);    
    checkBtn.style.display = 'none';
    undoCheck.style.display = 'inline';
    newText.style.textDecoration = 'line-through';
    }

    todoInterface.scrollTop = todoInterface.scrollHeight;
    controls(newTodo);
});
}

addTodo.addEventListener('change', (e) => {   
    const newTodo = document.createElement('div');
    newTodo.setAttribute('class', 'whole-todo');
    deafualtText.innerHTML = '';
    const date = new Date();
    const day = (date.getDay() === 0) ? ('Sunday') 
              : (date.getDay() === 1) ? ('Monday')
              : (date.getDay() === 2) ? ('Tuesday')
              : (date.getDay() === 3) ? ('Wednesday')
              : (date.getDay() === 4) ? ('Thursday')
              : (date.getDay() === 5) ? ('Friday')
              : ('Saturday');
  
    const newTodoObj = 
    {
        todo: e.target.value,
        time: `${day} ${date.getHours()}:${date.getMinutes()}`,
        checked: false,
    }
    todos.push(newTodoObj);
    localStorage.setItem('todos', JSON.stringify(todos));
    newTodo.innerHTML =  `<p class = 'point'>\u2022</p> <div class = 'new-todo'> <p class="todo" id = 'new-todo-${todos.length}'>${e.target.value}</p> <h6 class="time">${newTodoObj.time}</h6> </div><i class="far fa-check-square check" id = 'check-${todos.length}'></i> <i class="fas fa-undo undo" id = 'undo-${todos.length}'></i> <i class="fas fa-edit edit" id = 'edit-${todos.length}'></i> <i class="fas fa-trash-alt delete" id = 'delete-${todos.length}'></i>`;

    console.log(todos);
    list.appendChild(newTodo);
    todoInterface.scrollTop = todoInterface.scrollHeight;

    e.target.value = '';

    controls(newTodo);

    const check = (bool, newText) => {
        const todoIndex = todos.findIndex((todo) => {
            return todo.todo === newText.textContent; 
        });        

        if(bool === false){
            newText.style.textDecoration = 'none';  
            todos[todoIndex].checked = false;
            localStorage.setItem('todos', JSON.stringify(todos));
        }else{    
            newText.style.textDecoration = 'line-through';  
            todos[todoIndex].checked = true;
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }
    
    const edit = (newText,) => {
        newText.setAttribute('contenteditable', 'true');
        newText.focus();   

    const todoIndex = todos.findIndex((todo) => {
       return todo.todo === newText.textContent; 
    });    

      newText.addEventListener('input', (e) => {
        todos[todoIndex].todo = newText.textContent;
        localStorage.setItem('todos', JSON.stringify(todos));               
    });
}
