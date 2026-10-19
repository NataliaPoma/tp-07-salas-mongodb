# Trabajo práctico 07

## Punto de partida y nombre de la copia
El proyecto parte del **TP6**, donde la aplicación estaba modularizada en múltiples archivos.  
La copia actual se denomina **tp-07-salas-mongodb**, y agrega conexión a base de datos en la nube.

---

## Versiones utilizadas y Atlas Free (M0)
- Node.js v20.x  
- npm v10.x  
- MongoDB Atlas Free (M0) en clúster gratuito

---

## Pasos desde una descarga nueva
1. Clonar el repositorio:
   ```bash
   git clone <https://github.com/NataliaPoma/tp-06-salas-modular>
   cd tp-07-salas-mongodb
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Preparar clúster gratuito en Atlas:
- Crear cuenta en MongoDB Atlas.
- Crear proyecto y clúster Free (M0).
- Crear usuario de base de datos con usuario/clave.
- Configurar acceso de red: permitir IP de la PC o 0.0.0.0/0.

4. Copiar plantilla de entorno:
  ```bash
  cp .env.example .env
  ```
Completar con:
  ```dotenv
  PORT=3000
  NODE_ENV=development
  MONGODB_URI=mongodb+srv://usuario:clave@cluster0.xxxx.mongodb.net/reservas_salas_u7
  ```
5. Ejecutar servidor:
  ```bash
  npm start
  ```
  
---

## Diagnóstico DNS y comandos

- **Diagnóstico DNS**: Atlas resolvió correctamente el host `cluster0.xxxx.mongodb.net`.  
- **Comandos exactos de conexión y calidad**:
  - `node scripts/comprobar-conexion.js` → confirma conexión.  
  - `node scripts/crear-reserva.js` → inserta reserva ficticia.  
  - `node scripts/listar-reservas.js` → muestra reservas guardadas.  
  - `npm run lint` → chequea calidad de código.  
  - `npm run format:check` → verifica formato.  
  - `npm start` → arranca la aplicación web en el puerto configurado.

---

## Mapa de archivos y esquema

```text
index.js
 ├── config/entorno.js       # Variables de entorno
 ├── config/base-datos.js    # Conexión a Atlas con mongoose
 ├── servicios/reservas.js   # Lógica de datos en memoria
 └── app.js                  # Pipeline global de Express
      ├── middleware/solicitudes.js
      └── rutas/reservas.js
           ├── controladores/reservas.js
           └── middleware/reservas.js
```

## Esquema y colección

### Modelo Reserva en Atlas

- **Colección**: `reservas`
- **Campos**:
- `estudiante` → tipo `String`, obligatorio  
- `email` → tipo `String`, formato válido  
- `sala` → tipo `String`, obligatorio  
- `fecha` → tipo `String`, formato `YYYY-MM-DD`  
- `turno` → tipo `String`, valores permitidos: `Mañana`, `Tarde`, `Noche`  
- `personas` → tipo `Number`, mínimo 1

---

## Campos y reglas

- Validaciones actuales: estudiante obligatorio, email válido, fecha obligatoria, número de personas ≥ 1.  
- Límites aún no controlados:
  - Máximo de personas por sala.  
  - Evitar reservas duplicadas en mismo turno/sala.  

---

## Matriz de pruebas

# Matriz de pruebas

| Caso | URL completo | Estado esperado | Resultado / Evidencia |
|------|--------------|-----------------|-----------------------|
| Inicio | http://localhost:3000/ | 200 | Vista de inicio con ID BIB visible |
| Estado | http://localhost:3000/estado | 200 | JSON con cantidad inicial de reservas |
| Listado | http://localhost:3000/reservas | 200 | Listado con reservas iniciales |
| Formulario | http://localhost:3000/reservas/nueva | 200 | Formulario con campos y select |
| Detalle válido | http://localhost:3000/reservas/1 | 200 | Vista detalle con datos de la reserva |
| Detalle inexistente | http://localhost:3000/reservas/999 | 404 | Vista `no-encontrado.ejs` |
| POST inválido | http://localhost:3000/reservas (con campos vacíos o inválidos) | 400 | Errores mostrados, sin alta |
| POST válido | http://localhost:3000/reservas (con datos correctos) | 302 → 200 | Nueva reserva en listado y estado |
| CSS | http://localhost:3000/css/estilos.css | 200 | CSS cargado correctamente |
| URL inexistente | http://localhost:3000/cualquiercosa | 404 | Vista `no-encontrado.ejs` |
| Reinicio | Reiniciar servidor y abrir `/reservas` | 200 | Regreso a la semilla inicial |
| Puerto alternativo | http://localhost:4000/ (con `PORT=4000`) | 200 | Responde en puerto configurado |
| Puerto inválido | `PORT=99999 npm start` | No inicia | Mensaje explícito de error |


Evidencia: las reservas creadas con scripts persisten en Atlas incluso tras reiniciar el servidor.

---

## Persistencia y Unidad 8

Actualmente el sitio mantiene un arreglo en memoria para inicializar reservas, de modo que siempre haya datos visibles al arrancar.  
En la **Unidad 8** se abordará la migración completa a persistencia en Atlas, eliminando la dependencia de datos en memoria.

### Evidencia de persistencia

![Salida de terminal con pruebas](evidencia/evidencia-persistencia.png)

---

## Seguridad

- No se publica el archivo `.env` real.  
- Se incluye solo `.env.example` con valores ficticios.  
- No se exponen credenciales ni datos personales.  
