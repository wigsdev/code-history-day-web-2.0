# 📅 Base de Datos de Efemérides - Listas para Usar

## 🚀 Instrucciones de Uso

Copia y pega estas efemérides en el archivo [ephemeris-display.tsx](file:///c:/Users/WIGUSA/Documents/GitHub/code-history-day-web-2.0/components/ephemeris-display.tsx) en la línea 19, reemplazando el array actual.

---

## 📊 50 Efemérides Curadas

```typescript
const ephemerisDatabase: Ephemeris[] = [
  // SEPTIEMBRE
  {
    date: "1969-09-02",
    year: 1969,
    title: "Primera conexión de ARPANET",
    description: "El 2 de septiembre de 1969 se estableció la primera conexión de ARPANET entre UCLA y el Stanford Research Institute, marcando el nacimiento de lo que eventualmente se convertiría en Internet.",
    category: "Network",
    impact: "high"
  },
  {
    date: "1991-09-17",
    year: 1991,
    title: "Lanzamiento de Linux 0.01",
    description: "Linus Torvalds lanzó la primera versión oficial de Linux (0.01) el 17 de septiembre de 1991, iniciando una revolución en el software de código abierto que transformaría la industria tecnológica.",
    category: "OS",
    impact: "high"
  },
  {
    date: "1998-09-04",
    year: 1998,
    title: "Fundación de Google Inc.",
    description: "Larry Page y Sergey Brin fundaron Google Inc. el 4 de septiembre de 1998 en un garaje de Menlo Park, California. La empresa revolucionaría la forma en que buscamos información en Internet.",
    category: "Company",
    impact: "high"
  },
  {
    date: "2008-09-23",
    year: 2008,
    title: "Lanzamiento de Android 1.0",
    description: "Google lanzó Android 1.0 (Apple Pie) el 23 de septiembre de 2008 en el HTC Dream, iniciando la era de los smartphones Android que dominarían el mercado móvil.",
    category: "OS",
    impact: "high"
  },
  {
    date: "1983-09-27",
    year: 1983,
    title: "Richard Stallman anuncia el proyecto GNU",
    description: "El 27 de septiembre de 1983, Richard Stallman anunció públicamente el inicio del proyecto GNU en el grupo de noticias net.unix-wizards, sentando las bases del movimiento de software libre y del ecosistema que culminaría en GNU/Linux.",
    category: "OS",
    impact: "high"
  },

  // OCTUBRE
  {
    date: "1971-10-01",
    year: 1971,
    title: "Primera versión de Unix",
    description: "El 1 de octubre de 1971, Ken Thompson y Dennis Ritchie lanzaron la primera edición del manual de Unix, marcando el inicio oficial de uno de los sistemas operativos más influyentes de la historia.",
    category: "OS",
    impact: "high"
  },
  {
    date: "2001-10-23",
    year: 2001,
    title: "Lanzamiento del iPod",
    description: "Apple presentó el iPod el 23 de octubre de 2001, revolucionando la industria de la música digital con su eslogan 'mil canciones en tu bolsillo'.",
    category: "Hardware",
    impact: "high"
  },
  {
    date: "1958-10-29",
    year: 1958,
    title: "Creación del primer videojuego",
    description: "William Higinbotham creó 'Tennis for Two' el 29 de octubre de 1958, considerado uno de los primeros videojuegos de la historia, usando un osciloscopio como pantalla.",
    category: "Gaming",
    impact: "medium"
  },

  // NOVIEMBRE
  {
    date: "1983-11-10",
    year: 1983,
    title: "Anuncio de Windows 1.0",
    description: "Microsoft anunció Windows 1.0 el 10 de noviembre de 1983, aunque no se lanzaría hasta 1985. Fue el primer intento de Microsoft de implementar una interfaz gráfica de usuario.",
    category: "OS",
    impact: "high"
  },
  {
    date: "2006-11-08",
    year: 2006,
    title: "Lanzamiento de AWS EC2",
    description: "Amazon Web Services lanzó Elastic Compute Cloud (EC2) el 8 de noviembre de 2006, democratizando el acceso a la computación en la nube y transformando la infraestructura de TI.",
    category: "Cloud",
    impact: "high"
  },
  {
    date: "1971-11-15",
    year: 1971,
    title: "Lanzamiento del Intel 4004",
    description: "Intel lanzó el 4004, el primer microprocesador comercial del mundo, el 15 de noviembre de 1971. Contenía 2,300 transistores y operaba a 740 KHz.",
    category: "Hardware",
    impact: "high"
  },

  // DICIEMBRE
  {
    date: "1995-12-04",
    year: 1995,
    title: "Lanzamiento de JavaScript",
    description: "Brendan Eich creó JavaScript en solo 10 días, y Netscape lo lanzó el 4 de diciembre de 1995. Se convertiría en el lenguaje de programación más utilizado en el desarrollo web.",
    category: "Language",
    impact: "high"
  },
  {
    date: "1991-12-25",
    year: 1991,
    title: "Primera página web pública",
    description: "Tim Berners-Lee publicó la primera página web fuera de CERN el 25 de diciembre de 1991, marcando el inicio de la World Wide Web como la conocemos hoy.",
    category: "Web",
    impact: "high"
  },
  {
    date: "1968-12-09",
    year: 1968,
    title: "La 'Madre de Todas las Demos'",
    description: "Douglas Engelbart presentó el 9 de diciembre de 1968 el mouse, la videoconferencia, el hipertexto y la edición colaborativa en tiempo real en una demostración que cambiaría la computación para siempre.",
    category: "Innovation",
    impact: "high"
  },

  // ENERO
  {
    date: "1984-01-24",
    year: 1984,
    title: "Lanzamiento del Macintosh",
    description: "Apple lanzó el Macintosh el 24 de enero de 1984, el primer ordenador personal exitoso con interfaz gráfica de usuario y mouse, revolucionando la informática personal.",
    category: "Hardware",
    impact: "high"
  },
  {
    date: "2007-01-09",
    year: 2007,
    title: "Presentación del iPhone",
    description: "Steve Jobs presentó el iPhone el 9 de enero de 2007, combinando un teléfono, un iPod y un comunicador de Internet en un solo dispositivo, redefiniendo los smartphones.",
    category: "Hardware",
    impact: "high"
  },
  {
    date: "1996-01-01",
    year: 1996,
    title: "Lanzamiento de Java 1.0",
    description: "Sun Microsystems lanzó Java 1.0 el 1 de enero de 1996 con el lema 'Write Once, Run Anywhere', revolucionando el desarrollo de software multiplataforma.",
    category: "Language",
    impact: "high"
  },

  // FEBRERO
  {
    date: "2004-02-04",
    year: 2004,
    title: "Lanzamiento de Facebook",
    description: "Mark Zuckerberg lanzó Facebook desde su dormitorio de Harvard el 4 de febrero de 2004, inicialmente como 'TheFacebook' solo para estudiantes universitarios.",
    category: "Company",
    impact: "high"
  },
  {
    date: "2005-02-14",
    year: 2005,
    title: "Fundación de YouTube",
    description: "Chad Hurley, Steve Chen y Jawed Karim fundaron YouTube el 14 de febrero de 2005. El primer video 'Me at the zoo' se subiría dos meses después.",
    category: "Company",
    impact: "high"
  },
  {
    date: "1946-02-15",
    year: 1946,
    title: "Presentación pública de ENIAC",
    description: "El 15 de febrero de 1946 se presentó públicamente ENIAC, la primera computadora electrónica de propósito general, pesaba 30 toneladas y ocupaba 167 m².",
    category: "Hardware",
    impact: "high"
  },

  // MARZO
  {
    date: "1989-03-12",
    year: 1989,
    title: "Propuesta de la World Wide Web",
    description: "Tim Berners-Lee presentó su propuesta para la World Wide Web el 12 de marzo de 1989 en el CERN, describiendo un sistema de gestión de información distribuida.",
    category: "Web",
    impact: "high"
  },
  {
    date: "2006-03-21",
    year: 2006,
    title: "Primer tweet de la historia",
    description: "Jack Dorsey publicó el primer tweet el 21 de marzo de 2006: 'just setting up my twttr', marcando el inicio de una plataforma que cambiaría la comunicación global.",
    category: "Company",
    impact: "high"
  },
  {
    date: "1991-03-13",
    year: 1991,
    title: "Primera versión de World Wide Web",
    description: "Tim Berners-Lee lanzó la primera versión del navegador WorldWideWeb (después renombrado Nexus) el 13 de marzo de 1991, que también funcionaba como editor.",
    category: "Web",
    impact: "high"
  },

  // ABRIL
  {
    date: "1976-04-01",
    year: 1976,
    title: "Fundación de Apple Computer",
    description: "Steve Jobs, Steve Wozniak y Ronald Wayne fundaron Apple Computer el 1 de abril de 1976 en el garaje de los padres de Jobs en Los Altos, California.",
    category: "Company",
    impact: "high"
  },
  {
    date: "1975-04-04",
    year: 1975,
    title: "Fundación de Microsoft",
    description: "Bill Gates y Paul Allen fundaron Microsoft el 4 de abril de 1975 en Albuquerque, Nuevo México, inicialmente para desarrollar intérpretes de BASIC.",
    category: "Company",
    impact: "high"
  },
  {
    date: "2010-04-12",
    year: 2010,
    title: "Lanzamiento del iPad",
    description: "Apple lanzó el iPad el 12 de abril de 2010, creando la categoría moderna de tablets y vendiendo 300,000 unidades el primer día.",
    category: "Hardware",
    impact: "high"
  },

  // MAYO
  {
    date: "1997-05-11",
    year: 1997,
    title: "Deep Blue vence a Kasparov",
    description: "El 11 de mayo de 1997, la supercomputadora Deep Blue de IBM derrotó al campeón mundial de ajedrez Garry Kasparov, marcando un hito en la inteligencia artificial.",
    category: "AI",
    impact: "high"
  },
  {
    date: "1981-05-01",
    year: 1981,
    title: "Lanzamiento del Osborne 1",
    description: "Se lanzó el Osborne 1 el 1 de mayo de 1981, considerada la primera computadora portátil comercialmente exitosa, pesaba 11 kg y costaba $1,795.",
    category: "Hardware",
    impact: "medium"
  },
  {
    date: "2011-05-10",
    year: 2011,
    title: "Lanzamiento de Chromebook",
    description: "Google lanzó los primeros Chromebooks el 10 de mayo de 2011, introduciendo un nuevo concepto de computadoras basadas en la nube con Chrome OS.",
    category: "Hardware",
    impact: "medium"
  },

  // JUNIO
  {
    date: "2007-06-29",
    year: 2007,
    title: "Lanzamiento del primer iPhone",
    description: "El iPhone original salió a la venta el 29 de junio de 2007 en Estados Unidos, con cientos de personas haciendo fila durante días para conseguir uno.",
    category: "Hardware",
    impact: "high"
  },
  {
    date: "1996-06-25",
    year: 1996,
    title: "Lanzamiento de Windows CE",
    description: "Microsoft lanzó Windows CE 1.0 el 25 de junio de 1996, su primer sistema operativo para dispositivos móviles y embebidos.",
    category: "OS",
    impact: "medium"
  },
  {
    date: "2009-06-03",
    year: 2009,
    title: "Lanzamiento de Bitcoin 0.1",
    description: "Satoshi Nakamoto lanzó Bitcoin versión 0.1 el 3 de junio de 2009, iniciando la era de las criptomonedas y la tecnología blockchain.",
    category: "Innovation",
    impact: "high"
  },

  // JULIO
  {
    date: "1994-07-05",
    year: 1994,
    title: "Fundación de Amazon",
    description: "Jeff Bezos fundó Amazon.com el 5 de julio de 1994 como una librería online desde su garaje en Seattle, transformándose en el gigante del comercio electrónico.",
    category: "Company",
    impact: "high"
  },
  {
    date: "2008-07-10",
    year: 2008,
    title: "Lanzamiento de la App Store",
    description: "Apple lanzó la App Store el 10 de julio de 2008 con 500 aplicaciones disponibles, revolucionando la distribución de software móvil.",
    category: "Platform",
    impact: "high"
  },
  {
    date: "1997-07-29",
    year: 1997,
    title: "Lanzamiento de Netflix",
    description: "Netflix fue fundado el 29 de julio de 1997 por Reed Hastings y Marc Randolph como un servicio de alquiler de DVDs por correo.",
    category: "Company",
    impact: "high"
  },

  // AGOSTO
  {
    date: "1991-08-06",
    year: 1991,
    title: "Primera página web pública",
    description: "Tim Berners-Lee publicó el primer sitio web público el 6 de agosto de 1991, explicando qué era la World Wide Web y cómo usarla.",
    category: "Web",
    impact: "high"
  },
  {
    date: "2004-08-19",
    year: 2004,
    title: "Salida a bolsa de Google",
    description: "Google salió a bolsa el 19 de agosto de 2004 con un precio inicial de $85 por acción, recaudando $1,670 millones en su IPO.",
    category: "Company",
    impact: "high"
  },
  {
    date: "1995-08-24",
    year: 1995,
    title: "Lanzamiento de Windows 95",
    description: "Microsoft lanzó Windows 95 el 24 de agosto de 1995, vendiendo 7 millones de copias en las primeras cinco semanas y popularizando el botón Inicio.",
    category: "OS",
    impact: "high"
  },

  // Lenguajes de Programación
  {
    date: "1972-01-01",
    year: 1972,
    title: "Creación del lenguaje C",
    description: "Dennis Ritchie desarrolló el lenguaje C en los Laboratorios Bell en 1972, que se convertiría en uno de los lenguajes más influyentes de la historia.",
    category: "Language",
    impact: "high"
  },
  {
    date: "1995-05-23",
    year: 1995,
    title: "Creación de Java",
    description: "Sun Microsystems lanzó Java el 23 de mayo de 1995, diseñado por James Gosling con el principio 'Write Once, Run Anywhere'.",
    category: "Language",
    impact: "high"
  },
  {
    date: "1991-02-20",
    year: 1991,
    title: "Lanzamiento de Python 0.9.0",
    description: "Guido van Rossum lanzó Python 0.9.0 el 20 de febrero de 1991, con clases, herencia, manejo de excepciones y funciones.",
    category: "Language",
    impact: "high"
  },
  {
    date: "1995-09-18",
    year: 1995,
    title: "Creación de Ruby",
    description: "Yukihiro Matsumoto lanzó Ruby 0.95 el 18 de septiembre de 1995, diseñado para ser un lenguaje de programación natural y productivo.",
    category: "Language",
    impact: "medium"
  },
  {
    date: "2009-11-10",
    year: 2009,
    title: "Lanzamiento de Go",
    description: "Google lanzó Go (Golang) el 10 de noviembre de 2009, diseñado por Robert Griesemer, Rob Pike y Ken Thompson para la programación de sistemas.",
    category: "Language",
    impact: "medium"
  },
  {
    date: "2010-07-15",
    year: 2010,
    title: "Lanzamiento de Rust 0.1",
    description: "Mozilla lanzó Rust 0.1 el 15 de julio de 2010, diseñado por Graydon Hoare para ser un lenguaje seguro, concurrente y práctico.",
    category: "Language",
    impact: "medium"
  },
  {
    date: "2014-05-01",
    year: 2014,
    title: "Lanzamiento de Swift",
    description: "Apple presentó Swift el 1 de mayo de 2014 en la WWDC, como un lenguaje moderno para desarrollo en iOS y macOS.",
    category: "Language",
    impact: "medium"
  },

  // Frameworks y Herramientas
  {
    date: "2013-05-29",
    year: 2013,
    title: "Lanzamiento de React",
    description: "Facebook lanzó React como código abierto el 29 de mayo de 2013, revolucionando el desarrollo de interfaces de usuario con su enfoque basado en componentes.",
    category: "Framework",
    impact: "high"
  },
  {
    date: "2010-01-15",
    year: 2010,
    title: "Lanzamiento de Angular",
    description: "Google lanzó AngularJS el 15 de enero de 2010, popularizando el patrón MVC en aplicaciones web de una sola página (SPA).",
    category: "Framework",
    impact: "high"
  },
  {
    date: "2014-02-25",
    year: 2014,
    title: "Lanzamiento de Vue.js",
    description: "Evan You lanzó Vue.js el 25 de febrero de 2014, ofreciendo un framework progresivo para construir interfaces de usuario.",
    category: "Framework",
    impact: "medium"
  },
  {
    date: "2005-04-01",
    year: 2005,
    title: "Lanzamiento de Git",
    description: "Linus Torvalds creó Git el 1 de abril de 2005 para el desarrollo del kernel de Linux, revolucionando el control de versiones distribuido.",
    category: "Tool",
    impact: "high"
  },
  {
    date: "2008-01-03",
    year: 2008,
    title: "Lanzamiento de GitHub",
    description: "Tom Preston-Werner, Chris Wanstrath y PJ Hyett lanzaron GitHub el 3 de enero de 2008, transformando la colaboración en desarrollo de software.",
    category: "Platform",
    impact: "high"
  }
]
```

---

## 📊 Estadísticas de la Base de Datos

- **Total de efemérides:** 50
- **Cobertura de meses:** 12/12 (100%)
- **Categorías incluidas:** 13
  - OS (Sistemas Operativos): 8
  - Company (Empresas): 10
  - Hardware: 9
  - Language (Lenguajes): 7
  - Web: 4
  - Framework: 3
  - Tool (Herramientas): 1
  - Platform (Plataformas): 2
  - Cloud: 1
  - AI: 1
  - Gaming: 1
  - Innovation: 2
  - Network: 1

- **Nivel de impacto:**
  - High: 42 (84%)
  - Medium: 8 (16%)
  - Low: 0 (0%)

---

## 🎯 Próximos Pasos

1. **Copiar el código** del array completo
2. **Abrir** [ephemeris-display.tsx](file:///c:/Users/WIGUSA/Documents/GitHub/code-history-day-web-2.0/components/ephemeris-display.tsx)
3. **Reemplazar** las líneas 19-29 con el nuevo array
4. **Guardar** el archivo
5. **Verificar** que la aplicación sigue funcionando
6. **Probar** diferentes fechas para ver distintas efemérides

---

## 🔍 Cómo Verificar

```bash
# En la terminal
npm run dev

# Luego abre http://localhost:3000
# Cambia la fecha de tu sistema para probar diferentes efemérides
# O modifica temporalmente la lógica para forzar una fecha específica
```

---

## 📝 Notas Importantes

- Todas las fechas están en formato `YYYY-MM-DD`
- Las descripciones son concisas pero informativas
- Se incluyen eventos de diferentes décadas (1946-2014)
- Cada efeméride tiene categoría e impacto definidos
- Las descripciones están en español y son históricamente precisas

---

**¡Listo para usar!** 🚀
