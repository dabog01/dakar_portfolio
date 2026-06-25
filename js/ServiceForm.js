class ServiceForm {
    constructor(formId, timeDisplayId, btnId) {
        this.form = document.getElementById(formId);
        this.timeDisplay = document.getElementById(timeDisplayId);
        this.btnCheckout = document.getElementById(btnId);
        this.tabsContainer = document.getElementById('tabs-container');
        this.phone = "573017841673"; 
        
        // Base de Datos: Orientada a "Niveles de Limpieza" para mayor entendimiento
        this.catalogData = [
            {
                id: 'tab-basica',
                category: "Limpieza Básica",
                desc: "Mantenimiento regular ideal para conservar el buen aspecto de vehículos sin suciedad extrema.",
                isMain: true, // REGLA: Solo se puede elegir 1 servicio principal en todo el cotizador
                items: [
                    { id: 'bas1', name: 'Limpieza Express', desc: 'Lavado exterior con shampoo pH neutro, aspirado simple y glicerina en llantas.', timeMin: 60 },
                    { id: 'bas2', name: 'Limpieza Estándar', desc: 'Lavado exterior e interior. Incluye aspirado general y polichado manual con cera básica.', timeMin: 90 },
                    { id: 'bas3', name: 'Limpieza Detallada', desc: 'Aspirado profundo, polichado hidrofóbico y restaurador de plásticos.', timeMin: 120 }
                ]
            },
            {
                id: 'tab-intermedia',
                category: "Limpieza Intermedia",
                desc: "Mayor atención al detalle y personalización. Tratamientos de brillo y desmanche.",
                isMain: true,
                items: [
                    { id: 'pro1', name: 'Limpieza de Componentes Críticos', desc: 'Lavado integral y puedes elegir servicios de limpieza exterior especificos (motor, chasis, polichado).', timeMin: 180, maxChoices: 3, options: ['Motor a Vapor', 'Chasis + Grafito', 'Polichado Manual'] },
                    { id: 'proPol1', name: 'Polichado con 1 Cera', desc: 'Máquina orbital y 1 capa de cera premium. Reaviva el color original.', timeMin: 180 },
                    { id: 'proPol2', name: 'Polichado con 2 Ceras', desc: 'Máquina orbital con 2 capas de cera especializada.', timeMin: 120 },
                    { id: 'proPol3', name: 'Polichado con 3 Ceras', desc: 'Tres capas de cera aplicado con máquinas orbital y rotorbital.', timeMin: 300 }
                ]
            },
            {
                id: 'tab-profunda',
                category: "Limpieza Profunda",
                desc: "Para clientes exigentes. Restauración, porcelanizado y cuidado al milímetro por dentro y por fuera.",
                isMain: true,
                items: [
                    { id: 'eli1', name: 'Limpieza Profunda de Exterior + Interior', desc: 'Estética exterior impecable y opciones de limpieza interior profunda.', timeMin: 510, maxChoices: 3, options: ['Piso', 'Techo', 'Cojinería'] },
                    { id: 'eli2', name: 'Restauración de Componentes Críticos', desc: 'Luce tu vehículo como nuevo! Con opción de desmanche de motor y/o chasis.', timeMin: 720, maxChoices: 2, options: ['Desmanche Motor', 'Desmanche Chasis'] },
                    { id: 'eli3', name: 'Duo Restauración', desc: 'Renovación total. Detalle interior, exterior, motor y chasis.', timeMin: 900 },
                    { id: 'eli4', name: 'Porcelanizado', desc: 'Capa protectora sobre la pintura que protege del sol y la lluvia.', timeMin: 420 },
                    { id: 'eli5', name: 'Restauración Total', desc: '¡Para personas que lo quieren todo! Nada se queda atrás.', timeMin: 900 }
                ]
            },
            {
                id: 'tab-extras',
                category: "Servicios Individuales",
                desc: "Puedes añadir múltiples de estos servicios a tu lavado principal según lo requieras.",
                isMain: false, // REGLA: El usuario puede marcar todos los extras que desee
                items: [
                    { id: 'ind1', name: 'Motor a Vapor', desc: 'Limpia el motor de forma segura con vapor a alta temperatura.', timeMin: 150 },
                    { id: 'ind2', name: 'Chasis + Grafito', desc: 'Recubrimiento protector que previene óxido y corrosión.', timeMin: 150 },
                    { id: 'ind3', name: 'Limpieza de Piso', desc: 'Restaura eliminando manchas, malos olores y suciedad.', timeMin: 360 },
                    { id: 'ind4', name: 'Limpieza de Cojinería', desc: 'Devuelve higiene usando cepillos, vapor y aspiradoras.', timeMin: 360 },
                    { id: 'ind5', name: 'Limpieza de Techo', desc: 'Uso de tornador y productos biodegradables.', timeMin: 240 },
                    { id: 'ind6', name: 'Desmanche Farolas', desc: 'Disminuye desgaste brindando mayor visibilidad nocturna.', timeMin: 120 },
                    { id: 'ind7', name: 'Desmanche Motor', desc: 'Devuelve la apariencia original al motor de tu vehículo.', timeMin: 240 },
                    { id: 'ind8', name: 'Desmanche Chasis', desc: 'Previene corrosión. Ideal para terrenos difíciles.', timeMin: 240 }
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
                                <i class="fas fa-hand-pointer"></i> Personaliza (Elige ${item.maxChoices}):
                            </div>
                            <div class="sub-options-grid">
                                ${item.options.map((opt) => `
                                    <label class="sub-option-label" data-parent="${item.id}">
                                        <input type="checkbox" class="sub-checkbox" value="${opt}" data-parent="${item.id}">
                                        <span class="custom-checkbox"></span> ${opt}
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
                            <span class="package-time"><i class="far fa-clock"></i> ${timeStr}</span>
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
        // Lógica de navegación de pestañas
        this.tabsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                // Quitar activo a todos
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                
                // Activar el seleccionado
                e.target.classList.add('active');
                document.getElementById(e.target.dataset.target).classList.add('active');
            }
        });

        // Lógica de checkboxes
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
        const isMain = checkbox.dataset.ismain === 'true'; // string to boolean

        if (checkbox.checked) {
            // REGLA MAESTRA: Si el servicio marcado es un "Servicio Principal" (Básico, Intermedio o Profundo),
            // debemos desmarcar cualquier otro servicio principal en el carrito para evitar conflictos.
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
                timeMin: parseInt(checkbox.dataset.time),
                maxChoices: parseInt(checkbox.dataset.max),
                isMain: isMain,
                selectedOptions: []
            });
            
            if (subContainer) subContainer.classList.add('visible');

        } else {
            this.removeServiceUI(id);
            this.cart.delete(id);
        }
        
        this.updateSummary();
    }

    handleSubCheckbox(subCheckbox) {
        const parentId = subCheckbox.dataset.parent;
        const item = this.cart.get(parentId);
        
        if (!item) {
            subCheckbox.checked = false;
            return;
        }

        if (subCheckbox.checked) {
            if (item.selectedOptions.length < item.maxChoices) {
                item.selectedOptions.push(subCheckbox.value);
            } else {
                subCheckbox.checked = false;
                if (navigator.vibrate) navigator.vibrate(50); 
            }
        } else {
            item.selectedOptions = item.selectedOptions.filter(opt => opt !== subCheckbox.value);
        }
        this.updateSubCheckboxesUI(parentId);
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

    updateSummary() {
        let totalMin = 0;
        this.cart.forEach(service => { totalMin += service.timeMin; });
        
        this.timeDisplay.textContent = this.formatTime(totalMin);
        this.btnCheckout.disabled = this.cart.size === 0;
    }

    formatTime(minutes) {
        if(minutes === 0) return '0h 0min';
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h > 0 ? h + 'h' : ''} ${m > 0 ? m + 'min' : ''}`.trim();
    }

    sendWhatsApp() {
        let msg = `Hola *Dakar Spa Automotriz*. Quiero agendar la siguiente limpieza para mi vehículo:\n\n`;
        
        // Separamos en el mensaje qué es principal y qué son extras
        const mainServices = [];
        const extraServices = [];

        this.cart.forEach((service) => {
            let srt = `✅ *${service.name}*\n`;
            if (service.selectedOptions.length > 0) {
                srt += `   ↳ _Filtros:_ ${service.selectedOptions.join(', ')}\n`;
            } else if (service.maxChoices > 0) {
                srt += `   ↳ _(Opciones a definir en el local)_\n`;
            }
            service.isMain ? mainServices.push(srt) : extraServices.push(srt);
        });

        if (mainServices.length > 0) {
            msg += `🚘 *Nivel de Limpieza Principal:*\n${mainServices.join('')}\n`;
        }
        if (extraServices.length > 0) {
            msg += `➕ *Servicios Extras (Adicionales):*\n${extraServices.join('')}\n`;
        }

        msg += `⏱ *Tiempo estimado:* ${this.timeDisplay.textContent}\n`;
        msg += `\n¡Quedo atento para coordinar la cita!`;

        const url = `https://wa.me/${this.phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    }
}