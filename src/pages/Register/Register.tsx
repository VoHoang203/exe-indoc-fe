import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import {schema,Schema} from "../../utils/validation"
import { useNavigate } from "react-router-dom"
import http from "../../utils/http"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"
// import { useEffect, useRef, useState } from "react"
// import muitenImage from "../../assets/muiten.png"
// import logoFacebook from "../../assets/logo_facebook.png"
// import logoGoogle from "../../assets/logo_google.png"
// import tick from "../../assets/tick.png"
import login from '../../assets/login_register.png'
import { AxiosError } from "axios"
// import { getAccessToken } from "../../utils/auth"
export type RegisterInputs = Pick<Schema,"email"|"password"|"confirm_password" >
// enum RegisterStep {
//   Index,
//   XacMinh,
//   TaoMatKhau,
//   HoanThanh
// }

// const Register: React.FC = () => {
//   const [step, setStep] = useState<RegisterStep>(RegisterStep.Index);
//   const [email, setEmail] = useState<string>('');
//   const [verificationCode, setVerificationCode] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const navigate = useNavigate();
//   const handleIndexNext = (value: string) => {
//     setEmail(value);
//     setStep(RegisterStep.XacMinh);
//   };

//   const handleXacMinhNext = (code: string) => {
//     setVerificationCode(code);
//     setStep(RegisterStep.TaoMatKhau);
//   };

//   const handleTaoMatKhauNext = (pass: string) => {
//     setPassword(pass);
//     setStep(RegisterStep.HoanThanh);
//   };
//   const checkEmailMutation = useMutation({
//     mutationFn: async (email: string) => {
//       const response = await http.post('http://localhost:3001/api/auth/check-email', { email });
//       return response.data;
//     },
//     onSuccess: () => {
//       setStep(2); // Move to OTP verification step
//       toast.success('OTP has been sent to your email.');
//     },
//     onError: (error: AxiosError<{ message?: string }>) => {
//       toast.error(error.response?.data.message || 'Email already exists.');
//     },
//   });

//   const confirmOtpMutation = useMutation({
//     mutationFn: async (data: { OTP: string; email: string }) => {
//       const response = await http.post('http://localhost:3001/api/v1/confirm/otp', data);
//       return response.data;
//     },
//     onSuccess: () => {
//       setStep(3); // Move to password creation step
//       toast.success('OTP confirmed successfully.');
//     },
//     onError: (error: AxiosError<{ message?: string }>) => {
//       toast.error(error.response?.data.message || 'Failed to confirm OTP.');
//     },
//   });
//   const registerMutation = useMutation({
//     mutationFn: async (data: { email: string; password: string }) => {
//       const response = await http.post('http://localhost:3001/api/v1/signup', data);
//       return response.data;
//     },
//     onSuccess: () => {
//       toast.success('Registration successful.');
//       navigate('/login');
//     },
//     onError: (error: AxiosError<{ message?: string }>) => {
//       toast.error(error.response?.data.message || 'Registration failed.');
//     },
//   });
//   const renderStep = () => {
//     switch (step) {
//       case RegisterStep.Index:
//         return <RegisterIndex onNext={handleIndexNext} />;
//       case RegisterStep.XacMinh:
//         return <RegisterXacMinh onNext={handleXacMinhNext} phoneNumber={email} currentStep={1}/>;
//       case RegisterStep.TaoMatKhau:
//         return <RegisterTaoMatKhau onNext={handleTaoMatKhauNext} currentStep={2}/>;
//       case RegisterStep.HoanThanh:
//         return <RegisterHoanThanh phoneNumber={email} currentStep={3}/>;
//     }
//   };
//   useEffect(() => {
//     console.log('Verification code:', verificationCode + ' ' + password);
//   }, [verificationCode,password]);
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       {renderStep()}
//   </div>
//   );
// };

