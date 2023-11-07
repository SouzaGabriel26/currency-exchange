import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { z } from "zod";
import { useAuth } from '../../../app/hooks/useAuth';
import { authService } from "../../../app/services/authService";

const schema = z.object({
  email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
  name: z.string().nonempty('Nome é obrogatório'),
  password: z.string().nonempty('Senha é obrigatória').min(5, 'Senha deve conter pelo menos 5 caracteres')
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const { signin } = useAuth();

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: FormData) => {
      return authService.signup(data);
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { token } = await mutateAsync(data);

      signin(token);
    } catch {
      toast.error('Ocorreu um erro ao criar a sua conta.');
    }
  })

  return { register, errors, handleSubmit, isLoading }
}
