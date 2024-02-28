// Unfortunately, directly converting latitude and longitude to a location name (city, state, etc.) is not possible using pure JavaScript without any external APIs. This process, called reverse geocoding, requires accessing geographical databases and translating coordinates into human-readable addresses. JavaScript alone doesn't have this built-in functionality.

const button = document.getElementById('get-location-button')
const buttonForIP = document.getElementById('get-ip-button')



async function getData(lat, long) {
    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=6afaaa33cf0449e0a2975348242702&q=${lat},${long}&aqi=yes`
    )
    return await promise.json()
}


async function gotlocation(position) {
    const res = await getData(position.coords.latitude, position.coords.longitude);
    const locationName = (res.location.name)
    const locationRegion = (res.location.region)
    document.getElementById('data').innerHTML = `The Location is ${locationName}, ${locationRegion}`
}


function failedToGetLocation() {
    console.log("There was some issue to fetch the location");
}


async function getIP() {
    const fetchData = await fetch('https://api.ipify.org/?format=json')
    const fetchIP = await fetchData.json()
    document.getElementById('data-ip').innerHTML = `The IP address is ${fetchIP.ip}`
}


button.addEventListener('click', async () => {
    navigator.geolocation.getCurrentPosition(gotlocation, failedToGetLocation)
})


buttonForIP.addEventListener('click', getIP)
