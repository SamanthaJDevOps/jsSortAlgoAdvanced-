# Pseudo code algo de tri

## Tri par le centre

***Idée:***  Parcourir un tableau une première fois additionner toutes les valeurs et diviser le total par le nombre de cases: obtention de la moyenne.

à partir de ce chiffre , déterminer un premier tri en disant que toutes les valeurs en dessous de la moyenne ( moyenne comprise ) vont dans les premieres cases du tableau et toutes les valeurs au dessus dans la suite du tableau

réiterer jusqu'a ce que les sous tableau ne fasse que 2 cases et que ceux ci soient ordonnés.

***Pseudo-code:***

TAILLE <- longueur de tableauValeurs

Découper le tableau en 2 (arrondi) jusqu'à avoir des tableaux de 2 cases (ou 1 si impair)

dans ces minis tableaux, comparer les valeurs à l'indice 0 et 1 et mettre le pls petit à l'indice 0.

Regroupement:
 a chaque regroupement comparer tab1 à l'indice 0 et tab2 à l'indice 0

 le plus petit prend la place

si le plus petit appartenais à tab1 , alors le plus petit retenu est comparer a tab2[1]; le plus petit des deux est retenu
sinon si le plus petit appartenais à tab2 , alors le plus petit retenu est comparer a tab1[1]; le plus petit des deux est retenu

