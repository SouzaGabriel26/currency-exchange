import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { z } from 'zod';
import { useAuth } from '../../../app/hooks/useAuth';
import { authService } from '../../../app/services/authService';

const schema = z.object({
  email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
  password: z.string().nonempty('Senha é obrgatória').min(5, 'Senha deve conter pelo menos 5 caracteres')
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const { signin } = useAuth();

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: FormData) => {
      return authService.signin(data);
    }
  });
  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { token } = await mutateAsync(data);

      signin(token);
    } catch (error) {
      if(error instanceof AxiosError) {
        toast.error(error.response?.data?.error || 'Erro ao realizar login');
      } else {
        toast.error('Credenciais inválidas');
      }
    }
  });

  return { handleSubmit, register, errors, isLoading }
}
