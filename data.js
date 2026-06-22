const productsData = {
  supplements: [
    {
      id: 'supp-001',
      name: 'Creatina Nutrex',
      price: 39.99,
      description: 'Creatina monohidratada de alta pureza para máximo rendimiento.',
      variants: {
        flavors: ['Sin sabor'],
        weights: ['300g', '600g']
      },
      technicalInfo: {
        'Datos Nutricionales': 'Creatina: 5g por servings | Pureza: 99.9%',
        'Ingredientes': 'Creatina Monohidratada',
        'Tamaño de Porción': '1 cucharadita (5g)',
        'Porciones por Envase': '60 (300g), 120 (600g)'
      }
    },
    {
      id: 'supp-002',
      name: 'Creatina Healthy Foods',
      price: 29.99,
      description: 'Creatina pura para fuerza y potencia muscular.',
      variants: {
        flavors: ['Sin sabor'],
        weights: ['250g', '500g']
      },
      technicalInfo: {
        'Datos Nutricionales': 'Creatina: 5g por servings | Pureza: 99.5%',
        'Ingredientes': 'Creatina Monohidratada',
        'Tamaño de Porción': '1 cucharadita (5g)',
        'Porciones por Envase': '50 (250g), 100 (500g)'
      }
    },
    {
      id: 'supp-003',
      name: 'Creatina Muscletech',
      price: 44.99,
      description: 'Creatina de última generación para atletas de alto rendimiento.',
      variants: {
        flavors: ['Sin sabor', 'Fruta'],
        weights: ['400g', '800g']
      },
      technicalInfo: {
        'Datos Nutricionales': 'Creatina: 5g por servings | Pureza: 99.9%',
        'Ingredientes': 'Creatina Monohidratada, Sabores Naturales',
        'Tamaño de Porción': '1 cucharadita (5g)',
        'Porciones por Envase': '80 (400g), 160 (800g)'
      }
    },
    {
      id: 'supp-004',
      name: 'Creatina Orgain',
      price: 34.99,
      description: 'Creatina orgánica certificada para recuperación muscular natural.',
      variants: {
        flavors: ['Sin sabor'],
        weights: ['300g']
      },
      technicalInfo: {
        'Datos Nutricionales': 'Creatina: 5g por servings | Orgánica: Certificada',
        'Ingredientes': 'Creatina Monohidratada Orgánica',
        'Tamaño de Porción': '1 cucharadita (5g)',
        'Porciones por Envase': '60 (300g)'
      }
    },
    {
      id: 'supp-005',
      name: 'Whey Protein Nutricost',
      price: 49.99,
      description: 'Proteína de suero de alta calidad para desarrollo muscular.',
      variants: {
        flavors: ['Chocolate', 'Vainilla', 'Fresa'],
        weights: ['2 lb', '5 lb']
      },
      technicalInfo: {
        'Datos Nutricionales': 'Proteína: 25g por servings | Carbohidratos: 3g | Grasa: 1g | Calorías: 120',
        'Ingredientes': 'Proteína Concentrada de Suero, Sabores Naturales, Estevia',
        'Tamaño de Porción': '1 scoop (30g)',
        'Porciones por Envase': '30 (2 lb), 75 (5 lb)'
      }
    },
    {
      id: 'supp-006',
      name: 'Whey Protein Muscletech',
      price: 59.99,
      description: 'Proteína premium con tecnología avanzada de absorción.',
      variants: {
        flavors: ['Chocolate', 'Vainilla', 'Cookies & Cream'],
        weights: ['2 lb', '5 lb']
      },
      technicalInfo: {
        'Datos Nutricionales': 'Proteína: 30g por servings | Carbohidratos: 2g | Grasa: 1g | Calorías: 140',
        'Ingredientes:': 'Proteína Aislada de Suero, Sabores Naturales, Lecitina',
        'Tamaño de Porción': '1 scoop (33g)',
        'Porciones por Envase': '27 (2 lb), 68 (5 lb)'
      }
    },
    {
      id: 'supp-007',
      name: 'Whey Protein Sixstar',
      price: 39.99,
      description: 'Proteína de suero concentrada para recuperación rápida.',
      variants: {
        flavors: ['Chocolate', 'Vainilla'],
        weights: ['2 lb']
      },
      technicalInfo: {
        'Datos Nutricionales': 'Proteína: 20g por servings | Carbohidratos: 4g | Grasa: 1.5g | Calorías: 110',
        'Ingredientes': 'Proteína Concentrada de Suero, Sabores Naturales',
        'Tamaño de Porción': '1 scoop (28g)',
        'Porciones por Envase': '32 (2 lb)'
      }
    },
    {
      id: 'supp-008',
      name: 'Whey Protein Isolate',
      price: 69.99,
      description: 'Proteína aislada de máxima pureza para absorción rápida.',
      variants: {
        flavors: ['Chocolate', 'Vainilla', 'Fresa'],
        weights: ['2 lb', '5 lb']
      },
      technicalInfo: {
        'Datos Nutricionales': 'Proteína: 28g por servings | Carbohidratos: 1g | Grasa: 0.5g | Calorías: 120',
        'Ingredientes': 'Proteína Aislada de Suero, Sabores Naturales, Estevia',
        'Tamaño de Porción': '1 scoop (32g)',
        'Porciones por Envase': '28 (2 lb), 70 (5 lb)'
      }
    },
    {
      id: 'supp-009',
      name: 'Magnesio Nature Bounty',
      price: 19.99,
      description: 'Suplemento de magnesio para salud muscular y nerviosa.',
      variants: {
        flavors: ['Sin sabor'],
        weights: ['100 tabletas', '200 tabletas']
      },
      technicalInfo: {
        'Datos Nutricionales': 'Magnesio: 400mg por servings | Tipo: Óxido de Magnesio',
        'Ingredientes': 'Óxido de Magnesio, Celulosa Vegetal',
        'Tamaño de Porción': '1 tableta',
        'Porciones por Envase': '100 (100 tabletas), 200 (200 tabletas)'
      }
    },
    {
      id: 'supp-010',
      name: 'Magnesio Kirkland',
      price: 24.99,
      description: 'Magnesio de alta calidad a precio accesible.',
      variants: {
        flavors: ['Sin sabor'],
        weights: ['500 tabletas']
      },
      technicalInfo: {
        'Datos Nutricionales': 'Magnesio: 500mg por servings | Tipo: Óxido de Magnesio',
        'Ingredientes': 'Óxido de Magnesio, Celulosa Vegetal',
        'Tamaño de Porción': '1 tableta',
        'Porciones por Envase': '500 (500 tabletas)'
      }
    },
    {
      id: 'supp-011',
      name: 'Vitaminas A, C, D3, E, B12 - People Choice',
      price: 29.99,
      description: 'Multivitamínico completo con vitaminas esenciales.',
      variants: {
        flavors: ['Sin sabor'],
        weights: ['60 cápsulas', '120 cápsulas']
      },
      technicalInfo: {
        'Datos Nutricionales': 'Vitamina A: 5000 IU | Vitamina C: 500mg | Vitamina D3: 2000 IU | Vitamina E: 30 IU | B12: 500mcg',
        'Ingredientes': 'Vitaminas A, C, D3, E, B12, Cápsula de Gelatina',
        'Tamaño de Porción': '1 cápsula',
        'Porciones por Envase': '60 (60 cápsulas), 120 (120 cápsulas)'
      }
    },
    {
      id: 'supp-012',
      name: 'Multivitamínico Nature Bounty',
      price: 34.99,
      description: 'Fórmula completa de vitaminas y minerales esenciales.',
      variants: {
        flavors: ['Sin sabor'],
        weights: ['100 tabletas', '200 tabletas']
      },
      technicalInfo: {
        'Datos Nutricionales': '25 vitaminas y minerales esenciales | 100% valor diario',
        'Ingredientes': 'Vitaminas A, C, D, E, K, B-Complex, Zinc, Magnesio',
        'Tamaño de Porción': '1 tableta',
        'Porciones por Envase': '100 (100 tabletas), 200 (200 tabletas)'
      }
    },
    {
      id: 'supp-013',
      name: 'Multivitamínico Kirkland',
      price: 19.99,
      description: 'Multivitamínico de alta calidad a precio competitivo.',
      variants: {
        flavors: ['Sin sabor'],
        weights: ['500 tabletas']
      },
      technicalInfo: {
        'Datos Nutricionales': 'Vitaminas A, C, D, E, K, B-Complex, Zinc, Hierro',
        'Ingredientes': 'Complejo Multivitamínico, Minerales',
        'Tamaño de Porción': '1 tableta',
        'Porciones por Envase': '500 (500 tabletas)'
      }
    },
    {
      id: 'supp-014',
      name: 'Mantequilla de Maní Jif',
      price: 8.99,
      description: 'Mantequilla de maní cremosa natural rica en proteínas.',
      variants: {
        flavors: ['Cremosa', 'Crujiente'],
        weights: ['16 oz', '28 oz', '40 oz']
      },
      technicalInfo: {
        'Datos Nutricionales': 'Proteína: 8g por servings | Grasa: 16g | Carbohidratos: 6g | Calorías: 190',
        'Ingredientes': 'Cacahuates tostados, Sal, Azúcar (solo versión regular)',
        'Tamaño de Porción': '2 cucharadas (32g)',
        'Porciones por Envase': '14 (16 oz), 25 (28 oz), 35 (40 oz)'
      }
    },
    {
      id: 'supp-015',
      name: 'Biotina y Ácido Hialurónico Nature Bounty',
      price: 24.99,
      description: 'Suplemento para piel, cabello y uñas con biotina y ácido hialurónico.',
      variants: {
        flavors: ['Sin sabor'],
        weights: ['60 cápsulas', '120 cápsulas']
      },
      technicalInfo: {
        'Datos Nutricionales': 'Biotina: 5000mcg | Ácido Hialurónico: 100mg',
        'Ingredientes': 'Biotina, Ácido Hialurónico, Celulosa Vegetal, Cápsula de Gelatina',
        'Tamaño de Porción': '1 cápsula',
        'Porciones por Envase': '60 (60 cápsulas), 120 (120 cápsulas)'
      }
    }
  ],
  watches: [
    {
      id: 'watch-001',
      name: 'Chronograph Elite',
      price: 299.99,
      description: 'Precision chronograph with sapphire crystal and automatic movement.',
      variants: {
        models: ['Black Dial', 'Silver Dial', 'Blue Dial']
      },
      technicalInfo: {
        'Movement': 'Automatic Swiss Movement',
        'Case Material': '316L Stainless Steel',
        'Water Resistance': '100m (10 ATM)',
        'Crystal': 'Sapphire Crystal with Anti-Reflective Coating',
        'Strap': 'Genuine Leather or Stainless Steel Bracelet'
      }
    },
    {
      id: 'watch-002',
      name: 'Minimalist Pro',
      price: 189.99,
      description: 'Ultra-thin minimalist design with Japanese quartz movement.',
      variants: {
        models: ['Matte Black', 'Rose Gold', 'Silver']
      },
      technicalInfo: {
        'Movement': 'Japanese Quartz',
        'Case Material': 'Titanium',
        'Water Resistance': '50m (5 ATM)',
        'Crystal': 'Mineral Crystal',
        'Strap': 'Mesh Stainless Steel'
      }
    }
  ],
  sportswear: [
    {
      id: 'sport-001',
      name: 'Performance Training Tee',
      price: 45.99,
      description: 'Moisture-wicking performance tee with anti-odor technology.',
      variants: {
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Gray', 'Navy']
      },
      technicalInfo: {
        'Material': '88% Polyester, 12% Elastane',
        'Technology': 'Moisture-wicking, Anti-odor, UPF 50+',
        'Fit': 'Athletic Fit',
        'Care': 'Machine wash cold, tumble dry low'
      }
    },
    {
      id: 'sport-002',
      name: 'Compression Leggings',
      price: 65.99,
      description: 'High-compression leggings for enhanced performance and recovery.',
      variants: {
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Black', 'Charcoal', 'Midnight Blue']
      },
      technicalInfo: {
        'Material': '82% Nylon, 18% Spandex',
        'Technology': '4-way stretch, Compression, Moisture-wicking',
        'Fit': 'Compression Fit',
        'Care': 'Machine wash cold, hang dry'
      }
    }
  ]
};
