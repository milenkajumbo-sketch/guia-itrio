/* Contenido de la guía: datos, textos y bancos de preguntas */
const FACTS=[
 'Ytterby, un pueblo sueco, dio nombre a cuatro elementos: Y, Tb, Er e Yb.',
 'El itrio natural es 100 % <sup>89</sup>Y: un solo isótopo estable.',
 'Hay unas 400 veces más itrio que plata en la corteza terrestre.',
 'El YBCO es superconductor por debajo de unos 93 K, más caliente que el nitrógeno líquido (77 K).',
 'El <sup>90</sup>Y pierde la mitad de sus átomos cada 64,1 horas.',
 'Un LED blanco suele ser un LED azul con polvo de YAG:Ce encima.',
 'El láser verde de 532 nm suele ser un Nd:YAG con la frecuencia duplicada.',
 'El Y³⁺ mide casi lo mismo que el Ho³⁺: por eso se esconde entre los lantánidos.',
 'Las coronas dentales de zirconia blanca llevan unos pocos por ciento de óxido de itrio.'];

const MOODS={
 rojo:'Soy el fósforo rojo: óxido de itrio con europio (Y₂O₃:Eu³⁺). Emito cerca de 611 nm y pinté de rojo los televisores de tubo.',
 blanca:'Luz blanca: un LED azul ilumina un fósforo YAG:Ce. Su amarillo más el azul que sobra se ven blancos.',
 laser:'Láser Nd:YAG: un cristal de YAG con neodimio emite a 1064 nm, infrarrojo e invisible. Aquí lo dibujo para que lo veas.',
 verde:'Si al Nd:YAG le duplicas la frecuencia, 1064 nm pasa a 532 nm: el verde de muchos punteros láser.',
 frio:'Me enfrié con nitrógeno líquido como el YBCO: por debajo de unos 93 K conduzco sin resistencia.'};

const TIPS={
 'que-es':'Tip: el itrio no es lantánido, pero se comporta como uno. Por eso va con las tierras raras.',
 tabla:'Toca mi casilla, la amarilla: período 5, grupo 3.',
 historia:'Apúntalo: Gadolin, 1794. Es la pregunta clásica.',
 atomicos:'Fórmula de examen: neutrones = A − Z. Para <sup>89</sup>Y: 89 − 39 = 50.',
 configuracion:'Pulsa «Llenar desde cero» y mira cómo el 5s se llena antes que el 4d.',
 propiedades:'Fusión 1526 °C, ebullición 2930 °C. Densidad parecida a la del titanio.',
 enlaces:'Metal solo: metálico. Metal + no metal: iónico. No metal + no metal: covalente.',
 calculadora:'Prueba a escribir tu propia fórmula, por ejemplo Y(NO3)3.',
 aplicaciones:'Toca las marcas del espectro: el rojo, el verde y dos láseres invisibles.',
 extraccion:'Separar tierras raras es difícil: sus iones miden casi lo mismo.',
 duracion:'El <sup>89</sup>Y es estable. El <sup>90</sup>Y se reduce a la mitad cada 64,1 horas.',
 curiosos:'Toca las tarjetas para girarlas.',
 juego:'Memoria + química. ¿Lo haces en menos de 12 movimientos?',
 fichas:'Sé honesto con «Lo sabía»: así la repetición espaciada funciona.',
 glosario:'Si una palabra te frena, búscala aquí.',
 conclusion:'Resumen listo. Puedes imprimirlo. ¿Te animas con el quiz?',
 quiz:'Tú puedes. Lee con calma cada opción.',
 logros:'¡Mira cuántos logros llevas!'};

const TL=[
 ['1787','Arrhenius halla la roca','Carl Axel Arrhenius, teniente sueco y mineralogista aficionado, encuentra una roca negra y pesada en la cantera de Ytterby. La llama «ytterbita» (hoy, gadolinita).'],
 ['1794','Gadolin aísla un óxido nuevo','El químico finlandés Johan Gadolin analiza el mineral y descubre que contiene una «tierra» desconocida. Esta es la fecha oficial del descubrimiento del itrio.'],
 ['1797','Ekeberg lo confirma','Anders Ekeberg confirma el hallazgo y bautiza el óxido como «itria».'],
 ['1828','Wöhler obtiene el metal','Friedrich Wöhler consigue por primera vez itrio metálico, aunque impuro.'],
 ['1843','Mosander separa la itria','Carl Gustaf Mosander demuestra que la itria era una mezcla de tres óxidos: itria, erbia y terbia.'],
 ['1960s','Rojo para la televisión en color','El fósforo de óxido de itrio con europio se adopta para el rojo de los televisores de tubo y, más tarde, de las lámparas fluorescentes.'],
 ['1964','Nace el láser Nd:YAG','En los Laboratorios Bell se demuestra el primer láser de granate de itrio y aluminio dopado con neodimio, hoy uno de los láseres más usados.'],
 ['1987','Superconductor YBCO','Se descubre el YBa₂Cu₃O₇, el primer superconductor que trabaja por encima de la temperatura del nitrógeno líquido (unos 93 K).'],
 ['1990s','LED blanco','El LED azul de nitruro de galio, combinado con el fósforo YAG:Ce, da el LED blanco que hoy ilumina casas y pantallas.']];

