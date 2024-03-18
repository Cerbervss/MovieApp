# MovieApp

MovieApp è un progetto sviluppato con Java SpringBoot per la parte backend e la libreria Javascript REACT per la parte frontend. In questo progetto è possibile visualizzare i film presenti in DB in modo specifico e/o in modo superficiale tramite una visualizzazione lineare sulla homepage, è presente una barra di ricerca per titolo completo/parziale e per genere, è possibile aggiungere/editare/eliminare recensioni ai vari film e modificare/resettare una watchlist dinamica per una lista di film da guardare. 

## Installazione

Prerequisiti: Java JDK v20+, NodeJS v21.6.1+, MongoDB
Creare una collection chiamata "movies" all'interno di un database MongoDB locale o remoto e caricare all'interno il file .json ```movies.json``` presente nella cartella ```MovieApp\assets```.

## Uso

Backend:
  Aprire il terminale nella cartella ```MovieApp\Backend``` e far partire ```MovieApplication.java``` presente in ```MovieApp\Backend\src\main\java\app\movies``` tramite il comando Run Java del proprio IDE.

Frontend:
  Aprire il terminale nella cartella ```MovieApp\react-frontend``` e digitare il seguente comando ```npm run dev```.

# Linguaggi Utilizzati

JAVA - SPRINGBOOT - HTML - CSS - JAVASCRIPT - REACT

## DB

MongoDB in locale.
