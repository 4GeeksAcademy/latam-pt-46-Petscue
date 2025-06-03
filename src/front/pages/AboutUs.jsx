import React from "react";
import { FaUsers, FaCode, FaCheckCircle, FaRocket } from "react-icons/fa";

const teamMembers = [
  {
    name: "Alison",
    role: "Full Stack Developer",
    image:
      "https://imgs.search.brave.com/YUAHdzrezHLkMzH1LQy18AeJMehkkhlPXx-2fgMUJeQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/ODEzNDMzNi9lcy9m/b3RvL3JldHJhdG8t/ZGUtY2FiZXphLWhv/bWJyZS1hZnJpY2Fu/by1kZS1sb3MtYSVD/MyVCMW9zLTMwLXNv/bnJpc2EtbWlyYS1h/LWxhLWMlQzMlQTFt/YXJhLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1DZERVQmNp/RXZjOGFmTEFpXzVs/VlJYdXpSMTFrZjFz/RE9SdC1xc0lkNDIw/PQ",
    description: "Soy alison e hicimos un gran proyecto",
  },
  {
    name: "Bastian Cartagena",
    role: "Full Stack Developer",
    image:
      "https://imgs.search.brave.com/YUAHdzrezHLkMzH1LQy18AeJMehkkhlPXx-2fgMUJeQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/ODEzNDMzNi9lcy9m/b3RvL3JldHJhdG8t/ZGUtY2FiZXphLWhv/bWJyZS1hZnJpY2Fu/by1kZS1sb3MtYSVD/MyVCMW9zLTMwLXNv/bnJpc2EtbWlyYS1h/LWxhLWMlQzMlQTFt/YXJhLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1DZERVQmNp/RXZjOGFmTEFpXzVs/VlJYdXpSMTFrZjFz/RE9SdC1xc0lkNDIw/PQ",
    description: "Soy Bastian e hicimos un gran proyecto",
  },
  {
    name: "Carlos Melchor",
    role: "Full Stack Developer",
    image:
      "./fotoPerfilCarlos.jpeg",
    description: "Soy Carlos e hicimos un gran proyecto",
  },
];

const technologies = [
  "React",
  "Bootstrap",
  "Python",
  "Flask",
  "React-Host-Toast",
  "Cloudinary",
];

export const AboutUs = () => {
  return (
    <div className="container about-us-page py-5 animate-fade-in">

      {/* Header */}
      <section className="text-center mb-5">
        <h1 className="display-5 fw-bold">Construyendo Excelencia juntos</h1>
        <p className="lead mt-3 mx-auto w-75">
          En nuestro equipo creemos en la colaboración para lograr resultados
          excepcionales. Trabajamos con pasión, tecnología moderna y compromiso
          para convertir ideas en realidad.
        </p>
      </section>

      {/* Counters */}
      <section className="row text-center mb-5 animate-slide-up">
        <div className="col-md-3 mb-4">
          <FaUsers size={40} className="text-primary mb-2" />
          <h2 className="counter">3</h2>
          <p>Integrantes</p>
        </div>
        <div className="col-md-3 mb-4">
          <FaCode size={40} className="text-primary mb-2" />
          <h2 className="counter">5+</h2>
          <p>Tecnologías</p>
        </div>
        <div className="col-md-3 mb-4">
          <FaCheckCircle size={40} className="text-primary mb-2" />
          <h2 className="counter">200+</h2>
          <p>Commits</p>
        </div>
        <div className="col-md-3 mb-4">
          <FaRocket size={40} className="text-primary mb-2" />
          <h2 className="counter">1</h2>
          <p>Gran Proyecto</p>
        </div>
      </section>

      {/* Misión */}
      <section className="mb-5">
        <h2 className="section-title">Nuestra Misión</h2>
        <p className="text-muted w-75 mx-auto">
          Revolucionar la forma en que se presentan proyectos web, integrando
          diseño intuitivo, código limpio y un enfoque centrado en el usuario.
          Buscamos siempre mejorar la experiencia digital de nuestros usuarios
          mediante tecnología moderna y buenas prácticas.
        </p>
      </section>

      {/* Visión */}
      <section className="mb-5">
        <h2 className="section-title">Nuestra Visión</h2>
        <p className="text-muted w-75 mx-auto">
          Ser un equipo referente en desarrollo web, destacando por nuestra
          creatividad, eficiencia, colaboración y enfoque humano. Queremos dejar
          huella con cada proyecto que creamos.
        </p>
      </section>

      {/* Team */}
      <section className="mb-5">
        <h2 className="section-title text-center mb-4">Conoce al Equipo</h2>
        <div className="row">
          {teamMembers.map((member, index) => (
            <div className="col-md-4 mb-4 d-flex justify-content-center" key={index}>
              <div className="card team-card h-100 text-center animate-zoom-in">
                <img
                  src={member.image}
                  className="card-img-top team-photo"
                  alt={member.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-text text-muted">{member.role}</p>
                  <p className="card-text text-muted">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tecnologías */}
      <section className="text-center">
        <h2 className="section-title mb-4">Tecnologías Usadas</h2>
        <div className="d-flex flex-wrap justify-content-center gap-2 animate-fade-in">
          {technologies.map((tech, index) => (
            <span key={index} className="badge fs-6 px-3 py-2">
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};
