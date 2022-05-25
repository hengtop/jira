import { useAuth } from "context/auth";
import { Index as ProjectList } from "screens/project-list";
export default function Index() {
  const { logout, user } = useAuth();
  return (
    <div className="App">
      hello jira~~~
      {user ? `登录成功${user.name}` : ""}
      <ProjectList />
      <button onClick={logout}>登出</button>
    </div>
  );
}
