
# Desafio 8 CoderHouse Back-End

Desafio Reestructurando nuestro servidor

## Descripción

Traté se seguir todo lo visto en clases y basandome en el archivo de testing del drive del curso,
solo me queda una duda al tener nuestras funciones en los Controllers como asínconas, al momento de llamarlas 
en el router se las llama sin el "await", así;
ejemplo:
```
router.get('/', login);
```

archivo controller:
```
export const login = async (req, res) => {...}
```
O si seria necesario el await en el router???

## Autor

- [@JPjok3r](https://github.com/JPjok3r) Juan Pablo Saavedra Alanis



