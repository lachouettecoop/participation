# [1.0.0](https://github.com/lachouettecoop/participation/compare/0.6.1...1.0.0) (2020-10-12)


### Features

* correction du wording ([a7d0e66](https://github.com/lachouettecoop/participation/commit/a7d0e66))
* mise à jour avec la nouvelle feuille de Suivi en mode MAG ([9be20f0](https://github.com/lachouettecoop/participation/commit/9be20f0))


### BREAKING CHANGES

* L'adresse du Google Sheet de suivi est à modifier. Le format de celui-ci est
différent de l'ancien. De plus, l'annuaire CSV des coopérateurs et coopératrices n'est plus utilisé.



## [0.6.1](https://github.com/lachouettecoop/participation/compare/0.6.0...0.6.1) (2019-10-31)


### Bug Fixes

* correction de l'application suite à changement de nom de colonne dans le fichier de suivi ([115a74b](https://github.com/lachouettecoop/participation/commit/115a74b))



# [0.6.0](https://github.com/lachouettecoop/participation/compare/0.5.2...0.6.0) (2019-09-04)


### Features

* ajout de l'information coopérateur ou non ([9ee68a1](https://github.com/lachouettecoop/participation/commit/9ee68a1)), closes [#34](https://github.com/lachouettecoop/participation/issues/34)



## [0.5.2](https://github.com/lachouettecoop/participation/compare/0.5.1...0.5.2) (2019-04-03)


### Bug Fixes

* **ui:** mise en pause de la redirection auto lorsque le formulaire est ouvert ([d6453d0](https://github.com/lachouettecoop/participation/commit/d6453d0)), closes [#32](https://github.com/lachouettecoop/participation/issues/32)



## [0.5.1](https://github.com/lachouettecoop/participation/compare/0.5.0...0.5.1) (2019-04-02)


### Bug Fixes

* **build:** correction d’un bug empêchant la compilation statique ([8dbbb9e](https://github.com/lachouettecoop/participation/commit/8dbbb9e))



# [0.5.0](https://github.com/lachouettecoop/participation/compare/0.4.0...0.5.0) (2019-04-02)


### Features

* **ui:** ajout d’un bouton retour en haut de page lorsque l’on n’est pas sur l’accueil ([d3f563a](https://github.com/lachouettecoop/participation/commit/d3f563a)), closes [#15](https://github.com/lachouettecoop/participation/issues/15)
* **ui:** ajout de la possibilité de rescanner une carte depuis une page Chouettos ([bf81a33](https://github.com/lachouettecoop/participation/commit/bf81a33)), closes [#8](https://github.com/lachouettecoop/participation/issues/8)
* **ui:** mise à jour du 3ème indicateur : vert/rouge et une seule date ([e5f5965](https://github.com/lachouettecoop/participation/commit/e5f5965)), closes [#23](https://github.com/lachouettecoop/participation/issues/23)
* **ui:** redirection automatique vers l’accueil au bout de 30s ([7cecea1](https://github.com/lachouettecoop/participation/commit/7cecea1)), closes [#8](https://github.com/lachouettecoop/participation/issues/8)
* **ui:** utilisation d’un `.` pour séparateur de dates ([8111a20](https://github.com/lachouettecoop/participation/commit/8111a20)), closes [#24](https://github.com/lachouettecoop/participation/issues/24)



# [0.4.0](https://github.com/lachouettecoop/participation/compare/0.3.0...0.4.0) (2019-03-06)


### Bug Fixes

* **ui:** correction de l’effet « déplacement » lors du survol du bouton de feedback ([514b7ff](https://github.com/lachouettecoop/participation/commit/514b7ff))


### Features

* **ui:** affichage d’un message plutôt que le compteur pour les nouveaux n’ayant pas PIAFé ([90fa1dd](https://github.com/lachouettecoop/participation/commit/90fa1dd)), closes [#19](https://github.com/lachouettecoop/participation/issues/19)
* **ui:** ajout d’un bandeau « Beta test » pour indiquer l’état actuel de l’application ([12aba95](https://github.com/lachouettecoop/participation/commit/12aba95)), closes [#20](https://github.com/lachouettecoop/participation/issues/20)
* **ui:** changement de la couleur de la fenêtre de contact (rouge -> violet pâle) ([642fced](https://github.com/lachouettecoop/participation/commit/642fced)), closes [#17](https://github.com/lachouettecoop/participation/issues/17)
* **ui:** modification du texte et couleurs du récap global (bas) ([9cf4533](https://github.com/lachouettecoop/participation/commit/9cf4533)), closes [#18](https://github.com/lachouettecoop/participation/issues/18)
* **ui:** renommage de l’outil en « Information sur la participation » plutot que « Controle » ([33c3aed](https://github.com/lachouettecoop/participation/commit/33c3aed)), closes [#14](https://github.com/lachouettecoop/participation/issues/14)
* **ui:** renommage du bouton « Problème » en « Question, problème ? » ([6d246a9](https://github.com/lachouettecoop/participation/commit/6d246a9)), closes [#16](https://github.com/lachouettecoop/participation/issues/16)
* ajout de liens vers une page d’explication pour chaque indicateur ([1813723](https://github.com/lachouettecoop/participation/commit/1813723)), closes [#7](https://github.com/lachouettecoop/participation/issues/7)
* documentation des différents états et actions à proposer ([c5ca070](https://github.com/lachouettecoop/participation/commit/c5ca070)), closes [#7](https://github.com/lachouettecoop/participation/issues/7)
* POC de l’affichage de la frise et documentation ([e028a1f](https://github.com/lachouettecoop/participation/commit/e028a1f)), closes [#13](https://github.com/lachouettecoop/participation/issues/13)



# [0.3.0](https://github.com/lachouettecoop/participation/compare/0.2.0...0.3.0) (2019-02-27)


### Bug Fixes

* Ne pas utiliser le cache pour régénérer le Docker ([a91e54d](https://github.com/lachouettecoop/participation/commit/a91e54d))


### Features

* ajout d’un bouton de feedback sur les pages ([26c2aa0](https://github.com/lachouettecoop/participation/commit/26c2aa0)), closes [#2](https://github.com/lachouettecoop/participation/issues/2)
* ajout d’un formulaire envoyant le message sur Zulip ([f0d6c90](https://github.com/lachouettecoop/participation/commit/f0d6c90)), closes [#3](https://github.com/lachouettecoop/participation/issues/3)
* ajout du nombre de PIAF attendues sur la page Chouettos ([e8c8cde](https://github.com/lachouettecoop/participation/commit/e8c8cde)), closes [#4](https://github.com/lachouettecoop/participation/issues/4)
* **docker:** ajout d’un Dockerfile permettant de construire l’application ([473d70d](https://github.com/lachouettecoop/participation/commit/473d70d)), closes [#3](https://github.com/lachouettecoop/participation/issues/3)
* ajout protection URL par Traefik ([d1cc1b2](https://github.com/lachouettecoop/participation/commit/d1cc1b2)), closes [#6](https://github.com/lachouettecoop/participation/issues/6)
* codes couleurs mieux adaptés aux valeurs affichées ([9ad56ed](https://github.com/lachouettecoop/participation/commit/9ad56ed)), closes [/github.com/lachouettecoop/participation/issues/4#issuecomment-466734981](https://github.com//github.com/lachouettecoop/participation/issues/4/issues/issuecomment-466734981) [#4](https://github.com/lachouettecoop/participation/issues/4)
* connexion avec ses identifiants Zulip pour remonter un problème ([80d9530](https://github.com/lachouettecoop/participation/commit/80d9530)), closes [#2](https://github.com/lachouettecoop/participation/issues/2)
* utilisation d’un robot Zulip plutôt qu’une connexion utilisateur ([32ca7a5](https://github.com/lachouettecoop/participation/commit/32ca7a5)), closes [#2](https://github.com/lachouettecoop/participation/issues/2)


### Performance Improvements

* limitation du nombre de Chouettos affichés ([4993979](https://github.com/lachouettecoop/participation/commit/4993979))



# [0.2.0](https://github.com/lachouettecoop/participation/compare/0.1.1...0.2.0) (2019-02-23)


### Features

* ajout d’un champ pour filtrer les Chouettos par nom ([996c202](https://github.com/lachouettecoop/participation/commit/996c202)), closes [#5](https://github.com/lachouettecoop/participation/issues/5)
* ajout de la date de génération du site en pied de page ([140f636](https://github.com/lachouettecoop/participation/commit/140f636)), closes [#1](https://github.com/lachouettecoop/participation/issues/1)



## [0.1.1](https://github.com/lachouettecoop/participation/compare/0.1.0...0.1.1) (2019-02-23)


### Bug Fixes

* affichage du code barre correct sur la page utilisateur ([bdc6d2b](https://github.com/lachouettecoop/participation/commit/bdc6d2b))
* correction d’un problème quand le code barre est incorrect ([ac17354](https://github.com/lachouettecoop/participation/commit/ac17354))



# 0.1.0 (2019-02-22)


### Features

* initial commit with a working POC ([10d35a1](https://github.com/lachouettecoop/participation/commit/10d35a1))



