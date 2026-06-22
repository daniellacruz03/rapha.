// ===== STATE MANAGEMENT =====
let currentCategory = 'supplements';
let cart = [];
let selectedVariants = {};
let calculatorStep = 0;
let calculatorData = {
  gender: null,
  age: null,
  weight: null,
  height: null,
  activity: null,
  goal: null
};

// ===== CATEGORY TITLES =====
const categoryTitles = {
  supplements: 'Suplementos',
  watches: 'Relojes',
  sportswear: 'Ropa Deportiva'
};

// ===== DOM ELEMENTS =====
const productsGrid = document.getElementById('products-grid');
const categoryTitle = document.getElementById('category-title');
const navTabs = document.querySelectorAll('.nav-tab');
const cartButtons = document.querySelectorAll('.cart-button');
const cartCounts = document.querySelectorAll('.cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose = document.getElementById('cart-close');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const goalCalculatorBtn = document.getElementById('goal-calculator-btn');
const calculatorOverlay = document.getElementById('calculator-overlay');
const calculatorModal = document.getElementById('calculator-modal');
const calculatorClose = document.getElementById('calculator-close');
const calculatorContent = document.getElementById('calculator-content');

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(currentCategory);
  setupEventListeners();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Navigation tabs
  if (navTabs) {
    navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.dataset.category;
        switchCategory(category);
      });
    });
  }

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
  if (searchButton) {
    searchButton.addEventListener('click', handleSearch);
  }

  // Cart sidebar
  if (cartButtons) {
    cartButtons.forEach(button => {
      button.addEventListener('click', openCart);
    });
  }
  if (cartClose) {
    cartClose.addEventListener('click', closeCart);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }

  // Goal Calculator
  if (goalCalculatorBtn) {
    goalCalculatorBtn.addEventListener('click', openCalculator);
  }
  if (calculatorClose) {
    calculatorClose.addEventListener('click', closeCalculator);
  }
  if (calculatorOverlay) {
    calculatorOverlay.addEventListener('click', closeCalculator);
  }
}

// ===== CATEGORY SWITCHING =====
function switchCategory(category) {
  currentCategory = category;
  
  // Update active tab
  navTabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.category === category) {
      tab.classList.add('active');
    }
  });

  // Update title
  categoryTitle.textContent = categoryTitles[category];

  // Clear search input
  searchInput.value = '';

  // Render products
  renderProducts(category);
}

// ===== SEARCH FUNCTIONALITY =====
function handleSearch() {
  const searchTerm = searchInput.value.trim();
  renderProducts(currentCategory, searchTerm);
}

// ===== RENDER PRODUCTS =====
function renderProducts(category, searchTerm = '') {
  let products = productsData[category];

  // Filter by search term if provided
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    products = products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  }
  
  if (!products || products.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-state">
        <h3>${searchTerm ? 'No se encontraron productos' : 'No hay productos disponibles'}</h3>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = products.map(product => createProductCard(product, category)).join('');
  
  // Add event listeners for variant selection
  setupVariantListeners();
  
  // Add event listeners for accordion
  setupAccordionListeners();
  
  // Add event listeners for add to cart buttons
  setupAddToCartListeners();
}

