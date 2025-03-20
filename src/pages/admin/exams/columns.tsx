import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ExamProps } from "@/utils/props";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export const columns: ColumnDef<ExamProps>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "price",
    header: "Valor",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      const formatted = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(price);

      return <div className="font-semibold">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const exams = row.original;
      const token = JSON.parse(sessionStorage.getItem("token") ?? "");

      const handleDelete = () => {
        fetch(`${import.meta.env.VITE_API_LINK}/exams/${exams.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        })
          .then(async (response) => {
            if (!response.ok) {
              const errorData = await response.json(); // Captura o JSON da resposta
              throw new Error(errorData.error || "Erro desconhecido");
            }

            return response.json();
          })
          .then(() => {
            location.reload();
          })
          .catch((e) => {
            toast(e.message, {
              style: { backgroundColor: "#e74c3c" },
            });
          });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>

            <Separator />

            <DropdownMenuItem asChild>
              <a href={`/editar/exame/${exams.id}`}>Editar</a>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleDelete()}>
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
