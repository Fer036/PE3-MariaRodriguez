# JUEGO INTERACTIVO
## Piedra, papel, tijera, lagarto y spock.

## Alumna: 

- [@fer036](https://www.github.com/fer036)


## Introducción:
Mediante JavaScript, CSS y HTML, se realiza una versión alternativa del clásico piedra, papel o tijera (responsive). Este juego está inspirado en la serie "The Big Bang Theory".

## Anatomía de la página: 
### Index:
>> Login mediante usuario y contraseña. Ambos son guardados en el localStorage en caso de no existir, es notificado mediante un toast. Si el usuario existe, es traído del localStorage y validado para acumular sus puntos. 
>> El usuario y la contraseña se validan: deben tener más de 3 caracteres, además de que elimina automáticamente los espacios. Si el usuario existe, valida que la contraseña sea correcta, caso contrario, muestra un mensaje. 
>> Botón ingresar dirige a la página de tabla de posiciones. 

![alt text](/assets/img-readme/image.png);

### Tabla de posiciones: 
>> Muestra los puntos acumulados de cada uno de los usuarios.
>> Los ordena por puntaje, de mayor a menor. 
>> Muestra la última conexión de cada usuario. 
>> El botón Jugar dirige a la página del juego.
>> El botón cerrar sesión, cierra la sesión del usuario.

![alt text](/assets/img-readme/image2.png)

### Juego:
>> Muestra el score de cada jugador (jugador vs máquina).
>> Muestra la cantidad de rondas, y se actualiza en cada jugada. (5 rondas).
>> Muestra las opciones disponibles para jugar, y las instrucciones. 
>> Por cada jugada se muestra la elección de la pc mediante un toast, y al finalizar indica el ganador. 
>> Al terminar la partida, consulta si desea jugar otra ronda. 

![alt text](/assets/img-readme/image3.png)