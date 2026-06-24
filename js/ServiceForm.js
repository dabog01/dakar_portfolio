class ServiceForm {
    constructor(formId, timeDisplayId, btnId) {
        this.form = document.getElementById(formId);
        this.timeDisplay = document.getElementById(timeDisplayId);
        this.btnCheckout = document.getElementById(btnId);
        this.phone = "573017841673"; 
        
        // Base de Datos Estructurada (Catálogo Completo)
        this.catalogData = [
            {
                category: "Línea Básico",
                singleSelection: true, 
                items: [
                    { id: 'bas1', name: 'Básico Nivel I - Limpieza Express', desc: 'Lavado exterior con shampoo pH neutro, aspirado simple y glicerina en llantas.', timeMin: 60 },
                    { id: 'bas2', name: 'Básico Nivel II - Limpieza Estándar', desc: 'Lavado exterior e interior. Incluye aspirado general y polichado manual con cera básica.', timeMin: 90 },
                    { id: 'bas3', name: 'Básico Nivel III - Detalle Ligero', desc: 'Incluye aspirado profundo, polichado hidrofóbico y restaurador de plásticos.', timeMin: 120 }
                ]
            },
            {
                category: "Línea Dakar Pro",
                singleSelection: true, 
                items: [
                    { id: 'pro1', name: 'Pro Nivel I - Lavado Personalizado', desc: 'Limpieza exterior e interior. Selecciona 1 opción de intervención.', timeMin: 150, maxChoices: 1, options: ['Motor a Vapor', 'Chasis + Grafito', 'Polichado Manual'] },
                    { id: 'pro2', name: 'Pro Nivel II - Personalizado 2 en 1', desc: 'Lavado integral con 2 tratamientos especializados a elegir.', timeMin: 180, maxChoices: 2, options: ['Motor a Vapor', 'Chasis + Grafito', 'Polichado Manual'] },
                    { id: 'pro3', name: 'Pro Nivel III - Personalizado Total', desc: 'Limpieza Estándar, Motor a Vapor, Chasis Grafitado y Polichado básico.', timeMin: 210 },
                    { id: 'pro4', name: 'Pro Nivel IV - Especializado a Detalle', desc: 'Lavado Detallado, Motor, Chasis, Polichado hidrofóbico y Restaurador.', timeMin: 240 },
                    { id: 'proPol1', name: 'Pro Polichado Nivel I - Brillo', desc: 'Máquina orbital y 1 capa de cera premium. Reaviva el color.', timeMin: 180 },
                    { id: 'proPol2', name: 'Pro Polichado Nivel II - Brillo + Protección', desc: 'Máquina orbital con 2 capas de cera para brillo y protección.', timeMin: 120 },
                    { id: 'proPol3', name: 'Pro Polichado Nivel III - Brillo, Prot. y Duración', desc: 'Tres capas de cera aplicado con máquinas orbital y rotorbital.', timeMin: 300 }
                ]
            },
            {
                category: "Línea Elite & Profesional",
                singleSelection: true, 
                items: [
                    { id: 'eli1', name: 'Elite Nivel I - Interior a tu Medida', desc: 'Detalla el tablero, puertas, consola, vidrios y 1 zona profunda a elección.', timeMin: 150, maxChoices: 1, options: ['Piso', 'Techo', 'Cojinería'] },
                    { id: 'eli2', name: 'Elite Nivel II - Duo Interior', desc: 'Lavado detallado escogiendo 2 zonas de limpieza profunda del interior.', timeMin: 300, maxChoices: 2, options: ['Piso', 'Techo', 'Cojinería'] },
                    { id: 'eli3', name: 'Prof. Nivel III - Interior Completo', desc: 'Perfecto para vehículos que necesitan un tratamiento completo por dentro.', timeMin: 360 },
                    { id: 'eli4', name: 'Profundidad (Ext + Int)', desc: 'Protección exterior profunda y 1 zona interior premium a elección.', timeMin: 420, maxChoices: 1, options: ['Piso', 'Techo', 'Cojinería'] },
                    { id: 'eli5', name: 'Elite Nivel V - Exterior + Duo Interior', desc: 'Estética exterior impecable y 2 opciones de limpieza interior profunda.', timeMin: 510, maxChoices: 2, options: ['Piso', 'Techo', 'Cojinería'] },
                    { id: 'eli6', name: 'Elite Nivel VI - Exterior + Interior Completo', desc: '¡De adentro hacia afuera! Ideal para lucir en eventos o ventas.', timeMin: 210 },
                    { id: 'eli7', name: 'Elite Nivel VII - Rest. a tu Medida', desc: 'Renueva componentes críticos. Elige entre desmanche de motor o chasis.', timeMin: 720, maxChoices: 1, options: ['Desmanche Motor', 'Desmanche Chasis'] },
                    { id: 'eli8', name: 'Elite Nivel VIII - Duo Restauración', desc: 'Renovación total. Detalle interior, exterior, motor y chasis.', timeMin: 900 },
                    { id: 'eli9', name: 'Elite Nivel IX - Porcelanizado', desc: 'Capa protectora sobre la pintura que protege del clima diario.', timeMin: 420 },
                    { id: 'eli10', name: 'Elite Nivel X - Restauración Total', desc: '¡Para personas que lo quieren todo! Nada se queda atrás.', timeMin: 900 }
                ]
            },
            {
                category: "Servicios Individuales",
                singleSelection: false, 
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
        this.renderForm();
        this.bindEvents();
        this.updateSummary();
    }

    renderForm() {
        let html = '';
        this.catalogData.forEach(group => {
            html += `<div class="category-group" data-single="${group.singleSelection}">
                        <h3 class="category-title">${group.category}</h3>
                        <div class="options-grid">`;
            
            group.items.forEach(item => {
                const timeStr = this.formatTime(item.timeMin);
                let optionsHtml = '';

                if (item.options) {
                    optionsHtml = `
                        <div class="sub-options-container" id="sub-${item.id}">
                            <div class="sub-options-title">
                                <i class="fas fa-hand-pointer"></i> ¡Tu eliges! Selecciona ${item.maxChoices}:
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
                                       data-max="${item.maxChoices || 0}" data-category="${group.category}">
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
        const categoryName = checkbox.dataset.category;
        const categoryGroup = this.catalogData.find(c => c.category === categoryName);
        const isSingleSelection = categoryGroup ? categoryGroup.singleSelection : false;

        if (checkbox.checked) {
            // Lógica Exclusividad: Desmarca los anteriores de la misma familia
            if (isSingleSelection) {
                for (let [existingId, existingItem] of this.cart.entries()) {
                    if (existingItem.category === categoryName && existingId !== id) {
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
                category: categoryName,
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
                // Pequeño feedback táctil si excede el límite
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
            this.updateSubCheckboxesUI(id); // Resetea las clases de disabled
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
        let msg = `Hola *Dakar Spa Automotriz*. Quiero agendar una cotización para mi vehículo con los siguientes servicios:\n\n`;
        
        this.cart.forEach((service) => {
            msg += `✅ *${service.name}*\n`;
            if (service.selectedOptions.length > 0) {
                msg += `   ↳ _Elecciones:_ ${service.selectedOptions.join(', ')}\n`;
            } else if (service.maxChoices > 0) {
                msg += `   ↳ _(Opciones pendientes por definir en el local)_\n`;
            }
        });

        msg += `\n⏱ *Tiempo estimado:* ${this.timeDisplay.textContent}\n`;
        msg += `\n¡Quedo atento a disponibilidad!`;

        const url = `https://wa.me/${this.phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    }
}