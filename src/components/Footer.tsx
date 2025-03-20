const links = [
  { href: "/", text: "Início" },
  { href: "/exames", text: "Exames" },
  { href: "/especialidades", text: "Especialidades" },
  { href: "/clinicas", text: "Clínicas" },
  { href: "/medicos", text: "Médicos" },
  { href: "/agendar", text: "Agende uma consulta" },
];

export const Footer = () => {
  return (
    <footer className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-blue-100 py-8 px-[2vw] sm:px-[4vw] lg:px-[8vw]">
      <div>
        <h2 className="font-semibold text-xl">Horários</h2>
        <p>Segunda - Sábado: 7:00 - 19:00</p>
      </div>

      <div>
        <h2 className="font-semibold text-xl">Menu</h2>

        <nav>
          <ul>
            {links.map((link) => {
              return (
                <li>
                  <a href={link.href} className="underline">
                    {link.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div>
        <h2 className="font-semibold text-xl">Redes sociais</h2>

        <div className="flex flex-col">
          <a href="#" className="underline">
            Instagram
          </a>

          <a href="#" className="underline">
            Facebook
          </a>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-xl">Contato</h2>
        <p>(85) 99292-0202</p>
        <p>housecare@hotmail.com</p>
      </div>
    </footer>
  );
};
