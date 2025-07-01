
  function toggleAccordion(el) {
    const isActive = el.classList.contains('active');
    document.querySelectorAll('.accordion').forEach(acc => acc.classList.remove('active'));
    if (!isActive) el.classList.add('active');
  }
  
  function toggleAccordion(el) {
    const isActive = el.classList.contains('active');

    // Close all accordions and reset icons
    document.querySelectorAll('.accordion').forEach(acc => {
      acc.classList.remove('active');
      const icon = acc.querySelector('.accordion-icon');
      if (icon) icon.src = 'images/Frame 2085664541.png'; // path to your plus icon
    });

    // Toggle current one
    if (!isActive) {
      el.classList.add('active');
      const icon = el.querySelector('.accordion-icon');
      if (icon) icon.src = 'images/Frame 2085664540.png'; // path to your minus icon
    }
  }
