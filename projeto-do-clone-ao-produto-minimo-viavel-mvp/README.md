# 🎨 QRLab-PRO - Gerador de QR Code Profissional

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)

## 📝 Descrição do Projeto
O **QRLab-PRO** é um webapp avançado desenvolvido para transformar links e informações em QR Codes altamente personalizados e visualmente impactantes. Diferente de geradores comuns, este projeto foca na experiência do usuário e na estética, permitindo ajustes finos que alinham o código à identidade visual de marcas ou projetos pessoais.

O sistema foi construído aplicando **boas práticas de engenharia de software**, com foco em **baixo acoplamento** e **alta coesão**, garantindo que a lógica de renderização, gerenciamento de estado e integração com serviços externos (Firebase) funcionem de maneira harmoniosa e escalável.

## 🚀 Tecnologias Utilizadas
* **Frontend:** React 18 com TypeScript
* **Estilização:** Tailwind CSS para layouts responsivos e modernos
* **Animações:** Motion (Framer Motion) para transições fluidas
* **Processamento de Imagem:** `qr-code-styling` para geração dinâmica de QR Codes
* **Backend & Infraestrutura:** Firebase (Authentication, Firestore, Storage)
* **Ferramenta de Build:** Vite

## 📊 Resultados e Aprendizados
O desenvolvimento deste projeto permitiu a exploração profunda de renderização no lado do cliente e integração de serviços Cloud:
* **Renderização Estável:** Implementação de técnicas de debouncing e sincronização de estados para evitar falhas no canvas.
* **Arquitetura Full-Stack:** Aprendizado prático sobre sincronização de estados locais com persistência em nuvem utilizando Firebase.
* **UX Refinada:** Foco em feedback visual imediato e estados de carregamento robustos para uploads de mídia.

## 🔧 Como Executar
1. Clone o repositório: `git clone https://github.com/Caique4lves/QRLab-PRO.git`
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente no arquivo `.env` (chaves do Firebase)
4. Inicie o servidor de desenvolvimento: `npm run dev`

---
[Voltar ao início](https://github.com/Caique4lves/portfolio-caique-dos-santos-alves)
