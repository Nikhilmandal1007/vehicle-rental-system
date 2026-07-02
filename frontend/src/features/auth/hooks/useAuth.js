import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  login as loginApi,
  register as registerApi,
} from "../../../api/auth.api";
import { useAuthContext } from "../../../context/AuthContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      login({
        token: data.token,
        user: data.user,
      });

      toast.success(data.message);

      switch (data.user.role) {
        case "ADMIN":
          navigate("/admin");
          break;

        case "HOST":
          navigate("/host");
          break;

        default:
          navigate("/");
      }
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerApi,

    onSuccess: (data) => {
      toast.success(data.message);

      navigate("/login");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};
