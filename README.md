Para inicializarlo descarga las dependencias con:
```zh
yarn install 
```
Y añade la variable de entorno SECRET:
```zh
echo "SECRET=$(openssl rand -hex 32)" > .env.local
```

> [!TIP]
> Es un projecto de ESM no de CJS con TypeScript compliado a JavaScript en la carpeta dist.

Ejecuta el server con node .
