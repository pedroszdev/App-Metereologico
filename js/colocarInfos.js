export default function colocarInfos(dadosClima, cidadeAchada, pais) {

  colocarTitulo(dadosClima,cidadeAchada,pais);

  colocarClimaHora(dadosClima);

  colocarClimaInfos(dadosClima);

  colocarPrevisaoDiaria(dadosClima);
  
}

function colocarTitulo(dadosClima,cidadeAchada,pais){
    const diaSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabádo",
  ];
  const mes = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
    const local = document.querySelector(".local");
    const graus = document.querySelector(".graus");
    const data = new Date();
    const clima = DescodificandoClima(dadosClima.codigoClima)
    local.innerHTML = `<h2>${cidadeAchada}, ${pais}</h2>
                <p>${diaSemana[data.getDay()]}, ${mes[data.getMonth()]} ${data.getDate()}, ${data.getFullYear()}</p>`;
    graus.innerHTML = `<img src="${clima}" alt="" />
                <p>${dadosClima.temperaturaAtual}° </p>`;
}

function colocarClimaHora(dadosClima){

    const climaHora = document.querySelector(".clima-hora");
    climaHora.innerHTML = '<div class="titulo-hora"><h2>Previsão horária</h2></div>'
    for (let i = 0; i < 24; i++) {
        const hora = document.createElement("div");
        hora.className = "hora";
        const clima = DescodificandoClima(dadosClima.temperaturaHoras.weather_code[i])
        if (i < 10) {
        hora.innerHTML = `<div>
                            <img src= "${clima}" alt="" />
                            <p>0${i}:00</p>
                            </div>
                            <p>${dadosClima.temperaturaHoras.temperature_2m[i]}°</p>
                        </div>`;
        climaHora.appendChild(hora);

        } else {
        hora.innerHTML = `<div>
                                <img src= "${clima}" alt="" />
                                <p>${i}:00</p>
                                </div>
                                <p>${dadosClima.temperaturaHoras.temperature_2m[i]}°</p>
                            </div>`;
        climaHora.appendChild(hora);
        }
    }
}

function colocarClimaInfos(dadosClima){
    const climaInfos = document.querySelector(".clima-infos");
    climaInfos.innerHTML = "";
    const sensacaoTermica = document.createElement("div");
    sensacaoTermica.className = "infos";
    sensacaoTermica.innerHTML = `<h4>Sensação Térmica</h4>
                            <p>${dadosClima.sensacaoTermica}°</p>`;
    climaInfos.appendChild(sensacaoTermica);

    const umidade = document.createElement("div");
    umidade.className = "infos";
    umidade.innerHTML = `<h4>Umidade</h4>
                            <p>${dadosClima.umidade}%</p>`;
    climaInfos.appendChild(umidade);

    const velocidadeVento = document.createElement("div");
    velocidadeVento.className = "infos";
    velocidadeVento.innerHTML = `<h4>velocidade Vento</h4>
                            <p>${dadosClima.velocidadeVento} km/h</p>`;
    climaInfos.appendChild(velocidadeVento);

    const precipitacao = document.createElement("div");
    precipitacao.className = "infos";
    precipitacao.innerHTML = `<h4>Precipitação</h4>
                            <p>${dadosClima.precipitacao} mm</p>`;
    climaInfos.appendChild(precipitacao);
}

function colocarPrevisaoDiaria(dadosClima){
    const diaSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabádo",
  ];
    const dias = document.querySelector(".dias");
    dias.innerHTML = "";
    
    for (let i=0; i<7;i++){
        const dia = document.createElement('div');
        const diaDaSemana = new Date(dadosClima.previsaoSeteDias.time[i]);
        diaDaSemana.setHours(diaDaSemana.getHours() + 3);
        const clima = DescodificandoClima(dadosClima.previsaoSeteDias.weather_code[i])
        dia.className = 'dia';
            dia.innerHTML = `<p>${diaSemana[diaDaSemana.getDay()]}</p>
                            <img src="${clima}" alt="" />
                            <div class="grau-dia">
                            <p>${dadosClima.previsaoSeteDias.temperature_2m_min[i]}°</p>
                            <p>${dadosClima.previsaoSeteDias.temperature_2m_max[i]}°</p>
                            </div>`
            dias.appendChild(dia)
    }
}
function DescodificandoClima(codigo){
  switch (codigo) {
    // ceu limpo
    case 0 || 1:
      return './assets/images/icon-sunny.webp'

    // nublado
    case 2 || 3:
      return './assets/images/icon-partly-cloudy.webp'

    // neblina
    case 45 || 48:
      return './assets/images/icon-overcast.webp'

    // chuvisco
    case 51 || 53 || 55:
      return './assets/images/icon-drizzle.webp'
    
    // chuva
    case 61 || 63 || 65 || 80 || 81 || 82:
      return './assets/images/icon-rain.webp'

    // chuva congelante
    case 66 || 67:
      return './assets/images/icon-fog.webp'

    // neve
    case 71 || 73 || 75 || 77 || 85 || 86:
      return './assets/images/icon-snow.webp'

    // trovoada
    case 95 || 96 || 99:
      return './assets/images/icon-storm.webp'

    default:
      return './assets/images/icon-partly-cloudy.webp'
  }
}