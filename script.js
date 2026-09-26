window.addEventListener('load', () => {
  document.body.classList.add('loading');
 
  const loader = document.getElementById('loader');
 
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    initReveal();
  }, 2000);
});
  

/* =========================================
   3. NAVBAR — SCROLL BEHAVIOR
   ========================================= */
const navbar = document.getElementById('navbar');
 
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
 
  // Scroll-to-top button
  const scrollTopBtn = document.getElementById('scrollTop');
  if (window.scrollY > 600) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});
 
 
/* =========================================
   4. HAMBURGER / MOBILE MENU
   ========================================= */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;
 
hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
 
  // Animate hamburger bars
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 4px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -4px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});
 
// Close mobile menu on link click
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => s.style = '');
  });
});
 
 
/* =========================================
   5. SCROLL REVEAL
   ========================================= */
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });
 
  revealEls.forEach(el => observer.observe(el));
}
 
 
/* =========================================
   6. TESTIMONIALS SLIDER
   ========================================= */
const testCards = document.querySelectorAll('.test-card');
const dots = document.querySelectorAll('.dot');
let currentTest = 0;
let testTimer;
 
function showTestimonial(index) {
  testCards.forEach(c => c.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  testCards[index].classList.add('active');
  dots[index].classList.add('active');
  currentTest = index;
}
 
function nextTestimonial() {
  const next = (currentTest + 1) % testCards.length;
  showTestimonial(next);
}
 
// Auto-play
function startTestSlider() {
  testTimer = setInterval(nextTestimonial, 4500);
}
 
startTestSlider();
 
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(testTimer);
    showTestimonial(i);
    startTestSlider();
  });
});
 
 
/* =========================================
   7. WISHLIST BUTTON TOGGLE
   ========================================= */
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isLiked = (btn.dataset.liked === "true");
    if (isLiked) {
      btn.textContent = '♡';
      btn.style.color = '';
      btn.dataset.liked = 'false';
    } else {
      btn.textContent = '♥';
      btn.style.color = '#e94560';
      btn.dataset.liked = 'true';
      animateHeart(btn);
    }
  });
});
 
function animateHeart(el) {
  el.style.transform = 'scale(1.4)';
  setTimeout(() => el.style.transform = 'scale(1)', 200);
}
 
 
/* =========================================
   8. QUICK VIEW MODAL
   ========================================= */
const products = {
  1: {
    name: 'Woven Texture Scarf',
    category: 'Accessories',
    price: '₹1,299',
    img: '../shopping.webp',
    desc: 'Handwoven from premium cotton-silk blend. Versatile enough for both casual and formal looks. Available in 6 earthy tones.',
    sizes: ['One Size'],
    tag: 'New'
  },
  2: {
    name: 'Linen Collar Shirt',
    category: 'Men',
    price: '₹499',
    oldPrice: '₹800',
    img: '../T-shirt.avif',
    desc: 'Crafted from breathable linen-cotton blend. The structured collar and relaxed silhouette make this a wardrobe essential.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tag: 'Sale'
  },
  
  3: {
    name: 'Denim Jackets',
    category: 'Mens Jacket',
    price: '₹2,799',
    img: '../jackets.webp',
    desc: 'Exquisitely crafted for the modern gentleman, our premium jackets blend timeless sophistication with unparalleled comfort',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tag: 'New'
  },
  4: {
    name: 'Oversized Hoodie',
    category: 'Unisex',
    price: '₹1,199',
    img: '../goodie.webp',
    desc: 'Ultra-soft fleece interior with a relaxed oversized fit. Printed with AVI\'s signature minimal graphic on chest.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tag: 'Best Seller'
  },
};
 
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
 
