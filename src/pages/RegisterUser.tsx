import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { registerSchema } from "@/lib/schemas";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function capitalizeFirstLetter(str: string) {
  return str.replace(/^(\w)/, (match) => match.toUpperCase());
}

export const RegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    // Organizar o body da requisição
    const body = {
      name: capitalizeFirstLetter(values.name),
      email: values.email,
      password: values.password,
    };

    // Fazer a requisição
    setIsLoading(true);

    fetch(`${import.meta.env.VITE_API_LINK}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json(); // Captura o JSON da resposta
          throw new Error(errorData.error || "Erro desconhecido");
        }

        return response.json();
      })
      .then(() => {
        toast("Usuário criado com sucesso", {
          style: { backgroundColor: "#07bc0c" },
        });

        form.reset();
      })
      .catch((e) => {
        toast(e.message, {
          style: { backgroundColor: "#e74c3c" },
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <main className="grow flex items-center justify-center mt-[52px] py-8 px-[2vw] sm:px-[4vw] lg:px-[6vw] ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg border rounded-md p-4 space-y-4 "
        >
          <p className="text-center text-xl font-semibold">Registrar-se</p>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isLoading ? (
            <Button
              size={"lg"}
              disabled
              className="w-full text-black bg-blue-400"
            >
              <Loader2 className="animate-spin" /> Carregando...
            </Button>
          ) : (
            <Button
              size={"lg"}
              type="submit"
              className="w-full cursor-pointer text-black bg-blue-400 transition-colors duration-300 hover:bg-blue-600"
            >
              Registrar-se
            </Button>
          )}

          <p className="text-center text-[14px]">
            Já tem uma conta ?{" "}
            <a href="/login" className="underline">
              Login
            </a>
          </p>
        </form>
      </Form>
    </main>
  );
};
