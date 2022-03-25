window.addEventListener("load", function(){
  /* Calendário */
  const campo_com_icone = document.getElementById("campo_com_icone");
  const span_calendario_para_o_campo_com_icone = document.getElementById("span_calendario_para_o_campo_com_icone");
  const campo_sem_icone = document.getElementById("campo_sem_icone");
  const div_modelo_calendario_template = document.getElementById("div_modelo_calendario_template");
  const caixa_de_selecao_de_mes_do_calendario_template = document.getElementById("caixa_de_selecao_de_mes_do_calendario_template");
  const caixa_de_selecao_de_ano_do_calendario_template = document.getElementById("caixa_de_selecao_de_ano_do_calendario_template");
  const div_dias_do_calendario_template = document.getElementById("div_dias_do_calendario_template");
  const celulas_do_calendario = document.getElementsByClassName("celula_do_calendario");
  const botao_confirmar_do_calendario_template = document.getElementById("botao_confirmar_do_calendario_template");
  
  let dia_selecionado = null;
  let campo_alvo_do_calendario = null;
  let ocultar_div_modelo_calendario_template = true;
  
  campo_com_icone.addEventListener("keyup", function(){
    if(campo_alvo_do_calendario === campo_com_icone){
      atualizar_calendario();
    }
  });
  campo_sem_icone.addEventListener("keyup", function(){
    if(campo_alvo_do_calendario === campo_sem_icone){
      atualizar_calendario();
    }
  });
  
  campo_com_icone.addEventListener("click", function(){
    ocultar_div_modelo_calendario_template = false;
  });
  campo_sem_icone.addEventListener("click", function(){
    ocultar_div_modelo_calendario_template = false;
    mostra_o_calendario(campo_sem_icone);
  });
  
  span_calendario_para_o_campo_com_icone.addEventListener("click", function(){
    ocultar_div_modelo_calendario_template = false;
    mostra_o_calendario(campo_com_icone);
  });
  span_calendario_para_o_campo_com_icone.addEventListener("mouseenter", function(){
    campo_com_icone.focus();
  });
  /* Impedindo clique duplo selecionar o texto */
  span_calendario_para_o_campo_com_icone.addEventListener("mousedown", function(evento){
    evento.preventDefault();
  });
  
  function mostra_o_calendario(campo_recebido){
    if(div_modelo_calendario_template.className.indexOf("tag_oculta") >= 0 
       || campo_alvo_do_calendario !== campo_recebido){
      campo_alvo_do_calendario = campo_recebido;
      
      let posicao_x = campo_alvo_do_calendario.getBoundingClientRect().left + window.scrollX;
      let posicao_y = campo_alvo_do_calendario.getBoundingClientRect().top + window.scrollY;
      
      let altura = 0;
      var estilo_computado = window.getComputedStyle(campo_alvo_do_calendario);
      altura += parseInt(estilo_computado.borderTopWidth, 10);
      altura += parseInt(estilo_computado.borderBottomWidth, 10);
      altura += parseInt(estilo_computado.paddingTop, 10);
      altura += parseInt(estilo_computado.paddingBottom, 10);
      altura += parseInt(estilo_computado.height, 10);
      posicao_y += altura;
      
      div_modelo_calendario_template.style.position = "absolute";
      div_modelo_calendario_template.style.top = posicao_y + "px";
      div_modelo_calendario_template.style.left = posicao_x + "px";
      if(window.innerWidth <= 640){
        const largura_do_calendario = 347; //Em pixels.
        div_modelo_calendario_template.style.left = window.innerWidth / 2 - largura_do_calendario / 2 + "px";
      }
      
      div_modelo_calendario_template.classList.remove("tag_oculta");
      
      atualizar_calendario();
    }else{
      div_modelo_calendario_template.classList.add("tag_oculta");
    }
  }
  
  function atualizar_calendario(){
    let valor = campo_alvo_do_calendario.value;
    let dia = null;
    let mes = null;
    let ano = null;
    let dias = null;
    let ano_referencia = null;
    
    if(valor !== null && valor.match(/^\d{2}\/\d{2}\/\d{4}$/)){
      dia = valor.substring(0, 2);
      mes = valor.substring(3, 5);
      ano = valor.substring(6, 10);
      
      if(dia.substring(0, 1) === "0"){
        dia = dia.substring(1, 2);
      }
      dia = parseInt(dia, 10);
      
      if(mes.substring(0, 1) === "0"){
        mes = mes.substring(1, 2);
      }
      mes = parseInt(mes, 10);
      
      ano = parseInt(ano, 10);
      
      dias = total_de_dias_do_mes(ano, mes);
      
      ano_referencia = ano;
      
      if(dia > dias){
        dia = dias;
      }
    }else{
      const data_atual = new Date();
      dia = data_atual.getDate();
      mes = data_atual.getMonth() + 1;
      ano = data_atual.getFullYear();
      dias = total_de_dias_do_mes(ano, mes);
      ano_referencia = ano;
    }
    
    dia_selecionado = dia;
    
    caixa_de_selecao_de_mes_do_calendario_template.value = mes;
    
    const menor_ano = ano_referencia - 7;
    const maior_ano = ano_referencia + 4;
    caixa_de_selecao_de_ano_do_calendario_template.innerHTML = "";
    for(let i = menor_ano; i <= maior_ano; i++){
      let elemento_ano = document.createElement("option");
      elemento_ano.setAttribute("value", i);
      elemento_ano.innerText = i;
      caixa_de_selecao_de_ano_do_calendario_template.appendChild(elemento_ano);
    }
    caixa_de_selecao_de_ano_do_calendario_template.value = ano;
    
    gerar_dias_do_mes(dias);
  }
  
  caixa_de_selecao_de_mes_do_calendario_template.addEventListener("change", function(){
    const mes = parseInt(caixa_de_selecao_de_mes_do_calendario_template.value, 10);
    const ano = parseInt(caixa_de_selecao_de_ano_do_calendario_template.value, 10);
    const dias = total_de_dias_do_mes(ano, mes);
    gerar_dias_do_mes(dias);
  });
  
  caixa_de_selecao_de_ano_do_calendario_template.addEventListener("change", function(){
    const mes = parseInt(caixa_de_selecao_de_mes_do_calendario_template.value, 10);
    const ano = parseInt(caixa_de_selecao_de_ano_do_calendario_template.value, 10);
    const dias = total_de_dias_do_mes(ano, mes);
    gerar_dias_do_mes(dias);
  });
  
  function total_de_dias_do_mes(ano, mes){
    const mes_seguinte = mes + 1;
    const total_de_dias_do_mes = new Date(ano, mes_seguinte - 1, 0).getDate();
    return total_de_dias_do_mes;
  }
  
  function gerar_dias_do_mes(dias){
    if(dia_selecionado > dias){
      dia_selecionado = dias;
    }
    
    const mes = parseInt(caixa_de_selecao_de_mes_do_calendario_template.value, 10);
    const ano = parseInt(caixa_de_selecao_de_ano_do_calendario_template.value, 10);
    const dia_da_semana_do_primeiro_dia_do_mes = new Date(ano, mes - 1, 1).getDay() + 1;
    const posicao_inicial = 7; //As posições de 0 a 6 são as legendas.
    const posicao_do_primeiro_dia = dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    const posicao_do_ultimo_dia = dias - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    let posicao_do_dia_selecionado = dia_selecionado - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    
    let numero_do_dia = 0;
    for(let i = posicao_inicial; i < celulas_do_calendario.length; i++){
      celulas_do_calendario[i].innerHTML = "";
      celulas_do_calendario[i].classList.remove("dia_do_calendario");
      celulas_do_calendario[i].classList.remove("dia_escolhido");
      celulas_do_calendario[i].removeEventListener("click", evento_selecionar_dia);
      
      if(i >= posicao_do_primeiro_dia && i <= posicao_do_ultimo_dia){
        numero_do_dia++;
        celulas_do_calendario[i].classList.remove("tag_oculta");
        celulas_do_calendario[i].classList.add("dia_do_calendario");
        celulas_do_calendario[i].innerHTML = "<span>" + numero_do_dia + "</span>";
        if(i === posicao_do_dia_selecionado){
          celulas_do_calendario[i].classList.add("dia_escolhido");
        }
        celulas_do_calendario[i].addEventListener("click", evento_selecionar_dia);
      }else if(i > posicao_do_ultimo_dia){
        celulas_do_calendario[i].classList.add("tag_oculta");
      }
    }
  }
  
  function evento_selecionar_dia(evento){
    const tag_que_disparou_o_evento = evento.currentTarget;
    for(let i = 0; i < celulas_do_calendario.length; i++){
      celulas_do_calendario[i].classList.remove("dia_escolhido");
    }
    tag_que_disparou_o_evento.classList.add("dia_escolhido");
    dia_selecionado = tag_que_disparou_o_evento.innerText;
  }
  
  botao_confirmar_do_calendario_template.addEventListener("click", function(){
    let dia = dia_selecionado;
    if(dia < 10){
      dia = "0" + dia;
    }
    
    let mes = parseInt(caixa_de_selecao_de_mes_do_calendario_template.value, 10);
    if(mes < 10){
      mes = "0" + mes;
    }
    
    const ano = parseInt(caixa_de_selecao_de_ano_do_calendario_template.value, 10);
    
    const valor = dia + "/" + mes + "/" + ano;
    if(campo_alvo_do_calendario !== null){
      campo_alvo_do_calendario.value = valor;
    }
    
    div_modelo_calendario_template.classList.add("tag_oculta");
  });
  
  /* Ocultando popups */
  div_modelo_calendario_template.addEventListener("click", function(){
    ocultar_div_modelo_calendario_template = false;
	});
  
  document.addEventListener("click", function(){
    if(ocultar_div_modelo_calendario_template){
      div_modelo_calendario_template.classList.add("tag_oculta");
    }else{
      ocultar_div_modelo_calendario_template = true;
    }
	});
});
