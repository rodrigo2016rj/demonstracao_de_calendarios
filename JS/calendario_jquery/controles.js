$(document).ready(function(){
  /* Calendário */
  const $campo_com_icone = $("#campo_com_icone");
  const $span_calendario_para_o_campo_com_icone = $("#span_calendario_para_o_campo_com_icone");
  const $campo_sem_icone = $("#campo_sem_icone");
  const $div_modelo_calendario_template = $("#div_modelo_calendario_template");
  const $caixa_de_selecao_de_mes_do_calendario_template = $("#caixa_de_selecao_de_mes_do_calendario_template");
  const $caixa_de_selecao_de_ano_do_calendario_template = $("#caixa_de_selecao_de_ano_do_calendario_template");
  const $celulas_do_calendario = $(".celula_do_calendario");
  const $botao_confirmar_do_calendario_template = $("#botao_confirmar_do_calendario_template");
  
  let dia_selecionado = null;
  let $campo_alvo_do_calendario = null;
  let ocultar_div_modelo_calendario_template = true;
  
  $campo_com_icone.keyup(function(){
    if($campo_alvo_do_calendario === $campo_com_icone){
      atualizar_calendario();
    }
  });
  $campo_sem_icone.keyup(function(){
    if($campo_alvo_do_calendario === $campo_sem_icone){
      atualizar_calendario();
    }
  });
  
  $campo_com_icone.click(function(){
    ocultar_div_modelo_calendario_template = false;
  });
  $campo_sem_icone.click(function(){
    ocultar_div_modelo_calendario_template = false;
    mostra_o_calendario($campo_sem_icone);
  });
  
  $span_calendario_para_o_campo_com_icone.click(function(){
    ocultar_div_modelo_calendario_template = false;
    mostra_o_calendario($campo_com_icone);
  });
  $span_calendario_para_o_campo_com_icone.mouseenter(function(){
    $campo_com_icone.focus();
  });
  /* Impedindo clique duplo selecionar o texto */
  $span_calendario_para_o_campo_com_icone.mousedown(function(evento){
    evento.preventDefault();
  });
  
  function mostra_o_calendario($campo_recebido){
    if($div_modelo_calendario_template.hasClass("tag_oculta") || $campo_alvo_do_calendario !== $campo_recebido){
      $campo_alvo_do_calendario = $campo_recebido;
      
      let posicao_x = $campo_alvo_do_calendario.offset().left;
      let posicao_y = $campo_alvo_do_calendario.offset().top;
      
      posicao_y += $campo_alvo_do_calendario.outerHeight();
      
      $div_modelo_calendario_template.css("position", "absolute");
      $div_modelo_calendario_template.css("left", posicao_x);
      $div_modelo_calendario_template.css("top", posicao_y);
      if(window.innerWidth <= 640){
        const largura_do_calendario = 347; //Em pixels.
        $div_modelo_calendario_template.css("left", window.innerWidth / 2 - largura_do_calendario / 2);
      }
      
      $div_modelo_calendario_template.removeClass("tag_oculta");
      
      atualizar_calendario();
    }else{
      $div_modelo_calendario_template.addClass("tag_oculta");
    }
  }
  
  function atualizar_calendario(){
    let valor = $campo_alvo_do_calendario.val();
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
    
    $caixa_de_selecao_de_mes_do_calendario_template.val(mes).change();
    
    const menor_ano = ano_referencia - 7;
    const maior_ano = ano_referencia + 4;
    $caixa_de_selecao_de_ano_do_calendario_template.html("");
    for(let i = menor_ano; i <= maior_ano; i++){
      let html_option = '<option value="' + i + '">' + i + "</option>";
      $caixa_de_selecao_de_ano_do_calendario_template.append(html_option);
    }
    $caixa_de_selecao_de_ano_do_calendario_template.val(ano).change();
    
    gerar_dias_do_mes(dias);
  }
  
  $caixa_de_selecao_de_mes_do_calendario_template.change(function(){
    const mes = parseInt($caixa_de_selecao_de_mes_do_calendario_template.val(), 10);
    const ano = parseInt($caixa_de_selecao_de_ano_do_calendario_template.val(), 10);
    const dias = total_de_dias_do_mes(ano, mes);
    gerar_dias_do_mes(dias);
  });
  
  $caixa_de_selecao_de_ano_do_calendario_template.change(function(){
    const mes = parseInt($caixa_de_selecao_de_mes_do_calendario_template.val(), 10);
    const ano = parseInt($caixa_de_selecao_de_ano_do_calendario_template.val(), 10);
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
    
    const mes = parseInt($caixa_de_selecao_de_mes_do_calendario_template.val(), 10);
    const ano = parseInt($caixa_de_selecao_de_ano_do_calendario_template.val(), 10);
    const dia_da_semana_do_primeiro_dia_do_mes = new Date(ano, mes - 1, 1).getDay() + 1;
    const posicao_inicial = 7; //As posições de 0 a 6 são as legendas.
    const posicao_do_primeiro_dia = dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    const posicao_do_ultimo_dia = dias - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    let posicao_do_dia_selecionado = dia_selecionado - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    
    let numero_do_dia = 0;
    $celulas_do_calendario.each(function(posicao){
      if(posicao < 7){
        return; //continue;
      }
      
      $(this).html("");
      $(this).removeClass("dia_do_calendario");
      $(this).removeClass("dia_escolhido");
      
      if(posicao >= posicao_do_primeiro_dia && posicao <= posicao_do_ultimo_dia){
        numero_do_dia++;
        $(this).removeClass("tag_oculta");
        $(this).addClass("dia_do_calendario");
        $(this).html("<span>" + numero_do_dia + "</span>");
        if(posicao === posicao_do_dia_selecionado){
          $(this).addClass("dia_escolhido");
        }
      }else if(posicao > posicao_do_ultimo_dia){
        $(this).addClass("tag_oculta");
      }
    });
  }
  
  $celulas_do_calendario.click(function(){
    if($(this).hasClass("dia_do_calendario")){
      $celulas_do_calendario.each(function(){
        $(this).removeClass("dia_escolhido");
      });
      
      $(this).addClass("dia_escolhido");
      dia_selecionado = $(this).text();
    }
  });
  
  $botao_confirmar_do_calendario_template.click(function(){
    let dia = dia_selecionado;
    if(dia < 10){
      dia = "0" + dia;
    }
    
    let mes = parseInt($caixa_de_selecao_de_mes_do_calendario_template.val(), 10);
    if(mes < 10){
      mes = "0" + mes;
    }
    
    const ano = parseInt($caixa_de_selecao_de_ano_do_calendario_template.val(), 10);
    
    const valor = dia + "/" + mes + "/" + ano;
    if($campo_alvo_do_calendario !== null){
      $campo_alvo_do_calendario.val(valor);
    }
    
    $div_modelo_calendario_template.addClass("tag_oculta");
  });
  
  /* Ocultando popups */
  $div_modelo_calendario_template.click(function(){
    ocultar_div_modelo_calendario_template = false;
  });
  
  $(document).click(function(){
    if(ocultar_div_modelo_calendario_template){
      $div_modelo_calendario_template.addClass("tag_oculta");
    }else{
      ocultar_div_modelo_calendario_template = true;
    }
  });
});
