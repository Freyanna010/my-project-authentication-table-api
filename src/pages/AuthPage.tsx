import React from "react";
import { AuthForm } from "../modules/Auth";

const AuthPage: React.FC = () => (
    <div>
      <h2>Авторизуйтесь, чтобы получить доступ</h2>
      <AuthForm />
    </div>
  );

export default AuthPage;
