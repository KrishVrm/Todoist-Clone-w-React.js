import React, { useState } from 'react';
import { Todo } from './Todo';
import { IoAddSharp } from 'react-icons/io5';
import { BiSort } from 'react-icons/bi';
import { MdClearAll } from 'react-icons/md';

export const Todos = ({displayInput, toggleAddTaskInput, cancelAddTaskInput, autoResize, addTask, tasks, deleteTask, checkTodo, clearAll, toggleSortOptions, displaySortBox, sortTodos, editTodo, searchText, displayDate, addTaskOnKeyDown}) => {

    const placeholderSample = ['Water the plants', 'Get the groceries', 'Study Calculus', 'Pick up someone', 'Read Percy Jackson', 'Learn Portuguese', 'Conference meeting', 'Go on a date', 'Eat fruits', 'Hit the gym', 'Play with homies'];

    return (
        <main className='container'>
            <section className="title-container">
                <div className="date" style={{opacity: '.3', fontSize: '14px'}}>{displayDate.day} {displayDate.date} {displayDate.month}</div>

                <div onClick={clearAll} style={tasks.length > 1 ? {display: 'flex'} : {display: 'none'}} className="clearBtnContainer tertiary_btn">
                    <MdClearAll/>
                    <button className="tertiary_btn">Clear All</button>
                </div>

                <div className="sort-container tertiary_btn">
                    <div className="sortBtnContainer" onClick={toggleSortOptions}>
                        <BiSort/>
                        <button className="sortBtn tertiary_btn">Sort</button>
                    </div>
                    <div className="toggleOptionsBox" style={displaySortBox ? {display: 'flex'} : {display: 'none'}} onClick={e=>sortTodos(e)}>
                        <button className="options tertiary_btn">All</button>
                        <button className="options tertiary_btn">Completed</button>
                        <button className="options tertiary_btn">Not Completed</button>
                        <button className="options tertiary_btn">By Priority</button>
                        <button className="options tertiary_btn">Alphabetically</button>
                    </div>
                </div>
            </section>

            <section className="todos-container">
                {tasks.map(task=><Todo key={task.id} searchText={searchText} checkTodo={checkTodo} deleteTask={deleteTask} task={task} editTodo={editTodo}/>)}
            </section>

            <section className="inputs-btns-container">
                <button className="addtaskbtn" onClick={toggleAddTaskInput} style={displayInput ? {display: 'none'} : {display: 'flex'}}>
                    <IoAddSharp style={{color: '#de4c4a'}}/> Add Task
                </button>
                <div className="input-container" style={!displayInput ? {display: 'none'} : {display: 'flex'}}>
                    <textarea onKeyDown={e => {if (e.keyCode == 13){
                        e.preventDefault()
                        addTaskOnKeyDown(e)}}}
                        onInput={e=>autoResize(e)} type="text" spellCheck='false' className="taskInput" style={displayInput ? {display: 'block'} : {display: 'none'}} placeholder={`e.g., ${placeholderSample[Math.floor(Math.random() * placeholderSample.length)]}`}/>
                    <div className="btns-container">
                        <button className="addbtn primary_btn" onClick={e=>addTask(e)}>Add Task</button>
                        <button className="cancelbtn secondary_btn" onClick={e=>cancelAddTaskInput(e)}>Cancel</button>
                    </div>
                </div>
            </section>
        </main>
    )
}
