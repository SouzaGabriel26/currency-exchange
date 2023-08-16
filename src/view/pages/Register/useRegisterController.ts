import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/authService";
import toast from 'react-hot-toast';
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
  email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
  name: z.string().nonempty('Nome é obrogatório'),
  password: z.string().nonempty('Senha é obrigatória').min(5, 'Senha deve conter pelo menos 5 caracteres')
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { signin } = useAuth();

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    setIsLoading(true);

    try {
      const { token } = await authService.signup(data);

      signin(token);
    } catch {
      toast.error('Ocorreu um erro ao criar a sua conta.');
    }
    finally {
      setIsLoading(false);
    }
  })

  return { register, errors, handleSubmit, isLoading }
}
