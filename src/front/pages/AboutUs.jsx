import React from "react";
import { FaUsers, FaCode, FaCheckCircle, FaHotjar } from "react-icons/fa";

const teamMembers = [
  {
    name: "Alison Estephany",
    role: "Full Stack Developer",
    image:
      "https://res.cloudinary.com/dtljfvq5m/image/upload/v1748977084/ali-SVG_xntjv9.png",
    description:
      "Aunque estudié Nutrición en la universidad,  tengo experiencia previa como freelancer en  mantenimiento de sitios WordPress. Ya habia intentado estudiar programacion por mi cuenta y tenia un par de proyectos, sin embargo unirme al bootcamp fue un antes y un después en mi camino: me permitió estructurar mis conocimientos, fortalecer mis bases en programación y ganar confianza como desarrolladora full stack. Hoy puedo decir que crecí no solo en habilidades técnicas, sino también en visión, enfoque y seguridad para asumir nuevos retos.",
  },
  {
    name: "Bastian Cartagena",
    role: "Full Stack Developer",
    image: "./fotoPerfilBastian.jpeg",
    description: "Con un pequeño empujón fue que llegue a este camino, y es gracias a un amigo que le pille el gusto a programar, aprendi un poco por internet pero me di cuenta que no era suficiente, fueron años hasta que decidí meterme a un bootcamp para comprender mejor y aprender más cosas y como utilizarlas. Fue un largo camino que se sintió rapidisimo, pero aqui estamos con más conocimiento, con buenas bases y seguro de poder lograr grandes cosas, todo gracias a mis profesores, compañeros y mentores, y mi nivia que me ayudo a no flaquear cuando la frustracion llegaba, muchas gracias a todos.",
  },
  {
    name: "Carlos Melchor",
    role: "Full Stack Developer",
    image: "./fotoPerfilCarlos.jpeg",
    description:
      "Tras terminar el bachillerato, inicié Ingeniería Industrial, pero no era lo mío. Descubrí la programación y me atrapó por completo. Aprendí de forma autodidacta hasta que ingresé a 4Geeks Academy, donde adquirí bases sólidas en tecnologías como JavaScript, React, Python y SQL. Hoy, con 19 años, tengo claro que mi camino está en la tecnología. Mi meta es especializarme en Inteligencia Artificial y Machine Learning, y gracias a lo aprendido en 4Geeks, sé que lo lograré.",
  },
];

const technologies = [
  "React",
  "Bootstrap",
  "Python",
  "Flask",
  "SQL",
  "React-Host-Toast",
  "Cloudinary",
  "Flask Mail",
];

const futureFeatures = [
  "Sistema de mensajería instantánea entre usuarios",
  "Funcionalidad de geolocalización básica",
  "Blog para que los rescatistas compartan historias de rescate de animales",
  "Sistema de storytelling de adoptantes para compartir historias de éxito",
  "Agendamiento de visita previa",
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
          <FaUsers size={50} className="text-icon mb-2" />
          <h2 className="counter">3</h2>
          <p>Integrantes</p>
        </div>
        <div className="col-md-3 mb-4">
          <FaCode size={50} className="text-icon mb-2" />
          <h2 className="counter">5+</h2>
          <p>Tecnologías</p>
        </div>
        <div className="col-md-3 mb-4">
          <FaCheckCircle size={50} className="text-icon mb-2" />
          <h2 className="counter">200+</h2>
          <p>Commits</p>
        </div>
        <div className="col-md-3 mb-4">
          <FaHotjar size={50} className="text-icon mb-2" />
          <h2 className="counter">1</h2>
          <p>Gran Proyecto</p>
        </div>
      </section>

      {/* Misión */}
      <section className="mb-5">
        <h2 className="section-title">
          🐾 Descripción del Proyecto – Petscue 🐾
        </h2>
        <p className=" w-75 mx-auto">
          Petscue es una plataforma desarrollada como proyecto final de nuestro
          bootcamp de Full Stack Dev. Su propósito principal es facilitar la
          adopción responsable de animales, conectando de forma segura a
          rescatistas, antiguos dueños que no pueden continuar cuidadando sus
          mascotas y personas interesadas en adoptar una mascota quienes deseen
          darles una segunda oportunidad. La app permite que los rescatistas y
          dueños de mascotas puedan publicar información sobre los animales en
          adopcion, y poder entrar en contacto con los interesados por medio de
          un formulario de contacto. A su vez, los usuarios que ya no pueden
          cuidar de su mascota pueden dejar una reseña para ayudar a encontrarle
          un nuevo hogar. Por otro lado, los adoptantes pueden crear un perfil,
          explorar a los animalitos disponibles, guardar favoritos y comunicarse
          con los responsables.
        </p>
      </section>

      {/* Visión */}
      <section className="mb-5">
        <h2 className="section-title">
          ¿Qué nos motivó a hacer este proyecto?
        </h2>
        <p className="w-75 mx-auto">
          Petscue representa para nosotros no solo un reto técnico superado,
          sino también una forma de aportar algo positivo al mundo desde la
          tecnología. Nuestro punto de partida fue una inquietud genuina:
          queríamos crear algo que tuviera sentido, que reflejara empatía y
          utilidad, y que nos permitiera aplicar todo lo que habíamos aprendido
          en el bootcamp. La idea surgió de manera natural entre el equipo. Nos
          pareció un buen proyecto porque todos hemos visto —de cerca o de
          lejos— historias de mascotas abandonadas, personas intentando dar en
          adopción a sus animales o rescatistas trabajando por amor sin
          recursos. Nos conmovió pensar que podíamos poner nuestras nuevas
          habilidades al servicio de algo así. Elegir Petscue fue elegir una
          causa que nos inspirara a esforzarnos más. Cada funcionalidad que
          diseñamos la pensamos desde la empatía y las ganas de construir algo
          bonito, útil y humano.
        </p>
      </section>

      {/* Team */}
      <section className="mb-5">
        <h2 className="section-title text-center mb-4">Conoce al Equipo</h2>
        <div className="row">
          {teamMembers.map((member, index) => (
            <div
              className="col-md-4 mb-4 d-flex justify-content-center"
              key={index}
            >
              <div className="card team-card h-100 text-center animate-zoom-in">
                <img
                  src={member.image}
                  className="card-img-top team-photo"
                  alt={member.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-text text-black">
                    <b>{member.role}</b>
                  </p>
                  <p className="card-text text-black">{member.description}</p>
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

      {/* Tecnologías */}
      <section className="text-center mt-5">
        <h2 className="section-title mb-4">Futuras implementaciones</h2>
        <div className="d-flex flex-wrap justify-content-center gap-2 animate-fade-in">
          {futureFeatures.map((feature, index) => (
            <span key={index} className="badge fs-6 px-3 py-2">
              {feature}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};
