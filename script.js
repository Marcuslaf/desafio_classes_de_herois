// Classe Herói - Implementação dos conceitos solicitados
class Heroi {
  constructor(nome, idade, tipo) {
    this.nome = nome
    this.idade = idade
    this.tipo = tipo
    this.ataqueCount = 0
    this.id = Date.now() + Math.random() // ID único para cada herói
  }

  // Método atacar com estruturas de decisão
  atacar() {
    let ataque

    // Estrutura de decisão para determinar o tipo de ataque
    switch (this.tipo) {
      case "mago":
        ataque = "magia"
        break
      case "guerreiro":
        ataque = "espada"
        break
      case "monge":
        ataque = "artes marciais"
        break
      case "ninja":
        ataque = "shuriken"
        break
      default:
        ataque = "atacou"
    }

    this.ataqueCount++ // Operador de incremento
    const mensagem = `o ${this.tipo} ${this.nome} atacou usando ${ataque}`

    return mensagem
  }

  // Método para obter informações do herói
  getInfo() {
    return {
      id: this.id,
      nome: this.nome,
      idade: this.idade,
      tipo: this.tipo,
      ataques: this.ataqueCount,
    }
  }
}

// Variáveis globais
let heroes = [] // Array para armazenar os heróis
let totalAttacks = 0 // Contador total de ataques
let battleLogCount = 0 // Contador de entradas no log
let battleLogEntries = [] // Array para armazenar entradas do log

// Objetos para mapear tipos e ícones
const tipoIcons = {
  mago: "🧙‍♂️",
  guerreiro: "⚔️",
  monge: "🥋",
  ninja: "🥷",
}

const tipoNames = {
  mago: "Mago",
  guerreiro: "Guerreiro",
  monge: "Monge",
  ninja: "Ninja",
}

// Constantes para localStorage
const STORAGE_KEY = "heroAdventureGame"

// Funções de localStorage para persistência de dados
function atualizarStatusSave(status = "saved", mensagem = "Dados salvos automaticamente") {
  const saveIndicator = document.getElementById("saveIndicator")
  const saveText = document.getElementById("saveText")
  const lastSave = document.getElementById("lastSave")

  if (saveIndicator && saveText) {
    // Remove classes anteriores
    saveIndicator.classList.remove("saving", "error")

    // Adiciona classe baseada no status
    if (status === "saving") {
      saveIndicator.classList.add("saving")
    } else if (status === "error") {
      saveIndicator.classList.add("error")
    }

    saveText.textContent = mensagem
  }

  if (lastSave) {
    lastSave.textContent = new Date().toLocaleString("pt-BR")
  }
}

function salvarDados() {
  try {
    atualizarStatusSave("saving", "Salvando dados...")

    const dadosJogo = {
      heroes: heroes.map((heroi) => ({
        nome: heroi.nome,
        idade: heroi.idade,
        tipo: heroi.tipo,
        ataqueCount: heroi.ataqueCount,
        id: heroi.id,
      })),
      totalAttacks: totalAttacks,
      battleLogCount: battleLogCount,
      battleLogEntries: battleLogEntries,
      timestamp: new Date().toISOString(),
      version: "1.0",
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosJogo))

    // Feedback visual de sucesso
    setTimeout(() => {
      atualizarStatusSave("saved", "Dados salvos automaticamente")
    }, 300)

    console.log("✅ Dados salvos com sucesso!")
    return true
  } catch (error) {
    console.error("❌ Erro ao salvar dados:", error)
    atualizarStatusSave("error", "Erro ao salvar dados")
    return false
  }
}

function carregarDados() {
  try {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY)

    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos)

      // Limpa arrays atuais
      heroes = []
      battleLogEntries = []

      // Recria os heróis a partir dos dados salvos
      if (dados.heroes && Array.isArray(dados.heroes)) {
        for (let i = 0; i < dados.heroes.length; i++) {
          const heroiData = dados.heroes[i]
          const heroi = new Heroi(heroiData.nome, heroiData.idade, heroiData.tipo)
          heroi.ataqueCount = heroiData.ataqueCount || 0
          heroi.id = heroiData.id || Date.now() + Math.random()
          heroes.push(heroi)
        }
      }

      // Restaura contadores
      totalAttacks = dados.totalAttacks || 0
      battleLogCount = dados.battleLogCount || 0

      // Restaura log de batalha
      if (dados.battleLogEntries && Array.isArray(dados.battleLogEntries)) {
        battleLogEntries = dados.battleLogEntries
        restaurarLogBatalha()
      }

      console.log(`✅ Dados carregados! ${heroes.length} heróis restaurados.`)

      // Adiciona mensagem no log sobre o carregamento
      if (heroes.length > 0) {
        adicionarLogBatalha(`🔄 Jogo carregado! ${heroes.length} heróis restaurados do save anterior.`)
      }

      atualizarStatusSave("saved", "Dados carregados com sucesso")
      return true
    }

    atualizarStatusSave("saved", "Nenhum save encontrado")
    return false
  } catch (error) {
    console.error("❌ Erro ao carregar dados:", error)
    atualizarStatusSave("error", "Erro ao carregar dados")
    return false
  }
}

