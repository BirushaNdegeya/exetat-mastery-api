begin;

insert into test_year (id, subject_id, year, "createdAt", "updatedAt")
values
  ('50000000-0000-0000-0000-000000000001', '6a86071c-7ca0-4934-862e-abb4fad51d81', 2021, now(), now()),
  ('50000000-0000-0000-0000-000000000002', '22491153-42a7-4b73-a163-affdad92fc04', 2021, now(), now()),
  ('50000000-0000-0000-0000-000000000003', '8ccb349a-8d5f-4070-9505-a8565fe97f73', 2021, now(), now()),
  ('50000000-0000-0000-0000-000000000004', 'e744ea47-f5bd-463f-a0f7-2482977b6c65', 2020, now(), now()),
  ('50000000-0000-0000-0000-000000000005', 'e744ea47-f5bd-463f-a0f7-2482977b6c65', 2021, now(), now()),
  ('50000000-0000-0000-0000-000000000006', '6a86071c-7ca0-4934-862e-abb4fad51d81', 2022, now(), now()),
  ('50000000-0000-0000-0000-000000000007', '6a86071c-7ca0-4934-862e-abb4fad51d81', 2023, now(), now()),
  ('50000000-0000-0000-0000-000000000008', '6a86071c-7ca0-4934-862e-abb4fad51d81', 2024, now(), now()),
  ('50000000-0000-0000-0000-000000000009', '6a86071c-7ca0-4934-862e-abb4fad51d81', 2025, now(), now()),
  ('50000000-0000-0000-0000-000000000010', '22491153-42a7-4b73-a163-affdad92fc04', 2022, now(), now()),
  ('50000000-0000-0000-0000-000000000011', '22491153-42a7-4b73-a163-affdad92fc04', 2023, now(), now()),
  ('50000000-0000-0000-0000-000000000012', '22491153-42a7-4b73-a163-affdad92fc04', 2024, now(), now()),
  ('50000000-0000-0000-0000-000000000013', '22491153-42a7-4b73-a163-affdad92fc04', 2025, now(), now()),
  ('50000000-0000-0000-0000-000000000014', '8ccb349a-8d5f-4070-9505-a8565fe97f73', 2022, now(), now()),
  ('50000000-0000-0000-0000-000000000015', '8ccb349a-8d5f-4070-9505-a8565fe97f73', 2023, now(), now()),
  ('50000000-0000-0000-0000-000000000016', '8ccb349a-8d5f-4070-9505-a8565fe97f73', 2024, now(), now()),
  ('50000000-0000-0000-0000-000000000017', '8ccb349a-8d5f-4070-9505-a8565fe97f73', 2025, now(), now()),
  ('50000000-0000-0000-0000-000000000018', 'e744ea47-f5bd-463f-a0f7-2482977b6c65', 2022, now(), now()),
  ('50000000-0000-0000-0000-000000000019', 'e744ea47-f5bd-463f-a0f7-2482977b6c65', 2023, now(), now()),
  ('50000000-0000-0000-0000-000000000020', 'e744ea47-f5bd-463f-a0f7-2482977b6c65', 2024, now(), now()),
  ('50000000-0000-0000-0000-000000000021', 'e744ea47-f5bd-463f-a0f7-2482977b6c65', 2025, now(), now())
on conflict (subject_id, year) do update
set "updatedAt" = excluded."updatedAt";

delete from questions
where id between '40000000-0000-0000-0000-000000000001'::uuid and '40000000-0000-0000-0000-000000000999'::uuid;

delete from questions
where id between '70000000-0000-0000-0000-000000000001'::uuid and '70000000-0000-0000-0000-000000000999'::uuid;

delete from questions
where subject_id = '22491153-42a7-4b73-a163-affdad92fc04'
  and passage_group in (
    'langues-2020-demo',
    'langues-2021-demo'
  );

