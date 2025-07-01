

      $(document).ready(function () {
        // Thumbnail image switching
        $(".thumbnail").click(function () {
          const newImage = $(this).data("image");
          $("#mainImage").css("background-image", `url('${newImage}')`);
        });

        // Dog size selection
        $(".size-option").click(function () {
          $(".size-option").removeClass("selected");
          $(this).addClass("selected");

          const selectedSize = $(this).data("size");
          const sizeText =
            $(this).find(".size-name").text() +
            " (" +
            $(this).find(".size-weight").text() +
            ")";
          $(".dog-size-label span").text(sizeText);
        });

        // Frequency selection
        $(".frequency-option").click(function () {
          $(".frequency-option").removeClass("selected");
          $(this).addClass("selected");
        });

        // Subscribe toggle
        $(".toggle-switch").click(function () {
          $(this).toggleClass("active");
        });

        // Expandable sections
        $(".expandable-header").click(function () {
          const target = $(this).data("target");
          const content = $(target);
          const icon = $(this).find(".expand-icon");

          if (content.is(":visible")) {
            content.slideUp();
            icon.text("+");
          } else {
            content.slideDown();
            icon.text("−");
          }
        });

        // Quick add bundle
        $(".quick-add-btn").click(function () {
          alert("Bundle added to cart!");
        });

        // Add to cart
        $(".add-to-cart-btn").click(function () {
          alert("Product added to cart!");
        });

        // Shop Pay
        $(".shop-pay-btn").click(function () {
          alert("Redirecting to Shop Pay...");
        });

        // Read more
        $(".read-more").click(function () {
          alert("Expanding product description...");
        });

        // See all reviews
        $(".see-reviews").click(function () {
          alert("Showing all reviews...");
        });
        // How It Works benefit cards
        const benefitHeaders = document.querySelectorAll(
          ".how-it-works-benefit-header"
        );

        benefitHeaders.forEach((header) => {
          header.addEventListener("click", function () {
            const card = this.closest(".how-it-works-benefit-card");
            const content = card.querySelector(".how-it-works-benefit-content");
            const toggle = this.querySelector(".how-it-works-benefit-toggle");

            if (content.classList.contains("expanded")) {
              content.classList.remove("expanded");
              toggle.textContent = "+";
            } else {
              // Close all other cards
              document
                .querySelectorAll(".how-it-works-benefit-content")
                .forEach((c) => {
                  c.classList.remove("expanded");
                });
              document
                .querySelectorAll(".how-it-works-benefit-toggle")
                .forEach((t) => {
                  t.textContent = "+";
                });

              // Open this card
              content.classList.add("expanded");
              toggle.textContent = "−";
            }
          });
        });
      });

      // Trusted by section swiper initialization

      document.addEventListener("DOMContentLoaded", function () {
        var swiper = new Swiper(".mySwiper", {
          slidesPerView: 4,
          spaceBetween: 20,
          loop: true,

          // ✅ Autoplay settings
          autoplay: {
            delay: 0, // remove delay to keep it sliding continuously
            disableOnInteraction: false,
          },

          // ✅ Make it smooth and continuous
          speed: 3000, // time to slide from one to the next (ms)
          loopedSlides: 6, // recommended for smooth loop
          grabCursor: true,

          // ✅ Free mode for smooth sliding feel
          freeMode: true,

          // ✅ Disable navigation for smoother flow (optional)
          // Comment below if you still want arrows
          navigation: false,

          breakpoints: {
            1200: { slidesPerView: 4 },
            992: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          },
        });
      });

      // <!-- SwiperJS JS -->
   