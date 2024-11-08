document.addEventListener('DOMContentLoaded', () => {
    // ======= SIDEBAR TOGGLE =======
    const sidebar = document.querySelector('.sidebar');
    const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
    const content = document.querySelector('.content');

    if (toggleSidebarBtn && sidebar && content) {
        toggleSidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            content.classList.toggle('expanded');
        });
    }

    //  ICON
    // Xử lý sự kiện click vào biểu tượng "like"
document.querySelectorAll('.like-icon').forEach((icon) => {
    icon.addEventListener('click', () => {
        icon.classList.toggle('liked');  // Toggle màu đỏ
    });
});

// Xử lý sự kiện click vào biểu tượng "comment"
document.querySelectorAll('.comment-icon').forEach((icon) => {
    icon.addEventListener('click', () => {
        const commentSection = icon.nextElementSibling;
        commentSection.style.display =
            commentSection.style.display === 'none' ? 'block' : 'none';
    });
});

// Xử lý gửi bình luận
document.querySelectorAll('.comment-submit').forEach((button) => {
    button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        if (input.value.trim()) {
            alert('Bạn đã bình luận thành công!');
            input.value = '';  // Xóa nội dung sau khi gửi
        } else {
            alert('Vui lòng nhập bình luận!');
        }
    });
});

// Xử lý sự kiện click vào biểu tượng "đăng lại"
document.querySelectorAll('.fa-right-left').forEach((icon) => {
    icon.addEventListener('click', () => {
        alert('Bạn đã đăng lại thành công!');
    });
});

