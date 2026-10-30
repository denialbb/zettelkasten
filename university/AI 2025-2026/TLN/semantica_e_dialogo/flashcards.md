Q: Fai un esempio di ambigue puramente semantica.
A: Ogni studente ha letto un libro: stesso albero sintattico ma due letture (un libro solo per tutti vs un libro a testa, portata diversa dei quantificatori). Altro: La banca e' sul fiume (senso di banca).
---
Q: Perche' l'ambigue semantica non si risolve con la sintassi?
A: Perche' la sintassi da' un solo albero mentre servono due forme logiche: serve la semantica composizionale (portata dei quantificatori, sensi lessicali).
---
Q: Spiega l'uso del formalismo Lambda-FoL per la semantica computazionale.
A: Ogni nodo sintattico ha un'espressione lambda; la regola semantica segue quella sintattica (composizionalita'): S -> NP VP applica SEM(NP) a SEM(VP) con beta-riduzione fino alla formula FoL.
---
Q: Cosa significa composizionalita' del significato?
A: Il significato del tutto e' funzione del significato delle parti e del modo in cui sono combinate (Frege/Montague): la grammatica guida la composizione semantica.
---
Q: Traduci in lambda-FoL: ogni, cane, abbaia, Maria.
A: ogni => \P Q. forall x. (P(x) -> Q(x)); cane => \x. cane(x); abbaia => \x. abbaia(x); Maria => \P. P(Maria).
---
Q: Mostra la beta-riduzione di Maria abbaia.
A: (\P. P(Maria))(\x. abbaia(x)) diventa abbaia(Maria): si sostituisce P con \x. abbaia(x) e si applica a Maria.
---
Q: Cosa sono simple-sem.fcfg e simple-sem-it-02.fcfg?
A: Grammatiche NLTK con semantica: simple-sem per l'inglese, simple-sem-it-02 per l'italiano (accordo, clitici, ordine); il progetto 2 chiede di ispirarsi a simple-sem per G1.
---
Q: Come si usa NLTK per la semantica composizionale?
A: nltk.sem.logic per le formule, beta-riduzione automatica, Mace per costruire modelli e Prover9 per dimostrare inferenze.
---
Q: Cosa e' la rappresentazione neo-davidsoniana?
A: Eventi come individui e ruoli come predicati binari: exists e. dare(e) & Agente(e,Maria) & Tema(e,Libro) & Destinatario(e,Giovanni).
---
Q: Che differenza c'e' tra Davidson e neo-Davidson?
A: Davidson usa un predicato n-ario dare(e,Maria,Libro,Giovanni); il neo-Davidson (Parsons) usa predicati binari di ruolo congiunti, ad arieta' variabile.
---
Q: Perche' il neo-Davidson gestisce bene i modificatori?
A: Perche' aggiungere ieri e' congiungere Tempo(e,ieri) senza cambiare l'arieta' del verbo: ogni ruolo e' un predicato indipendente.
---
Q: Cosa sono i ruoli semantici e quali standard li annotano?
A: Agente, Tema/Paziente, Destinatario, Strumento...; PropBank (Arg0/Arg1) e FrameNet (frame specifici) li annotano per il SRL.
---
Q: Cos'e' il SRL?
A: Semantic Role Labeling: trovare il predicato e i suoi argomenti con ruoli (Chi ha fatto Cosa a Chi): quasi un neo-Davidson automatico.
---
Q: Cosa sono DRT e AMR?
A: DRT gestisce anafore e presupposizioni tra frasi con scatole discorsive; AMR rappresenta frasi come grafi verbo-centrici valutati con Smatch.
---
Q: Quali sono i 6 fenomeni notevoli del dialogo tra umani?
A: Turn-taking, grounding/common ground, atti linguistici, iniziativa mista, riferimenti ed ellissi, riparazioni.
---
Q: Cos'e' il turn-taking?
A: L'alternanza dei turni con segnali di passaggio (prosodia, sguardo, pause): il sistema deve decidere quando parlare e quando ascoltare.
---
Q: Cos'e' il grounding e il common ground?
A: La costruzione incrementale di credenze condivise con conferme e ack (ok, capito): ogni turno aggiunge terreno comune o lo ripara.
---
Q: Cosa sono gli atti linguistici?
A: Cio' che un turno fa (chiedere, informare, promettere, ordinare: Austin/Searle): il DM ragiona su atti, non su parole.
---
Q: Cosa significa iniziativa mista nel dialogo?
A: Che la guida cambia: a volte guida il sistema (frame), a volte l'utente (domande aperte); il sistema deve cedere e riprendere l'iniziativa.
---
Q: Perche' riferimenti ed ellissi richiedono memoria del dialogo?
A: Perche' lo voglio ed e domani? si capiscono solo col contesto dei turni precedenti: serve lo stato del dialogo.
---
Q: Cosa sono le riparazioni nel dialogo?
A: Auto-correzioni, chiarimenti (intendevo...), gestione degli errori ASR/NLU: il sistema deve rilevare e riparare invece di proseguire cieco.
---
Q: Cosa e' la Frame-Based Semantics nei DS?
A: Ogni intento e' un frame con slot da riempire (data, ora, persone); il DM interroga per riempirli, propone ipotesi, tiene il common ground con backup e memoria.
---
Q: Nel progetto Padawan cosa sono frame e slot?
A: Ogni pozione e' un frame, gli ingredienti sono gli slot da riempire interrogando l'utente con risposte vere o false e giudizio finale sagace.
---
Q: Qual e' la pipeline classica di un sistema di dialogo?
A: ASR, NLU (intent+slot), DM (stato e policy), NLG (template o LLM), TTS.
---
Q: Cosa fa la NLU in un sistema di dialogo?
A: Intent detection (cosa vuole l'utente) e slot filling (con cosa): oggi con BERT o classificatori di token.
---
Q: Cosa fa il Dialogue Manager?
A: State tracking (dove siamo) e policy (cosa fare dopo): frame, POMDP o prompt LLM.
---
Q: Quali opzioni di NLG prevede il progetto 3.C?
A: Template statici (controllabili) oppure parafrasi con LLM (vari ma rischiosi e meno controllabili).
---
Q: Cosa e' il task della Aggregation?
A: Combinare piu' proposizioni in una frase fluida (Il volo e' alle 8 + costa 50 euro verso Il volo delle 8 costa 50 euro): fase della generazione dopo la pianificazione.
---
Q: Quali sono le fasi della generazione NLG?
A: Pianificazione del documento, aggregazione, lessicalizzazione, realizzazione superficiale.
---
Q: Come si valuta un sistema di dialogo nel progetto 3.D?
A: Analizzando almeno 3 dialoghi: errori piu' comuni e fenomeni linguistici gestiti; in generale task success, numero di turni, soddisfazione.
---
Q: Cosa cambia con SpeechRecognition e TTS nel progetto 3.E?
A: Cambiano gli errori: WER dell'ASR, rumore, barge-in, prosodia; servono conferme esplicite o implicite secondo il costo dell'errore.
---
Q: Quando usare conferme esplicite o implicite?
A: Esplicite (Hai detto X, confermi?) quando l'errore costa (prenotazioni); implicite (Ok, X...) quando costa poco e rallenta.
---
Q: Cosa significa iniziativa del sistema nel progetto 3.B?
A: Che il sistema interroga l'utente per riempire gli slot invece di aspettare: domande mirate con proposte vere o false.
---
Q: Cos'e' la backup strategy di un DM?
A: Cosa fare quando NLU fallisce o lo slot resta vuoto: riformulare, chiedere chiarimenti, passare a un umano o a un default sicuro.
---
Q: Perche' il giudizio finale sagace del progetto e' un problema NLG?
A: Perche' deve variare col dialogo (adatto/non adatto a Padawan) restando coerente: template condizionali o LLM vincolato.
---
Q: Che relazione c'e' tra neo-Davidson e slot dei frame?
A: Gli slot sono ruoli neo-davidsoniani lessicalizzati (Agente, Tema...): riempire uno slot e' istanziare un predicato di ruolo sull'evento.
---
Q: Che relazione c'e' tra dipendenze sintattiche e slot?
A: nsubj/obj danno candidati per Agente/Tema: il progetto 3.A cerca regolarita' (avere-nsubj->Jedi) proprio per questo.
---
Q: Cos'e' un POMDP nei sistemi di dialogo?
A: Un processo decisionale con stato parzialmente osservabile: tiene una distribuzione di belief sullo stato per agire sotto incertezza ASR/NLU.
---
Q: Perche' i POMDP sono adatti al dialogo vocale?
A: Perche' l'input e' rumoroso: il belief rappresenta l'incertezza e la policy decide tra chiedere, confermare o agire.
---
Q: Cosa significa end-to-end neurale nei DS e quali rischi ha?
A: Un LLM fa NLU+DM+NLG insieme dal dialogo: fluente ma senza stato esplicito, rischia allucinazioni e perdita degli slot (cfr. Parte 3).
---
Q: Come si collegano atti linguistici e intent del progetto?
A: L'intent e' l'atto operazionalizzato (richiedi_pozione, dai_ingrediente...): classifica l'atto per guidare la policy.
---
Q: Quali fenomeni deve gestire il Padawan-DM secondo la consegna?
A: Iniziativa del sistema, frame con slot, risposte vere/false, giudizio sagace, backup, memoria: cioe' grounding, atti e riparazioni.
---
Q: Perche' 3 dialoghi bastano a valutare nel progetto?
A: Perche' la relazione e' qualitativa (5-10 pagine): 3 dialoghi mostrano errori ricorrenti e fenomeni gestiti senza metriche su larga scala.
---
Q: Quali errori comuni ci si aspetta nei dialoghi Padawan?
A: Slot errati da NLU, coreferenze mancate, over-conferme noiose, giudizio incoerente, cadute su risposte inattese (fuori frame).
---
Q: Quali capitoli di Jurafsky-Martin coprono semantica e dialogo?
A: I capitoli su semantica composizionale/SRL e quelli su dialogo/conversazione (parte III del draft 3ed): lambda-calcolo, ruoli, frame, POMDP, valutazione.
---
Q: Quali capitoli NLTK coprono la semantica?
A: I capitoli su estrazione e semantica (cap. 7-10 del NLTK book): chunking, CFG con feature, lambda-calcolo e Prover9.
---
Q: Che differenza c'e' tra FOL e lambda-FoL?
A: La FOL scrive formule chiuse; il lambda-FoL aggiunge astrazioni per comporre i significati lungo l'albero e ridurre a FOL alla fine.
---
Q: Perche' la portata dei quantificatori crea due letture?
A: Perche' forall ed exists si annidano in due ordini: forall x exists y (ognuno il suo) vs exists y forall x (uno per tutti).
---
Q: Cosa significa beta-riduzione in una riga?
A: Applicare (\x. corpo)(argomento) sostituendo x con argomento nel corpo, ripetendo fino a forma normale.
---
Q: Perche' simple-sem-it-02 e' piu' complessa di simple-sem?
A: Perche' l'italiano ha accordo, clitici, pro-drop e ordine piu' libero: servono feature e piu' regole con semantica associata.
---
Q: Cosa significa pro-drop per la semantica italiana?
A: Che il soggetto puo' mancare (piove, canto): la semantica deve introdurre l'argomento nullo o esistenziale.
---
Q: Come si rappresenta una domanda si/no in FoL per un DS?
A: Come query da dimostrare o come richiesta di riempimento slot: ?exists x. ingrediente(pozione,x) guida la domanda del sistema.
---
Q: Cosa significa grounding con proposte vere o false nel progetto?
A: Che il sistema verifica uno slot proponendo un valore (E' X?) e usa si/no per confermare: grounding esplicito economico.
---
Q: Perche' la memoria del dialogo e' diversa dalla cronologia dei turni?
A: Perche' tiene lo stato (slot riempiti, entita' salienti, common ground), non il testo: e' cio' che basta a decidere la prossima mossa.
---
Q: Cosa sono presupposizioni e implicature per un DS?
A: Presupposizioni: cio' dato per vero (il tuo gatto presuppone un gatto). Implicature: cio' implicato non detto (ho fame invita a offrire cibo): il DM non deve prenderle alla lettera ne' ignorarle.
---
Q: Cosa significa robustezza NLU e come si ottiene?
A: Capire input malformati o fuori grammatica: con modelli statistici/neurali, backoff a keyword e chiarimenti mirati invece di fallire.
---
Q: Cosa sono i slot opzionali contro obbligatori?
A: Obbligatori: senza non si completa il task (data del volo). Opzionali: migliorano ma non bloccano (posto finestrino): la policy li chiede solo se avanza tempo.
---
Q: Come si gestisce il cambio di intento a meta' dialogo?
A: Con stack di frame o push/pop di task: si sospende il frame corrente, si serve il nuovo, poi si riprende (richiede memoria).
---
Q: Cosa significa initiative shift con esempio?
A: Il passaggio di guida: il sistema chiede (iniziativa sua), l'utente risponde con una domanda (iniziativa utente), il sistema deve rispondere e poi riprendere il frame.
---
Q: Perche' i template battono l'LLM nel giudizio finale del progetto?
A: Perche' il giudizio deve essere coerente con gli slot riempiti: i template condizionali non inventano, l'LLM libero rischia incoerenze.
---
Q: Cosa significaUCB o E2E nella valutazione dei DS?
A: Task success e soddisfazione utente (extrinsic) contro BLEU delle risposte (intrinsic e fuorviante): nel progetto vale solo l'analisi qualitativa.
---
Q: Come si annotano atti linguistici in un corpus di dialogo?
A: Con tag tipo request/inform/confirm/ack per turno: servono da supervisione per NLU e policy.
---
