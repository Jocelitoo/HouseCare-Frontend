import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Loader2 } from "lucide-react";
import { ScheduleProps } from "@/utils/props";

export const SchedulesTable = () => {
  const [schedules, setSchedules] = useState<ScheduleProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userLogged = sessionStorage.getItem("token");

  const getSchedules = () => {
    setIsLoading(true);

    fetch(`${import.meta.env.VITE_API_LINK}/schedules`, {
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
        setSchedules(formatedResponse);
      })
      .catch((e) => {
        toast(e.message, {
          style: { backgroundColor: "#e74c3c" },
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getSchedules();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex gap-2 mx-auto">
          <Loader2 className="animate-spin" /> <p>Carregando...</p>
        </div>
      ) : userLogged ? (
        <DataTable columns={columns} data={schedules} />
      ) : (
        <p>Faça login</p>
      )}
    </>
  );
};
