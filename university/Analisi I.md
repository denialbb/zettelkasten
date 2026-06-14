---
id: f75ee0f1-1166-47bc-9b12-2e121b8ba7b6
title: Analisi I
---

# Grafici di Funzioni

## Quoziente di Newton == m, pendenza, coefficiente angolare

### tasso medio di variazione di f nel passaggio da x<sub>1</sub> a x<sub>2</sub>

### pendenza di un grafico in un punto (x<sub>1</sub>, f(x<sub>1</sub>)) == derivata prima nel punto

1.  limite da x<sub>2</sub> a x<sub>1</sub>
2.  pendenza non definita se pendenza da sx != pendenza da dx

## funzione localmente dritta in ( x<sub>1</sub> , f(x<sub>1</sub>) )

### se possibile definirne la pendenza in x<sub>1</sub>

## retta tangente

### retta passante per un punto con pendenza = alla funzione cui e' tangente

## Teoremi

### Monotonia / Segno della pendenza

1.  f monotona crescente \<=\> pendenza di f su (a,b) e' positiva
2.  f monotona decrescente \<=\> pendenza di f su (a,b) e' negativa

### Convessita' / Monotonia della pendenza

1.  f convessa \\ \<=\> la pendenza cresce
2.  f concava /\\ \<=\> la pendenza e' decrescente

# Integrali

## Integrali definiti

### Area sottesa al grafico

### Ottenibile per approssimazione suddividendo in N intervalli con N –\> infinito

1.  sum(a,b) F(x)dx
2.  intervalli dx = (b-a) / N
3.  NB: abbiamo un integrale definito solo se il limite di N a infinito esiste finito e non dipende dagli z<sub>i</sub> scelti (ad esempio z<sub>i</sub> punto medio del intervallo corrispondente)

### \[sum(i=1,N) F(z<sub>i</sub>)\] \* (b-a)/N = S<sub>N</sub> `~~~~` Somma di Riemann di F

### calcolo della media di una funzione

1.  Somma di Riemann / (b-a)

## Calcolo Integrale

## Integrali Impropri

1.  f non limitata - intervallo limitato
2.  f limitata - intervallo non limitato Condizione `necessaria` alla convergenza (come nelle serie a termini positivi) limite a +inf = 0

integrale(1,+inf)(1/x<sup>a</sup>)dx

- a \<= 1 ==\> divergente
- a \> 1 ==\> convergente a 1/(a-1)

### convergenti

### divergenti

## Teoremi

### T. di Torricelli-Barrow

### T. fondamentale del calcolo integrale

1.  sia G(x) := integrale(a,x)f(t)dt
2.  Allora G derivabile e G'(x) = f(x) per qualsiasi x nel intervallo \[a,b\]
    1.  ovvero: G e' una primitiva di f su \[a,b\]

### T. della Media integrale `L20`

1.  Media = Somma di Riemann / (b-a)

# Limiti

## Finito a Finito

### lim(x-\>c)f(x) = l

### Qualsiasi epsilon \> 0 Esiste delta \> 0 (definito da epsilon) : x appartiene all'intorno di raggio delta di c tolto c ==\> f(x) appartiene all'intorno di raggio epsilon di l

## Finito all'infinito

## Infinito al finito

## Infinito all'infinito

### possibili asintoti obliqui

## Funzioni Continue

### hanno limiti in x che coincidono con f(x) per tutto il dominio

1.  non ha salti ne buchi definiti in un secondo momento

### Continuita' delle f elementari

### Continuita' somma, prodotto e inverso

### Continuita' della funzione composta

## Limiti Notevoli

## Funzioni asintotiche

### lim(x-\>c)\[f(x)/g(x)\] = 1

### f(x) ~ g(x) per x -\> c

### sin(x) ~ x per x -\> 0

### 1 - cos(x) ~ 1/2x per x -\> 0

### lg(1+x) ~ x per x -\> 0

### e<sup>x</sup> ~ 1+x per x -\> 0

## Teoremi

### Permanenza del Segno

### T. del confronto

1.  limiti finiti
2.  limiti infiniti

### T. di Weierstrass

1.  Se f continua in \[a,b\]
    1.  esistono x<sub>m</sub> minimo assoluto e x<sub>M</sub> massimo assoluto appartententi a \[a,b\] :
    2.  f(x<sub>m</sub>) \<= f(x) \<= f(x<sub>M</sub>)

### f Derivabile ==\> f Continua

# Differenziale

## Teorema di Lagrange

### per una f

1.  continua per \[a,b\]
2.  derivabile in (a,b)

### esiste un c contenuto in (a,b):