const ISO={87:{t:79.8,u:'h',mode:'Captura electrónica',prod:'⁸⁷Sr'},88:{t:106.6,u:'d',mode:'Captura electrónica / β⁺',prod:'⁸⁸Sr'},89:{st:1},90:{t:64.1,u:'h',mode:'β⁻',prod:'⁹⁰Zr'},91:{t:58.5,u:'d',mode:'β⁻',prod:'⁹¹Zr'}};
const SUP={87:'⁸⁷',88:'⁸⁸',89:'⁸⁹',90:'⁹⁰',91:'⁹¹'};

const CATN={pantallas:'Pantallas e iluminación',laseres:'Láseres',industria:'Cerámicas e industria',medicina:'Medicina'};
const APPS=[
 ['LED blanco','pantallas','Y₃Al₅O₁₂:Ce³⁺','Un LED azul excita un polvo de YAG con cerio. El polvo emite amarillo; el azul que sobra y el amarillo se ven como luz blanca.','blanca'],
 ['Rojo de las pantallas','pantallas','Y₂O₃:Eu³⁺','El europio dentro del óxido de itrio emite rojo cerca de 611 nm. Se usó en televisores de tubo y en lámparas fluorescentes.','rojo'],
 ['Láser Nd:YAG','laseres','Nd:Y₃Al₅O₁₂','Un cristal de YAG con neodimio emite a 1064 nm (infrarrojo). Corta y suelda metales, mide distancias y se usa en cirugía.','laser'],
 ['Láser verde','laseres','Nd:YAG ×2','Un cristal no lineal duplica la frecuencia del Nd:YAG: 1064 nm se convierte en 532 nm, luz verde.','verde'],
 ['Láser Er:YAG','laseres medicina','Er:Y₃Al₅O₁₂','Emite a 2940 nm, una longitud de onda que el agua absorbe con fuerza. Retira tejido con precisión en odontología y dermatología.'],
 ['Zirconia estabilizada','industria','ZrO₂ + Y₂O₃','Unos pocos por ciento de Y₂O₃ evitan que la zirconia se agriete con los cambios de temperatura. Se usa en recubrimientos de turbinas, sensores de oxígeno, pilas de combustible y coronas dentales.'],
 ['Superconductor YBCO','industria','YBa₂Cu₃O₇','Cerámica que pierde su resistencia eléctrica por debajo de unos 93 K. Se emplea en cables y electroimanes superconductores.','frio'],
 ['Aleaciones ligeras','industria','Al–Y · Mg–Y','Pequeñas cantidades de itrio mejoran la resistencia al calor y a la oxidación de aleaciones de aluminio y magnesio.'],
 ['Filtros de microondas','industria','Y₃Fe₅O₁₂ (YIG)','El granate de itrio y hierro se usa en filtros y osciladores de equipos de microondas.'],
 ['Radioembolización','medicina','⁹⁰Y','Microesferas con itrio-90 se inyectan en la arteria que alimenta un tumor de hígado. Emiten radiación beta de corto alcance y la dosis se concentra en el tumor.'],
 ['Anticuerpos marcados','medicina','⁹⁰Y-ibritumomab','El ⁹⁰Y se une a un anticuerpo que busca células de ciertos linfomas no Hodgkin y las irradia desde muy cerca.']];

/* Espectro: nm, etiqueta, color, título, texto, mood */
const SPEC=[
 [450,'450','#3d5bff','LED azul (InGaN)','El chip de un LED blanco emite azul. Parte de esa luz la absorbe el fósforo YAG:Ce.',null],
 [532,'532','#2fd14a','Láser verde (Nd:YAG ×2)','La mitad de 1064 nm: un cristal duplica la frecuencia del Nd:YAG y la luz se vuelve verde.','verde'],
 [560,'YAG:Ce','#f4c400','Fósforo YAG:Ce','Emite una banda ancha amarilla, con máximo cerca de 550–560 nm. Amarillo + azul = blanco.','blanca'],
 [611,'611','#ff2a2a','Fósforo rojo Y₂O₃:Eu³⁺','Una línea roja muy estrecha y pura: el rojo de los televisores de tubo y de muchas lámparas fluorescentes.','rojo'],
 [1064,'1064','#7a1020','Láser Nd:YAG','Infrarrojo cercano, invisible. Corta, suelda y marca metales; también se usa en cirugía.','laser'],
 [2940,'2940','#4a0a14','Láser Er:YAG','Infrarrojo medio. El agua lo absorbe muchísimo, así que vaporiza tejido superficial con gran precisión.',null]];

