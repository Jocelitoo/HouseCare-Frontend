import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Loader2 } from "lucide-react";
import { SpecialtyProps } from "@/utils/props";

export const SpecialtysTable = () => {
  const [specialtys, setSpecialtys] = useState<SpecialtyProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userLogged = sessionStorage.getItem("token");

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

  useEffect(() => {
    getSpecialtys();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex gap-2 mx-auto">
          <Loader2 className="animate-spin" /> <p>Carregando...</p>
        </div>
      ) : userLogged ? (
        <DataTable columns={columns} data={specialtys} />
      ) : (
        <p>Faça login</p>
      )}
    </>
  );
};
