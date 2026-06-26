const productsData = {
  supplements: [
    {
      id: 'sup-001',
      image: 'suplementospng/creatinanutrex.png',
      name: 'Creatina Nutrex (60 Servicios)',
      price: 35,
      currency: 'BCV',
      description: 'Creatina Monohidratada pura para mejorar la fuerza y el rendimiento muscular.',
      isNew: true
    },
    {
      id: 'sup-002',
      image: 'suplementospng/creatinahealthyfoods.png',
      name: 'Creatina Healthy Foods (100 Servicios)',
      price: 35,
      currency: 'BCV',
      description: 'Creatina de alta pureza para mayor energía y desarrollo muscular.',
      isNew: false
    },
    {
      id: 'sup-003',
      image: 'suplementospng/creatinamuscletech.png',
      name: 'Creatina Muscletech (60 Servicios)',
      price: 45,
      currency: 'BCV',
      description: 'Fórmula avanzada de creatina Platinum 100% pure monohydrate.',
      isNew: true
    },
    {
      id: 'sup-004',
      image: 'suplementospng/creatinaorgain.png',
      name: 'Creatina Orgain (135 Servicios)',
      price: 50,
      currency: 'BCV',
      description: 'Creatina premium para máximo rendimiento deportivo.'
    },
    {
      id: 'sup-005',
      image: 'suplementospng/Nutricost-Whey-Protein.png',
      name: 'Whey Protein Nutricost',
      price: 75,
      currency: 'BCV',
      description: 'Proteína de suero de leche de rápida absorción.'
    },
    {
      id: 'sup-006',
      image: 'suplementospng/Wey_protein_Muscletech.png',
      name: 'Whey Protein Muscletech',
      price: 85,
      currency: 'BCV',
      description: 'Proteína premium con péptidos de suero para una rápida recuperación.'
    },
    {
      id: 'sup-007',
      image: 'suplementospng/Six-Star-Pro-Nutrition-100-Whey-Protein-Powder-Plus-30g-Protein-Triple-Chocolate-.png',
      name: 'Whey Protein Sixstar',
      price: 75,
      currency: 'BCV',
      description: 'Proteína 100% de suero diseñada para potenciar la recuperación.'
    },

    {
      id: 'sup-011',
      image: 'suplementospng/mantequillademanijif-removebg-preview.png',
      name: 'Mantequilla de maní Jif',
      price: 25,
      currency: 'BCV',
      description: 'Mantequilla de maní cremosa, excelente fuente de proteína.'
    },
  ],
  vitamins: [
    {
      id: 'sup-009',
      image: 'suplementospng/naturemagnesium.png',
      name: 'Magnesio Kirkland',
      price: 55,
      currency: 'BCV',
      description: 'Suplemento mineral esencial para la salud ósea y muscular.'
    },
    {
      id: 'sup-012',
      image: 'suplementospng/naturesbounty.png',
      name: 'Biotina y Ácido Hialurónico Nature Bounty',
      price: 55,
      currency: 'BCV',
      description: 'Fórmula para el cuidado de la piel, cabello y uñas.'
    }
  ],
  men: [
    {
      id: 'shoe-002',
      image: 'zapatos png/ADIDAS CLOUD WHITE FOAM.png',
      name: 'Adidas Cloud White Foam',
      category: 'Tenis para hombre',
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
      price: 15,
      currency: 'BCV',
      description: 'Short deportivo DSG ligero y transpirable, ideal para entrenamientos y running.',
      isNew: true,
      variants: {
        sizes: ['S', 'M', 'L']
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
      price: 20,
      currency: 'BCV',
      description: 'Shorts clásicos Adidas de tejido absorbente, máxima comodidad para tu día a día o entrenamiento.',
      isNew: true,
      variants: {
        sizes: ['S', 'M', 'L', 'XL']
      }
    }
  ]
};