const STEPS=[
 ['Mineral de partida','Se extrae el mineral que contiene tierras raras: xenotima, monacita o arcillas de adsorción iónica. China concentra la mayor parte de la producción y del refinado mundial.',''],
 ['Trituración y concentración','El mineral se tritura y se muele. Con flotación y separación magnética o por gravedad se eliminan minerales sin interés y sube la proporción de tierras raras.',''],
 ['Apertura química','Se rompe el mineral con ácido sulfúrico concentrado y caliente o con hidróxido de sodio. Con NaOH, el fosfato de la xenotima da un hidróxido que luego se disuelve en ácido.','YPO₄ + 3 NaOH → Y(OH)₃ + Na₃PO₄\nY(OH)₃ + 3 HCl → YCl₃ + 3 H₂O'],
 ['Separación y purificación','Las tierras raras forman iones 3+ de tamaño parecido, así que cuesta separarlas. Se usan decenas o cientos de etapas de extracción por solventes (con extractantes organofosforados) o columnas de intercambio iónico. Se obtienen soluciones de YCl₃ con pureza de 99,99 % o más.',''],
 ['Precipitación y calcinación','Se añade ácido oxálico para precipitar oxalato de itrio. Al calentarlo en aire se obtiene el óxido Y₂O₃, el producto comercial más habitual.','2 Y³⁺ + 3 C₂O₄²⁻ → Y₂(C₂O₄)₃↓\n2 Y₂(C₂O₄)₃ + 3 O₂ → 2 Y₂O₃ + 12 CO₂'],
 ['Reducción a metal','El óxido se convierte en fluoruro y este se reduce con calcio en atmósfera inerte. El metal se refina después fundiéndolo al vacío.','Y₂O₃ + 6 HF → 2 YF₃ + 3 H₂O\n2 YF₃ + 3 Ca → 2 Y + 3 CaF₂']];

const FL=[
 ['Cuatro en uno','Ytterby dio nombre a cuatro elementos: itrio (Y), terbio (Tb), erbio (Er) e iterbio (Yb). Todos salieron de la misma cantera sueca.'],
 ['Más común que la plata','En la corteza terrestre hay unas 400 veces más itrio que plata. «Tierra rara» no significa escaso.'],
 ['Superconductor barato','El YBCO conduce sin resistencia por debajo de unos 93 K (−180 °C). El nitrógeno líquido hierve a 77 K, así que basta para enfriarlo.'],
 ['Diamante falso','Antes de la zirconia cúbica, los cristales de YAG se vendieron como imitación de diamante: son duros y transparentes.'],
 ['Roca lunar','Las rocas lunares traídas por las misiones Apolo tienen un contenido de itrio relativamente alto.'],
 ['Radiación de corto alcance','La radiación beta del ⁹⁰Y recorre en promedio unos 2,5 mm en tejido, por eso se puede aplicar dentro de un tumor.'],
 ['Un solo isótopo','El itrio natural es 100 % ⁸⁹Y. Los elementos con un único isótopo natural se llaman monoisotópicos.'],
 ['Gemelo de los lantánidos','El ion Y³⁺ mide unos 90 pm, casi igual que el Ho³⁺. Por eso aparece mezclado con los lantánidos pesados y cuesta separarlo.'],
 ['Un verde que es infrarrojo','Muchos punteros verdes contienen un láser infrarrojo de Nd:YVO₄ o Nd:YAG cuya luz se duplica a 532 nm.'],
 ['En tu boca, quizá','Las coronas dentales blancas de zirconia llevan óxido de itrio para no agrietarse.']];

/* Juego de parejas: [material, uso] */
const PAIRS=[
 ['YAG:Ce','LED blanco'],['Y₂O₃:Eu','Rojo de pantallas'],['Nd:YAG','Láser de 1064 nm'],
 ['YSZ','Coronas dentales y turbinas'],['YBCO','Superconductor a 93 K'],['⁹⁰Y','Radioembolización']];

