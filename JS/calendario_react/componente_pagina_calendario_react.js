class ComponentePaginaCalendarioReact extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    this.state = {
      elemento_modelo: props.elemento.cloneNode(true)
    }
    
    props.elemento.remove();
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        if(atributo.nodeName === "class"){
          array_melhorado["className"] = atributo.nodeValue;
        }else{
          array_melhorado[atributo.nodeName] = atributo.nodeValue;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = "ComponentePaginaCalendarioReact tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "div_do_campo_com_icone":
          elemento = React.createElement(ComponenteDivDoCampoComIcone, {key: "ComponenteDivDoCampoComIcone", elemento: elemento}, null);
          return elemento;
        break;
        case "div_do_campo_sem_icone":
          elemento = React.createElement(ComponenteDivDoCampoSemIcone, {key: "ComponenteDivDoCampoSemIcone", elemento: elemento}, null);
          return elemento;
        break;
      }
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML fa??a o texto ser sempre "filho ??nico" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
  
}

class ComponenteDivDoCampoComIcone extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: null, //Valor do campo_com_icone
      calendario: {
        nome: "calendario_para_o_campo_com_icone",
        mostrar: false,
        valor: null, //String da data
        dia: null, //N??mero do dia
        mes: null, //N??mero do m??s
        ano: null, //N??mero do ano
        dias: null, //Quantidade de dias que um determinado m??s possui
        ano_referencia: null //N??mero do ano utilizado como refer??ncia para a faixa de anos
      },
      atualiza_todo_o_calendario: true,
      o_componente_ja_foi_montado: false
    }
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    this.state.o_componente_ja_foi_montado = true;
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        if(atributo.nodeName === "class"){
          array_melhorado["className"] = atributo.nodeValue;
        }else{
          array_melhorado[atributo.nodeName] = atributo.nodeValue;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = "ComponenteDivDoCampoComIcone tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_com_icone":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["onChange"] = () => this.atualizar_este_componente();
        break;
        case "span_calendario_para_o_campo_com_icone":
          array_atributos["onMouseDown"] = () => this.desfaz_selecao_de_texto();
          array_atributos["onClick"] = () => this.ativar_calendario();
        break;
        case "div_calendario_para_o_campo_com_icone":
          if(this.state.atualiza_todo_o_calendario){
            this.atualizar_todo_o_calendario();
          }
          const calendario = this.state.calendario;
          const funcoes = {
            registrar_escolha_de_dia: () => this.registrar_escolha_de_dia(),
            registrar_escolha_de_mes: () => this.registrar_escolha_de_mes(),
            registrar_escolha_de_ano: () => this.registrar_escolha_de_ano(),
            confirmar_escolha: () => this.confirmar_escolha()
          }
          elemento = React.createElement(ComponenteCalendario, {key: "ComponenteCalendario do campo com ??cone", calendario: calendario, funcoes: funcoes}, null);
          return elemento;
        break;
      }
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML fa??a o texto ser sempre "filho ??nico" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
  
  atualizar_este_componente(){
    this.state.valor = event.target.value;
    
    this.state.atualiza_todo_o_calendario = true;
    
    /* Chamando o m??todo setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  desfaz_selecao_de_texto(){
    event.preventDefault();
  }
  
  ativar_calendario(){
    this.state.calendario.mostrar = !this.state.calendario.mostrar;
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o m??todo setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  atualizar_todo_o_calendario(){
    const valor = this.state.valor;
    
    if(valor !== null && valor.match(/^\d{2}\/\d{2}\/\d{4}$/)){
      this.state.calendario.valor = valor;
      
      let dia = valor.substring(0, 2);
      let mes = valor.substring(3, 5);
      let ano = valor.substring(6, 10);
      
      if(dia.substring(0, 1) === "0"){
        dia = dia.substring(1, 2);
      }
      this.state.calendario.dia = parseInt(dia, 10);
      
      if(mes.substring(0, 1) === "0"){
        mes = mes.substring(1, 2);
      }
      this.state.calendario.mes = parseInt(mes, 10);
      
      this.state.calendario.ano = parseInt(ano, 10);
      
      this.state.calendario.dias = new Date(ano, mes, 0).getDate();
      
      this.state.calendario.ano_referencia = this.state.calendario.ano;
      
      if(this.state.calendario.dia > this.state.calendario.dias){
        this.state.calendario.dia = this.state.calendario.dias;
      }
    }else{
      this.state.calendario.valor = null;
      
      const data_atual = new Date();
      this.state.calendario.dia = data_atual.getDate();
      this.state.calendario.mes = data_atual.getMonth() + 1;
      this.state.calendario.ano = data_atual.getFullYear();
      this.state.calendario.dias = new Date(this.state.calendario.ano, this.state.calendario.mes, 0).getDate();
      this.state.calendario.ano_referencia = this.state.calendario.ano;
    }
  }
  
  registrar_escolha_de_dia(){
    const texto_do_dia = event.target.innerText;
    if(texto_do_dia === null || texto_do_dia === ""){
      return;
    }
    this.state.calendario.dia = texto_do_dia;
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o m??todo setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  registrar_escolha_de_mes(){
    this.state.calendario.mes = parseInt(event.target.value, 10);
    
    this.state.calendario.dias = new Date(this.state.calendario.ano, this.state.calendario.mes, 0).getDate();
    
    if(this.state.calendario.dia > this.state.calendario.dias){
      this.state.calendario.dia = this.state.calendario.dias;
    }
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o m??todo setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  registrar_escolha_de_ano(){
    this.state.calendario.ano = parseInt(event.target.value, 10);
    
    this.state.calendario.dias = new Date(this.state.calendario.ano, this.state.calendario.mes, 0).getDate();
    
    if(this.state.calendario.dia > this.state.calendario.dias){
      this.state.calendario.dia = this.state.calendario.dias;
    }
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o m??todo setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  confirmar_escolha(){
    let dia = this.state.calendario.dia;
    if(dia < 10){
      dia = "0" + dia;
    }
    
    let mes = this.state.calendario.mes;
    if(mes < 10){
      mes = "0" + mes;
    }
    
    const ano = this.state.calendario.ano;
    this.state.calendario.ano_referencia = this.state.calendario.ano;
    
    const valor = dia + "/" + mes + "/" + ano;
    this.state.calendario.valor = valor;
    this.state.valor = valor;
    
    this.state.calendario.mostrar = false;
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o m??todo setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
}

class ComponenteCalendario extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = document.getElementById("div_modelo_calendario_template");
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true)
    }
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        if(atributo.nodeName === "class"){
          array_melhorado["className"] = atributo.nodeValue;
        }else{
          array_melhorado[atributo.nodeName] = atributo.nodeValue;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = "ComponenteCalendario tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      array_atributos["id"] = array_atributos["id"].replace("modelo_", "");
      array_atributos["id"] = array_atributos["id"].replace("calendario_template", this.props.calendario.nome);
      switch(array_atributos["id"]){
        case "div_" + this.props.calendario.nome:
          if(window.innerWidth <= 640){
            const largura_do_calendario = 347; //Em pixels.
            var estilo = {
              left: window.innerWidth / 2 - largura_do_calendario / 2 + "px"
            }
            array_atributos["style"] = estilo;
          }
          array_atributos["className"] = this.props.calendario.mostrar ? "calendario" : "calendario tag_oculta";
        break;
        case "caixa_de_selecao_de_ano_do_" + this.props.calendario.nome:
          const ano_alvo = this.props.calendario.ano_referencia;
          const menor_ano = ano_alvo - 7;
          const maior_ano = ano_alvo + 4;
          
          conteudo_dinamico = Array(0);
          for(let ano = menor_ano; ano <= maior_ano; ano++){
            var atributos = {
              key: "option_ano_" + ano,
              value: ano
            }
            var react_option = React.createElement("option", atributos, ano);
            conteudo_dinamico.push(react_option);
          }
          array_atributos["value"] = this.props.calendario.ano;
          array_atributos["onChange"] = () => this.props.funcoes.registrar_escolha_de_ano();
        break;
        case "div_dias_do_" + this.props.calendario.nome:
          if(this.props.calendario.dia > this.props.calendario.dias){
            this.props.calendario.dia = this.props.calendario.dias;
          }
          
          const mes = this.props.calendario.mes;
          const ano = this.props.calendario.ano;
          const dia_da_semana_do_primeiro_dia_do_mes = new Date(ano, mes - 1, 1).getDay() + 1;
          const posicao_inicial = 7; //As posi????es de 0 a 6 s??o as legendas.
          const posicao_do_primeiro_dia = dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
          const posicao_do_ultimo_dia = this.props.calendario.dias - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
          let posicao_do_dia_selecionado = this.props.calendario.dia - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
          
          conteudo_dinamico = Array(0);
          var elemento_react_span = React.createElement("span", {key: "span_domingo"}, "Dom");
          const elemento_react_div_domingo = React.createElement("div", {key: "div_domingo", className: "celula_do_calendario"}, elemento_react_span);
          conteudo_dinamico.push(elemento_react_div_domingo);
          
          var elemento_react_span = React.createElement("span", {key: "span_segunda"}, "Seg");
          const elemento_react_div_segunda = React.createElement("div", {key: "div_segunda", className: "celula_do_calendario"}, elemento_react_span);
          conteudo_dinamico.push(elemento_react_div_segunda);
          
          var elemento_react_span = React.createElement("span", {key: "span_terca"}, "Ter");
          const elemento_react_div_terca = React.createElement("div", {key: "div_terca", className: "celula_do_calendario"}, elemento_react_span);
          conteudo_dinamico.push(elemento_react_div_terca);
          
          var elemento_react_span = React.createElement("span", {key: "span_quarta"}, "Qua");
          const elemento_react_div_quarta = React.createElement("div", {key: "div_quarta", className: "celula_do_calendario"}, elemento_react_span);
          conteudo_dinamico.push(elemento_react_div_quarta);
          
          var elemento_react_span = React.createElement("span", {key: "span_quinta"}, "Qui");
          const elemento_react_div_quinta = React.createElement("div", {key: "div_quinta", className: "celula_do_calendario"}, elemento_react_span);
          conteudo_dinamico.push(elemento_react_div_quinta);
          
          var elemento_react_span = React.createElement("span", {key: "span_sexta"}, "Sex");
          const elemento_react_div_sexta = React.createElement("div", {key: "div_sexta", className: "celula_do_calendario"}, elemento_react_span);
          conteudo_dinamico.push(elemento_react_div_sexta);
          
          var elemento_react_span = React.createElement("span", {key: "span_sabado"}, "S??b");
          const elemento_react_div_sabado = React.createElement("div", {key: "div_sabado", className: "celula_do_calendario"}, elemento_react_span);
          conteudo_dinamico.push(elemento_react_div_sabado);
          
          let numero_do_dia = 0;
          for(let i = posicao_inicial; i < 7*7; i++){
            var elemento = document.createElement("div");
            elemento.classList.add("celula_do_calendario");
            
            var elemento_react_span = React.createElement("span", null, null);
            
            if(i >= posicao_do_primeiro_dia && i <= posicao_do_ultimo_dia){
              numero_do_dia++;
              elemento_react_span = React.createElement("span", {key: "span_dia_" + numero_do_dia}, numero_do_dia);
              elemento.classList.add("dia_do_calendario");
              if(i === posicao_do_dia_selecionado){
                elemento.classList.add("dia_escolhido");
              }
            }else if(i > posicao_do_ultimo_dia){
              elemento.classList.add("tag_oculta");
            }
            
            const on_clique = () => this.props.funcoes.registrar_escolha_de_dia();
            var elemento_react_dia = React.createElement("div", {key: "celula_do_calendario_" + i, className: elemento.getAttribute("class"), onClick: on_clique}, elemento_react_span);
            conteudo_dinamico.push(elemento_react_dia);
          }
        break;
        case "caixa_de_selecao_de_mes_do_" + this.props.calendario.nome:
          array_atributos["value"] = this.props.calendario.mes;
          array_atributos["onChange"] = () => this.props.funcoes.registrar_escolha_de_mes();
        break;
        case "botao_confirmar_do_" + this.props.calendario.nome:
          array_atributos["onClick"] = () => this.props.funcoes.confirmar_escolha();
        break;
      }
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML fa??a o texto ser sempre "filho ??nico" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
}

class ComponenteDivDoCampoSemIcone extends React.Component{
  chave_do_react;
  
  constructor(props){
    super(props);
    
    const elemento = props.elemento;
    
    this.state = {
      elemento_modelo: elemento.cloneNode(true),
      valor: null, //Valor do campo_sem_icone
      calendario: {
        nome: "calendario_para_o_campo_sem_icone",
        mostrar: false,
        valor: null, //String da data
        dia: null, //N??mero do dia
        mes: null, //N??mero do m??s
        ano: null, //N??mero do ano
        dias: null, //Quantidade de dias que um determinado m??s possui
        ano_referencia: null //N??mero do ano utilizado como refer??ncia para a faixa de anos
      },
      atualiza_todo_o_calendario: true,
      o_componente_ja_foi_montado: false
    }
  }
  
  render(){
    this.chave_do_react = 1;
    return ["\n", this.html_para_react(this.state.elemento_modelo)];
  }
  
  componentDidMount(){
    this.state.o_componente_ja_foi_montado = true;
  }
  
  html_para_react(elemento){
    let nome_da_tag = elemento.tagName.toLowerCase();
    
    let array_atributos = elemento.attributes;
    let array_melhorado = Array();
    if(typeof array_atributos !== "undefined"){
      for(let i = 0; i < array_atributos.length; i++){
        let atributo = array_atributos[i];
        if(atributo.nodeName === "class"){
          array_melhorado["className"] = atributo.nodeValue;
        }else{
          array_melhorado[atributo.nodeName] = atributo.nodeValue;
        }
      }
    }
    array_atributos = array_melhorado;
    
    array_atributos["key"] = "ComponenteDivDoCampoSemIcone tag " + this.chave_do_react; //React precisa disso.
    this.chave_do_react++;
    
    let conteudo_dinamico = "";
    if(typeof array_atributos["id"] !== "undefined"){
      switch(array_atributos["id"]){
        case "campo_sem_icone":
          if(this.state.o_componente_ja_foi_montado === false){
            this.state.valor = elemento.value;
          }
          array_atributos["value"] = this.state.valor;
          array_atributos["onChange"] = () => this.atualizar_este_componente();
          array_atributos["onClick"] = () => this.ativar_calendario();
        break;
        case "div_calendario_para_o_campo_sem_icone":
          if(this.state.atualiza_todo_o_calendario){
            this.atualizar_todo_o_calendario();
          }
          const calendario = this.state.calendario;
          const funcoes = {
            registrar_escolha_de_dia: () => this.registrar_escolha_de_dia(),
            registrar_escolha_de_mes: () => this.registrar_escolha_de_mes(),
            registrar_escolha_de_ano: () => this.registrar_escolha_de_ano(),
            confirmar_escolha: () => this.confirmar_escolha()
          }
          elemento = React.createElement(ComponenteCalendario, {key: "ComponenteCalendario do campo sem ??cone", calendario: calendario, funcoes: funcoes}, null);
          return elemento;
        break;
      }
    }
    
    let elemento_react;
    if(conteudo_dinamico !== ""){
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudo_dinamico);
    }else{
      let conteudos = Array();
      let tags_filhas = elemento.children;
      for(let i = 0; i < tags_filhas.length; i++){
        let tag = tags_filhas[i];
        conteudos.push("\n");
        conteudos.push(this.html_para_react(tag));
        if(i == tags_filhas.length - 1){
          conteudos.push("\n");
        }
      }
      /* No HTML fa??a o texto ser sempre "filho ??nico" de alguma tag, exemplo: <span>Texto</span> */
      if(conteudos.length === 0){
        conteudos = elemento.innerText !== "" ? elemento.innerText : null;
      }
      
      elemento_react = React.createElement(nome_da_tag, array_atributos, conteudos);
    }
    
    return elemento_react;
  }
  
  atualizar_este_componente(){
    this.state.valor = event.target.value;
    
    this.state.atualiza_todo_o_calendario = true;
    
    /* Chamando o m??todo setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  ativar_calendario(){
    this.state.calendario.mostrar = !this.state.calendario.mostrar;
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o m??todo setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  atualizar_todo_o_calendario(){
    const valor = this.state.valor;
    
    if(valor !== null && valor.match(/^\d{2}\/\d{2}\/\d{4}$/)){
      this.state.calendario.valor = valor;
      
      let dia = valor.substring(0, 2);
      let mes = valor.substring(3, 5);
      let ano = valor.substring(6, 10);
      
      if(dia.substring(0, 1) === "0"){
        dia = dia.substring(1, 2);
      }
      this.state.calendario.dia = parseInt(dia, 10);
      
      if(mes.substring(0, 1) === "0"){
        mes = mes.substring(1, 2);
      }
      this.state.calendario.mes = parseInt(mes, 10);
      
      this.state.calendario.ano = parseInt(ano, 10);
      
      this.state.calendario.dias = new Date(ano, mes, 0).getDate();
      
      this.state.calendario.ano_referencia = this.state.calendario.ano;
      
      if(this.state.calendario.dia > this.state.calendario.dias){
        this.state.calendario.dia = this.state.calendario.dias;
      }
    }else{
      this.state.calendario.valor = null;
      
      const data_atual = new Date();
      this.state.calendario.dia = data_atual.getDate();
      this.state.calendario.mes = data_atual.getMonth() + 1;
      this.state.calendario.ano = data_atual.getFullYear();
      this.state.calendario.dias = new Date(this.state.calendario.ano, this.state.calendario.mes, 0).getDate();
      this.state.calendario.ano_referencia = this.state.calendario.ano;
    }
  }
  
  registrar_escolha_de_dia(){
    const texto_do_dia = event.target.innerText;
    if(texto_do_dia === null || texto_do_dia === ""){
      return;
    }
    this.state.calendario.dia = texto_do_dia;
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o m??todo setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  registrar_escolha_de_mes(){
    this.state.calendario.mes = parseInt(event.target.value, 10);
    
    this.state.calendario.dias = new Date(this.state.calendario.ano, this.state.calendario.mes, 0).getDate();
    
    if(this.state.calendario.dia > this.state.calendario.dias){
      this.state.calendario.dia = this.state.calendario.dias;
    }
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o m??todo setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  registrar_escolha_de_ano(){
    this.state.calendario.ano = parseInt(event.target.value, 10);
    
    this.state.calendario.dias = new Date(this.state.calendario.ano, this.state.calendario.mes, 0).getDate();
    
    if(this.state.calendario.dia > this.state.calendario.dias){
      this.state.calendario.dia = this.state.calendario.dias;
    }
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o m??todo setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
  
  confirmar_escolha(){
    let dia = this.state.calendario.dia;
    if(dia < 10){
      dia = "0" + dia;
    }
    
    let mes = this.state.calendario.mes;
    if(mes < 10){
      mes = "0" + mes;
    }
    
    const ano = this.state.calendario.ano;
    this.state.calendario.ano_referencia = this.state.calendario.ano;
    
    const valor = dia + "/" + mes + "/" + ano;
    this.state.calendario.valor = valor;
    this.state.valor = valor;
    
    this.state.calendario.mostrar = false;
    
    this.state.atualiza_todo_o_calendario = false;
    
    /* Chamando o m??todo setState para renderizar o componente novamente. */
    this.setState(
      {
        elemento_modelo: this.state.elemento_modelo,
        valor: this.state.valor,
        calendario: this.state.calendario,
        atualiza_todo_o_calendario: this.state.atualiza_todo_o_calendario,
        o_componente_ja_foi_montado: this.state.o_componente_ja_foi_montado
      }
    );
  }
}

const elemento = document.getElementById("div_pagina_calendario_react");

ReactDOM.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(ComponentePaginaCalendarioReact, {elemento: elemento}, null)
  ),
  document.getElementById("div_componente_pagina_calendario_react")
);
