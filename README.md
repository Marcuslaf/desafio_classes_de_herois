# 🗡️ Jogo de Aventura - Classes de Heróis

Um jogo interativo desenvolvido em HTML, CSS e JavaScript que demonstra conceitos fundamentais de programação através de um sistema de criação e batalha de heróis.

![Hero Adventure Game](https://img.shields.io/badge/Status-Completo-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como uma demonstração prática dos conceitos fundamentais de programação orientada a objetos em JavaScript. O jogo permite criar heróis de diferentes classes, fazê-los atacar e acompanhar suas estatísticas, tudo com persistência de dados no navegador.

## ✨ Funcionalidades

### 🎮 Gameplay
- **Criação de Heróis**: Crie heróis únicos com nome, idade e tipo
- **Sistema de Batalha**: Cada tipo de herói possui ataques específicos
- **Estatísticas**: Acompanhe o progresso e desempenho dos seus heróis
- **Arena de Batalha**: Log em tempo real de todas as ações

### 💾 Persistência de Dados
- **Auto-Save**: Salvamento automático após cada ação
- **LocalStorage**: Dados preservados entre sessões
- **Backup/Restore**: Exportação e importação de dados
- **Gerenciamento**: Controles para limpar e gerenciar dados salvos

### 📱 Interface
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Feedback Visual**: Indicadores de status e animações
- **UX Otimizada**: Interface intuitiva e fácil de usar

## 🎯 Classes de Heróis

| Classe | Ícone | Ataque Especial |
|--------|-------|-----------------|
| **Mago** | 🧙‍♂️ | Usou magia |
| **Guerreiro** | ⚔️ | Usou espada |
| **Monge** | 🥋 | Usou artes marciais |
| **Ninja** | 🥷 | Usou shuriken |

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização moderna com Grid, Flexbox e animações
- **JavaScript ES6+**: Lógica do jogo com classes, módulos e APIs modernas
- **LocalStorage API**: Persistência de dados no navegador

## 📚 Conceitos de Programação Demonstrados

### ✅ Conceitos Implementados
- **Variáveis**: Armazenamento de dados dos heróis e estatísticas
- **Operadores**: Aritméticos, comparação e lógicos
- **Laços de Repetição**: `for` loops para renderização e cálculos
- **Estruturas de Decisão**: `if/else` e `switch/case` para lógica de jogo
- **Funções**: Modularização do código em funções reutilizáveis
- **Classes e Objetos**: Classe `Heroi` com propriedades e métodos

### 🏗️ Arquitetura
```
Classe Heroi {
  ├── Propriedades: nome, idade, tipo, ataqueCount
  ├── Método atacar(): Retorna mensagem baseada no tipo
  └── Método getInfo(): Retorna informações do herói
}
```

## 🚀 Como Usar

### 1. Clone o Repositório
```bash
git clone https://github.com/Marcuslaf/classes_de_herios.git
```

### 2. Abra o Jogo
Simplesmente abra o arquivo `index.html` em seu navegador preferido.

### 3. Comece a Jogar!
1. **Crie um Herói**: Preencha nome, idade e selecione o tipo
2. **Faça-o Atacar**: Clique no botão de ataque do herói
3. **Acompanhe**: Veja as estatísticas e log de batalha
4. **Gerencie**: Use os controles de dados para backup/restore

## 📁 Estrutura do Projeto

```
hero-adventure-game/
├── index.html          # Estrutura principal da aplicação
├── styles.css          # Estilos e responsividade
├── script.js           # Lógica do jogo e classes
└── README.md           # Documentação do projeto
```

## 🎨 Screenshots

### Desktop
- Interface completa com todas as seções visíveis
- Layout em grid responsivo
- Controles de gerenciamento de dados

### Mobile
- Layout adaptado para telas pequenas
- Navegação otimizada para touch
- Todas as funcionalidades preservadas

## 🔧 Funcionalidades Técnicas

### Persistência de Dados
```javascript
// Exemplo de estrutura de dados salvos
{
  "heroes": [...],
  "totalAttacks": 42,
  "battleLogEntries": [...],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