/* Quiz: [pregunta, opciones, índice correcto, explicación, capítulo] */
const Q=[
 ['¿Cuál es el número atómico del itrio?',['29','39','49','89'],1,'Z = 39 es el número de protones. El 89 es el número másico del isótopo natural.','atomicos'],
 ['¿Quién descubrió el itrio y en qué año?',['Friedrich Wöhler, 1828','Carl Axel Arrhenius, 1787','Johan Gadolin, 1794','Carl Mosander, 1843'],2,'Arrhenius halló el mineral en 1787, Gadolin aisló el óxido nuevo en 1794 y Wöhler obtuvo el metal en 1828.','historia'],
 ['¿De dónde viene el nombre del itrio?',['Del pueblo sueco de Ytterby','De su descubridor, Gadolin','De su color amarillo','De una diosa nórdica'],0,'Viene de Ytterby, la cantera sueca donde apareció el mineral.','historia'],
 ['¿Cuántos neutrones tiene el átomo de ⁸⁹Y?',['39','50','89','128'],1,'N = A − Z = 89 − 39 = 50.','atomicos'],
 ['¿Qué enlace predomina en el óxido de itrio, Y₂O₃?',['Metálico','Covalente apolar','Iónico','Puente de hidrógeno'],2,'Y³⁺ y O²⁻ forman una red iónica: 2(+3) + 3(−2) = 0.','enlaces'],
 ['En un LED blanco, ¿qué hace el fósforo YAG:Ce?',['Convierte parte de la luz azul en amarilla; la mezcla se ve blanca','Emite luz roja intensa','Enfría el chip','Genera el láser infrarrojo'],0,'El LED es azul; el YAG:Ce añade amarillo y juntos dan luz blanca.','aplicaciones'],
 ['¿Qué mineral tiene itrio como componente principal?',['Halita','Xenotima (YPO₄)','Cuarzo','Bauxita'],1,'La xenotima es un fosfato de itrio.','extraccion'],
 ['¿Qué isótopo se usa en radioembolización y cuál es su semivida?',['⁹⁰Y, 64,1 horas','⁸⁹Y, 64,1 horas','⁹⁰Y, 64,1 días','⁸⁸Y, 106 horas'],0,'El ⁹⁰Y es radiactivo (β⁻) y tiene t½ = 64,1 h. El ⁸⁹Y es estable.','duracion'],
 ['¿Cuál es el único isótopo natural del itrio?',['⁸⁷Y','⁸⁸Y','⁸⁹Y','⁹⁰Y'],2,'El itrio natural es 100 % ⁸⁹Y, estable.','duracion'],
 ['Empiezas con 100 átomos de ⁹⁰Y. ¿Cuántos quedan tras tres semividas (≈ 8 días)?',['50','25','12,5','6,25'],2,'100 → 50 → 25 → 12,5. Tres semividas son 3 × 64,1 h ≈ 192 h ≈ 8 días.','duracion'],
 ['¿A qué grupo de la tabla periódica pertenece el itrio?',['1','2','3','13'],2,'Está en el grupo 3, con el escandio, debajo de él.','tabla'],
 ['¿Cuál es la configuración electrónica abreviada del itrio?',['[Kr] 4d¹ 5s²','[Ar] 3d¹ 4s²','[Kr] 5s² 5p¹','[Xe] 5d¹ 6s²'],0,'Tras el kriptón (36 e⁻) se llenan 5s² y luego 4d¹. [Ar] 3d¹ 4s² es el escandio.','configuracion'],
 ['¿Cuántos electrones tiene el ion Y³⁺?',['39','42','36','33'],2,'Pierde 3 electrones: 39 − 3 = 36.','atomicos'],
 ['¿La configuración del Y³⁺ es igual a la de qué gas noble?',['Argón','Kriptón','Xenón','Neón'],1,'Y³⁺ tiene 36 electrones, como el kriptón: [Kr].','configuracion'],
 ['¿Cuál es la densidad del itrio?',['2,70 g/cm³','4,47 g/cm³','7,87 g/cm³','11,34 g/cm³'],1,'4,47 g/cm³, casi igual que el titanio (4,51). 2,70 es el aluminio.','propiedades'],
 ['¿Cuál es el punto de fusión del itrio?',['920 °C','1526 °C','2930 °C','660 °C'],1,'Funde a 1526 °C y hierve a 2930 °C.','propiedades'],
 ['Masa molar del Y₂O₃ (Y = 88,91; O = 16,00):',['104,9 g/mol','225,8 g/mol','193,8 g/mol','266,7 g/mol'],1,'2 × 88,91 + 3 × 16,00 = 177,8 + 48,0 = 225,8 g/mol.','calculadora'],
 ['¿Qué porcentaje en masa del Y₂O₃ es itrio, aproximadamente?',['50 %','62 %','79 %','89 %'],2,'177,8 / 225,8 × 100 ≈ 78,7 %.','calculadora'],
 ['¿Cuántos moles hay en 88,9 g de itrio?',['0,5','1','2','39'],1,'n = m / M = 88,9 / 88,9 = 1 mol.','calculadora'],
 ['¿A qué longitud de onda emite el láser Nd:YAG?',['532 nm','611 nm','1064 nm','2940 nm'],2,'1064 nm, infrarrojo. 532 nm es su versión duplicada (verde).','aplicaciones'],
 ['¿Por qué el láser Er:YAG sirve en odontología y dermatología?',['El agua absorbe con fuerza su luz de 2940 nm','Emite luz ultravioleta','Es radiactivo','Enfría el tejido'],0,'El agua del tejido absorbe la luz de 2940 nm y se vaporiza una capa muy fina.','aplicaciones'],
 ['¿Qué aporta el Y₂O₃ a la zirconia (YSZ)?',['Color amarillo','Estabiliza su estructura y evita grietas','La vuelve un metal','La hace radiactiva'],1,'Estabiliza la fase cristalina y evita grietas con los cambios de temperatura.','aplicaciones'],
 ['¿Por debajo de qué temperatura es superconductor el YBCO?',['≈ 4 K','≈ 93 K','≈ 300 K','≈ 1000 K'],1,'Unos 93 K: basta con nitrógeno líquido (77 K) para enfriarlo.','aplicaciones'],
 ['¿Con qué metal se reduce el YF₃ para obtener itrio metálico?',['Calcio','Hierro','Cobre','Plata'],0,'2 YF₃ + 3 Ca → 2 Y + 3 CaF₂.','extraccion'],
 ['¿Qué técnica separa el itrio de las otras tierras raras?',['Destilación simple','Extracción por solventes','Filtración','Imanes'],1,'Decenas o cientos de etapas de extracción por solventes o intercambio iónico.','extraccion'],
 ['¿Qué tipo de desintegración tiene el ⁹⁰Y?',['α','β⁻','β⁺','Solo γ'],1,'Emite una partícula beta negativa (un electrón).','duracion'],
 ['¿En qué se transforma el ⁹⁰Y al desintegrarse?',['⁹⁰Sr','⁹⁰Zr','⁸⁹Y','⁹⁰Nb'],1,'En la desintegración β⁻ un neutrón pasa a protón: Z sube de 39 a 40 (circonio).','duracion'],
 ['¿Por qué se llaman «raras» las tierras raras?',['Son escasísimas','Son difíciles de separar entre sí, no escasas','Solo existen en la Luna','Son gases nobles'],1,'El itrio es unas 400 veces más abundante que la plata; lo difícil es separarlo.','que-es'],
 ['¿Cuántos elementos llevan el nombre de Ytterby?',['1','2','4','6'],2,'Cuatro: itrio, terbio, erbio e iterbio.','historia'],
 ['¿Qué enlace hay entre P y O dentro del ion fosfato?',['Iónico','Metálico','Covalente','Ninguno'],2,'No metal + no metal: comparten electrones, enlace covalente.','enlaces']];

