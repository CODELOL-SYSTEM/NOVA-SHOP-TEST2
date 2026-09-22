// ============================================================
// NOVASHOP - BLOC 1
// PRODUITS COMPLETS
// ============================================================

const products = [

  {
    id:"p1",
    name:"Gigabyte B650 AORUS Elite AX",
    category:"Composants",
    price:189.99,
    image:"https://m.media-amazon.com/images/I/81JFKzNyl+L._AC_SL1500_.jpg"
  },

  {
    id:"p2",
    name:"PC Gamer AMD Ryzen 7 7800X3D | RX 9070 XT | 32 Go DDR5",
    category:"PC Gamer",
    price:2237.65,
    image:"https://www.memorypc.fr/thumbnail/53/79/73/1786604635/019f8f1c2c6972a8a3ea1ee9516a0652_1784812416_800x800.png"
  },

  {
    id:"p3",
    name:"HyperX Cloud II",
    category:"Casques",
    price:49.99,
    image:"https://fr.hyperx.com/cdn/shop/files/hyperx_cloud_ii_red_1_main.jpg?v=1764129756"
  },

  {
    id:"p4",
    name:"TECORS Clavier Gamer Mécanique 60% AZERTY",
    category:"Claviers",
    price:30,
    image:"https://m.media-amazon.com/images/I/71-lhAU97VL._AC_SL1500_.jpg"
  },

  {
    id:"p5",
    name:"Clavier Magnétique 65% Celshading Noir",
    category:"Claviers",
    price:120.90,
    image:"https://tryhard-gear.com/cdn/shop/files/TestCelshadingnoirV2.webp?v=1762273866&width=832"
  },

  {
    id:"p6",
    name:"Ajazz AJ199 MAX Carbon Fiber Wireless Gaming Mouse",
    category:"Souris",
    price:49.99,
    image:"https://ae-pic-a1.aliexpress-media.com/kf/S1e981b53ccfe4e1391cd5b5deb4fce87o.png_960x960.png_.avif"
  },

  {
    id:"p7",
    name:"Logitech G PRO X2 Superstrike Blanc et Noir",
    category:"Souris",
    price:150.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/7a/34/bc/29111418/1540-1.jpg"
  },

  {
    id:"p8",
    name:"Samsung 990 PRO 1TB",
    category:"Stockage",
    price:249.99,
    image:"https://content.pearl.fr/media/cache/default/article_ultralarge_high_nocrop/shared/images/articles/M/MW1/disque-dur-interne-ssd-990-pro-pcie-nvme-m-2-2280-1-to-ref_MW1148_2.jpg"
  },

  {
    id:"p9",
    name:"Samsung 990 PRO 2TB",
    category:"Stockage",
    price:199.93,
    image:"https://pc.comparer.fr/500x500/310191422.webp"
  },

  {
    id:"p10",
    name:"CORSAIR RM1000x EU",
    category:"Alimentations",
    price:159.90,
    image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/1000/RM1000x_2024_01.webp"
  },

  {
    id:"p11",
    name:"CORSAIR RM850x EU",
    category:"Alimentations",
    price:134.90,
    image:"https://assets.corsair.com/image/upload/c_pad,q_85,h_608,w_608,f_auto/products/Power-Supply-Units/base-rmx-2024-config/gallery/black/850/RM850x_2024_01.webp"
  },

  {
    id:"p12",
    name:"Corsair Frame 5000D RS ARGB Noir",
    category:"Boîtiers",
    price:159.90,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/26/05/LD0006260502.jpg"
  },

  {
    id:"p13",
    name:"ARCTIC Liquid Freezer III Pro 360 A-RGB Black",
    category:"Refroidissement",
    price:129.90,
    image:"https://cdn.idealo.com/folder/Product/206182/0/206182034/s4_produktbild_gross/arctic-liquid-freezer-iii-pro-360-a-rgb-black.jpg"
  },

  {
    id:"p14",
    name:"Samsung 27 QD-OLED Odyssey G6",
    category:"Écrans",
    price:399.95,
    image:"https://media.ldlc.com/r705/ld/products/00/06/32/99/LD0006329977.jpg"
  },

  {
    id:"p15",
    name:"ELGATO Wave Mic Arm Pro",
    category:"Streaming",
    price:229.90,
    image:"https://www.digit-photo.com/images/produits/ELGATO10AAT9901/1.jpg"
  },

  {
    id:"p16",
    name:"Sony DualSense PS5/PC",
    category:"Manettes",
    price:74.90,
    image:"https://media.carrefour.fr/media/referential/media/cc07d7de4b9e4bea8c063e8f9bb46d94/p_200x200/0711719023005_0.jpg",
    options:{
      label:"Couleur",
      values:["Rouge","Blanc","Noir","Bleu"],
      required:true
    }
  },

  {
    id:"p17",
    name:"ASUS TUF Gaming B650-PLUS",
    category:"Composants",
    price:179.90,
    image:"https://media.materiel.net/r550/products/MN0005986139.jpg"
  },

  {
    id:"p18",
    name:"MSI MAG B650 Tomahawk WiFi",
    category:"Composants",
    price:189.90,
    image:"https://m.media-amazon.com/images/I/71TYAcZ4J8L._AC_SL1200_.jpg"
  },

  {
    id:"p19",
    name:"KOORUI Ecran PC Gamer 27 Pouces 200Hz IPS QHD HDR400 1ms",
    category:"Écrans",
    price:74.99,
    image:"https://m.media-amazon.com/images/I/71CJ1DF-8sL._AC_SL1500_.jpg"
  },

  {
    id:"p20",
    name:"iiyama 23.8 G-Master GB2471HS-B1 Red Eagle",
    category:"Écrans",
    price:65.99,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/34/20/LD0006342033.jpg"
  },

  {
    id:"p21",
    name:"SONGMICS Chaise de jeu ergonomique avec repose-pieds 150 kg gris ardoise",
    category:"Chaises gaming",
    price:129.99,
    image:"https://static.songmics.fr/fit-in/1000x1000/image/Product/B34OBG077G01/B34OBG077G01-1.jpg"
  },

  {
    id:"p22",
    name:"Dowinx Série Luxe Suède LS-66D68E Blanc",
    category:"Chaises gaming",
    price:79.99,
    image:"https://eu.dowinx.com/cdn/shop/files/11_5f72b693-5f79-4d06-b48a-7cb2b2f0244a.png?v=1752139814&width=1220"
  },

  {
    id:"p23",
    name:"Chaise GTPLAYER Ergonomique Gaming Soutien Lombaire Repose-pieds",
    category:"Chaises gaming",
    price:109.99,
    image:"https://thumb.pccomponentes.com/w-530-530/articles/1118/11186247/167-silla-gaming-gtplayer-ergonomica-con-reposapies-y-soporte-lumbar-4d.jpg"
  },

  {
    id:"p24",
    name:"Desk Lite - Height-Adjustable Desk",
    category:"Bureaux gaming",
    price:110.99,
    image:"https://yaasa.com/cdn/shop/files/yaasa-desk-lite_nr01_black_100_01-04545-01_1200x.jpg?v=1753169928"
  },

  {
    id:"p25",
    name:"EUREKA ERGONOMIC Bureau Gaming LED 182x76cm en Forme d'Aile",
    category:"Bureaux gaming",
    price:86.99,
    image:"https://m.media-amazon.com/images/I/71Gd5G3wRsL._AC_SL1500_.jpg"
  },

  {
    id:"p26",
    name:"Bureau gaming d’angle HOMCOM réversible support écran",
    category:"Bureaux gaming",
    price:44.99,
    image:"https://cdn.manomano.com/pim-media/images/medium/74eca1cb1cefa063c8f600ee293ae6ee826794f8.jpg"
  },

  {
    id:"p27",
    name:"Logitech G Pro X 2 Lightspeed Noir + Repose casque",
    category:"Casques",
    price:99.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/6d/e9/6e/24045933/1540-1/tsp20260429154901/Casque-PC-gaming-sans-fil-Logitech-G-Pro-X-2-Lightspeed-Noir-Repose-casque.jpg"
  },

  {
    id:"p28",
    name:"Razer BlackShark V2 Pro 2023 Noir",
    category:"Casques",
    price:75.99,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/07/71/LD0006077125.jpg"
  },

  {
    id:"p29",
    name:"beyerdynamic DT-990 Pro 250 Ohm",
    category:"Casques",
    price:60.99,
    image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_10/106865/18443258_800.jpg"
  },

  {
    id:"p30",
    name:"Logitech PRO X TKL Rapid Noir, filaire AZERTY",
    category:"Claviers",
    price:78.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/6a/89/8f/26184042/1540-1.jpg"
  },

  {
    id:"p31",
    name:"QwertyKey75 HE Striker, Magnetic Hall Effect, Rapid Trigger, Snap Tap",
    category:"Claviers",
    price:56.99,
    image:"https://cdn.shopify.com/s/files/1/0814/2530/1746/files/QK75-HE-STRIKER-qwertykey-tastatura-mecanica-gaming-hotswap-2025_1eee355b-72ca-46e6-a458-751384d0595c_1800x.webp?v=1771799537"
  },

  {
    id:"p32",
    name:"GravaStar Mercury K1 Clavier Gamer sans Fil en Aluminium, Noir Dégradé",
    category:"Claviers",
    price:91.99,
    image:"https://m.media-amazon.com/images/I/6144lt2l5JL._AC_SL1200_.jpg"
  },

  {
    id:"p33",
    name:"ATTACK SHARK R11 Ultra, fibre de carbone, 8000Hz, 49g, 42000 DPI",
    category:"Souris",
    price:26.99,
    image:"https://m.media-amazon.com/images/I/71bMz15SqcL._AC_SL1500_.jpg"
  },

  {
    id:"p34",
    name:"HyperX QuadCast 2 – Microphone USB – RGB",
    category:"Microphones",
    price:98.99,
    image:"https://fr.hyperx.com/cdn/shop/files/hyperx_quadcast_2_872v1aa_main_1_2d47a555-f537-457b-9002-8b9e9010dc00.jpg?v=1763067608"
  },

  {
    id:"p35",
    name:"Shure SM7 dB",
    category:"Microphones",
    price:121.99,
    image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_57/573672/18492412_800.jpg"
  },

  {
    id:"p36",
    name:"Razer Seiren V3 Chroma Noir",
    category:"Microphones",
    price:13.99,
    image:"https://media.ldlc.com/r1600/ld/products/00/06/13/25/LD0006132588.jpg"
  },

  {
    id:"p37",
    name:"Stairville LED Pixel Rail 40 RGB MKII",
    category:"Éclairage RGB",
    price:18.90,
    image:"https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_44/449739/14448905_800.jpg"
  },

  {
    id:"p38",
    name:"Govee LED Strip Light RGBIC Wi-Fi + Bluetooth 5m Matter",
    category:"Éclairage RGB",
    price:8,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/ab/7a/9d/27097771/1520-2/tsp20260429155350/Ruban-LED-Govee-LED-Strip-Light-RGBIC-Wi-Fi-avec-BT-5M-Matter.jpg"
  },

  {
    id:"p39",
    name:"Lampe de plafond hexagone nid d’abeille LED 2.4m x 4.8m contour bleu",
    category:"Éclairage RGB",
    price:91.10,
    image:"https://www.discount-autosport.com/wp-content/webp-express/webp-images/uploads/2025/02/lampe-hexagone-plafond-led-4m80-contour-bleu-.jpg.webp"
  },

  {
    id:"p40",
    name:"GIGABYTE GeForce RTX 5050 WINDFORCE OC 8G",
    category:"Cartes graphiques",
    price:147,
    image:"https://m.media-amazon.com/images/I/41kmHFMFPOL._SL500_.jpg"
  },

  {
    id:"p41",
    name:"MSI GeForce RTX 3050 LP E 6G OC",
    category:"Cartes graphiques",
    price:100,
    image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCe_rha_tAAHPWnQ8VV7GIvF-uSqUaEyU61TSnwgM4CK8g3-x_3Hq4wOgH36Ri63eAiWHsvhmRJHzVrUQR9-IwMx31WH0w"
  },

  {
    id:"p42",
    name:"ASUS Dual Radeon RX 7600 EVO OC Edition 8GB GDDR6",
    category:"Cartes graphiques",
    price:140,
    image:"https://m.media-amazon.com/images/I/81QItJufypL._AC_SL1500_.jpg"
  },

  {
    id:"p43",
    name:"PC Gamer Fixe, Ryzen 7 5700G, Vega 8, 16G DDR4, 1T SSD",
    category:"PC Gamer",
    price:650,
    image:"https://m.media-amazon.com/images/I/81M3iU5S4QL._AC_SL1500_.jpg",
    new:true
  },

  {
    id:"p44",
    name:"Apple iPhone 14 Pro 6,1 5G Double SIM 128 Go Argent",
    category:"Smartphones",
    price:400,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/07/3b/32/20069127/1540-1/tsp20260630131025/Apple-iPhone-14-Pro-6-1-5G-Double-SIM-128-Go-Argent.jpg"
  },

  {
    id:"p45",
    name:"Apple iPhone 15 6,1 5G Double SIM 128 Go Noir",
    category:"Smartphones",
    price:750,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/cd/f0/52/22212813/1540-1/tsp20260914144304/Apple-iPhone-15-6-1-5G-Double-SIM-128-Go-Noir.jpg"
  },

  {
    id:"p46",
    name:"Apple iPhone 16 6,1 5G 128 Go Double SIM Noir",
    category:"Smartphones",
    price:949.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/fe/47/66/23480318/3756-1/tsp20260920085557/Apple-iPhone-16-6-1-5G-128-Go-Double-SIM-Noir.jpg"
  },

  {
    id:"p47",
    name:"Apple iPhone 17 6,3 5G Double SIM 256 Go Noir",
    category:"Smartphones",
    price:1000,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/19/86/b6/28739097/3756-1/tsp20260909180923/Apple-iPhone-17-6-3-5G-Double-SIM-256-Go-Noir.jpg"
  },

  {
    id:"p48",
    name:"Apple iPhone 18 Pro 6,3 5G Double SIM 256 Go Noir",
    category:"Smartphones",
    price:1199.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/62/73/c7/29848418/1540-1/tsp20260920091102/Apple-iPhone-18-Pro-6-3-5G-Double-SIM-256-Go-Noir.jpg"
  },

  {
    id:"p49",
    name:"Samsung Galaxy S23 6,1 5G 8 Go RAM 256 Go Noir",
    category:"Smartphones",
    price:230,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/0d/c0/44/21282829/1540-1/tsp20260829031739/Smartphone-Samsung-Galaxy-S23-6-1-Nano-SIM-5G-8-Go-RAM-256-Go-Noir.jpg"
  },

  {
    id:"p50",
    name:"Samsung Galaxy S24 6,2 5G 256 Go Noir",
    category:"Smartphones",
    price:449.90,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/a6/f6/5a/22738598/1540-1/tsp20260319135101/Smartphone-Samsung-Galaxy-S24-6-2-5G-Nano-SIM-256-Go-Noir.jpg"
  },

  {
    id:"p51",
    name:"Samsung Galaxy S25 Edge 6,7 5G 256 Go Noir absolu Titane",
    category:"Smartphones",
    price:469.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/42/7b/ab/28015426/1540-1/tsp20260909180103/Smartphone-Samsung-Galaxy-S25-Edge-6-7-5G-Nano-SIM-256-Go-Noir-absolu-Titane.jpg"
  },

  {
    id:"p52",
    name:"Samsung Galaxy S26 6,3 5G 256 Go Noir + Buds4 Noir",
    category:"Smartphones",
    price:650.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/e8/a2/c7/29860584/1540-1/tsp20260903144909/Pack-Smartphone-Samsung-Galaxy-S26-6-3-5G-Nano-SIM-256-Go-Noir-Buds4-Noir.jpg"
  },

  {
    id:"p53",
    name:"Google Pixel 8 6,2 5G Double SIM 128 Go Vert Sauge",
    category:"Smartphones",
    price:200,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/37/bc/52/22199351/1540-1/tsp20260722081937/Smartphone-Google-Pixel-8-6-2-5G-Double-SIM-128-Go-Vert-Sauge.jpg"
  },

  {
    id:"p54",
    name:"Google Pixel 9 6,3 5G Double nano-SIM 128 Go Noir Obsidienne",
    category:"Smartphones",
    price:400,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDMFR/MDM/f6/00/6d/23920886/1540-1/tsp20260914084700/Smartphone-Google-Pixel-9-6-3-5G-Double-nano-SIM-128-Go-Noir-Obsidienne.jpg"
  },

  {
    id:"p55",
    name:"Google Pixel 10 6,3 5G Double SIM 256 Go Noir Volcanique",
    category:"Smartphones",
    price:600,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/4a/5f/b3/28532554/1540-1/tsp20260717111851/Smartphone-Google-Pixel-10-6-3-5G-Double-SIM-256-Go-Noir-Volcanique.jpg"
  },

  {
    id:"p56",
    name:"Flashforge Adventurer 5M Pro",
    category:"Imprimantes 3D",
    price:115,
    image:"https://www.makershop.fr/cdn/shop/files/13458.jpg?v=1760745366&width=150"
  },

  {
    id:"p57",
    name:"Elegoo Centauri 2",
    category:"Imprimantes 3D",
    price:200,
    image:"https://fr.elegoo.com/cdn/shop/files/C2-_-260811.jpg?crop=center&v=1786696280&width=345"
  },

  {
    id:"p58",
    name:"Anycubic Photon P1 Max",
    category:"Imprimantes 3D",
    price:600,
    image:"https://fr.anycubic.com/cdn/shop/files/P1M_8bd4d344-b751-4497-a535-4e647ecef572.jpg?v=1784100048&width=150"
  },

  {
    id:"p59",
    name:"GTA VI Key PlayStation",
    category:"Logiciels & licences",
    price:80,
    image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ9VsG_IxAanmrCSqCyACtuyCqCD5rwiQ3P3Iylexch3XnCT4sevDBCz-vnqlVCBvZroOpYIX9T0Flc8EzGSZuyPMibCcQm"
  },

  {
    id:"p60",
    name:"Microsoft Windows 11 Pro Key",
    category:"Logiciels & licences",
    price:2.55,
    image:"https://imgproxy.eneba.games/0A9PW8DP7_YSTA-WUru4IVJnFXsKikaoYM5RHNb3nHQ/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy93/YUFhcnZicFhzSm8y/NjZSZ3hKSVpuYjVX/ZzRkVWY3a3YyUDQx/bm1nakJjLnBuZw"
  },

  {
    id:"p61",
    name:"AsiaHorse Aurora-CO Gaines de Câble ARGB",
    category:"Accessoires composants PC",
    price:15.99,
    image:"https://m.media-amazon.com/images/I/71NF0H-6FXL._SL1500_.jpg"
  },

  {
    id:"p62",
    name:"Câble vidéo Accsup HDMI 2.0 4K UHD avec Ethernet 5 m Noir",
    category:"Adaptateurs / câbles / chargeurs",
    price:12.99,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/db/90/4a/21663963/1540-1/tsp20260909104107/Cable-video-Accsup-HDMI-2-0-4K-UHD-avec-Ethernet-5-m-Noir.jpg"
  },

  {
    id:"p63",
    name:"Cable Relier ecran pour pc Certifié Câble DP vers DP 10K 240Hz",
    category:"Adaptateurs / câbles / chargeurs",
    price:0,
    image:"https://media.ldlc.com/r705/ld/products/00/02/92/76/LD0002927652_2.jpg"
  },

  {
    id:"p64",
    name:"Câble USB-C ESSENTIELB vers USB-C 1M Noir",
    category:"Adaptateurs / câbles / chargeurs",
    price:1,
    image:"https://boulanger.scene7.com/is/image/Boulanger/3497674179939_h_f_l_2?wid=2140&hei=2140&resMode=sharp2&op_usm=1.75,0.3,2,0&fmt=png-alpha"
  },

  {
    id:"p65",
    name:"Cables USB Accsup CABLE USB-C VERS USB-A 1M NOIR",
    category:"Adaptateurs / câbles / chargeurs",
    price:1,
    image:"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQc0G0oeTkaEJ6JvVV0ZXd71PPCYpoIZHL_hoaAXgTucxOK8acM9uU4eStYeQv15uPfYyTuRWd7WFzsbcElQs98IXEsb48xCpW5bOL9kCWqpZ7x_ItlfqWH"
  },

  {
    id:"p66",
    name:"Câble USB-C vers Lightning pour Apple iPhone/iPad/iPod 1m Blanc",
    category:"Adaptateurs / câbles / chargeurs",
    price:1,
    image:"https://static.fnac-static.com/multimedia/Images/FR/MDM/a6/b8/07/17283238/1540-1/tsp20260617130730/Cable-USB-C-vers-Lightning-pour-Apple-iPhone-iPad-iPod-1m-Blanc.jpg"
  },

  {
    id:"p67",
    name:"BSTOEM pour Apple Watch Chargeur, Station de Charge USB C Magnétique 1M",
    category:"Adaptateurs / câbles / chargeurs",
    price:2.99,
    image:"https://m.media-amazon.com/images/I/61rGkIZqqCL._SL1500_.jpg"
  },

  {
    id:"p68",
    name:"StarTech Cordon d'alimentation PC de 1m - CEE 7/7 à C13",
    category:"Adaptateurs / câbles / chargeurs",
    price:4.50,
    image:"https://m.media-amazon.com/images/I/81b1fyIWcOL._AC_SL1500_.jpg"
  },

  {
    id:"p69",
    name:"Unicavu Webcam PC 2K 30 FPS Full HD 1080P",
    category:"Caméras & webcams",
    price:10,
    image:"https://m.media-amazon.com/images/I/61CJsbKfonL._AC_SL1500_.jpg"
  },

  {
    id:"p70",
    name:"eMeet Nova 4K Webcam 4K Ultra HD avec 2 Microphones",
    category:"Caméras & webcams",
    price:23.99,
    image:"https://m.media-amazon.com/images/I/61bCeQBjUwL._AC_SL1500_.jpg"
  },

  {
    id:"p71",
    name:"Quntis Lampe Écran Pc RGB, Monitor Light Bar IM 40 cm Noir",
    category:"Barres lumineuses pour écran",
    price:8.99,
    image:"https://m.media-amazon.com/images/I/71ESgk4ETPL._AC_SL1500_.jpg"
  },

  {
    id:"p72",
    name:"TONOR Micro Cardioïde Dynamique USB/XLR TD510+",
    category:"Microphones",
    price:20.99,
    image:"https://m.media-amazon.com/images/I/61EZnm+ijZL._AC_SL1500_.jpg"
  },

  {
    id:"p73",
    name:"BONTEC Bras Ecran PC à Ressort à Gaz, 13-32 Pouces",
    category:"Supports écrans",
    price:16,
    image:"https://m.media-amazon.com/images/I/61gjjZxKbeL._AC_SL1500_.jpg"
  },

  {
    id:"p74",
    name:"BONTEC Support Ecran PC 2 Ecran Articulé à Ressort à Gaz, 13-32 Pouces",
    category:"Supports écrans",
    price:23,
    image:"https://m.media-amazon.com/images/I/71kZjwcU4SL._AC_SL1500_.jpg"
  },

  {
    id:"p75",
    name:"BONTEC Bras Ecran PC Mural à Ressort à Gaz, 13-42 Pouces, Charge 38kg",
    category:"Supports écrans",
    price:16,
    image:"https://m.media-amazon.com/images/I/71-oseIdQXL._AC_SL1500_.jpg"
  },

  {
    id:"p76",
    name:"KTC Écran PC Gamer Incurvé 24 Pouces FHD 240 Hz",
    category:"Écrans",
    price:80,
    image:"https://m.media-amazon.com/images/I/71wUlFXcaZL._AC_SL1500_.jpg"
  },

  {
    id:"p77",
    name:"KTC Écran PC Gamer Incurvé 27 Pouces QHD 180Hz",
    category:"Écrans",
    price:110,
    image:"https://m.media-amazon.com/images/I/61Rehn5YTWL._AC_SL1000_.jpg"
  },

  {
    id:"p78",
    name:"HKC Écran PC Gaming 34 Pouces Incurvé UWQHD 120 Hz HDR400",
    category:"Écrans",
    price:170,
    image:"https://m.media-amazon.com/images/I/71useoNrGEL._AC_SL1500_.jpg"
  },

  {
    id:"p79",
    name:"HKC 27 Pouces Ecran Gaming 4K Dual Mode UHD 160Hz / FHD 320Hz G27H7P",
    category:"Écrans",
    price:140,
    image:"https://m.media-amazon.com/images/I/81MjOWRE0SL._AC_SL1500_.jpg"
  },

  {
    id:"p80",
    name:"XIAOMI TV F 65 Pouces 2025 4K UHD Smart TV",
    category:"Écrans",
    price:249.99,
    image:"https://m.media-amazon.com/images/I/61Jk8xxkLZL._AC_SL1000_.jpg"
  },

  {
    id:"p81",
    name:"Xbox Manette sans fil",
    category:"Manettes & consoles",
    price:59.99,
    image:"https://img.pccomponentes.com/articles/1066/10665216/1642-microsoft-mando-inalambrico-xbox-series-one-pc-blanco.jpg",
    options:{
      label:"Couleur",
      values:["Rose","Bleu","Noir","Rouge","Blanc","Vert"],
      required:true
    }
  },

  {
    id:"p82",
    name:"PlayStation 5 avec 1 Manette Sans Fil DualSense",
    category:"Manettes & consoles",
    price:320,
    image:"https://m.media-amazon.com/images/I/61h7VjYt-fL._AC_SL1500_.jpg",
    options:{
      label:"Console",
      values:["PS5 avec lecteur","PS5 Pro"],
      required:true
    }
  },

  {
    id:"p83",
    name:"Xbox Series X - 1TB Digital Edition avec 1 manette sans fil",
    category:"Manettes & consoles",
    price:599.99,
    image:"https://m.media-amazon.com/images/I/51OVjV4-GqL._AC_SL1500_.jpg"
  },

  {
    id:"p84",
    name:"Xbox Series S - All Digital Gaming Console - 512GB SSD",
    category:"Manettes & consoles",
    price:500,
    image:"https://m.media-amazon.com/images/I/61PI59RfWvL._AC_SX425_.jpg"
  }

];


