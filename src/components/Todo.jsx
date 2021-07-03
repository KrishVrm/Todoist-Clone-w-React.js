import React from 'react'
import { MdDone } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

const showTick = (e) => {

}
export const Todo = ({task, deleteTask, checkTodo, editTodo}) => {
    return (
        <section className='todo-container' id={task.id}>
           <MdDone className={task.completed ? 'ticked' : null} title='Check Task' onClick={e=>checkTodo(e)} onMouseOver={e=>showTick(e)}/>
           <section className="task" style={!task.completed ? {opacity: '1'} : {opacity: '.3'}}>{task.text}</section>
           <AiOutlineClose className='deletebtn' onClick={e=>deleteTask(e)}/>
           <FiEdit3 className='edit' title='Edit Task' onClick={e=>editTodo(e)}/>
        </section>
    )
}