function limparDadosSalvos() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    console.log("🗑️ Dados salvos removidos!")
    return true
  } catch (error) {
    console.error("❌ Erro ao limpar dados:", error)
    return false
  }
}

function exportarDados() {
  try {
    const dadosJogo = localStorage.getItem(STORAGE_KEY)
    if (dadosJogo) {
      const blob = new Blob([dadosJogo], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `heroes-backup-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      adicionarLogBatalha("💾 Backup dos dados exportado com sucesso!")
      return true
    } else {
      alert("Nenhum dado para exportar!")
      return false
    }
  } catch (error) {
    console.error("❌ Erro ao exportar dados:", error)
    alert("Erro ao exportar dados!")
    return false
  }
}

function confirmarLimpezaDados() {
  const confirmacao = confirm(
    "⚠️ ATENÇÃO!\n\n" +
      "Esta ação irá remover TODOS os seus heróis e dados salvos permanentemente.\n\n" +
      "Deseja continuar?",
  )

  if (confirmacao) {
    // Limpa arrays e contadores
    heroes = []
    totalAttacks = 0
    battleLogCount = 0
    battleLogEntries = []

    // Remove dados do localStorage
    limparDadosSalvos()

    // Limpa a interface
    renderizarHeroes()
    atualizarEstatisticas()
    limparLog()

    // Feedback visual
    atualizarStatusSave("saved", "Dados limpos com sucesso")
    adicionarLogBatalha("🗑️ Todos os dados foram removidos!")
  }
}

// Função para criar um novo herói
function criarHeroi(nome, idade, tipo) {
  // Validação usando operadores lógicos
  if (nome && nome.trim() && idade > 0 && tipo) {
    const novoHeroi = new Heroi(nome.trim(), idade, tipo)
    heroes.push(novoHeroi) // Adiciona ao array
    salvarDados() // Salva automaticamente
    return novoHeroi
  }
  return null
}

// Função para renderizar a lista de heróis
function renderizarHeroes() {
  const container = document.getElementById("heroesContainer")
  const heroCount = document.getElementById("heroCount")

  // Atualiza contador
  if (heroCount) {
    heroCount.textContent = heroes.length
  }

  // Estrutura de decisão para verificar se há heróis
  if (heroes.length === 0) {
    container.innerHTML = '<p class="no-heroes">Nenhum herói criado ainda. Crie seu primeiro herói!</p>'
    const attackAllBtn = document.getElementById("attackAllBtn")
    if (attackAllBtn) {
      attackAllBtn.disabled = true
    }
    return
  }

  const attackAllBtn = document.getElementById("attackAllBtn")
  if (attackAllBtn) {
    attackAllBtn.disabled = false
  }

  let html = ""

  // Laço de repetição para criar cards dos heróis
  for (let i = 0; i < heroes.length; i++) {
    const heroi = heroes[i]
    const info = heroi.getInfo()

    html += `
      <div class="hero-card" data-hero-id="${info.id}">
        <div class="hero-info">
          <div class="hero-details">
            <h3>${escapeHtml(info.nome)}</h3>
            <p><strong>Idade:</strong> ${info.idade} anos</p>
            <p><strong>Tipo:</strong> ${tipoNames[info.tipo]}</p>
            <p><strong>Ataques:</strong> ${info.ataques}</p>
          </div>
          <div class="hero-type">${tipoIcons[info.tipo]}</div>
        </div>
        <button class="attack-btn" onclick="atacarHeroi(${i})">
          ⚔️ ${escapeHtml(info.nome)} Atacar!
        </button>
      </div>
    `
  }

  container.innerHTML = html
}

// Função para escapar HTML e prevenir XSS
function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

// Função para fazer um herói atacar
function atacarHeroi(index) {
  // Verificação de índice válido
  if (index >= 0 && index < heroes.length) {
    const heroi = heroes[index]
    const mensagemAtaque = heroi.atacar()

    adicionarLogBatalha(mensagemAtaque)
    totalAttacks++ // Incremento do contador total

    // Salva os dados após o ataque
    salvarDados()

    // Atualiza a interface
    renderizarHeroes()
    atualizarEstatisticas()
  }
}

// Função para todos os heróis atacarem
function todosAtacarem() {
  if (heroes.length === 0) {
    return
  }

  // Laço de repetição para fazer todos os heróis atacarem
  for (let i = 0; i < heroes.length; i++) {
    const heroi = heroes[i]
    const mensagemAtaque = heroi.atacar()
    adicionarLogBatalha(mensagemAtaque)
    totalAttacks++
  }

  // Salva os dados após todos atacarem
  salvarDados()

  // Atualiza a interface
  renderizarHeroes()
  atualizarEstatisticas()
}

// Função para adicionar entrada no log de batalha
function adicionarLogBatalha(mensagem) {
  const battleLog = document.getElementById("battleLog")

  if (!battleLog) return

  // Remove mensagem vazia se existir
  const emptyMsg = battleLog.querySelector(".log-empty")
  if (emptyMsg) {
    emptyMsg.remove()
  }

  battleLogCount++
  const logEntry = {
    id: battleLogCount,
    mensagem: mensagem,
    timestamp: new Date().toISOString(),
  }

  battleLogEntries.push(logEntry)

  const logDiv = document.createElement("div")
  logDiv.className = "log-entry"
  logDiv.innerHTML = `<strong>[${battleLogCount}]</strong> ${escapeHtml(mensagem)}`

  battleLog.appendChild(logDiv)
  battleLog.scrollTop = battleLog.scrollHeight // Auto-scroll
}

// Função para restaurar log de batalha
function restaurarLogBatalha() {
  const battleLog = document.getElementById("battleLog")

  if (!battleLog || battleLogEntries.length === 0) return

  // Remove mensagem vazia se existir
  const emptyMsg = battleLog.querySelector(".log-empty")
  if (emptyMsg) {
    emptyMsg.remove()
  }

  // Limpa log atual
  battleLog.innerHTML = ""

  // Restaura entradas do log
  for (let i = 0; i < battleLogEntries.length; i++) {
    const entry = battleLogEntries[i]
    const logDiv = document.createElement("div")
    logDiv.className = "log-entry"
    logDiv.innerHTML = `<strong>[${entry.id}]</strong> ${escapeHtml(entry.mensagem)}`
    battleLog.appendChild(logDiv)
  }

  battleLog.scrollTop = battleLog.scrollHeight
}

// Função para limpar o log de batalha
function limparLog() {
  const battleLog = document.getElementById("battleLog")
  if (battleLog) {
    battleLog.innerHTML = '<p class="log-empty">Os ataques aparecerão aqui...</p>'
  }

  battleLogCount = 0
  battleLogEntries = []
  salvarDados() // Salva após limpar o log
}

// Função para calcular estatísticas
function atualizarEstatisticas() {
  // Atualiza total de heróis
  const totalHeroesEl = document.getElementById("totalHeroes")
  if (totalHeroesEl) {
    totalHeroesEl.textContent = heroes.length
  }

  // Atualiza total de ataques
  const totalAttacksEl = document.getElementById("totalAttacks")
  if (totalAttacksEl) {
    totalAttacksEl.textContent = totalAttacks
  }

  // Calcula tipo mais comum usando laços e operadores
  const mostCommonTypeEl = document.getElementById("mostCommonType")
  if (mostCommonTypeEl) {
    if (heroes.length > 0) {
      const tipoCount = {}

      // Laço para contar tipos
      for (let i = 0; i < heroes.length; i++) {
        const tipo = heroes[i].tipo
        tipoCount[tipo] = (tipoCount[tipo] || 0) + 1 // Operador ternário
      }

      // Encontra o tipo mais comum
      let tipoMaisComum = ""
      let maiorCount = 0

      // Laço para encontrar o maior
      for (const tipo in tipoCount) {
        if (tipoCount[tipo] > maiorCount) {
          maiorCount = tipoCount[tipo]
          tipoMaisComum = tipo
        }
      }

      mostCommonTypeEl.textContent = tipoMaisComum ? `${tipoNames[tipoMaisComum]} (${maiorCount})` : "-"
    } else {
      mostCommonTypeEl.textContent = "-"
    }
  }
}

// Função para inicializar o jogo
function inicializarJogo() {
  console.log("🎮 Inicializando jogo...")

  // Carrega dados salvos
  const dadosCarregados = carregarDados()

  // Atualiza a interface
  renderizarHeroes()
  atualizarEstatisticas()

  // Se não há dados salvos, mostra mensagem de boas-vindas
  if (!dadosCarregados) {
    adicionarLogBatalha("🎮 Bem-vindo ao Jogo de Aventura! Crie seu primeiro herói para começar.")
  }

  console.log("✅ Jogo inicializado com sucesso!")
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa o jogo
  inicializarJogo()

  // Formulário de criação de herói
  const heroForm = document.getElementById("heroForm")
  if (heroForm) {
    heroForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Captura valores do formulário
      const nomeInput = document.getElementById("heroName")
      const idadeInput = document.getElementById("heroAge")
      const tipoSelect = document.getElementById("heroType")

      if (!nomeInput || !idadeInput || !tipoSelect) {
        console.error("Elementos do formulário não encontrados")
        return
      }

      const nome = nomeInput.value.trim()
      const idade = Number.parseInt(idadeInput.value)
      const tipo = tipoSelect.value

      // Validação adicional
      if (!nome) {
        alert("Por favor, digite um nome para o herói!")
        nomeInput.focus()
        return
      }

      if (isNaN(idade) || idade < 1 || idade > 1000) {
        alert("Por favor, digite uma idade válida (1-1000)!")
        idadeInput.focus()
        return
      }

      if (!tipo) {
        alert("Por favor, selecione um tipo de herói!")
        tipoSelect.focus()
        return
      }

      // Verifica se já existe um herói com o mesmo nome
      const nomeExiste = heroes.some((heroi) => heroi.nome.toLowerCase() === nome.toLowerCase())
      if (nomeExiste) {
        alert("Já existe um herói com este nome! Escolha outro nome.")
        nomeInput.focus()
        return
      }

      // Cria o herói
      const novoHeroi = criarHeroi(nome, idade, tipo)

      if (novoHeroi) {
        // Limpa o formulário
        this.reset()

        // Atualiza a interface
        renderizarHeroes()
        atualizarEstatisticas()

        // Adiciona mensagem no log
        adicionarLogBatalha(`✨ Novo herói criado: ${nome} (${tipoNames[tipo]})`)

        // Foca no campo nome para facilitar criação de novos heróis
        nomeInput.focus()
      } else {
        alert("Erro ao criar herói. Tente novamente!")
      }
    })
  }

  // Botão de atacar todos
  const attackAllBtn = document.getElementById("attackAllBtn")
  if (attackAllBtn) {
    attackAllBtn.addEventListener("click", todosAtacarem)
  }

  // Botão de limpar log
  const clearLogBtn = document.getElementById("clearLogBtn")
  if (clearLogBtn) {
    clearLogBtn.addEventListener("click", limparLog)
  }

  // Botão de salvar manualmente
  const saveBtn = document.getElementById("saveBtn")
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      if (salvarDados()) {
        adicionarLogBatalha("💾 Dados salvos manualmente!")
      }
    })
  }

  // Botão de exportar backup
  const exportBtn = document.getElementById("exportBtn")
  if (exportBtn) {
    exportBtn.addEventListener("click", exportarDados)
  }

  // Botão de limpar dados
  const clearDataBtn = document.getElementById("clearDataBtn")
  if (clearDataBtn) {
    clearDataBtn.addEventListener("click", confirmarLimpezaDados)
  }
})

// Função para demonstrar conceitos adicionais
function demonstrarConceitos() {
  console.log("=== DEMONSTRAÇÃO DOS CONCEITOS ===")

  // Variáveis
  const exemploNome = "Gandalf"
  const exemploIdade = 2000
  const exemploTipo = "mago"

  console.log("1. Variáveis:", { exemploNome, exemploIdade, exemploTipo })

  // Operadores
  const soma = exemploIdade + 100 // Aritmético
  const comparacao = exemploIdade > 1000 // Comparação
  const logico = exemploNome && exemploTipo // Lógico

  console.log("2. Operadores:", { soma, comparacao, logico })

  // Estruturas de decisão
  if (exemploTipo === "mago") {
    console.log("3. Estrutura de decisão: É um mago!")
  } else {
    console.log("3. Estrutura de decisão: Não é um mago!")
  }

  // Laços de repetição
  console.log("4. Laço de repetição:")
  for (let i = 1; i <= 3; i++) {
    console.log(`   Iteração ${i}`)
  }

  // Função
  function exemploFuncao(parametro) {
    return `Função executada com: ${parametro}`
  }
  console.log("5. Função:", exemploFuncao("teste"))

  // Classe e Objeto
  const exemploHeroi = new Heroi(exemploNome, exemploIdade, exemploTipo)
  console.log("6. Classe e Objeto:", exemploHeroi.atacar())
}

// Executa demonstração no console
demonstrarConceitos()

// Função global para debug (pode ser chamada no console)
window.debugGame = () => {
  console.log("=== DEBUG DO JOGO ===")
  console.log("Heróis:", heroes)
  console.log("Total de ataques:", totalAttacks)
  console.log("Log de batalha:", battleLogEntries)
  console.log("Dados no localStorage:", localStorage.getItem(STORAGE_KEY))
}