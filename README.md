# Progetto Ingegneria del SW e Fondamenti Web

A.A.2022/2023

Gruppo: 40

## Componenti del gruppo

Gianluigi Palmisano 581039

Nicolas Putignano 581702

## Titolo:
Wezapp

## Linguaggi utilizzati

Javascript, HTML

## Framework utilizzati
express(backend), React(frontend), MUI(stili frontend)

## Database
MongoDB

## Autenticazione e sessione
JWT Token e hashing

## Descrizione

La web app si compone di back end e frontend. Il backend viene eseguito con Node.js tramite server express,e contiene la gestione del database, routes e meccanismo di tokenizzazione.

Il frontend è scritto in javascript e utilizza React per realizzare la UI.

Il sito si compone di 3 pagine principali:

La pagina di accesso è la prima visualizzata dall'utente

in cui è presente l'access point per la registrazione (seconda pagina);

Una volta effettuato l'accesso si ha l'accesso all'elenco di tutti gli utenti registrati sulla piattaforma Wezapp

e alla chat con l'utente selezionato dalla sidebar.

### Gestione delle amicizie

L'utente loggato può esclusivamente scambiare messaggi con utenti amici (di default l'utente non ha amici).

La richiesta di amicizia viene effettuata tramite pulsate situato in corrispondenza dell'username presente nella sidebar.

L'utente destinatario visualizzerà l'arrivo di una o più richieste di amicizia in alto a destra della sezione chat.

Da qui potrà visualizzare username mittente e potrà accettare la richiesta. Solo da ora potrà comunicare con la controparte.

Nella sidebar l'icona corrispondente allo username mostra lo stato dell'amicizia differenziando 3 stati:

1. Nessuna richiesta inviata
2. Richiesta inviata ma non ancora approvata
3. Richiesta accettata -> utente amico

Dalla sidebar è possibile filtrare esclusivamente gli utenti amici dal pulsante a destra della barra di ricerca, nella parte alta della sidebar.

### Features minori

Clickando sull'avatare dell'utente selezionato in alto alla sezione chat è possibile visualizzare le informazioni dell'utente destinatario.

### Ricerca
dalla barra di ricerca è possibile ricercare uno o più utenti semplicemente digitando nella barra, la lista si aggiornerà automaticamente

Il pulsante in basso a sinistra della sidebar permette di uscire dalla sessione e tornare alla schermata di login.

### Funzionalità principali

1. Registrazione sulla piattaforma
2. Login
3. Visualizzazione messaggi scambiati con un altro utente
4. Invio messaggio a un altro utente
5. Inserimento di un amico
6. Eliminazione di un amico
7. Visualizzazione lista amici e accesso alle loro chat
8. Autenticazione sicura
9. Uso di cookie per la sessione
10. Uso Material UI
