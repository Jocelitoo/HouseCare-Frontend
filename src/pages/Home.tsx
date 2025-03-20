import { Button } from "@/components/ui/button";
import {
  Ambulance,
  CalendarDays,
  CircleDollarSign,
  Clock,
  MapPinned,
  Microscope,
  ShieldPlus,
  Stethoscope,
  TestTube,
  User2,
} from "lucide-react";
import sobre from "../assets/images/sobre.jpg";
import banner from "../assets/images/banner.jpg";

const infos = [
  {
    icon: <MapPinned className="" />,
    title: "Clínicas",
    description: "Confira a localização de nossas clínicas",
    link: "/clinicas",
  },
  {
    icon: <Stethoscope />,
    title: "Especialidades",
    description: "Confira as especialidades de nossa clínica",
    link: "/especialidades",
  },
  {
    icon: <TestTube />,
    title: "Exames",
    description: "Confira os exames que realizamos",
    link: "/exames",
  },
  {
    icon: <User2 />,
    title: "Médicos",
    description: "Confira a lista dos nossos médicos",
    link: "/medicos",
  },
];

const vantagens = [
  {
    icon: <Microscope size={30} />,
    text: "Laboratório no local",
  },
  {
    icon: <ShieldPlus size={30} />,
    text: "Aceitamos vários planos de saúde",
  },
  {
    icon: <Clock size={30} />,
    text: "Rapidez no atendimento",
  },
  {
    icon: <Ambulance size={30} />,
    text: "Transporte de paciente",
  },
  {
    icon: <CalendarDays size={30} />,
    text: "Resultados no mesmo dia",
  },
  {
    icon: <CircleDollarSign size={30} />,
    text: "Preços acessíveis",
  },
];

export const Home = () => {
  return (
    <main className="flex flex-col grow space-y-8 mt-[52px] mb-8">
      <div className="relative">
        <img src={banner} alt="foto" className="w-full h-auto object-contain" />

        <div className="flex items-center sm:absolute sm:top-0 sm:w-fit sm:h-full">
          <div className="w-full space-y-4 p-4 text-center bg-blue-200/75 lg:p-12">
            <h1 className="font-bold uppercase text-3xl sm:text-4xl lg:text-6xl">
              HouseCare <br /> Clínica Médica
            </h1>

            <p className="lg:text-2xl">Segunda - Sábado: 7:00 - 19:00</p>

            <Button
              asChild
              size={"lg"}
              className=" text-black bg-blue-400 transition-colors duration-300 hover:bg-blue-600"
            >
              <a href="/agendar">Agendar</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-8 px-[2vw] sm:px-[4vw] lg:px-[6vw]">
        <h2 className="text-center text-3xl font-semibold">Sobre nós</h2>

        <div className="grid grid-cols-1 items-center sm:grid-cols-2 gap-4">
          <p className="text-center sm:text-xl">
            No HouseCare, combinamos inovação e tecnologia para oferecer um
            ambiente intuitivo, moderno e eficiente, onde a sua saúde é sempre a
            prioridade. Junte-se a nós e descubra uma nova maneira de cuidar da
            sua saúde!
          </p>

          <img src={sobre} className="hidden sm:block" />
        </div>
      </div>

      <div className="space-y-8 px-[2vw] sm:px-[4vw] lg:px-[6vw]">
        <h2 className="text-center text-3xl font-semibold">Vantagens</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {vantagens.map((vantagem) => {
            return (
              <div className="flex flex-col items-center bg-blue-100 p-4 rounded-md ">
                {vantagem.icon}
                <p>{vantagem.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-8 px-[2vw] sm:px-[4vw] lg:px-[6vw]">
        <h2 className="text-center text-3xl font-semibold">
          Cuide bem da sua saúde
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
          {infos.map((info) => {
            return (
              <div className="flex flex-col gap-4 items-center text-center bg-blue-100 p-4 rounded-md">
                <div className="bg-blue-400 p-3 rounded-full">{info.icon}</div>
                <p className="text-[20px]">{info.title}</p>
                <p className="text-[14px]">{info.description}</p>
                <Button asChild size={"lg"}>
                  <a href={info.link}>Saiba mais</a>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
