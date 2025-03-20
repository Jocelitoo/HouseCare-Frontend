import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { specialtySchema } from "@/lib/schemas";
import { SpecialtyProps } from "@/utils/props";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

function capitalizeFirstLetter(str: string) {
  return str.replace(/^(\w)/, (match) => match.toUpperCase());
}

export const EditSpecialty = () => {
  const [specialty, setSpecialty] = useState<SpecialtyProps>();
  const [isLoading, setIsLoading] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("token") ?? "");
  const { id } = useParams();

  const getSpecialty = () => {
    fetch(`${import.meta.env.VITE_API_LINK}/specialtys/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json(); // Captura o JSON da resposta
          throw new Error(errorData.error || "Erro desconhecido");
        }

        return response.json();
      })
      .then((formatedResponse) => {
        setSpecialty(formatedResponse);
      })
      .catch((e) => {
        toast(e.message, {
          style: { backgroundColor: "#e74c3c" },
        });
      });
  };

  useEffect(() => {
    getSpecialty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof specialtySchema>>({
    resolver: zodResolver(specialtySchema),
    values: {
      name: specialty?.name as string,
      description: specialty?.description as string,
      price: specialty?.price as number,
      imageUrl: specialty?.imageUrl as string,
    },
  });

  const onSubmit = (values: z.infer<typeof specialtySchema>) => {
    // Organizar os dados
    values.name = capitalizeFirstLetter(values.name);

    // Fazer a requisição
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_LINK}/specialtys/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json(); // Captura o JSON da resposta
          throw new Error(errorData.error || "Erro desconhecido");
        }

        return response.json();
      })
      .then((formatedResponse) => {
        toast(formatedResponse.message, {
          style: { backgroundColor: "#07bc0c" },
        });
      })
      .catch((e) => {
        toast(e.message, {
          style: { backgroundColor: "#e74c3c" },
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <main className="grow flex flex-col gap-4  items-center mt-[52px] py-8 px-[2vw] sm:px-[4vw] lg:px-[6vw]">
      <h2 className="font-bold text-3xl">Editar especialidade</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg border rounded-md p-4 space-y-4 "
        >
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especialidade:</FormLabel>
                <FormControl>
                  <textarea rows={5} {...field} className="border p-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor:</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
              <Loader2 className="animate-spin" /> Editando...
            </Button>
          ) : (
            <Button
              size={"lg"}
              type="submit"
              className="w-full cursor-pointer text-black bg-blue-400 transition-colors duration-300 hover:bg-blue-600"
            >
              Editar
            </Button>
          )}
        </form>
      </Form>
    </main>
  );
};
