# Pseudo code algo de tri

## Phrases

### tri par insertion

Il s'agit d'un tri qui s'effectue dans le sens croissant des indices du tableau

A chaque case, la valeur de la case courante est comparée à la case current+1. si la valeur de la case courante est plus elevée alors elles échangent de place et l'anciennement current+1 est maintenant comparé à toutes les cases précédentes.
le tableau derrière la tête de lecture est trié et ne connait pas les futurs valeurs à triés.

### tri par selection

Il s'agit d'un tri qui parcours le tableau entièrement autant de fois qu'il y a de cases.
A chaque tour, on garde en mémoire la valeur la plus petite afin qu'en fin de course cette case minimal soit placée en début de tableau.

### tri a bulles

Il s'agit d'un tri qui parcours entièrement le tableau plusieurs fois
la condition d'arret est qu'il n'y ai plus de changements sur un tour complet de tableau.
A chaque parcours de tableau les valeurs de la case n et n+1 sont comparés et échangés si besoin.

### tri de shell

Il s'agit d'un tri en "plusieurs étapes"

C'est un tri qui tri par ordre de grandeur puis qui s'affine tour à tour.
pour cela, ce sont les valeurs de chaque côté du tableau qui sont comparés (grace à l'écart maximal).

### tri par tas

Il s'agit de créer une arborescence où la racine est la valeur la plus élevés et les enfants les plus lointains les plus petites valeurs.
les comparaisons s'effectuent entre parents et enfants et on remonte le tableau des enfants au parent.

Une fois fait , le parent racine est placé en fin de tableau et on recommence avec un tableau plus court de 1.