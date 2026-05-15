# 🎨 QR Code Styling - Personalizador de QR Codes de Alta Performance
 
[![React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)

## 📝 Descrição do Projeto
O **StylerQR** é uma ferramenta avançada de geração de QR Codes que permite aos usuários transformar códigos QR genéricos em peças de design únicas. O projeto foca na flexibilidade criativa, permitindo ajustes minuciosos em cada elemento do QR Code — desde o estilo dos pontos (dots) até a geometria dos cantos e esquemas de cores em degradê.

Desenvolvido para atender tanto necessidades simples de compartilhamento quanto requisitos profissionais de branding, o sistema oferece uma interface fluida que reflete as alterações instantaneamente, garantindo que o resultado final seja não apenas funcional, mas visualmente atraente.

![Dashboard do StylerQR](https://via.placeholder.com/1200x600/ffffff/333333?text=StylerQR+Dashboard+Preview)
*Figura 1: Interface principal intuitiva com múltiplas opções de estilização.*
 
## 🚀 Tecnologias Utilizadas
* **Core:** React 19 & TypeScript
* **Estilização:** Tailwind CSS (v4) para um design responsivo e moderno.
* **Motor de QR:** `qr-code-styling` para renderização precisa em SVG e Canvas.
* **Animações:** `motion` para transições suaves de interface.
* **Iconografia:** `Lucide React`.
 
## 📊 Funcionalidades e Aprendizados
O projeto evoluiu de um gerador básico para uma suíte completa de customização.
* **Customização Avançada:** Implementação de estilos específicos para Dots, Corner Squares e Corner Dots, incluindo suporte total a gradientes lineares e radiais.
* **Brand Integration:** Capacidade de upload de logotipos com ajuste dinâmico de redimensionamento e posicionamento.
* **Segurança e Robustez:** Implementação de **Error Boundaries** personalizados que capturam erros de configuração (como versões de QR imcompatíveis com o volume de dados) sem derrubar a aplicação, garantindo uma experiência contínua.
* **Exportação Multiformato:** Suporte para downloads profissionais em **PNG, JPEG, WEBP** e o formato vetorial **SVG**.

![Galeria de Estilos](https://via.placeholder.com/800x400/f8f9fa/333333?text=Custom+Styles+Galery)
*Figura 2: Exemplos de variações estilísticas possíveis com a ferramenta.*
 
## 🔧 Como Executar
1. Clone o repositório.
2. Instale as dependências: `npm install`.
3. Inicie o servidor de desenvolvimento: `npm run dev`.
4. Para gerar a versão de produção: `npm run build`.
 
![Fluxo de Design](https://via.placeholder.com/800x300/333333/ffffff?text=Design+Flow+Pipeline)
*Figura 3: Representação do fluxo de trabalho: Input -> Estilização -> Preview -> Export.*
 
---
[Voltar ao início](https://github.com/Caique4lves/portfolio-caique-dos-santos-alves)
