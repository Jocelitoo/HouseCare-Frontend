import { Button } from "@/components/ui/button";
import { ClinicProps } from "@/utils/props";
import { Loader2, MapPinned } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Clinics = () => {
  const [clinics, setClinics] = useState<ClinicProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getClinics();
  }, []);

  return (
    <main className="grow flex flex-col  gap-4 items-center  mt-[52px] py-8 px-[2vw] sm:px-[4vw] lg:px-[6vw]">
      <h2 className="font-bold text-3xl">Clínicas</h2>

      {isLoading ? (
        <p className="flex space-x-1">
          <Loader2 className="animate-spin" /> <span>Carregando...</span>
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3  ">
          {clinics.map((clinic) => {
            return (
              <div className="flex flex-col items-center text-center gap-2 bg-blue-100 p-4 rounded-md  ">
                <div className="bg-blue-400 p-3 rounded-full">
                  <MapPinned />
                </div>

                <p className="font-semibold text-[18px]">{clinic.name}</p>
                <p>{clinic.address}</p>

                <Button size={"lg"} asChild>
                  <a
                    href={clinic.mapUrl}
                    target="black"
                    rel="noreferrer noopener"
                  >
                    Ver no mapa
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
