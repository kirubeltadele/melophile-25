import LoginForm from "@/components/auth/LoginForm";
import generalLogo from "/general-logo.jpg";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-melophile-50 to-teal-50 flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <img 
          src={generalLogo} 
          alt="Melophile" 
          className="h-80 w-auto mb-8 mx-auto"
        />
        <h1 className="text-3xl font-bold text-melophile-800">Melophile</h1>
        <p className="text-gray-600">Your healthcare companion</p>
      </div>

      <LoginForm />

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>© 2023 Melophile. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
