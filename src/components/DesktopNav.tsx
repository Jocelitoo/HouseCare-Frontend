import React from "react";
import { Button } from "./ui/button";
import { NavProps } from "@/utils/props";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, User2 } from "lucide-react";
import { Separator } from "./ui/separator";

export const DesktopNav: React.FC<NavProps> = ({
  links,
  userLogged,
  handleLogout,
}) => {
  return (
    <>
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-4">
          {links.map((link) => {
            return (
              <li>
                <a
                  href={link.href}
                  className="block py-2 px-4 rounded-md transition-colors duration-300 hover:bg-blue-400 "
                >
                  {link.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {userLogged ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="hidden lg:flex">
            <Button className="bg-transparent border border-black rounded-full !px-2 duration-300 gap-0 lg:flex">
              <User2 className="text-black !size-6" />
              <ChevronDown className="text-black !size-6" />
              <span className="sr-only">Abrir opções do perfil</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem className="p-2 rounded-md transition-colors duration-300 hover:bg-blue-400">
                <a href="/agendamentos">Meus agendamentos</a>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-2 rounded-md transition-colors duration-300 hover:bg-blue-400">
                <a href="/editar/usuario">Configurar conta</a>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-2 rounded-md transition-colors duration-300 hover:bg-blue-400">
                <a href="/admin">Administração</a>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <Separator />

            <DropdownMenuItem>
              <Button
                size={"lg"}
                onClick={handleLogout}
                className="hidden w-full bg-blue-400 transition-colors duration-300 hover:bg-blue-600 text-black cursor-pointer  lg:flex"
              >
                Sair
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          size={"lg"}
          className="hidden lg:flex bg-blue-400 transition-colors duration-300 hover:bg-blue-600 text-black"
          asChild
        >
          <a href="/login">Login</a>
        </Button>
      )}
    </>
  );
};
