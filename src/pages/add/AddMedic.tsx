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
import { medicSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const AddMedic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("token") ?? "");

  const form = useForm<z.infer<typeof medicSchema>>({
    resolver: zodResolver(medicSchema),
    defaultValues: {
      name: "",
      specialty: "",
      crm: "",
      imageUrl:
        "https://res.cloudinary.com/dmryfrj0w/image/upload/v1742297504/ADS/medic_1_pxtrdj.jpg",
    },
  });

  const onSubmit = (values: z.infer<typeof medicSchema>) => {
    // Fazer a requisição
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_LINK}/medics`, {
      method: "POST",
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
    <main className="grow flex flex-col  gap-4 items-center  mt-[52px] py-8 px-[2vw] sm:px-[4vw] lg:px-[6vw]">
      <h2 className="font-bold text-3xl">Adicionar médico</h2>

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
            name="specialty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especialidade:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="crm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CRM:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
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
              <Loader2 className="animate-spin" /> Criando...
            </Button>
          ) : (
            <Button
              size={"lg"}
              type="submit"
              className="w-full cursor-pointer text-black bg-blue-400 transition-colors duration-300 hover:bg-blue-600"
            >
              Criar médico
            </Button>
          )}
        </form>
      </Form>
    </main>
  );
};