// Xử lý sự kiện click vào biểu tượng "share"
document.querySelectorAll('.fa-share').forEach((icon) => {
    icon.addEventListener('click', () => {
        alert('Bạn đã chia sẻ thành công!');
    });
});

    // ======= MODAL HANDLING =======
    const modal = document.getElementById('modal');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const closeBtns = document.querySelectorAll('.close-btn');

    const loginButtons = Array.from(document.querySelectorAll('button')).filter(
        (btn) => btn.textContent.trim() === 'Đăng Nhập'
    );

    loginButtons.forEach((btn) => {
        btn.addEventListener('click', () => openModal(loginForm));
    });

    const switchToSignupBtn = document.querySelector('.switch-to-signup');
    const switchToLoginBtn = document.querySelector('.switch-to-login');

    if (switchToSignupBtn && switchToLoginBtn) {
        switchToSignupBtn.addEventListener('click', () => toggleForms(signupForm, loginForm));
        switchToLoginBtn.addEventListener('click', () => toggleForms(loginForm, signupForm));
    }

    closeBtns.forEach((btn) => btn.addEventListener('click', closeModal));
    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    function openModal(form) {
        if (modal && form) {
            modal.style.display = 'flex';
            form.style.display = 'block';
        }
    }

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            loginForm.style.display = 'none';
            signupForm.style.display = 'none';
        }
    }

    function toggleForms(showForm, hideForm) {
        showForm.style.display = 'block';
        hideForm.style.display = 'none';
    }

    // ======= SEARCH FUNCTION =======
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.header input[type="text"]');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            alert(query ? `Bạn đã tìm kiếm: ${query}` : 'Vui lòng nhập nội dung tìm kiếm!');
        });
    }

    // ======= CART HANDLING =======
    const cartIcon = document.getElementById('cartIcon');
    const cartCount = document.getElementById('cartCount');
    const cartForm = document.querySelector('.popup-wrapper');
    const cartDetails = document.querySelector('.cart-details');
    const btnDismiss = document.querySelector('.btn-dismiss');
    const btnBuyNow = document.querySelector('.btn-buy');
    const paymentPopup = document.getElementById('paymentPopup');
    const overlay = document.getElementById('overlay');
    const btnClosePayment = document.querySelector('.btn-close-payment');
    const addButtons = document.querySelectorAll('.btn-plus');

    let cart = [];

    function showPopup(popup) {
        if (popup) {
            popup.style.display = 'block';
            overlay.classList.add('show');
        }
    }

    function hidePopup(popup) {
        if (popup) {
            popup.style.display = 'none';
            overlay.classList.remove('show');
        }
    }

    function updateCartCount() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function renderCartDetails() {
        if (cart.length === 0) {
            cartDetails.innerHTML = "<p>Giỏ hàng trống.</p>";
            return;
        }

        let totalPrice = 0;
        cartDetails.innerHTML = cart.map((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" />
                    <div>
                        <p><strong>${item.name}</strong></p>
                        <p>${item.quantity} x ${item.price} Điểm = ${itemTotal} Điểm</p>
                    </div>
                    <button class="btn-remove" data-index="${index}">Xóa</button>
                </div>`;
        }).join('');

        cartDetails.innerHTML += `<strong>Tổng cộng: ${totalPrice} Điểm</strong>`;
        document.querySelectorAll('.btn-remove').forEach(btn =>
            btn.addEventListener('click', removeItemFromCart)
        );
    }

    function removeItemFromCart(event) {
        cart.splice(event.target.dataset.index, 1);
        updateCartCount();
        renderCartDetails();
    }

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemCard = button.closest('.item-card');
            const name = itemCard.querySelector('.item-description p').textContent;
            const price = parseInt(itemCard.querySelector('.item-description span').textContent);
            const image = itemCard.querySelector('img').src;

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1, image });
            }

            updateCartCount();
            renderCartDetails();
        });
    });

    cartIcon?.addEventListener('click', () => showPopup(cartForm));
    btnDismiss?.addEventListener('click', () => hidePopup(cartForm));
    btnBuyNow?.addEventListener('click', (e) => {
        e.preventDefault();
        hidePopup(cartForm);
        showPopup(paymentPopup);
        renderCartDetails();
    });
    btnClosePayment?.addEventListener('click', () => hidePopup(paymentPopup));

});


// NHIEM VU

// Selectors for dynamic elements
const pointsValue = document.querySelector('.points-value');
const taskButtons = document.querySelectorAll('.btn-task');
const progressBars = document.querySelectorAll('.progress-bar');
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.header input');

// Initial points value (parsed from the HTML text)
let points = parseInt(pointsValue.textContent);

// Function to update points
function updatePoints(additionalPoints) {
  points += additionalPoints;
  pointsValue.textContent = `${points}đ`;
}

// Mark tasks as done when the button is clicked
taskButtons.forEach((btn) => {
  btn.addEventListener('click', function () {
    if (!btn.classList.contains('done')) {
      btn.textContent = '✓';
      btn.classList.add('done');

      // Extract and add task points
      const taskPoints = parseInt(this.previousElementSibling.textContent);
      updatePoints(taskPoints);
    }
  });
});

// Function to animate progress bars based on their width
function animateProgressBars() {
  progressBars.forEach((bar) => {
    const targetWidth = bar.style.width;
    bar.style.width = '0'; // Reset to 0 for animation

    setTimeout(() => {
      bar.style.transition = 'width 1s ease-in-out';
      bar.style.width = targetWidth;
    }, 100);
  });
}

// Call progress bar animation on page load
document.addEventListener('DOMContentLoaded', animateProgressBars);

// Search functionality
searchButton.addEventListener('click', function () {
  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    alert(`Tìm kiếm: ${query}`);
  } else {
    alert('Vui lòng nhập từ khóa để tìm kiếm!');
  }
});

// Example function to show how leaderboard could be filtered (optional enhancement)
function filterLeaderboard(query) {
  const players = document.querySelectorAll('.ranking-board ul li');
  players.forEach((player) => {
    const playerName = player.querySelector('.player-info h3').textContent.toLowerCase();
    player.style.display = playerName.includes(query) ? 'block' : 'none';
  });
}


//  Dang bai 
// Lấy các phần tử DOM
const createPostBtn = document.querySelector('.create-post-btn');
const createPostTextarea = document.querySelector('.create-post-textarea');
const postInputText = document.querySelector('.post-input-text');

// Thêm sự kiện click vào nút Đăng
createPostBtn.addEventListener('click', () => {
    const content = createPostTextarea.value.trim();
    const additionalText = postInputText.value.trim();

    // Kiểm tra xem người dùng đã nhập đủ thông tin chưa
    if (content === '' || additionalText === '') {
        alert('Vui lòng điền đầy đủ thông tin trước khi đăng bài!');
        return;
    }

    // Thông báo đăng bài thành công
    alert('Bài đăng của bạn đã được tạo thành công!');

    // Reset form sau khi đăng bài
    createPostTextarea.value = '';
    postInputText.value = '';
});


// PROFILE
