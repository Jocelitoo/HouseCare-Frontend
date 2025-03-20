import { AddClinic } from "@/pages/add/AddClinic";
import { AddExam } from "@/pages/add/AddExam";
import { AddMedic } from "@/pages/add/AddMedic";
import { AddSpecialty } from "@/pages/add/AddSpecialty";
import { Admin } from "@/pages/admin/Admin";
import { Clinics } from "@/pages/Clinics";
import { EditClinic } from "@/pages/edit/EditClinic";
import { EditExam } from "@/pages/edit/EditExam";
import { EditMedic } from "@/pages/edit/EditMedic";
import { EditSchedules } from "@/pages/edit/EditSchedules";
import { EditSpecialty } from "@/pages/edit/EditSpecialty";
import { EditUser } from "@/pages/edit/EditUser";
import { Exams } from "@/pages/Exams";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Medics } from "@/pages/Medics";
import { RegisterUser } from "@/pages/RegisterUser";
import { Schedule } from "@/pages/Schedule";
import { Specialtys } from "@/pages/Specialtys";
import { UserSchedules } from "@/pages/userSchedules/UserSchedules";
import { Navigate, Route, Routes } from "react-router-dom";

export const RoutesFunction = () => {
  return (
    <Routes>
      {/* A rota(URL) "/" ira renderizar a página Home */}
      <Route path="/" element={<Home />} />

      {/* A rota(URL) "/registro" ira renderizar a página Register */}
      <Route path="/registro" element={<RegisterUser />} />

      {/* A rota(URL) "/login" ira renderizar a página Login */}
      <Route path="/login" element={<Login />} />

      {/* A rota(URL) "/exames" ira renderizar a página Exams */}
      <Route path="/exames" element={<Exams />} />

      {/* A rota(URL) "/especialidades" ira renderizar a página Specialtys */}
      <Route path="/especialidades" element={<Specialtys />} />

      {/* A rota(URL) "/clinicas" ira renderizar a página Clinics */}
      <Route path="/clinicas" element={<Clinics />} />

      {/* A rota(URL) "/medicos" ira renderizar a página Medics */}
      <Route path="/medicos" element={<Medics />} />

      {/* A rota(URL) "/agendar" ira renderizar a página Schedule */}
      <Route path="/agendar" element={<Schedule />} />

      {/* A rota(URL) "/agendamentos" ira renderizar a página UserSchedules */}
      <Route path="/agendamentos" element={<UserSchedules />} />

      {/* A rota(URL) "/editar/agendamentos/:id" ira renderizar a página EditSchedules */}
      <Route path="/editar/agendamentos/:id" element={<EditSchedules />} />

      {/* A rota(URL) "/editar/usuario" ira renderizar a página EditUser */}
      <Route path="/editar/usuario" element={<EditUser />} />

      {/* A rota(URL) "/admin" ira renderizar a página Admin */}
      <Route path="/admin" element={<Admin />} />

      {/* A rota(URL) "/add/clinica" ira renderizar a página AddClinic */}
      <Route path="/add/clinica" element={<AddClinic />} />

      {/* A rota(URL) "/add/exame" ira renderizar a página AddExam */}
      <Route path="/add/exame" element={<AddExam />} />

      {/* A rota(URL) "/add/medico" ira renderizar a página AddMedic */}
      <Route path="/add/medico" element={<AddMedic />} />

      {/* A rota(URL) "/add/especialidade" ira renderizar a página AddSpecialty */}
      <Route path="/add/especialidade" element={<AddSpecialty />} />

      {/* A rota(URL) "/editar/clinica" ira renderizar a página EditClinic */}
      <Route path="/editar/clinica/:id" element={<EditClinic />} />

      {/* A rota(URL) "/editar/exame/:id" ira renderizar a página EditExam */}
      <Route path="/editar/exame/:id" element={<EditExam />} />

      {/* A rota(URL) "/editar/medico/:id" ira renderizar a página EditMedic */}
      <Route path="/editar/medico/:id" element={<EditMedic />} />

      {/* A rota(URL) "/editar/especialidade/:id" ira renderizar a página EditSpecialty */}
      <Route path="/editar/especialidade/:id" element={<EditSpecialty />} />

      {/* A rota(URL) "/" ira renderizar a página Home */}
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
