// Mempermudah pemanggilan elemen berdasarkan ID.
const $ = (id) => document.getElementById(id);

const BMKG_URL =
    "https://cews.bmkg.go.id/dashboard-custom/prediksi-UVI-indonesia/";

// Kota prioritas nasional + seluruh ibu kota provinsi. Koordinat dipakai
// untuk memusatkan peta tanpa menunggu layanan geocoding eksternal.
const cityData = [
    ["Jakarta", "DKI Jakarta", "Jawa", -6.2088, 106.8456, "31"],
    ["Bandung", "Jawa Barat", "Jawa", -6.9175, 107.6191, "32"],
    ["Bekasi", "Jawa Barat", "Jawa", -6.2383, 106.9756, "32"],
    ["Bogor", "Jawa Barat", "Jawa", -6.5971, 106.8060, "32"],
    ["Depok", "Jawa Barat", "Jawa", -6.4025, 106.7942, "32"],
    ["Tasikmalaya", "Jawa Barat", "Jawa", -7.3274, 108.2207, "32"],
    ["Cirebon", "Jawa Barat", "Jawa", -6.7320, 108.5523, "32"],
    ["Semarang", "Jawa Tengah", "Jawa", -6.9667, 110.4167, "33"],
    ["Surakarta", "Jawa Tengah", "Jawa", -7.5755, 110.8243, "33"],
    ["Yogyakarta", "DI Yogyakarta", "Jawa", -7.7956, 110.3695, "34"],
    ["Surabaya", "Jawa Timur", "Jawa", -7.2575, 112.7521, "35"],
    ["Malang", "Jawa Timur", "Jawa", -7.9666, 112.6326, "35"],
    ["Serang", "Banten", "Jawa", -6.1200, 106.1503, "36"],
    ["Medan", "Sumatera Utara", "Sumatra", 3.5952, 98.6722, "12"],
    ["Padang", "Sumatera Barat", "Sumatra", -0.9471, 100.4172, "13"],
    ["Pekanbaru", "Riau", "Sumatra", 0.5071, 101.4478, "14"],
    ["Jambi", "Jambi", "Sumatra", -1.6101, 103.6131, "15"],
    ["Palembang", "Sumatera Selatan", "Sumatra", -2.9761, 104.7754, "16"],
    ["Bengkulu", "Bengkulu", "Sumatra", -3.7928, 102.2608, "17"],
    ["Bandar Lampung", "Lampung", "Sumatra", -5.3971, 105.2668, "18"],
    ["Pangkalpinang", "Kepulauan Bangka Belitung", "Sumatra", -2.1316, 106.1169, "19"],
    ["Tanjungpinang", "Kepulauan Riau", "Sumatra", 0.9167, 104.4500, "21"],
    ["Pontianak", "Kalimantan Barat", "Kalimantan", -0.0263, 109.3425, "61"],
    ["Palangkaraya", "Kalimantan Tengah", "Kalimantan", -2.2096, 113.9213, "62"],
    ["Banjarmasin", "Kalimantan Selatan", "Kalimantan", -3.3194, 114.5908, "63"],
    ["Samarinda", "Kalimantan Timur", "Kalimantan", -0.5022, 117.1536, "64"],
    ["Balikpapan", "Kalimantan Timur", "Kalimantan", -1.2654, 116.8312, "64"],
    ["Tanjung Selor", "Kalimantan Utara", "Kalimantan", 2.8375, 117.3653, "65"],
    ["Makassar", "Sulawesi Selatan", "Sulawesi", -5.1477, 119.4327, "73"],
    ["Manado", "Sulawesi Utara", "Sulawesi", 1.4748, 124.8421, "71"],
    ["Palu", "Sulawesi Tengah", "Sulawesi", -0.9003, 119.8779, "72"],
    ["Kendari", "Sulawesi Tenggara", "Sulawesi", -3.9985, 122.5129, "74"],
    ["Gorontalo", "Gorontalo", "Sulawesi", 0.5435, 123.0568, "75"],
    ["Mamuju", "Sulawesi Barat", "Sulawesi", -2.6786, 118.8869, "76"],
    ["Denpasar", "Bali", "Bali & Nusa Tenggara", -8.6705, 115.2126, "51"],
    ["Mataram", "Nusa Tenggara Barat", "Bali & Nusa Tenggara", -8.5833, 116.1167, "52"],
    ["Kupang", "Nusa Tenggara Timur", "Bali & Nusa Tenggara", -10.1772, 123.6070, "53"],
    ["Ambon", "Maluku", "Maluku & Papua", -3.6954, 128.1814, "81"],
    ["Ternate", "Maluku Utara", "Maluku & Papua", 0.7900, 127.3842, "82"],
    ["Jayapura", "Papua", "Maluku & Papua", -2.5916, 140.6690, "91"],
    ["Manokwari", "Papua Barat", "Maluku & Papua", -0.8615, 134.0620, "92"],
    ["Tangerang", "Banten", "Jawa", -6.1783, 106.6319, "36"],
    ["Tangerang Selatan", "Banten", "Jawa", -6.2886, 106.7179, "36"],
    ["Cimahi", "Jawa Barat", "Jawa", -6.8722, 107.5425, "32"],
    ["Sukabumi", "Jawa Barat", "Jawa", -6.9277, 106.9299, "32"],
    ["Purwakarta", "Jawa Barat", "Jawa", -6.5569, 107.4433, "32"],
    ["Karawang", "Jawa Barat", "Jawa", -6.3227, 107.3376, "32"],
    ["Subang", "Jawa Barat", "Jawa", -6.5715, 107.7587, "32"],
    ["Majalengka", "Jawa Barat", "Jawa", -6.8361, 108.2276, "32"],
    ["Kuningan", "Jawa Barat", "Jawa", -6.9820, 108.4830, "32"],
    ["Garut", "Jawa Barat", "Jawa", -7.2167, 107.9000, "32"],
    ["Banjar", "Jawa Barat", "Jawa", -7.3700, 108.5340, "32"],
    ["Purwokerto", "Jawa Tengah", "Jawa", -7.4246, 109.2396, "33"],
    ["Cilacap", "Jawa Tengah", "Jawa", -7.7278, 109.0078, "33"],
    ["Tegal", "Jawa Tengah", "Jawa", -6.8694, 109.1402, "33"],
    ["Brebes", "Jawa Tengah", "Jawa", -6.8694, 109.0369, "33"],
    ["Pekalongan", "Jawa Tengah", "Jawa", -6.8898, 109.6746, "33"],
    ["Magelang", "Jawa Tengah", "Jawa", -7.4706, 110.2177, "33"],
    ["Salatiga", "Jawa Tengah", "Jawa", -7.3305, 110.5084, "33"],
    ["Kudus", "Jawa Tengah", "Jawa", -6.8048, 110.8411, "33"],
    ["Jepara", "Jawa Tengah", "Jawa", -6.5869, 110.6681, "33"],
    ["Pati", "Jawa Tengah", "Jawa", -6.7559, 111.0380, "33"],
    ["Rembang", "Jawa Tengah", "Jawa", -6.7087, 111.3473, "33"],
    ["Klaten", "Jawa Tengah", "Jawa", -7.7058, 110.6064, "33"],
    ["Wonogiri", "Jawa Tengah", "Jawa", -7.8140, 110.9200, "33"],
    ["Sragen", "Jawa Tengah", "Jawa", -7.4264, 111.0222, "33"],
    ["Blora", "Jawa Tengah", "Jawa", -6.9698, 111.4186, "33"],
    ["Kediri", "Jawa Timur", "Jawa", -7.8169, 112.0114, "35"],
    ["Madiun", "Jawa Timur", "Jawa", -7.6298, 111.5239, "35"],
    ["Mojokerto", "Jawa Timur", "Jawa", -7.4706, 112.4401, "35"],
    ["Pasuruan", "Jawa Timur", "Jawa", -7.6453, 112.9075, "35"],
    ["Probolinggo", "Jawa Timur", "Jawa", -7.7543, 113.2159, "35"],
    ["Sidoarjo", "Jawa Timur", "Jawa", -7.4478, 112.7183, "35"],
    ["Jember", "Jawa Timur", "Jawa", -8.1724, 113.7004, "35"],
    ["Banyuwangi", "Jawa Timur", "Jawa", -8.2192, 114.3691, "35"],
    ["Batu", "Jawa Timur", "Jawa", -7.8700, 112.5260, "35"],
    ["Banda Aceh", "Aceh", "Sumatra", 5.5483, 95.3238, "11"],
    ["Sabang", "Aceh", "Sumatra", 5.8926, 95.3238, "11"],
    ["Lhokseumawe", "Aceh", "Sumatra", 5.1801, 97.1507, "11"],
    ["Langsa", "Aceh", "Sumatra", 4.4683, 97.9683, "11"],
    ["Sibolga", "Sumatera Utara", "Sumatra", 1.7402, 98.7854, "12"],
    ["Pematangsiantar", "Sumatera Utara", "Sumatra", 2.9595, 99.0687, "12"],
    ["Dumai", "Riau", "Sumatra", 1.6640, 101.4451, "14"],
    ["Lubuklinggau", "Sumatera Selatan", "Sumatra", -3.2996, 102.8614, "16"],
    ["Metro", "Lampung", "Sumatra", -5.1131, 105.3067, "18"],
    ["Singkawang", "Kalimantan Barat", "Kalimantan", 0.9060, 108.9872, "61"],
    ["Banjarbaru", "Kalimantan Selatan", "Kalimantan", -3.4420, 114.8410, "63"],
    ["Tarakan", "Kalimantan Utara", "Kalimantan", 3.3274, 117.5785, "65"],
    ["Bitung", "Sulawesi Utara", "Sulawesi", 1.4404, 125.1926, "71"],
    ["Tomohon", "Sulawesi Utara", "Sulawesi", 1.3226, 124.8408, "71"],
    ["Singaraja", "Bali", "Bali & Nusa Tenggara", -8.1120, 115.0882, "51"],
    ["Bima", "Nusa Tenggara Barat", "Bali & Nusa Tenggara", -8.4606, 118.7274, "52"],
    ["Sumbawa Besar", "Nusa Tenggara Barat", "Bali & Nusa Tenggara", -8.4932, 117.4200, "52"],
    ["Sorong", "Papua Barat Daya", "Maluku & Papua", -0.8762, 131.2558, "98"],
    ["Merauke", "Papua Selatan", "Maluku & Papua", -8.4932, 140.4018, "93"],
    ["Timika", "Papua Tengah", "Maluku & Papua", -4.5447, 136.8874, "94"],
    ["Fakfak", "Papua Barat", "Maluku & Papua", -2.9264, 132.2960, "92"],
    ["Saumlaki", "Maluku", "Maluku & Papua", -7.9840, 131.2980, "81"]
];


