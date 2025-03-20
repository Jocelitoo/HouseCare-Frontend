import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { scheduleSchema } from "@/lib/schemas";
import { ClinicProps, ScheduleProps, SpecialtyProps } from "@/utils/props";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

function capitalizeFirstLetter(str: string) {
  return str.replace(/^(\w)/, (match) => match.toUpperCase());
}

const hours = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

export const EditSchedules = () => {
  const { id } = useParams(); // Pega o parâmetro da url

  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [clinics, setClinics] = useState<ClinicProps[]>([]);
  const [specialtys, setSpecialtys] = useState<SpecialtyProps[]>([]);
  const [schedule, setSchedule] = useState<ScheduleProps>();
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [editingSchedule, seteditingSchedule] = useState(false);
  const userLogged = sessionStorage.getItem("token"); // Se o item existir, é porque o usuário está logado

  const getNext14Days = () => {
    const days = [];
    const tomorrow = dayjs().add(1, "day"); // Data de amanhã

    for (let i = 0; i < 14; i++) {
      const dayOfWeek = tomorrow.add(i, "day").day(); // 0 = domingo, 6 = sábado

      if (dayOfWeek !== 0) {
        // Adiciona i dias à data atual e formata
        days.push(tomorrow.add(i, "day").format("DD/MM/YYYY"));
      }
    }

    setAvailableDays(days);
  };

  const getClinics = () => {
    setIsLoading(true);

    fetch(`${import.meta.env.VITE_API_LINK}/clinics`, {
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
        setClinics(formatedResponse);
      })
      .catch((e) => {
        toast(e.message, {
          style: { backgroundColor: "#e74c3c" },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getSpecialtys = () => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_LINK}/specialtys`, {
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
        setSpecialtys(formatedResponse);
      })
      .catch((e) => {
        toast(e.message, {
          style: { backgroundColor: "#e74c3c" },
        });
      })
      .finally(() => setIsLoading(false));
  };

  const getSchedule = () => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_LINK}/schedules/${id}`, {
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
        setSchedule(formatedResponse);
        setPrice(formatedResponse.price);
      })
      .catch((e) => {
        toast(e.message, {
          style: { backgroundColor: "#e74c3c" },
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getNext14Days();
    getClinics();
    getSpecialtys();
    getSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
    values: {
      name: schedule?.name as string,
      email: schedule?.email as string,
      phone: schedule?.phone as string,
      clinic: schedule?.clinic as string,
      specialty: schedule?.specialty as string,
      date: schedule?.date as string,
      hour: schedule?.hour as string,
      price: schedule?.price as number,
    },
  });

  form.setValue("price", price);

  function onSubmit(data: z.infer<typeof scheduleSchema>) {
    const token = JSON.parse(sessionStorage.getItem("token") ?? "");
    data.name = capitalizeFirstLetter(data.name);

    seteditingSchedule(true);
    fetch(`${import.meta.env.VITE_API_LINK}/schedules/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
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
      .finally(() => seteditingSchedule(false));
  }

  return (
    <main className="grow flex flex-col gap-4  items-center mt-[52px] py-8 px-[2vw] sm:px-[4vw] lg:px-[6vw]">
      <h2 className="font-bold text-3xl">Editar agendamento</h2>

      {isLoading ? (
        <div className="flex gap-2">
          <Loader2 className="animate-spin" />
          <p>Carregando...</p>
        </div>
      ) : schedule?.id ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 border rounded-md p-4 w-full max-w-md "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Nome:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Seu nome
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Seu email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Telefone:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Seu telefone
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clinic"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Clínica:</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => form.setValue("clinic", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma clínica" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {clinics.map((clinic) => {
                            return (
                              <SelectItem value={clinic.name}>
                                {clinic.name}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="sr-only">
                    A clínica escolhida
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Especialidade:</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        form.setValue("specialty", value);

                        const selectedSpecialty = specialtys.find(
                          (specialty) => specialty.name === value
                        );

                        setPrice(selectedSpecialty?.price ?? 0);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma especialidade" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {specialtys.map((specialty) => {
                            return (
                              <SelectItem value={specialty.name}>
                                {specialty.name}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="sr-only">
                    A especialidade médica escolhida
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data:</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => form.setValue("date", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma data" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {availableDays.map((day) => {
                            return <SelectItem value={day}>{day}</SelectItem>;
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="sr-only">
                    A especialidade médica escolhida
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hour"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Hora:</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => form.setValue("hour", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma hora" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {hours.map((hour) => {
                            return <SelectItem value={hour}>{hour}</SelectItem>;
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="sr-only">
                    A especialidade médica escolhida
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="font-semibold text-xl">Valor: R${price}</p>

            {userLogged ? (
              editingSchedule ? (
                <Button
                  disabled
                  className="w-full cursor-pointer text-black bg-blue-400 transition-colors duration-300 hover:bg-blue-600"
                >
                  <Loader2 className="animate-spin" /> Editando...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full cursor-pointer text-black bg-blue-400 transition-colors duration-300 hover:bg-blue-600"
                >
                  Editar agendamento
                </Button>
              )
            ) : (
              <Button
                asChild
                className="w-full cursor-pointer text-black bg-blue-400 transition-colors duration-300 hover:bg-blue-600"
              >
                <a href="/login">Faça login</a>
              </Button>
            )}
          </form>
        </Form>
      ) : (
        <p>Agendamento não encontrado</p>
      )}
    </main>
  );
};
