# Handoff: Galeria Digital — Caio Livio (site de venda de arte)

## Overview
Redesign do site https://portalartescaiolivio.netlify.app/ — galeria digital do artista plástico Caio Livio (Recife, PE), pintura abstrata contemporânea. One-page com âncoras: Hero, Marquee, Sobre o Artista, Coleções (5 séries), Acervo interativo (busca + filtros + modal), Simulador de Ambientes, Depoimentos, Exposições, Contato/Curadoria, Footer. Conceito visual: **parede de galeria** — obras apresentadas como telas físicas emolduradas (passe-partout claro) sob luz de spot, sobre fundo escuro quente; dourado como cor de ação. TODAS as ações de compra/solicitação vão para o WhatsApp com mensagem pré-preenchida.

## About the Design Files
`Caio Livio Galeria.dc.html` é uma **referência de design em HTML** (protótipo), não código de produção. Usa um runtime proprietário de preview (`support.js`, tags `<x-dc>`, `<sc-for>`, `<sc-if>`, holes `{{ }}`, atributos `style-hover`). **Ignore o runtime e recrie no stack do projeto de destino** (para site estático: HTML/CSS/JS puro, Astro ou Next.js estático são boas escolhas). Leia o arquivo como especificação: todo o markup e estilos inline estão no template; dados, filtros e handlers estão na classe `Component` dentro do `<script data-dc-script>` (arrays: `marquee`, `tags`, `timeline`, `series`, `exposData`, `depoimentos`, `contatos`; gerador de obras: `buildObras()`). `style-hover="…"` = estado `:hover`.

## Fidelity
High-fidelity. Cores, tipografia, molduras e microinterações são finais.

## Design Tokens
Cores:
- Fundo principal: `#0C0A08` · Seções alternadas: `#0F0C09` · Cards/modal: `#12100C` · Footer: `#080604`
- Parede de galeria (fundo das molduras): gradiente 180° `#1A1510 → #0F0C09` (cards: `#181410 → #100D0A`), com `box-shadow: inset 0 0 60-80px rgba(0,0,0,.5)`
- Passe-partout/moldura: `#EFE9DC` (padding 12–16px em volta da obra + sombra dura `0 24-34px 50-70px -18px rgba(0,0,0,.85)`)
- Luz de spot: `radial-gradient(ellipse at 50% 0%, rgba(227,193,130,.14-.18), transparent 70%)` no topo da parede
- Dourado ação: `#C9A15C` · hover `#E3C182` · itálico destaque `#DCB878`
- Texto: título `#F2EDE4` · corpo `#B4A997` · secundário `#9C9080`/`#8A7E6C` · apagado `#6E6355`/`#54493B`
- Verde WhatsApp: `#1F9D68`
- Paletas das séries (fundos das obras placeholder, gradiente 140°): Essência `#7A2E14→#3B1408` · Movimento `#12324A→#081521` · Horizonte `#1E3D2A→#0A1810` · Conexões `#6E5A14→#2A2106` · Origem `#4A2A3D→#1C0F18`

Tipografia:
- Display: **Playfair Display** (Google Fonts) 400–700 + itálico. H1 `clamp(52px,6.2vw,96px)`; H2 `clamp(36-38px,4.4vw,58-62px)`; ênfases em itálico `#DCB878`.
- UI/corpo: **Jost** 300–600. Corpo 14–16.5px lh 1.7–1.9; labels 9.5–12px, letter-spacing `.16em–.4em`, uppercase.

Formas: botões/tags/badges = pílula (`999px`); cards/containers radius 20–32px; círculos para ícones e números.

## WhatsApp (regra central)
Número: `5581999999999` (placeholder — trocar pelo real). Helper: `wa(msg)` → `https://wa.me/5581999999999?text=` + msg URL-encoded. Mensagens:
- Curador (header/footer/flutuante): "Olá! Gostaria de falar com o curador sobre as obras de Caio Livio."
- Catálogo PDF: "Olá! Gostaria de receber o Catálogo Completo 2024 de Caio Livio em PDF."
- Simulação: "Olá! Gostaria de solicitar uma simulação de obra no meu ambiente."
- Por obra (card e modal): "Olá! Tenho interesse na obra {título} ({código}). Poderia me enviar mais informações?"
- Form de curadoria: ao enviar, abre WhatsApp em nova aba + mostra estado de sucesso.
Botão flutuante fixo (58px, verde, pulso via keyframes de box-shadow 2.6s infinite).

## Seções

