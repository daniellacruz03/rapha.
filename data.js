const productsData = {
  supplements: [
    {
      id: 'sup-001',
      image: 'suplementospng/creatinanutrex.png',
      name: 'Creatina Nutrex (60 Servicios)',
      price: 35,
      currency: 'BCV',
      description: 'Creatina Monohidratada pura para mejorar la fuerza y el rendimiento muscular.',
      isNew: true,
      technicalInfo: {
        'Porciones': '60',
        'Dosis': '5g de Creatina Monohidratada por porción',
        'Ingredientes': '100% Creatina Monohidratada Micronizada',
        'Beneficios': 'Aumenta la fuerza, potencia y masa muscular',
        'Uso sugerido': 'Mezclar 1 scoop (5g) con 8 oz de agua o jugo'
      }
    },
    {
      id: 'sup-002',
      image: 'suplementospng/creatinahealthyfoods.png',
      name: 'Creatina Healthy Foods (100 Servicios)',
      price: 35,
      currency: 'BCV',
      description: 'Creatina de alta pureza para mayor energía y desarrollo muscular.',
      isNew: false,
      technicalInfo: {
        'Porciones': '100',
        'Dosis': '5g de Creatina Monohidratada por porción',
        'Beneficios': 'Mejora el rendimiento atlético y la recuperación',
        'Certificaciones': 'Libre de gluten, Vegano'
      }
    },
    {
      id: 'sup-003',
      image: 'suplementospng/creatinamuscletech.png',
      name: 'Creatina Muscletech (60 Servicios)',
      price: 45,
      currency: 'BCV',
      description: 'Fórmula avanzada de creatina Platinum 100% pure monohydrate.',
      isNew: true,
      technicalInfo: {
        'Porciones': '60',
        'Dosis': '5g de Creatina Monohidratada Platinum por porción',
        'Beneficios': 'Acelera la regeneración de ATP durante el entrenamiento pesado'
      }
    },
    {
      id: 'sup-004',
      image: 'suplementospng/creatinaorgain.png',
      name: 'Creatina Orgain (135 Servicios)',
      price: 50,
      currency: 'BCV',
      description: 'Creatina premium para máximo rendimiento deportivo.',
      technicalInfo: {
        'Porciones': '135',
        'Dosis': '5g de Creatina Monohidratada',
        'Certificaciones': 'USDA Organic, Non-GMO'
      }
    },
    {
      id: 'sup-005',
      image: 'suplementospng/Nutricost-Whey-Protein.png',
      name: 'Whey Protein Nutricost',
      price: 75,
      currency: 'BCV',
      description: 'Proteína de suero de leche de rápida absorción.',
      technicalInfo: {
        'Proteína por porción': '25g',
        'Azúcares': 'Menos de 2g',
        'Ingredientes': 'Concentrado de Proteína de Suero (Whey Concentrate)',
        'Beneficios': 'Apoya la recuperación y el crecimiento muscular'
      }
    },
    {
      id: 'sup-006',
      image: 'suplementospng/Wey_protein_Muscletech.png',
      name: 'Whey Protein Muscletech',
      price: 85,
      currency: 'BCV',
      description: 'Proteína premium con péptidos de suero para una rápida recuperación.',
      technicalInfo: {
        'Proteína por porción': '30g',
        'Matriz': 'Mezcla de péptidos y aislado de suero',
        'Beneficios': 'Absorción ultra rápida'
      }
    },
    {
      id: 'sup-007',
      image: 'suplementospng/Six-Star-Pro-Nutrition-100-Whey-Protein-Powder-Plus-30g-Protein-Triple-Chocolate-.png',
      name: 'Whey Protein Sixstar',
      price: 75,
      currency: 'BCV',
      description: 'Proteína 100% de suero diseñada para potenciar la recuperación.',
      technicalInfo: {
        'Proteína por porción': '30g',
        'Adiciones': 'Enriquecido con BCAAs y Glutamina',
        'Sabor': 'Triple Chocolate'
      }
    },
    {
      id: 'sup-011',
      image: 'suplementospng/mantequillademanijif-removebg-preview.png',
      name: 'Mantequilla de maní Jif',
      price: 25,
      currency: 'BCV',
      description: 'Mantequilla de maní cremosa, excelente fuente de proteína.',
      technicalInfo: {
        'Proteína por porción': '7g',
        'Calorías por porción': '190 kcal',
        'Ingredientes': 'Maní tostado, azúcar, aceites vegetales',
        'Textura': 'Extra Cremosa'
      }
    },
  ],
  vitamins: [
    {
      id: 'sup-009',
      image: 'suplementospng/naturemagnesium.png',
      name: 'Magnesio Kirkland',
      price: 55,
      currency: 'BCV',
      description: 'Suplemento mineral esencial para la salud ósea y muscular.',
      technicalInfo: {
        'Tipo': 'Citrato de Magnesio',
        'Beneficios': 'Alta biodisponibilidad, relaja músculos, salud del sistema nervioso',
        'Dosis': 'Consultar empaque'
      }
    },
    {
      id: 'sup-012',
      image: 'suplementospng/naturesbounty.png',
      name: 'Biotina y Ácido Hialurónico Nature Bounty',
      price: 55,
      currency: 'BCV',
      description: 'Fórmula para el cuidado de la piel, cabello y uñas.',
      technicalInfo: {
        'Beneficios': 'Piel radiante, cabello fuerte y uñas saludables',
        'Ingredientes Clave': 'Biotina (Vitamina B7) y Ácido Hialurónico'
      }
    }
  ],
  men: [
    {
      id: 'shoe-002',
      image: 'zapatos png/ADIDAS CLOUD WHITE FOAM.png',
      name: 'Adidas Cloud White Foam',
      category: 'Tenis para hombre',
      subcategory: 'zapatos',
      price: 60,
      currency: 'DIVISAS',
      description: 'Ligereza extrema y amortiguación suave para máxima comodidad.',
      isNew: true,
      variants: {
        sizes: ['38', '39', '40', '41', '42', '43', '44', '45']
      },
      technicalInfo: {
        'Material': 'Malla ultraligera',
        'Suela': 'Cloudfoam Plus',
        'Tecnología': 'Cloudfoam amortiguación superior',
        'Tipo': 'Lifestyle / Running',
        'Cierre': 'Cordones'
      }
    },
    {
      id: 'shoe-004',
      image: 'zapatos png/NEW BALANCE GAROE V2(1).png',
      colorImages: [
        { color: '#374151', name: 'Gris Oscuro', images: ['zapatos png/NEW BALANCE GAROE V2(1).png', 'zapatos png/NEW BALANCE GAROE V2(1).png'] }
      ],
      name: 'New Balance Garoe V2',
      category: 'Tenis para hombre',
      subcategory: 'zapatos',
      price: 110,
      currency: 'DIVISAS',
      description: 'Trail runner resistente con soporte superior para terrenos exigentes.',
      variants: {
        sizes: ['38', '39', '40', '41', '42', '43', '44', '45']
      },
      technicalInfo: {
        'Material': 'Malla resistente con protecciones en puntera y talón',
        'Suela': 'Vibram FG con tacos multidireccionales',
        'Tecnología': 'AT Tread outsole para máximo agarre',
        'Tipo': 'Trail Running',
        'Cierre': 'Cordones'
      }
    },
    {
      id: 'cloth-001',
      image: 'ropapng/short.png',
      name: 'Short DSG',
      category: 'Ropa para hombre',
      subcategory: 'shorts',
      price: 15,
      currency: 'BCV',
      description: 'Short deportivo DSG ligero y transpirable, ideal para entrenamientos y running.',
      isNew: true,
      variants: {
        sizes: ['S', 'M', 'L']
      },
      technicalInfo: {
        'Material': '100% Poliéster Dri-FIT',
        'Ajuste': 'Regular fit',
        'Cintura': 'Elástica con cordón ajustable',
        'Bolsillos': 'Bolsillos laterales'
      }
    },
    {
      id: 'cloth-003',
      image: 'ropapng/camisetaazul.png',
      name: 'Camiseta Azul',
      category: 'Ropa para hombre',
      subcategory: 'camisas',
      price: 20,
      currency: 'DIVISAS',
      description: 'Camiseta deportiva de alto rendimiento.',
      isNew: true,
      variants: {
        sizes: ['S', 'M', 'L', 'XL']
      },
      technicalInfo: {
        'Material': 'Algodón suave y transpirable',
        'Ajuste': 'Slim fit',
        'Cuello': 'Cuello redondo',
        'Uso': 'Entrenamiento o estilo casual'
      }
    },
    {
      id: 'cloth-004',
      image: 'ropapng/franelillanaranja.png',
      name: 'Franelilla Naranja',
      category: 'Ropa para hombre',
      subcategory: 'franelas',
      price: 15,
      currency: 'DIVISAS',
      description: 'Franelilla ligera para entrenamiento intenso.',
      isNew: false,
      variants: {
        sizes: ['S', 'M', 'L']
      },
      technicalInfo: {
        'Material': 'Poliéster reciclado',
        'Diseño': 'Sin mangas para máxima libertad',
        'Tecnología': 'Control de humedad',
        'Uso': 'Gimnasio o running'
      }
    },
    {
      id: 'cloth-005',
      image: 'ropapng/shortcuadros.png',
      name: 'Short a Cuadros',
      category: 'Ropa para hombre',
      subcategory: 'shorts',
      price: 18,
      currency: 'DIVISAS',
      description: 'Short con diseño de cuadros, muy cómodo y versátil.',
      isNew: true,
      variants: {
        sizes: ['S', 'M', 'L']
      },
      technicalInfo: {
        'Material': 'Tela tejida duradera',
        'Diseño': 'Estampado de cuadros clásicos',
        'Bolsillos': 'Bolsillos traseros con cierre de botón',
        'Uso': 'Lifestyle / Casual'
      }
    },
    {
      id: 'cloth-006',
      image: 'ropapng/shortnaranja.png',
      name: 'Short Naranja Deportivo',
      category: 'Ropa para hombre',
      subcategory: 'shorts',
      price: 15,
      currency: 'DIVISAS',
      description: 'Short deportivo llamativo ideal para running.',
      isNew: false,
      variants: {
        sizes: ['S', 'M', 'L', 'XL']
      },
      technicalInfo: {
        'Material': 'Poliéster de secado rápido',
        'Visibilidad': 'Color de alta visibilidad para exteriores',
        'Forro': 'Forro interior de malla',
        'Uso': 'Correr en exteriores, deportes'
      }
    },
    {
      id: 'cloth-007',
      image: 'ropapng/sudaderanike.png',
      name: 'Sudadera Nike',
      category: 'Ropa para hombre',
      subcategory: 'sudaderas',
      price: 35,
      currency: 'DIVISAS',
      description: 'Sudadera Nike clásica para protegerte del clima frío.',
      isNew: true,
      variants: {
        sizes: ['S', 'M', 'L', 'XL']
      },
      technicalInfo: {
        'Material': 'Fleece / Mezcla de algodón y poliéster',
        'Capucha': 'Capucha forrada con cordón',
        'Bolsillo': 'Bolsillo frontal estilo canguro',
        'Corte': 'Clásico y relajado'
      }
    }
  ],
  women: [
    {
      id: 'shoe-001',
      image: 'zapatos png/NEW BALANCE 740.png',
      colorImages: [
        { color: '#ffffff', name: 'White', images: ['zapatos png/NEW BALANCE 740.png', 'zapatos png/NEW BALANCE 740.png'] },
        { color: '#1e3a8a', name: 'Navy', images: ['zapatos png/NEW BALANCE 740(3).png', 'zapatos png/NEW BALANCE 740(3).png'] }
      ],
      name: 'New Balance 740',
      category: 'Tenis para mujer',
      subcategory: 'zapatos',
      price: 115,
      currency: 'DIVISAS',
      description: 'Zapatilla retro con diseño clásico y comodidad moderna para el día a día.',
      isNew: true,
      variants: {
        sizes: ['35', '36', '37', '38', '39', '40']
      },
      technicalInfo: {
        'Material': 'Malla transpirable con overlays de cuero sintético',
        'Suela': 'EVA de alta densidad con goma exterior',
        'Tecnología': 'ABZORB amortiguación en el talón',
        'Tipo': 'Lifestyle / Training',
        'Cierre': 'Cordones'
      }
    },
    {
      id: 'shoe-003',
      image: 'zapatos png/ADIDAS GRAND COURT 2.0(2).png',
      colorImages: [
        { color: '#ffffff', name: 'Blanco', images: ['zapatos png/ADIDAS GRAND COURT 2.0(2).png', 'zapatos png/ADIDAS GRAND COURT 2.0(2).png'] }
      ],
      name: 'Adidas Grand Court 2.0',
      category: 'Tenis para mujer',
      subcategory: 'zapatos',
      price: 75,
      currency: 'DIVISAS',
      description: 'Estilo court clásico actualizado con materiales premium y comodidad diaria.',
      variants: {
        sizes: ['35', '36', '37', '38', '39', '40']
      },
      technicalInfo: {
        'Material': 'Cuero sintético y textil',
        'Suela': 'Goma vulcanizada',
        'Tecnología': 'Plantilla acolchada OrthoLite',
        'Tipo': 'Lifestyle / Court',
        'Cierre': 'Cordones'
      }
    },
    {
      id: 'cloth-002',
      image: 'ropapng/shortsadidas.png',
      name: 'Shorts Adidas',
      category: 'Ropa para mujer',
      subcategory: 'shorts',
      price: 20,
      currency: 'BCV',
      description: 'Shorts clásicos Adidas de tejido absorbente, máxima comodidad para tu día a día o entrenamiento.',
      isNew: true,
      variants: {
        sizes: ['S', 'M', 'L', 'XL']
      },
      technicalInfo: {
        'Material': 'Tejido AEROREADY que absorbe el sudor',
        'Ajuste': 'Regular con cintura elástica',
        'Detalles': 'Logo de Adidas y 3 bandas laterales',
        'Uso': 'Entrenamiento y running'
      }
    },
    {
      id: 'cloth-008',
      image: 'ropapng/shortestampadoblanco.png',
      name: 'Short Estampado Blanco',
      category: 'Ropa para mujer',
      subcategory: 'shorts',
      price: 18,
      currency: 'DIVISAS',
      description: 'Short con un estampado elegante y cómodo para hacer ejercicio.',
      isNew: true,
      variants: {
        sizes: ['XS', 'S', 'M', 'L']
      },
      technicalInfo: {
        'Material': 'Poliéster / Spandex elástico',
        'Ajuste': 'Ceñido al cuerpo (Compression fit)',
        'Diseño': 'Estampado floral blanco',
        'Uso': 'Yoga, pilates, gimnasio'
      }
    },
    {
      id: 'cloth-009',
      image: 'ropapng/shortgrismujer.png',
      name: 'Short Gris Deportivo',
      category: 'Ropa para mujer',
      subcategory: 'shorts',
      price: 15,
      currency: 'DIVISAS',
      description: 'Short básico gris, excelente para cualquier rutina de ejercicios.',
      isNew: false,
      variants: {
        sizes: ['XS', 'S', 'M', 'L']
      },
      technicalInfo: {
        'Material': 'Mezcla de algodón suave',
        'Cintura': 'Cintura elástica ancha para mayor soporte',
        'Largo': 'Corto por encima de la rodilla',
        'Uso': 'Casual y entrenamientos ligeros'
      }
    }
  ]
};
