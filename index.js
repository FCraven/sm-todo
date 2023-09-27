
//read from local storage
function getTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  return todos;
}

//update local storage
function setTodos(arr) {
  const todosToSave = JSON.stringify(arr);
  localStorage.setItem("todos",todosToSave);
}

//delete from local storage
function deleteTodo(id) {
  const todos = getTodos();
  const filteredTodos= todos.filter(function(el){
    return el.id != id
  })
  setTodos(filteredTodos)
}

function createTodo(info) {
  //CREATE LIST ITEM CONTAINERS AND BUTTONS
  const todo = document.createElement('li');
  const todoText = document.createElement('p');
  const buttonHolder = document.createElement('div');
  const completeButton = document.createElement('span');
  const deleteButton = document.createElement('button');

  todo.dataset.id = info.id;

  todoText.appendChild(document.createTextNode(info.content));
  todoText.classList.add('todo-text', 'glass', 'glow-text');

  completeButton.dataset.isComplete = info.isComplete;
  if(completeButton.dataset.isComplete === 'true'){
    todoText.classList.add('blurred')
  }

  if(completeButton.dataset.isComplete === 'true') {
    completeButton.innerHTML = '&#x2705';
  } else { completeButton.innerHTML = '&#x2610'};

  completeButton.addEventListener('click', function(evt){
    const id = this.parentNode.parentNode.dataset['id'];
    if(evt.target.dataset.isComplete === 'false') {
      this.dataset.isComplete = 'true';
      this.innerHTML = '&#x2705';
      this.parentNode.parentNode.firstChild.classList.add('blurred')
      const updatedTodos = getTodos().map(function(el) {
        if(id === el.id){
          el.isComplete = true;
        }
        return el;
      })
      setTodos(updatedTodos)
    }
      else {
        this.dataset.isComplete = 'false';
        this.innerHTML = "&#x2610";
        this.parentNode.parentNode.firstChild.classList.remove('blurred')
        const updatedTodos = getTodos().map(function(el) {
          if(id === el.id){
            el.isComplete = false;
          }
          return el;
        })
        setTodos(updatedTodos)
    }
  })

  completeButton.setAttribute("id","complete-button");
  completeButton.classList.add("glow-text", "glass");

  deleteButton.innerHTML = 'X';
  deleteButton.setAttribute("id","delete-button");
  deleteButton.addEventListener("click", function(evt) {
    const id = this.parentNode.parentNode.dataset['id'];
    deleteTodo(id);
    refresh();
  })
  deleteButton.classList.add("glow-text", "glass")

  buttonHolder.setAttribute('id','button-holder');
  buttonHolder.appendChild(completeButton)
  buttonHolder.appendChild(deleteButton)

  todo.appendChild(todoText);
  todo.appendChild(buttonHolder);
  console.log(todo)

  return todo;
}

//fill todo list
function populateTodos() {
  const todoList = document.getElementById('todo-list');
  const todos = getTodos();

  todos.forEach((function(el) {
    const todoItem = createTodo(el);
    todoItem.classList.add('todo-item')
    todoList.appendChild(todoItem)
  }))
}

//wipe todo input
function clearInput() {
  const input = document.getElementById('todo-input');
  input.value = '';
}

//wipe todo container clean
function clearTodoList() {
  const todoList = document.getElementById('todo-list');
  while(todoList.firstChild) {
    todoList.removeChild(todoList.lastChild)
  }
}

//empty LS
function clearStorage() {
  localStorage.clear();
  clearTodoList();
}

//wipee UI
function clearUI() {
  clearInput();
  clearTodoList();
}

//wipe UI and fill todos from LS
function refresh(){
  clearUI();
  populateTodos()
};

//write to todo local storage
function writeTodo() {
  const input = document.getElementById('todo-input');
  let { value } = input;

  if(value === '') {
    value = "Nothing todo!"
  }

  const newTodo = {
    id: new Date().valueOf().toString(),
    content: value,
    isComplete: false
  }
  let todos = getTodos();
  todos.push(newTodo)
  setTodos(todos)
  refresh();
}

// initialize app
function init() {
  populateTodos();
}


init();