/* Fichas: [frente, reverso] */
const CARDS=[
 ['Símbolo y número atómico del itrio','Y · Z = 39'],
 ['Masa atómica del itrio','88,906 u'],
 ['Grupo, período y bloque','Grupo 3 · período 5 · bloque d'],
 ['Configuración electrónica','[Kr] 4d¹ 5s²'],
 ['Ion más común','Y³⁺ (36 electrones, configuración [Kr])'],
 ['Partículas del ⁸⁹Y','39 protones · 50 neutrones · 39 electrones'],
 ['¿Quién y cuándo lo descubrió?','Johan Gadolin, 1794'],
 ['¿De dónde viene su nombre?','De Ytterby, un pueblo de Suecia'],
 ['Punto de fusión y ebullición','1526 °C · 2930 °C'],
 ['Densidad','4,47 g/cm³'],
 ['Electronegatividad (Pauling)','1,22'],
 ['Estructura cristalina','Hexagonal compacta'],
 ['Reacción con oxígeno','4 Y + 3 O₂ → 2 Y₂O₃'],
 ['Masa molar del Y₂O₃','225,81 g/mol'],
 ['Fósforo del LED blanco','YAG:Ce (Y₃Al₅O₁₂:Ce³⁺)'],
 ['Fósforo rojo de pantallas','Y₂O₃:Eu³⁺ (≈ 611 nm)'],
 ['Longitud de onda del Nd:YAG','1064 nm (infrarrojo)'],
 ['Superconductor de itrio','YBa₂Cu₃O₇ (YBCO), ≈ 93 K'],
 ['Mineral principal','Xenotima, YPO₄'],
 ['Reducción a metal','2 YF₃ + 3 Ca → 2 Y + 3 CaF₂'],
 ['Semivida del ⁹⁰Y','64,1 horas (desintegración β⁻ → ⁹⁰Zr)'],
 ['Uso médico del ⁹⁰Y','Radioembolización de tumores de hígado'],
 ['¿Cuántas tierras raras hay?','17: Sc, Y y los 15 lantánidos'],
 ['YSZ','Zirconia estabilizada con itria: turbinas, sensores, coronas dentales']];

