import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useRegisterController } from "./useRegisterController";

export function Register() {

  const { register, errors, handleSubmit, isLoading } = useRegisterController();

  return (
      <div className="flex flex-col items-center gap-10 w-full">
        <header>
          <h1 className="text-center">Crie sua conta</h1>

          <p>
            <span className="mr-1.5">Já possui uma conta?</span>
            <Link to="/login" className="text-blue-600 font-bold">Fazer Login</Link>
          </p>
        </header>

        <form
          className="flex flex-col gap-4 w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <Input
            type="email"
            placeholder="E-mail"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            placeholder="Nome"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            type="password"
            placeholder="Senha"
            error={errors.password?.message}
            {...register('password')}
          />
          <Button
            type="submit"
            isLoading={isLoading}
          >
            Criar Conta
          </Button>
        </form>
      </div>
  )
}
