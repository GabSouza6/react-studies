import "./form.css";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const registerUserFormSchema = z
  .object({
    email: z
      .email("Preencha o e-mail corretamente")
      .min(1, "Campo obrigatório"),
    password: z
      .string()
      .min(6, "Verifique se sua senha tem no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "Verifique se sua senha tem no mínimo 6 caracteres"),
    cellphone: z
      .string()
      .min(11, "O número precisa ter 11 caracteres")
      .max(11, "O número precisa ter 11 caracteres")
      .regex(/^\d+$/, "O telefone deve conter apenas números")
      .nonempty('Campo obrigatório.')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não estão iguais",
    path: ["confirmPassword"],
  });

type registerUserFormData = z.infer<typeof registerUserFormSchema>;

export const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<registerUserFormData>({
    mode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(registerUserFormSchema),
  });

  const onSubmit: SubmitHandler<registerUserFormData> = async (data) => {
    await fetch("http://localhost:3333/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        placeholder="Informe seu e-mail"
        {...register("email")}
      />

      {errors.email && <p>{errors?.email?.message}</p>}

      <label htmlFor="password">Senha</label>
      <input
        type="password"
        id="password"
        placeholder="Informe sua senha"
        {...register("password")}
      />

      {errors.password && <p>{errors?.password?.message}</p>}

      <label htmlFor="confirmPassword">Cofirmar senha</label>
      <input
        type="password"
        id="confirmPassword"
        placeholder="Informe sua senha novamente"
        {...register("confirmPassword")}
      />

      {errors.confirmPassword && <p>{errors?.confirmPassword?.message}</p>}

      <label htmlFor="cellphone">Número Celular</label>
      <input
        type="text"
        id="cellphone"
        placeholder="Somente números (ex: 79912345678)"
        {...register("cellphone")}
      />

      {errors.cellphone && <p>{errors?.cellphone?.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        Cadastre-se
      </button>
    </form>
  );
};
