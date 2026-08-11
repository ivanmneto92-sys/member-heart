## Problemas detectados no mobile (390px) em /quem-somos

1. **"ALÉM DAS ARQUIBANCADAS" estoura a tela** — o `letter-spacing: 4px` + `font-size: 36px` faz a última letra (S) ultrapassar a borda direita.
2. **Header superior apertado** — o texto "FILHAS DO ALMIRANTE" quebra em 2 linhas e fica colado no botão "Voltar".
3. **Títulos de seção em geral muito grandes** — "NOSSA HISTÓRIA" e "NOSSOS PILARES" também quebram em 2 linhas desnecessariamente.
4. **Padding lateral inconsistente** entre o hero, as seções e os cards.

## Ajustes

### 1. Header (`.qs-page-top`)
- No mobile, esconder o texto "FILHAS DO ALMIRANTE" e manter só a logo + botão Voltar.
- Reduzir padding lateral para 16px.

### 2. Títulos de seção (`.qs-section h2`)
- No mobile: `font-size: 28px`, `letter-spacing: 2px`, `word-break: break-word`.
- Evita o overflow de "ARQUIBANCADAS" e mantém uma quebra natural.

### 3. Hero (`.qs-title`)
- Garantir `letter-spacing: 3px` (em vez de 6px) no mobile para "QUEM SOMOS" respirar melhor.

### 4. Cards (`.qs-card`)
- Reduzir padding para 22px 18px no mobile, evitando texto colado nas bordas.

### 5. Lista (`.qs-list`)
- Já está em 1 coluna no mobile; apenas ajustar gap para 6px e font para 13.5px para melhorar leitura.

## Arquivo afetado

- `src/routes/quem-somos.tsx` — apenas dentro do bloco `@media (max-width: 768px)` do `<style>` interno e adicionar regras pontuais à `.qs-page-top` para esconder o brand text em telas pequenas.

Nenhuma mudança de conteúdo, estrutura ou desktop.
