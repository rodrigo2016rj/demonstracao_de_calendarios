import { createApp } from "vue";
import seletor_de_data from "./seletor_de_data.vue";

var props = {
  id_do_campo: "campo_com_icone"
};
createApp(seletor_de_data, props).mount("#div_seletor_de_data_para_o_campo_com_icone");

var props = {
  id_do_campo: "campo_sem_icone"
};
createApp(seletor_de_data, props).mount("#div_seletor_de_data_para_o_campo_sem_icone");
