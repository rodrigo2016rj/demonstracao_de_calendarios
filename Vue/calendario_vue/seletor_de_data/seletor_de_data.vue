<script>
export default{
  props: [
    "id_do_campo"
  ],
  data(){
    return{
      campo: document.getElementById(this.id_do_campo),
      icone_do_campo: document.getElementById("span_calendario_para_o_" + this.id_do_campo),
      anos: new Array (0),
      celulas: new Array (42),
      dia: null,
      mes: null,
      total_de_dias_do_mes: null,
      ano: null
    }
  },
  created(){
    this.campo.addEventListener("keyup", function(){
      this.atualizar_calendario();
    }.bind(this));
    this.atualizar_calendario();
  },
  methods: {
    atualizar_calendario(){
      const valor = this.campo.value;
      let dia;
      let mes;
      let total_de_dias_do_mes;
      let ano;
      
      if(valor !== null && valor.match(/^\d{2}\/(0[1-9]|1[0-2])\/\d{4}$/)){
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
        
        total_de_dias_do_mes = this.calcular_total_de_dias_do_mes(ano, mes);
        
        if(dia > total_de_dias_do_mes){
          dia = total_de_dias_do_mes;
        }
      }else{
        const data_atual = new Date();
        dia = data_atual.getDate();
        mes = data_atual.getMonth() + 1;
        ano = data_atual.getFullYear();
        total_de_dias_do_mes = this.calcular_total_de_dias_do_mes(ano, mes);
      }
      
      const menor_ano = ano - 7;
      const maior_ano = ano + 4;
      this.anos = new Array(0);
      for(let ano = menor_ano; ano <= maior_ano; ano++){
        this.anos.push(ano);
      }
      
      this.dia = dia;
      this.mes = mes;
      this.ano = ano;
      this.total_de_dias_do_mes = total_de_dias_do_mes;
      
      this.criar_array_de_celulas(total_de_dias_do_mes);
    },
    calcular_total_de_dias_do_mes(ano, mes){
      const mes_seguinte = mes + 1;
      const total_de_dias_do_mes = new Date(ano, mes_seguinte - 1, 0).getDate();
      return total_de_dias_do_mes;
    },
    criar_array_de_celulas(){
      if(this.dia > this.total_de_dias_do_mes){
        this.dia = this.total_de_dias_do_mes;
      }
      
      const dia_da_semana_do_primeiro_dia_do_mes = new Date(this.ano, this.mes - 1, 1).getDay() + 1;
      
      //O que eu represento fora do array, eu subtraio 1 antes de colocar no cálculo da posição no array.
      const posicao_do_primeiro_dia = dia_da_semana_do_primeiro_dia_do_mes - 1;
      const posicao_do_ultimo_dia = this.total_de_dias_do_mes - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1;
      let posicao_do_dia_selecionado = this.dia - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1;
      
      let numero_do_dia = 0;
      for(let i = 0; i < this.celulas.length; i++){
        var celula = {};
        
        celula.valor = "";
        celula.classe = new Array(0);
        celula.classe.push("celula_do_calendario");
        
        if(i >= posicao_do_primeiro_dia && i <= posicao_do_ultimo_dia){
          numero_do_dia++;
          celula.valor = numero_do_dia;
          
          celula.classe = new Array(0);
          celula.classe.push("celula_do_calendario");
          celula.classe.push("dia_do_calendario");
          if(i === posicao_do_dia_selecionado){
            celula.classe.push("dia_escolhido");
          }
        }else if(i > posicao_do_ultimo_dia){
          celula.classe = new Array(0);
          celula.classe.push("tag_oculta");
        }
        
        this.celulas[i] = celula;
      }
    },
    selecionar_dia(evento){
      if(evento.currentTarget.innerText == ""){
        return;
      }
      this.dia = evento.currentTarget.innerText;
      this.criar_array_de_celulas();
    },
    selecionar_mes(evento){
      this.mes = parseInt(evento.currentTarget.value, 10);
      this.total_de_dias_do_mes = this.calcular_total_de_dias_do_mes(this.ano, this.mes);
      this.criar_array_de_celulas();
    },
    selecionar_ano(evento){
      this.ano = parseInt(evento.currentTarget.value, 10);
      this.total_de_dias_do_mes = this.calcular_total_de_dias_do_mes(this.ano, this.mes);
      this.criar_array_de_celulas();
    },
    colocar_data_no_campo(){
      let dia = this.dia;
      if(dia < 10){
        dia = "0" + dia;
      }
      
      let mes = parseInt(this.mes, 10);
      if(mes < 10){
        mes = "0" + mes;
      }
      
      const ano = parseInt(this.ano, 10);
      
      const data = dia + "/" + mes + "/" + ano;
      this.campo.value = data;
      
      this.campo.dispatchEvent(new Event("input"));
      if(this.icone_do_campo !== null){
        this.icone_do_campo.click();
      }else{
        this.campo.click();
      }
    }
  }
}
</script>

<template>
  <div class="calendario">
    <div class="cabecalho_do_calendario">
      <span class="titulo_do_calendario">Calendário</span>
      <select class="caixa_de_selecao_de_mes_do_calendario" @change="selecionar_mes" :value="mes">
        <option class="opcao_mes" value="1">Janeiro</option>
        <option class="opcao_mes" value="2">Fevereiro</option>
        <option class="opcao_mes" value="3">Março</option>
        <option class="opcao_mes" value="4">Abril</option>
        <option class="opcao_mes" value="5">Maio</option>
        <option class="opcao_mes" value="6">Junho</option>
        <option class="opcao_mes" value="7">Julho</option>
        <option class="opcao_mes" value="8">Agosto</option>
        <option class="opcao_mes" value="9">Setembro</option>
        <option class="opcao_mes" value="10">Outubro</option>
        <option class="opcao_mes" value="11">Novembro</option>
        <option class="opcao_mes" value="12">Dezembro</option>
      </select>
      <select class="caixa_de_selecao_de_ano_do_calendario" @change="selecionar_ano" :value="ano">
        <option v-for="ano in anos" class="opcao_ano">{{ano}}</option>
      </select>
    </div>
    <div class="corpo_do_calendario">
      <div class="dias_do_calendario">
        <div class="celula_do_calendario">
          <span>Dom</span>
        </div>
        <div class="celula_do_calendario">
          <span>Seg</span>
        </div>
        <div class="celula_do_calendario">
          <span>Ter</span>
        </div>
        <div class="celula_do_calendario">
          <span>Qua</span>
        </div>
        <div class="celula_do_calendario">
          <span>Qui</span>
        </div>
        <div class="celula_do_calendario">
          <span>Sex</span>
        </div>
        <div class="celula_do_calendario">
          <span>Sáb</span>
        </div>
        <div v-for="celula in celulas" :class="celula.classe" @click="selecionar_dia">
          <span>{{celula.valor}}</span>
        </div>
      </div>
    </div>
    <div class="rodape_do_calendario">
      <div class="botoes_do_calendario">
        <button type="button" class="botao_do_calendario"
                @click="colocar_data_no_campo">Confirmar</button>
      </div>
    </div>
  </div>
</template>
