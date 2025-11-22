// Booking form functionality
document.addEventListener('DOMContentLoaded', function() {
    const timeSlots = document.querySelectorAll('.time-slot');
    const selectedTimeInput = document.getElementById('selectedTime');
    const bookingForm = document.getElementById('bookingForm');
    
    // Time slot selection
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove selected class from all slots
            timeSlots.forEach(s => s.classList.remove('selected'));
            
            // Add selected class to clicked slot
            this.classList.add('selected');
            
            // Set hidden input value
            if (selectedTimeInput) {
                const time = this.getAttribute('data-time');
                const timeText = this.textContent.trim();
                selectedTimeInput.value = timeText;
            }
        });
    });
    
    // Form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                date: document.getElementById('date').value,
                time: selectedTimeInput ? selectedTimeInput.value : ''
            };
            
            // Validate time slot selection
            if (!formData.time) {
                alert('Please select a time slot');
                return;
            }
            
            // Show success message
            alert(`Booking confirmed!\n\nName: ${formData.fullName}\nEmail: ${formData.email}\nDate: ${formData.date}\nTime: ${formData.time}\n\nThank you for booking with Apple Dome!`);
            
            // Reset form
            bookingForm.reset();
            timeSlots.forEach(s => s.classList.remove('selected'));
            if (selectedTimeInput) {
                selectedTimeInput.value = '';
            }
        });
    }
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

