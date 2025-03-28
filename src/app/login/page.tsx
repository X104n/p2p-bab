import { Dashboard } from "@/components/dashboard";
import { LoginForm } from "@/components/login-form";
import { getUser } from "@/lib/session";

// Main App Component
const App = async () => {
  const user = await getUser();

  // Render logic
  return (
    <div className="app">
      {user ? <Dashboard user={user} /> : <LoginForm />}
    </div>
  );
};

export default App;