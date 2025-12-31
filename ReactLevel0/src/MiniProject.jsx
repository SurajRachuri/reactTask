import { Header } from "./components/header";
import { Skills } from "./components/Skills";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { About } from "./components/about";
import "./App.css";
function MiniProject() {
  return (
    <div>
        <Header />
      <About />
      <Skills />
      <Contact />
      <Footer />
     
    </div>
  );
}

export default MiniProject;