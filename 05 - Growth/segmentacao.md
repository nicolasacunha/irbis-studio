# IRBIS — Ficha de Segmento (worksheet)

**v2 · reescrito em 12/ago/2026.** Este arquivo deixou de ser um documento de decisão e virou o formulário que alimenta a decisão.

| Antes (v1) | Agora (v2) | Motivo |
|---|---|---|
| 3 perfis de segmento preenchidos (Web3/SaaS, premium brand, subcontratação) | Ficha em branco, para preencher com dado real | Os 3 perfis morreram com o pivot de 04/ago e não têm substituto com dado suficiente |
| Duplicava a análise de `matriz-segmentacao-beachhead.md` | Aponta para ela como canônica e guarda só o método | Dois arquivos dizendo a mesma coisa geram duas versões da verdade |

**A decisão de segmentação vive em `05 - Growth/matriz-segmentacao-beachhead.md`.** Verticais de prospecção, atributos do beachhead, oferta de entrada e pendências estão lá. Canal está em `04 - Marketing/plano-canais-e-medicao.md`. Não duplicar nenhum dos dois aqui.

---

## Quando usar esta ficha

Depois de acumular conversas registradas em `interacoes` com origem e vertical preenchidas. Antes disso, preencher a ficha produz opinião com cara de dado, que é exatamente o que a v1 fazia.

Uma ficha por vertical de prospecção: advocacia, indústria, agência/time criativo.

---

## Critérios que separam um segmento do outro

| Critério | Por que importa para a IRBIS |
|---|---|
| **Tipo de dor** | Atendimento, triagem, orçamento ou follow-up. Define o gancho da abordagem e o escopo do bot |
| **Porte e acessibilidade do dono** | Time de 3 a 8 pessoas com dono que atende decide rápido. Acima disso aparece comitê |
| **Estágio de tentativa** | Nunca tentou automatizar, tentou com ferramenta pronta e frustrou, ou já tem algo rodando |
| **Canal de chegada** | Indicação, comunidade, base morna ou frio. Muda temperatura e ciclo |
| **Decisor** | Dono, sócio operador ou gestor intermediário. Muda o argumento e o tempo de aprovação |
| **Potencial de upsell** | Se a operação comporta Sistemas depois do bot, ou se para no bot |

---

## Ficha em branco

Copiar e preencher, uma por vertical.

```
Vertical: ___________________________
Preenchida em: ______________________
Base de dado: N conversas registradas, N reuniões, N propostas

Perfil ......................  (porte, quem é o dono, como é o dia dele)
Dor principal ..............  (o trabalho repetitivo que alguém faz na mão hoje)
Estágio de tentativa .......  (nunca tentou / tentou e frustrou / já tem algo)
Comportamento de compra ....  (quantos toques até a reunião, o que trava)
Valor gerado ...............  (horas ou erros que o bot tira da operação)
Sensibilidade a preço ......  (reação observada a R$ 1.000 de setup + a mensalidade cotada, dentro da faixa de R$ 500 a R$ 3.000)
Canal de chegada ...........  (de onde vieram as conversas dessa vertical)
Ticket observado ...........  (fechado de verdade, não projetado)
Potencial de upsell ........  (cabe Sistemas depois? qual?)
Prova social disponível ....  (o que pode ser citado nessa vertical, sem inventar)
O que ainda não sabemos ....
```

**Regras de preenchimento:**

- Só entra número que veio do banco ou de uma conversa que aconteceu. Estimativa entra marcada como estimativa, nunca em tabela comparativa.
- Prova social segue a política do `irbis-guarda-pivot`: Odery é prova de produto sem número financeiro publicável, E-Force é credencial pessoal e não faz ponte para Sistemas ou IA, ADASH não pode ser citada, Eduboxs não é case.
- Ficha preenchida com dado de cliente da família fica marcada como tal. A. Cunha e Odery não provam mercado.
- Terminou de preencher as três, leve o resultado para `matriz-segmentacao-beachhead.md` e reabra o placar lá. A ficha não decide sozinha.
