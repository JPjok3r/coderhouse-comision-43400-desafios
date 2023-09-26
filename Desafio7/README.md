
# Desafio 7 CoderHouse Back-End

Desafio Complementario - Segunda práctica de integración
Refactorizando usuarios


## Descripción

Utilicé Session para este desafío solo tengo una duda, cuando me logueo (en el navegador) se cre la sesión, si visito
la ruta /api/sessions/current desde el navegador funciona todo correcto, me muestra los datos del usuario logueado, pero al 
usar thunderclient este se toma como otro usuario que no tiene sesión??, ya que cuando una vez creada la sesión y realizo la petición a la 
ruta /api/sessions/current solo me muestra como que no hay nadie logueado (todo esto ultimo mediante thunderclient).

Otra duda, para obtener el carrito realizo un fetch a dicho endpoint, de la siguiente manera
```
    await fetch('http://localhost:8080/api/carts', settings);
```

esto es correcto realizarlo o se debería realizarlo de otra manera??
*settings solo contiene la configuracion para que el fetch se realizce por post y algunos header, ya lo veras en codigo.


## Autor

- [@JPjok3r](https://github.com/JPjok3r) Juan Pablo Saavedra Alanis



