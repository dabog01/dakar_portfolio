class ServiceForm {
    constructor(formId, timeDisplayId, btnId) {
        this.form = document.getElementById(formId);
        this.timeDisplay = document.getElementById(timeDisplayId);
        this.btnCheckout = document.getElementById(btnId);
        this.tabsContainer = document.getElementById('tabs-container');
        this.phone = "573017841673";

        // Base de Datos: Usando TU estructura exacta, pero con descripciones coloquiales y tiempos para las sub-opciones
        this.catalogData = [
            {
                id: 'tab-basica',
                category: "Limpieza Básica",
                desc: "Mantenimiento ideal para el día a día. Recomendado para carros sin suciedad extrema.",
                isMain: true,
                items: [
                    { id: 'bas1', name: 'Limpieza Express', desc: 'Lavado exterior cuidadoso, aspirado básico por dentro y brillo en las llantas.', timeMin: 60 },
                    { id: 'bas2', name: 'Limpieza Estándar', desc: 'Lavado detallado por dentro y por fuera, más una capa de cera aplicada a mano para dar brillo.', timeMin: 90 },
                    { id: 'bas3', name: 'Limpieza Detallada', desc: 'Aspirado a profundidad, cera que repele el agua y protección para revivir los plásticos negros.', timeMin: 120 }
                ]
            },
            {
                id: 'tab-intermedia',
                category: "Limpieza Intermedia",
                desc: "Mayor atención al detalle. Tratamientos para devolver el brillo y eliminar suciedad focalizada.",
                isMain: true,
                items: [
                    {
                        id: 'pro1', name: 'Limpieza Exterior Completa',
                        desc: 'Lavado general de tu carro, y tú eliges qué partes mecánicas o de pintura quieres dejar como nuevas.',
                        timeMin: 90, // Tiempo base del lavado
                        maxChoices: 3,
                        options: [
                            { name: 'Motor a Vapor', timeAdd: 90 },
                            { name: 'Chasis + Grafito', timeAdd: 90 },
                            { name: 'Polichado Manual', timeAdd: 60 }
                        ]
                    },
                    { id: 'proPol1', name: 'Polichado con 1 Cera', desc: 'Usamos una máquina especial y una capa de cera para devolverle el color y brillo original a la pintura.', timeMin: 180 },
                    { id: 'proPol2', name: 'Polichado con 2 Ceras', desc: 'Proceso a máquina aplicando dos tipos de cera para lograr un brillo más profundo y protección contra el clima.', timeMin: 120 },
                    { id: 'proPol3', name: 'Polichado con 3 Ceras', desc: 'Nuestro mejor tratamiento para la pintura. Tres capas de cera para un brillo tipo espejo de larga duración.', timeMin: 300 }
                ]
            },
            {
                id: 'tab-profunda',
                category: "Limpieza Profunda",
                desc: "Para dejarlo como nuevo. Restauración, protección y cuidado milimétrico por dentro y por fuera.",
                isMain: true,
                items: [
                    {
                        id: 'eli1', name: 'Limpieza Profunda de Exterior + Interior',
                        desc: 'Pintura impecable por fuera y tú eliges qué partes del interior quieres desmanchar y lavar a fondo.',
                        timeMin: 150, // Tiempo base
                        maxChoices: 3,
                        options: [
                            { name: 'Lavar Piso', timeAdd: 120 },
                            { name: 'Lavar Techo', timeAdd: 120 },
                            { name: 'Lavar Cojinería', timeAdd: 120 }
                        ]
                    },
                    {
                        id: 'eli2', name: 'Restauración de Componentes Críticos',
                        desc: '¡Luce tu vehículo como nuevo! Lavado profundo y eliges si quieres desmanchar piezas difíciles.',
                        timeMin: 360, // Tiempo base
                        maxChoices: 2,
                        options: [
                            { name: 'Desmanche Motor', timeAdd: 180 },
                            { name: 'Desmanche Chasis', timeAdd: 180 }
                        ]
                    },
                    { id: 'eli3', name: 'Duo Restauración', desc: 'Renovación total. Limpiamos a fondo el interior, el exterior, dejamos el motor impecable y el chasis como nuevo.', timeMin: 900 },
                    { id: 'eli4', name: 'Porcelanizado', desc: 'Aplicamos un escudo protector invisible sobre la pintura que hace que brille muchísimo y repele el agua y el polvo.', timeMin: 420 },
                    { id: 'eli5', name: 'Restauración Total', desc: '¡Para personas que lo quieren todo! Limpiamos y restauramos absolutamente cada rincón de tu carro.', timeMin: 900 }
                ]
            },
            {
                id: 'tab-extras',
                category: "Servicios Individuales",
                desc: "Puedes añadir estos servicios adicionales a tu lavado principal según lo que necesites.",
                isMain: false,
                items: [
                    { id: 'ind1', name: 'Motor a Vapor', desc: 'Quitamos la grasa del motor usando vapor seguro para no dañar los cables ni la computadora.', timeMin: 150 },
                    { id: 'ind2', name: 'Chasis + Grafito', desc: 'Lavamos el carro por debajo y aplicamos un protector que evita que se oxide.', timeMin: 150 },
                    { id: 'ind3', name: 'Limpieza de Piso', desc: 'Lavamos la alfombra a profundidad para sacar manchas y malos olores.', timeMin: 360 },
                    { id: 'ind4', name: 'Limpieza de Cojinería', desc: 'Desmanchamos los asientos (tela o cuero) para que recuperen su color original.', timeMin: 360 },
                    { id: 'ind5', name: 'Limpieza de Techo', desc: 'Limpiamos el techo por dentro para quitar polvo, olores o marcas de manos.', timeMin: 240 },
                    { id: 'ind6', name: 'Desmanche Farolas', desc: 'Pulimos las luces delanteras opacas para que queden transparentes y alumbren mejor.', timeMin: 120 },
                    { id: 'ind7', name: 'Desmanche Motor', desc: 'Limpieza extrema para motores muy sucios, devolviéndoles su apariencia de fábrica.', timeMin: 240 },
                    { id: 'ind8', name: 'Desmanche Chasis', desc: 'Limpieza profunda por debajo del carro. Ideal si has viajado por caminos de tierra.', timeMin: 240 }
                ]
            }
        ];

        this.cart = new Map();
    }

    init() {
        this.renderTabs();
        this.renderForm();
        this.bindEvents();
        this.updateSummary();
    }

    renderTabs() {
        let buttonsHtml = '';
        this.catalogData.forEach((group, index) => {
            const isActive = index === 0 ? 'active' : '';
            buttonsHtml += `<button type="button" class="tab-btn ${isActive}" data-target="${group.id}">${group.category}</button>`;
        });
        this.tabsContainer.innerHTML = buttonsHtml;
    }

    renderForm() {
        let html = '';
        this.catalogData.forEach((group, index) => {
            const isActive = index === 0 ? 'active' : '';
            html += `<div class="tab-content ${isActive}" id="${group.id}">
                        <p class="tab-description">${group.desc}</p>
                        <div class="options-grid">`;

            group.items.forEach(item => {
                const timeStr = this.formatTime(item.timeMin);
                let optionsHtml = '';

                if (item.options) {
                    optionsHtml = `
                        <div class="sub-options-container" id="sub-${item.id}">
                            <div class="sub-options-title">
                                <i class="fas fa-hand-pointer"></i> Elige una o más opciones:
                            </div>
                            <div class="sub-options-grid">
                                ${item.options.map((opt) => `
                                    <label class="sub-option-label" data-parent="${item.id}">
                                        <input type="checkbox" class="sub-checkbox" value="${opt.name}" data-timeadd="${opt.timeAdd}" data-parent="${item.id}">
                                        <span class="custom-checkbox"></span> 
                                        ${opt.name} 
                                        <small style="color:var(--text-muted)">(+${this.formatTime(opt.timeAdd)})</small>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }

                html += `
                    <div class="package-card" id="card-${item.id}">
                        <label class="package-header" for="${item.id}">
                            <div class="package-title-area">
                                <input type="checkbox" class="main-checkbox" id="${item.id}" value="${item.id}" 
                                       data-name="${item.name}" data-time="${item.timeMin}" 
                                       data-max="${item.maxChoices || 0}" data-ismain="${group.isMain}">
                                <span class="custom-checkbox"></span>
                                <span class="package-name">${item.name}</span>
                            </div>
                            <span class="package-time"><i class="far fa-clock"></i> <span id="time-display-${item.id}">${timeStr}</span></span>
                        </label>
                        <p class="package-desc">${item.desc}</p>
                        ${optionsHtml}
                    </div>
                `;
            });
            html += `</div></div>`;
        });
        this.form.innerHTML = html;
    }

    bindEvents() {
        this.tabsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

                e.target.classList.add('active');
                document.getElementById(e.target.dataset.target).classList.add('active');
            }
        });

        this.form.addEventListener('change', (e) => {
            if (e.target.classList.contains('main-checkbox')) {
                this.handleMainCheckbox(e.target);
            } else if (e.target.classList.contains('sub-checkbox')) {
                this.handleSubCheckbox(e.target);
            }
        });

        this.btnCheckout.addEventListener('click', () => this.sendWhatsApp());
    }

    handleMainCheckbox(checkbox) {
        const id = checkbox.value;
        const isMain = checkbox.dataset.ismain === 'true';

        if (checkbox.checked) {
            if (isMain) {
                for (let [existingId, existingItem] of this.cart.entries()) {
                    if (existingItem.isMain && existingId !== id) {
                        this.removeServiceUI(existingId);
                        this.cart.delete(existingId);
                    }
                }
            }

            const card = document.getElementById(`card-${id}`);
            const subContainer = document.getElementById(`sub-${id}`);

            card.classList.add('active');
            this.cart.set(id, {
                name: checkbox.dataset.name,
                baseTime: parseInt(checkbox.dataset.time), // Guardamos el tiempo base original
                maxChoices: parseInt(checkbox.dataset.max),
                isMain: isMain,
                selectedOptions: []
            });

            if (subContainer) subContainer.classList.add('visible');

        } else {
            this.removeServiceUI(id);
            this.cart.delete(id);
        }

        this.updateCardTimeDisplay(id);
        this.updateSummary();
    }

    handleSubCheckbox(subCheckbox) {
        const parentId = subCheckbox.dataset.parent;
        const item = this.cart.get(parentId);

        if (!item) {
            subCheckbox.checked = false;
            return;
        }

        const optionName = subCheckbox.value;
        const timeAdd = parseInt(subCheckbox.dataset.timeadd);

        if (subCheckbox.checked) {
            if (item.selectedOptions.length < item.maxChoices) {
                // Ahora guardamos el nombre y el tiempo adicional que aporta
                item.selectedOptions.push({ name: optionName, timeAdd: timeAdd });
            } else {
                subCheckbox.checked = false;
                if (navigator.vibrate) navigator.vibrate(50);
            }
        } else {
            item.selectedOptions = item.selectedOptions.filter(opt => opt.name !== optionName);
        }

        this.updateSubCheckboxesUI(parentId);
        this.updateCardTimeDisplay(parentId); // Actualiza el tiempo interno de la tarjeta
        this.updateSummary(); // Actualiza el tiempo total flotante
    }

    removeServiceUI(id) {
        const checkbox = document.getElementById(id);
        const card = document.getElementById(`card-${id}`);
        const subContainer = document.getElementById(`sub-${id}`);

        if (checkbox) checkbox.checked = false;
        if (card) card.classList.remove('active');

        if (subContainer) {
            subContainer.classList.remove('visible');
            subContainer.querySelectorAll('.sub-checkbox').forEach(sub => sub.checked = false);
            this.updateSubCheckboxesUI(id);
        }

        this.updateCardTimeDisplay(id, true);
    }

    updateSubCheckboxesUI(parentId) {
        const item = this.cart.get(parentId);
        const subContainer = document.getElementById(`sub-${parentId}`);
        if (!subContainer || !item) return;

        const limitReached = item.selectedOptions.length >= item.maxChoices;
        const labels = subContainer.querySelectorAll('.sub-option-label');

        labels.forEach(label => {
            const checkbox = label.querySelector('.sub-checkbox');
            if (!checkbox.checked && limitReached) {
                label.classList.add('disabled');
            } else {
                label.classList.remove('disabled');
            }
        });
    }

    // Nuevo método: Actualiza el tiempo directamente en la esquina de la tarjeta
    updateCardTimeDisplay(id, forceReset = false) {
        const timeDisplay = document.getElementById(`time-display-${id}`);
        if (!timeDisplay) return;

        if (forceReset) {
            const mainCheckbox = document.getElementById(id);
            if (mainCheckbox) timeDisplay.textContent = this.formatTime(parseInt(mainCheckbox.dataset.time));
            return;
        }

        const item = this.cart.get(id);
        if (item) {
            let currentItemTime = item.baseTime;
            item.selectedOptions.forEach(opt => currentItemTime += opt.timeAdd);
            timeDisplay.textContent = this.formatTime(currentItemTime);
        }
    }

    // Método corregido: Suma el tiempo base de las tarjetas + el de las sub-opciones
    updateSummary() {
        let totalMin = 0;
        this.cart.forEach(service => {
            totalMin += service.baseTime;
            service.selectedOptions.forEach(opt => totalMin += opt.timeAdd);
        });

        this.timeDisplay.textContent = this.formatTime(totalMin);
        this.btnCheckout.disabled = this.cart.size === 0;
    }

    formatTime(minutes) {
        if (minutes === 0) return '0h 0min';
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h > 0 ? h + 'h' : ''} ${m > 0 ? m + 'min' : ''}`.trim();
    }

    sendWhatsApp() {
        let msg = `Hola *Dakar Spa Automotriz*. Quiero agendar la siguiente limpieza para mi vehículo:\n\n`;

        const mainServices = [];
        const extraServices = [];

        this.cart.forEach((service) => {
            let srt = `✅ *${service.name}*\n`;
            if (service.selectedOptions.length > 0) {
                const optNames = service.selectedOptions.map(o => o.name);
                srt += `   ↳ _Opciones añadidas:_ ${optNames.join(', ')}\n`;
            } else if (service.maxChoices > 0) {
                srt += `   ↳ _(Opciones a definir en el local)_\n`;
            }
            service.isMain ? mainServices.push(srt) : extraServices.push(srt);
        });

        if (mainServices.length > 0) {
            msg += `🚘 *Nivel de Limpieza Principal:*\n${mainServices.join('')}\n`;
        }
        if (extraServices.length > 0) {
            msg += `➕ *Servicios Individuales:*\n${extraServices.join('')}\n`;
        }

        msg += `⏱ *Tiempo estimado total:* ${this.timeDisplay.textContent}\n`;
        msg += `\n¡Quedo atento para coordinar la cita!`;

        const url = `https://wa.me/${this.phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    }
}