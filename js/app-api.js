const apiKey = 'csX36WBsKLLCD2czNHXvUlfbpoAl4hFZ';


const getWeatherInformation = async (id)=> {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${id}?apikey=${apiKey}`;

    const response = await fetch(base + query)
    const data = await response.json()
    return data[0]
};

const getCity = async (city) => {
    const base = `http://dataservice.accuweather.com/locations/v1/cities/search`
    const query = `?apikey=${apiKey}&q=${city}`
    const response = await fetch(base + query);
    const data = await response.json();

    return data[0]
};