// ===== CREATE PRODUCT CARD =====
function createProductCard(product, category) {
  const variantSelectors = createVariantSelectors(product, category);
  const accordion = createAccordion(product);

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="image-placeholder"></div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        ${variantSelectors}
        <button class="add-to-cart-btn" data-product-id="${product.id}" disabled>
          Añadir al Carrito
        </button>
        ${accordion}
      </div>
    </article>
  `;
}

// ===== CREATE VARIANT SELECTORS =====
function createVariantSelectors(product, category) {
  if (!product.variants) return '';

  let selectors = '';
  
  // Initialize selected variants for this product
  if (!selectedVariants[product.id]) {
    selectedVariants[product.id] = {};
  }

  for (const [variantType, options] of Object.entries(product.variants)) {
    const label = getVariantLabel(variantType);
    selectors += `
      <div class="variant-selector">
        <span class="variant-label">${label}</span>
        <div class="variant-options" data-product-id="${product.id}" data-variant-type="${variantType}">
          ${options.map((option, index) => `
            <button class="variant-option ${index === 0 ? 'selected' : ''}" data-value="${option}">
              ${option}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    
    // Set default selection
    selectedVariants[product.id][variantType] = product.variants[variantType][0];
  }

  return selectors;
}

// ===== GET VARIANT LABEL =====
function getVariantLabel(variantType) {
  const labels = {
    flavors: 'Sabor',
    weights: 'Peso',
    sizes: 'Talla',
    colors: 'Color',
    models: 'Modelo'
  };
  return labels[variantType] || variantType;
}

// ===== SETUP VARIANT LISTENERS =====
function setupVariantListeners() {
  const variantOptions = document.querySelectorAll('.variant-option');
  
  variantOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      const productId = e.target.closest('.variant-options').dataset.productId;
      const variantType = e.target.closest('.variant-options').dataset.variantType;
      const value = e.target.dataset.value;
      
      // Update selection
      selectedVariants[productId][variantType] = value;
      
      // Update UI
      const container = e.target.closest('.variant-options');
      container.querySelectorAll('.variant-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      e.target.classList.add('selected');
      
      // Enable add to cart button if all variants are selected
      updateAddToCartButton(productId);
    });
  });
}

// ===== UPDATE ADD TO CART BUTTON =====
function updateAddToCartButton(productId) {
  const productCard = document.querySelector(`[data-product-id="${productId}"]`);
  const button = productCard.querySelector('.add-to-cart-btn');
  const variants = selectedVariants[productId];
  
  const allSelected = Object.keys(variants).length > 0 && 
                     Object.values(variants).every(v => v !== null && v !== undefined);
  
  button.disabled = !allSelected;
}

// ===== SETUP ADD TO CART LISTENERS =====
function setupAddToCartListeners() {
  const buttons = document.querySelectorAll('.add-to-cart-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = e.target.dataset.productId;
      addToCart(productId);
    });
  });
}

// ===== ADD TO CART =====
function addToCart(productId) {
  const product = findProductById(productId);
  if (!product) return;

  const variants = selectedVariants[productId];
  const variantString = formatVariants(variants);

  const cartItem = {
    id: productId,
    name: product.name,
    price: product.price,
    variants: variants,
    variantString: variantString,
    quantity: 1
  };

  cart.push(cartItem);
  updateCartUI();
  openCart();
}

// ===== FIND PRODUCT BY ID =====
function findProductById(productId) {
  for (const category of Object.keys(productsData)) {
    const product = productsData[category].find(p => p.id === productId);
    if (product) return product;
  }
  return null;
}

// ===== FORMAT VARIANTS =====
function formatVariants(variants) {
  return Object.entries(variants)
    .map(([key, value]) => `${getVariantLabel(key)}: ${value}`)
    .join(' | ');
}

// ===== UPDATE CART UI =====
function updateCartUI() {
  // Update cart count
  cartCounts.forEach(count => {
    count.textContent = cart.length;
  });

  // Update cart items
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>';
  } else {
    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <div class="cart-item-image"></div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-variants">${item.variantString}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <button class="cart-item-remove" data-index="${index}">Eliminar</button>
        </div>
      </div>
    `).join('');

    // Add remove listeners
    document.querySelectorAll('.cart-item-remove').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        removeFromCart(index);
      });
    });
  }

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// ===== REMOVE FROM CART =====
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// ===== OPEN CART =====
function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ===== CLOSE CART =====
function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== CREATE ACCORDION =====
function createAccordion(product) {
  if (!product.technicalInfo) return '';

  const items = Object.entries(product.technicalInfo).map(([label, value]) => `
    <div class="accordion-item">
      <button class="accordion-header">
        <span>${label}</span>
        <span class="accordion-icon">▼</span>
      </button>
      <div class="accordion-content">
        <div class="accordion-body">
          <p><span class="accordion-label">${label}:</span> ${value}</p>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="accordion">
      ${items}
    </div>
  `;
}

// ===== SETUP ACCORDION LISTENERS =====
function setupAccordionListeners() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
      const item = e.target.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      
      // Close all items in the same accordion
      const accordion = item.closest('.accordion');
      accordion.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
      });
      
      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// ===== GOAL CALCULATOR =====
function openCalculator() {
  console.log('Opening calculator');
  calculatorOverlay.classList.add('open');
  calculatorModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  calculatorStep = 0;
  calculatorData = {
    gender: null,
    age: null,
    weight: null,
    height: null,
    activity: null,
    goal: null
  };
  renderCalculatorStep();
}