// --------------------------------------------------
// 1. KATEGORI DAN INFORMASI RISIKO UV
// --------------------------------------------------

function uvInfo(uv) {
    if (uv < 3) {
        return {
            name: "Low",
            color: "#62c99b",
            desc: "Risiko bahaya dari paparan UV relatif rendah.",
            risk: "Tetap perhatikan paparan matahari, terutama dalam waktu lama.",
            protect: "Kacamata hitam dan perlindungan kulit dapat dipertimbangkan sesuai aktivitas.",
            spf: "Sunscreen broad-spectrum SPF 30+ dapat digunakan sebagai perlindungan rutin."
        };
    }

    if (uv < 6) {
        return {
            name: "Moderate",
            color: "#f4c84e",
            desc: "Perlindungan dari matahari dianjurkan.",
            risk: "Paparan berkepanjangan dapat meningkatkan risiko kerusakan kulit dan mata.",
            protect: "Cari tempat teduh saat intensitas tinggi dan gunakan topi serta pakaian pelindung.",
            spf: "Gunakan sunscreen broad-spectrum SPF 30+."
        };
    }

    if (uv < 8) {
        return {
            name: "High",
            color: "#ff9d52",
            desc: "Perlindungan ekstra diperlukan.",
            risk: "Risiko dampak UV meningkat, khususnya saat berada di luar tanpa perlindungan.",
            protect: "Kurangi paparan langsung, terutama sekitar tengah hari. Gunakan pelindung fisik.",
            spf: "Gunakan sunscreen broad-spectrum SPF 30–50+."
        };
    }

    if (uv < 11) {
        return {
            name: "Very High",
            color: "#ed7777",
            desc: "Risiko bahaya dari paparan UV sangat tinggi.",
            risk: "Kulit dan mata yang tidak terlindungi dapat terdampak dalam waktu relatif singkat.",
            protect: "Usahakan menghindari paparan langsung saat UV tinggi, cari tempat teduh, dan gunakan pelindung fisik.",
            spf: "Gunakan sunscreen broad-spectrum SPF 50+."
        };
    }

    return {
        name: "Extreme",
        color: "#a78bfa",
        desc: "Risiko bahaya dari paparan UV berada pada tingkat ekstrem.",
        risk: "Potensi dampak pada kulit dan mata sangat tinggi tanpa perlindungan.",
        protect: "Hindari paparan matahari langsung sebisa mungkin dan gunakan perlindungan lengkap.",
        spf: "Gunakan sunscreen broad-spectrum SPF 50+ serta perlindungan fisik."
    };
}


