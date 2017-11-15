# Group 8 project 4

Run dev server with
```
npm run dev
```
Run front end tests with 
```
npm test
```
Run back end tests with (note: this requires a local instance of mongodb running)
```
npm run testbe
```

## Planlagt applikasjon
Vi har tatt utgangspunkt i en nettside der brukere kan kjøpe og selge produkter. Brukeren skal kunne få en oversikt over hvilke produkter som er til salg, samt flere detaljer om disse. De skal også kunne sortere på navn og pris, og søke i navn på produkter. Vi ønsker også at de skal få en oversikt over lokasjonen til disse produktene. Vi vil skille mellom brukere og administratorer, der administratorene skal ha full tilgang over innholdet på siden, samt brukerne.

## Architecture
Vi ønsker å basere oss på en MVC arkitektur, med Angular på front end, og Express (node) med Mongodb backend, også populært kalt MEAN stakken. Grensesnittet til databasen vil være et REST API.  Vi vurderer også å benytte oss av Google’s material designløsning.

### Databasen
![alt text](https://i.imgur.com/SJ5JXUl.png "Diagram som viser hvordan databasen skal se ut")

### Skjematisk oppsett av frontend og backend
![alt text](https://i.imgur.com/dDgB3wK.png "Diagram som viser rollene til client, server og databasen")

### Planlagt utseende på nettisden
#### Brukersiden:
![alt text](https://i.imgur.com/PeHgDpj.png "Brukersiden")
#### Produktlisting:
![alt text](https://i.imgur.com/mUCJXcj.png "Produktlisting")
