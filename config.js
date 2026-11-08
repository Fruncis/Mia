/* ============================================================
   CONFIGURAZIONE DEL SITO  -  qui modifichi tutto
   ------------------------------------------------------------
   • Per cambiare l'ORDINE delle schermate: sposta i blocchi
     dentro la lista "step" (taglia e incolla un blocco { ... },).
   • Per TOGLIERE una schermata: cancella il suo blocco.
   • Per AGGIUNGERE una schermata di testo: copia un blocco
     con  tipo: "testo"  e cambia titolo/testo.
   • Nei testi puoi usare:
        {nome}        ->  Mia
        {soprannome}  ->  piccolina
        \n            ->  vai a capo
   ============================================================ */

window.SITE = {
  nome: "Mia",
  soprannome: "piccolina",

  /* Musica: parte solo nel carosello delle foto (si ferma quando esci).
     videoId = la parte finale del link di YouTube (dopo "v=").
     inizio  = secondo da cui far partire la canzone. */
  musica: { videoId: "TiebZllW8As", inizio: 0, volume: 70 },

  /* illustrazione disponibile: "coniglietto", "orsetto", "gattino" */
  step: [
    /* ---------- 1. Benvenuto ---------- */
    {
      tipo: "testo",
      illustrazione: "coniglietto",
      titolo: "Ciao, {nome}",
      testo: "Ho preparato una piccola sorpresa per te, {soprannome}.\nMettiti comoda e tocca il bottone.",
      bottone: "Cominciamo"
    },

    /* ---------- 2. Auguri ---------- */
    {
      tipo: "testo",
      illustrazione: "orsetto",
      titolo: "Oggi è il tuo giorno",
      testo: "Buon compleanno, {soprannome}!\nHo raccolto qualche pezzetto di noi per farti sorridere.",
      bottone: "Vai avanti"
    },

    /* ---------- 3. Carosello foto (stile polaroid, con musica) ---------- */
    {
      tipo: "carosello",
      titolo: "I nostri momenti",
      testo: "Scorri le foto con il dito.",
      bottone: "Continua",
      musica: true,
      /* Metti le foto nella cartella "photos" e scrivi qui il nome del file.
         Se una foto non esiste ancora, compare un segnaposto carino. */
      foto: [
        { src: "photos/foto1.jpg", didascalia: "Il nostro primo ricordo" },
        { src: "photos/foto2.jpg", didascalia: "Che sorriso!" },
        { src: "photos/foto3.jpg", didascalia: "Una giornata perfetta" },
        { src: "photos/foto4.jpg", didascalia: "Sempre insieme" },
        { src: "photos/foto5.jpg", didascalia: "Te e i tuoi occhi" },
        { src: "photos/foto6.jpg", didascalia: "Fino alla prossima avventura" }
      ]
    },

    /* ---------- 4. Bigliettini da aprire ---------- */
    {
      tipo: "bigliettini",
      titolo: "Piccoli bigliettini",
      testo: "Ogni bigliettino nasconde una cosa che adoro di te.\nAprili tutti!",
      bottone: "Continua",
      tuttiObbligatori: true, /* true = il bottone si sblocca dopo averli aperti tutti */
      bigliettini: [
        "Il tuo sorriso quando ridi davvero.",
        "Come ti illumini quando vedi un animaletto.",
        "La tua dolcezza con le persone a cui vuoi bene.",
        "Il modo in cui canti le canzoni che ami.",
        "Come mi fai sentire a casa.",
        "La tua risata che mi contagia sempre.",
        "Quanto sei tenace, anche quando non lo ammetti.",
        "Semplicemente il fatto che tu sia tu."
      ]
    },

    /* ---------- 5. Lettera con sigillo a cuore ---------- */
    {
      tipo: "lettera",
      titolo: "Una lettera per te",
      testo: "È sigillata con un cuore.\nToccalo per aprirla.",
      bottone: "Continua",
      lettera: {
        saluto: "Mia mia, {soprannome},",
        /* Ogni voce della lista è un paragrafo. SOSTITUISCI con le tue parole! */
        paragrafi: [
          "Scrivi qui la tua lettera: questo è solo un testo di esempio.",
          "Racconta cosa significa per te, cosa ti ha fatto sorridere di lei quest'anno e cosa speri per il prossimo.",
          "Più è vero e personale, più le piacerà."
        ],
        firma: "Con tutto il cuore, il tuo [scrivi qui il tuo nome]"
      }
    },

    /* ---------- 6. La domanda (il "No" scappa!) ---------- */
    {
      tipo: "domanda",
      illustrazione: "gattino",
      titolo: "¿Quieres salir conmigo?",
      sottotitolo: "Ultima domanda, {soprannome}…",
      si: "Sí",
      no: "No",
      /* Frasi che compaiono ogni volta che prova a toccare "No" */
      scherzi: [
        "Ops, il No è scivolato via!",
        "Riprova… se riesci 😏",
        "Sei sicura, {soprannome}?",
        "Il No ha paura di te.",
        "Dai, il Sí è lì che aspetta!",
        "Questo bottone non vuole proprio essere premuto."
      ]
    },

    /* ---------- 7. Finale ---------- */
    {
      tipo: "finale",
      illustrazione: "coniglietto",
      titolo: "Buon compleanno, {nome}!",
      testo: "Grazie di esserci, {soprannome}.\nQuesto è solo l'inizio di una giornata bellissima.",
      bottone: "Rivedi dall'inizio"
    }
  ]
};
