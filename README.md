# CADi: Diseña tu primer proyecto de innovación educativa

Sitio web estático para el Curso 1 del taller CADi (Puebla, junio 2026).  
Hospedado en GitHub Pages. Entrega de evidencias via Google Apps Script.

---

## Estructura del repositorio

```
/
├── index.html                  # Sitio completo (CSS y JS inline)
├── plantillas/
│   ├── Plantilla_0_Diagnostico.docx
│   ├── Plantilla_1_FichaNecesidad.docx
│   ├── Plantilla_2_GuionDidactico.docx
│   ├── Plantilla_3_Instrumentos.docx
│   ├── Plantilla_4_MatrizIndicadores.docx
│   └── Plantilla_5_MarcoEtico.docx
└── apps-script/
    └── Code.gs                 # Codigo del Web App en Google Apps Script
```

---

## Paso 1: Subir las plantillas

Coloca los seis archivos `.docx` dentro de la carpeta `plantillas/`  
con exactamente los nombres indicados arriba antes de hacer push.

---

## Paso 2: Desplegar el Apps Script

### 2a. Crear el proyecto

1. Ve a [script.google.com](https://script.google.com) e inicia sesion con la cuenta de Google que tiene acceso a la carpeta de Drive donde caerán las evidencias.
2. Crea un nuevo proyecto (puede ser standalone).
3. Borra el contenido del archivo `Code.gs` y pega el contenido de `apps-script/Code.gs` de este repositorio.

### 2b. Configurar el ID de la carpeta de Drive

1. Abre la carpeta de Google Drive donde quieres recibir las evidencias.
2. Copia el ID de la URL: `https://drive.google.com/drive/folders/ESTE_ES_EL_ID`
3. En el script, reemplaza:
   ```js
   var DRIVE_FOLDER_ID = 'DRIVE_FOLDER_ID_HERE';
   ```
   con tu ID real.

### 2c. Desplegar como aplicacion web

1. En el editor de Apps Script: **Implementar > Nueva implementacion**.
2. Tipo de implementacion: **Aplicacion web**.
3. Configura:
   - **Descripcion:** CADi Evidencias 2026
   - **Ejecutar como:** Yo (tu cuenta)
   - **Quienes tienen acceso:** Cualquier usuario
4. Haz clic en **Implementar** y autoriza los permisos que solicita (Drive, opcionalmente Sheets).
5. Copia la **URL de implementacion** que aparece. Tiene la forma:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

### 2d. Verificar el endpoint

Pega la URL en tu navegador. Debes ver:
```json
{"ok":true,"message":"CADi upload endpoint activo."}
```

---

## Paso 3: Conectar el sitio con el Apps Script

Abre `index.html` y busca la linea:

```js
const APPS_SCRIPT_URL = 'APPS_SCRIPT_URL_HERE';
```

Reemplaza `APPS_SCRIPT_URL_HERE` con la URL que copiaste en el paso 2d.

---

## Paso 4: Activar GitHub Pages

1. En el repositorio de GitHub: **Settings > Pages**.
2. Source: **Deploy from a branch**.
3. Branch: `main` (o `master`), carpeta `/` (raiz).
4. Guarda. En unos segundos el sitio estara disponible en:
   ```
   https://<tu-usuario>.github.io/<nombre-del-repo>/
   ```

---

## Notas de operacion

- Cada entrega crea una subcarpeta `[Nombre] - [correo]` dentro de tu carpeta de Drive.
- Si el script esta vinculado a una hoja de calculo (spreadsheet bound), tambien registra cada entrega en una hoja llamada "Entregas". Esto es opcional; si el script es standalone, esa funcion se omite sin error.
- Los participantes pueden subir archivos `.docx` o `.pdf`. El limite practico es el que imponga Apps Script en el tamano del body de un POST (~50 MB total en params URL-encoded, suficiente para documentos de texto).
- Si necesitas actualizar el Apps Script (por ejemplo, cambiar la carpeta de Drive), crea una **nueva implementacion** y actualiza la URL en `index.html`.

---

## Paleta de colores

| Variable      | Valor     | Uso                    |
|---------------|-----------|------------------------|
| `--tecteal`   | `#2766CB` | Azul primario (Tec)    |
| `--tecgold`   | `#DCA000` | Acento dorado          |
| `--tecsand`   | `#EBF2FB` | Fondo claro            |
| `--tecred`    | `#B91C1C` | Errores / indicadores  |
