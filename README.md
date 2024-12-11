
# ToDoApp

Esta es una aplicación de tareas desarrollada en Ionic v7 con Angular v18. También se utilizó firebase con una flag (bandera) que permite entender el poder de esta herramienta en el desarrollo mobile.




## Requerimientos

Asegúrate de tener instalados los siguientes requisitos antes de empezar:

- [Node.js](https://nodejs.org/) v16 o superior.
- [Ionic CLI](https://ionicframework.com/docs/cli) instalado globalmente (v7):
  ```bash
  npm install -g @ionic/cli
  ```
Asegúrate de disponer de una cuenta de firebase

## Configuración inicial

Clonar el repositorio
```bash
  git clone https://github.com/julemole/toDoApp.git
  ```

  Instalar dependencias
```bash
  npm install
  ```

  Configuración firebase

- Crea tu proyecto en firebase y sigue las instrucciones para agregar las aplicaciones (android y ios)
- Android: Descarga google-services.json desde Firebase Console y colócalo en:

    ```bash
    android/app/src
    ```
- iOS: Descarga GoogleService-Info.plist desde Firebase Console y colócalo en:

    ```bash
    ios/App/App/

    ```

Configuración Capacitor
```bash
  ionic cap sync 
  ```
## Ejecución

- Ejecutar en Android (Asegúrate de que Android Studio esté instalado)

    ```bash
    ionic cap open android
    ```
- Ejecutar en iOS (Asegúrate de que Xcode esté instalado (solo en macOS).)

    ```bash
    ionic cap open ios
    ```

## Imágenes de la aplicación

![Imagen de WhatsApp 2024-12-11 a las 08 19 43_ad9b54c4](https://github.com/user-attachments/assets/1569b6d5-7889-41f5-8aaf-6e65a418b092)

![Imagen de WhatsApp 2024-12-11 a las 08 19 43_3330035c](https://github.com/user-attachments/assets/a064d7f5-2e06-4c44-85c2-555485adc05b)

![Imagen de WhatsApp 2024-12-11 a las 08 19 43_9da3c54d](https://github.com/user-attachments/assets/aa63737c-de1a-40e8-be84-34a57f25127b)

![Imagen de WhatsApp 2024-12-11 a las 08 19 43_d4692945](https://github.com/user-attachments/assets/f0f7f27c-0669-496d-a65f-f85f268391c3)

![Imagen de WhatsApp 2024-12-11 a las 08 19 44_c525c61f](https://github.com/user-attachments/assets/8e9f96eb-7cc7-4ead-8d2a-1132637e3a64)

![Imagen de WhatsApp 2024-12-11 a las 08 19 44_4ffcc8fa](https://github.com/user-attachments/assets/a0c58cbf-d34f-4380-b5f9-6ecd33f585db)

![Imagen de WhatsApp 2024-12-11 a las 08 19 44_2500387e](https://github.com/user-attachments/assets/b971aad8-dd29-4932-b674-d6c5fe012457)

![Imagen de WhatsApp 2024-12-11 a las 08 19 44_647e5dd7](https://github.com/user-attachments/assets/2ab1ea6e-317a-4b02-9b0b-2985d7d683e8)

![Imagen de WhatsApp 2024-12-11 a las 08 19 44_78169b11](https://github.com/user-attachments/assets/331baf53-cd17-4522-8709-32e94e42eaa7)

![image](https://github.com/user-attachments/assets/ff55a77d-46ee-48c5-bc41-0a39e8ffa122)

















