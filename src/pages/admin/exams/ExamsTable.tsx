import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Loader2 } from "lucide-react";
import { ExamProps } from "@/utils/props";

export const ExamsTable = () => {
  const [exams, setExams] = useState<ExamProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userLogged = sessionStorage.getItem("token");

  const getExams = () => {
    setIsLoading(true);

    fetch(`${import.meta.env.VITE_API_LINK}/exams`, {
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
        setExams(formatedResponse);
      })
      .catch((e) => {
        toast(e.message, {
          style: { backgroundColor: "#e74c3c" },
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex gap-2 mx-auto">
          <Loader2 className="animate-spin" /> <p>Carregando...</p>
        </div>
      ) : userLogged ? (
        <DataTable columns={columns} data={exams} />
      ) : (
        <p>Faça login</p>
      )}
    </>
  );
};