const GLOSS=[
 ['Calcinación','Calentar un sólido a alta temperatura en aire para descomponerlo; así el oxalato de itrio pasa a Y₂O₃.'],
 ['Catión','Ion con carga positiva, como Y³⁺.'],
 ['Configuración electrónica','Forma en que los electrones se reparten en los subniveles de un átomo. Itrio: [Kr] 4d¹ 5s².'],
 ['Desintegración beta','Un neutrón se convierte en protón y se emite un electrón (β⁻). El ⁹⁰Y pasa a ⁹⁰Zr.'],
 ['Dopante','Pequeña cantidad de otro elemento añadida a un cristal para darle una propiedad, como el Nd en el YAG.'],
 ['Electronegatividad','Tendencia de un átomo a atraer los electrones de un enlace. Itrio: 1,22.'],
 ['Enlace covalente','Unión en la que dos átomos comparten electrones; típico entre no metales.'],
 ['Enlace iónico','Unión por atracción entre iones de carga opuesta; típico entre metal y no metal.'],
 ['Enlace metálico','Cationes en una red rodeados de electrones libres que se mueven entre ellos.'],
 ['Extracción por solventes','Separación que reparte los iones entre una fase acuosa y una orgánica; se repite muchas veces.'],
 ['Fósforo (material)','Sólido que absorbe energía y la emite como luz visible. No es el elemento fósforo.'],
 ['Granate (YAG)','Familia de cristales; el YAG es granate de itrio y aluminio, Y₃Al₅O₁₂.'],
 ['Ion','Átomo o grupo de átomos con carga eléctrica por haber ganado o perdido electrones.'],
 ['Isótopo','Átomos del mismo elemento con distinto número de neutrones, como ⁸⁹Y y ⁹⁰Y.'],
 ['Lantánidos','Los 15 elementos del lantano (57) al lutecio (71).'],
 ['Masa molar','Masa de un mol de sustancia, en g/mol. Se suma la masa de cada átomo de la fórmula.'],
 ['Mol','Cantidad de sustancia que contiene 6,022 × 10²³ partículas.'],
 ['Monoisotópico','Elemento con un único isótopo natural. El itrio lo es: solo ⁸⁹Y.'],
 ['Número atómico (Z)','Número de protones del núcleo. Define el elemento.'],
 ['Número másico (A)','Protones más neutrones del núcleo.'],
 ['Radioembolización','Tratamiento que lleva microesferas con ⁹⁰Y a los vasos de un tumor para irradiarlo desde dentro.'],
 ['Semivida (t½)','Tiempo en que se desintegra la mitad de los núcleos radiactivos de una muestra.'],
 ['Superconductor','Material que conduce la electricidad sin resistencia por debajo de cierta temperatura.'],
 ['Tierras raras','Grupo de 17 elementos: escandio, itrio y los lantánidos.']];

/* Tabla periódica */
const SYM='H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');
const NAMES='Hidrógeno,Helio,Litio,Berilio,Boro,Carbono,Nitrógeno,Oxígeno,Flúor,Neón,Sodio,Magnesio,Aluminio,Silicio,Fósforo,Azufre,Cloro,Argón,Potasio,Calcio,Escandio,Titanio,Vanadio,Cromo,Manganeso,Hierro,Cobalto,Níquel,Cobre,Zinc,Galio,Germanio,Arsénico,Selenio,Bromo,Kriptón,Rubidio,Estroncio,Itrio,Circonio,Niobio,Molibdeno,Tecnecio,Rutenio,Rodio,Paladio,Plata,Cadmio,Indio,Estaño,Antimonio,Telurio,Yodo,Xenón,Cesio,Bario,Lantano,Cerio,Praseodimio,Neodimio,Prometio,Samario,Europio,Gadolinio,Terbio,Disprosio,Holmio,Erbio,Tulio,Iterbio,Lutecio,Hafnio,Tantalio,Wolframio,Renio,Osmio,Iridio,Platino,Oro,Mercurio,Talio,Plomo,Bismuto,Polonio,Astato,Radón,Francio,Radio,Actinio,Torio,Protactinio,Uranio,Neptunio,Plutonio,Americio,Curio,Berkelio,Californio,Einstenio,Fermio,Mendelevio,Nobelio,Laurencio,Rutherfordio,Dubnio,Seaborgio,Bohrio,Hassio,Meitnerio,Darmstadtio,Roentgenio,Copernicio,Nihonio,Flerovio,Moscovio,Livermorio,Teneso,Oganesón'.split(',');

/* Masas atómicas (u) para la calculadora */
const MASS={H:1.008,He:4.0026,Li:6.94,Be:9.0122,B:10.81,C:12.011,N:14.007,O:15.999,F:18.998,Ne:20.180,Na:22.990,Mg:24.305,Al:26.982,Si:28.085,P:30.974,S:32.06,Cl:35.45,Ar:39.948,K:39.098,Ca:40.078,Sc:44.956,Ti:47.867,V:50.942,Cr:51.996,Mn:54.938,Fe:55.845,Co:58.933,Ni:58.693,Cu:63.546,Zn:65.38,Ga:69.723,Ge:72.630,As:74.922,Se:78.971,Br:79.904,Kr:83.798,Rb:85.468,Sr:87.62,Y:88.906,Zr:91.224,Nb:92.906,Mo:95.95,Ru:101.07,Rh:102.91,Pd:106.42,Ag:107.87,Cd:112.41,In:114.82,Sn:118.71,Sb:121.76,Te:127.60,I:126.90,Xe:131.29,Cs:132.91,Ba:137.33,La:138.91,Ce:140.12,Pr:140.91,Nd:144.24,Sm:150.36,Eu:151.96,Gd:157.25,Tb:158.93,Dy:162.50,Ho:164.93,Er:167.26,Tm:168.93,Yb:173.05,Lu:174.97,Hf:178.49,Ta:180.95,W:183.84,Re:186.21,Os:190.23,Ir:192.22,Pt:195.08,Au:196.97,Hg:200.59,Tl:204.38,Pb:207.2,Bi:208.98,Th:232.04,U:238.03};

