const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')
const clearData = document.querySelector('.clear-btn')


const updateUi = (data) => {

    const cityDetailes = data.cityDetails
    const weather = data.weather

    details.innerHTML = `
                <h5 class="my-3">${cityDetailes.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
    `
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc)


        let timeSrc = weather.isDayTime ?  'img/day.svg' : 'img/night.svg'

    time.setAttribute('src', timeSrc)


    if (card.classList.contains('d-none')){
        card.classList.remove('d-none')
    } else {

    }

}

const updateCity = async (city) => {
    const cityDetails =  await getCity(city)
    const weather = await getWeatherInformation(cityDetails.Key)
    return {
        cityDetails: cityDetails,
        weather: weather
    };
}

cityForm.addEventListener('submit', e => {
    e.preventDefault()

    //getting city value
    const city = cityForm.city.value.trim()
    cityForm.reset()

    //updating the web
    updateCity(city).then(data => {
        updateUi(data)
    }).catch((e) => {
        console.log(e)
        swal("Somthing went wrong..", "Please enter valid location", "error")
        localStorage.removeItem('city')
    })

    localStorage.setItem('city', city)

})

if (localStorage.getItem('city')){
    updateCity(localStorage.getItem('city')).then( data => {
        updateUi(data)
    }).catch(err => {
        console.log(err)
    })
}


clearData.addEventListener('click', e => {
   localStorage.removeItem('city')
    location.reload();

})


