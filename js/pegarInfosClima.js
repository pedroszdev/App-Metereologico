import cidadeErro from "./cidadeErro.js";

async function pegarLatLon(cidade) {
  const geoApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt`;
  try {
    const geoResponse = await fetch(geoApiUrl);
    if (!geoResponse.ok) {
      throw new Error(`Erro na Geocodificação: ${geoResponse.status}`);
    }
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      return;
    }

    const location = geoData.results[0];
    const lat = location.latitude;
    const lon = location.longitude;
    return [lat, lon, location.name, location.country];
  } catch (e) {
    cidadeErro();
  }
}
export default async function pegarInfosClima(cidadePesquisada,) {
    try{
        const [lat, lon, cidade, pais] = await pegarLatLon(cidadePesquisada);
        const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=weather_code,temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America/Sao_Paulo`;
        const weatherResponse = await fetch(weatherApiUrl);
        if (!weatherResponse.ok) {
            throw new Error(`Erro na API de Clima: ${weatherResponse.status}`);
        }
        const weatherData = await weatherResponse.json();
        const dadosClima = {
            temperaturaAtual: weatherData.current.temperature_2m,
            sensacaoTermica: weatherData.current.apparent_temperature,
            umidade: weatherData.current.relative_humidity_2m,
            precipitacao: weatherData.current.precipitation,
            codigoClima: weatherData.current.weather_code,
            velocidadeVento: weatherData.current.wind_speed_10m,
            temperaturaHoras: weatherData.hourly,
            previsaoSeteDias: weatherData.daily,
        };
        return [dadosClima , cidade , pais];
    } catch(e){
        cidadeErro();
    }
}
