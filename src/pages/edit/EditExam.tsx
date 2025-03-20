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
import { examSchema } from "@/lib/schemas";
import { ExamProps } from "@/utils/props";
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

export const EditExam = () => {
  const [exam, setExam] = useState<ExamProps>();
  const [isLoading, setIsLoading] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("token") ?? "");
  const { id } = useParams();

  const getExams = () => {
    fetch(`${import.meta.env.VITE_API_LINK}/exams/${id}`, {
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
        setExam(formatedResponse);
      })
      .catch((e) => {
        toast(e.message, {
          style: { backgroundColor: "#e74c3c" },
        });
      });
  };

  useEffect(() => {
    getExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof examSchema>>({
    resolver: zodResolver(examSchema),
    values: {
      name: exam?.name as string,
      description: exam?.description as string,
      price: exam?.price as number,
      imageUrl: exam?.imageUrl as string,
    },
  });

  const onSubmit = (values: z.infer<typeof examSchema>) => {
    // Organizar os dados
    values.name = capitalizeFirstLetter(values.name);

    // Fazer a requisição
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_LINK}/exams/${id}`, {
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
      <h2 className="font-bold text-3xl">Editar exame</h2>

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
                <FormLabel>Descrição:</FormLabel>
                <FormControl>
                  <textarea {...field} rows={5} className="border p-2" />
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
