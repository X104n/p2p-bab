import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { getUser } from "@/lib/session";

// Main App Component
const App = async () => {
  const user = await getUser();

  // If user is already authenticated, redirect to dashboard
  if (user) {
    redirect("/dashboard");
  }

  // Only render login form if not authenticated
  return (
    <div className="app">
      <LoginForm />
    </div>
  );
};

export default App;