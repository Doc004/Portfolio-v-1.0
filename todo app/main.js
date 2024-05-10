(function(){
     function createAppTitle(title){
         let appTitle = document.createElement('h2');
         appTitle.innerHTML = title;
         return appTitle;
     }
     function createTodoItemForm(){
         let form = document.createElement('form');
         let input = document.createElement('input');
         let btnWrap = document.createElement('div');
         let btn = document.createElement('button');
         form.classList.add('input-group', 'mb-3');
         input.classList.add('form-control');
         input.placeholder = 'Введите название нового дела';
         btnWrap.classList.add('input-group-append');
         btn.classList.add('btn', 'btn-primary');
         btn.textContent = 'Добавить дело';
         btnWrap.append(btn);
         form.append(input);
         form.append(btnWrap);
         return {
             form,
             input,
             btn,
         };
     }
     function createTodoList(){
         let list = document.createElement('ul');
         list.classList.add('List-group');
         return list;
     }
     function createTodoItem(name){
         let item = document.createElement('li');
         let btnGroup = document.createElement('div');
         let btnDone = document.createElement('button');
         let btnDelete = document.createElement('button');
         item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
         item.textContent = name;
         btnGroup.classList.add('btn-group', 'btn-group-sm');
         btnDone.classList.add('btn', 'btn-success');
         btnDone.textContent = 'Готово';
         btnDelete.classList.add('btn', 'btn-danger');
         btnDelete.textContent = 'Удалить';
         btnGroup.append(btnDone);
         btnGroup.append(btnDelete);
         item.append(btnGroup);
         return {
             item,
             btnDone,
             btnDelete,
         };
     }
     function saveTasksToLocalStorage(tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasksFromLocalStorage() {
      const tasksJSON = localStorage.getItem('tasks');
      return tasksJSON ? JSON.parse(tasksJSON) : [];
  }
  function createTodoApp(container, title) {
      let tasks = loadTasksFromLocalStorage(); 
      let todoAppTitle = createAppTitle(title);
      let todoItemForm = createTodoItemForm();
      let todoList = createTodoList();
      container.append(todoAppTitle);
      container.append(todoItemForm.form);
      container.append(todoList);
      function updateTodoList() {
          todoList.innerHTML = '';
          tasks.forEach(task => {
              let todoItem = createTodoItem(task.name);
              if (task.done) {
                  todoItem.item.classList.add('list-group-item-success');
              }
              todoItem.btnDone.addEventListener('click', function() {
                  todoItem.item.classList.toggle('list-group-item-success');
                  task.done = !task.done; 
                  saveTasksToLocalStorage(tasks); 
              });
              todoItem.btnDelete.addEventListener('click', function() {
                  if (confirm('Вы уверены?')) {
                      todoItem.item.remove();
                      tasks = tasks.filter(t => t !== task); 
                      saveTasksToLocalStorage(tasks); 
                  }
              });
              todoList.append(todoItem.item);
          });
      }
      updateTodoList();
      todoItemForm.form.addEventListener('submit', function(e) {
          e.preventDefault();
          if (!todoItemForm.input.value) {
              return;
          }
          let task = { name: todoItemForm.input.value, done: false };
          tasks.push(task); 
          saveTasksToLocalStorage(tasks); 
          updateTodoList(); 
          todoItemForm.input.value = ''; 
      });
  }
  document.addEventListener('DOMContentLoaded', function() {
      createTodoApp(document.getElementById('my-todos'), 'Мои дела');
  });
 })() ;
 