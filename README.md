[![MongoDB](https://img.shields.io/badge/MongoDB-3.6-brightgreen.svg)](https://www.mongodb.com/)
[![NPM](https://img.shields.io/badge/NPM-%5E5.3.0-brightgreen.svg)](https://www.npmjs.com/)
# Group 8 project 4

# Dokumentasjon
Oppgaven gikk ut på å lage en større webapplikasjon i Angular. Vi tok utgangspunkt i en salgsside, noe ala finn.no.

Oppgaven ble løst ved å:

- Backend database: Vi benytter **MongoDB**. Grensesnittet er et **REST api** og er utviklet i express. All spørring håndteres av npm modulen **mongoose** som er en pakke som håndterer **object modelling**.
- Skriving til databasen: Man kan **opprette** nye brukere, **redigere** sin egen bruker. I tillegg har vi **admin** funksjonalitet, som kan **slette** alle brukere (bortsett fra seg selv naturligvis)
- Lesing av databasen: Man har en **oversiktsliste** over produkter. I disse kan man **søke** på **navn, min pris, max pris**, samt **filtrere** på kategori og produkt-eier.
- Listebasert visning: **Produktlisten** viser en liste over produkter. Klikker man på disse får man se flere **detaljer** for det enkelte produktet. **Admin** siden viser en **liste over brukere**. **Brukersiden** viser en **liste** over brukerens **produkter**, samt **10** siste **søk**.  
- Sortering: Produktlisten kan **sorteres** på **pris** og **navn** (navn sorteres på følgende måte: Numerics: 0-9 -&gt; Uppercase letters: A-Z -&gt; Lowercase letters: a-z)
- Filtrering: Produktlisten kan **filtreres** på **kategori**, samt hvilken **bruker** som har opprettet produktet (klikk på en bruker på kartet og klikk “filter by user”, eller trykk på knappen i en produktbeskrivelse)
- Dynamisk lasting av data: Ved **innlasting** av siden lastes kun de **10** første elementene.    Man kan så **navigere** i disse ved hjelp av en **paginator** som laster fortløpende **10 og 10** elementer. **Søkefunksjonen** fungerer på samme måte.
- Min side funksjonalitet: Man kan **opprette**, **endre**, og **slette** brukere. Vi differensierer mellom **vanlige** brukere og **admin** brukere. Vi registrererer hvilke **produkter** som **hører** til en **bruker** og bruker dette til å **validere** om en bruker kan f.eks. endre eller slette et produkt. Vi registrerer også de **10** siste **søkene** en bruker har utført og viser disse.  
- Session-håndtering: Vi lagrer en **session cookie** ved innlogging som brukes til å gjenkjenne om en bruker har vært på siden før. Denne er selvsagt **kryptert**. Vi lagrer også **søkehistorikken** som en session. Dvs. hvis man fjerner nettleserhistorikken så **fjernes** også **søkeloggen**, på samme måte som f.eks. Youtube og andre nettsider.
- Fancy alternativ visning av listen: Alle **produkter** har en **bruker** som har en **posisjon**. Vi bruker denne posisjonen til å vise **posisjonen** til alle registrerte brukere på et **kart**.
- Testing etc: **Backend** er testet med **chai** og **mocha** som test runner. **Frontend** er testet med **jasmine** og **karma** som test runner. Vi har **86%** dekning på backend, og **68%** dekning på frontend.
- Dokumentasjon: Koden er **dokumentert**.

## Howto teste backend:
Backendtestene krever en lokal mongodb server kjørende. Kjør kommandoen ```npm run testbe```. Denne kjører alle testene og gir deg code coverage.

Coverage as of 22.11.17:

![alt text](https://i.imgur.com/FeqPe0S.png "Backend coverage")

## Howto teste frontend:
Frontend testene kjøres ved å skrive ```npm test``` evt. ```ng test``` om det er ønskelig. For å få code coverage skriv ```ng test --code-coverage```. Code coverage vil da dukke opp i en egen “coverage” mappe i prosjektmappen.

Coverage as of 22.11.17:
![alt text](https://i.imgur.com/4JmKWmz.png "Frontend coverage")

## Howto kjøre prosjektet:
Klon repoet. Kjør ```npm i```. Nå har du 2 valg, enten kjør ```npm run easy``` og bruk vår online database, eller sørg for at du har en lokal instans av mongodb kjørende og kjør ```npm run dev```. Et nytt nettleservindu med nettsiden vil da åpnes.

# Arkitektur

## Planlagt applikasjon
Vi har tatt utgangspunkt i en nettside der brukere kan kjøpe og selge produkter. Brukeren skal kunne få en oversikt over hvilke produkter som er til salg, samt flere detaljer om disse, hvor man også kan vise produktets posisjon på et kart, eller vise (filtrere) denne brukerens andre produkter. De skal også kunne sortere på navn og pris, og søke i navn på produkter. Hvis man søker, kan man filtrere på pris, eller kategori. Vi ønsker også at de skal få en oversikt over lokasjonen til disse produktene. Hvis man klikker på en bruker kan man filtrere produktlisten på produktene til brukeren. Vi vil skille mellom brukere og administratorer, der administratorene skal ha full tilgang over innholdet på siden, og de skal kunne slette brukere. Produktene til brukeren slettes når brukeren slettes. Brukere skal kun ha tilgang til å endre og slette sine egne produkter. Man kan se og søke i produktene uten å være logget inn.

## Architecture
Vi ønsker å basere oss på en MVC arkitektur, med Angular på front end, og Express (node) med Mongodb backend, også populært kalt MEAN stakken. Grensesnittet til databasen vil være et REST API.

### Databasen
![alt text](https://i.imgur.com/sRYZLKh.png "Diagram som viser hvordan databasen ser ut")

### Skjematisk oppsett av frontend og backend
![alt text](https://i.imgur.com/dDgB3wK.png "Diagram som viser rollene til client, server og databasen")

### Planlagt utseende på nettisden
#### Brukersiden:
![alt text](https://i.imgur.com/PeHgDpj.png "Brukersiden")
#### Produktlisting:
![alt text](https://i.imgur.com/mUCJXcj.png "Produktlisting")
