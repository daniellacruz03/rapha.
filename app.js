// ===== STATE MANAGEMENT =====
let currentCategory = null;
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
  vitamins: 'Vitaminas',
  men: 'Hombres',
  women: 'Mujeres'
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
  if (categoryTitle) categoryTitle.textContent = '';
  if (navTabs) navTabs.forEach(tab => tab.classList.remove('active'));
  renderProducts(currentCategory);
  setupEventListeners();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Logos - redirect to home
  const logos = document.querySelectorAll('.logo');
  logos.forEach(logo => {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
      window.location.reload();
    });
  });

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

  // Sidebar filters
  const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
  filterCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      renderProducts(currentCategory, searchInput ? searchInput.value.trim() : '');
    });
  });

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

// ===== DYNAMIC FILTERS =====
function renderFilters(category) {
  const dynamicFilters = document.getElementById('dynamic-filters');
  if (!dynamicFilters) return;

  if (category === 'men' || category === 'women') {
    dynamicFilters.innerHTML = `
      <div class="filter-group">
        <h4 class="filter-group-title">Subcategorías</h4>
        <ul class="filter-list">
          <li><label><input type="checkbox" class="filter-checkbox" data-type="subcategory" value="zapatos"> Zapatos</label></li>
          <li><label><input type="checkbox" class="filter-checkbox" data-type="subcategory" value="shorts"> Shorts</label></li>
          <li><label><input type="checkbox" class="filter-checkbox" data-type="subcategory" value="franelas"> Franelas</label></li>
          <li><label><input type="checkbox" class="filter-checkbox" data-type="subcategory" value="camisas"> Camisas</label></li>
          <li><label><input type="checkbox" class="filter-checkbox" data-type="subcategory" value="sudaderas"> Sudaderas</label></li>
          <li><label><input type="checkbox" class="filter-checkbox" data-type="subcategory" value="accesorios"> Accesorios</label></li>
        </ul>
      </div>
    `;
  } else {
    dynamicFilters.innerHTML = '';
  }

  // Bind change events to new dynamically created checkboxes
  const newCheckboxes = dynamicFilters.querySelectorAll('.filter-checkbox');
  newCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      renderProducts(currentCategory, searchInput ? searchInput.value.trim() : '');
    });
  });
}

