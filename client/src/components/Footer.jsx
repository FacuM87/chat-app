import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full py-4 flex justify-center items-center text-gray-700 mt-4">
      <p className="text-sm">Facundo Mingorance 2024-2025</p>
      <a href="https://github.com/FacuM87" target="_blank" rel="noopener noreferrer" className="mx-2 text-gray-700 hover:text-black">
        <FaGithub size={20} />
      </a>
      <a href="https://www.linkedin.com/in/facundo-mingorance/" target="_blank" rel="noopener noreferrer" className="mx-2 text-gray-700 hover:text-blue-700">
        <FaLinkedin size={20} />
      </a>
    </footer>
  );
}

export default Footer;