const FORMULAS=[['Y2O3','Óxido de itrio'],['YCl3','Cloruro de itrio'],['YF3','Fluoruro de itrio'],['Y(OH)3','Hidróxido de itrio'],['YPO4','Xenotima'],['Y(NO3)3','Nitrato de itrio'],['Y3Al5O12','YAG'],['YBa2Cu3O7','YBCO'],['Y3Fe5O12','YIG'],['Y2(C2O4)3','Oxalato de itrio']];

/* Aniones para armar fórmulas: [símbolo, carga, nombre, fórmula para la calculadora] */
const ANIONS=[['O','2','óxido'],['F','1','fluoruro'],['Cl','1','cloruro'],['S','2','sulfuro'],['N','3','nitruro'],['OH','1','hidróxido'],['NO3','1','nitrato'],['SO4','2','sulfato'],['PO4','3','fosfato'],['CO3','2','carbonato']];

const ACH=[
 ['first','🚀','Primer paso','Empieza a leer la guía.'],
 ['half','📖','A mitad de camino','Visita 8 capítulos.'],
 ['all','🏁','Guía completa','Visita los 16 capítulos.'],
 ['table','🧪','Explorador de la tabla','Toca 5 elementos de la tabla periódica.'],
 ['cfg','⚛️','Arquitecto de electrones','Llena los orbitales del itrio desde cero.'],
 ['lab','⚖️','Químico de laboratorio','Calcula la masa molar de una fórmula tuya.'],
 ['memo','🧠','Memoria de elefante','Completa el juego de parejas.'],
 ['cards','🗂️','Constancia','Lleva 10 fichas a la caja 3.'],
 ['quiz','🏆','Matrícula de honor','Saca 10/10 en el quiz rápido.'],
 ['fast','⚡','Rayo','Acierta 8 o más en contrarreloj.']];

