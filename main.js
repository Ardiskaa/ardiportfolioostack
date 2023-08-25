// Clear form
window.onbeforeunload = () => {
    const forms = document.getElementsByTagName("form");
    for (const form of forms) {
        form.reset();
    }
};

// Efek Teks Ketikan
const typedText = "I'm a Computer Science student at Udayana University. I blend innovation into practical projects and love turning ideas into reality. Let's discover my creative journey together!";
let currentText = "";
let index = 0;
const textElement = document.querySelector(".fs-3");

function type() {
    if (index < typedText.length) {
        currentText += typedText[index];
        textElement.textContent = currentText;
        index++;
        setTimeout(type, 50);
    }
}
type();

// Animasi Project

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                observer.unobserve(entry.target);
            }
        });
    });

    cards.forEach((card) => {
        observer.observe(card);
    });
});

// Informasi Cuaca
function getWeather() {
    const apiKey = "1cff9211067d6e1132404148e0b3734b";
    const weatherInfoElement = document.getElementById("weatherInfo");

    // Geolocation API lokasi pengguna
    navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                const weatherDescription = data.weather[0].description;
                const cityName = data.name;
                const tempCelsius = (data.main.temp - 273.15).toFixed(2);

                const iconCode = data.weather[0].icon;
                const weatherIcon = `<i class="fas fa-2x ${getWeatherIconClass(iconCode)}"></i>`;

                const weatherInfo = `<p><strong>${weatherIcon} Cuaca di ${cityName}:</strong> ${weatherDescription}. Suhu: ${tempCelsius}°C</p>`;
                weatherInfoElement.innerHTML = weatherInfo;
            })
            .catch((error) => {
                console.error("Terjadi kesalahan:", error);
                weatherInfoElement.innerHTML = "<p>Tidak dapat mengambil informasi cuaca.</p>";
            });
    });
}

function getWeatherIconClass(iconCode) {
    // Icon
    switch (iconCode) {
        case "01d":
        case "01n":
            return "fa-sun";
        case "02d":
        case "02n":
            return "fa-cloud-sun";
        case "03d":
        case "03n":
            return "fa-cloud";
        case "04d":
        case "04n":
            return "fa-cloud-meatball";
        case "09d":
        case "09n":
            return "fa-cloud-showers-heavy";
        case "10d":
        case "10n":
            return "fa-cloud-rain";
        case "11d":
        case "11n":
            return "fa-bolt";
        case "13d":
        case "13n":
            return "fa-snowflake";
        case "50d":
        case "50n":
            return "fa-smog";
        default:
            return "fa-question";
    }
}
