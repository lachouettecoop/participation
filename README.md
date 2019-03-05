# Chouette Participation

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

**BÊTA** Cette application est en cours d’évaluation et de tests par les groupes
concernés.

Cette application est une application minimaliste permettant d’informer les
Chouettos sur la participation à l’entrée du Lab. En scannant une carte il est
possible de voir les informations clés de la participation de la personne.

## Documentation

Pas encore `¯\_(ツ)_/¯`

> À noter : ce projet utilise Gatsby, un générateur de site statique. Cela
> signifie que c’est **au moment du build** que les informations sont récupérées
> sur les services tiers. Ensuite l’application peut s’utiliser sans connexion
> internet (et donc de manière performante). L’inconvénient étant qu’il faut
> regénérer le site et le redéployer régulièrement.

## Présentation

Pas encore `¯\_(ツ)_/¯`

## Installation

- `npm install`
- créer un fichier `.env` avec les accès aux services tiers (exemple de fichier
  disponible dans `.env.dist`)

## Lancement

- En mode développeur : `npm run develop`
- En production : `npm run serve`

## Contribution

Nous suivons la convention https://www.conventionalcommits.org/ pour les
messages de commits, afin de permettre une publication simple des nouvelles
versions et des changelogs. Nous pensons que cela facilite le suivi du projet et
sa maintenance/reprise sur le long terme.

**Cela n’est pas très compliqué !** Au lieu de faire `git commit`, exécutez
`npm run commit` et laissez-vous guider !

## Release

- `GITHUB_TOKEN="xxxxxx" npm run release`

## Déploiement

### Manuel

- `npm run build`

Le contenu du dossier `public` peut alors être hébergé sur un hébergeur de site
statique.

### Docker

Le dépôt contient un `Dockerfile` permettant de construire une image à partir du
code source.

Cette image accepte un argument `VERSION` à la construction permettant de
construire le tag ou la branche souhaitée. Par défaut, la branche `master` est
utilisée.

> **IMPORTANT :** durant la construction de l’image, les variables
> d’environnement rendues disponibles

Voici un exemple d’usage :

- créer un nouveau dossier et y entrer
- récupérer le `Dockerfile` en local :

```shell
wget https://raw.githubusercontent.com/lachouettecoop/participation/master/Dockerfile
```

- créer un fichier `.env` contenant vos secrets (s’inspirer de `.env.dist`)
- créer un fichier `docker-compose.yml` proche du suivant (essentiellement la
  partie `services.web.build`)

```yml
version: "2.1"

services:
  web:
    build:
      context: .
      args:
        - VERSION=master
    restart: unless-stopped
    networks:
      default:
      inverseproxy_shared:
    labels:
      traefik.docker.network: "inverseproxy_shared"
      traefik.enable: "true"
      traefik.frontend.passHostHeader: "true"
      traefik.port: "80"
      traefik.frontend.rule: "Host:${PROXY_URL}"
      traefik.frontend.auth.basic.users: "${PROXY_USER}:${PROXY_PASS_ENC}"

networks:
  default:
    internal: true
    driver_opts:
      encrypted: 1
  inverseproxy_shared:
    external: true
```
