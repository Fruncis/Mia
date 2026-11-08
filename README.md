# Per Mia 🌸

Sito-regalo di compleanno: schermate in sequenza, carosello di polaroid con musica, bigliettini da aprire,
lettera sigillata con un cuore e una domanda finale con il "No" che scappa.

## Cosa modificare (tutto in `config.js`)
- **Testi e ordine delle schermate**: lista `step`. Sposta, copia o cancella i blocchi.
- **Foto**: metti i file nella cartella `photos/` e scrivi il nome in `foto` (es. `photos/foto1.jpg`).
  Consiglio: foto quadrate o 4:5, massimo 1200 px, sotto i 500 KB ciascuna.
- **Bigliettini**: lista `bigliettini` (puoi metterne quanti vuoi).
- **Lettera**: `saluto`, `paragrafi` (uno per paragrafo) e `firma`. I testi presenti sono solo esempi.
- **Canzone**: `musica.videoId` (la parte dopo `v=` nel link di YouTube) e `musica.inizio` (secondo di partenza).
- Illustrazioni disponibili: `coniglietto`, `orsetto`, `gattino`.

## Pubblicare con GitHub Pages
1. Carica tutti i file nella radice della repository `Mia` (branch `main`).
2. Su GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save**.
3. Dopo circa un minuto il sito è su `https://TUO-USERNAME.github.io/Mia/`.

Da terminale:
```bash
git clone https://github.com/TUO-USERNAME/Mia.git
# copia qui dentro tutti i file di questo progetto
cd Mia
git add .
git commit -m "Sito di compleanno per Mia"
git push
```

## QR code
Apri `https://TUO-USERNAME.github.io/Mia/qr.html` dal telefono o dal computer: il QR si compila da solo
con l'indirizzo giusto e c'è il pulsante per scaricarlo come immagine.

## Note
- La musica parte quando si entra nel carosello e sfuma quando si esce. C'è un pulsante in basso a destra per fermarla.
  Funziona solo dal sito pubblicato (non aprendo `index.html` come file) e serve la connessione.
- Per provare in locale: `python3 -m http.server` nella cartella, poi apri `http://localhost:8000`.
- Font (Google Fonts): Dancing Script (titoli), Quicksand (testo), Kalam (bigliettini e didascalie), Caveat (lettera).