// --------------------------------------------------
// 2. UV RISK CALCULATOR
// --------------------------------------------------

if ($("uvSlider")) {
    const slider = $("uvSlider");
    const areaInput = $("areaInput");
    const skinType = $("skinType");

    const skinProfiles = {
        "very-light": {
            label: "Putih",
            description: "lebih sensitif terhadap paparan UV dan lebih mudah mengalami kemerahan atau terbakar."
        },
        light: {
            label: "Kuning Langsat",
            description: "cukup sensitif terhadap paparan UV, terutama saat berada di luar dalam waktu lama."
        },
        medium: {
            label: "Sawo matang",
            description: "tetap dapat mengalami dampak UV, meskipun kulit biasanya lebih tahan terhadap kemerahan."
        },
        brown: {
            label: "Cokelat",
            description: "tetap membutuhkan perlindungan karena UV dapat menyebabkan kerusakan dan perubahan warna kulit."
        },
        dark: {
            label: "Gelap",
            description: "tetap membutuhkan perlindungan karena paparan UV dapat berdampak pada semua warna kulit."
        }
    };

    function updateCalculator() {
        const uv = Number(slider.value);
        const area = Number(areaInput.value);
        const info = uvInfo(uv);
        const profile = skinProfiles[skinType.value] || skinProfiles.medium;

        // Memperbarui angka UV.
        $("uvValue").textContent = uv.toFixed(1);
        $("uvBig").textContent = uv.toFixed(1);

        // Memperbarui kategori risiko.
        $("riskTitle").innerHTML = `
            <span style="
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: ${info.color};
                margin-right: 7px;
            "></span>
            ${info.name} Risk
        `;

        $("riskDesc").textContent = info.desc;
        $("skinRisk").textContent = `${info.risk} Untuk kulit ${profile.label.toLowerCase()}, ${profile.description}`;
        $("skinProfile").textContent = profile.label;
        $("protection").textContent = info.protect;
        $("spf").textContent = info.spf;

        // Perkiraan kebutuhan sunscreen berdasarkan luas area.
        if (Number.isFinite(area) && area > 0 && area <= 30000) {
            const amount = area * 2;
            const grams = amount / 1000;

            $("dose").textContent =
                `${amount.toLocaleString("id-ID")} mg ` +
                `(${grams.toFixed(2)} gram) per aplikasi ` +
                `untuk area ${area.toLocaleString("id-ID")} cm².`;
        } else {
            $("dose").textContent =
                "Masukkan luas kulit antara 1–30.000 cm² untuk menghitung perkiraan jumlah.";
        }
    }

    slider.addEventListener("input", updateCalculator);
    areaInput.addEventListener("input", updateCalculator);
    skinType.addEventListener("change", updateCalculator);

    updateCalculator();
}


