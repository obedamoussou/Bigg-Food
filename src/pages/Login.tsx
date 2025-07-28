import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  onClose: () => void;
};

const Login = ({ onClose }: LoginProps) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ici tu pourrais ajouter une logique d'authentification
    onClose();
    navigate("/favorites");
  };

  return (
    <div className="w-full h-full bg-black/30 fixed top-0 left-0 z-50 flex justify-center items-center overflow-auto">
      <div className="flex flex-col justify-center items-center gap-8 bg-white w-80 md:w-96 py-12 px-5 rounded-xl relative">
        <div
            onClick={onClose}
            className=" absolute top-2 right-2"
        >
            <X />
        </div>
        <a href="" className="text-4xl font-semibold">
          BIGG <span className="text-[#fab55f]">FOOD</span>
        </a>
        <h1 className="text-2xl font-medium">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <input type="text" placeholder="User Name" required className="bg-slate-100 p-4 w-full rounded-md outline-none" />
          </div>
          <div>
            <input type="password" placeholder="Password" required className="bg-slate-100 p-4 w-full rounded-md outline-none" />
          </div>
          <button type="submit" className="bg-blue-500 w-full py-3 mt-5 rounded-md text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
