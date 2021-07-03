import { useState, useEffect } from 'react';
import './styles/Main.css';
import { Header } from './components/Header';
import { Todos } from './components/Todos';
import { SideMenu } from './components/SideMenu';
import { HomePageSVG } from './components/HomePageSVG';
import { GiConsoleController, GiEvilWings } from 'react-icons/gi';

function App() {
  const [sideMenu, setSideMenu] = useState(false);
  const [displayInput, setDisplayInput] = useState(false);
  const [displaySortBox, setDisplaySortBox] = useState(false);

  window.addEventListener('drag', e => {
    console.log(e.target);
  })

  // Get tasks from the LocalStorage if any.
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  const [tasks, setTasks] = useState(savedTasks || []);
  const [displayDate, setDisplayDate] = useState({});

  // Get Date 
  document.addEventListener('DOMContentLoaded', () => {
    let d = new Date();
    let day;
    switch (new Date().getDay()) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
         day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
    }
    let b = "";
    switch(new Date().getMonth()){
        case 0: b = "January";
            break;
        case 1: b = "February";
            break;
        case 2: b = "March";
            break;
        case 3: b = "April";
            break;
        case 4: b = "May";
            break;
        case 5: b = "June"; 
            break;
        case 6: b = "July";
            break;
        case 7: b = "August";
            break;
        case 8: b = "September";
            break;
        case 9: b = "October";
            break;
        case 10: b = "November";
            break;
        case 11: b = "December";
            break;
        }
    setDisplayDate({day: day, date: d.getDate(), month: b});
  });

  // Add Task to Array & Render
  const addTask = (e) => {
    let inputVal = e.target.parentElement.parentElement.children[0].value;
    inputVal.length > 0 && setTasks([...tasks, {text: inputVal, id: new Date().getTime(), completed: false}]);
    e.target.parentElement.parentElement.children[0].value = '';
  };
  
  // Add Task on enter key
  const addTaskOnKeyDown = (e) => {
    let inputVal = e.target.value;
    inputVal.length > 0 && setTasks([...tasks, {text: inputVal, id: new Date().getTime(), completed: false}]);
    e.target.value = '';
  };
  
  // Save Tasks to LocalStorage after rendering
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
  
  // Toggle Side Menu
  const toggleSideMenu = () => {
    setSideMenu(!sideMenu);
  };
  
  // Toggle Add Task Input 
  const toggleAddTaskInput = () => {
    setDisplayInput(true);
  };
  
  // Cancel & Hide Add Task Input 
  const cancelAddTaskInput = (e) => {
    setDisplayInput(false);
    e.target.parentElement.parentElement.children[0].value = '';
  };
  
  // Autoresize Textarea
  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };
  
  // Delete Todo
  const deleteTask = (e) => {
    switch (e.target.tagName){
      case 'path':
      setTasks(tasks.filter(task => task.id != e.target.parentElement.parentElement.id));
      break
      case 'svg':
      setTasks(tasks.filter(task => task.id != e.target.parentElement.id));
      break
    }
  };
  
  // Check Todo Completed
  const checkTodo = (e) => {
    let id = e.target.parentElement.id;
    setTasks(tasks.map(task => task.id == id ? {...task, completed: !task.completed } : task));
  };
  
  // Clear All Todos 
  const clearAll = () => {
    setTasks([]);
  };
  
  // Toggle Sort Options
  const toggleSortOptions = () => {
    setDisplaySortBox(!displaySortBox);
  };
  
  // Sort Todos
  const sortTodos = (e) => {
    let buttonName = e.target.innerText;
    tasks.map(task => {
      switch (buttonName){
        case 'All': 
        document.getElementById(task.id).style.display = 'grid';
        break

        case 'Completed':
        task.completed ? document.getElementById(task.id).style.display = 'grid' : document.getElementById(task.id).style.display = 'none'
        break

        case 'Not Completed':
        !task.completed ? document.getElementById(task.id).style.display = 'grid' : document.getElementById(task.id).style.display = 'none'
        break
      }
    })
  };
    
  const editTodo = (e) => {
    // let text = e.target.parentElement.innerHTML = `<textarea sty
    console.log(e.target.parentElement.parentElement.children[1]);
  };
  
  // Search Todo
  const searchTodo = (e) => {
    tasks.map(task => {
      if(e.target.value == ''){
        document.getElementById(task.id).style.display = 'grid';
      } else if (task.text.toLowerCase().includes(e.target.value)){
        document.getElementById(task.id).style.display = 'grid';
      } else {
        document.getElementById(task.id).style.display = 'none'};
      }
  )};

  // Reset Search Input 
  const resetSearchInput = (e) => {
    if(e.target.classList.contains('closebtn')){
      e.target.parentElement.parentElement.children[0].children[1].value = '';
      tasks.map(task => document.getElementById(task.id).style.display = 'grid');
    };
  };

  return (
    <>
      <Header toggleSideMenu={toggleSideMenu} searchTodo={searchTodo} resetSearchInput={resetSearchInput} toggleAddTaskInput={toggleAddTaskInput}/>
      <Todos toggleAddTaskInput={toggleAddTaskInput} displayInput={displayInput} cancelAddTaskInput={cancelAddTaskInput} autoResize={autoResize} addTask={addTask} tasks={tasks} deleteTask={deleteTask} checkTodo={checkTodo} clearAll={clearAll} displaySortBox={displaySortBox} toggleSortOptions={toggleSortOptions} sortTodos={sortTodos} editTodo={editTodo} displayDate={displayDate} addTaskOnKeyDown={addTaskOnKeyDown}/>
      <SideMenu sideMenu={sideMenu} />
      <HomePageSVG hide={tasks.length > 0 ? 'homeSvg' : null }/>
    </>
  );
}

export default App;
