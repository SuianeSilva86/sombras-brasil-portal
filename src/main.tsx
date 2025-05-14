
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RitualIcon from './components/RitualIcon.tsx'

// Easter egg no console
console.log('%c⚠️ AVISO: FORÇAS OBSCURAS ⚠️', 'color:red; font-size:20px; font-weight:bold;');
console.log('%cProssiga por sua conta e risco...', 'color:crimson; font-style:italic; font-size:14px;');

// Adicionando um pequeno easter egg para desenvolvedores
const messages = [
  'ela está atrás de você...',
  'não olhe para trás...',
  'eles estão observando...',
  'você ouviu isso?',
];
const randomMessage = messages[Math.floor(Math.random() * messages.length)];
setTimeout(() => {
  console.log(`%c${randomMessage}`, 'color:#666; font-style:italic; font-size:11px;');
}, 10000);

createRoot(document.getElementById("root")!).render(<App />);
