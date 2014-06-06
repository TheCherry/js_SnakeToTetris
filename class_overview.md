# Überlegung Klassen / Methoden

Da die Snake-Struktur nicht passend für Tetris ist wird hier schon mal eine Grundstruktur angedacht

## Klasse Stone
### Konstanten
+ POLYOMINOS

### Felder
+ int[][] matrix
+ string color
+ Position { x, y }

### Methoden
+ init()
	+ Erstellt einen neuen Stein per Random aus der Polymoninos Liste
+ rotate()
	+ Dreht den Block nach rechts

## Klasse Field

### Felder
+ int[][] matrix
+ Stone[] stones

### Methoden

## Klasse Game
### Felder

+ Stone activeStone
+ Filed field
### Methoden

+ checkColision(field, stone)
+ gameLoop