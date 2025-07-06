============= STYLE GUIDE SCSS =============

#### Sugestões de melhorias e cuidados em relação ao uso de estilos

#### Aqui estão práticas comuns que funcionam “na marra”, mas que viram um monstro difícil de manter com o tempo:

#### 1. px pra tudo
❌ O que fazem:

```scss
.title {
  font-size: 24px;
  margin-top: 20px;
}
```

Por que é ruim:

- Não escala em responsivo (valor fixo)
- Desconsidera acessibilidade (usuário que aumenta fontes no sistema se complica)
- Dificulta manter espaçamentos coesos

✅ Melhor abordagem:
Use rem/em/% e padronize espaçamentos (com variáveis/mixins se possivel):

```scss
$title-size: 1.5rem;

.title {
  font-size: $title-size;
  margin-top: 2rem;
}
```

#### 2. !important como padrão
❌ O que fazem:
```scss
.button {
  background: red !important;
}
```
Por que é ruim:

- Quebra a cascata natural do CSS (deve ser usado em casos muito **Específicos**)
- Vira guerra de !important sobre !important
- Torna manutenção imprevisível

✅ Melhor abordagem:

- Melhore a especificidade com BEM
- **Se necessário:** aumente a especificidade com escopo do component (:host, :host-context)

```html
<div class="payment__content">
  <button class="payment__content__button">
    <p class="payment__content__button__text">Confirmar pagamento</p>
  </button>
</div>
```

```scss
.payment__content {
  width: 15rem;

  &__button {
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  
    &__text {
      color: black // Regras mais específicas têm maior prioridade na cascata do CSS, o que reduz (ou elimina) a necessidade de usar !important.
    }
  }
}
```

O exemplo acima está em ```scss```, que já disponibiliza algumas maneiras de facilitar essa etapa da especificidade. Caso tenha mais curiosidade sobre o assunto, você pode dar uma olhada na [doc de especificidade do Mozilla](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_cascade/Specificity) 😁

#### 3. ::ng-deep 💀 (depreciado)
❌ O que fazem:

```scss
::ng-deep .mat-button {
  background: red;
}
```
Por que é ruim:

- ::ng-deep pode ser tão nocivo que está deprecated
- Não respeita nenhuma limitação (em alguns casos consegue atravessar o shadowDom)
- Ignora o encapsulamento do Angular
- Consegue alterar estilos de outros componentes já que mexe na "raiz" da camada de estilo

✅ Melhor abordagem:

- Prefira ViewEncapsulation.None **com consciência**
- Veja se **:host-context** não resolve o seu problema
- Estilos globais via styles.scss

#### 4. div fantasma com style inline
❌ O que fazem:

```scss
<div style="margin-top: 24px;"></div>
```
Por que é ruim:

- Semântica zero
- Estilo inline colado no HTML (impossível de reaproveitar, sobrescrever ou manter sem mexer diretamente na marcação)
- HTML poluído
- Dificulta acessibilidade
- Divs vazias usadas apenas para espaçamento não têm valor semântico e atrapalham a leitura estrutural da página por mecanismos de busca.

✅ Melhor abordagem:

- Use gap no flex/grid
- Use padding/margin direto no bloco sem criar elementos vazios

Quer saber mais sobre o assunto?
- [Angular Styling Easy](https://medium.com/@thomas.laforge/angular-styling-made-easy-leveraging-the-power-of-css-variables-cb33feeca6d1)
- [Deprecation of ::ng-deep](https://medium.com/@simon.sharp_25406/angular-alternatives-after-the-deprecation-of-ng-deep-b51591a296e7)

Achou algum erro ou algo que poderia estar sendo explicado de uma maneira mais didatica? sinta-se a vontade e contribua com esse artigo 😁.  
Vamos juntos transformar a nossa comunidade em referência 👾.
