import { createContext, useReducer, ReactNode, Dispatch } from "react"
import { User } from "types"
enum ActionType {
    Create = "Create",
    Creating = "Creating",
    Created = "Created",
    Update = "Update",
    Updating = "Updating",
    Updated = "Updated",
    Delete = "Delete",
    Deleting = "Deleting",
    Deleted = "Deleted",
    Fail="Fail"
} 

type Action = {
    type: ActionType;
    user: User
}

type UsersContext = {
    users: User[];
    dispatch: Dispatch<Action>
}

const initialState: User[] = []

function reducer(state: User[], action: Action): User[] {
    console.log("preState: ", state)
    console.log("payload: ", action.user)
    let curState: User[]=[]
    switch (action.type) {
        case ActionType.Create:
            if(action.user) curState = [
                ...state,
                action.user
            ]
            break
        case ActionType.Update:
            curState = state.map((user: User) => {
                if (user.no === action.user?.no) {
                    return action.user
                }
                return user
            })
            break
        case ActionType.Delete:
            curState = state.filter((user: User) =>user.no!==action.user?.no)
            break
        default:
            throw new Error();
    }
    console.log("curState: ", curState)
    return curState
}

const Context = createContext<UsersContext>({
    users: initialState,
    dispatch: () => { }
});

function UsersProvider({ children }: { children: ReactNode }) {
    const [users, dispatch] = useReducer(
        reducer,
        initialState,
    );

    return (
        <Context.Provider value={{ users, dispatch }}>
            {children}
        </Context.Provider>
    );
}

export default { UsersProvider, Context, ActionType }
