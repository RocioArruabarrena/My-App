TMDb Movies App
Descripción:
Aplicación móvil desarrollada en React Native con Expo, que consume la API de The Movie Database (TMDb).
Muestra la información de una película específica (ID: 1038392), incluyendo título, descripción, fecha de estreno, duración y promedio de votos.
Al tocar una película, se navega a la pantalla de detalle.


Instalación y ejecución:

Clonar el repositorio=

git clone https://github.com/RocioArruabarrena/My-App.git
cd My-App


Instalar dependencias=

npm install


Iniciar la aplicación=

npx expo start


Ver la app:

En el navegador (Expo Web)
O escaneando el código QR con la app Expo Go en el celular Android
O escanear con la camara en el celular IOs

Tecnologías usadas:
React Native
Expo
React Navigation
The Movie Database API (TMDb)

Estructura del proyecto:

My-App/
│
├── app/
│   ├── _layout.js
│   └── page.js
│
├── screens/
│   ├── MovieScreen.js
│   └── MovieDetailScreen.js
│
├── services/
│   └── tmdbService.js
│
├── App.js
├── app.json
├── package-lock.json
├── package.json
└── README.md

Película usada:

ID: 1038392
Se obtiene desde el endpoint oficial:
https://api.themoviedb.org/3/movie/1038392?api_key=TU_API_KEY&language=es-ES