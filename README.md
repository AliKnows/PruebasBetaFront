# SistemaPruebas Frontend

Este proyecto es el frontend de **SistemaPruebas**, desarrollado con **Angular** y **Tailwind CSS**, pensado para interactuar con un backend Laravel vía API RESTful.

---

## Especificaciones del entorno

- **Angular CLI**: 21.2.13
- **Node.js**: 22.22.3
- **npm**: 10.9.8
- **Sistema Operativo**: Windows (win32 x64)
- **CSS**: Tailwind CSS

---

## Instalación

1. **Clona el repositorio**
    ```bash
    git clone https://github.com/TU_USUARIO/TU_REPO_FRONTEND.git
    cd TU_REPO_FRONTEND
    ```

2. **Instala las dependencias**
    ```bash
    npm install
    ```

3. **Configura las variables de entorno**
    - Si usas ambientes personalizados, puedes crear un archivo `src/environments/environment.ts` y especificar ahí la URL del backend, por ejemplo:
      ```typescript
      export const environment = {
        production: false,
        apiUrl: 'http://localhost:8000/api'
      };
      ```

---

## Ejecución del proyecto en desarrollo

```bash
ng serve
```
- Accede a la aplicación desde: [http://localhost:4200](http://localhost:4200)

---

## Compilación para producción

```bash
ng build --configuration=production
```
- Los archivos de salida estarán en la carpeta `/dist`.

---

## Configuración y uso de Tailwind CSS

- Tailwind CSS ya viene preconfigurado.
- Utiliza las clases de Tailwind directamente en tus templates `.html`.

---

## Estructura de carpetas principal

```
src/
 ├─ app/
 │   ├─ pages/
 │   ├─ components/
 │   ├─ services/
 │   └─ ...
 ├─ assets/
 ├─ environments/
 ├─ index.html
 └─ main.ts
```

---

## Recomendaciones

- Utiliza Node.js 22+ y npm 10+ como versiones mínimas para evitar incompatibilidades.
- Si usas Angular HTTP para consumir tu backend, asegúrate de tener bien configurado CORS en el backend.
- Ten a mano el token de autenticación para acceder a rutas protegidas.

---

## Contribución y desarrollo

1. Crea una rama para tu feature:
    ```bash
    git checkout -b mi-feature
    ```
2. Haz tus cambios y commitea:
    ```bash
    git add .
    git commit -m "Tu mensaje"
    ```
3. Sube los cambios y abre un Pull Request.

---

## Recursos útiles

- [Documentación Angular](https://angular.io/docs)
- [Documentación Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación Node.js](https://nodejs.org/es/docs)
- [Documentación NPM](https://docs.npmjs.com/)

---

## Créditos

Desarrollado por Ali Astete Romero .

---