// --------------------------------------------------
// 3. PENCARIAN DAN FILTER KOTA
// --------------------------------------------------

if ($("cityGrid")) {
    let cityMap;
    let cityMarker;

    function getCityByName(name) {
        return cityData.find((city) => city[0].toLowerCase() === name.toLowerCase());
    }

    function getGoogleMapsUrl(city) {
        return `https://www.google.com/maps/search/?api=1&query=${city[3]},${city[4]}`;
    }

    function showCityOnMap(city) {
        if (!window.L || !city) return;
        $("mapPanel").hidden = false;
        if (!cityMap) {
            cityMap = L.map("cityMap").setView([-2.5, 118], 5);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 18,
                attribution: "© OpenStreetMap contributors"
            }).addTo(cityMap);
        }
        cityMap.setView([city[3], city[4]], 11, { animate: true });
        if (cityMarker) cityMarker.remove();
        cityMarker = L.marker([city[3], city[4]]).addTo(cityMap)
            .bindPopup(`<b>${city[0]}</b><br>${city[1]}`).openPopup();
        $("mapTitle").textContent = `Peta ${city[0]}`;
        $("uvStatus").textContent = `Indeks UV ${city[0]}: data resmi BMKG ditampilkan secara dinamis.`;
        $("uvCityLink").href = getGoogleMapsUrl(city);
        $("uvCityLink").textContent = `Lihat indeks UV ${city[0]} di Google Maps`;
        $("mapSubtitle").textContent = `${city[1]} • koordinat ${city[3].toFixed(4)}, ${city[4].toFixed(4)}`;
        $("mapLink").href = getGoogleMapsUrl(city);
        $("mapLink").textContent = `Buka Google Maps ${city[0]}`;
        $("dataStatus").textContent = `Lokasi ${city[0]} ditampilkan`;
        setTimeout(() => cityMap.invalidateSize(), 100);
    }

    function renderCities() {
        const keyword = $("citySearch").value.trim().toLowerCase();
        const selectedRegion = $("islandFilter").value;

        const filteredCities = cityData.filter((city) => {
            const cityName = city[0].toLowerCase();
            const province = city[1].toLowerCase();

            const matchesKeyword =
                cityName.includes(keyword) ||
                province.includes(keyword);

            const matchesRegion =
                selectedRegion === "all" ||
                city[2] === selectedRegion;

            return matchesKeyword && matchesRegion;
        });

        if (filteredCities.length === 0) {
            $("cityGrid").innerHTML = `
                <div style="
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 25px;
                    color: #8292a8;
                ">
                    Kota tidak ditemukan. Coba kata kunci lain ya!
                </div>
            `;

            return;
        }

        $("cityGrid").innerHTML = filteredCities.map((city) => `
            <article class="city-card">
                <div class="emoji">☀</div>

                <h3>${city[0]}</h3>
                <p>${city[1]}</p>

                <div class="data-label">
                    Koordinat kota tersedia untuk peta. Buka BMKG untuk indeks UV resmi terkini.
                </div>

                <button class="btn light map-city" type="button" data-city="${city[0]}">Lihat kota ${city[0]}</button>

                <a
                    href="${getGoogleMapsUrl(city)}"
                    target="_blank"
                    rel="noopener"
                >
                    Lihat prediksi BMKG ↗
                </a>
                <a
                    href="${getGoogleMapsUrl(city)}"
                    target="_blank"
                    rel="noopener"
                >
                    Lihat indeks UV di Google Maps
                </a>
            </article>
        `).join("");

        $("cityGrid").querySelectorAll(".map-city").forEach((button) => {
            button.addEventListener("click", () => showCityOnMap(getCityByName(button.dataset.city)));
        });
    }

    $("citySuggestions").innerHTML = cityData.map((city) => `<option value="${city[0]}">${city[1]}</option>`).join("");

    $("citySearch").addEventListener("input", (event) => {
        renderCities();
        const exactCity = getCityByName(event.target.value.trim());
        if (exactCity) {
            const cityButton = [...$("cityGrid").querySelectorAll(".map-city")]
                .find((button) => button.dataset.city === exactCity[0]);
            if (cityButton) cityButton.focus();
        }
    });
    $("islandFilter").addEventListener("change", renderCities);

    renderCities();
}


