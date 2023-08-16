import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLoginController } from "./useLoginController";

export function Login() {
  const { handleSubmit, register, errors, isLoading } = useLoginController();

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <header>
        <h1 className="text-center">Entre em sua conta</h1>

        <p>
          <span className="mr-1.5">Novo por aqui?</span>
          <Link to="/register" className="text-blue-600 font-bold">Criar conta</Link>
        </p>
      </header>

      <form
        className="flex flex-col gap-4 w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Digite seu e-mail"
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          placeholder="Digite sua senha"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" isLoading={isLoading}>Entrar</Button>
      </form>
    </div>
  )
}
