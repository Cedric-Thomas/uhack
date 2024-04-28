Solution chickenNEST
Signalisation
1.	Application smartphone disponible pour le public
2.	Les signalements manuels sont intégrés à l’App et facilité seul une photo est nécessaire (Les données de localisation et informations personnelles du signalant sont automatiquement envoyé.)
3.	Détection automatique des anomalies sur route (Détection avec accéléromètre, et gyroscope, GPS) et transmet les données à l’API.
4.	Un modelé entrainé va confirmer qu’il s’agit bien d’un nid-de-poule, pas d’un ralentisseur ou d’un obstacle.
5.	Un signalement est émis sur Waze les utilisateurs confirme sa présence.
6.	Les signalements manuels et par les bus STO rapporte 3 points. Les images sont analysées par la même IA de classification.
7.	Les signalement Waze 2 point
8.	Les signalement automatique 1 point
9.	Dès qu’un nid de poule Atteint 15 point il est considéré qu’il existe.
10.	Grace a vitesse du véhicule et la durée de l’événement la taille du nid-poule-est estimé. (Vitesse m/s X durée de l’évènement) Les estimation des différents utilisateurs sur un même nid-de-poule sont agrégé pour avoir une taille précise.
11.	Une moyenne des données GPS est faite et comparé à l’open data du Québec qui nous indique le nombre moyen journalier de véhicule sur le tronçon.
12.	Une note est ensuite établie prenant en compte la fréquentation de la route et la taille du nid de poule, la mairie pourra décider de pondérer avec la date de détection pour évité qu’un nid-de-poule ne reste trop longtemps. (Cela nous donnera des indications sur la gravité et la priorité du nid-de-poule)
13.	Même si l’application est peu téléchargée cela fonctionnera grâce a Waze (Quelque centaine d’utilisateur devrai suffire, la mairie comptant 4000 employé un programme interne d’incitation peut être mis en place)

Spécifications
	Les données sont capturées 5 fois par seconde par l’accéléromètre et le gyroscope, le timestamps est aussi envoyée. Le timestamp de la première capture est défini a 0 et les suivant on le premier timestamp soustrait jusqu’à ce que l’évènement soit fini. L’IA accepte 15 captures en features (total de 1,5 secondes) si l’évènement est trop long les capture qui se ressemble le plus sont omis dans le préprocessing. Si celui-ci est trop court des valeurs intermédiaires sont créé en dupliquant les existantes. Un map intégré avec mapBox est intégré a l’application des point de differente forme indique les petits, moyens et gros nid-de-poules. Un tableau des scores est disponible avec un classement, crée un challenge, et incite les gens a signaler. Le système de reward fonctionne de cette façon : 
-	1 point pour les signalements automatique qui ont été confirmé
-	40 points pour un signalement manuel dont la véracité a été confirmé
 
![image](https://github.com/Cedric-Thomas/uhack/assets/163631970/9d4a00e3-733b-463e-bf2a-aa3e1c6ca74e)

Une base mongo est utilisée elle possède une collection signalement ainsi qu’une collection Nid, chaque signalement est lié a un nid de poule, un nid de poule n’est ni affiché ni comptabilisé tant qu’il n’a pas été confirmé. Une collection possède les données opendata des routes du Québec elle contienne le nombre de véhicules moyen par jour sur chaque année pour les dix dernières années. Les 3 dernière année sont agrégé, la Formule de haversine permet de déterminé sur quelle route se situe le nid-de-poule et le debit journalier moyen d’automobile de la route est utilisé pour déterminer la priorité de réparation. Les captures de l’application sont disponibles sur ce documents tandis que les maquettes sont dispo dans le github. Les modèles sont dispo dans le dossier modèles de l’api, et les fonctions dans le dossier controller. Voici les différentes routes implementé dans l’API : 

![image](https://github.com/Cedric-Thomas/uhack/assets/163631970/851439bb-e47a-493a-8859-96dcdc73450f)

 
Prévention
Gatineau possède 368 autobus
-	Desservent les voies importantes
-	Mise en place d’un système Caméra et IA de prédiction pour les fissures et les nids-de-poule
-	Système embarqué estimé à 250 $
-	Equipment des bus STO et bus scolaire pour un avoisinant les 100 000 dollars
-	Les bus ont déjà de la maintenance régulière et le système sera intégré à ce processus
-	
Optimisation des trajets
-	Un Dashboard est mis en place il permet de visualiser :
o	Les KPI des Equipes
o	L’évolution de la détection
o	Un agenda des équipes disponible et leur attribution
-	Les trajets sont définis sur cette interface ils sont prédits grâce au renforcement Learning, qui va prioriser les nid-de-poule les plus critique, tout en optimisant la proximité des missions.
-	Un système de récompense lors de la réparation d’un nid-de-poule et de malus a chaque kilomètre parcouru
-	Le système continuera d’être perfectionné par les trajets même après son déploiement, la mairie aura la possibilité de modifier la pondération pour arriver a un fonctionnement optimal 
Capture du Dashboard :
 
 ![image](https://github.com/Cedric-Thomas/uhack/assets/163631970/42155808-1a59-4111-b40b-5bc1822e0dbb)
![image](https://github.com/Cedric-Thomas/uhack/assets/163631970/8d2bce1a-7c8f-4c39-a83a-0e53eeaf1b87)
![image](https://github.com/Cedric-Thomas/uhack/assets/163631970/6a4b642c-cec8-4655-9479-bad30b2d31b6)

