# Weather App

A simple weather app built as part of my SheCodes assignment. You type in a city and it shows you the current conditions - temperature, humidity, wind speed, and a short description of what's going on outside.

**Live site:** https://serene-madeleine-53ef22.netlify.app/

## What it does

- Search for any city and get its current weather
- Shows temperature, humidity, wind speed, description and date/time
- Light and dark mode toggle (remembers your choice for next time)
- Loads Paris by default so the page isn't empty on first visit

## Built with

- HTML, CSS, JavaScript (no frameworks)
- [Open-Meteo](https://open-meteo.com/) for geocoding and weather data - it's free and doesn't need an API key
- Google Fonts (Fraunces + IBM Plex Mono + Roboto)

## Why I built it this way

This started from the SheCodes weather app project template but I changed a lot of the design myself - I redid the layout, added the dark mode toggle, and picked fonts that felt less generic. 

## Running it locally

Just clone the repo and open `index.html` in a browser - there's no build step or dependencies to install.

```
git clone https://github.com/akshara200829-lgtm/Weatherweb.git
cd Weatherweb
```

Then open `index.html` directly, or use a live server extension in VS Code if you want auto-reload.

## What I'd add next

- Search history / recent cities
- Hourly and weekly forecast, not just current conditions
- Better error handling when the city name is misspelled

## Author

Akshara S Kumar
GitHub: [@akshara200829-lgtm](https://github.com/akshara200829-lgtm)
