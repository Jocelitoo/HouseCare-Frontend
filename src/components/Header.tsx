import { Activity } from "lucide-react";
import { MobileNav } from "./MobileNav";
import { DesktopNav } from "./DesktopNav";

const links = [
  { href: "/", text: "Início" },
  { href: "/exames", text: "Exames" },
  { href: "/especialidades", text: "Especialidades" },
  { href: "/clinicas", text: "Clínicas" },
  { href: "/medicos", text: "Médicos" },
  { href: "/agendar", text: "Agendar" },
];

export const Header = () => {
  const userLogged = sessionStorage.getItem("token"); // Se o item existir, é porque o usuário está logado

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    location.replace("/"); // Redireciona para a home
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-100 flex items-center justify-between py-2 px-[2vw] sm:px-[4vw] lg:px-[6vw]">
      <p className="flex">
        <Activity className="text-blue-400" />{" "}
        <a href="/" className="ml-1">
          HouseCare
        </a>
      </p>

      <MobileNav
        links={links}
        userLogged={userLogged}
        handleLogout={handleLogout}
      />
      <DesktopNav
        links={links}
        userLogged={userLogged}
        handleLogout={handleLogout}
      />
    </header>
  );
};
