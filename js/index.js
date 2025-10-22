import pegarInfosClima from "./pegarInfosClima.js";
import colocarInfos from "./colocarInfos.js";
import cidadeErro from "./cidadeErro.js";

const botao = document.querySelector(".botao-pesquisa");
const input = document.querySelector(".input-pesquisa");


botao.addEventListener("click", async (e) => {

  e.preventDefault();

  const cidadePesquisada = input.value;

  if (!cidadePesquisada) cidadeErro();
  try{
    const [dadosClima , cidadeAchada , pais] = await pegarInfosClima(cidadePesquisada);
    colocarInfos(dadosClima, cidadeAchada, pais);
    input.value = '';
  } catch(e){
    cidadeErro();
  }
});
