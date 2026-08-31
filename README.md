# Social Optimizer

Social Optimizer es una plataforma web para crear, organizar y publicar contenido en múltiples redes sociales desde un único lugar. La propuesta combina publicación multirred, programación de posts, recomendaciones de IA para mejorar el alcance y una experiencia de gestión más profesional para marcas, emprendedores y equipos de comunicación.

## ¿Qué hace?

Social Optimizer permite:

- Crear publicaciones con texto y contenido visual
- Distribuir mensajes a varias plataformas como Instagram, Facebook, TikTok y X
- Programar publicaciones con fecha y hora
- Recibir recomendaciones de IA para elegir mejores horarios de publicación
- Gestionar usuarios, perfiles y autenticación
- Organizar el flujo editorial desde una interfaz sencilla

## Estado del proyecto

El proyecto ya incluye:

- Autenticación de usuarios
- Registro y verificación por correo
- Gestión de perfiles
- Composer de publicaciones
- Selección de plataformas
- Programación de publicaciones
- Panel inicial con navegación y diseño orientado a producto

## Stack tecnológico

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Better Auth
- Nodemailer
- FullCalendar
- Recharts

## Requisitos previos

Antes de iniciar el proyecto, asegúrate de tener instalado:

- Node.js 20+
- npm o pnpm
- PostgreSQL

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repo>
cd social-optimizer
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo .env local con las variables necesarias:
```bash
DATABASE_URL=postgresql://usuario:password@localhost:5432/social_optimizer
NEXT_PUBLIC_APP_URL=http://localhost:3000

EMAIL_HOST=smtp.tu-proveedor.com
EMAIL_PORT=587
EMAIL_USER=tu-email@dominio.com
EMAIL_PASS=tu-password
```

4. Ejecutas las migraciones de Prisma
```bash
npx prisma migrate dev
```

5.Inicia el servidor de desarrollo
```bash
npm run dev
```

Abre (http://localhost:3000) para ver la aplicación.

## Estructura del proyecto
```bash
src/
  app/              # Rutas y páginas de la app
  components/       # Componentes reutilizables
  lib/              # Autenticación, Prisma, correo y utilidades
  services/         # Lógica de negocio y servicios
  styles/           # Estilos globales
prisma/
  schema.prisma     # Modelo de datos
```