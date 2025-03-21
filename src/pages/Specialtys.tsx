import { Button } from "@/components/ui/button";
import { SpecialtyProps } from "@/utils/props";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Specialtys = () => {
  const [specialtys, setSpecialtys] = useState<SpecialtyProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <main className="grow flex flex-col  gap-4 items-center  mt-[52px] py-8 px-[2vw] sm:px-[4vw] lg:px-[6vw]">
      <h2 className="font-bold text-3xl">Especialidades</h2>

      {isLoading ? (
        <p className="flex space-x-1">
          <Loader2 className="animate-spin" /> <span>Carregando...</span>
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {specialtys.map((specialty) => {
            const formatedPrice = specialty.price.toFixed(2); // Formata o preço adicionando os 2 zeros no final

            return (
              <div className="flex flex-col bg-blue-100 rounded-md overflow-hidden">
                <img src={specialty.imageUrl} width={400} height={250} />

                <div
                  className="
                grow
              p-4 text-center flex flex-col justify-between gap-2"
                >
                  <p className="text-2xl font-semibold">{specialty.name}</p>
                  <p className="text-[14px]">{specialty.description}</p>
                  <p className="font-semibold text-[18px]">
                    R$ {formatedPrice}
                  </p>
                  <Button
                    size={"lg"}
                    asChild
                    className="w-full cursor-pointer text-black bg-blue-400 transition-colors duration-300 hover:bg-blue-600"
                  >
                    <a href="/agendar">Agendar</a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
