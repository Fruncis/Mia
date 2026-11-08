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
  musica: { videoId: "TiebZllW8As", inizio: 0, volume: 50 },

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
        { src: "photos/primo_ricordo.jpg", didascalia: "Il nostro primo ricordo" },
        { src: "photos/il_primo_regalo.jpg", didascalia: "Una giornata perfetta" },
        { src: "photos/un_pensiero_per_te.jpg", didascalia: "Sempre insieme" },
        { src: "photos/la_mia_piccolina.jpg", didascalia: "La mia piccolina!" },
        { src: "photos/alla_prossima_avventura.jpg", didascalia: "Fino alla prossima avventura" }
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
        "I tuoi occhi quando sorridi.",
        "Quando mi mandi lo sticker di un animaletto carino, mi sciolgo.",
        "La tua dolcezza con le persone a cui vuoi bene.",
        "Quanto sei dedita al lavoro",
        "Come mi sento tranquillo quando sono con te",
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
        saluto: "Mia cara, {soprannome},",
        /* Ogni voce della lista è un paragrafo. SOSTITUISCI con le tue parole! */
        paragrafi: [
          "Non sono bravo a scrivere le lettere cercherò di fare del mio meglio.",
          "Ormai ci conosciamo da quasi 2 mesi, in questo periodo ho avuto il piacere di conoscere sempre meglio la bellissima persona che sei, sei la mia costante dose di felicità, io sulle tue gambe in macchina mentre mi insegnavi lo spagnolo è il ricordo di noi che mi fa' sempre sorridere, dato che tu mi hai regalato questo bellissimo ricordo spero di potertene regalare mille altri così a te.",
          "So che questo non è un bel periodo per te ma oggi è il tuo giorno e ti meriti di godertelo al massimo."
        ],
        firma: "Con tutto il cuore, il tuo piccolo!"
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
        "Riprova magari ci riesci 😊",
        "Sei sicura, {soprannome}?",
        "Il No ti teme.",
        "Dai, il Sí è lì che aspetta!",
        "Io fossi in te premerei l'altro bottone 🤔."
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
