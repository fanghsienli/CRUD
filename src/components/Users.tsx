import { UsersContext } from "contexts";
import { useContext, useEffect, useState } from "react";
import { User } from "types";
import { UserPopup } from "components";
import { FiPlus, FiEdit2, FiDelete } from "react-icons/fi";
import "./Users.css";
export default function Users() {
    const { users, dispatch } = useContext(UsersContext.Context)
    const Actions = UsersContext.ActionType
    const [open, setOpen] = useState<boolean>()
    const [selectedUser, setSelectedUser] = useState<User>()

    useEffect(() => {
        if(selectedUser)setOpen(true)
    }, [selectedUser])

    function Add(){        
        setSelectedUser(undefined)
        setOpen(true)
    }
    return <>
        <FiPlus className="beRight" onClick={Add} />
        {open && <UserPopup onClose={async () => setOpen(false)} user={selectedUser} />}
        <table><thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>edit</th>
                <th>delete</th>
            </tr>
        </thead>
            <tbody>
                {users.map((user: User) => <tr key={user.no}>
                    <td>{user.no}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td className="pointer"><FiEdit2 onClick={() => setSelectedUser(user)} /></td>
                    <td className="pointer"><FiDelete onClick={() => dispatch({ type: Actions.Delete, user })} /></td>
                </tr>)}
            </tbody>
        </table>

    </>
}