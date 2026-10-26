# Sauvegarde et restauration — Beth Loubavitch Bastille

## Ce qui est sauvegardé ici
- `schema.sql` : création de la table `contenu` et de ses droits (lecture publique, écriture réservée aux comptes connectés).
- `sauvegardes/contenu-AAAA-MM-JJ.json` : tout le contenu géré depuis l'Admin (événements, programme, repas, sections, pop-up, bandeau, infos, adresses, FAQ, textes, carreaux, avis) à la date indiquée.
- `sauvegardes/photo-*.jpeg` : les photos ajoutées depuis l'Admin.

Le site lui-même (pages, photos, scripts) est entièrement dans ce dépôt GitHub : chaque modification est une version, on peut revenir à n'importe laquelle.

## Projet Supabase
- Projet : `chabadbastille` (organisation « Beth Loubavitch Bastille », région Europe)
- URL : https://jfxebnoqulyzjaqnyoel.supabase.co
- Clé publique (publishable) : dans `js/site-data.js`. La clé secrète « service_role » n'est jamais mise dans le site.
- Stockage photos : dossier public `photos`.
- Authentification : inscriptions publiques désactivées ; Site URL = https://chabadbastille.fr/admin.html

## Restaurer le contenu
1. Supabase → SQL Editor → coller `schema.sql` → Run (si la table n'existe plus).
2. Table Editor → `contenu` → Insert row : `cle` = `site`, `data` = le contenu du champ `data` du fichier de sauvegarde.
3. Si le projet Supabase devait être recréé, changer l'URL et la clé publique en haut de `js/site-data.js`.

## Revenir à l'ancien site (WordPress chez Ionos)
DNS Ionos : A @ et A www → 217.160.0.168 ; AAAA @ et www → 2001:8d8:100f:f000:0:0:0:265 ; supprimer les 4 A GitHub et le CNAME www.
