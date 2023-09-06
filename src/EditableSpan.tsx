import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    updatedTitle: string
    changeSpanContent: (newTitle:string)=>void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [inpValue, setInpValue] = useState("")

    const activateEditMode = () => {
        setEditMode(true)
        setInpValue(props.updatedTitle)
    }

    const activateViewMode = ()=> {
        setEditMode(false)
        props.changeSpanContent(inpValue)
    }

    const onChangeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        setInpValue(ev.currentTarget.value)
    }
    return (<>
        {editMode
            ? <TextField variant={"standard"}
                value={inpValue}
                     onBlur={activateViewMode}
                     autoFocus={true}
                     onChange={onChangeHandler}/>
            : <span onClick={activateEditMode} >{props.updatedTitle} </span>
        }
    </>)
}