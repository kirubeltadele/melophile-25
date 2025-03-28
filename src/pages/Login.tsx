
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-melophile-50 to-teal-50 flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-2 bg-melophile-600 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 19a6 6 0 0 0 5.7-4"></path>
            <path d="M15 4a6 6 0 0 0-5.7 4"></path>
            <path d="M13 16l-3-2"></path>
            <path d="M4 12h7"></path>
            <path d="M15 9l-3 2"></path>
            <path d="M13 7l3 2"></path>
            <path d="M13 12h7"></path>
            <path d="M19 16l-3-2"></path>
            <path d="M19 8l-3 2"></path>
          </svg>
        </div>
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
