let ipAddress = document.getElementById('ip-address');
let locationName = document.getElementById('location');
let timezoneVal = document.getElementById('timezone');
let ispValue = document.getElementById('isp');
let searchBtn = document.getElementById('search');
let inputIP = document.getElementById('input');

const url = 'https://geo.ipify.org/api/v2/country,city?apiKey=';
const API_KEY = 'at_S3ksYxL2my32BU1domlf79MEWq8Zj';
var map;
let counter = 0;

window.onload = () => {
    ipgeolocationapiCALL(url, API_KEY);
}

searchBtn.addEventListener('click', () => {
    ipgeolocationapiCALL(url, API_KEY, inputIP.value);
})


function ipgeolocationapiCALL(url, API_KEY, value) {
    fetch(`${url}${API_KEY}&ipAddress=${inputIP.value}`).then((response) => {
        return response.json();
    }).then(({ as, ip, isp, location }) => {
        // console.log(response);
        const { country, region, city, lat, lng, postalCode, timezone, geonameId } = location;
        ipAddress.innerHTML = ip;
        locationName.innerHTML = `${city},${country},<br>${geonameId}`
        timezoneVal.textContent = `UTC ${timezone}`;
        ispValue.textContent = isp;


        if (counter === 0) {
            generateMap(lat, lng);
        } else {
            var newIcon = L.icon({
                iconUrl: './images/marker.svg',
                iconSize: [50, 64]
            })

            L.marker([lat, lng], { icon: newIcon })
                .addTo(map)
                .bindPopup("Your IP Shows You Here")
                .openPopup();
        }
        counter++;
    });
}

function generateMap(lat, lng) {
    map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var newIcon = L.icon({
        iconUrl: './images/marker.svg',
        iconSize: [50, 64]
    })

    L.marker([lat, lng], { icon: newIcon }).addTo(map)
        .bindPopup('Your Current Location brooooo')
        .openPopup();

}