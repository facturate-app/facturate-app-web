import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import GoogleLoginButton from '../components/GoogleLoginButton';
import { toast } from "react-toastify";
import { useQuery } from "../utils/UseQuery";

const Login = () => {
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const { loginGoogle, isLogged } = useUser();
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    toApp(isLogged());
  }, []);


  const submitGoogle = async (token) => {
    const logged = await loginGoogle(token);
    toApp(logged);
  };

  const toApp = (isLoggedIn) => {
    if (isLoggedIn) {
      const redirection = query.get('redirect_to');
      navigate(redirection === null ? "/web-app/facutacion" : redirection);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-semibold">Facturate</h1>

        <GoogleLoginButton
          clientId={CLIENT_ID}
          onSuccess={(token) => {
            submitGoogle(token);
          }}
          onError={() => {
            toast.error('No se pudo iniciar sesión con Google');
          }}
        />
      </div>
    </div>
  );
};

export default Login;
