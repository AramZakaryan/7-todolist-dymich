import React, {ChangeEvent} from "react";
import {CondType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
    tasks: TaskType[]
    removeTask: (removeTaskId: string, todolistId: string) => void
    changeFilterCond: (cond: CondType, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeStatus: (changeTaskID: string, changeTaskIsDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filterCond: CondType
    changeTaskTitle: (todollistId: string, taskId: string, changedTaskTitle: string) => void
    changeTodolistTitle: (todollistId: string, changedTodolistTitle: string) => void
}


export function Todolist(props: TodolistPropsType) {

    const AllBtnOnClickHandler = () => {
        props.changeFilterCond("All", props.todolistId)
    }

    const ActiveBtnOnClickHandler = () => {
        props.changeFilterCond("Active", props.todolistId)
    }

    const CompletedBtnOnClickHandler = () => {
        props.changeFilterCond("Completed", props.todolistId)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const addTaskIntermediary = (newTaskTitle: string) =>
        props.addTask(newTaskTitle, props.todolistId)


    const changeTodolistTitleIntermediary = (todolistTitle: string) => {
        props.changeTodolistTitle(props.todolistId, todolistTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan updatedTitle={props.todolistTitle} changeSpanContent={changeTodolistTitleIntermediary}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete color={"primary"}/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTaskIntermediary}/>

            <ul>
                {props.tasks.map((el) => {
                        const removeBtnOnClickHandler = () => {
                            props.removeTask(el.id, props.todolistId)
                        }
                        const statusInpOnChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
                            {
                                props.changeStatus(el.id, ev.currentTarget.checked, props.todolistId)
                            }
                        }

                        const changeTaskTitleIntermediary = (changedTaskTitle: string) => {
                            props.changeTaskTitle(props.todolistId, el.id, changedTaskTitle)
                        }

                        return (
                            <li key={el.id}
                                className={el.isDone ? "is-done" : ""}>
                                <Checkbox
                                       onChange={statusInpOnChangeHandler}
                                       checked={el.isDone}
                                />

                                <EditableSpan updatedTitle={el.title} changeSpanContent={changeTaskTitleIntermediary}/>

                                <IconButton onClick={removeBtnOnClickHandler}>
                                    <Delete color={"primary"}/>
                                </IconButton>
                            </li>
                        )
                    }
                )
                }
            </ul>
            <div>
                <Button color={"inherit"}
                    onClick={AllBtnOnClickHandler}
                    // className={props.filterCond === "All" ? "active-filter" : ""}
                        variant={props.filterCond === "All" ? "contained" : "text"}
                > All
                </Button>
                <Button color={"primary"}
                        onClick={ActiveBtnOnClickHandler}
                    // className={props.filterCond === "Active" ? "active-filter" : ""}
                        variant={props.filterCond === "Active" ? "contained" : "text"}
                >Active
                </Button>
                <Button color={"error"}
                        onClick={CompletedBtnOnClickHandler}
                    // className={props.filterCond === "Completed" ? "active-filter" : ""}
                        variant={props.filterCond === "Completed" ? "contained" : "text"}

                >Completed
                </Button>
            </div>

        </div>
    )
}