### Header (fixo)
Fundo `rgba(8,6,4,.35)` + blur; após 40px de scroll `rgba(8,6,4,.92)` + borda dourada `.16`. Esquerda: "Caio Livio" (Playfair 22px) / "GALERIA OFICIAL · RECIFE" (9.5px, tracking .4em, dourado). Nav: ARTISTA · COLEÇÕES · ACERVO · EXPOSIÇÕES · CONTATO + pílula "FALAR COM CURADOR" (hover: fundo dourado). <980px: esconder nav (implementar menu mobile no port).

### Hero
Glows radiais dourado (topo-dir) e terracota (baixo-esq). Grid 1.15/0.85. Esquerda: pílula-eyebrow "GALERIA OFICIAL · RECIFE · BRASIL" → H1 "Arte que transforma espaços e *desperta emoções.*" → parágrafo → CTA pílula dourada "EXPLORAR ACERVO →" + círculo ↓ + link "CONHECER O ARTISTA" → 3 stats (200+ OBRAS AUTORAIS, 15+ ANOS, 5 SÉRIES; Playfair 36px, count-up opcional). Direita: **obra emoldurada na parede** (padding 44px, spot light, passe-partout `#EFE9DC` 16px, obra 4:5, legenda centralizada "Essência 001 / 120 × 160 CM · ACRÍLICO SOBRE TELA") + badge pílula dourada "DISPONÍVEL" flutuando topo-direita.
Abaixo: **marquee infinito** (animation translateX -50%, 36s linear, conteúdo duplicado): 200+ OBRAS AUTORAIS · RECIFE · CERTIFICADO DE AUTENTICIDADE · COLECIONADORES EM TODO O BRASIL · ATENDIMENTO PERSONALIZADO POR CURADORIA · PINTURA ABSTRATA CONTEMPORÂNEA, separados por pontos dourados.

### Sobre o Artista (`#sobre`)
Grid .9/1.1. Esquerda: foto do artista em arco (`border-radius:220px 220px 28px 28px`, 4:5) + selo dourado flutuante ("Caio Livio / ARTISTA PLÁSTICO · RECIFE, PE"). Direita: eyebrow + H2 "Uma visão única do *mundo abstrato.*" + 3 parágrafos (texto no arquivo) + 6 tags-pílula (Pintura Abstrata, Acrílico sobre Tela, Arte Contemporânea, Arte Nordestina, Expressionismo, Gestualismo) + timeline 4 itens (2020/2021/2022/2024, ano em Playfair itálico dourado + texto, separados por hairlines).

### Coleções (`#colecoes`, fundo `#0F0C09`)
Header centrado: "Cinco *séries* para explorar". Lista de 5 **linhas-pílula** clicáveis (grid: swatch circular 64px com gradiente da série · "Série 0N" itálico · nome Playfair 26px + descrição · "NN OBRAS" · seta em círculo; hover: desliza 8px + borda dourada). Clique → filtra o acervo pela série e faz scroll até `#acervo`. Dados: Essência/42/Exploração emocional · Movimento/38/Dinamismo e energia · Horizonte/45/Paisagens abstratas · Conexões/35/Relações humanas · Origem/40/Raízes culturais brasileiras.

### Acervo (`#acervo`) — coração do site
1. Banner catálogo: card radius 28px com borda dourada, "Catálogo Completo 2024 · Caio Livio" (itálico) + botão "BAIXAR CATÁLOGO PDF" → WhatsApp.
2. Toolbar: input de busca (pílula, busca por título/código/série) + 8 chips-filtro (TODAS · DISPONÍVEIS · VENDIDAS · ESSÊNCIA · MOVIMENTO · HORIZONTE · CONEXÕES · ORIGEM; ativo = fundo dourado/texto escuro) + contador "Exibindo N de M obras".
3. Grid `auto-fill minmax(300px,1fr)`, gap 44/34px. **Card de obra = quadro na parede**: bloco "parede" (gradiente escuro, radius 6px, inset shadow, spot light no topo, padding 34px) contendo moldura `#EFE9DC` (padding 12px) com a obra (aspect 1:1.1, fundo = gradiente da série); badge de status no canto (DISPONÍVEL = pílula dourada sólida; RESERVADA = outline dourado; VENDIDA = outline cinza); abaixo, fora da parede: título Playfair 19px + "dim · ano" + botão-pílula outline "SOLICITAR" → WhatsApp da obra. Clique na parede abre o modal. Hover: parede sobe 4px.
4. Dados: 40 obras geradas proceduralmente em `buildObras()` (5 séries alternadas, código `CL·{ano}·{NNN}`, dims variadas, anos 2016-2024, status distribuído). No port, substituir por dados reais (JSON/CMS).
5. Paginação: mostra 8, botão "CARREGAR MAIS OBRAS" (+8; some quando acaba). Busca/filtro resetam para 8.

