window.addEventListener("load", function(){
  /* Ajustando altura do tronco para preencher a parte vertical visível da tela: */
  const body = document.getElementsByTagName("body")[0];
  const div_cabecalho_template = document.getElementById("div_cabecalho_template");
  const div_tronco_template = document.getElementById("div_tronco_template");
  const div_rodape_template = document.getElementById("div_rodape_template");
  
  let altura_minima = window.innerHeight;
  
  var estilo_computado = window.getComputedStyle(body);
  altura_minima -= parseInt(estilo_computado.marginTop, 10);
  altura_minima -= parseInt(estilo_computado.borderTopWidth, 10);
  altura_minima -= parseInt(estilo_computado.paddingTop, 10);
  
  var estilo_computado = window.getComputedStyle(div_cabecalho_template);
  altura_minima -= parseInt(estilo_computado.marginTop, 10);
  altura_minima -= parseInt(estilo_computado.marginBottom, 10);
  altura_minima -= parseInt(estilo_computado.borderTopWidth, 10);
  altura_minima -= parseInt(estilo_computado.borderBottomWidth, 10);
  altura_minima -= parseInt(estilo_computado.paddingTop, 10);
  altura_minima -= parseInt(estilo_computado.paddingBottom, 10);
  altura_minima -= parseInt(estilo_computado.height, 10);
  
  var estilo_computado = window.getComputedStyle(div_tronco_template);
  altura_minima -= parseInt(estilo_computado.marginTop, 10);
  altura_minima -= parseInt(estilo_computado.marginBottom, 10);
  altura_minima -= parseInt(estilo_computado.borderTopWidth, 10);
  altura_minima -= parseInt(estilo_computado.borderBottomWidth, 10);
  altura_minima -= parseInt(estilo_computado.paddingTop, 10);
  altura_minima -= parseInt(estilo_computado.paddingBottom, 10);
  
  var estilo_computado = window.getComputedStyle(div_rodape_template);
  altura_minima -= parseInt(estilo_computado.marginTop, 10);
  
  div_tronco_template.style.minHeight = altura_minima + "px";
  
  /* Removendo o foco dos botões quando o cursor sai de cima deles e após o clique: */
  const botoes = document.querySelectorAll("button");
  
  for(let i = 0; i < botoes.length; i++){
    botoes[i].addEventListener("mouseleave", remover_foco);
    botoes[i].addEventListener("click", remover_foco);
  }
  
  function remover_foco(evento){
    const tag_que_disparou_o_evento = evento.currentTarget;
    tag_que_disparou_o_evento.blur();
  }
});
