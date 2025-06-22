// Login.tsx
import AuthScreen from "../components/AuthScreen";

export default function Login() {
  const handleLogin = () => {
    // your login logic
  };
  return <AuthScreen mode="login" onSubmit={handleLogin} />;
}
