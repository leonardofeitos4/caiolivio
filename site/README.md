# Caio Livio — Galeria Digital

Site estático (HTML/CSS/JS puro, sem build) baseado no redesign em `sitebom/design_handoff_galeria`.

## Estrutura
- `index.html` — todas as seções (uma página só, com âncoras)
- `css/style.css` — estilos e tokens de design (cores, tipografia, espaçamentos)
- `js/main.js` — dados do site (séries, depoimentos, exposições, obras), interações (menu, busca/filtro do acervo, modal, formulário, reveal on scroll)
- `images/` — coloque aqui as fotos reais (veja nomes abaixo)

## Como colocar as fotos reais
Troque os placeholders de gradiente colocando arquivos com estes nomes em `images/`:
- `hero-obra.jpg` — obra em destaque na home
- `artista-foto.jpg` — foto do artista no ateliê
- `simulador-obra.jpg` — imagem de exemplo do simulador de ambientes
- `expo-foto.jpg` — foto de exposição (pode trocar por seção, se quiser evoluir depois)

Para as obras do acervo (grade de cards), hoje elas usam um gradiente de cor por série como espaço reservado. Quando tiver as fotos das telas, me avise que eu conecto cada obra à sua imagem real (idealmente a partir de uma lista/JSON com título, código, série, dimensões e o nome do arquivo da foto).

## Como trocar o WhatsApp
Edite a constante `WHATSAPP_NUMBER` no topo de `js/main.js` (formato: `55` + DDD + número, sem símbolos).

## Sobre "disponível / vendida"
Por pedido do cliente, o site **não** exibe status de disponibilidade das obras (sem badges "Disponível"/"Vendida", sem filtro por status). O botão "Solicitar" em cada obra sempre leva ao WhatsApp para consulta direta com a curadoria.

## Rodar localmente
Basta abrir `index.html` no navegador, ou servir a pasta com qualquer servidor estático (ex.: `npx serve .`).
