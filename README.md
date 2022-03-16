## Install

NodeJS

```
node -v
> v10.19.0
```

Typescript and Modules

```
npm i typescript -D
```

Express
```
npm i express
npm i @types/express -D
```

Mongo
```
npm i mongoose
npm i @types/mongoose -D
```

CORS
```
npm i cors
```

## Config

NodeJS

```
npm init -Y
vi package.json
```

Typescript

```
tsc --init
vi tsconfig.json
```

## Run

```
tsc
node dist/index.js
```

## Coding

### Express

src/app.ts

```
import express, { Application} from 'express';

const app: Application = express();

app.use(express.json());
```

### Router

src/routers/index.ts

```
import { Router } from 'express';

const router = Router();

export default router;
```

src/app.ts
```
import indexRoutes from './routes/index';

app.use('/api', indexRoutes);
```

### Database

src/database.ts

src/index.ts

```
import { startConnection } from './database';

    startConnection();
```


