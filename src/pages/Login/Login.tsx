import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup'
import {schema} from "../../utils/validation"
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";

import { useMutation } from '@tanstack/react-query'
import { AuthResponse }   from "../../utils/http";
import http from "../../utils/http"
import { useAuth, User } from "../../context/app.context";
import login from '../../assets/login_register.png'
import { saveAccessToken } from "../../utils/auth";
type Inputs = {
  email: string
  password: string
}
const Login = () => {
  const loginSchema = schema.pick(["email","password"])
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(loginSchema)
  })
  const { setUser, setIsAuthenticated } = useAuth();
 
  const loginMutation = useMutation({
    mutationFn:  async (data: { email: string; password: string }) : Promise<AuthResponse>=> {
      const response = await http.post('/v1/signin', data);
      return response  as unknown as AuthResponse;
    },
    onSuccess: (response: AuthResponse) => {
      console.log('Login successful:', response)
      const userInfo : User = {
        user: "Current User",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        email: register("email").name,
        password: register("password").name,
        bankAccount: "**** **** **** 1234",
        bankCV: "123"
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      setUser(userInfo);
      setIsAuthenticated(true);
      saveAccessToken(response.data.accessToken)
      navigate('/')
    },
    onError: (error) => {
      toast.error('Login failed: ' + (error as Error).message)
      console.error('Login error:', error)
    }
  })
  const onSubmit = handleSubmit(async (data)=>{
    console.log(data)
    loginMutation.mutate(data)
    
  })
  
  return (
    <div className="bg-neutral-100">
      <div className="container">
        <div className="grid grid-cols-1 py-6 lg:grid-cols-5 lg:py-12 lg:pr-5">
            <div className="hidden lg:flex justify-center items-center lg:col-span-2 lg:col-start-1">
                <img className="max-h-[500px]" src={login} alt="Illustration"/>
            </div>
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="rounded bg-white p-10 shadow-sm" onSubmit={onSubmit}>
              <div className="text-2xl">Đăng nhập</div>
              <input
                {...register("email")}
                type="text"
                className="mt-8 p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                placeholder="Số điện thoại/Tên đăng nhập"
              />
              <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm">{errors.email?.message}</div>
              <input
              {...register("password")}
                type="password"
                className="mt-2 p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                placeholder="Mật khẩu"
              />
              <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm">{errors.password?.message}</div>
              <div className="mt-3">
                <button type="submit" className="flex  w-full items-center justify-center rounded-2xl bg-[#1AB3BC] py-4 px-2 text-sm uppercase text-white hover:bg-blue-600">
                {loginMutation.isPending && (
                      <svg
                        aria-hidden='true'
                        className='mr-2 h-4 w-4 animate-spin fill-white text-gray-200'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg>
                      )}
                    Đăng nhập
                </button>
                {/* <a
                  href="#"
                  className="text-[#1AB3BC] hover:underline hover:text-red-400"
                >
                  Quên mật khẩu
                </a> */}
              </div>
               {/*---------------- Hoặc---------------*/}
          <div className="relative my-8 flex justify-center text-gray-400 w-full">
            
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 "></div>
            </div>
            <span className="relative bg-white px-4">Hoặc</span>
          </div>

           {/* Đây các nút đăng nhập bằng Facebook và Google  */}
          <div className="flex justify-between">
            <button className="flex items-center justify-center w-full mr-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook Logo"
                className="h-5 mr-2"
              />
              FaceBook
            </button>
            <button className="flex items-center justify-center w-full ml-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
                alt="Google Logo"
                className="h-5 mr-2"
              />
              Google
            </button>
          </div>
 {/* --------------------------------------- */}
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400">Bạn chưa có tài khoản?</span>
                <a href="/register" className="ml-1 text-red-400" >
                  Đăng ký
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