### Modal de obra
Overlay `rgba(8,6,4,.9)` + blur; fecha no clique fora ou ×. Card radius 32px, grid 1.05/0.95: esquerda = obra emoldurada na parede (mesmo tratamento, max-width 420px); direita = código (tracking .28em dourado), título Playfair 38px, subtítulo "ano · Pintura Abstrata · Série X", grade 2×2 TÉCNICA/DIMENSÕES/ANO/SÉRIE entre hairlines, citação itálica, status com ponto colorido (verde disponível / dourado reservada / cinza vendida), botões "SOLICITAR VIA WHATSAPP" (pílula dourada) + "VOLTAR AO ACERVO", nota "✓ Certificado de Autenticidade incluso".

### Simulador de Ambientes (`#simulador`, fundo `#0F0C09`)
Grid 1/1. Esquerda: eyebrow "SIMULADOR DE AMBIENTES" + H2 "Visualize a obra *no seu espaço.*" + parágrafo + passos 01/02/03 (círculos numerados) + botão "SOLICITAR SIMULAÇÃO VIA WHATSAPP". Direita: área com borda tracejada dourada contendo quadro emoldurado inclinado -1.5°, legenda "SIMULAÇÃO EM ESCALA REAL".

### Depoimentos
Header centrado "O que dizem os *colecionadores*". 3 cards (radius 28px): aspas Playfair 64px douradas, texto itálico Playfair, avatar circular com inicial + nome + papel. Dados no array `depoimentos` (Marcos Andrade/Empresário·SP; Carla Mendes/Arquiteta·Recife; Ana Cláudia Ferreira/Colecionadora·Fortaleza).

### Exposições (`#exposicoes`, fundo `#0F0C09`)
"Exposições & *Eventos*". Grid .85/1.15: esquerda = lista clicável de 6 exposições (ano itálico dourado + título + local; selecionada com fundo dourado .06); direita = foto 16:10 (radius 32px) + meta + título + descrição da selecionada. Dados no array `exposData` (2024 Amparo 60 · 2023 MAMAM · 2022 Casa Amarela · 2019 CCBB · 2016 Nara Roesler SP · 2012 Mamute).

### Contato / Curadoria (`#contato`)
Grid 1/1.05. Esquerda: eyebrow "CURADORIA & AQUISIÇÃO" + H2 "Inicie sua *coleção.*" + parágrafo + 4 cards de contato (ícone circular + label + valor): WhatsApp +55 (81) 9 9999-9999 · Instagram @caiolivioarte · E-mail curadoria@caiolivio.art · Recife, PE. Direita: card form (radius 32px): NOME, WHATSAPP, E-MAIL, INTERESSE (select: Adquirir obra específica / Curadoria residência / Curadoria corporativa / Simulação / Outro), MENSAGEM, botão-pílula "SOLICITAR CURADORIA". Inputs fundo `#0C0A08`, radius 14px, focus borda dourada. Submit: abre WhatsApp + troca por estado de sucesso (✓ "Solicitação enviada").

### Footer (`#080604`)
Grid 1.6/1/1/1: marca + tagline; colunas GALERIA / SERVIÇOS / CONTATO (links âncora). Barra final: "© 2026 Caio Livio. Todos os direitos reservados. Arte protegida por lei." + links INSTAGRAM · WHATSAPP.

## Interactions
- Scroll suave (`scroll-behavior:smooth`, `scroll-margin-top:90px`).
- Header muda em scrollY>40.
- Reveal on scroll: `opacity:0; translateY(26px)` → visível (transição .8s cubic-bezier(.22,.61,.36,1); IntersectionObserver threshold .1, uma vez).
- Marquee CSS infinito (conteúdo duplicado, translateX(-50%), 36s).
- Acervo: busca live + filtros + carregar mais + modal — ver classe `Component` (state: `filter`, `query`, `shown`, `modal`, `sent`, `expoIdx`).
- Responsivo: breakpoint 980px (nav some → menu mobile a implementar; grids 2-col empilham; grid de obras minmax 240px).

## Assets
- Fontes: Google Fonts — Playfair Display, Jost.
- Obras: placeholders `<image-slot>` com gradientes por série — substituir pelas fotos reais das telas (o cliente tem 200+ obras; usar imagens otimizadas + lazy loading).
- Ícones: SVGs inline no arquivo (WhatsApp, Instagram, e-mail, pin).
- Fotos: artista no ateliê (4:5), exposições (16:10).

## Files
- `Caio Livio Galeria.dc.html` — design completo (markup + estilos + lógica + dados). Fonte da verdade.
- `image-slot.js`, `support.js` — runtime do preview; ignorar no port.