with seed_rows as (
  select *
  from (
    values
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2020, 'standard', null, null, null, 'La capitale de la RDC est :', '{"option1":"Kinshasa","option2":"Lubumbashi","option3":"Goma","option4":"Matadi","option5":"Mbuji-Mayi"}'::jsonb, 1, 'Kinshasa est la capitale du pays.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2020, 'standard', null, null, null, 'Combien de provinces compte la RDC ?', '{"option1":"11","option2":"18","option3":"26","option4":"30","option5":"35"}'::jsonb, 3, 'La RDC compte 26 provinces.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2020, 'standard', null, null, null, 'Un citoyen est une personne qui :', '{"option1":"Habite seulement a l etranger","option2":"Fait partie d un Etat","option3":"Travaille seulement a l hopital","option4":"Ne va jamais a l ecole","option5":"Vend uniquement au marche"}'::jsonb, 2, 'Un citoyen appartient a un Etat et y a des droits et devoirs.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2020, 'standard', null, null, null, 'Le drapeau de la RDC contient une etoile de couleur :', '{"option1":"Verte","option2":"Noire","option3":"Jaune","option4":"Blanche","option5":"Orange"}'::jsonb, 3, 'L etoile du drapeau congolais est jaune.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2020, 'standard', null, null, null, 'Une election permet surtout de :', '{"option1":"Choisir des dirigeants","option2":"Fermer les routes","option3":"Changer les saisons","option4":"Supprimer les ecoles","option5":"Fabriquer des lois seul"}'::jsonb, 1, 'Une election sert a choisir des dirigeants.'),

      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2021, 'standard', null, null, null, 'Quel organe vote les lois dans un pays ?', '{"option1":"Le parlement","option2":"La police","option3":"Le marche","option4":"L ecole","option5":"L hopital"}'::jsonb, 1, 'Le parlement vote les lois.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2021, 'standard', null, null, null, 'Le chef-lieu du Haut-Katanga est :', '{"option1":"Kolwezi","option2":"Likasi","option3":"Lubumbashi","option4":"Kamina","option5":"Mbuji-Mayi"}'::jsonb, 3, 'Lubumbashi est le chef-lieu du Haut-Katanga.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2021, 'standard', null, null, null, 'Une constitution est :', '{"option1":"Une chanson","option2":"La loi fondamentale d un Etat","option3":"Une route principale","option4":"Un uniforme","option5":"Une taxe"}'::jsonb, 2, 'La constitution est la loi fondamentale d un Etat.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2021, 'standard', null, null, null, 'La monnaie utilisee en RDC est :', '{"option1":"Le dollar canadien","option2":"Le rand","option3":"Le franc congolais","option4":"L euro","option5":"Le dirham"}'::jsonb, 3, 'La monnaie nationale est le franc congolais.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2021, 'standard', null, null, null, 'Un maire dirige generalement :', '{"option1":"Un village","option2":"Une ville","option3":"Un ocean","option4":"Une montagne","option5":"Une eglise"}'::jsonb, 2, 'Le maire dirige une ville.'),

      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2022, 'standard', null, null, null, 'Le continent ou se trouve la RDC est :', '{"option1":"Asie","option2":"Europe","option3":"Afrique","option4":"Amerique","option5":"Oceanie"}'::jsonb, 3, 'La RDC se trouve en Afrique.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2022, 'standard', null, null, null, 'Le fleuve le plus connu du pays est :', '{"option1":"Nil","option2":"Congo","option3":"Niger","option4":"Zambeze","option5":"Senegal"}'::jsonb, 2, 'Le fleuve Congo traverse la RDC.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2022, 'standard', null, null, null, 'Le respect des lois favorise :', '{"option1":"Le desordre","option2":"La paix sociale","option3":"La famine","option4":"La panne","option5":"La pollution seule"}'::jsonb, 2, 'Le respect des lois favorise la paix sociale.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2022, 'standard', null, null, null, 'Le vote est un :', '{"option1":"Devoir seulement","option2":"Droit civique","option3":"Sport","option4":"Jeu","option5":"Commerce"}'::jsonb, 2, 'Le vote est un droit civique.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2022, 'standard', null, null, null, 'Un recensement sert a compter :', '{"option1":"Seulement les voitures","option2":"La population","option3":"Les livres d une ecole","option4":"Les nuages","option5":"Les arbres d une rue"}'::jsonb, 2, 'Le recensement sert a compter la population.'),

      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2023, 'standard', null, null, null, 'La capitale administrative d un pays est souvent le siege :', '{"option1":"Des institutions","option2":"Des plantations seulement","option3":"Des mines seulement","option4":"Des matchs","option5":"Des marches nocturnes"}'::jsonb, 1, 'Les institutions principales s y trouvent.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2023, 'standard', null, null, null, 'La citoyennete implique aussi des :', '{"option1":"Decorations","option2":"Devoirs","option3":"Vacances","option4":"Billets gratuits","option5":"Sanctions automatiques"}'::jsonb, 2, 'La citoyennete implique des droits et des devoirs.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2023, 'standard', null, null, null, 'L hymne national est un :', '{"option1":"Poisson","option2":"Symbole national","option3":"Instrument medical","option4":"Vehicule","option5":"Dessert"}'::jsonb, 2, 'L hymne national est un symbole national.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2023, 'standard', null, null, null, 'Quand on partage la meme langue et les memes coutumes, on parle souvent de :', '{"option1":"Parti politique","option2":"Nation","option3":"Hopital","option4":"Autoroute","option5":"Usine"}'::jsonb, 2, 'Une nation peut partager langue, histoire et coutumes.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2023, 'standard', null, null, null, 'Les impots servent notamment a financer :', '{"option1":"Les services publics","option2":"La pluie","option3":"La lune","option4":"Les nuages","option5":"Le soleil"}'::jsonb, 1, 'Les impots financent les services publics.'),

      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2024, 'standard', null, null, null, 'Une commune est une subdivision de :', '{"option1":"Ville ou entite urbaine","option2":"Continents","option3":"Fleuves","option4":"Montagnes","option5":"Etoiles"}'::jsonb, 1, 'La commune est une subdivision administrative urbaine.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2024, 'standard', null, null, null, 'Le pluralisme politique permet :', '{"option1":"Un seul parti obligatoire","option2":"Plusieurs opinions et partis","option3":"La fermeture des ecoles","option4":"La fin des elections","option5":"Un seul journal"}'::jsonb, 2, 'Le pluralisme permet plusieurs opinions et partis.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2024, 'standard', null, null, null, 'Le passeport est un document de :', '{"option1":"Cuisine","option2":"Voyage","option3":"Meteo","option4":"Peinture","option5":"Sport"}'::jsonb, 2, 'Le passeport est un document de voyage.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2024, 'standard', null, null, null, 'Le civisme consiste a :', '{"option1":"Respecter les regles de vie commune","option2":"Refuser toute loi","option3":"Ne jamais voter","option4":"Detruire les biens publics","option5":"Ignorer les autres"}'::jsonb, 1, 'Le civisme consiste a respecter les regles de vie commune.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2024, 'standard', null, null, null, 'Une ambassade represente un pays :', '{"option1":"Dans un autre pays","option2":"Dans une montagne","option3":"Dans une ecole","option4":"Dans un stade","option5":"Dans une mine"}'::jsonb, 1, 'Une ambassade represente un pays a l etranger.'),

      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2025, 'standard', null, null, null, 'Le dialogue social aide surtout a :', '{"option1":"Aggraver les conflits","option2":"Trouver des solutions communes","option3":"Fermer les hopitaux","option4":"Supprimer les cours","option5":"Interdire toute reunion"}'::jsonb, 2, 'Le dialogue social aide a trouver des solutions communes.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2025, 'standard', null, null, null, 'Une ONG est generalement une organisation :', '{"option1":"Non gouvernementale","option2":"Miniere","option3":"Militaire","option4":"Meteorologique","option5":"Maritime"}'::jsonb, 1, 'ONG signifie organisation non gouvernementale.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2025, 'standard', null, null, null, 'Le bien commun concerne :', '{"option1":"Seulement une personne","option2":"L interet de tous","option3":"Uniquement les commercants","option4":"Un seul quartier","option5":"Les visiteurs seulement"}'::jsonb, 2, 'Le bien commun concerne l interet de tous.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2025, 'standard', null, null, null, 'La decentralisation rapproche la gestion :', '{"option1":"Des citoyens","option2":"Des nuages","option3":"Des planetes","option4":"Des volcans","option5":"Des saisons"}'::jsonb, 1, 'La decentralisation rapproche la gestion des citoyens.'),
      ('6a86071c-7ca0-4934-862e-abb4fad51d81'::uuid, 2025, 'standard', null, null, null, 'Le service public doit viser :', '{"option1":"L interet general","option2":"Le profit prive seulement","option3":"Le silence total","option4":"Le hasard","option5":"La nuit seulement"}'::jsonb, 1, 'Le service public vise l interet general.'),

      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2020, 'math_equation', null, null, null, '2 + 5 = ?', '{"option1":"5","option2":"6","option3":"7","option4":"8","option5":"9"}'::jsonb, 3, '2 + 5 = 7.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2020, 'math_equation', null, null, null, 'La formule chimique de l eau est :', '{"option1":"CO2","option2":"H2O","option3":"O2","option4":"NaCl","option5":"CH4"}'::jsonb, 2, 'L eau a pour formule H2O.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2020, 'math_equation', null, null, null, '3 x 4 = ?', '{"option1":"7","option2":"12","option3":"14","option4":"16","option5":"18"}'::jsonb, 2, '3 fois 4 donne 12.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2020, 'math_equation', null, null, null, 'Le soleil est une :', '{"option1":"Planete","option2":"Etoile","option3":"Roche","option4":"Riviere","option5":"Cellule"}'::jsonb, 2, 'Le soleil est une etoile.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2020, 'math_equation', null, null, null, 'Le gaz necessaire a la respiration est :', '{"option1":"Oxygene","option2":"Azote","option3":"Helium","option4":"Hydrogene","option5":"Methane"}'::jsonb, 1, 'Le corps humain utilise l oxygene pour respirer.'),

      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2021, 'math_equation', null, null, null, '10 / 2 = ?', '{"option1":"2","option2":"3","option3":"4","option4":"5","option5":"6"}'::jsonb, 4, '10 divise par 2 donne 5.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2021, 'math_equation', null, null, null, 'Une plante fabrique sa nourriture grace a :', '{"option1":"La photosynthese","option2":"La combustion","option3":"La rouille","option4":"La fusion","option5":"La casse"}'::jsonb, 1, 'Les plantes fabriquent leur nourriture par photosynthese.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2021, 'math_equation', null, null, null, '5 x 6 = ?', '{"option1":"11","option2":"25","option3":"30","option4":"35","option5":"40"}'::jsonb, 3, '5 fois 6 donne 30.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2021, 'math_equation', null, null, null, 'La terre tourne autour du :', '{"option1":"Soleil","option2":"Mars","option3":"Vent","option4":"Lac","option5":"Volcan"}'::jsonb, 1, 'La terre tourne autour du soleil.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2021, 'math_equation', null, null, null, 'L unite de masse la plus connue est :', '{"option1":"Metre","option2":"Kilogramme","option3":"Litre","option4":"Seconde","option5":"Volt"}'::jsonb, 2, 'Le kilogramme mesure la masse.'),

      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2022, 'math_equation', null, null, null, '7 + 8 = ?', '{"option1":"13","option2":"14","option3":"15","option4":"16","option5":"17"}'::jsonb, 3, '7 + 8 = 15.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2022, 'math_equation', null, null, null, '12 - 4 = ?', '{"option1":"6","option2":"7","option3":"8","option4":"9","option5":"10"}'::jsonb, 3, '12 - 4 = 8.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2022, 'math_equation', null, null, null, 'Le sang circule grace au :', '{"option1":"Foie","option2":"Coeur","option3":"Rein","option4":"Nez","option5":"Pouce"}'::jsonb, 2, 'Le coeur pompe le sang.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2022, 'math_equation', null, null, null, 'La lune est le satellite naturel de :', '{"option1":"Mars","option2":"Venus","option3":"La Terre","option4":"Mercure","option5":"Jupiter"}'::jsonb, 3, 'La lune est le satellite naturel de la Terre.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2022, 'math_equation', null, null, null, '4 x 9 = ?', '{"option1":"32","option2":"34","option3":"36","option4":"38","option5":"40"}'::jsonb, 3, '4 fois 9 donne 36.'),

      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2023, 'math_equation', null, null, null, '9 + 6 = ?', '{"option1":"13","option2":"14","option3":"15","option4":"16","option5":"17"}'::jsonb, 3, '9 + 6 = 15.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2023, 'math_equation', null, null, null, '18 / 3 = ?', '{"option1":"5","option2":"6","option3":"7","option4":"8","option5":"9"}'::jsonb, 2, '18 divise par 3 donne 6.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2023, 'math_equation', null, null, null, 'Une eclipse du soleil se produit quand :', '{"option1":"La lune cache le soleil","option2":"Le vent souffle","option3":"Il pleut","option4":"La terre disparait","option5":"La mer monte"}'::jsonb, 1, 'La lune peut cacher le soleil lors d une eclipse.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2023, 'math_equation', null, null, null, 'Le corps humain a besoin d eau pour :', '{"option1":"Rien","option2":"Bien fonctionner","option3":"Devenir une pierre","option4":"Arreter la respiration","option5":"Dormir cent heures"}'::jsonb, 2, 'L eau est essentielle au bon fonctionnement du corps.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2023, 'math_equation', null, null, null, '6 x 7 = ?', '{"option1":"40","option2":"41","option3":"42","option4":"43","option5":"44"}'::jsonb, 3, '6 fois 7 donne 42.'),

      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2024, 'math_equation', null, null, null, '25 - 10 = ?', '{"option1":"10","option2":"12","option3":"15","option4":"18","option5":"20"}'::jsonb, 3, '25 - 10 = 15.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2024, 'math_equation', null, null, null, 'Le melange de rouge et jaune donne souvent :', '{"option1":"Vert","option2":"Orange","option3":"Bleu","option4":"Noir","option5":"Blanc"}'::jsonb, 2, 'Rouge plus jaune donne orange.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2024, 'math_equation', null, null, null, 'Le squelette sert surtout a :', '{"option1":"Faire bouillir l eau","option2":"Soutenir le corps","option3":"Fabriquer des nuages","option4":"Eteindre le soleil","option5":"Mesurer le temps"}'::jsonb, 2, 'Le squelette soutient et protege le corps.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2024, 'math_equation', null, null, null, '8 x 8 = ?', '{"option1":"56","option2":"60","option3":"62","option4":"64","option5":"66"}'::jsonb, 4, '8 fois 8 donne 64.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2024, 'math_equation', null, null, null, 'L evaporation transforme un liquide en :', '{"option1":"Solide","option2":"Gaz","option3":"Bois","option4":"Pierre","option5":"Metal"}'::jsonb, 2, 'L evaporation transforme un liquide en gaz.'),

      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2025, 'math_equation', null, null, null, '30 / 5 = ?', '{"option1":"5","option2":"6","option3":"7","option4":"8","option5":"9"}'::jsonb, 2, '30 divise par 5 donne 6.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2025, 'math_equation', null, null, null, 'Le cerveau controle principalement :', '{"option1":"Les pensees et mouvements","option2":"Seulement les oreilles","option3":"Le sable","option4":"La pluie","option5":"Les montagnes"}'::jsonb, 1, 'Le cerveau controle les pensees et de nombreux mouvements.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2025, 'math_equation', null, null, null, '14 + 9 = ?', '{"option1":"21","option2":"22","option3":"23","option4":"24","option5":"25"}'::jsonb, 3, '14 + 9 = 23.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2025, 'math_equation', null, null, null, 'Le thermometre sert a mesurer :', '{"option1":"La longueur","option2":"La temperature","option3":"Le poids d une idee","option4":"Le bruit","option5":"La vitesse d une chaise"}'::jsonb, 2, 'Le thermometre mesure la temperature.'),
      ('8ccb349a-8d5f-4070-9505-a8565fe97f73'::uuid, 2025, 'math_equation', null, null, null, '9 x 9 = ?', '{"option1":"72","option2":"79","option3":"81","option4":"84","option5":"90"}'::jsonb, 3, '9 fois 9 donne 81.'),

      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2020, 'language_passage', 'francais', 'langues-2020-fr', 'Marie va au marche chaque matin pour acheter des legumes.', 'Lis le texte puis reponds : Ou va Marie chaque matin ?', '{"option1":"A l ecole","option2":"Au marche","option3":"A la riviere","option4":"A l aeroport","option5":"Au stade"}'::jsonb, 2, 'Le texte dit clairement que Marie va au marche.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2020, 'language_passage', 'francais', 'langues-2020-fr', 'Marie va au marche chaque matin pour acheter des legumes.', 'Dans le texte, qu achete Marie ?', '{"option1":"Des cahiers","option2":"Des habits","option3":"Des legumes","option4":"Des craies","option5":"Des chaussures"}'::jsonb, 3, 'Le texte dit que Marie achete des legumes.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2020, 'language_passage', 'francais', 'langues-2020-fr', 'Marie va au marche chaque matin pour acheter des legumes.', 'A quel moment Marie va-t-elle au marche ?', '{"option1":"Chaque matin","option2":"Chaque soir","option3":"Une fois par mois","option4":"Jamais","option5":"A midi seulement"}'::jsonb, 1, 'Le texte dit chaque matin.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2020, 'language_passage', 'anglais', 'langues-2020-en', 'Paul likes reading books after school because stories make him happy.', 'Why does Paul read books after school ?', '{"option1":"Because he is angry","option2":"Because stories make him happy","option3":"Because he hates books","option4":"Because he is sleeping","option5":"Because school is closed"}'::jsonb, 2, 'The passage says stories make him happy.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2020, 'language_passage', 'anglais', 'langues-2020-en', 'Paul likes reading books after school because stories make him happy.', 'When does Paul read books ?', '{"option1":"Before breakfast","option2":"After school","option3":"At midnight only","option4":"On Sunday only","option5":"Never"}'::jsonb, 2, 'The passage says after school.'),

      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2021, 'language_passage', 'anglais', 'langues-2021-en', 'John studies every evening because he wants to pass his exam.', 'Why does John study every evening ?', '{"option1":"To travel","option2":"To pass his exam","option3":"To sleep","option4":"To cook","option5":"To dance"}'::jsonb, 2, 'The passage says he wants to pass his exam.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2021, 'language_passage', 'anglais', 'langues-2021-en', 'John studies every evening because he wants to pass his exam.', 'When does John study ?', '{"option1":"Every evening","option2":"On Sunday only","option3":"At noon only","option4":"In the morning only","option5":"Never"}'::jsonb, 1, 'The passage says every evening.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2021, 'language_passage', 'anglais', 'langues-2021-en', 'John studies every evening because he wants to pass his exam.', 'What does John want to pass ?', '{"option1":"His exam","option2":"A bus","option3":"A river","option4":"A football match","option5":"A market"}'::jsonb, 1, 'He wants to pass his exam.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2021, 'language_passage', 'francais', 'langues-2021-fr', 'Amina nettoie sa classe avant le debut du cours pour travailler dans un endroit propre.', 'Pourquoi Amina nettoie-t-elle sa classe ?', '{"option1":"Pour jouer","option2":"Pour travailler dans un endroit propre","option3":"Pour rentrer a la maison","option4":"Pour fermer l ecole","option5":"Pour voyager"}'::jsonb, 2, 'Le texte parle d un endroit propre pour travailler.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2021, 'language_passage', 'francais', 'langues-2021-fr', 'Amina nettoie sa classe avant le debut du cours pour travailler dans un endroit propre.', 'Quand Amina nettoie-t-elle sa classe ?', '{"option1":"Apres la pluie","option2":"Avant le debut du cours","option3":"Pendant la nuit seulement","option4":"Jamais","option5":"Une fois par an"}'::jsonb, 2, 'Le texte dit avant le debut du cours.'),

      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2022, 'language_passage', 'francais', 'langues-2022-fr', 'Le petit garcon ferme la porte doucement pour ne pas reveiller le bebe.', 'Pourquoi le garcon ferme-t-il la porte doucement ?', '{"option1":"Pour ne pas reveiller le bebe","option2":"Pour casser la porte","option3":"Pour sortir rapidement","option4":"Pour jouer dehors","option5":"Pour prendre le bus"}'::jsonb, 1, 'Il veut eviter de reveiller le bebe.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2022, 'language_passage', 'francais', 'langues-2022-fr', 'Le petit garcon ferme la porte doucement pour ne pas reveiller le bebe.', 'Qui ne faut-il pas reveiller ?', '{"option1":"Le voisin","option2":"Le professeur","option3":"Le bebe","option4":"Le chauffeur","option5":"Le medecin"}'::jsonb, 3, 'Le texte mentionne le bebe.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2022, 'language_passage', 'francais', 'langues-2022-fr', 'Le petit garcon ferme la porte doucement pour ne pas reveiller le bebe.', 'Comment ferme-t-il la porte ?', '{"option1":"Fortement","option2":"Doucement","option3":"Avec un marteau","option4":"Avec bruit","option5":"Avec colere"}'::jsonb, 2, 'Le texte dit doucement.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2022, 'language_passage', 'anglais', 'langues-2022-en', 'The teacher smiles at the pupils because they answer the question correctly.', 'Why does the teacher smile ?', '{"option1":"Because the room is empty","option2":"Because the pupils answer correctly","option3":"Because she is sleeping","option4":"Because the bell is broken","option5":"Because nobody speaks"}'::jsonb, 2, 'The pupils answer correctly.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2022, 'language_passage', 'anglais', 'langues-2022-en', 'The teacher smiles at the pupils because they answer the question correctly.', 'Who answers the question ?', '{"option1":"The driver","option2":"The pupils","option3":"The nurse","option4":"The farmer","option5":"The tailor"}'::jsonb, 2, 'The passage mentions the pupils.'),

      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2023, 'language_passage', 'francais', 'langues-2023-fr', 'Mon frere porte un parapluie noir parce que le ciel est couvert et la pluie approche.', 'Pourquoi porte-t-il un parapluie ?', '{"option1":"Parce qu il fait nuit","option2":"Parce que la pluie approche","option3":"Parce qu il fait du sport","option4":"Parce qu il dort","option5":"Parce qu il cuisine"}'::jsonb, 2, 'Il porte un parapluie car la pluie approche.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2023, 'language_passage', 'francais', 'langues-2023-fr', 'Mon frere porte un parapluie noir parce que le ciel est couvert et la pluie approche.', 'De quelle couleur est le parapluie ?', '{"option1":"Rouge","option2":"Bleu","option3":"Noir","option4":"Vert","option5":"Jaune"}'::jsonb, 3, 'Le parapluie est noir.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2023, 'language_passage', 'francais', 'langues-2023-fr', 'Mon frere porte un parapluie noir parce que le ciel est couvert et la pluie approche.', 'Quel temps fait-il probablement ?', '{"option1":"Il va pleuvoir","option2":"Il neige fort","option3":"Il fait tres sec","option4":"Il y a un tremblement de terre","option5":"Il y a une eclipse"}'::jsonb, 1, 'Le ciel est couvert et la pluie approche.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2023, 'language_passage', 'anglais', 'langues-2023-en', 'Sara opens the window every morning to let fresh air enter the room.', 'Why does Sara open the window ?', '{"option1":"To let fresh air enter","option2":"To break the glass","option3":"To hide the room","option4":"To sleep outside","option5":"To close the door"}'::jsonb, 1, 'She wants fresh air to enter the room.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2023, 'language_passage', 'anglais', 'langues-2023-en', 'Sara opens the window every morning to let fresh air enter the room.', 'When does Sara open the window ?', '{"option1":"Every morning","option2":"Every night only","option3":"Once a year","option4":"On Monday only","option5":"Never"}'::jsonb, 1, 'The passage says every morning.'),

      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2024, 'language_passage', 'francais', 'langues-2024-fr', 'Les eleves relisent leurs notes avant le test afin de mieux retenir la lecon.', 'Pourquoi relisent-ils leurs notes ?', '{"option1":"Pour mieux retenir la lecon","option2":"Pour dechirer les pages","option3":"Pour vendre les cahiers","option4":"Pour sortir de classe","option5":"Pour oublier la lecon"}'::jsonb, 1, 'Ils relisent pour mieux retenir la lecon.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2024, 'language_passage', 'francais', 'langues-2024-fr', 'Les eleves relisent leurs notes avant le test afin de mieux retenir la lecon.', 'Quand relisent-ils leurs notes ?', '{"option1":"Apres les vacances","option2":"Avant le test","option3":"Apres minuit","option4":"Jamais","option5":"Seulement le dimanche"}'::jsonb, 2, 'Le texte dit avant le test.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2024, 'language_passage', 'francais', 'langues-2024-fr', 'Les eleves relisent leurs notes avant le test afin de mieux retenir la lecon.', 'Que veulent-ils mieux retenir ?', '{"option1":"La chanson","option2":"La lecon","option3":"Le match","option4":"La pluie","option5":"Le repas"}'::jsonb, 2, 'Ils veulent mieux retenir la lecon.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2024, 'language_passage', 'anglais', 'langues-2024-en', 'The nurse washes her hands carefully before helping the patient.', 'Why does the nurse wash her hands carefully ?', '{"option1":"Before helping the patient","option2":"Because the bus is late","option3":"Because the room is dark","option4":"Because she is angry","option5":"Because she is singing"}'::jsonb, 1, 'She washes her hands before helping the patient.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2024, 'language_passage', 'anglais', 'langues-2024-en', 'The nurse washes her hands carefully before helping the patient.', 'Who will the nurse help ?', '{"option1":"The driver","option2":"The patient","option3":"The teacher","option4":"The farmer","option5":"The tailor"}'::jsonb, 2, 'The passage says the patient.'),

      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2025, 'language_passage', 'francais', 'langues-2025-fr', 'Le jardinier arrose les fleurs tot le matin pour eviter la chaleur de midi.', 'Pourquoi arrose-t-il tot le matin ?', '{"option1":"Pour eviter la chaleur de midi","option2":"Pour jouer au ballon","option3":"Pour fermer le jardin","option4":"Pour dormir dehors","option5":"Pour vendre des cahiers"}'::jsonb, 1, 'Il veut eviter la chaleur de midi.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2025, 'language_passage', 'francais', 'langues-2025-fr', 'Le jardinier arrose les fleurs tot le matin pour eviter la chaleur de midi.', 'Qu arrose-t-il ?', '{"option1":"Les arbres seulement","option2":"Les fleurs","option3":"Les voitures","option4":"Les murs","option5":"Les toits"}'::jsonb, 2, 'Le texte parle des fleurs.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2025, 'language_passage', 'francais', 'langues-2025-fr', 'Le jardinier arrose les fleurs tot le matin pour eviter la chaleur de midi.', 'A quel moment les arrose-t-il ?', '{"option1":"Tot le matin","option2":"A minuit","option3":"A la tombée de la nuit seulement","option4":"Jamais","option5":"Pendant la tempete"}'::jsonb, 1, 'Le texte dit tot le matin.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2025, 'language_passage', 'anglais', 'langues-2025-en', 'The children line up quietly so that the teacher can count them easily.', 'Why do the children line up quietly ?', '{"option1":"So the teacher can count them easily","option2":"So they can sleep","option3":"So they can break the chairs","option4":"So they can miss school","option5":"So they can hide"}'::jsonb, 1, 'The teacher wants to count them easily.'),
      ('22491153-42a7-4b73-a163-affdad92fc04'::uuid, 2025, 'language_passage', 'anglais', 'langues-2025-en', 'The children line up quietly so that the teacher can count them easily.', 'Who counts the children ?', '{"option1":"The doctor","option2":"The teacher","option3":"The cook","option4":"The guard","option5":"The driver"}'::jsonb, 2, 'The teacher counts them.'),

      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2020, 'math_equation', null, null, null, '15 - 6 = ?', '{"option1":"7","option2":"8","option3":"9","option4":"10","option5":"11"}'::jsonb, 3, '15 moins 6 donne 9.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2020, 'math_equation', null, null, null, 'Le tiers de 12 est :', '{"option1":"2","option2":"3","option3":"4","option4":"5","option5":"6"}'::jsonb, 3, 'Le tiers de 12 est 4.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2020, 'math_equation', null, null, null, '5 + 8 = ?', '{"option1":"11","option2":"12","option3":"13","option4":"14","option5":"15"}'::jsonb, 3, '5 + 8 = 13.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2020, 'math_equation', null, null, null, 'Le double de 9 est :', '{"option1":"16","option2":"17","option3":"18","option4":"19","option5":"20"}'::jsonb, 3, 'Le double de 9 est 18.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2020, 'math_equation', null, null, null, '20 / 4 = ?', '{"option1":"4","option2":"5","option3":"6","option4":"7","option5":"8"}'::jsonb, 2, '20 divise par 4 donne 5.'),

      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2021, 'math_equation', null, null, null, '7 x 8 = ?', '{"option1":"54","option2":"56","option3":"58","option4":"60","option5":"64"}'::jsonb, 2, '7 fois 8 donne 56.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2021, 'math_equation', null, null, null, 'La moitie de 18 est :', '{"option1":"7","option2":"8","option3":"9","option4":"10","option5":"12"}'::jsonb, 3, 'La moitie de 18 est 9.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2021, 'math_equation', null, null, null, '9 + 9 = ?', '{"option1":"16","option2":"17","option3":"18","option4":"19","option5":"20"}'::jsonb, 3, '9 + 9 = 18.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2021, 'math_equation', null, null, null, 'Le quart de 20 est :', '{"option1":"4","option2":"5","option3":"6","option4":"7","option5":"8"}'::jsonb, 2, 'Le quart de 20 est 5.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2021, 'math_equation', null, null, null, '11 - 3 = ?', '{"option1":"6","option2":"7","option3":"8","option4":"9","option5":"10"}'::jsonb, 3, '11 - 3 = 8.'),

      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2022, 'math_equation', null, null, null, '6 x 6 = ?', '{"option1":"32","option2":"34","option3":"36","option4":"38","option5":"40"}'::jsonb, 3, '6 fois 6 donne 36.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2022, 'math_equation', null, null, null, '18 - 9 = ?', '{"option1":"7","option2":"8","option3":"9","option4":"10","option5":"11"}'::jsonb, 3, '18 - 9 = 9.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2022, 'math_equation', null, null, null, 'Le triple de 4 est :', '{"option1":"8","option2":"10","option3":"12","option4":"14","option5":"16"}'::jsonb, 3, 'Le triple de 4 est 12.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2022, 'math_equation', null, null, null, '24 / 6 = ?', '{"option1":"3","option2":"4","option3":"5","option4":"6","option5":"7"}'::jsonb, 2, '24 divise par 6 donne 4.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2022, 'math_equation', null, null, null, '8 + 7 = ?', '{"option1":"13","option2":"14","option3":"15","option4":"16","option5":"17"}'::jsonb, 3, '8 + 7 = 15.'),

      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2023, 'math_equation', null, null, null, '12 + 5 = ?', '{"option1":"15","option2":"16","option3":"17","option4":"18","option5":"19"}'::jsonb, 3, '12 + 5 = 17.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2023, 'math_equation', null, null, null, '21 / 3 = ?', '{"option1":"5","option2":"6","option3":"7","option4":"8","option5":"9"}'::jsonb, 3, '21 divise par 3 donne 7.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2023, 'math_equation', null, null, null, 'Le double de 11 est :', '{"option1":"20","option2":"21","option3":"22","option4":"23","option5":"24"}'::jsonb, 3, 'Le double de 11 est 22.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2023, 'math_equation', null, null, null, '14 - 8 = ?', '{"option1":"4","option2":"5","option3":"6","option4":"7","option5":"8"}'::jsonb, 3, '14 - 8 = 6.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2023, 'math_equation', null, null, null, '5 x 9 = ?', '{"option1":"40","option2":"42","option3":"45","option4":"48","option5":"50"}'::jsonb, 3, '5 fois 9 donne 45.'),

      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2024, 'math_equation', null, null, null, '16 / 2 = ?', '{"option1":"6","option2":"7","option3":"8","option4":"9","option5":"10"}'::jsonb, 3, '16 divise par 2 donne 8.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2024, 'math_equation', null, null, null, 'Le quadruple de 3 est :', '{"option1":"9","option2":"10","option3":"11","option4":"12","option5":"13"}'::jsonb, 4, 'Le quadruple de 3 est 12.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2024, 'math_equation', null, null, null, '19 - 7 = ?', '{"option1":"10","option2":"11","option3":"12","option4":"13","option5":"14"}'::jsonb, 3, '19 - 7 = 12.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2024, 'math_equation', null, null, null, '13 + 6 = ?', '{"option1":"17","option2":"18","option3":"19","option4":"20","option5":"21"}'::jsonb, 3, '13 + 6 = 19.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2024, 'math_equation', null, null, null, '8 x 7 = ?', '{"option1":"52","option2":"54","option3":"56","option4":"58","option5":"60"}'::jsonb, 3, '8 fois 7 donne 56.'),

      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2025, 'math_equation', null, null, null, '27 / 3 = ?', '{"option1":"7","option2":"8","option3":"9","option4":"10","option5":"11"}'::jsonb, 3, '27 divise par 3 donne 9.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2025, 'math_equation', null, null, null, 'Le quintuple de 2 est :', '{"option1":"8","option2":"9","option3":"10","option4":"11","option5":"12"}'::jsonb, 3, 'Le quintuple de 2 est 10.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2025, 'math_equation', null, null, null, '17 - 9 = ?', '{"option1":"6","option2":"7","option3":"8","option4":"9","option5":"10"}'::jsonb, 3, '17 - 9 = 8.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2025, 'math_equation', null, null, null, '15 + 8 = ?', '{"option1":"21","option2":"22","option3":"23","option4":"24","option5":"25"}'::jsonb, 3, '15 + 8 = 23.'),
      ('e744ea47-f5bd-463f-a0f7-2482977b6c65'::uuid, 2025, 'math_equation', null, null, null, '9 x 6 = ?', '{"option1":"50","option2":"52","option3":"54","option4":"56","option5":"58"}'::jsonb, 3, '9 fois 6 donne 54.')
  ) as t(subject_id, year, question_type, language, passage_group, passage, question_text, options, correct_answer, explanation)
),
numbered as (
  select
    ('70000000-0000-0000-0000-' || lpad(row_number() over (order by subject_id, year, question_text)::text, 12, '0'))::uuid as id,
    seed_rows.*
  from seed_rows
),
resolved as (
  select
    n.id,
    n.question_text,
    n.options,
    n.correct_answer,
    n.explanation,
    n.subject_id,
    n.year,
    t.id as test_year_id,
    n.passage,
    n.passage_group,
    n.question_type,
    n.language
  from numbered n
  join test_year t
    on t.subject_id = n.subject_id
   and t.year = n.year
)
insert into questions (
  id,
  question_text,
  options,
  correct_answer,
  explanation,
  subject_id,
  year,
  test_year_id,
  passage,
  passage_group,
  question_type,
  language,
  "createdAt",
  "updatedAt"
)
select
  id,
  question_text,
  options,
  correct_answer,
  explanation,
  subject_id,
  year,
  test_year_id,
  passage,
  passage_group,
  question_type,
  language,
  now(),
  now()
from resolved;

commit;
