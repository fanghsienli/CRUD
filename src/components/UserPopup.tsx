import { UsersContext } from "contexts"
import React, { useContext, useEffect, useRef, useState } from "react"
import "./UserPopup.css"
import { GrClose } from "react-icons/gr"
import { User } from "types"


type UserPopupProps = {
    onClose: () => {}
    user?: User
}

export default function UserPopup({ onClose, user }: UserPopupProps) {

    const { users, dispatch } = useContext(UsersContext.Context)
    const Actions = UsersContext.ActionType
    const [name, setName] = useState<string>(user?.name||"")
    const [email, setEmail] = useState<string>(user?.email||"")
    const [phone, setPhone] = useState<string>(user?.phone||"")





    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        let filter = /^([0-9 +-])+$/;
        if (!filter.test(e.key)) e.preventDefault()
    }

    function onSubmit() {
        let submit = false
        console.log(users.map(u => parseInt(u.no)))
        const nextNo = (Math.max(...users.map(u => parseInt(u.no)),0) + 1).toString()
        if (email) {
            let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (filter.test(email)) {
                submit = true
            } else {
                alert("email format error")
            }
        }
        if (submit) {
            if (user) dispatch({
                type: Actions.Update, user: {
                    no: user.no,
                    name,
                    email,
                    phone
                }
            })
            else dispatch({
                type: Actions.Create, user: {
                    no: nextNo,
                    name,
                    email,
                    phone
                }
            })
            onClose()//onClick={onClose}
        }
    }
    function onNameChange (e:React.ChangeEvent<HTMLInputElement>){
        setName(e.target.value)
    }
    function onEmailChange (e:React.ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value)
    }
    function onPhoneChange (e:React.ChangeEvent<HTMLInputElement>){
        setPhone(e.target.value)
    }
    return <div className="popupBackground" >
        <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="close" onClick={onClose}>
                <GrClose />
            </div>
                <div className="text">
                    <label htmlFor="no">No</label>
                    {user ? user.no : ""}
                </div>
                <div className="text">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} name="name" onChange={onNameChange} />
                </div>
                <div className="text">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} name="email" onChange={onEmailChange} />
                </div>
                <div className="text">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" value={phone} name="phone" onChange={onPhoneChange} onKeyDown={onKeyDown} />
                </div>
            <button className="submit" onClick={onSubmit}>
                {user ? "Modify" : "Insert"}
            </button>
        </div>
    </div >
}