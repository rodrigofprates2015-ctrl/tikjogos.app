// Arquivo de traduções - TikJogos (Completo com Blog Posts)
// Idiomas: Português (PT), Inglês (EN), Espanhol (ES)

export type Language = 'pt' | 'en' | 'es';

export const translations = {
  pt: {
    // Navegação e Menu
    nav: {
      home: 'Início',
      blog: 'Blog',
      howToPlay: 'Como Jogar',
      themes: 'Temas',
      createTheme: 'Criar Tema',
      donate: 'Doar',
      privacy: 'Privacidade',
      terms: 'Termos de Uso',
      otherGames: 'Outros Jogos',
      navigation: 'Navegação',
      support: 'Suporte',
      faq: 'FAQ',
      reportBug: 'Reportar Bug',
      contact: 'Contato',
      officialDiscord: 'Discord Oficial',
      followUs: 'Siga-nos',
      language: 'Idioma',
    },

    // Página Inicial (ImpostorGame)
    home: {
      title: 'TikJogos',
      subtitle: 'O Jogo do Impostor Reimaginado',
      description: 'Desconfiança, estratégia e diversão em um só lugar. Jogue com amigos e descubra quem é o impostor.',
      createRoom: 'Criar Sala',
      joinRoom: 'Entrar em Sala',
      playLocal: 'Modo Local',
      createTheme: 'Criar Tema',
      nickname: 'Digite seu apelido',
      roomCode: 'Código da sala',
      saveNickname: 'Lembrar meu apelido',
      enterCode: 'Entrar',
    },

    // Modo de Jogo (GameModes)
    gameModes: {
      title: 'Modos de Jogo',
      description: 'Escolha seu modo favorito e comece a jogar',
      classic: {
        name: 'Modo Clássico',
        description: 'O jogo tradicional com discussões e votações',
      },
      rapid: {
        name: 'Modo Rápido',
        description: 'Partidas rápidas com menos rodadas',
      },
      hardcore: {
        name: 'Modo Hardcore',
        description: 'Desafio máximo com regras mais rigorosas',
      },
      custom: {
        name: 'Modo Customizado',
        description: 'Crie suas próprias regras',
      },
    },

    // Como Jogar
    howToPlay: {
      title: 'Como Jogar',
      objective: 'Objetivo do Jogo',
      objectiveDesc: 'Encontre o(s) impostor(es) antes que eles sabotagem o grupo.',
      roles: 'Papéis',
      crewmate: 'Tripulante - Complete as tarefas',
      impostor: 'Impostor - Sabote e elimine',
      gameplay: 'Gameplay',
      gameplayDesc: 'Discussão, votação e execução de suspeitos.',
      tips: 'Dicas',
      tipObserve: 'Observe o comportamento dos outros',
      tipCommunicate: 'Comunique-se com seu time',
      tipVote: 'Vote com confiança mas cuidado',
    },

    // Criar Tema
    createTheme: {
      title: 'Criar Tema',
      description: 'Crie seu próprio tema personalizado para o jogo',
      themeTitle: 'Título do Tema',
      authorName: 'Nome do Autor',
      words: 'Palavras (mínimo 7)',
      addWord: 'Adicionar Palavra',
      isPublic: 'Tornar Público',
      isPrivate: 'Privado',
      price: 'R$ 3,00',
      acceptTerms: 'Aceito os termos e condições',
      create: 'Criar Tema',
      paymentPending: 'Aguardando Pagamento',
      scanQr: 'Escaneie o QR Code',
      copying: 'Copiar PIX',
      copied: 'Copiado!',
      success: 'Tema criado com sucesso!',
      successCode: 'Código de Acesso',
      error: 'Erro ao criar tema',
      minWords: 'Mínimo de 7 palavras necessário',
      maxWords: 'Máximo de 25 palavras',
    },

    // Doações
    donate: {
      title: 'Apoiar o Projeto',
      description: 'Sua contribuição ajuda a manter o TikJogos funcionando e em constante evolução.',
      thanks: 'Obrigado por apoiar!',
      donorName: 'Seu Nome',
      message: 'Mensagem (opcional)',
      amount: 'Valor (R$)',
      presets: ['R$ 5', 'R$ 10', 'R$ 20', 'R$ 50'],
      customAmount: 'Valor Customizado',
      donate: 'Fazer Doação',
      paymentPending: 'Aguardando Confirmação',
      scanQr: 'Escaneie o QR Code com seu app do Banco',
      minAmount: 'Valor mínimo é R$ 1,00',
      maxAmount: 'Valor máximo é R$ 1.000,00',
      success: 'Doação recebida com sucesso!',
      error: 'Erro ao processar doação',
      backToHome: 'Voltar para Home',
      heroTitle: 'APOIE O TIKJOGOS',
      heroDesc: 'Ajude a manter o jogo online e gratuito!',
      whyDonate: 'POR QUE DOAR?',
      whyDonateDesc: 'Servidores • Novos modos • Melhorias • Jogo 100% gratuito',
      chooseAmount: 'ESCOLHA O VALOR:',
      other: 'Outro',
      nicknamePlaceholder: 'Seu nickname',
      enterName: 'Digite seu nome',
      donateViaPix: 'DOAR VIA PIX',
      scanOrCopy: 'Escaneie o QR Code ou copie o código PIX',
      copyPixCode: 'COPIAR CÓDIGO PIX',
      awaitingPayment: 'Aguardando pagamento...',
      copied: 'Copiado!',
      copiedDesc: 'Código PIX copiado para a área de transferência.',
      thankYou: 'OBRIGADO',
      thankYouDesc: 'Sua contribuição ajuda a manter o TikJogos online e gratuito para todos.',
      donateAgain: 'Doar novamente',
      goPlay: 'Ir jogar',
    },

    // Blog
    blog: {
      title: 'Blog do Impostor',
      subtitle: 'Central de Comando',
      description: 'Notícias galácticas, estratégias de sabotagem e atualizações direto da central TikJogos.',
      readMore: 'Ler Mais',
      readTime: 'min de leitura',
      published: 'Publicado em',
      author: 'Por',
      category: 'Categoria',
      noComments: 'Nenhum comentário ainda',
    },

    // Posts do Blog
    blogPosts: {
      post1: {
        title: 'A alma dos games sociais: Por que a desconfiança nos fascina?',
        excerpt: 'O Jogo do Impostor consolidou-se como um verdadeiro fenômeno cultural ao transformar a desconfiança em uma experiência profunda.',
        content: `O Jogo do Impostor consolidou-se como um verdadeiro fenômeno cultural entre gamers e diversos grupos de amigos por conseguir transformar uma premissa extremamente simples em uma experiência psicológica profunda e muito intensa. Diferente da maioria dos jogos tradicionais, onde o objetivo principal é competir contra regras matemáticas fixas ou mecânicas de reflexo rápidas, aqui os participantes são colocados para enfrentar diretamente a mente e a intuição uns dos outros.

Essa mudança de paradigma retira o foco do tabuleiro físico ou da interface digital e o transporta para o campo das interações humanas puras, onde cada palavra dita possui um peso estratégico fundamental para o sucesso ou fracasso do grupo. A grande força motriz que sustenta toda a dinâmica desta modalidade está fundamentada na desconfiança constante e na leitura comportamental.

### O Fator Humano como Variável
Cada resposta ligeiramente vaga, cada pausa inesperada ao falar e cada acusação lançada sem uma base sólida cria uma tensão palpável que mantém todos os jogadores em estado de alerta máximo durante toda a sessão. O jogo consegue misturar de forma magistral os elementos de observação atenta, estratégia de manipulação e interação social orgânica. Não se trata apenas de descobrir quem está mentindo, mas sim de entender as motivações por trás de cada comportamento.

### Narrativas Inéditas
Um dos aspectos mais fascinantes é que nenhuma partida jamais será igual à outra, justamente porque o fator humano é a variável que altera completamente o curso dos acontecimentos. O mesmo grupo de pessoas pode se reunir para jogar diversas vezes consecutivas e, ainda assim, cada rodada será capaz de gerar histórias inéditas, repletas de reviravoltas dramáticas e momentos de pura surpresa coletiva.`,
        author: 'Capitão Miller',
        role: 'Estrategista Social',
        date: '04 Fev 2026',
        category: 'Comunidade',
      },
      post2: {
        title: 'TikJogos: Partidas mais organizadas e estratégicas',
        excerpt: 'Descubra como o TikJogos elimina a burocracia dos papéis e foca na pura diversão e dedução social.',
        content: `Qualquer pessoa que já tenha tentado organizar uma partida do Jogo do Impostor de maneira estritamente tradicional sabe o quão frustrante a desorganização logística pode ser. O uso de papéis picados e canetas que falham acabam quebrando o ritmo necessário para manter a imersão psicológica.

Neste contexto, o TikJogos surge como uma solução definitiva, funcionando como um verdadeiro juiz digital que centraliza todas as informações vitais da partida. A plataforma assume a responsabilidade de gerenciar o tempo, realizar os sorteios de forma automatizada e distribuir as funções secretas sem margem para erro humano.

### Pilares da Experiência
- **Sorteio Imparcial**: Garante que a escolha das funções seja aleatória e justa.
- **Sigilo Absoluto**: Evita que olhares acidentais revelem a identidade do impostor.
- **Cronômetro Automático**: Mantém a pressão e o dinamismo da rodada.

A facilidade de iniciar uma nova rodada com apenas alguns cliques permite que os grupos joguem muito mais partidas em um curto espaço de tempo, aproveitando melhor os momentos de lazer. O foco sai da logística e volta para as pessoas.`,
        author: 'Equipe Tech',
        role: 'Desenvolvedores',
        date: '03 Fev 2026',
        category: 'Atualização',
      },
      post3: {
        title: 'Estratégias essenciais para quem joga como impostor',
        excerpt: 'Assumir o papel de vilão exige coerência narrativa e controle emocional. Aprenda a dominar a arte da camuflagem.',
        content: `Assumir o papel de impostor exige muito mais do que apenas a capacidade de inventar mentiras. O verdadeiro desafio reside na manutenção de uma coerência narrativa impecável durante todo o desenrolar da partida, enquanto se controla o próprio comportamento não-verbal.

### Dicas de Mestre
1. **Mantenha seu Padrão**: Não mude drasticamente sua personalidade ao receber a função de vilão. Se você costuma ser calado, continue calado.
2. **Escuta Ativa**: Ouça os outros participantes antes de se posicionar. Muitas vezes, inocentes criam teorias erradas que você pode usar a seu favor.
3. **Plante Sementes de Dúvida**: Em vez de atacar frontalmente, faça perguntas sutis que levem os outros a questionarem a validade das informações apresentadas.

A vitória depende da capacidade de plantar incertezas sem parecer o autor direto delas. Quando você domina a arte de se tornar parte da paisagem, a descoberta da sua identidade torna-se uma tarefa quase impossível.`,
        author: 'O Infiltrado',
        role: 'Estrategista',
        date: '02 Fev 2026',
        category: 'Dicas',
      },
      post4: {
        title: 'Como identificar o impostor usando lógica e paciência',
        excerpt: 'Encontrar o impostor não é sorte, mas um processo rigoroso de análise comportamental e lógica.',
        content: `Encontrar o impostor em meio a um grupo de amigos não é uma questão de sorte ou intuição mística, mas sim um processo rigoroso de análise lógica e paciência estratégica.

### Sinais de Alerta
- **Pressão do Tempo**: O impostor frequentemente tenta acelerar as decisões do coletivo para evitar que contradições venham à tona.
- **Contradições Verbais**: Mentiras complexas exigem um esforço cognitivo maior, o que gera rachaduras na narrativa quando questionadas.
- **Mudança de Discurso**: Observe se o suspeito muda ligeiramente sua versão dos fatos conforme o cerco se fecha.

A primeira regra para uma detecção eficiente é observar o fluxo das informações e identificar onde as histórias começam a se fragmentar. A paciência permite que você colete dados suficientes para construir um caso sólido.`,
        author: 'Detetive Orion',
        role: 'Analista de Dados',
        date: '01 Fev 2026',
        category: 'Dicas',
      },
      post5: {
        title: 'Por que a comunicação define o vencedor da partida',
        excerpt: 'Saber falar com clareza e ouvir com atenção são as competências decisivas que separam vencedores de perdedores.',
        content: `Diferente do que muitos acreditam, o Jogo do Impostor não premia necessariamente aquele que possui a maior habilidade de mentir friamente, mas sim quem domina a arte da comunicação interpessoal.

### O Poder da Escuta Ativa
A prática da escuta ativa é um diferencial competitivo que permite perceber incoerências, mudanças de tom de voz e hesitações micro-comportamentais. Quando você se comunica focando no outro, torna-se capaz de captar nuances que passariam despercebidas.

### Organização do Debate
Uma comunicação fragmentada ou caótica favorece o impostor, que utiliza o ruído para se esconder. Ao estabelecer um método organizado de troca de informações, o espaço para mentiras diminui drasticamente. A vitória pertence àqueles que orquestram a narrativa coletiva.`,
        author: 'Luna Star',
        role: 'Gerente de Comunidade',
        date: '31 Jan 2026',
        category: 'Notícias',
      },
      post6: {
        title: 'O segredo psicológico por trás do sucesso do gênero',
        excerpt: 'Entenda o conceito do "círculo mágico" e como ele nos permite explorar facetas da nossa personalidade de forma segura.',
        content: `Os jogos de dedução social operam em um campo psicológico fascinante onde as normas sociais são suspensas para dar lugar ao lúdico. Eles criam o "círculo mágico", um espaço seguro onde mentir e manipular são incentivados pela mecânica da diversão.

### Catarse Social
Essa permissão especial libera emoções que costumamos reprimir, proporcionando uma forma única de catarse. O esforço mental para sustentar uma mentira enquanto se é observado estimula áreas profundas do cérebro, gerando uma experiência intensa e envolvente.

### O Prazer da Descoberta
Sentir que você foi capaz de ver através da máscara de um amigo ou que conseguiu enganar a todos com uma atuação brilhante gera um senso de realização pessoal muito forte. É essa profundidade humana que garante o sucesso do gênero.`,
        author: 'Dr. Nexus',
        role: 'Psicólogo Gamificado',
        date: '30 Jan 2026',
        category: 'Comunidade',
      },
      post7: {
        title: 'Desenvolvimento Cognitivo: Exercitando a mente no espaço',
        excerpt: 'Participar ativamente de rodadas do Jogo do Impostor é um exercício excelente para a tomada de decisões rápidas e análise crítica.',
        content: `O jogador nunca está em uma posição passiva; ele precisa avaliar cada informação recebida, compará-la com fatos anteriores e decidir se deve confiar. Esse processo de filtragem de dados é a base do método científico aplicado à vida cotidiana.

### Benefícios Mentais
- **Atenção Plena**: Observar detalhes sutis como mudanças na velocidade da fala.
- **Memória de Curto Prazo**: Lembrar com precisão quem disse o quê e em qual momento.
- **Argumentação e Retórica**: Estruturar o pensamento de forma lógica para convencer os outros.

O Jogo do Impostor transforma o lazer em uma academia para o cérebro, refinando processos mentais que utilizamos para resolver problemas complexos todos os dias.`,
        author: 'Profe Galática',
        role: 'Educação Lúdica',
        date: '29 Jan 2026',
        category: 'Notícias',
      },
      post8: {
        title: 'Erros comuns de iniciantes e como evitá-los',
        excerpt: 'Não caia em armadilhas comportamentais! Saiba por que falar demais pode ser o seu fim no jogo.',
        content: `Muitos jogadores novatos acabam caindo em armadilhas que revelam sua identidade ou os tornam alvos fáceis. Um dos erros mais clássicos é acreditar que falar sem parar prova a sua inocência.

### O que NÃO fazer
1. **Falar Excessivamente**: O excesso de explicações gera suspeita imediata e fornece material para contradições.
2. **Acusações Precipitadas**: Apontar o dedo muito cedo sem evidências sólidas pode eliminar um aliado ou atrair atenção indesejada para você.
3. **Falta de Paciência**: Mudar de opinião assim que alguém discorda demonstra insegurança que os impostores adoram explorar.

O jogo é uma maratona psicológica, não um sprint. Desenvolver uma visão periférica e manter um registro mental das falas alheias são passos fundamentais para evoluir.`,
        author: 'Comandante Nova',
        role: 'Instrutora de Voo',
        date: '28 Jan 2026',
        category: 'Dicas',
      },
      post9: {
        title: 'Jogo do Impostor: Guia de Estratégias e Análise do Metagame no TikJogos',
        excerpt: 'Domine o jogo do impostor com táticas de especialista, análise comportamental e lógica sistêmica. Guia técnico completo.',
        content: `O **jogo do impostor** tornou-se o epicentro da dedução social moderna. No TikJogos, a experiência do **jogo do impostor** é otimizada para oferecer o máximo de competitividade e profundidade estratégica. Se você busca entender as nuances de como ganhar no **jogo do impostor**, este guia técnico foi estruturado com foco na análise comportamental e lógica sistêmica.

### A Psicologia por trás do Jogo do Impostor
O sucesso no **jogo do impostor** não é aleatório. Ele reside na gestão eficiente da assimetria de informação. Enquanto a Tripulação utiliza dados concretos para identificar padrões, quem assume o papel no **jogo do impostor** deve dominar a arte do mimetismo semântico. A sobrevivência no **jogo do impostor** exige que você neutralize contradições em tempo real.

### Tutorial Exclusivo: O Metagame do Jogo do Impostor
Para jogadores que buscam excelência no **jogo do impostor online**, a instrução visual é indispensável. O tutorial abaixo detalha as fases críticas de uma partida no TikJogos, desde a recepção da palavra secreta até a resolução definitiva na votação.

{{youtube:TInLJ2F_G58}}

### Táticas de Especialista para o Jogo do Impostor
Para elevar sua taxa de vitória no **jogo do impostor**, aplique os seguintes protocolos:

1. **Protocolo de Verificação (Tripulação)**: No **jogo do impostor**, as perguntas devem ser elaboradas para expor lacunas de conhecimento. Utilize termos vagos que apenas quem conhece o segredo pode decodificar.
2. **Protocolo de Infiltração (Impostor)**: O segredo para vencer o **jogo do impostor** como traidor é a antecipação. Identifique os líderes de opinião e replique seus padrões de linguagem.
3. **Análise de Variáveis (Sistêmica)**: Cada modo do **jogo do impostor** no TikJogos (como 'Palavra Secreta' ou 'Locais & Funções') exige uma abordagem lógica distinta.

### TikJogos: A Referência Técnica no Jogo do Impostor
Nossa plataforma foi desenvolvida para ser a casa definitiva do **jogo do impostor**. Através de sorteios imparciais e uma interface que favorece a imersão, o **jogo do impostor** no TikJogos permite que a habilidade pura de dedução seja o único fator determinante para o resultado.

Ao dominar o **jogo do impostor**, você desenvolve competências valiosas de comunicação, análise crítica e inteligência emocional. Prepare sua tripulação, inicie a missão e descubra por que somos a autoridade máxima quando o assunto é o **jogo do impostor**.`,
        author: 'Estrategista Chefe',
        role: 'Analista de Metagame',
        date: '06 Fev 2026',
        category: 'Dicas',
      },
    },

    // Página Como Jogar - conteúdo completo
    comoJogar: {
      crewManual: 'MANUAL DO TRIPULANTE',
      heroDesc: 'Um jogo de dedução social online para jogar com amigos! Descubra quem é o impostor através de dicas, perguntas e muita estratégia.',
      quickStart: 'Início Rápido',
      step1Title: 'Crie uma Sala',
      step1Desc: 'Digite seu nickname e clique em "Criar Sala"',
      step2Title: 'Convide Amigos',
      step2Desc: 'Compartilhe o código da sala com 3 ou mais jogadores',
      step3Title: 'Escolha o Modo',
      step3Desc: 'O host seleciona a modalidade e inicia o jogo',
      basicRules: 'Regras Básicas',
      crewmates: 'TRIPULANTES',
      crewmatesDesc: 'Recebem informações secretas e devem descobrir quem é o impostor através de votação.',
      impostorLabel: 'IMPOSTOR',
      impostorDesc: 'Não recebe a informação secreta e deve fingir que a conhece para não ser descoberto.',
      voting: 'VOTAÇÃO',
      votingDesc: 'Após a discussão, todos votam em quem acham que é o impostor. O mais votado é eliminado!',
      unionQuote: 'A união faz a força... ou a traição perfeita.',
      playerCount: 'Um jogo para 3 a 15 jogadores em tempo real.',
      gameModalities: 'Modalidades de Jogo',
      gameModalitiesDesc: 'Cada missão tem seus próprios perigos e estratégias.',
      howToPlayLabel: 'Como Jogar',
      galacticTips: 'Dicas Galácticas',
      readyToPlay: 'Pronto para Jogar?',
      readyToPlayDesc: 'Reúna seus amigos e descubra quem é o impostor!',
      playNow: 'JOGAR AGORA',
      // Palavra Secreta
      palavraSecretaTitle: 'Palavra Secreta',
      palavraSecretaDesc: 'O modo clássico do jogo! Todos os tripulantes recebem a mesma palavra secreta, exceto o impostor que não sabe qual é.',
      palavraSecretaStep1: 'Todos os jogadores recebem uma palavra, exceto o impostor',
      palavraSecretaStep2: 'Os tripulantes devem dar dicas sobre a palavra sem revelá-la diretamente',
      palavraSecretaStep3: 'O impostor deve fingir que conhece a palavra e tentar descobrir qual é',
      palavraSecretaStep4: 'Após as rodadas de dicas, todos votam em quem acham que é o impostor',
      palavraSecretaTip1: 'Tripulantes: dêem dicas sutis, não muito óbvias',
      palavraSecretaTip2: 'Impostor: preste atenção nas dicas dos outros para descobrir a palavra',
      palavraSecretaTip3: 'Cuidado com dicas muito específicas que podem entregar a palavra ao impostor',
      // Locais & Funções
      locaisFuncoesTitle: 'Locais & Funções',
      locaisFuncoesDesc: 'Cada jogador recebe um local e uma função específica. O impostor não sabe o local, mas precisa fingir que sabe!',
      locaisFuncoesStep1: 'Tripulantes recebem um local (ex: Hospital) e uma função (ex: Médico)',
      locaisFuncoesStep2: 'O impostor não sabe qual é o local',
      locaisFuncoesStep3: 'Os jogadores fazem perguntas uns aos outros sobre o local',
      locaisFuncoesStep4: 'O impostor deve tentar descobrir o local pelas respostas dos outros',
      locaisFuncoesTip1: 'Faça perguntas que só quem conhece o local saberia responder',
      locaisFuncoesTip2: 'Impostor: evite dar respostas muito genéricas ou muito específicas',
      locaisFuncoesTip3: 'Observe quem parece confuso com as perguntas',
      // Duas Facções
      duasFaccoesTitle: 'Duas Facções',
      duasFaccoesDesc: 'Os jogadores são divididos em dois times, cada um com uma palavra diferente. O impostor não pertence a nenhum time!',
      duasFaccoesStep1: 'Metade dos jogadores recebe a Palavra A, outra metade a Palavra B',
      duasFaccoesStep2: 'O impostor não sabe nenhuma das duas palavras',
      duasFaccoesStep3: 'Cada time tenta identificar quem são seus aliados',
      duasFaccoesStep4: 'O impostor tenta se infiltrar em um dos times',
      duasFaccoesTip1: 'Tente descobrir quem tem a mesma palavra que você',
      duasFaccoesTip2: 'Cuidado para não revelar sua palavra ao time adversário',
      duasFaccoesTip3: 'O impostor pode tentar criar confusão entre os times',
      // Categoria + Item
      categoriaItemTitle: 'Categoria + Item',
      categoriaItemDesc: 'Todos sabem a categoria, mas só os tripulantes conhecem o item específico. O impostor sabe a categoria mas não o item!',
      categoriaItemStep1: 'Uma categoria é revelada para todos (ex: Frutas)',
      categoriaItemStep2: 'Tripulantes recebem um item específico da categoria (ex: Maçã)',
      categoriaItemStep3: 'O impostor sabe a categoria mas não o item',
      categoriaItemStep4: 'Os jogadores devem dar dicas sobre o item sem revelá-lo',
      categoriaItemTip1: 'Use características específicas do item para suas dicas',
      categoriaItemTip2: 'Impostor: tente dar dicas genéricas que se apliquem a vários itens da categoria',
      categoriaItemTip3: 'Atenção aos jogadores que parecem adivinhar demais',
      // Perguntas Diferentes
      perguntasDiferentesTitle: 'Perguntas Diferentes',
      perguntasDiferentesDesc: 'Tripulantes e impostor recebem perguntas diferentes sobre o mesmo tema. As respostas revelarão quem é o impostor!',
      perguntasDiferentesStep1: "Tripulantes recebem uma pergunta (ex: 'Qual seu animal favorito?')",
      perguntasDiferentesStep2: 'O impostor recebe uma pergunta diferente sobre tema similar',
      perguntasDiferentesStep3: 'Cada jogador responde sua pergunta em voz alta',
      perguntasDiferentesStep4: 'As respostas que não fazem sentido revelam o impostor',
      perguntasDiferentesTip1: 'Preste atenção se as respostas fazem sentido com o tema',
      perguntasDiferentesTip2: 'Impostor: tente dar respostas que se encaixem em várias perguntas possíveis',
      perguntasDiferentesTip3: 'Compare as respostas entre os jogadores',
    },

    // Página Modos de Jogo - conteúdo completo
    gameModesPage: {
      prepareCrew: 'PREPARE SUA TRIPULAÇÃO',
      title: 'Modos de',
      titleHighlight: 'Jogo',
      description: 'Escolha sua missão. Cada modo oferece uma dinâmica única de dedução e estratégia.',
      select: 'Selecionar',
      easy: 'Fácil',
      medium: 'Médio',
      hard: 'Difícil',
      readyForSabotage: 'PRONTO PARA A SABOTAGEM?',
      readyDesc: 'A nave está prestes a decolar. Reúna seus amigos e descubra quem é o impostor agora mesmo!',
      launchShip: 'LANÇAR NAVE',
      palavraSecreta: 'Palavra Secreta',
      palavraSecretaDesc: 'Uma palavra para todos. O Impostor tenta adivinhar!',
      locaisFuncoes: 'Locais & Funções',
      locaisFuncoesDesc: 'Cada um recebe um Local e uma Função. O Impostor não sabe o local.',
      categoriaItem: 'Categoria + Item',
      categoriaItemDesc: 'Todos sabem a categoria e o item. O Impostor só sabe a categoria.',
      duasFaccoes: 'Duas Facções',
      duasFaccoesDesc: 'Dois times com palavras diferentes. O Impostor não sabe nenhuma.',
      perguntasDiferentes: 'Perguntas Diferentes',
      perguntasDiferentesDesc: 'Tripulantes e Impostor recebem perguntas parecidas, mas diferentes.',
    },

    // Página Blog - conteúdo extra
    blogPage: {
      weekHighlight: 'DESTAQUE DA SEMANA',
      moreTransmissions: 'MAIS TRANSMISSÕES',
      moreTransmissionsDesc: 'Fique por dentro das últimas comunicações da nave',
      footerDesc: 'A experiência definitiva de dedução social no espaço. Junte-se a milhares de tripulantes e descubra quem é o traidor.',
      copyright: '© 2026 TikJogos Entertainment. Todos os direitos reservados.',
      disclaimer: 'O TikJogos é um projeto independente de fãs. Todas as marcas registradas (como nomes de personagens e franquias) pertencem aos seus respectivos proprietários e são usadas aqui apenas para fins de referência em contexto de jogo de palavras/trivia.',
      madeWith: 'Feito com 💜 na Galáxia TikJogos',
    },

    // Página BlogPost - conteúdo extra
    blogPostPage: {
      articleNotFound: 'Artigo não encontrado',
      articleNotFoundDesc: 'O conteúdo que você está procurando não existe ou foi movido.',
      backToBlog: 'Voltar ao Blog',
      comments: 'Comentários',
      aboutAuthor: 'SOBRE O AUTOR',
      viewProfile: 'Ver Perfil',
      moreArticles: 'Mais Artigos',
    },

    // Página Outros Jogos
    otherGamesPage: {
      title: 'Outros Jogos',
      description: 'Escolha um jogo para se divertir!',
      back: 'Voltar',
      termoDesc: 'Adivinhe a palavra do dia em 6 tentativas',
      comingSoon: 'Em breve mais jogos!',
    },

    // Termos e Privacidade
    legal: {
      privacy: 'Política de Privacidade',
      terms: 'Termos de Uso',
      copyright: '© 2026 TikJogos. Todos os direitos reservados.',
      lastUpdated: 'Última atualização',
    },

    // Erros
    errors: {
      notFound: 'Página não encontrada',
      notFoundDesc: 'Desculpe, a página que você está procurando não existe.',
      backHome: 'Voltar à Tela Inicial',
      serverError: 'Erro no servidor',
      tryAgain: 'Tentar Novamente',
      loading: 'Carregando...',
    },

    // Botões Comuns
    buttons: {
      send: 'Enviar',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      back: 'Voltar',
      next: 'Próximo',
      submit: 'Enviar',
      save: 'Salvar',
      delete: 'Deletar',
      edit: 'Editar',
      copy: 'Copiar',
      share: 'Compartilhar',
      play: 'Jogar',
      start: 'Começar',
      exit: 'Sair',
    },

    // Validações
    validation: {
      required: 'Este campo é obrigatório',
      minLength: 'Mínimo de {min} caracteres',
      maxLength: 'Máximo de {max} caracteres',
      invalidEmail: 'Email inválido',
      invalidNumber: 'Número inválido',
      passwordMismatch: 'As senhas não correspondem',
    },

    // Modal e Alertas
    alerts: {
      success: 'Sucesso',
      error: 'Erro',
      warning: 'Atenção',
      info: 'Informação',
      confirm: 'Você tem certeza?',
    },
  },

  en: {
    // Navigation and Menu
    nav: {
      home: 'Home',
      blog: 'Blog',
      howToPlay: 'How to Play',
      themes: 'Themes',
      createTheme: 'Create Theme',
      donate: 'Donate',
      privacy: 'Privacy',
      terms: 'Terms of Use',
      otherGames: 'Other Games',
      navigation: 'Navigation',
      support: 'Support',
      faq: 'FAQ',
      reportBug: 'Report Bug',
      contact: 'Contact',
      officialDiscord: 'Official Discord',
      followUs: 'Follow Us',
      language: 'Language',
    },

    // Home Page (ImpostorGame)
    home: {
      title: 'TikJogos',
      subtitle: 'The Impostor Game Reimagined',
      description: 'Suspicion, strategy, and fun in one place. Play with friends and discover who the impostor is.',
      createRoom: 'Create Room',
      joinRoom: 'Join Room',
      playLocal: 'Local Mode',
      createTheme: 'Create Theme',
      nickname: 'Enter your nickname',
      roomCode: 'Room code',
      saveNickname: 'Remember my nickname',
      enterCode: 'Enter',
    },

    // Game Modes
    gameModes: {
      title: 'Game Modes',
      description: 'Choose your favorite mode and start playing',
      classic: {
        name: 'Classic Mode',
        description: 'The traditional game with discussions and voting',
      },
      rapid: {
        name: 'Rapid Mode',
        description: 'Quick matches with fewer rounds',
      },
      hardcore: {
        name: 'Hardcore Mode',
        description: 'Maximum challenge with stricter rules',
      },
      custom: {
        name: 'Custom Mode',
        description: 'Create your own rules',
      },
    },

    // How to Play
    howToPlay: {
      title: 'How to Play',
      objective: 'Game Objective',
      objectiveDesc: 'Find the impostor(s) before they sabotage the group.',
      roles: 'Roles',
      crewmate: 'Crewmate - Complete tasks',
      impostor: 'Impostor - Sabotage and eliminate',
      gameplay: 'Gameplay',
      gameplayDesc: 'Discussion, voting, and elimination of suspects.',
      tips: 'Tips',
      tipObserve: 'Observe the behavior of others',
      tipCommunicate: 'Communicate with your team',
      tipVote: 'Vote with confidence but be careful',
    },

    // Create Theme
    createTheme: {
      title: 'Create Theme',
      description: 'Create your own custom theme for the game',
      themeTitle: 'Theme Title',
      authorName: 'Author Name',
      words: 'Words (minimum 7)',
      addWord: 'Add Word',
      isPublic: 'Make Public',
      isPrivate: 'Private',
      price: '$3.00',
      acceptTerms: 'I accept the terms and conditions',
      create: 'Create Theme',
      paymentPending: 'Awaiting Payment',
      scanQr: 'Scan the QR Code',
      copying: 'Copy PIX',
      copied: 'Copied!',
      success: 'Theme created successfully!',
      successCode: 'Access Code',
      error: 'Error creating theme',
      minWords: 'Minimum 7 words required',
      maxWords: 'Maximum 25 words',
    },

    // Donations
    donate: {
      title: 'Support the Project',
      description: 'Your contribution helps keep TikJogos running and constantly evolving.',
      thanks: 'Thank you for supporting!',
      donorName: 'Your Name',
      message: 'Message (optional)',
      amount: 'Amount ($)',
      presets: ['$5', '$10', '$20', '$50'],
      customAmount: 'Custom Amount',
      donate: 'Make a Donation',
      paymentPending: 'Awaiting Confirmation',
      scanQr: 'Scan the QR Code with your Bank app',
      minAmount: 'Minimum amount is $1.00',
      maxAmount: 'Maximum amount is $1,000.00',
      success: 'Donation received successfully!',
      error: 'Error processing donation',
      backToHome: 'Back to Home',
      heroTitle: 'SUPPORT TIKJOGOS',
      heroDesc: 'Help keep the game online and free!',
      whyDonate: 'WHY DONATE?',
      whyDonateDesc: 'Servers • New modes • Improvements • 100% free game',
      chooseAmount: 'CHOOSE AMOUNT:',
      other: 'Other',
      nicknamePlaceholder: 'Your nickname',
      enterName: 'Enter your name',
      donateViaPix: 'DONATE VIA PIX',
      scanOrCopy: 'Scan the QR Code or copy the PIX code',
      copyPixCode: 'COPY PIX CODE',
      awaitingPayment: 'Awaiting payment...',
      copied: 'Copied!',
      copiedDesc: 'PIX code copied to clipboard.',
      thankYou: 'THANK YOU',
      thankYouDesc: 'Your contribution helps keep TikJogos online and free for everyone.',
      donateAgain: 'Donate again',
      goPlay: 'Go play',
    },

    // Blog
    blog: {
      title: 'Impostor Blog',
      subtitle: 'Command Center',
      description: 'Galactic news, sabotage strategies, and updates directly from the TikJogos command center.',
      readMore: 'Read More',
      readTime: 'min read',
      published: 'Published on',
      author: 'By',
      category: 'Category',
      noComments: 'No comments yet',
    },

    // Blog Posts
    blogPosts: {
      post1: {
        title: 'The Soul of Social Games: Why does distrust fascinate us?',
        excerpt: 'The Impostor Game has established itself as a true cultural phenomenon by turning distrust into a profound experience.',
        content: `The Impostor Game has established itself as a true cultural phenomenon among gamers and various groups of friends by managing to transform an extremely simple premise into a profound and very intense psychological experience. Unlike most traditional games, where the main objective is to compete against fixed mathematical rules or fast reflexes, here participants are placed to face directly the minds and intuitions of each other.

This paradigm shift removes the focus from the physical board or digital interface and transports it to the field of pure human interactions, where each word spoken has fundamental strategic weight for the success or failure of the group. The great driving force that sustains the entire dynamics of this modality is based on constant distrust and behavioral reading.

### The Human Factor as a Variable
Each slightly vague response, each unexpected pause when speaking, and each accusation thrown without solid grounds creates a palpable tension that keeps all players in a state of maximum alert throughout the entire session. The game manages to masterfully mix the elements of careful observation, manipulation strategy, and organic social interaction. It is not just about discovering who is lying, but about understanding the motivations behind each behavior.

### Unprecedented Narratives
One of the most fascinating aspects is that no match will ever be the same as another, precisely because the human factor is the variable that completely alters the course of events. The same group of people can gather to play several times in a row and, yet, each round will be able to generate unprecedented stories, full of dramatic twists and moments of pure collective surprise.`,
        author: 'Captain Miller',
        role: 'Social Strategist',
        date: 'Feb 04, 2026',
        category: 'Community',
      },
      post2: {
        title: 'TikJogos: More organized and strategic matches',
        excerpt: 'Discover how TikJogos eliminates the bureaucracy of papers and focuses on pure fun and social deduction.',
        content: `Anyone who has tried to organize a match of the Impostor Game in a strictly traditional way knows how frustrating logistical disorganization can be. The use of torn papers and failing pens end up breaking the rhythm needed to maintain psychological immersion.

In this context, TikJogos emerges as a definitive solution, functioning as a true digital referee that centralizes all vital information of the match. The platform takes responsibility for managing time, conducting draws automatically, and distributing secret functions without room for human error.

### Pillars of Experience
- **Impartial Lottery**: Guarantees that the choice of roles is random and fair.
- **Absolute Secrecy**: Prevents accidental glances from revealing the impostor's identity.
- **Automatic Timer**: Maintains the pressure and dynamism of the round.

The ease of starting a new round with just a few clicks allows groups to play many more matches in a short period of time, making better use of leisure moments. The focus shifts from logistics back to people.`,
        author: 'Tech Team',
        role: 'Developers',
        date: 'Feb 03, 2026',
        category: 'Update',
      },
      post3: {
        title: 'Essential strategies for those who play as impostor',
        excerpt: 'Taking on the role of villain requires narrative coherence and emotional control. Learn to master the art of camouflage.',
        content: `Taking on the role of impostor requires much more than just the ability to invent lies. The true challenge lies in maintaining impeccable narrative coherence throughout the course of the match, while controlling your own non-verbal behavior.

### Master Tips
1. **Maintain Your Pattern**: Do not drastically change your personality when you receive the villain function. If you tend to be quiet, stay quiet.
2. **Active Listening**: Listen to other participants before taking a position. Often, innocents create wrong theories that you can use to your advantage.
3. **Plant Seeds of Doubt**: Instead of attacking frontally, ask subtle questions that lead others to question the validity of the information presented.

Victory depends on the ability to plant uncertainties without seeming to be their direct author. When you master the art of becoming part of the landscape, discovering your identity becomes an almost impossible task.`,
        author: 'The Infiltrator',
        role: 'Strategist',
        date: 'Feb 02, 2026',
        category: 'Tips',
      },
      post4: {
        title: 'How to identify the impostor using logic and patience',
        excerpt: 'Finding the impostor is not luck, but a rigorous process of behavioral analysis and logic.',
        content: `Finding the impostor among a group of friends is not a matter of luck or mystical intuition, but rather a rigorous process of logical analysis and strategic patience.

### Warning Signs
- **Time Pressure**: The impostor frequently tries to accelerate collective decisions to prevent contradictions from coming to light.
- **Verbal Contradictions**: Complex lies require greater cognitive effort, which creates cracks in the narrative when questioned.
- **Change of Discourse**: Observe if the suspect slightly changes their version of the facts as the net closes.

The first rule for efficient detection is to observe the flow of information and identify where stories begin to fragment. Patience allows you to collect sufficient data to build a solid case.`,
        author: 'Detective Orion',
        role: 'Data Analyst',
        date: 'Feb 01, 2026',
        category: 'Tips',
      },
      post5: {
        title: 'Why communication defines the winner of the match',
        excerpt: 'Knowing how to speak clearly and listen carefully are the decisive skills that separate winners from losers.',
        content: `Contrary to what many believe, the Impostor Game does not necessarily reward those who have the greatest ability to lie coldly, but rather those who master the art of interpersonal communication.

### The Power of Active Listening
The practice of active listening is a competitive advantage that allows you to perceive inconsistencies, changes in tone of voice, and micro-behavioral hesitations. When you communicate by focusing on the other person, you become able to capture nuances that would go unnoticed.

### Organization of Debate
Fragmented or chaotic communication favors the impostor, who uses noise to hide. By establishing an organized method of exchanging information, the space for lies decreases drastically. Victory belongs to those who orchestrate the collective narrative.`,
        author: 'Luna Star',
        role: 'Community Manager',
        date: 'Jan 31, 2026',
        category: 'News',
      },
      post6: {
        title: 'The psychological secret behind the genre\'s success',
        excerpt: 'Understand the concept of the "magic circle" and how it allows us to explore facets of our personality safely.',
        content: `Social deduction games operate in a fascinating psychological field where social norms are suspended to give way to play. They create the "magic circle", a safe space where lying and manipulation are encouraged by the mechanics of fun.

### Social Catharsis
This special permission releases emotions that we usually repress, providing a unique form of catharsis. The mental effort to sustain a lie while being watched stimulates deep areas of the brain, generating an intense and engaging experience.

### The Pleasure of Discovery
Feeling that you were able to see through a friend's mask or that you managed to fool everyone with a brilliant performance generates a very strong sense of personal accomplishment. It is this human depth that guarantees the success of the genre.`,
        author: 'Dr. Nexus',
        role: 'Gamified Psychologist',
        date: 'Jan 30, 2026',
        category: 'Community',
      },
      post7: {
        title: 'Cognitive Development: Exercising the mind in space',
        excerpt: 'Actively participating in rounds of the Impostor Game is an excellent exercise for quick decision-making and critical analysis.',
        content: `The player is never in a passive position; he needs to evaluate each piece of information received, compare it with previous facts, and decide whether to trust. This data filtering process is the basis of the scientific method applied to everyday life.

### Mental Benefits
- **Mindfulness**: Observing subtle details like changes in speech speed.
- **Short-term Memory**: Remember precisely who said what and at what moment.
- **Argumentation and Rhetoric**: Structure your thinking logically to convince others.

The Impostor Game transforms leisure into an academy for the brain, refining mental processes we use to solve complex problems every day.`,
        author: 'Prof. Galactic',
        role: 'Playful Education',
        date: 'Jan 29, 2026',
        category: 'News',
      },
      post8: {
        title: 'Common beginner mistakes and how to avoid them',
        excerpt: 'Don\'t fall into behavioral traps! Learn why talking too much can be your end in the game.',
        content: `Many novice players end up falling into traps that reveal their identity or make them easy targets. One of the most classic mistakes is believing that talking non-stop proves your innocence.

### What NOT to do
1. **Excessive Talking**: Excessive explanations generate immediate suspicion and provide material for contradictions.
2. **Hasty Accusations**: Pointing the finger too early without solid evidence can eliminate an ally or attract unwanted attention to you.
3. **Lack of Patience**: Changing your mind as soon as someone disagrees shows insecurity that impostors love to exploit.

The game is a psychological marathon, not a sprint. Developing peripheral vision and maintaining a mental record of others' speech are fundamental steps to evolve.`,
        author: 'Commander Nova',
        role: 'Flight Instructor',
        date: 'Jan 28, 2026',
        category: 'Tips',
      },
      post9: {
        title: 'Impostor Game: Strategy Guide and Metagame Analysis on TikJogos',
        excerpt: 'Master the impostor game with expert tactics, behavioral analysis, and systemic logic. Complete technical guide.',
        content: `The **impostor game** has become the epicenter of modern social deduction. On TikJogos, the **impostor game** experience is optimized to deliver maximum competitiveness and strategic depth. If you're looking to understand the nuances of how to win the **impostor game**, this technical guide is structured with a focus on behavioral analysis and systemic logic.

### The Psychology Behind the Impostor Game
Success in the **impostor game** is not random. It lies in the efficient management of information asymmetry. While the Crew uses concrete data to identify patterns, whoever assumes the role in the **impostor game** must master the art of semantic mimicry. Survival in the **impostor game** requires neutralizing contradictions in real time.

### Exclusive Tutorial: The Impostor Game Metagame
For players seeking excellence in the **online impostor game**, visual instruction is indispensable. The tutorial below details the critical phases of a match on TikJogos, from receiving the secret word to the final resolution during the vote.

{{youtube:TInLJ2F_G58}}

### Expert Tactics for the Impostor Game
To raise your win rate in the **impostor game**, apply the following protocols:

1. **Verification Protocol (Crew)**: In the **impostor game**, questions should be designed to expose knowledge gaps. Use vague terms that only someone who knows the secret can decode.
2. **Infiltration Protocol (Impostor)**: The key to winning the **impostor game** as the traitor is anticipation. Identify opinion leaders and replicate their language patterns.
3. **Variable Analysis (Systemic)**: Each mode of the **impostor game** on TikJogos (such as "Secret Word" or "Locations & Roles") requires a distinct logical approach.

### TikJogos: The Technical Reference for the Impostor Game
Our platform was developed to be the definitive home of the **impostor game**. Through unbiased draws and an interface that enhances immersion, the **impostor game** on TikJogos ensures that pure deductive skill is the only determining factor in the outcome.

By mastering the **impostor game**, you develop valuable skills in communication, critical analysis, and emotional intelligence. Prepare your crew, start the mission, and discover why we are the ultimate authority when it comes to the **impostor game**.`,
        author: 'Chief Strategist',
        role: 'Metagame Analyst',
        date: 'Feb 06, 2026',
        category: 'Tips',
      },
    },

    // How to Play Page - full content
    comoJogar: {
      crewManual: 'CREW MANUAL',
      heroDesc: 'An online social deduction game to play with friends! Find out who the impostor is through clues, questions, and strategy.',
      quickStart: 'Quick Start',
      step1Title: 'Create a Room',
      step1Desc: 'Enter your nickname and click "Create Room"',
      step2Title: 'Invite Friends',
      step2Desc: 'Share the room code with 3 or more players',
      step3Title: 'Choose the Mode',
      step3Desc: 'The host selects the game mode and starts the game',
      basicRules: 'Basic Rules',
      crewmates: 'CREWMATES',
      crewmatesDesc: 'Receive secret information and must discover who the impostor is through voting.',
      impostorLabel: 'IMPOSTOR',
      impostorDesc: 'Does not receive the secret information and must pretend to know it to avoid being discovered.',
      voting: 'VOTING',
      votingDesc: 'After the discussion, everyone votes on who they think is the impostor. The most voted is eliminated!',
      unionQuote: 'Unity makes strength... or the perfect betrayal.',
      playerCount: 'A game for 3 to 15 players in real time.',
      gameModalities: 'Game Modes',
      gameModalitiesDesc: 'Each mission has its own dangers and strategies.',
      howToPlayLabel: 'How to Play',
      galacticTips: 'Galactic Tips',
      readyToPlay: 'Ready to Play?',
      readyToPlayDesc: 'Gather your friends and find out who the impostor is!',
      playNow: 'PLAY NOW',
      palavraSecretaTitle: 'Secret Word',
      palavraSecretaDesc: 'The classic game mode! All crewmates receive the same secret word, except the impostor who doesn\'t know it.',
      palavraSecretaStep1: 'All players receive a word, except the impostor',
      palavraSecretaStep2: 'Crewmates must give clues about the word without revealing it directly',
      palavraSecretaStep3: 'The impostor must pretend to know the word and try to figure it out',
      palavraSecretaStep4: 'After the clue rounds, everyone votes on who they think is the impostor',
      palavraSecretaTip1: 'Crewmates: give subtle clues, not too obvious',
      palavraSecretaTip2: 'Impostor: pay attention to others\' clues to discover the word',
      palavraSecretaTip3: 'Be careful with very specific clues that might give the word to the impostor',
      locaisFuncoesTitle: 'Locations & Roles',
      locaisFuncoesDesc: 'Each player receives a location and a specific role. The impostor doesn\'t know the location but needs to pretend they do!',
      locaisFuncoesStep1: 'Crewmates receive a location (e.g., Hospital) and a role (e.g., Doctor)',
      locaisFuncoesStep2: 'The impostor doesn\'t know the location',
      locaisFuncoesStep3: 'Players ask each other questions about the location',
      locaisFuncoesStep4: 'The impostor must try to figure out the location from others\' answers',
      locaisFuncoesTip1: 'Ask questions that only someone who knows the location could answer',
      locaisFuncoesTip2: 'Impostor: avoid giving answers that are too generic or too specific',
      locaisFuncoesTip3: 'Watch for who seems confused by the questions',
      duasFaccoesTitle: 'Two Factions',
      duasFaccoesDesc: 'Players are divided into two teams, each with a different word. The impostor doesn\'t belong to any team!',
      duasFaccoesStep1: 'Half the players receive Word A, the other half Word B',
      duasFaccoesStep2: 'The impostor doesn\'t know either word',
      duasFaccoesStep3: 'Each team tries to identify who their allies are',
      duasFaccoesStep4: 'The impostor tries to infiltrate one of the teams',
      duasFaccoesTip1: 'Try to find out who has the same word as you',
      duasFaccoesTip2: 'Be careful not to reveal your word to the opposing team',
      duasFaccoesTip3: 'The impostor may try to create confusion between teams',
      categoriaItemTitle: 'Category + Item',
      categoriaItemDesc: 'Everyone knows the category, but only crewmates know the specific item. The impostor knows the category but not the item!',
      categoriaItemStep1: 'A category is revealed to everyone (e.g., Fruits)',
      categoriaItemStep2: 'Crewmates receive a specific item from the category (e.g., Apple)',
      categoriaItemStep3: 'The impostor knows the category but not the item',
      categoriaItemStep4: 'Players must give clues about the item without revealing it',
      categoriaItemTip1: 'Use specific characteristics of the item for your clues',
      categoriaItemTip2: 'Impostor: try to give generic clues that apply to several items in the category',
      categoriaItemTip3: 'Watch for players who seem to guess too much',
      perguntasDiferentesTitle: 'Different Questions',
      perguntasDiferentesDesc: 'Crewmates and impostor receive different questions about the same topic. The answers will reveal who the impostor is!',
      perguntasDiferentesStep1: "Crewmates receive a question (e.g., 'What's your favorite animal?')",
      perguntasDiferentesStep2: 'The impostor receives a different question on a similar topic',
      perguntasDiferentesStep3: 'Each player answers their question out loud',
      perguntasDiferentesStep4: 'Answers that don\'t make sense reveal the impostor',
      perguntasDiferentesTip1: 'Pay attention to whether the answers make sense with the topic',
      perguntasDiferentesTip2: 'Impostor: try to give answers that fit multiple possible questions',
      perguntasDiferentesTip3: 'Compare answers between players',
    },

    // Game Modes Page - full content
    gameModesPage: {
      prepareCrew: 'PREPARE YOUR CREW',
      title: 'Game',
      titleHighlight: 'Modes',
      description: 'Choose your mission. Each mode offers a unique dynamic of deduction and strategy.',
      select: 'Select',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      readyForSabotage: 'READY FOR SABOTAGE?',
      readyDesc: 'The ship is about to take off. Gather your friends and find out who the impostor is right now!',
      launchShip: 'LAUNCH SHIP',
      palavraSecreta: 'Secret Word',
      palavraSecretaDesc: 'One word for everyone. The Impostor tries to guess!',
      locaisFuncoes: 'Locations & Roles',
      locaisFuncoesDesc: 'Each one receives a Location and a Role. The Impostor doesn\'t know the location.',
      categoriaItem: 'Category + Item',
      categoriaItemDesc: 'Everyone knows the category and item. The Impostor only knows the category.',
      duasFaccoes: 'Two Factions',
      duasFaccoesDesc: 'Two teams with different words. The Impostor doesn\'t know any.',
      perguntasDiferentes: 'Different Questions',
      perguntasDiferentesDesc: 'Crewmates and Impostor receive similar but different questions.',
    },

    // Blog Page - extra content
    blogPage: {
      weekHighlight: 'HIGHLIGHT OF THE WEEK',
      moreTransmissions: 'MORE TRANSMISSIONS',
      moreTransmissionsDesc: 'Stay up to date with the latest ship communications',
      footerDesc: 'The ultimate social deduction experience in space. Join thousands of crewmates and find out who the traitor is.',
      copyright: '© 2026 TikJogos Entertainment. All rights reserved.',
      disclaimer: 'TikJogos is an independent fan project. All trademarks (such as character names and franchises) belong to their respective owners and are used here only for reference purposes in the context of word/trivia games.',
      madeWith: 'Made with 💜 in the TikJogos Galaxy',
    },

    // Blog Post Page - extra content
    blogPostPage: {
      articleNotFound: 'Article not found',
      articleNotFoundDesc: 'The content you are looking for does not exist or has been moved.',
      backToBlog: 'Back to Blog',
      comments: 'Comments',
      aboutAuthor: 'ABOUT THE AUTHOR',
      viewProfile: 'View Profile',
      moreArticles: 'More Articles',
    },

    // Other Games Page
    otherGamesPage: {
      title: 'Other Games',
      description: 'Choose a game to have fun!',
      back: 'Back',
      termoDesc: 'Guess the word of the day in 6 attempts',
      comingSoon: 'More games coming soon!',
    },

    // Terms and Privacy
    legal: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      copyright: '© 2026 TikJogos. All rights reserved.',
      lastUpdated: 'Last updated',
    },

    // Errors
    errors: {
      notFound: 'Page not found',
      notFoundDesc: 'Sorry, the page you are looking for does not exist.',
      backHome: 'Back to Home',
      serverError: 'Server error',
      tryAgain: 'Try Again',
      loading: 'Loading...',
    },

    // Common Buttons
    buttons: {
      send: 'Send',
      cancel: 'Cancel',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      copy: 'Copy',
      share: 'Share',
      play: 'Play',
      start: 'Start',
      exit: 'Exit',
    },

    // Validations
    validation: {
      required: 'This field is required',
      minLength: 'Minimum {min} characters',
      maxLength: 'Maximum {max} characters',
      invalidEmail: 'Invalid email',
      invalidNumber: 'Invalid number',
      passwordMismatch: 'Passwords do not match',
    },

    // Modals and Alerts
    alerts: {
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Information',
      confirm: 'Are you sure?',
    },
  },

  es: {
    // Navegación y Menú
    nav: {
      home: 'Inicio',
      blog: 'Blog',
      howToPlay: 'Cómo Jugar',
      themes: 'Temas',
      createTheme: 'Crear Tema',
      donate: 'Donar',
      privacy: 'Privacidad',
      terms: 'Términos de Uso',
      otherGames: 'Otros Juegos',
      navigation: 'Navegación',
      support: 'Soporte',
      faq: 'FAQ',
      reportBug: 'Reportar Error',
      contact: 'Contacto',
      officialDiscord: 'Discord Oficial',
      followUs: 'Síguenos',
      language: 'Idioma',
    },

    // Página de Inicio
    home: {
      title: 'TikJogos',
      subtitle: 'El Juego del Impostor Reinventado',
      description: 'Desconfianza, estrategia y diversión en un solo lugar. Juega con amigos y descubre quién es el impostor.',
      createRoom: 'Crear Sala',
      joinRoom: 'Unirse a Sala',
      playLocal: 'Modo Local',
      createTheme: 'Crear Tema',
      nickname: 'Ingresa tu apodo',
      roomCode: 'Código de sala',
      saveNickname: 'Recordar mi apodo',
      enterCode: 'Entrar',
    },

    // Modos de Juego
    gameModes: {
      title: 'Modos de Juego',
      description: 'Elige tu modo favorito y comienza a jugar',
      classic: {
        name: 'Modo Clásico',
        description: 'El juego tradicional con discusiones y votaciones',
      },
      rapid: {
        name: 'Modo Rápido',
        description: 'Partidas rápidas con menos rondas',
      },
      hardcore: {
        name: 'Modo Hardcore',
        description: 'Desafío máximo con reglas más estrictas',
      },
      custom: {
        name: 'Modo Personalizado',
        description: 'Crea tus propias reglas',
      },
    },

    // Cómo Jugar
    howToPlay: {
      title: 'Cómo Jugar',
      objective: 'Objetivo del Juego',
      objectiveDesc: 'Encuentra al (los) impostor(es) antes de que sabotee(n) al grupo.',
      roles: 'Roles',
      crewmate: 'Tripulante - Completa las tareas',
      impostor: 'Impostor - Sabotea y elimina',
      gameplay: 'Jugabilidad',
      gameplayDesc: 'Discusión, votación y eliminación de sospechosos.',
      tips: 'Consejos',
      tipObserve: 'Observa el comportamiento de los demás',
      tipCommunicate: 'Comunícate con tu equipo',
      tipVote: 'Vota con confianza pero con cuidado',
    },

    // Crear Tema
    createTheme: {
      title: 'Crear Tema',
      description: 'Crea tu propio tema personalizado para el juego',
      themeTitle: 'Título del Tema',
      authorName: 'Nombre del Autor',
      words: 'Palabras (mínimo 7)',
      addWord: 'Agregar Palabra',
      isPublic: 'Hacer Público',
      isPrivate: 'Privado',
      price: '€3,00',
      acceptTerms: 'Acepto los términos y condiciones',
      create: 'Crear Tema',
      paymentPending: 'Esperando Pago',
      scanQr: 'Escanea el Código QR',
      copying: 'Copiar PIX',
      copied: '¡Copiado!',
      success: '¡Tema creado exitosamente!',
      successCode: 'Código de Acceso',
      error: 'Error al crear tema',
      minWords: 'Se requiere mínimo 7 palabras',
      maxWords: 'Máximo 25 palabras',
    },

    // Donaciones
    donate: {
      title: 'Apoyar el Proyecto',
      description: 'Tu contribución ayuda a mantener TikJogos funcionando y en constante evolución.',
      thanks: '¡Gracias por apoyar!',
      donorName: 'Tu Nombre',
      message: 'Mensaje (opcional)',
      amount: 'Cantidad (€)',
      presets: ['€5', '€10', '€20', '€50'],
      customAmount: 'Cantidad Personalizada',
      donate: 'Hacer una Donación',
      paymentPending: 'Esperando Confirmación',
      scanQr: 'Escanea el Código QR con tu app del Banco',
      minAmount: 'La cantidad mínima es €1,00',
      maxAmount: 'La cantidad máxima es €1.000,00',
      success: '¡Donación recibida exitosamente!',
      error: 'Error al procesar donación',
      backToHome: 'Volver a Inicio',
      heroTitle: 'APOYA TIKJOGOS',
      heroDesc: '¡Ayuda a mantener el juego en línea y gratuito!',
      whyDonate: '¿POR QUÉ DONAR?',
      whyDonateDesc: 'Servidores • Nuevos modos • Mejoras • Juego 100% gratuito',
      chooseAmount: 'ELIGE LA CANTIDAD:',
      other: 'Otro',
      nicknamePlaceholder: 'Tu apodo',
      enterName: 'Ingresa tu nombre',
      donateViaPix: 'DONAR VÍA PIX',
      scanOrCopy: 'Escanea el Código QR o copia el código PIX',
      copyPixCode: 'COPIAR CÓDIGO PIX',
      awaitingPayment: 'Esperando pago...',
      copied: '¡Copiado!',
      copiedDesc: 'Código PIX copiado al portapapeles.',
      thankYou: '¡GRACIAS',
      thankYouDesc: 'Tu contribución ayuda a mantener TikJogos en línea y gratuito para todos.',
      donateAgain: 'Donar de nuevo',
      goPlay: 'Ir a jugar',
    },

    // Blog
    blog: {
      title: 'Blog del Impostor',
      subtitle: 'Centro de Comando',
      description: 'Noticias galácticas, estrategias de sabotaje y actualizaciones directas del centro de comando de TikJogos.',
      readMore: 'Leer Más',
      readTime: 'min de lectura',
      published: 'Publicado en',
      author: 'Por',
      category: 'Categoría',
      noComments: 'Sin comentarios aún',
    },

    // Posts del Blog
    blogPosts: {
      post1: {
        title: 'El alma de los juegos sociales: ¿Por qué la desconfianza nos fascina?',
        excerpt: 'El Juego del Impostor se ha consolidado como un verdadero fenómeno cultural al transformar la desconfianza en una experiencia profunda.',
        content: `El Juego del Impostor se ha consolidado como un verdadero fenómeno cultural entre jugadores y diversos grupos de amigos al lograr transformar una premisa extremadamente simple en una experiencia psicológica profunda y muy intensa. A diferencia de la mayoría de los juegos tradicionales, donde el objetivo principal es competir contra reglas matemáticas fijas o mecánicas de reflejos rápidos, aquí los participantes son colocados para enfrentar directamente las mentes e intuiciones unos de otros.

Este cambio de paradigma quita el enfoque del tablero físico o la interfaz digital y lo transporta al campo de las interacciones humanas puras, donde cada palabra hablada tiene un peso estratégico fundamental para el éxito o fracaso del grupo. La gran fuerza impulsora que sostiene toda la dinámica de esta modalidad se basa en la desconfianza constante y la lectura del comportamiento.

### El Factor Humano como Variable
Cada respuesta ligeramente vaga, cada pausa inesperada al hablar y cada acusación lanzada sin base sólida crea una tensión palpable que mantiene a todos los jugadores en estado de máxima alerta durante toda la sesión. El juego logra mezclar magistralmente los elementos de observación cuidadosa, estrategia de manipulación e interacción social orgánica. No se trata solo de descubrir quién está mintiendo, sino de entender las motivaciones detrás de cada comportamiento.

### Narrativas Inéditas
Uno de los aspectos más fascinantes es que ninguna partida será jamás igual a otra, precisamente porque el factor humano es la variable que altera completamente el curso de los eventos. El mismo grupo de personas puede reunirse para jugar varias veces seguidas y, aun así, cada ronda será capaz de generar historias inéditas, llenas de giros dramáticos y momentos de pura sorpresa colectiva.`,
        author: 'Capitán Miller',
        role: 'Estratega Social',
        date: '04 Feb 2026',
        category: 'Comunidad',
      },
      post2: {
        title: 'TikJogos: Partidas más organizadas y estratégicas',
        excerpt: 'Descubre cómo TikJogos elimina la burocracia de los papeles y se enfoca en la pura diversión y deducción social.',
        content: `Cualquiera que haya intentado organizar una partida del Juego del Impostor de manera estrictamente tradicional sabe lo frustrante que puede ser la desorganización logística. El uso de papeles rotos y bolígrafos que fallan terminan rompiendo el ritmo necesario para mantener la inmersión psicológica.

En este contexto, TikJogos surge como una solución definitiva, funcionando como un verdadero árbitro digital que centraliza toda la información vital de la partida. La plataforma asume la responsabilidad de gestionar el tiempo, realizar sorteos de forma automatizada y distribuir funciones secretas sin margen para errores humanos.

### Pilares de la Experiencia
- **Sorteo Imparcial**: Garantiza que la elección de roles sea aleatoria y justa.
- **Secreto Absoluto**: Evita que miradas accidentales revelen la identidad del impostor.
- **Cronómetro Automático**: Mantiene la presión y el dinamismo de la ronda.

La facilidad de iniciar una nueva ronda con solo unos pocos clics permite que los grupos jueguen muchas más partidas en un período corto, aprovechando mejor los momentos de ocio. El enfoque cambia de la logística a las personas.`,
        author: 'Equipo Tech',
        role: 'Desarrolladores',
        date: '03 Feb 2026',
        category: 'Actualización',
      },
      post3: {
        title: 'Estrategias esenciales para quienes juegan como impostor',
        excerpt: 'Asumir el papel de villano requiere coherencia narrativa y control emocional. Aprende a dominar el arte del camuflaje.',
        content: `Asumir el papel de impostor requiere mucho más que solo la capacidad de inventar mentiras. El verdadero desafío radica en mantener una coherencia narrativa impecable durante todo el transcurso de la partida, mientras se controla el propio comportamiento no verbal.

### Consejos de Maestría
1. **Mantén tu Patrón**: No cambies drásticamente tu personalidad cuando recibas la función de villano. Si tiende a ser callado, mantente callado.
2. **Escucha Activa**: Escucha a los otros participantes antes de tomar una posición. A menudo, los inocentes crean teorías incorrectas que puedes usar a tu favor.
3. **Planta Semillas de Duda**: En lugar de atacar frontalmente, haz preguntas sutiles que lleven a otros a cuestionar la validez de la información presentada.

La victoria depende de la capacidad de plantar incertidumbre sin parecer su autor directo. Cuando dominas el arte de convertirte en parte del paisaje, descubrir tu identidad se vuelve una tarea casi imposible.`,
        author: 'El Infiltrado',
        role: 'Estratega',
        date: '02 Feb 2026',
        category: 'Consejos',
      },
      post4: {
        title: 'Cómo identificar al impostor usando lógica y paciencia',
        excerpt: 'Encontrar al impostor no es suerte, sino un proceso riguroso de análisis del comportamiento y lógica.',
        content: `Encontrar al impostor entre un grupo de amigos no es una cuestión de suerte o intuición mística, sino un proceso riguroso de análisis lógico y paciencia estratégica.

### Señales de Alerta
- **Presión del Tiempo**: El impostor frecuentemente intenta acelerar las decisiones colectivas para evitar que las contradicciones salgan a la luz.
- **Contradicciones Verbales**: Las mentiras complejas requieren mayor esfuerzo cognitivo, lo que genera grietas en la narrativa cuando se cuestionan.
- **Cambio de Discurso**: Observa si el sospechoso cambia ligeramente su versión de los hechos conforme se cierra la red.

La primera regla para una detección eficiente es observar el flujo de información e identificar dónde comienzan a fragmentarse las historias. La paciencia te permite recopilar datos suficientes para construir un caso sólido.`,
        author: 'Detective Orion',
        role: 'Analista de Datos',
        date: '01 Feb 2026',
        category: 'Consejos',
      },
      post5: {
        title: 'Por qué la comunicación define al ganador de la partida',
        excerpt: 'Saber hablar con claridad y escuchar con atención son las competencias decisivas que separan ganadores de perdedores.',
        content: `Contrario a lo que muchos creen, el Juego del Impostor no premia necesariamente a quién tiene la mayor habilidad para mentir en frío, sino a quién domina el arte de la comunicación interpersonal.

### El Poder de la Escucha Activa
La práctica de la escucha activa es una ventaja competitiva que permite percibir inconsistencias, cambios en el tono de voz y hesitaciones microcomportamentales. Cuando te comunicas enfocándote en el otro, te vuelves capaz de captar matices que pasarían desapercibidos.

### Organización del Debate
Una comunicación fragmentada o caótica favorece al impostor, que utiliza el ruido para esconderse. Al establecer un método organizado de intercambio de información, el espacio para mentiras disminuye drásticamente. La victoria pertenece a quienes orquestan la narrativa colectiva.`,
        author: 'Luna Star',
        role: 'Gerente de Comunidad',
        date: '31 Jan 2026',
        category: 'Noticias',
      },
      post6: {
        title: 'El secreto psicológico detrás del éxito del género',
        excerpt: 'Entiende el concepto del "círculo mágico" y cómo te permite explorar facetas de tu personalidad de manera segura.',
        content: `Los juegos de deducción social operan en un campo psicológico fascinante donde las normas sociales se suspenden para dar paso a lo lúdico. Crean el "círculo mágico", un espacio seguro donde mentir y manipular son incentivados por la mecánica de la diversión.

### Catarsis Social
Este permiso especial libera emociones que generalmente reprimimos, proporcionando una forma única de catarsis. El esfuerzo mental para sostener una mentira mientras se es observado estimula áreas profundas del cerebro, generando una experiencia intensa y envolvente.

### El Placer del Descubrimiento
Sentir que fuiste capaz de ver a través de la máscara de un amigo o que lograste engañar a todos con una actuación brillante genera un fuerte sentido de logro personal. Es esta profundidad humana la que garantiza el éxito del género.`,
        author: 'Dr. Nexus',
        role: 'Psicólogo Gamificado',
        date: '30 Jan 2026',
        category: 'Comunidad',
      },
      post7: {
        title: 'Desarrollo Cognitivo: Ejercitando la mente en el espacio',
        excerpt: 'Participar activamente en rondas del Juego del Impostor es un excelente ejercicio para la toma rápida de decisiones y análisis crítico.',
        content: `El jugador nunca está en una posición pasiva; debe evaluar cada pieza de información recibida, compararla con hechos anteriores y decidir si confiar. Este proceso de filtrado de datos es la base del método científico aplicado a la vida cotidiana.

### Beneficios Mentales
- **Atención Plena**: Observar detalles sutiles como cambios en la velocidad del habla.
- **Memoria a Corto Plazo**: Recordar con precisión quién dijo qué y en qué momento.
- **Argumentación y Retórica**: Estructurar el pensamiento de forma lógica para convencer a otros.

El Juego del Impostor transforma el ocio en una academia para el cerebro, refinando procesos mentales que utilizamos para resolver problemas complejos cada día.`,
        author: 'Profe Galáctica',
        role: 'Educación Lúdica',
        date: '29 Jan 2026',
        category: 'Noticias',
      },
      post8: {
        title: 'Errores comunes de principiantes y cómo evitarlos',
        excerpt: '¡No caigas en trampas de comportamiento! Descubre por qué hablar demasiado puede ser tu fin en el juego.',
        content: `Muchos jugadores novatos terminan cayendo en trampas que revelan su identidad o los hacen objetivos fáciles. Uno de los errores más clásicos es creer que hablar sin parar prueba tu inocencia.

### Qué NO hacer
1. **Hablar Excesivamente**: El exceso de explicaciones genera sospecha inmediata y proporciona material para contradicciones.
2. **Acusaciones Precipitadas**: Señalar con el dedo muy pronto sin evidencia sólida puede eliminar a un aliado o atraer atención no deseada hacia ti.
3. **Falta de Paciencia**: Cambiar de opinión tan pronto como alguien discrepa demuestra inseguridad que a los impostores les encanta explotar.

El juego es una maratón psicológica, no un sprint. Desarrollar visión periférica y mantener un registro mental del discurso de otros son pasos fundamentales para evolucionar.`,
        author: 'Comandante Nova',
        role: 'Instructora de Vuelo',
        date: '28 Jan 2026',
        category: 'Consejos',
      },
      post9: {
        title: 'Juego del Impostor: Guía de Estrategias y Análisis del Metajuego en TikJogos',
        excerpt: 'Domina el juego del impostor con tácticas de experto, análisis del comportamiento y lógica sistémica. Guía técnica completa.',
        content: `El **juego del impostor** se ha convertido en el epicentro de la deducción social moderna. En TikJogos, la experiencia del **juego del impostor** está optimizada para ofrecer el máximo nivel de competitividad y profundidad estratégica. Si buscas comprender los matices de cómo ganar en el **juego del impostor**, esta guía técnica ha sido estructurada con un enfoque en el análisis del comportamiento y la lógica sistémica.

### La Psicología Detrás del Juego del Impostor
El éxito en el **juego del impostor** no es aleatorio. Reside en la gestión eficiente de la asimetría de la información. Mientras la Tripulación utiliza datos concretos para identificar patrones, quien asume el rol en el **juego del impostor** debe dominar el arte del mimetismo semántico. La supervivencia en el **juego del impostor** exige neutralizar contradicciones en tiempo real.

### Tutorial Exclusivo: El Metajuego del Juego del Impostor
Para los jugadores que buscan excelencia en el **juego del impostor online**, la instrucción visual es indispensable. El tutorial a continuación detalla las fases críticas de una partida en TikJogos, desde la recepción de la palabra secreta hasta la resolución final en la votación.

{{youtube:TInLJ2F_G58}}

### Tácticas de Experto para el Juego del Impostor
Para aumentar tu tasa de victorias en el **juego del impostor**, aplica los siguientes protocolos:

1. **Protocolo de Verificación (Tripulación)**: En el **juego del impostor**, las preguntas deben formularse para exponer lagunas de conocimiento. Utiliza términos ambiguos que solo quien conoce el secreto puede descifrar.
2. **Protocolo de Infiltración (Impostor)**: El secreto para ganar el **juego del impostor** como traidor es la anticipación. Identifica a los líderes de opinión y replica sus patrones de lenguaje.
3. **Análisis de Variables (Sistémico)**: Cada modo del **juego del impostor** en TikJogos (como "Palabra Secreta" o "Lugares y Funciones") requiere un enfoque lógico distinto.

### TikJogos: La Referencia Técnica del Juego del Impostor
Nuestra plataforma fue desarrollada para ser el hogar definitivo del **juego del impostor**. Mediante sorteos imparciales y una interfaz que favorece la inmersión, el **juego del impostor** en TikJogos permite que la habilidad pura de deducción sea el único factor determinante del resultado.

Al dominar el **juego del impostor**, desarrollas valiosas competencias de comunicación, análisis crítico e inteligencia emocional. Prepara a tu tripulación, inicia la misión y descubre por qué somos la máxima autoridad cuando se trata del **juego del impostor**.`,
        author: 'Estratega Jefe',
        role: 'Analista de Metajuego',
        date: '06 Feb 2026',
        category: 'Consejos',
      },
    },

    // Página Cómo Jugar - contenido completo
    comoJogar: {
      crewManual: 'MANUAL DE LA TRIPULACIÓN',
      heroDesc: '¡Un juego de deducción social en línea para jugar con amigos! Descubre quién es el impostor a través de pistas, preguntas y mucha estrategia.',
      quickStart: 'Inicio Rápido',
      step1Title: 'Crea una Sala',
      step1Desc: 'Ingresa tu apodo y haz clic en "Crear Sala"',
      step2Title: 'Invita Amigos',
      step2Desc: 'Comparte el código de la sala con 3 o más jugadores',
      step3Title: 'Elige el Modo',
      step3Desc: 'El anfitrión selecciona la modalidad e inicia el juego',
      basicRules: 'Reglas Básicas',
      crewmates: 'TRIPULANTES',
      crewmatesDesc: 'Reciben información secreta y deben descubrir quién es el impostor mediante votación.',
      impostorLabel: 'IMPOSTOR',
      impostorDesc: 'No recibe la información secreta y debe fingir que la conoce para no ser descubierto.',
      voting: 'VOTACIÓN',
      votingDesc: '¡Después de la discusión, todos votan por quién creen que es el impostor. El más votado es eliminado!',
      unionQuote: 'La unión hace la fuerza... o la traición perfecta.',
      playerCount: 'Un juego para 3 a 15 jugadores en tiempo real.',
      gameModalities: 'Modalidades de Juego',
      gameModalitiesDesc: 'Cada misión tiene sus propios peligros y estrategias.',
      howToPlayLabel: 'Cómo Jugar',
      galacticTips: 'Consejos Galácticos',
      readyToPlay: '¿Listo para Jugar?',
      readyToPlayDesc: '¡Reúne a tus amigos y descubre quién es el impostor!',
      playNow: 'JUGAR AHORA',
      palavraSecretaTitle: 'Palabra Secreta',
      palavraSecretaDesc: '¡El modo clásico del juego! Todos los tripulantes reciben la misma palabra secreta, excepto el impostor que no la sabe.',
      palavraSecretaStep1: 'Todos los jugadores reciben una palabra, excepto el impostor',
      palavraSecretaStep2: 'Los tripulantes deben dar pistas sobre la palabra sin revelarla directamente',
      palavraSecretaStep3: 'El impostor debe fingir que conoce la palabra e intentar descubrirla',
      palavraSecretaStep4: 'Después de las rondas de pistas, todos votan por quién creen que es el impostor',
      palavraSecretaTip1: 'Tripulantes: den pistas sutiles, no muy obvias',
      palavraSecretaTip2: 'Impostor: presta atención a las pistas de los demás para descubrir la palabra',
      palavraSecretaTip3: 'Cuidado con pistas muy específicas que puedan revelar la palabra al impostor',
      locaisFuncoesTitle: 'Lugares y Funciones',
      locaisFuncoesDesc: '¡Cada jugador recibe un lugar y una función específica. El impostor no sabe el lugar, pero necesita fingir que lo sabe!',
      locaisFuncoesStep1: 'Los tripulantes reciben un lugar (ej: Hospital) y una función (ej: Médico)',
      locaisFuncoesStep2: 'El impostor no sabe cuál es el lugar',
      locaisFuncoesStep3: 'Los jugadores se hacen preguntas entre sí sobre el lugar',
      locaisFuncoesStep4: 'El impostor debe intentar descubrir el lugar por las respuestas de los demás',
      locaisFuncoesTip1: 'Haz preguntas que solo alguien que conoce el lugar sabría responder',
      locaisFuncoesTip2: 'Impostor: evita dar respuestas muy genéricas o muy específicas',
      locaisFuncoesTip3: 'Observa quién parece confundido con las preguntas',
      duasFaccoesTitle: 'Dos Facciones',
      duasFaccoesDesc: '¡Los jugadores se dividen en dos equipos, cada uno con una palabra diferente. El impostor no pertenece a ningún equipo!',
      duasFaccoesStep1: 'La mitad de los jugadores recibe la Palabra A, la otra mitad la Palabra B',
      duasFaccoesStep2: 'El impostor no sabe ninguna de las dos palabras',
      duasFaccoesStep3: 'Cada equipo intenta identificar quiénes son sus aliados',
      duasFaccoesStep4: 'El impostor intenta infiltrarse en uno de los equipos',
      duasFaccoesTip1: 'Intenta descubrir quién tiene la misma palabra que tú',
      duasFaccoesTip2: 'Cuidado de no revelar tu palabra al equipo contrario',
      duasFaccoesTip3: 'El impostor puede intentar crear confusión entre los equipos',
      categoriaItemTitle: 'Categoría + Ítem',
      categoriaItemDesc: '¡Todos saben la categoría, pero solo los tripulantes conocen el ítem específico. El impostor sabe la categoría pero no el ítem!',
      categoriaItemStep1: 'Se revela una categoría para todos (ej: Frutas)',
      categoriaItemStep2: 'Los tripulantes reciben un ítem específico de la categoría (ej: Manzana)',
      categoriaItemStep3: 'El impostor sabe la categoría pero no el ítem',
      categoriaItemStep4: 'Los jugadores deben dar pistas sobre el ítem sin revelarlo',
      categoriaItemTip1: 'Usa características específicas del ítem para tus pistas',
      categoriaItemTip2: 'Impostor: intenta dar pistas genéricas que apliquen a varios ítems de la categoría',
      categoriaItemTip3: 'Atención a los jugadores que parecen adivinar demasiado',
      perguntasDiferentesTitle: 'Preguntas Diferentes',
      perguntasDiferentesDesc: '¡Tripulantes e impostor reciben preguntas diferentes sobre el mismo tema. Las respuestas revelarán quién es el impostor!',
      perguntasDiferentesStep1: "Los tripulantes reciben una pregunta (ej: '¿Cuál es tu animal favorito?')",
      perguntasDiferentesStep2: 'El impostor recibe una pregunta diferente sobre un tema similar',
      perguntasDiferentesStep3: 'Cada jugador responde su pregunta en voz alta',
      perguntasDiferentesStep4: 'Las respuestas que no tienen sentido revelan al impostor',
      perguntasDiferentesTip1: 'Presta atención a si las respuestas tienen sentido con el tema',
      perguntasDiferentesTip2: 'Impostor: intenta dar respuestas que encajen en varias preguntas posibles',
      perguntasDiferentesTip3: 'Compara las respuestas entre los jugadores',
    },

    // Página Modos de Juego - contenido completo
    gameModesPage: {
      prepareCrew: 'PREPARA TU TRIPULACIÓN',
      title: 'Modos de',
      titleHighlight: 'Juego',
      description: 'Elige tu misión. Cada modo ofrece una dinámica única de deducción y estrategia.',
      select: 'Seleccionar',
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil',
      readyForSabotage: '¿LISTO PARA EL SABOTAJE?',
      readyDesc: '¡La nave está a punto de despegar. Reúne a tus amigos y descubre quién es el impostor ahora mismo!',
      launchShip: 'LANZAR NAVE',
      palavraSecreta: 'Palabra Secreta',
      palavraSecretaDesc: '¡Una palabra para todos. El Impostor intenta adivinar!',
      locaisFuncoes: 'Lugares y Funciones',
      locaisFuncoesDesc: 'Cada uno recibe un Lugar y una Función. El Impostor no sabe el lugar.',
      categoriaItem: 'Categoría + Ítem',
      categoriaItemDesc: 'Todos saben la categoría y el ítem. El Impostor solo sabe la categoría.',
      duasFaccoes: 'Dos Facciones',
      duasFaccoesDesc: 'Dos equipos con palabras diferentes. El Impostor no sabe ninguna.',
      perguntasDiferentes: 'Preguntas Diferentes',
      perguntasDiferentesDesc: 'Tripulantes e Impostor reciben preguntas parecidas, pero diferentes.',
    },

    // Página Blog - contenido extra
    blogPage: {
      weekHighlight: 'DESTACADO DE LA SEMANA',
      moreTransmissions: 'MÁS TRANSMISIONES',
      moreTransmissionsDesc: 'Mantente al día con las últimas comunicaciones de la nave',
      footerDesc: 'La experiencia definitiva de deducción social en el espacio. Únete a miles de tripulantes y descubre quién es el traidor.',
      copyright: '© 2026 TikJogos Entertainment. Todos los derechos reservados.',
      disclaimer: 'TikJogos es un proyecto independiente de fans. Todas las marcas registradas (como nombres de personajes y franquicias) pertenecen a sus respectivos propietarios y se usan aquí solo con fines de referencia en el contexto de juegos de palabras/trivia.',
      madeWith: 'Hecho con 💜 en la Galaxia TikJogos',
    },

    // Página BlogPost - contenido extra
    blogPostPage: {
      articleNotFound: 'Artículo no encontrado',
      articleNotFoundDesc: 'El contenido que buscas no existe o ha sido movido.',
      backToBlog: 'Volver al Blog',
      comments: 'Comentarios',
      aboutAuthor: 'SOBRE EL AUTOR',
      viewProfile: 'Ver Perfil',
      moreArticles: 'Más Artículos',
    },

    // Página Otros Juegos
    otherGamesPage: {
      title: 'Otros Juegos',
      description: '¡Elige un juego para divertirte!',
      back: 'Volver',
      termoDesc: 'Adivina la palabra del día en 6 intentos',
      comingSoon: '¡Pronto más juegos!',
    },

    // Términos y Privacidad
    legal: {
      privacy: 'Política de Privacidad',
      terms: 'Términos de Uso',
      copyright: '© 2026 TikJogos. Todos los derechos reservados.',
      lastUpdated: 'Última actualización',
    },

    // Errores
    errors: {
      notFound: 'Página no encontrada',
      notFoundDesc: 'Lo sentimos, la página que buscas no existe.',
      backHome: 'Volver a Inicio',
      serverError: 'Error del servidor',
      tryAgain: 'Intentar de Nuevo',
      loading: 'Cargando...',
    },

    // Botones Comunes
    buttons: {
      send: 'Enviar',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      back: 'Atrás',
      next: 'Siguiente',
      submit: 'Enviar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      copy: 'Copiar',
      share: 'Compartir',
      play: 'Jugar',
      start: 'Comenzar',
      exit: 'Salir',
    },

    // Validaciones
    validation: {
      required: 'Este campo es obligatorio',
      minLength: 'Mínimo {min} caracteres',
      maxLength: 'Máximo {max} caracteres',
      invalidEmail: 'Email inválido',
      invalidNumber: 'Número inválido',
      passwordMismatch: 'Las contraseñas no coinciden',
    },

    // Modales y Alertas
    alerts: {
      success: 'Éxito',
      error: 'Error',
      warning: 'Advertencia',
      info: 'Información',
      confirm: '¿Estás seguro?',
    },
  },
};

// Função para obter tradução
export function getTranslation(lang: Language, path: string): string {
  const keys = path.split('.');
  let value: any = translations[lang];

  for (const key of keys) {
    value = value?.[key];
  }

  return value ?? path;
}

// Hook para usar as traduções
export function useTranslation(lang: Language) {
  return (path: string, defaultValue?: string) => {
    const value = getTranslation(lang, path);
    return value || defaultValue || path;
  };
}
