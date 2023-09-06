import React, {useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddCircleOutline, ControlPoint, Delete} from "@mui/icons-material";

export type AddItemFormProps = {
    addItem: (newTaskTitle: string) => void
}
export const AddItemForm: React.FC<AddItemFormProps> = (props) => {

    const [inpValue,
        setInpValue]
        = useState("")

    const [error,
        setError]
        = useState<string>("")

    const inpOnChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setInpValue(ev.currentTarget.value)
        setError("")
    }

    const enterInpOnKeyDownHandler = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.code === "Enter" && inpValue.trim() !== "") {
            props.addItem(inpValue)
            setInpValue("")
        } else {
            setError("Title is required!!!")
        }
    }

    const AddBtnOnClickHandler = () => {
        if (inpValue.trim() !== "") {
            props.addItem(inpValue)
            setInpValue("")
        } else {
            setError("Title is required!!!")
        }
    }


    return (<div>
        <TextField variant={"outlined"}
                   label={"Type Value"}
                   value={inpValue}
                   onChange={inpOnChangeHandler}
                   onKeyDown={enterInpOnKeyDownHandler}
                   className={error ? "error" : ""}
                   error={!!error}
                   helperText={error}
        />
        <IconButton
            color={"primary"}
            onClick={() => AddBtnOnClickHandler()}
        >
            <ControlPoint/>
        </IconButton>
        {/*{error && <div className="error-message">Title is required!</div>}*/}
    </div>)
}