import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authService } from '../../../app/services/authService';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useAuth } from '../../../app/hooks/useAuth';

const schema = z.object({
  email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
  password: z.string().nonempty('Senha é obrgatória').min(5, 'Senha deve conter pelo menos 5 caracteres')
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { signin } = useAuth();

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    setIsLoading(true);

    try {
      const { token } = await authService.signin(data);

      signin(token);
    } catch {
      toast.error('Credenciais inválidas');
    } finally {
      setIsLoading(false);
    }
  });

  return { handleSubmit, register, errors, isLoading }
}
