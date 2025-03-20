export interface NavProps {
  links: {
    href: string;
    text: string;
  }[];
  userLogged: string | null;
  handleLogout: () => void;
}

export interface ExamProps {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface SpecialtyProps {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClinicProps {
  id: string;
  name: string;
  address: string;
  mapUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface MedicProps {
  id: string;
  imageUrl: string;
  name: string;
  specialty: string;
  crm: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleProps {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  clinic: string;
  specialty: string;
  date: string;
  hour: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface EditUserProps {
  id: string;
  name: string;
  email: string;
}
