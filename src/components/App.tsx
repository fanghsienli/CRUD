import { Users } from "components"
import { UsersContext } from "contexts"

export default function App() {
  const { UsersProvider } = UsersContext;
  return (
    <UsersProvider>
      <Users/>
    </UsersProvider>
  );
}