import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Nome precisa ter no mínimo 2 dígitos" })
      .max(20, { message: "Nome só pode ter no máximo 20 dígitos" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(6, { message: "Senha precisa ter no mínimo 6 dígitos" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirmar senha precisa ter no mínimo 6 dígitos" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], // Indica onde o erro será mostrado
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha precisa ter no mínimo 6 dígitos" }),
});

export const scheduleSchema = z.object({
  name: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "Nome precisa ter no mínimo 2 dígitos" })
    .max(20, { message: "Nome só pode ter no máximo 20 dígitos" }),
  email: z
    .string({ message: "Obrigatório" })
    .email({ message: "Email inválido" }),
  phone: z
    .string({ message: "Obrigatório" })
    .min(8, { message: "Número inválido" }),
  clinic: z.string().min(1, { message: "Obrigatório" }),
  specialty: z.string().min(1, { message: "Obrigatório" }),
  date: z.string().min(1, { message: "Obrigatório" }),
  hour: z.string().min(1, { message: "Obrigatório" }),
  price: z.coerce.number(),
});

export const editUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome precisa ter no mínimo 2 dígitos" })
    .max(20, { message: "Nome só pode ter no máximo 20 dígitos" }),
  newName: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "Novo nome precisa ter no mínimo 2 dígitos" })
    .max(20, { message: "Novo nome só pode ter no máximo 20 dígitos" }),
});

export const clinicSchema = z.object({
  name: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "Nome precisa ter no mínimo 2 dígitos" }),
  address: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "Endereço precisa ter no mínimo 2 dígitos" }),
  mapUrl: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "URL no mapa precisa ter no mínimo 2 dígitos" }),
});

export const examSchema = z.object({
  name: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "Nome precisa ter no mínimo 2 dígitos" }),
  description: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "Endereço precisa ter no mínimo 2 dígitos" }),
  price: z.coerce.number({ message: "Obrigatório" }),
  imageUrl: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "Endereço precisa ter no mínimo 2 dígitos" }),
});

export const medicSchema = z.object({
  name: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "Nome precisa ter no mínimo 2 dígitos" })
    .max(20, { message: "Nome só pode ter no máximo 20 dígitos" }),
  specialty: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "Endereço precisa ter no mínimo 2 dígitos" }),
  crm: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "Endereço precisa ter no mínimo 2 dígitos" }),
  imageUrl: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "Endereço precisa ter no mínimo 2 dígitos" }),
});

export const specialtySchema = z.object({
  name: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "Nome precisa ter no mínimo 2 dígitos" })
    .max(20, { message: "Nome só pode ter no máximo 20 dígitos" }),
  description: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "Endereço precisa ter no mínimo 2 dígitos" }),
  price: z.coerce.number({ message: "Obrigatório" }),
  imageUrl: z
    .string({ message: "Obrigatório" })
    .min(2, { message: "Endereço precisa ter no mínimo 2 dígitos" }),
});
