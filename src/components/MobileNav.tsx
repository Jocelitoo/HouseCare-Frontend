import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import React from "react";
import { NavProps } from "@/utils/props";

export const MobileNav: React.FC<NavProps> = ({
  links,
  userLogged,
  handleLogout,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant={"ghost"}>
          <Menu className="size-6 " />
          <p className="sr-only">Menu</p>
        </Button>
      </SheetTrigger>

      <SheetContent className="px-4">
        <SheetHeader>
          <SheetTitle className="text-center">Navegação</SheetTitle>
        </SheetHeader>

        <nav>
          <ul className="space-y-4">
            {links.map((link) => {
              return (
                <SheetClose asChild>
                  <li>
                    <a
                      href={link.href}
                      className="block bg-slate-200 p-2 rounded-md "
                    >
                      {link.text}
                    </a>
                  </li>
                </SheetClose>
              );
            })}

            {userLogged && (
              <>
                <SheetClose asChild>
                  <li>
                    <a
                      href={"/agendamentos"}
                      className="block bg-slate-200 p-2 rounded-md "
                    >
                      Meus agendamentos
                    </a>
                  </li>
                </SheetClose>

                <SheetClose asChild>
                  <li>
                    <a
                      href={"/editar/usuario"}
                      className="block bg-slate-200 p-2 rounded-md "
                    >
                      Configurar conta
                    </a>
                  </li>
                </SheetClose>

                <SheetClose asChild>
                  <li>
                    <a
                      href="/admin"
                      className="block bg-slate-200 p-2 rounded-md "
                    >
                      Administração
                    </a>
                  </li>
                </SheetClose>
              </>
            )}
          </ul>
        </nav>

        <Separator />

        {userLogged ? (
          <Button
            size={"lg"}
            onClick={handleLogout}
            className="bg-blue-400 transition-colors duration-300 hover:bg-blue-600 text-black"
          >
            Sair
          </Button>
        ) : (
          <Button
            size={"lg"}
            className="bg-blue-400 transition-colors duration-300 hover:bg-blue-600 text-black"
            asChild
          >
            <a href="/login">Login</a>
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
};