// ===== CATEGORY SWITCHING =====
function switchCategory(category) {
  currentCategory = category;
  
  // Hide promotional posters and hero video when a category is selected
  const promotionalPosters = document.querySelector('.promotional-posters');
  if (promotionalPosters) {
    promotionalPosters.style.display = 'none';
  }
  const heroSection = document.getElementById('hero-section');
  if (heroSection) {
    heroSection.style.display = 'none';
  }
  
  // Update active tab
  navTabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.category === category) {
      tab.classList.add('active');
    }
  });

  // Update title
  if (categoryTitle) {
    categoryTitle.textContent = categoryTitles[category];
  }

  // Render filters dynamically
  renderFilters(category);

  // Clear filters outside dynamic area (like Novedades)
  const staticCheckboxes = document.querySelectorAll('#sidebar-filters .filter-checkbox:not([data-type="subcategory"])');
  staticCheckboxes.forEach(cb => cb.checked = false);

  // Clear search input
  if (searchInput) searchInput.value = '';

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
  let products = [];
  
  if (!category) {
    // Show all products if no category is selected
    for (const cat in productsData) {
      const catProducts = productsData[cat].map(p => ({ ...p, _originalCategory: cat }));
      products = products.concat(catProducts);
    }
  } else {
    products = productsData[category].map(p => ({ ...p, _originalCategory: category }));
  }

  // Filter by search term if provided
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    products = products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      (product.description && product.description.toLowerCase().includes(term)) ||
      (product.category && product.category.toLowerCase().includes(term))
    );
  }

  // Filter by sidebar checkboxes
  const selectedCategories = Array.from(document.querySelectorAll('.filter-checkbox[data-type="category"]:checked')).map(cb => cb.value);
  const selectedSubcategories = Array.from(document.querySelectorAll('.filter-checkbox[data-type="subcategory"]:checked')).map(cb => cb.value);
  const isNewOnly = document.querySelector('.filter-checkbox[data-type="new"]')?.checked;

  if (selectedCategories.length > 0) {
    products = products.filter(p => {
      if (!p.category) return false;
      return selectedCategories.some(c => p.category.includes(c));
    });
  }

  if (selectedSubcategories.length > 0) {
    products = products.filter(p => {
      if (!p.subcategory) return false;
      return selectedSubcategories.some(c => p.subcategory === c);
    });
  }

  if (isNewOnly) {
    products = products.filter(p => p.isNew);
  }
  
  if (!products || products.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-state">
        <h3>${searchTerm ? 'No se encontraron productos' : 'No hay productos disponibles'}</h3>
      </div>
    `;
    return;
  }

  // Render all products for the category grid
  productsGrid.innerHTML = products.map(product => createProductCard(product, product._originalCategory)).join('');
  
  // Add event listeners for variant selection
  setupVariantListeners();
  
  // Add event listeners for product cards (to open modal)
  setupProductCardListeners();
  
  // Add event listeners for add to cart buttons
  setupAddToCartListeners();

  // Preload hover images to prevent loading delays
  preloadHoverImages(products);
}

// ===== PRELOAD HOVER IMAGES =====
function preloadHoverImages(products) {
  products.forEach(p => {
    if (p.colorImages && p.colorImages.length > 0) {
      p.colorImages.forEach(cImg => {
        if (cImg.images[1]) new Image().src = cImg.images[1];
      });
    }
  });
}

// ===== CREATE PRODUCT CARD =====
function createProductCard(product, category) {
  const variantSelectors = createVariantSelectors(product, category);
  // const accordion = createAccordion(product); // Removed for clean grid

  const currency = product.currency || 'BCV';
  const priceLabel = currency === 'DIVISAS' ? `$${product.price} USD` : `${product.price} BCV`;
  const currencyBadge = currency === 'DIVISAS'
    ? `<span class="currency-badge divisas">DIVISAS</span>`
    : `<span class="currency-badge bcv">BCV</span>`;

  let imageHtml = '';
  let colorThumbsHtml = '';
  
  if (product.colorImages && product.colorImages.length > 0) {
    const images = product.colorImages;
    let carouselImages = '';
    
    images.forEach((cImg, index) => {
      const img1 = cImg.images[0];
      const img2 = cImg.images[1] || img1;
      const isActive = index === 0 ? 'active' : '';
      
      carouselImages += `
        <div class="carousel-slide ${isActive}" data-color-index="${index}">
          <img src="${img1}" class="product-image carousel-base" decoding="async" fetchpriority="high">
          <img src="${img2}" class="product-image carousel-hover" decoding="async" fetchpriority="low">
        </div>
      `;
    });

    imageHtml = `
      <div class="image-wrapper carousel-wrapper" onmouseenter="this.classList.add('hovering')" onmouseleave="this.classList.remove('hovering')">
        ${carouselImages}
      </div>
    `;
    
    colorThumbsHtml = `
      <div class="product-colors-thumbs">
        ${images.map((cImg) => `
          <div 
            class="color-thumb" 
            style="background-color: ${cImg.color}; cursor: default;" 
            title="${cImg.name}"
          ></div>
        `).join('')}
      </div>
    `;
    
    if (product.variants && product.variants.colors) {
      const { colors, ...restVariants } = product.variants;
      product.variants = restVariants;
    }
  } else {
    imageHtml = product.image
      ? `<div class="image-wrapper"><img src="${product.image}" alt="${product.name}" class="product-image" decoding="async" fetchpriority="high"></div>`
      : `<div class="image-placeholder"></div>`;
  }

  const isNewHtml = product.isNew ? '<div class="product-is-new">Lo nuevo</div>' : '';
  const categoryHtml = product.category ? `<div class="product-category">${product.category}</div>` : '';

  return `
    <article class="product-card" data-product-id="${product.id}" data-category="${category}">
      ${imageHtml}
      <div class="product-info">
        ${isNewHtml}
        <h3 class="product-name">${product.name}</h3>
        ${categoryHtml}
        ${colorThumbsHtml}
        <div class="product-price">
          ${priceLabel}
        </div>
        ${variantSelectors}
        <button class="add-to-cart-btn" data-product-id="${product.id}">
          <span>Añadir al Carrito</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </button>
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

// ===== HANDLE COLOR THUMB HOVER =====
window.handleColorThumbHover = function(button, productId, index) {
  const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);
  if (!card) return;
  
  card.querySelectorAll('.color-thumb').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  
  card.querySelectorAll('.carousel-slide').forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
};

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
      const productId = e.currentTarget.dataset.productId;
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
    currency: product.currency || 'BCV',
    image: product.image,
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
  if (!variants || Object.keys(variants).length === 0) return '';
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
    cartItems.innerHTML = cart.map((item, index) => {
      const cur = item.currency || 'BCV';
      const priceDisplay = cur === 'DIVISAS' ? `$${item.price} USD` : `${item.price} BCV`;
      return `
        <div class="cart-item">
          <div class="cart-item-image">
            ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: contain;">` : ''}
          </div>
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-variants">${item.variantString}</div>
            <div class="cart-item-price">${priceDisplay}</div>
            <button class="cart-item-remove" data-index="${index}">Eliminar</button>
          </div>
        </div>
      `;
    }).join('');

    // Add remove listeners
    document.querySelectorAll('.cart-item-remove').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        removeFromCart(index);
      });
    });
  }

  // Update total (group by currency)
  const totalBCV = cart.filter(i => (i.currency || 'BCV') === 'BCV').reduce((sum, i) => sum + i.price, 0);
  const totalDivisas = cart.filter(i => i.currency === 'DIVISAS').reduce((sum, i) => sum + i.price, 0);
  let totalStr = '';
  if (totalBCV > 0) totalStr += `${totalBCV} BCV`;
  if (totalDivisas > 0) totalStr += (totalStr ? ' + ' : '') + `$${totalDivisas} USD`;
  cartTotal.textContent = totalStr || '0';
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

// ===== PRODUCT MODAL FUNCTIONS =====
function setupProductCardListeners() {
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Ignore if clicking on button, select, color-thumb, etc.
      if (e.target.closest('.add-to-cart-btn') || 
          e.target.closest('.variant-option') || 
          e.target.closest('.color-thumb') ||
          e.target.tagName.toLowerCase() === 'a') {
        return;
      }
      
      const productId = card.dataset.productId;
      openProductModal(productId);
    });
  });
}

function openProductModal(productId) {
  // Find product across all categories
  let product = null;
  for (const cat in productsData) {
    product = productsData[cat].find(p => p.id === productId);
    if (product) break;
  }
  
  if (!product) return;

  const modalOverlay = document.getElementById('product-modal-overlay');
  const modal = document.getElementById('product-modal');
  const content = document.getElementById('product-modal-content');
  
  if (!modal || !content) return;

  const currency = product.currency || 'BCV';
  const priceLabel = currency === 'DIVISAS' ? `$${product.price} USD` : `${product.price} BCV`;
  
  // Build tech info list
  let techInfoHtml = '';
  if (product.technicalInfo) {
    const techItems = Object.entries(product.technicalInfo).map(([label, value]) => `
      <li class="pm-tech-item">
        <span class="pm-tech-key">${label}</span>
        <span class="pm-tech-val">${value}</span>
      </li>
    `).join('');
    techInfoHtml = `
      <div class="pm-tech-info">
        <h4 class="pm-tech-title">Especificaciones</h4>
        <ul class="pm-tech-list">
          ${techItems}
        </ul>
      </div>
    `;
  }

  // Get image (use first color image if available)
  let imgUrl = product.image;
  if (product.colorImages && product.colorImages.length > 0) {
    imgUrl = product.colorImages[0].images[0];
  }

  content.innerHTML = `
    <div class="pm-image-col">
      <img src="${imgUrl}" alt="${product.name}">
    </div>
    <div class="pm-details-col">
      <h2 class="pm-title">${product.name}</h2>
      <div class="pm-price">${priceLabel}</div>
      ${product.description ? `<p class="pm-description">${product.description}</p>` : ''}
      ${techInfoHtml}
    </div>
  `;

  // Bind close buttons
  const closeBtn = document.getElementById('product-modal-close');
  closeBtn.onclick = closeProductModal;
  modalOverlay.onclick = closeProductModal;

  // Open modal
  modalOverlay.classList.add('active');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modalOverlay = document.getElementById('product-modal-overlay');
  const modal = document.getElementById('product-modal');
  
  if (modalOverlay && modal) {
    modalOverlay.classList.remove('active');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
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
          ${recommendations.map(product => {
            const cur = product.currency || 'BCV';
            const priceStr = cur === 'DIVISAS' ? `$${product.price} USD` : `${product.price} BCV`;
            return `
              <div class="kit-product">
                <div class="kit-product-name">${product.name}</div>
                <div class="kit-product-price">${priceStr}</div>
              </div>
            `;
          }).join('')}
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
      { id: 'supp-005', name: 'Whey Protein Nutricost', price: 75, currency: 'BCV' },
      { id: 'supp-006', name: 'Whey Protein Muscletech', price: 85, currency: 'BCV' },
      { id: 'supp-003', name: 'Creatina Muscletech', price: 45, currency: 'BCV' },
      { id: 'supp-001', name: 'Creatina Nutrex', price: 35, currency: 'BCV' },
      { id: 'supp-014', name: 'Mantequilla de Maní Jif', price: 25, currency: 'BCV' }
    ],
    definition: [
      { id: 'supp-008', name: 'Whey Protein Isolate', price: 85, currency: 'BCV' },
      { id: 'supp-007', name: 'Whey Protein Sixstar', price: 75, currency: 'BCV' },
      { id: 'supp-002', name: 'Creatina Healthy Foods', price: 35, currency: 'BCV' },
      { id: 'supp-004', name: 'Creatina Orgain', price: 50, currency: 'BCV' },
      { id: 'supp-010', name: 'Magnesio Kirkland', price: 55, currency: 'BCV' }
    ],
    wellness: [
      { id: 'supp-008', name: 'Whey Protein Isolate', price: 85, currency: 'BCV' },
      { id: 'supp-011', name: 'Vitaminas A, C, D3, E, B12 - People Choice', price: 5, currency: 'BCV' },
      { id: 'supp-010', name: 'Magnesio Kirkland', price: 55, currency: 'BCV' },
      { id: 'supp-015', name: 'Biotina y Ácido Hialurónico Nature Bounty', price: 55, currency: 'BCV' }
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

// ===== AETHER FLOW CANVAS BACKGROUND =====
function initAetherFlow() {
  const canvas = document.getElementById('aether-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let particles = [];
  const mouse = { x: null, y: null, radius: 200 };

  class Particle {
      constructor(x, y, directionX, directionY, size, color) {
          this.x = x;
          this.y = y;
          this.directionX = directionX;
          this.directionY = directionY;
          this.size = size;
          this.color = color;
      }

      draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
          ctx.fillStyle = this.color;
          ctx.fill();
      }

      update() {
          if (this.x > canvas.width || this.x < 0) {
              this.directionX = -this.directionX;
          }
          if (this.y > canvas.height || this.y < 0) {
              this.directionY = -this.directionY;
          }

          if (mouse.x !== null && mouse.y !== null) {
              let dx = mouse.x - this.x;
              let dy = mouse.y - this.y;
              let distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < mouse.radius + this.size) {
                  const forceDirectionX = dx / distance;
                  const forceDirectionY = dy / distance;
                  const force = (mouse.radius - distance) / mouse.radius;
                  this.x -= forceDirectionX * force * 5;
                  this.y -= forceDirectionY * force * 5;
              }
          }

          this.x += this.directionX;
          this.y += this.directionY;
          this.draw();
      }
  }

  function init() {
      particles = [];
      // Aseguramos un mínimo de 70 partículas para pantallas pequeñas
      let numberOfParticles = Math.max(70, (canvas.height * canvas.width) / 9000);
      for (let i = 0; i < numberOfParticles; i++) {
          let size = (Math.random() * 2) + 1;
          let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
          let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
          let directionX = (Math.random() * 0.4) - 0.2;
          let directionY = (Math.random() * 0.4) - 0.2;
          let color = 'rgba(0, 0, 0, 0.4)'; // Black particles
          particles.push(new Particle(x, y, directionX, directionY, size, color));
      }
  }

  let lastWidth = window.innerWidth;
  const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Solo reiniciamos las partículas si cambia el ancho (ej. rotar pantalla)
      // para evitar flickering cuando la barra de direcciones del móvil se oculta al scrollear
      if (window.innerWidth !== lastWidth || particles.length === 0) {
          lastWidth = window.innerWidth;
          init(); 
      }
  };
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
          for (let b = a; b < particles.length; b++) {
              let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                  + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
              
              // Aumentamos la distancia mínima de conexión en móviles
              let maxDistanceSq = Math.max(15000, (canvas.width / 7) * (canvas.height / 7));
              
              if (distance < maxDistanceSq) {
                  opacityValue = 1 - (distance / maxDistanceSq);
                  
                  let dx_mouse_a = particles[a].x - mouse.x;
                  let dy_mouse_a = particles[a].y - mouse.y;
                  let distance_mouse_a = Math.sqrt(dx_mouse_a*dx_mouse_a + dy_mouse_a*dy_mouse_a);

                  if (mouse.x && distance_mouse_a < mouse.radius) {
                       ctx.strokeStyle = `rgba(0, 0, 0, ${opacityValue})`;
                  } else {
                       ctx.strokeStyle = `rgba(0, 0, 0, ${opacityValue * 0.4})`;
                  }
                  
                  ctx.lineWidth = 1;
                  ctx.beginPath();
                  ctx.moveTo(particles[a].x, particles[a].y);
                  ctx.lineTo(particles[b].x, particles[b].y);
                  ctx.stroke();
              }
          }
      }
  };

  const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, innerWidth, innerHeight);

      for (let i = 0; i < particles.length; i++) {
          particles[i].update();
      }
      connect();
  };
  
  const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
  };
  
  const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseout', handleMouseOut);

  init();
  animate();
}

document.addEventListener('DOMContentLoaded', initAetherFlow);