// ============================================================
// NOTES / AVIS AUTOMATIQUES
// ============================================================

products.forEach((product,index) => {

  product.rating = Number(
    (4.2 + ((index * 17) % 81) / 100).toFixed(1)
  );

  product.reviewCount =
    1248 + ((index * 137) % 2028);

});


// ============================================================
// FALLBACK IMAGE
// ============================================================

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
      <rect width="100%" height="100%" fill="#101827"/>
      <text x="50%" y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="#6f7f95"
        font-family="Arial"
        font-size="28">
        NOVASHOP
      </text>
    </svg>
  `);


// ============================================================
// ÉTAT DU CATALOGUE
// ============================================================

let selectedCategory = "Tous";
let searchValue = "";
let sortValue = "default";


// ============================================================
// OUTILS PRODUITS
// ============================================================

function money(value){

  return Number(value || 0).toLocaleString(
    "fr-FR",
    {
      style:"currency",
      currency:"EUR"
    }
  );

}


function escapeHTML(value){

  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");

}


function escapeAttr(value){

  return escapeHTML(value);

}


function getProduct(id){

  return products.find(
    product => product.id === id
  );

}


function getRatingStars(rating){

  const value = Math.max(
    1,
    Math.min(
      5,
      Number(rating || 4.2)
    )
  );

  const full = Math.round(value);

  return "★".repeat(full) +
         "☆".repeat(5-full);

}


function hasRequiredOption(product){

  return !!(
    product?.options?.required &&
    Array.isArray(product.options.values) &&
    product.options.values.length
  );

}


function getProductOptionLabel(product){

  return product?.options?.label || "Option";

}


// ============================================================
// CATÉGORIES
// ============================================================

function getCategories(){

  return [
    "Tous",
    ...new Set(
      products.map(
        product => product.category
      )
    )
  ];

}


function getFilteredProducts(){

  let result = [...products];


  if(
    selectedCategory &&
    selectedCategory !== "Tous"
  ){

    result = result.filter(
      product =>
        product.category === selectedCategory
    );

  }


  const search =
    searchValue.trim().toLowerCase();


  if(search){

    result = result.filter(
      product => {

        const text =
          `${product.name} ${product.category}`
          .toLowerCase();

        return text.includes(search);

      }
    );

  }


  switch(sortValue){

    case "price-asc":

      result.sort(
        (a,b) =>
          Number(a.price) -
          Number(b.price)
      );

      break;


    case "price-desc":

      result.sort(
        (a,b) =>
          Number(b.price) -
          Number(a.price)
      );

      break;


    case "name-asc":

      result.sort(
        (a,b) =>
          a.name.localeCompare(
            b.name,
            "fr"
          )
      );

      break;


    case "rating-desc":

      result.sort(
        (a,b) =>
          Number(b.rating) -
          Number(a.rating)
      );

      break;

  }


  return result;

}


// ============================================================
// RENDU DES CATÉGORIES
// ============================================================

function renderCategories(){

  const categoriesEl =
    document.getElementById("categories");

  if(!categoriesEl) return;


  const categories =
    getCategories();


  categoriesEl.innerHTML =
    categories.map(category => `

      <button
        type="button"
        class="category-btn ${category === selectedCategory ? "active" : ""}"
        data-category="${escapeAttr(category)}">

        ${escapeHTML(category)}

      </button>

    `).join("");


  categoriesEl
    .querySelectorAll(".category-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          selectedCategory =
            button.dataset.category || "Tous";

          renderCategories();
          renderProducts();

        }
      );

    });

}


// ============================================================
// FIN BLOC 1
// ============================================================ // ============================================================
// NOVASHOP - BLOC 2
// AFFICHAGE + PANIER + OPTIONS PRODUITS
// ============================================================


// ============================================================
// ÉTAT
// ============================================================

let currentUser = null;
let cart = [];
let favorites = [];
let reviewsCache = {};

try {

  cart = JSON.parse(
    localStorage.getItem("novaCart") || "[]"
  );

  if(!Array.isArray(cart)){
    cart = [];
  }

} catch {

  cart = [];

}


try {

  favorites = JSON.parse(
    localStorage.getItem("novaFavorites") || "[]"
  );

  if(!Array.isArray(favorites)){
    favorites = [];
  }

} catch {

  favorites = [];

}


// ============================================================
// SAUVEGARDE
// ============================================================

function saveCart(){

  localStorage.setItem(
    "novaCart",
    JSON.stringify(cart)
  );

}


function saveFavorites(){

  localStorage.setItem(
    "novaFavorites",
    JSON.stringify(favorites)
  );

}


// ============================================================
// PANIER
// ============================================================

function getCartCount(){

  return cart.reduce(
    (total,item) =>
      total + Number(item.quantity || 0),
    0
  );

}


function getCartSubtotal(){

  return cart.reduce(
    (total,item) => {

      const product =
        getProduct(item.id);

      if(!product){
        return total;
      }

      return total +
        product.price *
        Number(item.quantity || 1);

    },
    0
  );

}


function findCartItem(
  id,
  option = ""
){

  return cart.find(
    item =>
      item.id === id &&
      (item.option || "") === option
  );

}


function getCartProductName(item){

  const product =
    getProduct(item.id);

  const name =
    product?.name ||
    item.name ||
    "Produit";

  return item.option
    ? `${name} (${item.option})`
    : name;

}


// ============================================================
// TOAST
// ============================================================

function toast(
  message,
  type = "info"
){

  let box =
    document.getElementById("novaToast");

  if(!box){

    box =
      document.createElement("div");

    box.id = "novaToast";

    box.style.position = "fixed";
    box.style.right = "20px";
    box.style.bottom = "20px";
    box.style.zIndex = "99999";
    box.style.padding = "14px 18px";
    box.style.borderRadius = "12px";
    box.style.background = "#111827";
    box.style.color = "#fff";
    box.style.boxShadow =
      "0 10px 30px rgba(0,0,0,.35)";
    box.style.fontSize = "14px";
    box.style.fontWeight = "600";

    document.body.appendChild(box);

  }

  box.textContent = message;

  if(type === "success"){

    box.style.border =
      "1px solid #25d695";

  }else if(type === "error"){

    box.style.border =
      "1px solid #ff5555";

  }else{

    box.style.border =
      "1px solid #2d8cff";

  }


  clearTimeout(
    box._timeout
  );


  box._timeout =
    setTimeout(
      () => {

        box.remove();

      },
      2200
    );

}


// ============================================================
// OPTIONS PRODUIT
// ============================================================

function showProductOptions(
  product,
  containerId = "productOptions"
){

  if(!hasRequiredOption(product)){
    return "";
  }


  return `

    <div
      id="${escapeAttr(containerId)}"
      style="
        margin:15px 0;
        padding:14px;
        border-radius:14px;
        background:rgba(255,255,255,.045);
      "
    >

      <strong
        style="
          display:block;
          margin-bottom:10px;
        "
      >
        ${escapeHTML(product.options.label)}
      </strong>


      <div
        style="
          display:flex;
          flex-wrap:wrap;
          gap:8px;
        "
      >

        ${product.options.values.map(value => `

          <button
            type="button"
            class="view-btn product-option"
            data-option="${escapeAttr(value)}"
            style="
              flex:1 1 110px;
              min-width:100px;
            "
          >
            ${escapeHTML(value)}
          </button>

        `).join("")}

      </div>


      <div
        id="${escapeAttr(containerId)}Error"
        style="
          display:none;
          color:#ff7777;
          margin-top:10px;
          font-size:13px;
        "
      >
        Choisis une option avant d'ajouter au panier.
      </div>


      <input
        type="hidden"
        id="${escapeAttr(containerId)}Value"
        value=""
      >

    </div>

  `;

}


function setupProductOptions(
  containerId = "productOptions"
){

  const container =
    document.getElementById(containerId);

  if(!container){
    return;
  }


  const input =
    document.getElementById(
      `${containerId}Value`
    );


  const error =
    document.getElementById(
      `${containerId}Error`
    );


  container
    .querySelectorAll(".product-option")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          container
            .querySelectorAll(".product-option")
            .forEach(item => {

              item.classList.remove(
                "selected"
              );

              item.style.border = "";

            });


          button.classList.add(
            "selected"
          );


          button.style.border =
            "2px solid var(--accent,#2d8cff)";


          if(input){

            input.value =
              button.dataset.option || "";

          }


          if(error){

            error.style.display =
              "none";

          }

        }
      );

    });

}


function getSelectedProductOption(
  containerId = "productOptions"
){

  return (
    document.getElementById(
      `${containerId}Value`
    )?.value.trim() || ""
  );

}


// ============================================================
// AJOUT PANIER
// ============================================================

function addToCart(
  id,
  option = ""
){

  const product =
    getProduct(id);

  if(!product){
    return;
  }


  if(hasRequiredOption(product) && !option){

    openProduct(id);

    return;

  }


  const existing =
    findCartItem(id, option);


  if(existing){

    existing.quantity =
      Number(existing.quantity || 0) + 1;

  }else{

    cart.push({

      id:id,

      quantity:1,

      option:option || ""

    });

  }


  saveCart();

  updateCartUI();

  toast(
    "Produit ajouté au panier 🛒",
    "success"
  );

}


// ============================================================
// RETIRER DU PANIER
// ============================================================

function removeFromCart(
  id,
  option = ""
){

  cart =
    cart.filter(
      item =>
        !(
          item.id === id &&
          (item.option || "") === option
        )
    );


  saveCart();

  updateCartUI();

  renderCart();

}


// ============================================================
// QUANTITÉ
// ============================================================

function changeCartQuantity(
  id,
  option,
  delta
){

  const item =
    findCartItem(
      id,
      option
    );

  if(!item){
    return;
  }


  item.quantity =
    Number(item.quantity || 1) +
    Number(delta || 0);


  if(item.quantity <= 0){

    removeFromCart(
      id,
      option
    );

    return;

  }


  saveCart();

  updateCartUI();

  renderCart();

}


// ============================================================
// CATÉGORIES
// ============================================================

function renderCategories(){

  const categoriesEl =
    document.getElementById("categories");

  if(!categoriesEl){
    return;
  }


  const categories = [
    "Tous",
    ...new Set(
      products.map(
        product => product.category
      )
    )
  ];


  categoriesEl.innerHTML =
    categories.map(
      category => `

        <button
          type="button"
          class="category-btn ${
            category === selectedCategory
              ? "active"
              : ""
          }"
          data-category="${escapeAttr(category)}"
        >
          ${escapeHTML(category)}
        </button>

      `
    ).join("");


  categoriesEl
    .querySelectorAll(".category-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          selectedCategory =
            button.dataset.category ||
            "Tous";

          renderCategories();

          renderProducts();

        }
      );

    });

}


// ============================================================
// PRODUITS FILTRÉS
// ============================================================

function getFilteredProducts(){

  let result =
    [...products];


  if(
    selectedCategory &&
    selectedCategory !== "Tous"
  ){

    result =
      result.filter(
        product =>
          product.category ===
          selectedCategory
      );

  }


  const search =
    searchValue
      .trim()
      .toLowerCase();


  if(search){

    result =
      result.filter(
        product => {

          const text =
            `${product.name} ${product.category}`
              .toLowerCase();

          return text.includes(search);

        }
      );

  }


  switch(sortValue){

    case "price-asc":

      result.sort(
        (a,b) =>
          Number(a.price) -
          Number(b.price)
      );

      break;


    case "price-desc":

      result.sort(
        (a,b) =>
          Number(b.price) -
          Number(a.price)
      );

      break;


    case "name-asc":

      result.sort(
        (a,b) =>
          a.name.localeCompare(
            b.name,
            "fr"
          )
      );

      break;


    case "rating-desc":

      result.sort(
        (a,b) =>
          Number(b.rating) -
          Number(a.rating)
      );

      break;

  }


  return result;

}


// ============================================================
// AFFICHAGE PRODUITS
// ============================================================

function renderProducts(){

  const productsGrid =
    document.getElementById(
      "productsGrid"
    );

  if(!productsGrid){
    return;
  }


  const productCount =
    document.getElementById(
      "productCount"
    );


  const filtered =
    getFilteredProducts();


  if(productCount){

    productCount.textContent =
      `${filtered.length} produit${
        filtered.length > 1
          ? "s"
          : ""
      }`;

  }


  if(!filtered.length){

    productsGrid.innerHTML = `

      <div
        style="
          grid-column:1/-1;
          text-align:center;
          padding:50px 20px;
          opacity:.7;
        "
      >
        Aucun produit trouvé.
      </div>

    `;

    return;

  }


  productsGrid.innerHTML =
    filtered.map(product => {

      const favorite =
        favorites.includes(
          product.id
        );


      const image =
        product.image ||
        FALLBACK_IMAGE;


      return `

        <article
          class="product-card"
          data-product-id="${escapeAttr(product.id)}"
          style="cursor:default;"
        >

          <div
            class="product-image-wrap"
          >

            <img
              class="product-image"
              src="${escapeAttr(image)}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              onerror="
                this.onerror=null;
                this.src='${FALLBACK_IMAGE}';
              "
            >


            ${
              product.new
                ? `<span class="product-new">NOUVEAU</span>`
                : ""
            }


            <button
              type="button"
              class="product-favorite"
              data-product-id="${escapeAttr(product.id)}"
              aria-label="Favori"
              title="Favori"
            >
              ${favorite ? "♥" : "♡"}
            </button>

          </div>


          <div
            class="product-info"
          >

            <div
              class="product-category"
            >
              ${escapeHTML(product.category)}
            </div>


            <h3
              class="product-name"
            >
              ${escapeHTML(product.name)}
            </h3>


            <div
              class="product-rating"
            >

              <span
                class="stars"
              >
                ${getRatingStars(product.rating)}
              </span>

              <span>
                ${Number(product.rating).toFixed(1)}
              </span>

              <span>
                (${product.reviewCount})
              </span>

            </div>


            <div
              class="product-bottom"
            >

              <strong
                class="product-price"
              >
                ${money(product.price)}
              </strong>


              <div
                class="product-actions"
              >

                <button
                  type="button"
                  class="view-btn product-view"
                  data-product-id="${escapeAttr(product.id)}"
                >
                  Voir
                </button>


                <button
                  type="button"
                  class="add-btn product-add"
                  data-product-id="${escapeAttr(product.id)}"
                >
                  Ajouter
                </button>

              </div>

            </div>

          </div>

        </article>

      `;

    }).join("");

}


// ============================================================
// FAVORIS
// ============================================================

function toggleFavorite(id){

  if(!id){
    return;
  }


  if(favorites.includes(id)){

    favorites =
      favorites.filter(
        item => item !== id
      );

    toast(
      "Retiré des favoris",
      "info"
    );

  }else{

    favorites.push(id);

    toast(
      "Ajouté aux favoris ❤️",
      "success"
    );

  }


  saveFavorites();

  renderProducts();

}


// ============================================================
// CLICS PRODUITS
// ============================================================

const productsGrid =
  document.getElementById(
    "productsGrid"
  );


productsGrid?.addEventListener(
  "click",
  event => {

    const favoriteButton =
      event.target.closest(
        ".product-favorite"
      );


    if(favoriteButton){

      const id =
        favoriteButton.dataset.productId;


      if(!id){
        return;
      }


      toggleFavorite(id);

      return;

    }


    const addButton =
      event.target.closest(
        ".product-add"
      );


    if(addButton){

      const id =
        addButton.dataset.productId;


      const product =
        getProduct(id);


      if(!product){
        return;
      }


      if(hasRequiredOption(product)){

        openProduct(id);

        return;

      }


      addToCart(id);

      return;

    }


    const viewButton =
      event.target.closest(
        ".product-view"
      );


    if(viewButton){

      const id =
        viewButton.dataset.productId;


      if(id){

        openProduct(id);

      }

    }

  }
);


// ============================================================
// RECHERCHE
// ============================================================

const searchInput =
  document.getElementById(
    "searchInput"
  );


searchInput?.addEventListener(
  "input",
  () => {

    searchValue =
      searchInput.value || "";

    renderProducts();

  }
);


// ============================================================
// TRI
// ============================================================

const sortSelect =
  document.getElementById(
    "sortSelect"
  );


sortSelect?.addEventListener(
  "change",
  () => {

    sortValue =
      sortSelect.value || "default";

    renderProducts();

  }
);


// ============================================================
// MODAL PRODUIT
// ============================================================

function openProduct(id){

  const product =
    getProduct(id);

  if(!product){
    return;
  }


  let modal =
    document.getElementById(
      "productModal"
    );


  if(!modal){

    modal =
      document.createElement("div");

    modal.id =
      "productModal";


    modal.style.position =
      "fixed";

    modal.style.inset =
      "0";

    modal.style.zIndex =
      "9999";

    modal.style.background =
      "rgba(0,0,0,.75)";

    modal.style.display =
      "flex";

    modal.style.alignItems =
      "center";

    modal.style.justifyContent =
      "center";

    modal.style.padding =
      "20px";


    document.body.appendChild(
      modal
    );

  }


  modal.innerHTML = `

    <div
      style="
        width:min(700px,100%);
        max-height:90vh;
        overflow:auto;
        background:#0b1422;
        border:1px solid rgba(255,255,255,.08);
        border-radius:20px;
        padding:22px;
        color:#fff;
        box-shadow:0 20px 70px rgba(0,0,0,.55);
      "
    >

      <div
        style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:15px;
          margin-bottom:15px;
        "
      >

        <strong
          style="
            font-size:18px;
          "
        >
          ${escapeHTML(product.name)}
        </strong>


        <button
          type="button"
          id="closeProductModal"
          class="view-btn"
        >
          ✕
        </button>

      </div>


      <img
        src="${escapeAttr(product.image || FALLBACK_IMAGE)}"
        alt="${escapeHTML(product.name)}"
        style="
          width:100%;
          max-height:330px;
          object-fit:contain;
          border-radius:15px;
          background:#080d16;
        "
        onerror="
          this.onerror=null;
          this.src='${FALLBACK_IMAGE}';
        "
      >


      <div
        style="
          margin-top:18px;
        "
      >

        <div
          style="
            opacity:.65;
            font-size:13px;
            margin-bottom:7px;
          "
        >
          ${escapeHTML(product.category)}
        </div>


        <h2
          style="
            margin:0 0 10px;
          "
        >
          ${escapeHTML(product.name)}
        </h2>


        <div
          style="
            display:flex;
            gap:8px;
            align-items:center;
            margin-bottom:12px;
          "
        >

          <span
            style="
              color:#ffd45c;
              letter-spacing:1px;
            "
          >
            ${getRatingStars(product.rating)}
          </span>

          <span>
            ${Number(product.rating).toFixed(1)}
          </span>

          <span
            style="opacity:.6;"
          >
            (${product.reviewCount} avis)
          </span>

        </div>


        <div
          style="
            font-size:25px;
            font-weight:800;
            margin-bottom:15px;
          "
        >
          ${money(product.price)}
        </div>


        ${showProductOptions(product)}


        <button
          type="button"
          id="modalAddProduct"
          class="add-btn"
          style="
            width:100%;
            min-height:48px;
            font-size:15px;
          "
        >
          Ajouter au panier
        </button>

      </div>

    </div>

  `;


  modal.style.display =
    "flex";


  setupProductOptions();


  document
    .getElementById(
      "closeProductModal"
    )
    ?.addEventListener(
      "click",
      () => {

        modal.style.display =
          "none";

      }
    );


  document
    .getElementById(
      "modalAddProduct"
    )
    ?.addEventListener(
      "click",
      () => {

        let option = "";


        if(hasRequiredOption(product)){

          option =
            getSelectedProductOption(
              "productOptions"
            );


          if(!option){

            const error =
              document.getElementById(
                "productOptionsError"
              );


            if(error){

              error.style.display =
                "block";

            }

            return;

          }

        }


        addToCart(
          product.id,
          option
        );


        modal.style.display =
          "none";

      }
    );


  modal.addEventListener(
    "click",
    event => {

      if(event.target === modal){

        modal.style.display =
          "none";

      }

    }
  );

}


// ============================================================
// PANIER - UI
// ============================================================

function updateCartUI(){

  const count =
    getCartCount();


  const elements =
    document.querySelectorAll(
      "[data-cart-count]"
    );


  elements.forEach(
    element => {

      element.textContent =
        count;

    }
  );


  const cartCount =
    document.getElementById(
      "cartCount"
    );


  if(cartCount){

    cartCount.textContent =
      count;

  }

}


// ============================================================
// AFFICHAGE PANIER
// ============================================================

function renderCart(){

  const cartItems =
    document.getElementById(
      "cartItems"
    );


  if(!cartItems){
    return;
  }


  if(!cart.length){

    cartItems.innerHTML = `

      <div
        style="
          text-align:center;
          padding:40px 15px;
          opacity:.7;
        "
      >
        Ton panier est vide 🛒
      </div>

    `;

    updateCartTotal();

    return;

  }


  cartItems.innerHTML =
    cart.map(item => {

      const product =
        getProduct(item.id);


      if(!product){
        return "";
      }


      const optionText =
        item.option
          ? `
            <div
              style="
                font-size:12px;
                opacity:.65;
                margin-top:4px;
              "
            >
              ${escapeHTML(
                product.options?.label ||
                "Option"
              )} :
              ${escapeHTML(item.option)}
            </div>
          `
          : "";


      return `

        <div
          class="cart-item"
          data-cart-id="${escapeAttr(item.id)}"
          data-cart-option="${escapeAttr(item.option || "")}"
          style="
            display:flex;
            gap:12px;
            padding:12px 0;
            border-bottom:1px solid rgba(255,255,255,.08);
          "
        >

          <img
            src="${escapeAttr(product.image || FALLBACK_IMAGE)}"
            alt="${escapeHTML(product.name)}"
            style="
              width:70px;
              height:70px;
              object-fit:contain;
              border-radius:10px;
              background:#0a101b;
            "
            onerror="
              this.onerror=null;
              this.src='${FALLBACK_IMAGE}';
            "
          >


          <div
            style="
              flex:1;
              min-width:0;
            "
          >

            <strong
              style="
                display:block;
                font-size:13px;
                line-height:1.3;
              "
            >
              ${escapeHTML(product.name)}
            </strong>


            ${optionText}


            <div
              style="
                margin-top:7px;
                font-weight:700;
              "
            >
              ${money(product.price)}
            </div>


            <div
              style="
                display:flex;
                align-items:center;
                gap:8px;
                margin-top:8px;
              "
            >

              <button
                type="button"
                class="cart-minus"
                data-id="${escapeAttr(item.id)}"
                data-option="${escapeAttr(item.option || "")}"
              >
                −
              </button>


              <span>
                ${Number(item.quantity || 1)}
              </span>


              <button
                type="button"
                class="cart-plus"
                data-id="${escapeAttr(item.id)}"
                data-option="${escapeAttr(item.option || "")}"
              >
                +
              </button>


              <button
                type="button"
                class="cart-remove"
                data-id="${escapeAttr(item.id)}"
                data-option="${escapeAttr(item.option || "")}"
                style="
                  margin-left:auto;
                "
              >
                Supprimer
              </button>

            </div>

          </div>

        </div>

      `;

    }).join("");


  updateCartTotal();

}


// ============================================================
// TOTAL PANIER
// ============================================================

function updateCartTotal(){

  const total =
    money(getCartSubtotal());


  const elements =
    document.querySelectorAll(
      "[data-cart-total]"
    );


  elements.forEach(
    element => {

      element.textContent =
        total;

    }
  );


  const cartTotal =
    document.getElementById(
      "cartTotal"
    );


  if(cartTotal){

    cartTotal.textContent =
      total;

  }

}


// ============================================================
// CLICS PANIER
// ============================================================

document.addEventListener(
  "click",
  event => {

    const plus =
      event.target.closest(
        ".cart-plus"
      );


    if(plus){

      changeCartQuantity(
        plus.dataset.id,
        plus.dataset.option || "",
        1
      );

      return;

    }


    const minus =
      event.target.closest(
        ".cart-minus"
      );


    if(minus){

      changeCartQuantity(
        minus.dataset.id,
        minus.dataset.option || "",
        -1
      );

      return;

    }


    const remove =
      event.target.closest(
        ".cart-remove"
      );


    if(remove){

      removeFromCart(
        remove.dataset.id,
        remove.dataset.option || ""
      );

    }

  }
);


// ============================================================
// INITIALISATION
// ============================================================

function initNovaShop(){

  renderCategories();

  renderProducts();

  renderCart();

  updateCartUI();

}


if(
  document.readyState ===
  "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    initNovaShop
  );

}else{

  initNovaShop();

}


// ============================================================
// FIN BLOC 2
// ============================================================
