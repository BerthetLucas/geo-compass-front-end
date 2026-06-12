import { useForm } from "react-hook-form"
import { loginSchema, type LoginFormData } from "./auth-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"

export const useLoginForm = () => {
  return useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
}