/* Bibliografía (APA 7). Las referencias con DOI se verificaron en Crossref. */
const REFS=[
 ['Prohaska, T., Irrgeher, J., Benefield, J., Böhlke, J. K., Chesson, L. A., Coplen, T. B., Ding, T., Dunn, P. J. H., Gröning, M., Holden, N. E., et al. (2022). Standard atomic weights of the elements 2021 (IUPAC Technical Report). <i>Pure and Applied Chemistry, 94</i>(5), 573–600.','https://doi.org/10.1515/pac-2019-0603','Masa atómica oficial (88,905 84 u)'],
 ['Commission on Isotopic Abundances and Atomic Weights [CIAAW]. (s. f.). <i>Yttrium</i>.','https://www.ciaaw.org/yttrium.htm','Masa atómica e isótopo natural ⁸⁹Y'],
 ['Haynes, W. M. (Ed.). (2016). <i>CRC Handbook of Chemistry and Physics</i> (97.ª ed.). CRC Press.','','Densidad, fusión, ebullición, electronegatividad, abundancia en la corteza'],
 ['Greenwood, N. N., y Earnshaw, A. (1997). <i>Chemistry of the Elements</i> (2.ª ed.). Butterworth-Heinemann.','','Química del grupo 3, enlaces y compuestos'],
 ['Royal Society of Chemistry. (s. f.). <i>Yttrium</i>. Periodic Table.','https://www.rsc.org/periodic-table/element/39/yttrium','Ficha general, historia, usos y datos curiosos'],
 ['National Center for Biotechnology Information. (s. f.). <i>PubChem Element Summary for AtomicNumber 39, Yttrium</i>.','https://pubchem.ncbi.nlm.nih.gov/element/Yttrium','Propiedades atómicas y físicas'],
 ['Encyclopaedia Britannica. (s. f.). <i>Yttrium</i>.','https://www.britannica.com/science/yttrium','Historia, propiedades y usos'],
 ['Emsley, J. (2011). <i>Nature’s Building Blocks: An A–Z Guide to the Elements</i> (2.ª ed.). Oxford University Press.','','Historia, abundancia y datos curiosos'],
 ['Weeks, M. E. (1932). The discovery of the elements. XVI. The rare earth elements. <i>Journal of Chemical Education, 9</i>(10), 1751.','https://doi.org/10.1021/ed009p1751','Historia: Arrhenius, Gadolin, Ekeberg, Mosander'],
 ['Connelly, N. G., Damhus, T., Hartshorn, R. M., y Hutton, A. T. (Eds.). (2005). <i>Nomenclature of Inorganic Chemistry: IUPAC Recommendations 2005</i>. RSC Publishing.','','Definición de tierras raras y lantánidos'],
 ['Shannon, R. D. (1976). Revised effective ionic radii and systematic studies of interatomic distances in halides and chalcogenides. <i>Acta Crystallographica Section A, 32</i>(5), 751–767.','https://doi.org/10.1107/S0567739476001551','Radios iónicos de Y³⁺, Ho³⁺, Sc³⁺, La³⁺ y Lu³⁺'],
 ['Chang, R., y Goldsby, K. A. (2017). <i>Química</i> (12.ª ed.). McGraw-Hill.','','Configuración electrónica, enlaces, mol y masa molar'],
 ['Blasse, G., y Grabmaier, B. C. (1994). <i>Luminescent Materials</i>. Springer.','https://doi.org/10.1007/978-3-642-79017-1','Fósforos Y₂O₃:Eu³⁺ y YAG:Ce'],
 ['Bando, K., Sakano, K., Noguchi, Y., y Shimizu, Y. (1998). Development of high-bright and pure-white LED lamps. <i>Journal of Light & Visual Environment, 22</i>(1), 2–5.','https://doi.org/10.2150/jlve.22.1_2','LED blanco: LED azul + YAG:Ce'],
 ['Geusic, J. E., Marcos, H. M., y Van Uitert, L. G. (1964). Laser oscillations in Nd-doped yttrium aluminum, yttrium gallium and gadolinium garnets. <i>Applied Physics Letters, 4</i>(10), 182–184.','https://doi.org/10.1063/1.1753928','Primer láser Nd:YAG (1964, 1064 nm)'],
 ['Wu, M. K., Ashburn, J. R., Torng, C. J., Hor, P. H., Meng, R. L., Gao, L., Huang, Z. J., Wang, Y. Q., y Chu, C. W. (1987). Superconductivity at 93 K in a new mixed-phase Y-Ba-Cu-O compound system at ambient pressure. <i>Physical Review Letters, 58</i>(9), 908–910.','https://doi.org/10.1103/PhysRevLett.58.908','Superconductor YBCO a 93 K'],
 ['Piconi, C., y Maccauro, G. (1999). Zirconia as a ceramic biomaterial. <i>Biomaterials, 20</i>(1), 1–25.','https://doi.org/10.1016/S0142-9612(98)00010-6','Zirconia estabilizada con itria (YSZ)'],
 ['Coluzzi, D. J. (2004). Fundamentals of dental lasers: Science and instruments. <i>Dental Clinics of North America, 48</i>(4), 751–770.','https://doi.org/10.1016/j.cden.2004.05.003','Láseres Er:YAG y Nd:YAG en odontología'],
 ['Salem, R., y Thurston, K. G. (2006). Radioembolization with 90Yttrium microspheres: A state-of-the-art brachytherapy treatment for primary and secondary liver malignancies. <i>Journal of Vascular and Interventional Radiology, 17</i>(8), 1251–1278.','https://doi.org/10.1097/01.RVI.0000233785.75257.9A','Radioembolización con ⁹⁰Y y alcance de su radiación beta'],
 ['Witzig, T. E., Gordon, L. I., Cabanillas, F., Czuczman, M. S., et al. (2002). Randomized controlled trial of yttrium-90–labeled ibritumomab tiuxetan radioimmunotherapy versus rituximab immunotherapy for patients with relapsed or refractory low-grade, follicular, or transformed B-cell non-Hodgkin’s lymphoma. <i>Journal of Clinical Oncology, 20</i>(10), 2453–2463.','https://doi.org/10.1200/JCO.2002.11.076','Anticuerpos marcados con ⁹⁰Y'],
 ['Gupta, C. K., y Krishnamurthy, N. (2005). <i>Extractive Metallurgy of Rare Earths</i>. CRC Press.','','Minerales, apertura química, extracción por solventes y reducción con calcio'],
 ['Binnemans, K., Jones, P. T., Blanpain, B., Van Gerven, T., Yang, Y., Walton, A., y Buchert, M. (2013). Recycling of rare earths: A critical review. <i>Journal of Cleaner Production, 51</i>, 1–22.','https://doi.org/10.1016/j.jclepro.2012.12.037','Reciclaje e importancia estratégica'],
 ['U.S. Geological Survey. (2025). <i>Mineral Commodity Summaries 2025: Rare earths</i>.','https://pubs.usgs.gov/periodicals/mcs2025/mcs2025-rare-earths.pdf','Producción mundial de tierras raras'],
 ['National Nuclear Data Center. (s. f.). <i>NuDat 3</i>. Brookhaven National Laboratory.','https://www.nndc.bnl.gov/nudat3/','Semividas y tipos de desintegración de ⁸⁷Y a ⁹¹Y'],
 ['Gadolin, J. (1794). Undersökning af en svart tung stenart ifrån Ytterby stenbrott i Roslagen. <i>Kongl. Vetenskaps Academiens Nya Handlingar, 15</i>, 137–155.','','Artículo original del descubrimiento']];

/* Fuentes de cada capítulo (números de REFS, empezando en 1) */
const CHREFS={
 'que-es':[1,2,5,6,10,3],tabla:[10,11,4],historia:[9,25,5,7,15,16,14],atomicos:[1,2,24,6],
 configuracion:[12,4],propiedades:[3,6,4,11],enlaces:[4,12,3],calculadora:[1,12],
 aplicaciones:[13,14,15,16,17,18,19,20],extraccion:[21,4,23],duracion:[24,19],
 curiosos:[5,8,3,16,11,19],juego:[13,15,16,17,19],fichas:[12,4,5],glosario:[12,10,4],conclusion:[22,23,5]};