// --------------------------------------------------
// 4. GRAFIK UV FORECAST
// --------------------------------------------------

if ($("uvChart") && window.Chart) {
    const labels = [
        "06.00", "07.00", "08.00", "09.00",
        "10.00", "11.00", "12.00", "13.00",
        "14.00", "15.00", "16.00", "17.00", "18.00"
    ];

    // Seluruh nilai berikut merupakan data simulasi.
    const chartData = {
        clear: [
            0, 1, 2, 4, 6, 8, 10, 11, 10, 8, 5, 2, 0
        ],

        cloudy: [
            0, 0.5, 1, 2, 3, 4, 5, 5.5, 5, 4, 2.5, 1, 0
        ],

        low: [
            0, 0.3, 0.7, 1, 1.5, 2, 2.5, 2.7, 2.5, 2, 1.2, 0.5, 0
        ]
    };

    let uvChart;

    function drawChart(pattern) {
        // Hapus grafik sebelumnya sebelum membuat grafik baru.
        if (uvChart) {
            uvChart.destroy();
        }

        uvChart = new Chart($("uvChart"), {
            type: "line",

            data: {
                labels: labels,

                datasets: [{
                    label: "Simulasi UV Index",
                    data: chartData[pattern],

                    borderColor: "#8e79dc",
                    backgroundColor: "rgba(167, 139, 250, 0.18)",

                    fill: true,
                    tension: 0.4,

                    pointRadius: 3,
                    pointBackgroundColor: "#5799e8",

                    borderWidth: 3
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true,
                        max: 12,

                        title: {
                            display: true,
                            text: "UV Index"
                        },

                        grid: {
                            color: "#edf1f8"
                        }
                    },

                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    $("patternSelect").addEventListener("change", (event) => {
        drawChart(event.target.value);
    });

    drawChart("clear");
}


// --------------------------------------------------
// 5. MENU NAVIGASI UNTUK PERANGKAT MOBILE
// --------------------------------------------------

const menuButton = $("menuBtn");
const navigation = $("nav");

if (menuButton && navigation) {
    const overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);

    const navigationHeader = document.createElement("div");
    navigationHeader.className = "nav-head";
    navigationHeader.innerHTML = `
        <span class="nav-title">Menu</span>
        <button class="nav-close" type="button" aria-label="Tutup navigasi">×</button>
    `;
    navigation.prepend(navigationHeader);

    const iconNames = {
        "index.html": "house",
        "calculator.html": "calculator",
        "monitor.html": "map-pin",
        "forecast.html": "chart-spline",
        "tips.html": "shield-check",
        "know-your-uv.html": "sun",
        "stay-protected.html": "umbrella"
    };

    navigation.querySelectorAll("a").forEach((link) => {
        const label = link.textContent.trim();
        const icon = document.createElement("i");
        icon.className = "nav-icon";
        icon.setAttribute("data-lucide", iconNames[link.getAttribute("href")] || "circle-help");
        const labelElement = document.createElement("span");
        labelElement.className = "nav-label";
        labelElement.textContent = label;
        link.replaceChildren(icon, labelElement);
    });

    if (window.lucide) window.lucide.createIcons();

    function setMenuState(isOpen) {
        navigation.classList.toggle("open", isOpen);
        overlay.classList.toggle("open", isOpen);
        document.body.classList.toggle("nav-open", isOpen);
        menuButton.textContent = isOpen ? "×" : "☰";
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Tutup navigasi" : "Buka navigasi");
    }

    setMenuState(false);

    menuButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const shouldOpen = !navigation.classList.contains("open");
        if (shouldOpen) {
            requestAnimationFrame(() => setMenuState(true));
        } else {
            setMenuState(false);
        }
    });

    navigationHeader.querySelector(".nav-close").addEventListener("click", () => {
        setMenuState(false);
    });

    overlay.addEventListener("click", () => {
        setMenuState(false);
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            setMenuState(false);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setMenuState(false);
    });
}