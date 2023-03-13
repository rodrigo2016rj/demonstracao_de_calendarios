window.addEventListener("load", function(){
  const campo_com_icone = document.getElementById("campo_com_icone");
  const span_calendario_para_o_campo_com_icone = document.getElementById("span_calendario_para_o_campo_com_icone");
  const campo_sem_icone = document.getElementById("campo_sem_icone");
  const div_seletor_de_data_para_o_campo_com_icone = document.getElementById("div_seletor_de_data_para_o_campo_com_icone");
  const div_seletor_de_data_para_o_campo_sem_icone = document.getElementById("div_seletor_de_data_para_o_campo_sem_icone");
  
  let ocultar_seletor_de_data_para_o_campo_com_icone = true;
  let ocultar_seletor_de_data_para_o_campo_sem_icone = true;
  
  campo_com_icone.addEventListener("click", function(){
    ocultar_seletor_de_data_para_o_campo_com_icone = false;
  });
  span_calendario_para_o_campo_com_icone.addEventListener("click", function(){
    if(div_seletor_de_data_para_o_campo_com_icone.classList.contains("tag_oculta")){
      div_seletor_de_data_para_o_campo_com_icone.classList.remove("tag_oculta");
      ocultar_seletor_de_data_para_o_campo_com_icone = false;
    }else{
      ocultar_seletor_de_data_para_o_campo_com_icone = true;
    }
  });
  span_calendario_para_o_campo_com_icone.addEventListener("mouseenter", function(){
    campo_com_icone.focus();
  });
  
  campo_sem_icone.addEventListener("click", function(){
    if(div_seletor_de_data_para_o_campo_sem_icone.classList.contains("tag_oculta")){
      div_seletor_de_data_para_o_campo_sem_icone.classList.remove("tag_oculta");
      ocultar_seletor_de_data_para_o_campo_sem_icone = false;
    }else{
      ocultar_seletor_de_data_para_o_campo_sem_icone = true;
    }
  });
  
  /* Impedindo clique duplo selecionar o texto */
  span_calendario_para_o_campo_com_icone.addEventListener("mousedown", function(evento){
    evento.preventDefault();
  });
  
  /* Ocultando popups */
  div_seletor_de_data_para_o_campo_com_icone.addEventListener("click", function(){
    ocultar_seletor_de_data_para_o_campo_com_icone = false;
  });
  div_seletor_de_data_para_o_campo_sem_icone.addEventListener("click", function(){
    ocultar_seletor_de_data_para_o_campo_sem_icone = false;
  });
  
  document.addEventListener("click", function(){
    if(ocultar_seletor_de_data_para_o_campo_com_icone){
      div_seletor_de_data_para_o_campo_com_icone.classList.add("tag_oculta");
    }else{
      ocultar_seletor_de_data_para_o_campo_com_icone = true;
    }
    
    if(ocultar_seletor_de_data_para_o_campo_sem_icone){
      div_seletor_de_data_para_o_campo_sem_icone.classList.add("tag_oculta");
    }else{
      ocultar_seletor_de_data_para_o_campo_sem_icone = true;
    }
  });
});
