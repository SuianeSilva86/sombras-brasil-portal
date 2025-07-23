# 🌑 Sombras do Brasil Portal

<div align="center">
  <img src="./public/favicon-scary.svg" alt="Sombras do Brasil" width="80" height="80" style="border-radius: 50%;">
  
  **"Onde o inexplicável encontra um lar"**

  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org)
  [![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
</div>

## 📖 Sobre o Projeto

O **Sombras do Brasil Portal** é uma plataforma interativa dedicada às lendas urbanas e folclóricas brasileiras. Este projeto mergulha no rico universo do imaginário popular brasileiro, oferecendo uma experiência imersiva e atmosférica para explorar as histórias que moldaram nossa cultura.

### 🎯 Objetivo

Preservar e compartilhar o folclore brasileiro através de uma experiência digital moderna, conectando tradições ancestrais com tecnologia contemporânea. O portal serve como um arquivo vivo das narrativas que alimentam nosso imaginário coletivo.

### ✨ Características Principais

- **🕯️ Experiência Imersiva**: Interface dark com elementos visuais atmosféricos
- **📚 Biblioteca de Lendas**: Coleção curada de lendas urbanas e folclóricas brasileiras
- **🎭 Interatividade**: Efeitos visuais e sonoros que intensificam a experiência
- **♿ Acessibilidade**: Controles para redução de movimento e desativação de áudio
- **📝 Contribuição Comunitária**: Usuários podem enviar suas próprias lendas
- **🎨 Design Responsivo**: Otimizado para todos os dispositivos

### 🌟 Funcionalidades

#### 🏠 Página Inicial
- Apresentação das lendas em destaque
- Sussurros interativos e partículas ambientes
- Navegação intuitiva com ícones místicos

#### 🔍 Exploração de Lendas
- Grid de lendas organizadas por região
- Sistema de busca e filtros
- Cards informativos com prévia das histórias

#### 📖 Leitura Imersiva
- Revelação gradual do texto com efeitos de digitação
- Áudio ambiente atmosférico
- Controles de acessibilidade integrados

#### ✍️ Envio de Lendas
- Formulário para contribuições da comunidade
- Validação e armazenamento local
- Interface intuitiva para compartilhar histórias

### 🎨 Design System

O projeto utiliza um design system cuidadosamente elaborado:

- **Paleta de Cores**: Tons sépia e vermelho sangue (`#ca0000`, `#eee8d5`)
- **Tipografia**: Playfair Display (títulos), Inter (corpo), Lora (narrativas)
- **Componentes**: Baseados em shadcn/ui com customizações temáticas
- **Animações**: Efeitos sutis que respeitam preferências de movimento

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server ultrarrápido
- **Tailwind CSS** - Framework CSS utility-first

### Componentes e UI
- **shadcn/ui** - Componentes reutilizáveis e acessíveis
- **Radix UI** - Primitivos de interface com foco em acessibilidade
- **Lucide React** - Ícones modernos e limpos

### Gerenciamento de Estado e Dados
- **TanStack Query** - Gerenciamento de estado do servidor
- **React Hook Form** - Gerenciamento de formulários performático
- **Local Storage** - Persistência de dados do usuário

### Funcionalidades Especiais
- **Áudio atmosférico** - Sons ambientes para imersão
- **Efeitos visuais** - Partículas, sussurros e animações temáticas
- **Acessibilidade** - Controles para usuários com diferentes necessidades
- **PWA Ready** - Otimizado para instalação como app

### Ferramentas de Desenvolvimento
- **ESLint** - Linting e qualidade de código
- **PostCSS** - Processamento de CSS
- **TypeScript Config** - Configuração tipada rigorosa

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/SuianeSilva86/sombras-brasil-portal.git

# Navegue até o diretório
cd sombras-brasil-portal

# Instale as dependências
npm install

# Execute o projeto em modo de desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Visualiza o build de produção
npm run lint     # Executa verificação de código
```

## 📱 Funcionalidades de Acessibilidade

O projeto foi desenvolvido pensando na inclusão de todos os usuários:

- **Redução de Movimento**: Controle para usuários sensíveis a animações
- **Controle de Áudio**: Ativação/desativação de sons atmosféricos
- **Navegação por Teclado**: Totalmente navegável via teclado
- **Leitores de Tela**: Compatível com tecnologias assistivas
- **Alto Contraste**: Paleta de cores otimizada para legibilidade

## 🎭 Lendas Disponíveis

O portal conta com uma rica coleção de lendas brasileiras:

- **Curupira** - Protetor das florestas com pés virados
- **Boto-cor-de-rosa** - Encantador das águas amazônicas
- **Iara** - Sereia dos rios brasileiros
- **Saci-Pererê** - Travesso de uma perna só
- **Mula Sem Cabeça** - Maldição dos pecados proibidos
- **Lobisomem** - Transformação nas noites de lua cheia

*E muitas outras que você pode descobrir explorando o portal...*

## 🤝 Como Contribuir

### Enviando uma Nova Lenda

1. Acesse a página "Enviar Lenda" no portal
2. Preencha o formulário com:
   - Título da lenda
   - Região de origem
   - História completa
   - Autor/fonte (opcional)
3. Sua lenda será armazenada localmente e exibida no portal

### Contribuindo com Código

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📦 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── AccessibilityControls.tsx
│   ├── HauntedBackground.tsx
│   ├── HauntedCursor.tsx
│   └── ...
├── pages/              # Páginas da aplicação
│   ├── Index.tsx       # Página inicial
│   ├── Explorar.tsx    # Exploração de lendas
│   ├── LerLenda.tsx    # Leitura individual
│   └── Enviar.tsx      # Envio de lendas
├── hooks/              # Hooks customizados
├── lib/                # Utilitários e helpers
└── ...
```

## 🌐 Deploy

### Deploy Manual

O projeto pode ser deployado em qualquer plataforma que suporte sites estáticos:

- **Vercel**: `npm run build` + upload da pasta `dist`
- **Netlify**: Conecte o repositório GitHub
- **GitHub Pages**: Configure GitHub Actions para build automático


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvimento**: [Suiane Silva](https://github.com/SuianeSilva86)
- **Design**: Interface temática inspirada no folclore brasileiro
- **Conteúdo**: Lendas curadas do patrimônio cultural brasileiro

## 🙏 Agradecimentos

- Às comunidades que preservam nossas lendas
- Aos contadores de histórias que mantêm viva nossa tradição oral
- À rica cultura folclórica brasileira que inspira este projeto

---

<div align="center">
  <p><em>"Nas sombras do Brasil, cada lenda tem sua verdade"</em></p>
  
  ⭐ Se este projeto te inspirou, deixe uma estrela!
</div>