const Register2 :React.FC = () =>{
  const registerSchema = schema.pick(["email","password" ,"confirm_password"])
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(registerSchema)
  })
  const registerMutation = useMutation({
    mutationFn: async (data: {email:string, password:string}): Promise<void> => {
      const response = await http.post('v1/signup', data); // Sửa đoạn này
      console.log(response)
    },
    onSuccess: (response) => {
      console.log('Registration successful:', response)
      toast.success('Registration successful')
      navigate('/login')
    },
    onError: (error:AxiosError) => {
      const statusCode = error.response?.status;
      const errorMessage = (error.response?.data as { message?: string }).message || error.message;
      toast.error(`Registration failed:  ${statusCode}: ${errorMessage}`);
      console.error('Login error:', { statusCode, errorMessage });
    },
  })
  
  const onSubmit = handleSubmit(async (data) => {
    console.log({ email: data.email, password: data.password })
    registerMutation.mutate({ email: data.email, password: data.password })
  });
  

  return (
    <div className="bg-neutral-100">
      <div className="container">
        <div className="grid grid-cols-1 py-6 lg:grid-cols-5 lg:py-12 lg:pr-5">
            <div className="hidden lg:flex justify-center items-center lg:col-span-2 lg:col-start-1">
                <img className="max-h-[500px]" src={login} alt="Illustration"/>
            </div>
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="rounded bg-white p-10 shadow-sm" onSubmit={onSubmit}>
              <div className="text-2xl">Đăng ký</div>
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
              <input
              {...register("confirm_password")}
                type="password"
                className="mt-2 p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                placeholder="Mật khẩu"
              />
              <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm">{errors.confirm_password?.message}</div>
              <div className="mt-3">
                <button className="flex  w-full items-center justify-center rounded-2xl bg-[#1AB3BC] py-4 px-2 text-sm uppercase text-white hover:bg-blue-600">
                {registerMutation.isPending && (
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
                    Đăng ký
                </button>
                <a
                  href="/login"
                  className="text-[#1AB3BC] hover:underline hover:text-red-400"
                >
                  Đã có tài khoản
                </a>
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
            <button className="flex items-center justify-center w-full mr-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
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
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register2
// interface RegisterIndexProps {
//   onNext: (email: string) => void;
// }

// const RegisterIndex: React.FC<RegisterIndexProps> = ({ onNext }) => {
//   const [email, setEmail] = useState<string>('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onNext(email);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-10 w-[520px]  opacity-1 animate-fadeIn">
//       <h3 className="text-xl font-medium text-[#504C4C] mb-12">Đăng ký</h3>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder=" Email"
//           className="w-full h-10 px-3 rounded border border-[#8D8C8C] focus:border-[#868585] outline-none text-[#8D8C8C] transition-all duration-300"
//         />
//         <button type="submit" className="w-full mt-10 py-3 bg-[#1AB3BC] hover:bg-[#1699a0] text-white rounded cursor-pointer transition-colors duration-300">
//           Tiếp theo
//         </button>
//       </form>
//       <div className="flex items-center justify-between mt-10">
//         <div className="flex-grow h-px bg-[#8D8C8C]"></div>
//         <span className="px-4 text-[#504C4C]">Hoặc</span>
//         <div className="flex-grow h-px bg-[#8D8C8C]"></div>
//       </div>
//       <div className="flex justify-between mt-10 gap-5">
//         <button className="flex-1 flex items-center justify-center gap-2 border border-[#9f9f9f] py-2 rounded transition-all duration-300 hover:bg-gray-100">
//           <img src={logoFacebook} className="h-5" />
//           <span className="text-[#828282]">Facebook</span>
//         </button>
//         <button className="flex-1 flex items-center justify-center gap-2 border border-[#9f9f9f] py-2 rounded transition-all duration-300 hover:bg-gray-100">
//           <img src={logoGoogle}  className="h-5" />
//           <span className="text-[#828282]">Google</span>
//         </button>
//       </div>
//       <div className="mt-10 text-center text-sm">
//         <p>Bằng việc đăng kí, bạn đã đồng ý với Shopee về</p>
//         <p>
//           <a href="#" className="text-[#1AB3BC] hover:underline transition-all duration-300">Điều khoản và dịch vụ</a> &
//           <a href="#" className="text-[#1AB3BC] hover:underline transition-all duration-300">Chính sách bảo mật</a>
//         </p>
//       </div>
//       <div className="mt-15 text-center text-sm text-[#828282] hover:underline transition-all duration-300">
//         Bạn đã có tài khoản ? <a href="#" className="text-[#1AB3BC]">Đăng nhập</a>
//       </div>
//     </div>
//   );
// };

// interface RegisterXacMinhProps {
//   onNext: (verificationCode: string) => void;
//   phoneNumber: string;
//   currentStep: number;
// }

// const RegisterXacMinh: React.FC<RegisterXacMinhProps> = ({ onNext, phoneNumber,currentStep }) => {
//   const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const accessToken = getAccessToken()
//   const confirmOtpMutation = useMutation({
//     mutationFn: async (otp: string) => {
//       const response = await http.post('https://indocs.click/api/v1/confirm/otp/ca5a8d7f-df2f-49be-a107-99ca32a4d111', { OTP: otp });
//       return response.data;
//     },
//     onSuccess: () => {
//       toast.success('OTP confirmed successfully');
//       onNext(verificationCode.join(''));
//     },
//     onError: (error) => {
//       toast.error('Failed to confirm OTP: ' + (error as Error).message);
//     }
//   });
//   const resendOtpMutation = useMutation({
//     mutationFn: async () => {
//       const response = await http.post('https://indocs.click/api/v1/reconfirm/otp', {}, {
//         headers: { Authorization: `Bearer ${accessToken}` } // Ensure accessToken is available
//       });
//       return response.data;
//     },
//     onSuccess: () => {
//       toast.success('OTP resent successfully');
//     },
//     onError: (error) => {
//       toast.error('Failed to resend OTP: ' + (error as Error).message);
//     }
//   });

//   useEffect(() => {
//     inputRefs.current[0]?.focus();
//   }, []);
//   const handleInputChange = (index: number, value: string) => {
//     if (value.length <= 1) {
//       const newVerificationCode = [...verificationCode];
//       newVerificationCode[index] = value;
//       setVerificationCode(newVerificationCode);

//       if (value.length === 1 && index < 5) {
//         inputRefs.current[index + 1]?.focus();
//       }
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const code = verificationCode.join('');
//     if (code.length === 6) {
//       confirmOtpMutation.mutate(code);
//     }
//   };

//   return (
//     <>
//     <StepIndicator currentStep={currentStep} />
//      <div className="bg-white rounded-lg shadow-md p-10 w-[520px] text-center opacity-0 animate-fadeIn">
//       <h3 className="text-xl font-medium text-[#504C4C] mb-5">Nhập mã xác nhận</h3>
//       <p className="text-[#00000066]">Mã xác nhận đã được gửi tới email</p>
//       <p className="text-[#00000066] mt-2">{phoneNumber}</p>

//       <form onSubmit={handleSubmit}>
//         <div className="flex justify-between mt-24 mb-10 px-7">
//           {verificationCode.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength={1}
//               value={digit}
//               ref={el => inputRefs.current[index] = el}
//               onChange={(e) => handleInputChange(index, e.target.value)}
//               className="w-12 h-12 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:border-[#66afe9] focus:shadow-[0_0_5px_rgba(102,175,233,0.5)] outline-none transition-all duration-300"
//             />
//           ))}
//         </div>

//         <p className="text-sm text-[#6c757d] mt-10">Bạn vẫn chưa nhận được? </p>
//         <p className="text-sm text-[#6c757d] mb-2">
//         <button 
//             onClick={() => resendOtpMutation.mutate()} 
//             className="text-[#1AB3BC] hover:underline focus:outline-none"
//           >
//             Gửi lại
//           </button> 
//           hoặc 
//           <button 
//             onClick={() => {/* handle email change logic here */}} 
//             className="text-[#1AB3BC] ml-1 hover:underline focus:outline-none"
//           >
//             Nhập email khác
//           </button>
//         </p>
//         <button type="submit" className="w-full mt-10 py-2 bg-white border border-[#4c4c4c] text-[#A4A4A4] rounded-lg hover:bg-[#1AB3BC] hover:text-white hover:border-[#1AB3BC] transition-colors duration-300">
//           Tiếp theo
//         </button>
//       </form>
//     </div>
//     </>
//   );
// };

// interface RegisterTaoMatKhauProps {
//   onNext: (password: string) => void;
//   currentStep: number;
// }

// const RegisterTaoMatKhau: React.FC<RegisterTaoMatKhauProps> = ({ onNext,currentStep }) => {
//   const [password, setPassword] = useState<string>('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onNext(password);
//   };

//   return (<>
//     <StepIndicator currentStep={currentStep} />
//     <div className="bg-white rounded-lg shadow-md p-10 w-[520px] opacity-0 animate-fadeIn">
//       <h3 className="text-xl font-medium text-[#504C4C] mb-5">Tạo mật khẩu</h3>
//       <p className="text-[#00000066]">Hãy tạo mật khẩu bạn có thể ghi nhớ</p>

//       <form onSubmit={handleSubmit}>
//         <div className="mt-16">
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Mật khẩu của bạn"
//             className="w-full h-10 px-3 rounded border border-[#8D8C8C] focus:border-[#868585] outline-none text-[#8D8C8C] transition-all duration-300"
//           />
//         </div>
//         <div className="mt-4 text-left text-[#868585]">
//           <p className="mt-2">* 1 kí tự viết hoa</p>
//           <p className="mt-2">* 1 con số</p>
//           <p className="mt-2">* Trên 20 từ</p>
//         </div>
//         <button type="submit" className="w-full mt-24 py-2 bg-white border border-[#4c4c4c] text-[#A4A4A4] rounded-lg hover:bg-[#1AB3BC] hover:text-white hover:border-[#1AB3BC] transition-colors duration-300">
//           Tiếp theo
//         </button>
//       </form>
//     </div>
//     </>
//   );
// };

// interface RegisterHoanThanhProps {
//   phoneNumber: string;
//   currentStep:number;
// }

// const RegisterHoanThanh: React.FC<RegisterHoanThanhProps> = ({ phoneNumber,currentStep }) => {
//   return (<>
//   <StepIndicator currentStep={currentStep} />
//     <div className="bg-white rounded-lg shadow-md p-10 w-[520px] text-center opacity-0 animate-fadeIn">
//       <img src={tick} alt="Success" className="w-24 mx-auto mb-7" />
//       <p className="text-[#00000066] mt-7">Bạn đã thành công tạo tài khoản với email</p>
//       <p className="text-[#1AB3BC] mt-2">{phoneNumber}</p>
//       <button className="w-full mt-24 py-3 bg-[#1AB3BC] text-white rounded-lg hover:bg-[#1699a0] transition-all duration-300">
//         Tìm kiếm tài liệu
//       </button>
//   </div>
//   </>
//   );
// };



// interface StepIndicatorProps {
//   currentStep: number;
// }

// const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
//   return (
//     <div className="flex justify-center items-center mb-12 gap-2">
//       <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-[#1AB3BC]' : 'text-gray-500'}`}>
//         <div className={`w-12 h-12 rounded-full border flex justify-center items-center mb-2 ${currentStep > 1 ? 'bg-[#1AB3BC] text-white border-[#1AB3BC]' : currentStep === 1 ? 'bg-[#1AB3BC] text-white border-[#1AB3BC]' : 'border-gray-300'}`}>
//           {currentStep > 1 ? '✔' : '1'}
//         </div>
//         <p className="text-sm">Xác minh số điện thoại</p>
//       </div>
//       <img src={muitenImage} alt="" className="h-4" />
//       <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-[#1AB3BC]' : 'text-gray-500'}`}>
//         <div className={`w-12 h-12 rounded-full border flex justify-center items-center mb-2 ${currentStep > 2 ? 'bg-[#1AB3BC] text-white border-[#1AB3BC]' : currentStep === 2 ? 'bg-[#1AB3BC] text-white border-[#1AB3BC]' : 'border-gray-300'}`}>
//           {currentStep > 2 ? '✔' : '2'}
//         </div>
//         <p className="text-sm">Tạo mật khẩu</p>
//       </div>
//       <img src={muitenImage} alt="" className="h-4" />
//       <div className={`flex flex-col items-center ${currentStep === 3 ? 'text-[#1AB3BC]' : 'text-gray-500'}`}>
//         <div className={`w-12 h-12 rounded-full border flex justify-center items-center mb-2 ${currentStep === 3 ? 'bg-[#1AB3BC] text-white border-[#1AB3BC]' : 'border-gray-300'}`}>
//           3
//         </div>
//         <p className="text-sm">Hoàn thành</p>
//       </div>
//     </div>
//   );
// };
