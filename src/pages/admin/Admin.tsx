import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { UsersTable } from "./users/UsersTable";
import { ClinicsTable } from "./clinics/ClinicsTable";
import { SchedulesTable } from "./schedules/SchedulesTable";
import { ExamsTable } from "./exams/ExamsTable";
import { MedicsTable } from "./medics/MedicsTable";
import { SpecialtysTable } from "./specialtys/SpecialtysTable";
import { Button } from "@/components/ui/button";

const tables = [
  "Usuários",
  "Clínicas",
  "Agendamentos",
  "Exames",
  "Médicos",
  "Especialidades",
];

export const Admin = () => {
  const [selectedTable, setSelectedTable] = useState("Usuários");
  const tabsWithAddButton = ["Clínicas", "Exames", "Médicos", "Especialidades"];
  const formattedSelectedTable = selectedTable
    .normalize("NFD") // Decompõe os caracteres acentuados em seus componentes básicos.
    .replace(/[\u0300-\u036f]/g, "") // Remove os sinais diacríticos.
    .toLowerCase() // Muda tudo pra minúsculo
    .replace(/s$/, ""); // Remove o "S" no final

  return (
    <main className="grow flex flex-col gap-4  mt-[52px] py-8 px-[2vw] sm:px-[4vw] lg:px-[6vw]">
      <h2 className="font-bold text-3xl text-center">Administração</h2>

      <div className="flex justify-between">
        <Select
          value={selectedTable}
          onValueChange={(value) => setSelectedTable(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma clínica" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {tables.map((table) => {
                return <SelectItem value={table}>{table}</SelectItem>;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        {tabsWithAddButton.includes(selectedTable) && (
          <Button
            asChild
            className="text-black bg-blue-400 transition-colors duration-300 hover:bg-blue-600"
          >
            <a href={`/add/${formattedSelectedTable}`}>Add</a>
          </Button>
        )}
      </div>

      {selectedTable === "Usuários" && <UsersTable />}
      {selectedTable === "Clínicas" && <ClinicsTable />}
      {selectedTable === "Agendamentos" && <SchedulesTable />}
      {selectedTable === "Exames" && <ExamsTable />}
      {selectedTable === "Médicos" && <MedicsTable />}
      {selectedTable === "Especialidades" && <SpecialtysTable />}
    </main>
  );
};
