import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import http from "../../utils/http";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export const forgotPassword = async (email: string) => {
    const response = await http.post(`/auth/v1/forgot-password`, { email });
    return response.data;
  };
  
  export const verifyOtp = async (email: string, otp: string) => {
    const response = await http.post(`/auth/verify-forgot-password`, { email, OTP: otp });
    return response.data;
  };
  
  export const resetPassword = async (email: string, otp: string, newPassword: string) => {
    const response = await http.post(`/auth/reset-password`, { email, OTP: otp, newPassword });
    return response.data;
  };
const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();
  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return re.test(String(email).toLowerCase());
  };

  const validateOtp = (otp: string): boolean => {
    return otp.length === 6 && !isNaN(Number(otp));
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };
  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("OTP sent successfully!")
      setStep(2);
      setErrors({});
    },
    onError: (error: any) => {
      setErrors({ email: error.response.data.message || "An error occurred" });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) => verifyOtp(email, otp),
    onSuccess: () => {
      setStep(3);
      setErrors({});
    },
    onError: (error: any) => {
      setErrors({ otp: error.response.data.message || "An error occurred" });
    },
  });

  const resetPasswordMutation = useMutation({
    
    mutationFn: ({ email, otp, newPassword }: { email: string; otp: string; newPassword: string }) => resetPassword(email, otp, newPassword),
    onSuccess: () => {
      alert("Password reset successfully!");
      navigate("/login");
    },
    onError: (error: any) => {
      setErrors({ newPassword: error.response.data.message || "An error occurred" });
    },
  });
  const handleEmailSubmit = async (): Promise<void> => {

    if (!validateEmail(email)) {
      setErrors({ email: "Please enter a valid Gmail address" });
      return;
    }
    
    forgotPasswordMutation.mutate(email);
    
  };

  const handleOtpSubmit = (): void => {
    if (!validateOtp(otp)) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }
    verifyOtpMutation.mutate({ email, otp })
  };

  const handlePasswordSubmit = (): void => {
    if (!validatePassword(newPassword)) {
      setErrors({ newPassword: "Password must be at least 8 characters long" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }
    setErrors({});
    // Here you would typically submit the new password to your backend
    
    resetPasswordMutation.mutate({ email, otp, newPassword })
    
  };
  let disableButton = resetPasswordMutation.isPending || verifyOtpMutation.isPending || forgotPasswordMutation.isPending;

  useEffect(() => {
    if (resetPasswordMutation.isPending || verifyOtpMutation.isPending || forgotPasswordMutation.isPending) {
      message.loading("Loading.....")
    }else{
      message.destroy();
    }
  }, [resetPasswordMutation.isPending, verifyOtpMutation.isPending,forgotPasswordMutation.isPending]);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
        <button disabled={disableButton} onClick={() => navigate("/login")} className="mb-4 text-blue-500 hover:text-blue-700">
            &larr; Back to login
            </button>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
            Forgot Password
          </h2>
        </div>
        {step === 1 && (
          <div className="space-y-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Gmail address"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              autoComplete="email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            <button
              onClick={handleEmailSubmit}
              disabled={disableButton}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 transform hover:scale-[1.02] bg-gradient-to-r from-cyan-500 to-purple-600  text-sm uppercase hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-800"
            >
              Send OTP
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              maxLength={6}
            />
            {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
            <button
              disabled={disableButton}
              onClick={handleOtpSubmit}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 transform hover:scale-[1.02]"
            >
              Verify OTP
            </button>
            <a
              onClick={handleEmailSubmit} // Thêm nút reset gọi lại hàm handleEmailSubmit
              className="text-[#1AB3BC] hover:underline hover:text-red-400"
            >
              Resend OTP
            </a>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
              )}
            </div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
            <div className="relative mt-1">
              
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              
              <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
            </div>
            {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            <button
              onClick={handlePasswordSubmit}
              
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition duration-200 transform hover:scale-[1.02]"
            >
              Reset Password
            </button>
          </div>
        )}
        <div className="text-center mt-4">
          <button
            onClick={() => {
              setStep(1);
              setErrors({});
            }}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition duration-200"
          >
            Back to first step
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;