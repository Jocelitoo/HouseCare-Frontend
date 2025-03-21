import { MedicProps } from "@/utils/props";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Medics = () => {
  const [medics, setMedics] = useState<MedicProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMedics = () => {
    setIsLoading(true);

    fetch(`${import.meta.env.VITE_API_LINK}/medics`, {
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
        setMedics(formatedResponse);
      })
      .catch((e) => {
        toast(e.message, {
          style: { backgroundColor: "#e74c3c" },
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getMedics();
  }, []);

  return (
    <main className="grow flex flex-col  gap-4 items-center  mt-[52px] py-8 px-[2vw] sm:px-[4vw] lg:px-[6vw]">
      <h2 className="font-bold text-3xl">Médicos</h2>

      {isLoading ? (
        <p className="flex space-x-1">
          <Loader2 className="animate-spin" /> <span>Carregando...</span>
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4  ">
          {medics.map((medic) => {
            return (
              <div className="flex flex-col items-center text-center gap-2 bg-blue-100 p-4 rounded-md  ">
                <img src={medic.imageUrl} width={400} height={250} />
                <p className="text-xl font-semibold">{medic.name}</p>
                <p>{medic.specialty}</p>
                <p>CRM: {medic.crm}</p>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
