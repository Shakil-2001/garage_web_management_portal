import "./styles/main.css";

import LoginForm from "./components/LoginForm/LoginForm";

export const metadata = {
  title: 'Garage Management Web Portal',
}

export default function Page() {
  return (
    <>
      <LoginForm />
    </>
  );
}