function closeCalculator() {
  calculatorOverlay.classList.remove('open');
  calculatorModal.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCalculatorStep() {
  const steps = [
    renderGenderStep,
    renderAgeStep,
    renderWeightStep,
    renderHeightStep,
    renderActivityStep,
    renderGoalStep,
    renderResultsStep
  ];

  const stepHTML = steps[calculatorStep]();
  console.log('Rendering step:', calculatorStep);
  console.log('Step HTML:', stepHTML);
  calculatorContent.innerHTML = stepHTML;
  updateProgressIndicator();
  setupCalculatorStepListeners();
}

function updateProgressIndicator() {
  const totalSteps = 6;
  const progressHTML = Array.from({ length: totalSteps }, (_, i) => 
    `<div class="progress-dot ${i === calculatorStep ? 'active' : ''} ${i < calculatorStep ? 'completed' : ''}"></div>`
  ).join('');
  
  const currentContent = calculatorContent.innerHTML;
  calculatorContent.innerHTML = progressHTML + currentContent;
}

function renderGenderStep() {
  const html = `
    <div class="calculator-step active">
      <h3 class="step-title">¿Cuál es tu género?</h3>
      <p class="step-description">Selecciona tu género para calcular tus necesidades calóricas.</p>
      <div class="option-buttons">
        <button class="option-button" data-value="male" data-field="gender">Masculino</button>
        <button class="option-button" data-value="female" data-field="gender">Femenino</button>
      </div>
      <div class="step-navigation">
        <button class="step-button" disabled>Anterior</button>
        <button class="step-button primary" id="next-step" disabled>Siguiente</button>
      </div>
    </div>
  `;
  console.log('Gender step HTML:', html);
  return html;
}

function renderAgeStep() {
  return `
    <div class="calculator-step active">
      <h3 class="step-title">¿Cuál es tu edad?</h3>
      <p class="step-description">Ingresa tu edad en años.</p>
      <div class="form-group">
        <label class="form-label">Edad (años)</label>
        <input type="number" class="form-input" id="age-input" placeholder="Ej: 25" min="1" max="120">
      </div>
      <div class="step-navigation">
        <button class="step-button" id="prev-step">Anterior</button>
        <button class="step-button primary" id="next-step" disabled>Siguiente</button>
      </div>
    </div>
  `;
}

function renderWeightStep() {
  return `
    <div class="calculator-step active">
      <h3 class="step-title">¿Cuál es tu peso?</h3>
      <p class="step-description">Ingresa tu peso en kilogramos.</p>
      <div class="form-group">
        <label class="form-label">Peso (kg)</label>
        <input type="number" class="form-input" id="weight-input" placeholder="Ej: 70" min="30" max="200">
      </div>
      <div class="step-navigation">
        <button class="step-button" id="prev-step">Anterior</button>
        <button class="step-button primary" id="next-step" disabled>Siguiente</button>
      </div>
    </div>
  `;
}

function renderHeightStep() {
  return `
    <div class="calculator-step active">
      <h3 class="step-title">¿Cuál es tu estatura?</h3>
      <p class="step-description">Ingresa tu estatura en centímetros.</p>
      <div class="form-group">
        <label class="form-label">Estatura (cm)</label>
        <input type="number" class="form-input" id="height-input" placeholder="Ej: 175" min="100" max="250">
      </div>
      <div class="step-navigation">
        <button class="step-button" id="prev-step">Anterior</button>
        <button class="step-button primary" id="next-step" disabled>Siguiente</button>
      </div>
    </div>
  `;
}

function renderActivityStep() {
  return `
    <div class="calculator-step active">
      <h3 class="step-title">¿Cuál es tu nivel de actividad?</h3>
      <p class="step-description">Selecciona tu nivel de actividad física regular.</p>
      <div class="option-buttons">
        <button class="option-button" data-value="sedentary" data-field="activity">Sedentario</button>
        <button class="option-button" data-value="moderate" data-field="activity">Moderado</button>
        <button class="option-button" data-value="intense" data-field="activity">Intenso</button>
      </div>
      <div class="step-navigation">
        <button class="step-button" id="prev-step">Anterior</button>
        <button class="step-button primary" id="next-step" disabled>Siguiente</button>
      </div>
    </div>
  `;
}

function renderGoalStep() {
  return `
    <div class="calculator-step active">
      <h3 class="step-title">¿Cuál es tu objetivo?</h3>
      <p class="step-description">Selecciona tu objetivo principal para personalizar tu recomendación.</p>
      <div class="option-buttons">
        <button class="option-button" data-value="muscle" data-field="goal">Ganar Músculo</button>
        <button class="option-button" data-value="definition" data-field="goal">Definición</button>
        <button class="option-button" data-value="wellness" data-field="goal">Salud y Bienestar</button>
      </div>
      <div class="step-navigation">
        <button class="step-button" id="prev-step">Anterior</button>
        <button class="step-button primary" id="next-step" disabled>Calcular</button>
      </div>
    </div>
  `;
}

function renderResultsStep() {
  const results = calculateResults();
  const recommendations = getRecommendations(results.goal);
  
  return `
    <div class="calculator-step active">
      <h3 class="step-title">Tu Plan Personalizado</h3>
      
      <div class="results-banner">
        <h3>Tu dosis diaria personalizada de Creatina</h3>
        <div class="creatine-dose">${results.creatineDose}g</div>
        <div class="calories">Calorías diarias recomendadas: ${Math.round(results.tdee)}</div>
      </div>
      
      <div class="results-section">
        <h3>Kit Sugerido</h3>
        <div class="kit-products">
          ${recommendations.map(product => `
            <div class="kit-product">
              <div class="kit-product-name">${product.name}</div>
              <div class="kit-product-price">$${product.price.toFixed(2)}</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <button class="add-kit-button" id="add-kit-to-cart">Añadir Kit Completo al Carrito</button>
      
      <div class="step-navigation">
        <button class="step-button" id="prev-step">Volver</button>
        <button class="step-button primary" id="restart-calculator">Reiniciar</button>
      </div>
    </div>
  `;
}

function setupCalculatorStepListeners() {
  console.log('Setting up calculator step listeners');
  
  // Option buttons
  const optionButtons = calculatorContent.querySelectorAll('.option-button');
  console.log('Found option buttons:', optionButtons.length);
  
  optionButtons.forEach((button, index) => {
    console.log(`Adding click listener to button ${index}:`, button);
    console.log('Button pointer-events:', window.getComputedStyle(button).pointerEvents);
    console.log('Button z-index:', window.getComputedStyle(button).zIndex);
    
    button.addEventListener('click', (e) => {
      console.log('Option button clicked:', e.target.dataset.field, e.target.dataset.value);
      console.log('Event target:', e.target);
      console.log('Current target:', e.currentTarget);
      
      const field = e.currentTarget.dataset.field;
      const value = e.currentTarget.dataset.value;
      
      calculatorData[field] = value;
      console.log('Calculator data updated:', calculatorData);
      
      // Update UI
      const container = e.currentTarget.closest('.option-buttons');
      container.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('selected');
      });
      e.currentTarget.classList.add('selected');
      
      // Enable next button
      const nextButton = calculatorContent.querySelector('#next-step');
      console.log('Next button found:', !!nextButton);
      if (nextButton) {
        nextButton.disabled = false;
        console.log('Next button enabled');
      }
    });
    
    // Also try mousedown as fallback
    button.addEventListener('mousedown', (e) => {
      console.log('Mousedown detected on button');
    });
    
    // Try pointerdown as additional fallback
    button.addEventListener('pointerdown', (e) => {
      console.log('Pointerdown detected on button');
    });
  });

  // Input fields
  const ageInput = calculatorContent.querySelector('#age-input');
  const weightInput = calculatorContent.querySelector('#weight-input');
  const heightInput = calculatorContent.querySelector('#height-input');
  
  if (ageInput) {
    ageInput.addEventListener('input', (e) => {
      calculatorData.age = parseInt(e.target.value);
      const nextButton = calculatorContent.querySelector('#next-step');
      if (nextButton) nextButton.disabled = !calculatorData.age || calculatorData.age < 1;
    });
  }
  
  if (weightInput) {
    weightInput.addEventListener('input', (e) => {
      calculatorData.weight = parseFloat(e.target.value);
      const nextButton = calculatorContent.querySelector('#next-step');
      if (nextButton) nextButton.disabled = !calculatorData.weight || calculatorData.weight < 30;
    });
  }
  
  if (heightInput) {
    heightInput.addEventListener('input', (e) => {
      calculatorData.height = parseInt(e.target.value);
      const nextButton = calculatorContent.querySelector('#next-step');
      if (nextButton) nextButton.disabled = !calculatorData.height || calculatorData.height < 100;
    });
  }

  // Navigation buttons
  const prevButton = calculatorContent.querySelector('#prev-step');
  const nextButton = calculatorContent.querySelector('#next-step');
  const restartButton = calculatorContent.querySelector('#restart-calculator');
  const addKitButton = calculatorContent.querySelector('#add-kit-to-cart');
  
  console.log('Navigation buttons found:', { prev: !!prevButton, next: !!nextButton, restart: !!restartButton, addKit: !!addKitButton });
  
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (calculatorStep > 0) {
        calculatorStep--;
        renderCalculatorStep();
      }
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      console.log('Next button clicked, current step:', calculatorStep);
      if (calculatorStep < 6) {
        calculatorStep++;
        renderCalculatorStep();
      }
    });
  }
  
  if (restartButton) {
    restartButton.addEventListener('click', () => {
      calculatorStep = 0;
      calculatorData = {
        gender: null,
        age: null,
        weight: null,
        height: null,
        activity: null,
        goal: null
      };
      renderCalculatorStep();
    });
  }
  
  if (addKitButton) {
    addKitButton.addEventListener('click', () => {
      addKitToCart();
    });
  }
  
  console.log('Calculator step listeners setup complete');
}

function calculateResults() {
  // Mifflin-St Jeor Formula for BMR
  let bmr;
  if (calculatorData.gender === 'male') {
    bmr = 10 * calculatorData.weight + 6.25 * calculatorData.height - 5 * calculatorData.age + 5;
  } else {
    bmr = 10 * calculatorData.weight + 6.25 * calculatorData.height - 5 * calculatorData.age - 161;
  }

  // TDEE based on activity level
  const activityMultipliers = {
    sedentary: 1.2,
    moderate: 1.55,
    intense: 1.725
  };
  
  const tdee = bmr * activityMultipliers[calculatorData.activity];
  
  // Creatine dosage: weight * 0.1
  const creatineDose = (calculatorData.weight * 0.1).toFixed(1);
  
  return {
    bmr,
    tdee,
    creatineDose,
    goal: calculatorData.goal
  };
}

function getRecommendations(goal) {
  const recommendations = {
    muscle: [
      { id: 'supp-005', name: 'Whey Protein Nutricost', price: 49.99 },
      { id: 'supp-006', name: 'Whey Protein Muscletech', price: 59.99 },
      { id: 'supp-003', name: 'Creatina Muscletech', price: 44.99 },
      { id: 'supp-001', name: 'Creatina Nutrex', price: 39.99 },
      { id: 'supp-014', name: 'Mantequilla de Maní Jif', price: 8.99 }
    ],
    definition: [
      { id: 'supp-008', name: 'Whey Protein Isolate', price: 69.99 },
      { id: 'supp-007', name: 'Whey Protein Sixstar', price: 39.99 },
      { id: 'supp-002', name: 'Creatina Healthy Foods', price: 29.99 },
      { id: 'supp-004', name: 'Creatina Orgain', price: 34.99 },
      { id: 'supp-010', name: 'Magnesio Kirkland', price: 24.99 }
    ],
    wellness: [
      { id: 'supp-008', name: 'Whey Protein Isolate', price: 69.99 },
      { id: 'supp-011', name: 'Vitaminas A, C, D3, E, B12 - People Choice', price: 29.99 },
      { id: 'supp-012', name: 'Multivitamínico Nature Bounty', price: 34.99 },
      { id: 'supp-013', name: 'Multivitamínico Kirkland', price: 19.99 },
      { id: 'supp-009', name: 'Magnesio Nature Bounty', price: 19.99 },
      { id: 'supp-015', name: 'Biotina y Ácido Hialurónico Nature Bounty', price: 24.99 }
    ]
  };

  return recommendations[goal] || [];
}

function addKitToCart() {
  const recommendations = getRecommendations(calculatorData.goal);
  
  recommendations.forEach(rec => {
    const product = findProductById(rec.id);
    if (product) {
      const variants = getFirstVariants(product);
      const variantString = formatVariants(variants);
      
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        variants: variants,
        variantString: variantString,
        quantity: 1
      };
      
      cart.push(cartItem);
    }
  });
  
  updateCartUI();
  closeCalculator();
  openCart();
}

function getFirstVariants(product) {
  const variants = {};
  if (product.variants) {
    for (const [key, options] of Object.entries(product.variants)) {
      variants[key] = options[0];
    }
  }
  return variants;
}