document.querySelectorAll('.quickview-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = btn.dataset.product
    const product = products[id];
    if (!product) {
      return;
    }

    const sizesHTML = product.sizes
      .map(s => `<button class="size-btn">${s}</button>`)
      .join('');

    modalContent.innerHTML = `
      <div class="modal-product">
        <div class="modal-img">
          <img src="${product.img}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;">
          <div class="modal-tag">${product.tag}</div>
        </div>
        <div class="modal-details">
          <p style="font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;">${product.category}</p>
          <h3 style="font-family:var(--font-display);font-size:1.8rem;font-weight:300;margin-bottom:12px;">${product.name}</h3>
          <div style="display:flex;gap:12px;align-items:center;margin-bottom:20px;">
            <span style="color:var(--gold);font-size:1.2rem;font-weight:600;">${product.price}</span>
            ${product.oldPrice ? `<span style="color:var(--soft);text-decoration:line-through;">${product.oldPrice}</span>` : ''}
          </div>
          <p style="color:rgba(245,240,232,0.6);font-size:0.85rem;line-height:1.8;margin-bottom:24px;">${product.desc}</p>
          <div style="margin-bottom:24px;">
            <p style="font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--soft);margin-bottom:12px;">Select Size</p>
            <div class="size-options">${sizesHTML}</div>
          </div>
          <button class="btn-primary add-to-cart-btn" data-name="${product.name}" style="width:100%;text-align:center;">Add to Cart</button>
        </div>
      </div>
    `;
 
    // Size selection
    modalContent.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modalContent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
 
    // Add to cart
    modalContent.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      const selectedSize = modalContent.querySelector('.size-btn.selected');
      if (!selectedSize && product.sizes.length > 1) {
        alert('Please select a size.');
        return;
      }
      addToCart(product.name);
      closeModal();
    });
 
    openModal();
  });
});
 
// Add modal styles dynamically
const modalStyle = document.createElement('style');
modalStyle.textContent = `
  .modal-product {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 32px;
  }
  .modal-img {
    background: #141414;
    position: relative;
  }
  .modal-tag {
    position: absolute;
    top: 12px; left: 12px;
    background: var(--gold);
    color: var(--black);
    padding: 4px 10px;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .size-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .size-btn {
    padding: 8px 16px;
    background: none;
    border: 1px solid rgba(255,255,255,0.15);
    color: var(--white);
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .size-btn:hover, .size-btn.selected {
    border-color: var(--gold);
    color: var(--gold);
  }
  @media (max-width: 600px) {
    .modal-product { grid-template-columns: 1fr; }
  }
`;
document.head.appendChild(modalStyle);
 
function openModal() {
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
 
function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
 
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
 
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
 
 
/* =========================================
   9. CART COUNTER
   ========================================= */
let cartCount = 0;
 
function addToCart(productName) {
  cartCount++;
  const cartSup = document.querySelector('.cart-icon sup');
  if (cartSup) {
    cartSup.textContent = cartCount;
    cartSup.style.transform = 'scale(1.5)';
    setTimeout(() => cartSup.style.transform = 'scale(1)', 200);
  }
  showToast(`"${productName}" added to cart!`);
}
 
 
/* =========================================
   10. TOAST NOTIFICATION
   ========================================= */
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
 
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 36px;
    background: var(--gold);
    color: var(--black);
    padding: 14px 24px;
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    z-index: 5000;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.4s ease;
  `;
 
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });
 
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
 
 
/* =========================================
   11. NEWSLETTER FORM
   ========================================= */
const newsForm = document.getElementById('newsForm');
const newsMsg = document.getElementById('newsMsg');
 
if (newsForm) {
  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsEmail').value;
    newsMsg.textContent = `✓ Welcome to AVI! We'll be in touch at ${email}`;
    newsMsg.style.color = 'var(--gold)';
    newsForm.reset();
  });
}
 
 
/* =========================================
   12. CONTACT FORM
   ========================================= */
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
 
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cName').value;
    formMsg.textContent = `✓ Thank you, ${name}! We'll get back to you shortly.`;
    formMsg.style.color = 'var(--gold)';
    contactForm.reset();
  });
}
 
 
/* =========================================
   13. SCROLL TO TOP
   ========================================= */
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
 
 
/* =========================================
   14. SMOOTH SCROLL FOR ANCHOR LINKS
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
 
 
/* =========================================
   15. PARALLAX — HERO BADGE
   ========================================= */
window.addEventListener('scroll', () => {
  const badge = document.querySelector('.hero-badge');
  if (badge) {
    const scrolled = window.scrollY;
    badge.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
});
 
 
/* =========================================
   16. COLLECTION CARD TILT EFFECT
   ========================================= */
document.querySelectorAll('.col-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
 
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
 
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
 
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--gold)';
    }
  });
});