import { useAuth } from "context/auth";
import UnauthenticatedApp from "unauthenticated-app";
import AuthenticatedApp from "authenticated-app";
import ErrorBoundary from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