la sua derivata coincide con la pendenza della retta passante per a e b estremi di f, quindi la pendenza media

## Approssimazione locale di funzioni

### Usando il polinomio di Taylor di ordine n

### O polinomio di Maclaurin (Taylor centrato in 0)

# Successioni

una funzione che associa ad ogni intero positivo un numero in R

- convergente =\> limitata
- divergente a +inf =\> inferiormente limitata
- divergente a -inf =\> superiormente

a e b sono dette `asintotiche` se il loro rapporto a +inf tende a 1 \<=\> a ~ b

## Successione Geometrica `L14`

- a<sub>n</sub> = q \* a<sub>n</sub>-1 == q<sup>n</sup> \* a<sub>0</sub>

dove q e' detta ragione

## Confronti di crescita `L15`

### f = o(g) per x -\> +inf

g cresce piu' velocemente e il rapporto f/g tende a 0 a +inf

### Teorema di de l'Hopital

il limite del rapporto delle derivate e' uguale al limite del rapporto delle funzioni

### Simboli di Landau

- f = O(g) per x -\> +inf se il limite \|f/g\| = L
  - f = o(g) per x -\> +inf se il limite f/g = 0
  - f ~ g per x -\> +inf se il limite f/g = 1

## Ricorrenze Lineari

- x<sub>n</sub>+1 = ax+n + b
- x<sub>0</sub>

a=1

- b=0 successione costante
- b!=0 divergente a +-infinito

a!=1

- x\* = b/(1-a) dove x\* e' punto fisso di f: f(x\*) = x\*

-1 \< a \< 1

- converge
  |     |      |
  |-----|------|
  | a   | \> 1 |

- diverge

# Risoluzione approssimata di equazioni

## Teorema delle'esistenza degli zeri `L17`

- sia f: \[a,b\] –\> R continua
- f(a)f(b) \< 0

Allora

- Esiste un c contenuto in (a,b): f(c) = 0 (non e' detto sia unico)

## Metodi di bisezione `L17`

## Metodo di Newton `L18`

f due volte derivabile

- f(a)f(b) \< 0
- f' e f'' hanno segno costante su \[a,b\]
- f(a)f''(a) \> 0 OPPURE f(b)f''(b) \> 0

Allora

- esiste uno e uno solo alpha incluso in (a,b): f(alpha) = 0

# Serie

Somme di infiniti termini `~` sommatorie di successioni `L19`

- convergente se limite a +inf di S<sub>N</sub> = S
- divergente se limite a +inf di S<sub>N</sub> = inf
- irregolare/oscillante/indeterminata se non esiste limite a +inf di S<sub>N</sub>

Se a<sub>n</sub> \>= 0 allora S<sub>N</sub> non e' irregolare

- sum(n=0,+inf)q<sup>n</sup>
  - 0 \<= q \< 1 ==\> `converge` a 1/(1-q)
  - q \>= 1 ==\> `diverge` a +inf

## Serie Geometrica

sum(n=0,+inf)q<sup>n</sup>

- -1 \< q \< 1 `converge` 1/(1-q)
- q \<= -1 `irregolare`
- q \>= 1 `diverge` positivamente

## Serie Armonica

1/n (diverge a +inf) o generalizzata: 1/(n<sup>a</sup>)

- 0 \< a \<= 1 ==\> serie divergente
- a \> 1 ==\> convergente

## Serie Esponenziale `L24`

# Dimostrazioni

## [T. del Confronto](https://www.youmath.it/lezioni/analisi-matematica/limiti-continuita-e-asintoti/1562-teorema-dei-dei-carabinieri.html) `L9`

## Continuita' delle f derivabili

## Caratteriz. delle f a derivata nulla su un intervallo `L11`

## Carat. delle primitive delle stessa f `L11`

## Test di monotonia `L11`

## Concavita' e convessita' di f e monotonia della sua derivata prima `L12`

## Calcolo del polinomio di McLaurin di ordine n di

### e<sup>x</sup>

### log(1+x)

### sin(x)

### cos(x)

### (1+x)<sup>a</sup>

## T fondamentale del Calcolo Integrale `L21`

## [T di Torricelli-Barrow](https://library.weschool.com/lezione/calcolo-integrale-teorema-fondamentale-torricelli-barrow-dimostrazione-analisi-14707.html) `L21`

## T. esistenza degli zeri `L17`

## T di convergenza del metodo di Newton `L18`

## Condizione necessaria di convergenza di una serie `L19`

che il suo n-esimo termine sia infinitesimo

## Convergenza e divergenza della serie geometrica

## Criterio del confronto integrale per la convergenza di una serie `L24`

## Convergenza/divergenza delle serie armoniche generalizzate `L20`
