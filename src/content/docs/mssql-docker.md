---
title: 'Installer et utiliser une DB MSSQL'
description: 'Avec une image Docker'
pubDate: 'Sep 16 2025'
heroImage: '/notes-blog/assets/sql-server-docker-logo.png'
---

### Prérequis

🐋 **Docker Desktop** -> [Téléchargez](https://www.docker.com/get-started/)  
🪟 **WSL Fonctionnel** -> Voir autre tuto quand créé

### Installer la BDD

Dans ce guide, nous allons utiliser l'interface GUI de docker appelée Docker Desktop.
Tout est faisable sur un terminal si vous préférez. 
Ouvrez maintenant Docker Desktop.

Cette étape ne concerne que les développeurs sur Windows : 

1. Allez dans les **Paramètres** de Docker Desktop.
2. Dans **Général**, sélectionnez **Use WSL 2 based engine** si ce n'est pas déjà le cas.
3. Cliquez sur **Appliquer**

Vous devriez maintenant avoir accès à Docker sur votre environnement WSL !

1. Ouvrez un terminal depuis VS Code sur l'env WSL
2. Installez l'image suivante :

```bash
docker pull mcr.microsoft.com/azure-sql-edge:latest
```

3. Créez le container :

```bash
docker run --cap-add SYS_PTRACE -e 'ACCEPT_EULA=1' \
  -e 'MSSQL_SA_PASSWORD=yourStrong(!)Password' \ 
  -p 1433:1433 --name azuresqledge \
  -d mcr.microsoft.com/azure-sql-edge
```

4. Dans Docker Desktop, ouvrez vos container, vous devez voir votre container en cours d'exécution. Cliquez ici :

Image trois petit point et sur open in terminal

5. Ouvrez mssql

```bash
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa \
  -P <your_password>
```

6. Créez la DB de votre choix

7. Installez l'extension de votre choix sur VSCode pour visualiser votre DB