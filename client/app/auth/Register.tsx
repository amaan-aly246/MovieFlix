// Register.tsx
import AuthScreen from "../components/AuthScreen";

export default function Register() {
  const handleRegister = () => {
    // your register logic
  };
  return <AuthScreen mode="register" onSubmit={handleRegister} />;
}
