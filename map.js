// Map initialization and dome markers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map (centered on a default location - you can change this)
    const map = L.map('map').setView([40.7128, -74.0060], 12); // Default: New York City

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Custom marker icon - white location pin with logo inside
    const createCustomIcon = () => {
        return L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="position: relative; width: 40px; height: 50px;">
                    <!-- White location pin shape -->
                    <svg width="40" height="50" viewBox="0 0 40 50" style="position: absolute; top: 0; left: 0; z-index: 1;">
                        <path d="M20 0C12.27 0 6 6.27 6 14C6 24 20 50 20 50C20 50 34 24 34 14C34 6.27 27.73 0 20 0Z" fill="white" stroke="#E63946" stroke-width="2"/>
                    </svg>
                    <!-- Logo inside pin -->
                    <img src="logo.svg" alt="Logo" style="position: absolute; top: 5px; left: 5px; width: 30px; height: 30px; object-fit: contain; z-index: 2; pointer-events: none;">
                </div>
            `,
            iconSize: [40, 50],
            iconAnchor: [20, 50],
            popupAnchor: [0, -50]
        });
    };

    // Sample dome locations with information
    const domes = [
        {
            id: 1,
            name: 'Downtown Capsule',
            lat: 40.7128,
            lng: -74.0060,
            address: '123 Main Street, New York, NY 10001',
            availableTimes: ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'],
            bookedTimes: ['07:00 PM']
        },
        {
            id: 2,
            name: 'Central Park Capsule',
            lat: 40.7829,
            lng: -73.9654,
            address: '456 Park Avenue, New York, NY 10022',
            availableTimes: ['09:00 AM', '11:00 AM', '03:00 PM', '05:00 PM', '07:00 PM'],
            bookedTimes: ['01:00 PM']
        },
        {
            id: 3,
            name: 'Brooklyn Heights Capsule',
            lat: 40.6962,
            lng: -73.9973,
            address: '789 Brooklyn Bridge Road, Brooklyn, NY 11201',
            availableTimes: ['09:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'],
            bookedTimes: ['11:00 AM', '07:00 PM']
        },
        {
            id: 4,
            name: 'Upper East Side Capsule',
            lat: 40.7736,
            lng: -73.9566,
            address: '321 Lexington Avenue, New York, NY 10028',
            availableTimes: ['11:00 AM', '01:00 PM', '05:00 PM', '07:00 PM'],
            bookedTimes: ['09:00 AM', '03:00 PM']
        },
        {
            id: 5,
            name: 'SoHo Capsule',
            lat: 40.7231,
            lng: -74.0026,
            address: '654 Spring Street, New York, NY 10012',
            availableTimes: ['09:00 AM', '11:00 AM', '01:00 PM', '07:00 PM'],
            bookedTimes: ['03:00 PM', '05:00 PM']
        }
    ];

    // Create popup content HTML
    const createPopupContent = (dome) => {
        const allTimes = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM'];
        
        let timeSlotsHTML = '';
        allTimes.forEach(time => {
            const isAvailable = dome.availableTimes.includes(time);
            const isBooked = dome.bookedTimes.includes(time);
            const badgeClass = isAvailable ? 'available' : (isBooked ? 'booked' : '');
            const badgeText = isAvailable ? 'Available' : (isBooked ? 'Booked' : 'Unavailable');
            
            timeSlotsHTML += `
                <span class="time-badge ${badgeClass}" title="${badgeText}">
                    ${time}
                </span>
            `;
        });

        return `
            <div class="dome-popup">
                <h3>${dome.name}</h3>
                <div class="dome-address">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 0C4.48 0 1.5 2.98 1.5 6.5C1.5 11.5 8 16 8 16C8 16 14.5 11.5 14.5 6.5C14.5 2.98 11.52 0 8 0ZM8 8.5C6.62 8.5 5.5 7.38 5.5 6C5.5 4.62 6.62 3.5 8 3.5C9.38 3.5 10.5 4.62 10.5 6C10.5 7.38 9.38 8.5 8 8.5Z" fill="currentColor"/>
                    </svg>
                    <span>${dome.address}</span>
                </div>
                <div class="dome-availability">
                    <div class="dome-availability-title">Available Time Slots</div>
                    <div class="dome-time-slots">
                        ${timeSlotsHTML}
                    </div>
                </div>
                <button class="dome-book-btn" onclick="window.location.href='booking.html?dome=${dome.id}&name=${encodeURIComponent(dome.name)}'">
                    Book This Dome
                </button>
            </div>
        `;
    };

    // Add markers for each dome
    domes.forEach(dome => {
        const marker = L.marker([dome.lat, dome.lng], {
            icon: createCustomIcon()
        }).addTo(map);

        marker.bindPopup(createPopupContent(dome), {
            maxWidth: 350,
            className: 'dome-popup-wrapper'
        });
    });

    // Fit map to show all markers
    if (domes.length > 0) {
        const group = new L.featureGroup(domes.map(dome => 
            L.marker([dome.lat, dome.lng])
        ));
        map.fitBounds(group.getBounds().pad(0.1));
    }
});

