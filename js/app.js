/* ==========================================================================
   KOLAY FORM - JAVASCRIPT MOTORU (ES6)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. STATE & LOCALSTORAGE YÖNETİMİ
    // ==========================================
    let state = {
        companies: [],
        forms: [],
        settings: {
            defaultKdv: 20,
            currency: '₺',
            lang: 'tr'
        },
        activeCompanyId: null,
        currentEditingForm: null // null (yeni form) veya form nesnesi (düzenleme)
    };

    // Toplu PDF üretimi sırasında A4 ölçek (zoom) transform'unu bastırmak için bayrak
    let suppressA4Fit = false;

    // Verileri LocalStorage'dan yükle
    function loadState() {
        const storedCompanies = localStorage.getItem('kolayform_companies');
        const storedForms = localStorage.getItem('kolayform_forms');
        const storedSettings = localStorage.getItem('kolayform_settings');
        const storedActiveComp = localStorage.getItem('kolayform_active_comp');

        if (storedCompanies) state.companies = JSON.parse(storedCompanies);
        if (storedForms) state.forms = JSON.parse(storedForms);
        
        if (storedSettings) {
            state.settings = JSON.parse(storedSettings);
            if (state.settings.isPremium === undefined) {
                state.settings.isPremium = false;
            }
            if (state.settings.enableQr === undefined) {
                state.settings.enableQr = true;
            }
        } else {
            state.settings = {
                defaultKdv: 20,
                currency: '₺',
                lang: 'tr',
                isPremium: false,
                enableQr: true
            };
        }
        
        if (storedActiveComp) state.activeCompanyId = storedActiveComp;

        // Varsayılan şirket seçimi (aktif şirket yoksa ve şirket varsa ilkini seç)
        if (!state.activeCompanyId && state.companies.length > 0) {
            state.activeCompanyId = state.companies[0].id;
            localStorage.setItem('kolayform_active_comp', state.activeCompanyId);
        }
    }

    // Değişiklikleri kaydet
    function saveCompanies() {
        localStorage.setItem('kolayform_companies', JSON.stringify(state.companies));
    }

    function saveForms() {
        localStorage.setItem('kolayform_forms', JSON.stringify(state.forms));
    }

    function saveSettings() {
        localStorage.setItem('kolayform_settings', JSON.stringify(state.settings));
    }

    function setActiveCompany(id) {
        state.activeCompanyId = id;
        localStorage.setItem('kolayform_active_comp', id);
        renderCompanyCards();
        updateFilterSelectors();
    }

    // ==========================================
    // 1A. ADSERVICE & PURCHASESERVICE (REKLAM & PREMİUM ENTEGRASYONU)
    // ==========================================
    const AdService = {
        isInitialized: false,
        admob: null,

        async init() {
            if (this.isInitialized) return;
            const isNative = window.Capacitor && window.Capacitor.isNativePlatform();
            if (isNative) {
                try {
                    if (window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob) {
                        this.admob = window.Capacitor.Plugins.AdMob;
                        await this.admob.initialize({
                            requestTrackingAuthorization: true,
                            initializeForTesting: true
                        });
                        this.isInitialized = true;
                        console.log("AdMob native initialized successfully.");
                    }
                } catch (err) {
                    console.error("AdMob native initialization failed:", err);
                }
            } else {
                console.log("AdMob runs in browser simulation mode.");
            }
        },

        async showRewardedAd(onRewardCallback) {
            if (state.settings.isPremium) {
                if (onRewardCallback) onRewardCallback();
                return;
            }

            const isNative = window.Capacitor && window.Capacitor.isNativePlatform();
            if (isNative && this.admob) {
                try {
                    const adId = 'ca-app-pub-3940256099942544/5224354917'; // Android Test Rewarded ID
                    
                    await this.admob.prepareRewarded({
                        adId: adId,
                        clearPriorAd: true
                    });

                    let rewardedListener = await this.admob.addListener('onAdReward', (info) => {
                        console.log("AdMob Reward Earned:", info);
                        rewardedListener.remove();
                        if (onRewardCallback) onRewardCallback();
                    });

                    await this.admob.showRewarded();
                    return;
                } catch (err) {
                    console.error("Native ad play failed, falling back to simulation:", err);
                }
            }

            this.showBrowserAdSimulation(onRewardCallback);
        },

        showBrowserAdSimulation(onRewardCallback) {
            const adModal = document.getElementById('modal-ad-simulation');
            const counterEl = document.getElementById('ad-sim-counter');
            const progressBar = document.getElementById('ad-sim-progress-bar');
            
            adModal.classList.remove('hidden');
            
            let timeLeft = 5;
            counterEl.textContent = timeLeft;
            progressBar.style.strokeDashoffset = '283';
            
            setTimeout(() => {
                progressBar.style.strokeDashoffset = '0';
            }, 50);

            const interval = setInterval(() => {
                timeLeft--;
                counterEl.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    adModal.classList.add('hidden');
                    if (onRewardCallback) onRewardCallback();
                }
            }, 1000);
        }
    };

    const PurchaseService = {
        activePlan: null,

        async init() {
            console.log("PurchaseService initialized.");
        },

        buyPlan(planId, priceString) {
            this.activePlan = { planId, priceString };
            
            let planName = 'Premium Yıllık Paket';
            if (planId === 'monthly') planName = 'Premium Aylık Paket';
            else if (planId === 'enterprise') planName = 'Kurumsal / Sınırsız Paket';

            document.getElementById('iap-sim-plan-name').textContent = planName;
            document.getElementById('iap-sim-plan-price').textContent = priceString;

            document.getElementById('modal-iap-simulation').classList.remove('hidden');
        },

        confirmPayment() {
            document.getElementById('modal-iap-simulation').classList.add('hidden');
            document.getElementById('modal-premium').classList.add('hidden');
            
            state.settings.isPremium = true;
            state.settings.enableQr = true;
            saveSettings();
            updatePremiumUI();
            
            alert("Tebrikler! Satın alma işlemi başarıyla gerçekleşti ve Premium özellikler tanımlandı.");
            
            this.activePlan = null;
        }
    };

    function updatePremiumUI() {
        const premiumBtn = document.getElementById('btn-go-premium');
        const settingsStatus = document.getElementById('settings-premium-status');
        const settingsPremiumBtn = document.getElementById('btn-settings-premium');
        
        if (state.settings.isPremium) {
            if (premiumBtn) {
                premiumBtn.innerHTML = '<span>👑 Premium</span>';
                premiumBtn.classList.add('is-active-premium');
                premiumBtn.title = 'Premium Üyesiniz';
            }
            if (settingsStatus) {
                settingsStatus.textContent = 'Premium Üye (Reklamsız)';
                settingsStatus.style.color = '#fbbf24';
            }
            if (settingsPremiumBtn) {
                settingsPremiumBtn.style.display = 'none';
            }
        } else {
            if (premiumBtn) {
                premiumBtn.innerHTML = '<span>👑</span>';
                premiumBtn.classList.remove('is-active-premium');
                premiumBtn.title = "Premium'a Geç";
            }
            if (settingsStatus) {
                settingsStatus.textContent = 'Standart Üye (Reklamlı)';
                settingsStatus.style.color = 'var(--text-main)';
            }
            if (settingsPremiumBtn) {
                settingsPremiumBtn.style.display = 'block';
            }
        }
    }

    function checkAndIncrementDownloadLimit() {
        if (state.settings.isPremium) {
            return true;
        }
        
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        
        let downloadData = localStorage.getItem('kolayform_free_downloads');
        let data = { firstDownloadTime: 0, count: 0 };
        
        if (downloadData) {
            try {
                data = JSON.parse(downloadData);
            } catch (e) {
                console.error("Download limit parse error:", e);
            }
        }
        
        // Eger ilk indirmeden itibaren 24 saat gectiyse haklari sıfırla
        if (data.firstDownloadTime && (now - data.firstDownloadTime >= oneDay)) {
            data.count = 0;
            data.firstDownloadTime = 0;
        }
        
        if (data.count >= 3) {
            showFreeLimitReachedModal(data.firstDownloadTime);
            return false;
        }
        
        data.count++;
        if (data.count === 1) {
            data.firstDownloadTime = now;
        }
        
        localStorage.setItem('kolayform_free_downloads', JSON.stringify(data));
        return true;
    }

    function showFreeLimitReachedModal(firstDownloadTime) {
        let alertBanner = document.getElementById('premium-limit-alert');
        if (!alertBanner) {
            alertBanner = document.createElement('div');
            alertBanner.id = 'premium-limit-alert';
            alertBanner.style.background = 'rgba(239, 68, 68, 0.2)';
            alertBanner.style.border = '1px solid #ef4444';
            alertBanner.style.color = '#fca5a5';
            alertBanner.style.padding = '12px';
            alertBanner.style.borderRadius = '8px';
            alertBanner.style.marginBottom = '15px';
            alertBanner.style.fontWeight = '600';
            alertBanner.style.textAlign = 'center';
            alertBanner.style.fontSize = '0.9rem';
            alertBanner.style.lineHeight = '1.4';
            
            const modalBody = document.querySelector('#modal-premium .modal-body');
            if (modalBody) {
                modalBody.insertBefore(alertBanner, modalBody.firstChild);
            }
        }
        
        // Geri sayım baslat
        if (window.limitCountdownInterval) {
            clearInterval(window.limitCountdownInterval);
        }
        
        function formatCountdown(ms) {
            const totalSecs = Math.floor(ms / 1000);
            const hours = String(Math.floor(totalSecs / 3600)).padStart(2, '0');
            const mins = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
            const secs = String(totalSecs % 60).padStart(2, '0');
            return `${hours}:${mins}:${secs}`;
        }
        
        const updateCountdownText = () => {
            const remaining = Math.max(0, (firstDownloadTime + 24 * 60 * 60 * 1000) - Date.now());
            alertBanner.innerHTML = `
                ⚠️ Günlük 3 adet ücretsiz PDF indirme limitinizi doldurdunuz.<br>
                Yeni haklar için kalan süre: <strong id="download-limit-countdown" style="color: #fbbf24; font-family: monospace; font-size: 1rem;">${formatCountdown(remaining)}</strong><br>
                Sınırsız indirme yapmak için Premium pakete geçin.
            `;
            if (remaining <= 0) {
                clearInterval(window.limitCountdownInterval);
                alertBanner.style.display = 'none';
            }
        };
        
        updateCountdownText();
        window.limitCountdownInterval = setInterval(updateCountdownText, 1000);
        
        alertBanner.style.display = 'block';
        document.getElementById('modal-premium').classList.remove('hidden');
    }

    function requireAdOrPremium(onConfirmAction) {
        if (state.settings.isPremium) {
            onConfirmAction();
            return;
        }
        
        // Free user download limit check
        if (!checkAndIncrementDownloadLimit()) {
            return;
        }
        
        const adPromptModal = document.getElementById('modal-ad-prompt');
        adPromptModal.classList.remove('hidden');
        
        document.getElementById('btn-ad-prompt-watch').onclick = () => {
            adPromptModal.classList.add('hidden');
            AdService.showRewardedAd(onConfirmAction);
        };
        
        document.getElementById('btn-ad-prompt-premium').onclick = () => {
            adPromptModal.classList.add('hidden');
            document.getElementById('modal-premium').classList.remove('hidden');
        };
    }

    // ==========================================
    // 2. NAVİGASYON YÖNETİCİSİ (VIEW MANAGER)
    // ==========================================
    const views = {
        dashboard: document.getElementById('dashboard-view'),
        companyEdit: document.getElementById('company-edit-view'),
        serviceEditor: document.getElementById('service-form-view'),
        quoteEditor: document.getElementById('quote-form-view')
    };

    function showView(viewName) {
        Object.keys(views).forEach(key => {
            if (key === viewName) {
                views[key].classList.remove('hidden');
            } else {
                views[key].classList.add('hidden');
            }
        });
        window.scrollTo(0, 0);
    }

    // SPLASH SCREEN GEÇİŞİ
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        const app = document.getElementById('app-container');
        
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.classList.add('hidden');
            app.classList.remove('hidden');
            
            // Verileri yükle ve UI'yı çiz
            loadState();
            initApp();
        }, 500);
    }, 1800);

    // ==========================================
    // 3. DOSYA YÜKLEME VE GÖRSEL SIKIŞTIRMA (CANVAS RESIZER)
    // ==========================================
    // Resmi max ~400px genişliğe sıkıştırıp Base64'e çevirir (Çözünürlük ve boyut kontrolü ile)
    function compressImage(file, maxWidth = 400, minWidthHeight = 150) {
        return new Promise((resolve, reject) => {
            if (!file || !file.type.startsWith('image/')) {
                reject(new Error("Lütfen geçerli bir görsel dosyası seçin."));
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    // Çözünürlük Kontrolü
                    if (img.width < minWidthHeight || img.height < minWidthHeight) {
                        reject(new Error(`Yüklenen görselin çözünürlüğü çok düşük (${img.width}x${img.height}px). Minimum ${minWidthHeight}x${minWidthHeight}px olmalıdır.`));
                        return;
                    }

                    // Boyutlandırma oranını hesapla
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > maxWidth) {
                        height = (maxWidth / width) * height;
                        width = maxWidth;
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // WebP veya JPEG olarak sıkıştırarak çıktı al
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.82);
                    resolve(compressedBase64);
                };
                img.onerror = () => reject(new Error("Görsel yüklenirken bir hata oluştu. Dosya bozuk veya geçersiz formatta olabilir."));
            };
            reader.onerror = () => reject(new Error("Dosya okunurken bir hata oluştu."));
        });
    }

    // Yükleme alanı önizleme güncelleme yardımcısı (Bubbling ve Çift Açılma Engelli)
    function setupDropZone(zoneId, inputId, previewId, stateField, companyObj, cropBtnId) {
        const zone = document.getElementById(zoneId);
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);
        const cropBtn = cropBtnId ? document.getElementById(cropBtnId) : null;

        // Kırp butonu: görsel varsa göster ve kırpma katmanını aç
        if (cropBtn) {
            if (companyObj[stateField]) cropBtn.classList.remove('hidden');
            else cropBtn.classList.add('hidden');
            cropBtn.onclick = () => {
                if (!companyObj[stateField]) return;
                openCropper(companyObj[stateField], (result) => {
                    companyObj[stateField] = result;
                    preview.innerHTML = `<img src="${result}" alt="Önizleme">`;
                });
            };
        }

        zone.onclick = (e) => {
            if (e.target !== input) {
                input.click();
            }
        };

        input.onclick = (e) => {
            e.stopPropagation(); // Dosya penceresinin iki kere açılmasını engeller
        };

        input.onchange = async (e) => {
            if (e.target.files.length > 0) {
                try {
                    const compressed = await compressImage(e.target.files[0]);
                    preview.innerHTML = `<img src="${compressed}" alt="Önizleme">`;
                    companyObj[stateField] = compressed;
                    if (cropBtn) cropBtn.classList.remove('hidden');
                } catch (err) {
                    console.error("Görsel yükleme hatası:", err);
                    alert(err.message || "Resim yüklenirken bir sorun oluştu.");
                }
                input.value = ''; // Aynı dosya tekrar seçildiğinde change tetiklenebilsin diye temizle
            }
        };
    }

    // Dinamik sertifika damgalarının state objesi
    let tempCertificates = [];

    function renderTempCertificates() {
        const container = document.getElementById('certs-container');
        container.innerHTML = '';

        tempCertificates.forEach((base64, index) => {
            const item = document.createElement('div');
            item.className = 'cert-upload-item';
            item.innerHTML = `
                <div class="cert-thumbnail">
                    <img src="${base64}" alt="Sertifika">
                </div>
                <span>Damga #${index + 1}</span>
                <button type="button" class="btn-crop-cert" data-index="${index}" title="Kırp / Düzelt">✂️</button>
                <button type="button" class="btn-remove-cert" data-index="${index}">❌</button>
            `;
            container.appendChild(item);
        });

        // Silme butonlarını bağla
        container.querySelectorAll('.btn-remove-cert').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                tempCertificates.splice(index, 1);
                renderTempCertificates();
            });
        });

        // Kırp butonlarını bağla
        container.querySelectorAll('.btn-crop-cert').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                openCropper(tempCertificates[index], (result) => {
                    tempCertificates[index] = result;
                    renderTempCertificates();
                });
            });
        });
    }

    // Sertifika damgası ekleme butonu
    document.getElementById('btn-add-cert').addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            if (e.target.files.length > 0) {
                try {
                    const compressed = await compressImage(e.target.files[0], 250); // Damgalar küçük olabilir
                    tempCertificates.push(compressed);
                    renderTempCertificates();
                } catch (err) {
                    console.error("Damga yükleme hatası:", err);
                    alert(err.message || "Resim yüklenirken bir sorun oluştu.");
                }
            }
        };
        input.click();
    });


    // ==========================================
    // 4. ŞİRKET EKLEME / DÜZENLEME EKRANI MANTIĞI
    // ==========================================
    let editingCompanyData = {};

    function openCompanyEditor(companyId = null) {
        editingCompanyData = {};
        tempCertificates = [];
        document.getElementById('company-form').reset();
        
        document.getElementById('preview-logo').innerHTML = '<span class="upload-placeholder">Logo Seç/Bırak</span>';
        document.getElementById('preview-stamp').innerHTML = '<span class="upload-placeholder">Kaşe Seç/Bırak</span>';
        document.getElementById('preview-sig').innerHTML = '<span class="upload-placeholder">İmza Yok</span>';
        document.getElementById('certs-container').innerHTML = '';

        if (companyId) {
            // Düzenleme Modu
            const comp = state.companies.find(c => c.id === companyId);
            if (comp) {
                editingCompanyData = { ...comp };
                tempCertificates = comp.stamps ? [...comp.stamps] : [];
                
                document.getElementById('company-view-title').textContent = "Şirketi Düzenle";
                document.getElementById('company-edit-id').value = comp.id;
                document.getElementById('company-name').value = comp.name;
                document.getElementById('company-phone').value = comp.phone || '';
                document.getElementById('company-email').value = comp.email || '';
                document.getElementById('company-website').value = comp.website || '';
                document.getElementById('company-taxoffice').value = comp.taxOffice || '';
                document.getElementById('company-taxnumber').value = comp.taxNumber || '';
                document.getElementById('company-mersis').value = comp.mersisNo || '';
                document.getElementById('company-address').value = comp.address || '';
                
                if (comp.logo) {
                    document.getElementById('preview-logo').innerHTML = `<img src="${comp.logo}" alt="Logo">`;
                }
                if (comp.stamp) {
                    document.getElementById('preview-stamp').innerHTML = `<img src="${comp.stamp}" alt="Kaşe">`;
                }
                if (comp.signature) {
                    document.getElementById('preview-sig').innerHTML = `<img src="${comp.signature}" alt="İmza">`;
                }
                
                renderTempCertificates();
                document.getElementById('btn-delete-company').classList.remove('hidden');
            }
        } else {
            // Yeni Ekleme Modu
            document.getElementById('company-view-title').textContent = "Şirket Ekle";
            document.getElementById('company-edit-id').value = '';
            document.getElementById('btn-delete-company').classList.add('hidden');
        }

        // Dropzone tetikleyicilerini bağla
        setupDropZone('zone-logo', 'input-logo', 'preview-logo', 'logo', editingCompanyData, 'btn-crop-logo');
        setupDropZone('zone-stamp', 'input-stamp', 'preview-stamp', 'stamp', editingCompanyData, 'btn-crop-stamp');
        setupDropZone('zone-sig', 'input-sig', 'preview-sig', 'signature', editingCompanyData, 'btn-crop-sig');

        showView('companyEdit');
    }

    // Şirket Form Kaydetme
    document.getElementById('company-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('company-edit-id').value;
        const name = document.getElementById('company-name').value.trim();

        if (!name) {
            alert("Lütfen şirket adını girin.");
            return;
        }

        const compData = {
            id: id || 'comp-' + Date.now(),
            name: name,
            phone: document.getElementById('company-phone').value.trim(),
            email: document.getElementById('company-email').value.trim(),
            website: document.getElementById('company-website').value.trim(),
            taxOffice: document.getElementById('company-taxoffice').value.trim(),
            taxNumber: document.getElementById('company-taxnumber').value.trim(),
            mersisNo: document.getElementById('company-mersis').value.trim(),
            address: document.getElementById('company-address').value.trim(),
            logo: editingCompanyData.logo || null,
            stamp: editingCompanyData.stamp || null,
            signature: editingCompanyData.signature || null,
            stamps: tempCertificates
        };

        if (id) {
            // Güncelle
            const idx = state.companies.findIndex(c => c.id === id);
            if (idx !== -1) state.companies[idx] = compData;
        } else {
            // Ekle
            state.companies.push(compData);
        }

        saveCompanies();
        
        // Aktif şirketi ayarla (hiç yoksa veya güncellenen aktifse)
        if (!state.activeCompanyId || state.activeCompanyId === id) {
            setActiveCompany(compData.id);
        } else {
            renderCompanyCards();
        }

        showView('dashboard');
    });

    // Varsayılan İmzayı Çiz Modalı Tetikle
    document.getElementById('btn-draw-default-sig').addEventListener('click', () => {
        openSignaturePad("Varsayılan Şirket İmzası Çiz", (drawnSigBase64) => {
            editingCompanyData.signature = drawnSigBase64;
            document.getElementById('preview-sig').innerHTML = `<img src="${drawnSigBase64}" alt="İmza">`;
            document.getElementById('btn-crop-sig').classList.remove('hidden');
        });
    });

    // Şirket Silme Butonu
    document.getElementById('btn-delete-company').addEventListener('click', () => {
        const id = document.getElementById('company-edit-id').value;
        if (id && confirm("Bu şirketi ve şirkete ait verileri silmek istediğinizden emin misiniz?")) {
            state.companies = state.companies.filter(c => c.id !== id);
            saveCompanies();
            
            if (state.activeCompanyId === id) {
                state.activeCompanyId = state.companies.length > 0 ? state.companies[0].id : null;
                localStorage.setItem('kolayform_active_comp', state.activeCompanyId || '');
            }
            
            renderCompanyCards();
            updateFilterSelectors();
            showView('dashboard');
        }
    });

    // ==========================================
    // 5. DİJİTAL İMZA PANELİ (CANVAS SIGNATURE PAD ENGINE)
    // ==========================================
    const sigPadModal = document.getElementById('modal-signature-pad');
    const sigCanvas = document.getElementById('signature-canvas');
    const ctx = sigCanvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let onSignatureSaveCallback = null;

    function resizeCanvas() {
        // Çözünürlüğü görünür boyuta eşitle
        const rect = sigCanvas.parentElement.getBoundingClientRect();
        sigCanvas.width = rect.width;
        sigCanvas.height = rect.height;
        
        // Çizim çizgisi stili
        ctx.strokeStyle = '#1e3a8a'; // Koyu lacivert mürekkep rengi
        ctx.lineWidth = 3.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }

    function openSignaturePad(title, saveCallback, allowPreset = false, isRepresentative = false) {
        document.getElementById('sig-pad-title').textContent = title;
        onSignatureSaveCallback = saveCallback;
        
        // Modal göster
        sigPadModal.classList.remove('hidden');
        
        // Canvas boyutlandır (biraz bekletmek modal yerleşiminin oturmasını sağlar)
        setTimeout(resizeCanvas, 100);

        // Hazır imza seçeneği kontrolü
        const presetBtn = document.getElementById('btn-use-preset-sig');
        const activeComp = state.companies.find(c => c.id === state.activeCompanyId);
        if (allowPreset && activeComp && activeComp.signature) {
            presetBtn.classList.remove('hidden');
        } else {
            presetBtn.classList.add('hidden');
        }

        // Boş bırak butonu kontrolü
        const leaveBlankBtn = document.getElementById('btn-leave-blank-sig');
        if (isRepresentative) {
            leaveBlankBtn.classList.remove('hidden');
        } else {
            leaveBlankBtn.classList.add('hidden');
        }
    }

    // Çizim Dinamikleri (Fare ve Dokunmatik)
    function getMousePos(canvasDom, touchOrMouseEvent) {
        const rect = canvasDom.getBoundingClientRect();
        let clientX, clientY;
        
        if (touchOrMouseEvent.touches && touchOrMouseEvent.touches.length > 0) {
            clientX = touchOrMouseEvent.touches[0].clientX;
            clientY = touchOrMouseEvent.touches[0].clientY;
        } else {
            clientX = touchOrMouseEvent.clientX;
            clientY = touchOrMouseEvent.clientY;
        }
        
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    function startDrawing(e) {
        isDrawing = true;
        const pos = getMousePos(sigCanvas, e);
        lastX = pos.x;
        lastY = pos.y;
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault(); // Ekran kaymasını engelle (Mobil için kritik)
        
        const pos = getMousePos(sigCanvas, e);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        
        lastX = pos.x;
        lastY = pos.y;
    }

    function stopDrawing() {
        isDrawing = false;
    }

    // Event Dinleyicileri
    sigCanvas.addEventListener('mousedown', startDrawing);
    sigCanvas.addEventListener('mousemove', draw);
    sigCanvas.addEventListener('mouseup', stopDrawing);
    sigCanvas.addEventListener('mouseout', stopDrawing);

    sigCanvas.addEventListener('touchstart', startDrawing, { passive: false });
    sigCanvas.addEventListener('touchmove', draw, { passive: false });
    sigCanvas.addEventListener('touchend', stopDrawing);

    // İmza Pad Temizle
    document.getElementById('btn-clear-sig-pad').addEventListener('click', () => {
        ctx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
    });

    // Hazır İmza Kullan
    document.getElementById('btn-use-preset-sig').addEventListener('click', () => {
        const activeComp = state.companies.find(c => c.id === state.activeCompanyId);
        if (activeComp && activeComp.signature && onSignatureSaveCallback) {
            onSignatureSaveCallback(activeComp.signature);
            sigPadModal.classList.add('hidden');
        }
    });

    // İmza Kaydet
    document.getElementById('btn-save-sig-pad').addEventListener('click', () => {
        // Canvas boş mu kontrol et (tüm pikseller şeffaf mı?)
        const buffer = new Uint32Array(ctx.getImageData(0, 0, sigCanvas.width, sigCanvas.height).data.buffer);
        const isEmpty = !buffer.some(color => color !== 0);

        if (isEmpty) {
            alert("Lütfen imza alanına çizim yapın.");
            return;
        }

        const dataURL = sigCanvas.toDataURL('image/png');
        if (onSignatureSaveCallback) {
            onSignatureSaveCallback(dataURL);
        }
        sigPadModal.classList.add('hidden');
    });

    // Kapat
    document.getElementById('btn-close-sig-pad').addEventListener('click', () => {
        sigPadModal.classList.add('hidden');
    });

    // Boş Bırak Butonu Dinleyicisi
    document.getElementById('btn-leave-blank-sig').addEventListener('click', () => {
        if (onSignatureSaveCallback) {
            onSignatureSaveCallback("LEAVE_BLANK");
        }
        sigPadModal.classList.add('hidden');
    });

    // ==========================================
    // 6. TEKNİK SERVİS FORMU EDİTÖRÜ VE DİNAMİK SATIRLAR
    // ==========================================
    let serviceDevices = [];
    let serviceParts = [];
    let serviceSignatures = { tech: null, client: null, unit: null };

    // Servis Cihaz Satırı Ekle
    function addDeviceRow(device = { model: '', sn: '', contract: 'yok' }) {
        const tbody = document.querySelector('#srv-table-devices tbody');
        const tr = document.createElement('tr');
        
        const rowId = 'dev-row-' + Date.now() + Math.random().toString(36).substr(2, 4);
        tr.id = rowId;
        
        tr.innerHTML = `
            <td><input type="text" class="print-inline-input val-model bold-input" value="${device.model}" placeholder="Marka / Model Giriniz..."></td>
            <td><input type="text" class="print-inline-input val-sn" value="${device.sn}" placeholder="Künye No / Seri No..."></td>
            <td>
                <div class="table-checkbox-group">
                    <label class="table-chk-label">
                        <input type="radio" name="contract-${rowId}" class="val-contract" value="var" ${device.contract === 'var' ? 'checked' : ''}> Var
                    </label>
                    <label class="table-chk-label">
                        <input type="radio" name="contract-${rowId}" class="val-contract" value="yok" ${device.contract === 'yok' ? 'checked' : ''}> Yok
                    </label>
                </div>
            </td>
            <td class="no-print">
                <button type="button" class="table-row-delete-btn" onclick="document.getElementById('${rowId}').remove()">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    }

    // Servis Parça Satırı Ekle
    function addPartRow(part = { code: '', name: '', qty: 1, changed: false, recommend: false }) {
        const tbody = document.querySelector('#srv-table-parts tbody');
        const tr = document.createElement('tr');
        
        const rowId = 'part-row-' + Date.now() + Math.random().toString(36).substr(2, 4);
        tr.id = rowId;
        
        tr.innerHTML = `
            <td><input type="text" class="print-inline-input val-pcode" value="${part.code}" placeholder="Parça Kodu..."></td>
            <td><input type="text" class="print-inline-input val-pname" value="${part.name}" placeholder="Parça Adı..."></td>
            <td><input type="number" class="print-inline-input val-pqty" value="${part.qty}" min="1" style="text-align:center"></td>
            <td>
                <div class="table-checkbox-group">
                    <input type="checkbox" class="val-pchanged" ${part.changed ? 'checked' : ''}>
                </div>
            </td>
            <td>
                <div class="table-checkbox-group">
                    <input type="checkbox" class="val-precommend" ${part.recommend ? 'checked' : ''}>
                </div>
            </td>
            <td class="no-print">
                <button type="button" class="table-row-delete-btn" onclick="document.getElementById('${rowId}').remove()">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    }

    // Servis Formunu Editörde Aç
    function openServiceFormEditor(formData = null) {
        document.querySelector('#srv-table-devices tbody').innerHTML = '';
        document.querySelector('#srv-table-parts tbody').innerHTML = '';
        serviceSignatures = { tech: null, client: null, unit: null };
        document.getElementById('btn-save-service-form').classList.remove('hidden');

        // Şirket verisini al (QR ile alınan formlarda gömülü şirket bilgisi kullanılır)
        const company = resolveEditorCompany(formData);
        if (!company) {
            alert("Lütfen önce bir aktif şirket ekleyin.");
            return;
        }

        // Header Şirket detaylarını doldur
        const detailHtml = `
            <strong>${company.name}</strong><br>
            ${company.address ? company.address + '<br>' : ''}
            ${company.phone ? 'TEL: ' + company.phone : ''} ${company.email ? ' | E-Posta: ' + company.email : ''}<br>
            ${company.website ? company.website + '<br>' : ''}
            ${company.taxOffice ? company.taxOffice + ' V.D.' : ''} ${company.taxNumber ? ' | Vergi No: ' + company.taxNumber : ''}
            ${company.mersisNo ? ' | Mersis No: ' + company.mersisNo : ''}
        `;
        document.getElementById('srv-print-comp-details').innerHTML = detailHtml;
        
        // Logo ata
        const logoCont = document.getElementById('srv-print-logo');
        if (company.logo) {
            logoCont.innerHTML = `<img src="${company.logo}" alt="Logo">`;
        } else {
            logoCont.innerHTML = `<strong>${company.name}</strong>`;
        }

        // Kaşe ata
        const srvStampBox = document.getElementById('srv-print-stamp');
        if (company.stamp) {
            srvStampBox.innerHTML = `<img src="${company.stamp}" alt="Kaşe">`;
        } else {
            srvStampBox.innerHTML = `<span class="sig-placeholder-text">Kaşe Yok</span>`;
        }

        // Sertifika Damgaları
        const certsCont = document.getElementById('srv-print-certs');
        certsCont.innerHTML = '';
        if (company.stamps && company.stamps.length > 0) {
            company.stamps.forEach(base64 => {
                certsCont.innerHTML += `<img src="${base64}" class="print-cert-logo" alt="Sertifika">`;
            });
        }

        if (formData) {
            // Düzenleme Modu
            state.currentEditingForm = formData;
            
            document.getElementById('srv-input-date').value = formData.date;
            document.getElementById('srv-input-client-name').value = formData.clientName;
            document.getElementById('srv-input-client-city').value = formData.clientCity;
            
            document.getElementById('srv-chk-bakim').checked = formData.data.chkBakim;
            document.getElementById('srv-chk-onarim').checked = formData.data.chkOnarim;
            document.getElementById('srv-chk-ariza').checked = formData.data.chkAriza;
            document.getElementById('srv-chk-kontrol').checked = formData.data.chkKontrol;
            document.getElementById('srv-chk-garanti').checked = formData.data.chkGaranti;
            document.getElementById('srv-chk-kurulum').checked = formData.data.chkKurulum;
            
            document.getElementById('srv-txt-process').value = formData.data.processText;
            document.getElementById('srv-txt-result').value = formData.data.resultText;

            document.getElementById('srv-input-tech-name').value = formData.data.techName || '';
            document.getElementById('srv-input-client-person').value = formData.data.clientPerson || '';
            document.getElementById('srv-input-unit-person').value = formData.data.unitPerson || '';

            // Cihazları ve parçaları yükle
            if (formData.data.devices) formData.data.devices.forEach(d => addDeviceRow(d));
            if (formData.data.parts) formData.data.parts.forEach(p => addPartRow(p));

            // İmzaları ata
            if (formData.signatures) {
                serviceSignatures = { ...formData.signatures };
                if (serviceSignatures.tech) {
                    if (serviceSignatures.tech === "LEAVE_BLANK") {
                        const company = state.companies.find(c => c.id === formData.companyId) || state.companies[0];
                        if (company && company.stamp) {
                            document.getElementById('srv-sig-tech-img-cont').innerHTML = `<img src="${company.stamp}" alt="Kaşe">`;
                        } else {
                            document.getElementById('srv-sig-tech-img-cont').innerHTML = `<span class="sig-placeholder-text">Kaşe Yerleştirildi</span>`;
                        }
                        document.getElementById('srv-print-stamp').style.display = 'none';
                    } else {
                        document.getElementById('srv-sig-tech-img-cont').innerHTML = `<img src="${serviceSignatures.tech}">`;
                        document.getElementById('srv-print-stamp').style.display = 'flex';
                    }
                } else {
                    document.getElementById('srv-sig-tech-img-cont').innerHTML = `<span class="sig-placeholder-text">İmza Atmak İçin Tıklayın</span>`;
                    document.getElementById('srv-print-stamp').style.display = 'flex';
                }
                if (serviceSignatures.client) {
                    document.getElementById('srv-sig-client-img-cont').innerHTML = `<img src="${serviceSignatures.client}">`;
                } else {
                    document.getElementById('srv-sig-client-img-cont').innerHTML = `<span class="sig-placeholder-text">İmza Atmak İçin Tıklayın</span>`;
                }
                if (serviceSignatures.unit) {
                    document.getElementById('srv-sig-unit-img-cont').innerHTML = `<img src="${serviceSignatures.unit}">`;
                } else {
                    document.getElementById('srv-sig-unit-img-cont').innerHTML = `<span class="sig-placeholder-text">İmza Atmak İçin Tıklayın</span>`;
                }
            }
        } else {
            // Yeni Form Modu
            state.currentEditingForm = null;
            document.getElementById('srv-input-date').valueAsDate = new Date();
            document.getElementById('srv-input-client-name').value = '';
            document.getElementById('srv-input-client-city').value = '';
            
            document.getElementById('srv-chk-bakim').checked = false;
            document.getElementById('srv-chk-onarim').checked = false;
            document.getElementById('srv-chk-ariza').checked = false;
            document.getElementById('srv-chk-kontrol').checked = false;
            document.getElementById('srv-chk-garanti').checked = false;
            document.getElementById('srv-chk-kurulum').checked = false;
            
            document.getElementById('srv-txt-process').value = '';
            document.getElementById('srv-txt-result').value = '';

            document.getElementById('srv-input-tech-name').value = '';
            document.getElementById('srv-input-client-person').value = '';
            document.getElementById('srv-input-unit-person').value = '';

            document.getElementById('srv-sig-tech-img-cont').innerHTML = `<span class="sig-placeholder-text">İmza Atmak İçin Tıklayın</span>`;
            document.getElementById('srv-sig-client-img-cont').innerHTML = `<span class="sig-placeholder-text">İmza Atmak İçin Tıklayın</span>`;
            document.getElementById('srv-sig-unit-img-cont').innerHTML = `<span class="sig-placeholder-text">İmza Atmak İçin Tıklayın</span>`;

            // Varsayılan yetkili imzası varsa yetkili kutusuna ata
            if (company.signature) {
                serviceSignatures.tech = company.signature;
                document.getElementById('srv-sig-tech-img-cont').innerHTML = `<img src="${company.signature}">`;
            }

            // Varsayılan birkaç boş satır ekle
            addDeviceRow();
            addPartRow();
            document.getElementById('srv-print-stamp').style.display = 'flex';
        }

        showView('serviceEditor');
    }

    // Servis İmza Kutularına Basma Takipleri
    document.getElementById('srv-sig-tech-img-cont').addEventListener('click', () => {
        openSignaturePad("Firma Yetkilisi İmzası", (base64) => {
            if (base64 === "LEAVE_BLANK") {
                serviceSignatures.tech = "LEAVE_BLANK";
                const company = state.companies.find(c => c.id === state.activeCompanyId) || state.companies[0];
                if (company && company.stamp) {
                    document.getElementById('srv-sig-tech-img-cont').innerHTML = `<img src="${company.stamp}" alt="Kaşe">`;
                } else {
                    document.getElementById('srv-sig-tech-img-cont').innerHTML = `<span class="sig-placeholder-text">Kaşe Yerleştirildi</span>`;
                }
                document.getElementById('srv-print-stamp').style.display = 'none';
            } else {
                serviceSignatures.tech = base64;
                document.getElementById('srv-sig-tech-img-cont').innerHTML = `<img src="${base64}">`;
                document.getElementById('srv-print-stamp').style.display = 'flex';
            }
        }, true, true);
    });

    document.getElementById('srv-sig-client-img-cont').addEventListener('click', () => {
        openSignaturePad("Kurum Sorumlusu İmzası", (base64) => {
            serviceSignatures.client = base64;
            document.getElementById('srv-sig-client-img-cont').innerHTML = `<img src="${base64}">`;
        }, false);
    });

    document.getElementById('srv-sig-unit-img-cont').addEventListener('click', () => {
        openSignaturePad("Teknik Birim İmzası", (base64) => {
            serviceSignatures.unit = base64;
            document.getElementById('srv-sig-unit-img-cont').innerHTML = `<img src="${base64}">`;
        }, false);
    });

    // Satır Ekleme Buton Dinleyicileri
    document.getElementById('srv-btn-add-device').addEventListener('click', () => addDeviceRow());
    document.getElementById('srv-btn-add-part').addEventListener('click', () => addPartRow());

    // Servis Formu Verisini Topla
    function getServiceFormData() {
        const clientName = document.getElementById('srv-input-client-name').value.trim();
        const clientCity = document.getElementById('srv-input-client-city').value.trim();
        const date = document.getElementById('srv-input-date').value;

        if (!clientName) {
            alert("Lütfen kurum adını girin.");
            return null;
        }

        // Cihaz listesi
        const devices = [];
        document.querySelectorAll('#srv-table-devices tbody tr').forEach(tr => {
            const model = tr.querySelector('.val-model').value.trim();
            const sn = tr.querySelector('.val-sn').value.trim();
            const contractEl = tr.querySelector('.val-contract:checked');
            const contract = contractEl ? contractEl.value : 'yok';
            if (model || sn) {
                devices.push({ model, sn, contract });
            }
        });

        // Parça listesi
        const parts = [];
        document.querySelectorAll('#srv-table-parts tbody tr').forEach(tr => {
            const code = tr.querySelector('.val-pcode').value.trim();
            const name = tr.querySelector('.val-pname').value.trim();
            const qty = parseInt(tr.querySelector('.val-pqty').value) || 1;
            const changed = tr.querySelector('.val-pchanged').checked;
            const recommend = tr.querySelector('.val-precommend').checked;
            if (code || name) {
                parts.push({ code, name, qty, changed, recommend });
            }
        });

        // Form ID oluşturma veya koruma
        let formId = state.currentEditingForm ? state.currentEditingForm.id : null;
        if (!formId) {
            const year = date ? date.split('-')[0] : new Date().getFullYear();
            const count = state.forms.filter(f => f.type === 'servis' && f.date.startsWith(year)).length + 1;
            const padCount = String(count).padStart(4, '0');
            formId = `SRV-${year}-${padCount}`;
        }

        return {
            id: formId,
            type: 'servis',
            companyId: state.activeCompanyId,
            date: date,
            clientName: clientName,
            clientCity: clientCity,
            grandTotal: "", // Servis formunda tutar yok
            data: {
                chkBakim: document.getElementById('srv-chk-bakim').checked,
                chkOnarim: document.getElementById('srv-chk-onarim').checked,
                chkAriza: document.getElementById('srv-chk-ariza').checked,
                chkKontrol: document.getElementById('srv-chk-kontrol').checked,
                chkGaranti: document.getElementById('srv-chk-garanti').checked,
                chkKurulum: document.getElementById('srv-chk-kurulum').checked,
                processText: document.getElementById('srv-txt-process').value.trim(),
                resultText: document.getElementById('srv-txt-result').value.trim(),
                techName: document.getElementById('srv-input-tech-name').value.trim(),
                clientPerson: document.getElementById('srv-input-client-person').value.trim(),
                unitPerson: document.getElementById('srv-input-unit-person').value.trim(),
                devices: devices,
                parts: parts
            },
            signatures: { ...serviceSignatures }
        };
    }

    // Servis Formunu Kaydet
    document.getElementById('btn-save-service-form').addEventListener('click', () => {
        const formData = getServiceFormData();
        if (!formData) return;
        applyImportedMetaToFormData(formData); // QR ile alındıysa gömülü şirketi koru

        const idx = state.forms.findIndex(f => f.id === formData.id);
        if (idx !== -1) {
            state.forms[idx] = formData; // Var olanı güncelle
        } else {
            state.forms.unshift(formData); // Yeni ekle (QR ile alınanlar dahil)
        }

        saveForms();
        renderFormsList();
        showView('dashboard');
    });


    // ==========================================
    // 7. TEKLİF FORMU EDİTÖRÜ VE HESAPLAMA MOTORU
    // ==========================================
    let quoteSignatures = { stamp: null, signature: null };

    // Teklif Kalemi Ekle (Dinamik Hesaplamalı)
    function addQuoteItemRow(item = { desc: '', qty: 1, unit: 'AD', price: 0, kdv: null }) {
        const tbody = document.querySelector('#qte-table-items tbody');
        const tr = document.createElement('tr');
        
        const rowId = 'qte-item-row-' + Date.now() + Math.random().toString(36).substr(2, 4);
        tr.id = rowId;
        
        // Eğer KDV girilmemişse ayarlardakini kullan
        const kdvVal = item.kdv === null ? state.settings.defaultKdv : item.kdv;
        
        tr.innerHTML = `
            <td class="qte-row-index" style="text-align:center; font-weight:700"></td>
            <td><input type="text" class="print-inline-input val-desc bold-input" value="${item.desc}" placeholder="Mal / Hizmet Açıklaması..."></td>
            <td><input type="number" class="print-inline-input val-qty" value="${item.qty}" min="0.01" step="any" style="text-align:center"></td>
            <td><input type="text" class="print-inline-input val-unit" value="${item.unit}" placeholder="Birim" style="text-align:center"></td>
            <td><input type="number" class="print-inline-input val-price" value="${item.price}" min="0" step="any" style="text-align:right"></td>
            <td><input type="number" class="print-inline-input val-kdv" value="${kdvVal}" min="0" max="100" style="text-align:center"></td>
            <td class="qte-row-total" style="text-align:right; font-weight:700">0.00</td>
            <td class="no-print">
                <button type="button" class="table-row-delete-btn" onclick="document.getElementById('${rowId}').remove(); recalculateQuoteTotals()">🗑️</button>
            </td>
        `;
        
        tbody.appendChild(tr);

        // Input olaylarını bağla (Her değişiklikte hesaplama tetikle)
        const inputs = tr.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', recalculateQuoteTotals);
        });

        recalculateQuoteTotals();
    }

    // Teklif Toplamlarını Hesapla
    function recalculateQuoteTotals() {
        const rows = document.querySelectorAll('#qte-table-items tbody tr');
        let subtotal = 0;
        let taxTotal = 0;

        // Sıra numaralarını güncelle ve satır toplamlarını hesapla
        rows.forEach((tr, index) => {
            tr.querySelector('.qte-row-index').textContent = index + 1;
            
            const qty = parseFloat(tr.querySelector('.val-qty').value) || 0;
            const price = parseFloat(tr.querySelector('.val-price').value) || 0;
            const kdv = parseFloat(tr.querySelector('.val-kdv').value) || 0;
            
            const rowTotal = qty * price;
            const rowTax = rowTotal * (kdv / 100);

            tr.querySelector('.qte-row-total').textContent = formatCurrency(rowTotal);

            subtotal += rowTotal;
            taxTotal += rowTax;
        });

        const grandTotal = subtotal + taxTotal;

        // Ekrana yazdır
        document.getElementById('qte-text-subtotal').textContent = formatCurrency(subtotal);
        document.getElementById('qte-text-tax-total').textContent = formatCurrency(taxTotal);
        document.getElementById('qte-text-grand-total').textContent = formatCurrency(grandTotal);
    }

    // Para birimi biçimlendir
    function formatCurrency(amount) {
        return state.settings.currency + ' ' + amount.toLocaleString('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Teklif Formunu Editörde Aç
    function openQuoteFormEditor(formData = null) {
        document.querySelector('#qte-table-items tbody').innerHTML = '';
        quoteSignatures = { stamp: null, signature: null };
        document.getElementById('btn-save-quote-form').classList.remove('hidden');

        // Şirket verisini al (QR ile alınan formlarda gömülü şirket bilgisi kullanılır)
        const company = resolveEditorCompany(formData);
        if (!company) {
            alert("Lütfen önce bir aktif şirket ekleyin.");
            return;
        }

        // Firma Bilgilerini üst sol bloğa yerleştir
        const compHtml = `
            <strong>${company.name}</strong><br>
            ${company.address ? company.address + '<br>' : ''}
            ${company.phone ? 'Tel: ' + company.phone : ''} ${company.email ? ' | E-Posta: ' + company.email : ''}<br>
            ${company.website ? company.website + '<br>' : ''}
            ${company.taxOffice ? company.taxOffice + ' V.D.' : ''} ${company.taxNumber ? ' | Vergi No: ' + company.taxNumber : ''}
            ${company.mersisNo ? ' | Mersis No: ' + company.mersisNo : ''}
        `;
        document.getElementById('qte-print-comp-details').innerHTML = compHtml;

        // Logo Ata -> Üst sağda yer alacak
        const logoCont = document.getElementById('qte-print-logo');
        if (company.logo) {
            logoCont.innerHTML = `<img src="${company.logo}" alt="Logo">`;
        } else {
            logoCont.innerHTML = `<strong>${company.name}</strong>`;
        }

        // Sertifika Damgaları -> Sol altta yer alacak
        const certsCont = document.getElementById('qte-print-certs');
        certsCont.innerHTML = '';
        if (company.stamps && company.stamps.length > 0) {
            company.stamps.forEach(base64 => {
                certsCont.innerHTML += `<img src="${base64}" class="print-cert-logo" alt="Sertifika">`;
            });
        }

        // Kaşe & İmza görselleri yerleştir
        const stampBox = document.getElementById('qte-print-stamp-img');
        const sigBox = document.getElementById('qte-print-sig-img');
        const wrapper = document.getElementById('qte-stamp-sig-container');

        stampBox.innerHTML = '';
        sigBox.innerHTML = '';
        wrapper.classList.remove('stamp-centered');

        if (company.stamp) {
            quoteSignatures.stamp = company.stamp;
            stampBox.innerHTML = `<img src="${company.stamp}" alt="Kaşe">`;
        } else {
            stampBox.innerHTML = `<span class="sig-placeholder-text">Kaşe Yok</span>`;
        }

        if (formData) {
            // Düzenleme Modu
            state.currentEditingForm = formData;

            document.getElementById('qte-input-date').value = formData.date;
            document.getElementById('qte-input-no').value = formData.id;
            
            document.getElementById('qte-input-client-title').value = formData.clientName;
            document.getElementById('qte-input-client-address').value = formData.data.clientAddress || '';
            document.getElementById('qte-input-client-city').value = formData.clientCity;
            
            document.getElementById('qte-txt-conditions').value = formData.data.conditionsText || '';

            // Kalemleri yükle
            if (formData.data.items) {
                formData.data.items.forEach(item => addQuoteItemRow(item));
            }

            // İmzayı yerleştir
            if (formData.signatures && formData.signatures.signature) {
                quoteSignatures.signature = formData.signatures.signature;
                if (quoteSignatures.signature === "LEAVE_BLANK") {
                    sigBox.innerHTML = '';
                    wrapper.classList.add('stamp-centered');
                } else {
                    sigBox.innerHTML = `<img src="${quoteSignatures.signature}" alt="İmza">`;
                }
            } else {
                sigBox.innerHTML = `<span class="sig-placeholder-text">İmza Yok</span>`;
            }
        } else {
            // Yeni Form Modu
            state.currentEditingForm = null;
            document.getElementById('qte-input-date').valueAsDate = new Date();
            
            // Teklif No Otomatik Sayaç oluştur
            const dateStr = new Date().toISOString().split('T')[0];
            const year = dateStr.split('-')[0];
            const count = state.forms.filter(f => f.type === 'teklif' && f.date.startsWith(year)).length + 1;
            const padCount = String(count).padStart(4, '0');
            document.getElementById('qte-input-no').value = `TEK-${year}-${padCount}`;

            document.getElementById('qte-input-client-title').value = '';
            document.getElementById('qte-input-client-address').value = '';
            document.getElementById('qte-input-client-city').value = '';

            document.getElementById('qte-txt-conditions').value = "* Fiyatlarımız KDV hariçtir.\n* Teslim süresi 15 gündür.\n* Ödeme: Teslimatta nakit veya havale.";

            // Bir tane varsayılan boş satır ekle
            addQuoteItemRow();

            if (company.signature) {
                quoteSignatures.signature = company.signature;
                sigBox.innerHTML = `<img src="${company.signature}" alt="İmza">`;
            } else {
                sigBox.innerHTML = `<span class="sig-placeholder-text">İmza Yok</span>`;
            }
        }

        // Tıklayarak Kaşe veya İmza Düzenleme Tetikleyicileri
        document.getElementById('qte-stamp-sig-container').onclick = () => {
            openSignaturePad("Kaşe & İmza Çiz", (base64) => {
                const sigBox = document.getElementById('qte-print-sig-img');
                const wrapper = document.getElementById('qte-stamp-sig-container');
                if (base64 === "LEAVE_BLANK") {
                    quoteSignatures.signature = "LEAVE_BLANK";
                    sigBox.innerHTML = '';
                    wrapper.classList.add('stamp-centered');
                } else {
                    quoteSignatures.signature = base64;
                    sigBox.innerHTML = `<img src="${base64}">`;
                    wrapper.classList.remove('stamp-centered');
                }
            }, true, true);
        };

        showView('quoteEditor');
    }

    // Kalem ekleme butonu
    document.getElementById('qte-btn-add-item').addEventListener('click', () => addQuoteItemRow());

    // Teklif Form Verisini Topla
    function getQuoteFormData() {
        const clientName = document.getElementById('qte-input-client-title').value.trim();
        const clientCity = document.getElementById('qte-input-client-city').value.trim();
        const date = document.getElementById('qte-input-date').value;
        const formId = document.getElementById('qte-input-no').value.trim();

        if (!clientName) {
            alert("Lütfen teklif sunulan kurum adını girin.");
            return null;
        }

        if (!formId) {
            alert("Lütfen bir teklif numarası girin.");
            return null;
        }

        // Kalemleri topla
        const items = [];
        let subtotal = 0;
        let taxTotal = 0;

        document.querySelectorAll('#qte-table-items tbody tr').forEach(tr => {
            const desc = tr.querySelector('.val-desc').value.trim();
            const qty = parseFloat(tr.querySelector('.val-qty').value) || 0;
            const unit = tr.querySelector('.val-unit').value.trim();
            const price = parseFloat(tr.querySelector('.val-price').value) || 0;
            const kdv = parseFloat(tr.querySelector('.val-kdv').value) || 0;
            
            if (desc || qty || price) {
                items.push({ desc, qty, unit, price, kdv });
                
                const itemTotal = qty * price;
                subtotal += itemTotal;
                taxTotal += itemTotal * (kdv / 100);
            }
        });

        const grandTotal = subtotal + taxTotal;

        return {
            id: formId,
            type: 'teklif',
            companyId: state.activeCompanyId,
            date: date,
            clientName: clientName,
            clientCity: clientCity,
            grandTotal: grandTotal.toFixed(2),
            data: {
                clientAddress: document.getElementById('qte-input-client-address').value.trim(),
                conditionsText: document.getElementById('qte-txt-conditions').value.trim(),
                items: items,
                subtotal: subtotal.toFixed(2),
                taxTotal: taxTotal.toFixed(2)
            },
            signatures: { ...quoteSignatures }
        };
    }

    // Teklif Formunu Kaydet
    document.getElementById('btn-save-quote-form').addEventListener('click', () => {
        const formData = getQuoteFormData();
        if (!formData) return;
        applyImportedMetaToFormData(formData); // QR ile alındıysa gömülü şirketi koru

        // Aynı ID ile mevcut form var mı kontrol et (güncelleme modu için)
        const idx = state.forms.findIndex(f => f.id === formData.id);
        if (idx !== -1 && state.currentEditingForm) {
            // Üzerine yaz
            state.forms[idx] = formData;
        } else if (idx !== -1 && !state.currentEditingForm) {
            // Yeni oluşturulurken çakışma varsa
            if (confirm("Bu teklif numarasıyla başka bir teklif zaten var. Üzerine yazmak ister misiniz?")) {
                state.forms[idx] = formData;
            } else {
                return;
            }
        } else {
            // Tamamen yeni
            state.forms.unshift(formData);
        }

        saveForms();
        renderFormsList();
        showView('dashboard');
    });


    // ==========================================
    // 8. PDF ÜRETİM VE İNDİRME MOTORU (HTML2PDF)
    // ==========================================
    function downloadFormAsPDF(elementId, rawFilename) {
        return new Promise((resolve, reject) => {
            const element = document.getElementById(elementId);
            
            // Gölgeleri kaldır ve generating class ekle
            element.style.boxShadow = 'none';
            element.classList.add('generating-pdf');

            // Textarea'ları PDF için sol-üst hizalı, içeriğe oturan div'lerle değiştir
            const restoreTextareas = swapTextareasForPrint(element);
            // html2canvas radio/checkbox işaretlerini bozabilir; durumlarını koru
            const restoreChecks = preserveCheckStates(element);

            // Dosya ismini temizle (Windows/Linux dosya sistemi karakterlerini temizle)
            const sanitizedFilename = rawFilename.replace(/[/\\?%*:|"<>]/g, '_').trim();

            const opt = {
                margin: 0,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2.3, // Mobil hafıza sorunlarını engellemek ve yüksek kalite için dengeli
                    useCORS: true,
                    letterRendering: true,
                    scrollX: 0,
                    scrollY: 0
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait' 
                }
            };

            // Mobil/Capacitor WebView Kontrolü (Filesystem eklentisi yüklü ise aktiftir)
            const isMobileApp = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Filesystem;

            // Mobil yakınlaştırma ayarlarını geçici olarak sıfırla (eğer mobil ise)
            const wrappers = document.querySelectorAll('.a4-container-wrapper');
            const originalStyles = [];
            
            wrappers.forEach(wrap => {
                const page = wrap.querySelector('.a4-page');
                if (page) {
                    originalStyles.push({
                        page: page,
                        wrap: wrap,
                        transform: page.style.transform,
                        marginRight: page.style.marginRight,
                        marginBottom: page.style.marginBottom,
                        wrapHeight: wrap.style.height
                    });
                    page.style.transform = 'none';
                    page.style.marginRight = '0px';
                    page.style.marginBottom = '0px';
                    wrap.style.height = 'auto';
                }
            });

            // Sayfa boyutlarının sıfırlanması için küçük bir bekleme süresi verelim
            setTimeout(() => {
                html2pdf().from(element).set(opt).outputPdf('blob').then((pdfBlob) => {
                    
                    // Orijinal zoom stillerini anında geri yükle
                    originalStyles.forEach(item => {
                        item.page.style.transform = item.transform;
                        item.page.style.marginRight = item.marginRight;
                        item.page.style.marginBottom = item.marginBottom;
                        item.wrap.style.height = item.wrapHeight;
                    });
                    element.style.boxShadow = '';
                    element.classList.remove('generating-pdf');
                    element.querySelectorAll('.form-qr-stamp').forEach(q => q.innerHTML = '');
                    restoreTextareas();
                    restoreChecks();

                    if (isMobileApp) {
                        // Mobil / Capacitor Kaydetme & Paylaşma Akışı
                        const reader = new FileReader();
                        reader.readAsDataURL(pdfBlob);
                        reader.onloadend = async () => {
                            const base64data = reader.result.split(',')[1];
                            const fileName = sanitizedFilename + '.pdf';
                            
                            try {
                                const { Filesystem, Share } = window.Capacitor.Plugins;
                                
                                // PDF'i geçici cache dizinine yaz (yazma izni gerektirmez)
                                const result = await Filesystem.writeFile({
                                    path: fileName,
                                    data: base64data,
                                    directory: 'CACHE'
                                });
                                
                                // Paylaşım/Kaydetme diyalogunu aç (Kullanıcı whatsapp, mail veya 'Cihaza Kaydet' seçebilir)
                                if (Share) {
                                    await Share.share({
                                        title: sanitizedFilename,
                                        text: 'Oluşturulan Form PDF Belgesi',
                                        url: result.uri,
                                        dialogTitle: 'PDF Kaydet veya Paylaş'
                                    });
                                } else {
                                    alert("Dosya başarıyla oluşturuldu: " + result.uri);
                                }
                                resolve();
                            } catch (err) {
                                console.error("Capacitor dosya işlemi hatası:", err);
                                alert("Mobil cihazda dosya kaydedilemedi: " + err.message);
                                reject(err);
                            }
                        };
                    } else {
                        // Masaüstü / Normal Tarayıcı İndirme Akışı
                        const blobUrl = URL.createObjectURL(pdfBlob);
                        const link = document.createElement('a');
                        link.href = blobUrl;
                        link.download = sanitizedFilename + '.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(blobUrl);
                        resolve();
                    }
                    
                }).catch((err) => {
                    console.error("PDF Üretim hatası:", err);
                    alert("PDF dosyası oluşturulurken bir hata oluştu.");
                    
                    // Hata durumunda da orijinal zoom stillerini geri yükle
                    originalStyles.forEach(item => {
                        item.page.style.transform = item.transform;
                        item.page.style.marginRight = item.marginRight;
                        item.page.style.marginBottom = item.marginBottom;
                        item.wrap.style.height = item.wrapHeight;
                    });
                    element.style.boxShadow = '';
                    element.classList.remove('generating-pdf');
                    element.querySelectorAll('.form-qr-stamp').forEach(q => q.innerHTML = '');
                    restoreTextareas();
                    restoreChecks();
                    reject(err);
                });
            }, 300);
        });
    }

    // Servis PDF tetikle
    document.getElementById('btn-pdf-service-form').addEventListener('click', () => {
        const formData = getServiceFormData();
        if (formData) {
            // Arka planda otomatik kaydet
            applyImportedMetaToFormData(formData);
            const idx = state.forms.findIndex(f => f.id === formData.id);
            if (idx !== -1) {
                state.forms[idx] = formData;
            } else {
                state.forms.unshift(formData);
            }
            state.currentEditingForm = formData; // Düzenleme moduna çek ki mükerrer kayıt oluşmasın
            saveForms();
            renderFormsList();

            const company = state.companies.find(c => c.id === formData.companyId);
            const compName = company ? company.name : 'Sirket';
            const clientName = formData.clientName || 'Musteri';
            const rawName = `${compName}_Teknik Servis Formu_${clientName}`;
            requireAdOrPremium(() => {
                injectQrIntoPrintArea(formData, true);
                downloadFormAsPDF('service-print-area', rawName);
            });
        }
    });

    // Teklif PDF tetikle
    document.getElementById('btn-pdf-quote-form').addEventListener('click', () => {
        const formData = getQuoteFormData();
        if (formData) {
            // Arka planda otomatik kaydet
            applyImportedMetaToFormData(formData);
            const idx = state.forms.findIndex(f => f.id === formData.id);
            if (idx !== -1) {
                state.forms[idx] = formData;
            } else {
                state.forms.unshift(formData);
            }
            state.currentEditingForm = formData; // Düzenleme moduna çek ki mükerrer kayıt oluşmasın
            saveForms();
            renderFormsList();

            const company = state.companies.find(c => c.id === formData.companyId);
            const compName = company ? company.name : 'Sirket';
            const clientName = formData.clientName || 'Musteri';
            const rawName = `${compName}_Proforma Fiyat Teklif Mektubu_${clientName}`;
            requireAdOrPremium(() => {
                injectQrIntoPrintArea(formData, true);
                downloadFormAsPDF('quote-print-area', rawName);
            });
        }
    });


    // ==========================================
    // 9. DYNAMIC RENDERING (UI GÜNCELLEMELERİ)
    // ==========================================

    // Şirket Kartlarını Dashboard'a Çizer
    function renderCompanyCards() {
        const container = document.getElementById('company-cards-container');
        container.innerHTML = '';

        if (state.companies.length === 0) {
            container.innerHTML = `
                <div class="empty-company-card" id="empty-comp-btn">
                    <span>🏢 Henüz Şirket Eklenmedi</span>
                    <small>İşlem yapmak için en az bir şirket eklemelisiniz. Eklemek için buraya veya alttaki butona tıklayın.</small>
                </div>
            `;
            document.getElementById('empty-comp-btn').onclick = () => openCompanyEditor();
            return;
        }

        state.companies.forEach(comp => {
            const isActive = comp.id === state.activeCompanyId;
            const card = document.createElement('div');
            card.className = `company-card ${isActive ? 'active' : ''}`;
            card.innerHTML = `
                <div class="company-card-header">
                    <div class="company-card-logo">
                        ${comp.logo ? `<img src="${comp.logo}" alt="Logo">` : '<span>🏢</span>'}
                    </div>
                    <div class="company-card-title">${comp.name}</div>
                    <button class="btn-small-action btn-edit-comp" data-id="${comp.id}">⚙️ Düzenle</button>
                </div>
                <div class="company-card-details">
                    <p><span>Tescil Damgaları:</span> <strong>${comp.stamps ? comp.stamps.length : 0} Adet</strong></p>
                    <p><span>Telefon:</span> <strong>${comp.phone || 'Yok'}</strong></p>
                    <p><span>Vergi No:</span> <strong>${comp.taxNumber || 'Yok'}</strong></p>
                </div>
                <button class="btn-delete-comp" data-id="${comp.id}">🗑️ Şirketi Sil</button>
            `;

            // Tıklayınca aktif şirket yap
            card.addEventListener('click', (e) => {
                // Düzenle veya sil butonuna tıklandıysa aktif şirket yapma
                if (e.target.classList.contains('btn-edit-comp') || e.target.classList.contains('btn-delete-comp')) {
                    return;
                }
                setActiveCompany(comp.id);
            });

            // Düzenle butonu
            card.querySelector('.btn-edit-comp').addEventListener('click', (e) => {
                e.stopPropagation();
                openCompanyEditor(comp.id);
            });

            // Kırmızı silme butonu
            card.querySelector('.btn-delete-comp').addEventListener('click', (e) => {
                e.stopPropagation();
                deleteCompanyById(comp.id);
            });

            container.appendChild(card);
        });
    }

    // Şirketi sil (kart üzerindeki kırmızı buton ve editördeki sil butonu için ortak)
    function deleteCompanyById(id) {
        if (!confirm("Bu şirketi ve şirkete ait bilgileri silmek istediğinizden emin misiniz?")) return;
        state.companies = state.companies.filter(c => c.id !== id);
        saveCompanies();

        if (state.activeCompanyId === id) {
            state.activeCompanyId = state.companies.length > 0 ? state.companies[0].id : null;
            localStorage.setItem('kolayform_active_comp', state.activeCompanyId || '');
        }

        renderCompanyCards();
        updateFilterSelectors();
    }

    // Geçmiş Formlar Filtre Select'lerini Günceller
    function updateFilterSelectors() {
        const compSelect = document.getElementById('filter-company');
        compSelect.innerHTML = '<option value="all">Tüm Şirketler</option>';
        
        state.companies.forEach(comp => {
            compSelect.innerHTML += `<option value="${comp.id}">${comp.name}</option>`;
        });
    }

    // Geçmiş Formları Dashboard'a Çizer
    function renderFormsList() {
        const container = document.getElementById('forms-list-container');
        container.innerHTML = '';

        // Filtre değerlerini oku
        const query = document.getElementById('search-input').value.toLowerCase().trim();
        const type = document.getElementById('filter-type').value;
        const companyId = document.getElementById('filter-company').value;

        // Filtrele
        const filtered = state.forms.filter(f => {
            // Cihaz model/seri no araması kontrolü
            let matchesDevice = false;
            if (f.data && f.data.devices) {
                matchesDevice = f.data.devices.some(dev => 
                    (dev.model && dev.model.toLowerCase().includes(query)) ||
                    (dev.sn && dev.sn.toLowerCase().includes(query))
                );
            }

            // Arama filtresi
            const matchesQuery = !query || 
                f.id.toLowerCase().includes(query) ||
                f.clientName.toLowerCase().includes(query) ||
                f.clientCity.toLowerCase().includes(query) ||
                matchesDevice;

            // Tip filtresi
            const matchesType = type === 'all' || f.type === type;

            // Şirket filtresi
            const matchesComp = companyId === 'all' || f.companyId === companyId;

            return matchesQuery && matchesType && matchesComp;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="empty-forms-placeholder">
                    <span class="empty-forms-icon">📂</span>
                    <span>Aranan kriterlere uygun form bulunamadı.</span>
                </div>
            `;
            return;
        }

        filtered.forEach(form => {
            const companyObj = state.companies.find(c => c.id === form.companyId);
            
            const logoInner = form._imported
                ? '<span class="qr-badge">QR</span>'
                : ((companyObj && companyObj.logo) ? `<img src="${companyObj.logo}">` : '<span>🏢</span>');

            const card = document.createElement('div');
            card.className = 'form-list-card';
            card.innerHTML = `
                <div class="form-card-left">
                    <div class="form-card-logo">
                        ${logoInner}
                    </div>
                    <div class="form-card-info">
                        <div class="form-card-title-row">
                            <span class="badge ${form.type === 'servis' ? 'badge-servis' : 'badge-teklif'}">${form.type === 'servis' ? 'Servis' : 'Teklif'}</span>
                            <span class="form-card-title">${form.clientName}</span>
                        </div>
                        <div class="form-card-meta">
                            <span>No: ${form.id}</span>
                            <span>Konum: ${form.clientCity || 'Belirtilmedi'}</span>
                            ${form.type === 'teklif' ? `<span>KDV: %${form.data.items[0]?.kdv || state.settings.defaultKdv}</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="form-card-right">
                    <div class="form-card-total">${form.type === 'teklif' ? formatCurrency(parseFloat(form.grandTotal)) : 'Ücretsiz'}</div>
                    <div class="form-card-date">${new Date(form.date).toLocaleDateString('tr-TR')}</div>
                </div>
                <button class="btn-card-delete" title="Formu Sil">🗑️</button>
            `;

            // Kırmızı silme butonu (karta tıklamayı tetiklemesin)
            card.querySelector('.btn-card-delete').addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm(`"${form.id}" numaralı formu geçmişten silmek istediğinize emin misiniz?`)) {
                    state.forms = state.forms.filter(f => f.id !== form.id);
                    saveForms();
                    renderFormsList();
                }
            });

            // Tıklayınca düzenleyicide aç
            card.addEventListener('click', () => {
                if (form._imported) {
                    // QR ile alınan belge: gömülü şirketle yeniden üret
                    openImportedForm(form);
                    return;
                }
                // Aktif şirketi formun ait olduğu şirket yapalım ki logolar doğru gelsin
                setActiveCompany(form.companyId);

                if (form.type === 'servis') {
                    openServiceFormEditor(form);
                } else {
                    openQuoteFormEditor(form);
                }
            });

            container.appendChild(card);
        });
    }

    // ==========================================
    // 10. MODAL & BUTON TIKLAMA OLAY DİNLEYİCİLERİ
    // ==========================================

    // Şirket ekleme görünümüne git
    document.getElementById('btn-add-company').addEventListener('click', () => {
        openCompanyEditor();
    });

    document.getElementById('btn-back-from-company').addEventListener('click', () => {
        showView('dashboard');
    });

    // Form Oluştur Modalını Aç
    const createFormModal = document.getElementById('modal-create-form');
    document.getElementById('btn-create-form').addEventListener('click', () => {
        if (state.companies.length === 0) {
            alert("Lütfen önce bir şirket ekleyin.");
            openCompanyEditor();
            return;
        }

        const compSelect = document.getElementById('create-form-company');
        compSelect.innerHTML = '';
        state.companies.forEach(comp => {
            compSelect.innerHTML += `<option value="${comp.id}" ${comp.id === state.activeCompanyId ? 'selected' : ''}>${comp.name}</option>`;
        });

        createFormModal.classList.remove('hidden');
    });

    document.getElementById('btn-close-create-form').addEventListener('click', () => {
        createFormModal.classList.add('hidden');
    });

    document.getElementById('btn-start-form').addEventListener('click', () => {
        const compId = document.getElementById('create-form-company').value;
        const formType = document.getElementById('create-form-type').value;

        setActiveCompany(compId);
        createFormModal.classList.add('hidden');

        if (formType === 'servis') {
            openServiceFormEditor();
        } else {
            openQuoteFormEditor();
        }
    });

    // Editör Kapatma Butonları (Özel Onay Modalı)
    const confirmExitModal = document.getElementById('modal-confirm-exit');
    
    function openExitConfirmation() {
        confirmExitModal.classList.remove('hidden');
    }

    document.getElementById('btn-close-service-editor').addEventListener('click', openExitConfirmation);
    document.getElementById('btn-close-quote-editor').addEventListener('click', openExitConfirmation);

    document.getElementById('btn-close-confirm-exit').addEventListener('click', () => {
        confirmExitModal.classList.add('hidden');
    });

    document.getElementById('btn-cancel-exit').addEventListener('click', () => {
        confirmExitModal.classList.add('hidden');
    });

    document.getElementById('btn-confirm-exit').addEventListener('click', () => {
        confirmExitModal.classList.add('hidden');
        showView('dashboard');
    });

    // Filtre Panelini Aç/Kapat
    const filterToggle = document.getElementById('filter-toggle');
    const filterPanel = document.getElementById('filter-panel');
    filterToggle.addEventListener('click', () => {
        filterPanel.classList.toggle('hidden');
        filterToggle.textContent = filterPanel.classList.contains('hidden') ? '🔍 Filtrele' : '❌ Filtreyi Kapat';
    });

    // Filtre Değişim Dinleyicileri
    document.getElementById('search-input').addEventListener('input', renderFormsList);
    document.getElementById('filter-type').addEventListener('change', renderFormsList);
    document.getElementById('filter-company').addEventListener('change', renderFormsList);

    // Toplu İndirme Buton Dinleyicisi
    document.getElementById('btn-bulk-download').addEventListener('click', triggerBulkDownload);

    // Toplu İndirme Fonksiyonu
    // Ekrandaki filtrelere göre formları döndürür (geçmiş listesi ile aynı mantık)
    function getFilteredForms() {
        const query = document.getElementById('search-input').value.toLowerCase().trim();
        const type = document.getElementById('filter-type').value;
        const companyId = document.getElementById('filter-company').value;

        return state.forms.filter(f => {
            let matchesDevice = false;
            if (f.data && f.data.devices) {
                matchesDevice = f.data.devices.some(dev =>
                    (dev.model && dev.model.toLowerCase().includes(query)) ||
                    (dev.sn && dev.sn.toLowerCase().includes(query))
                );
            }
            const matchesQuery = !query ||
                f.id.toLowerCase().includes(query) ||
                f.clientName.toLowerCase().includes(query) ||
                f.clientCity.toLowerCase().includes(query) ||
                matchesDevice;
            const matchesType = type === 'all' || f.type === type;
            const matchesComp = companyId === 'all' || f.companyId === companyId;
            return matchesQuery && matchesType && matchesComp;
        });
    }

    // A4 print alanını PDF için hazırlar (zoom sıfırla, textarea→div, checkbox koru),
    // fn(element, opt) ile html2pdf worker'ını çalıştırır ve her durumda DOM'u geri yükler.
    async function withPrintAreaPrepared(elementId, fn) {
        const element = document.getElementById(elementId);
        element.style.boxShadow = 'none';
        element.classList.add('generating-pdf');
        const restoreTextareas = swapTextareasForPrint(element);
        const restoreChecks = preserveCheckStates(element);

        const pages = [];
        document.querySelectorAll('.a4-container-wrapper').forEach(wrap => {
            const page = wrap.querySelector('.a4-page');
            if (page) {
                pages.push({ page, wrap, transform: page.style.transform, mr: page.style.marginRight, mb: page.style.marginBottom, h: wrap.style.height });
                page.style.transform = 'none';
                page.style.marginRight = '0px';
                page.style.marginBottom = '0px';
                wrap.style.height = 'auto';
            }
        });

        const opt = {
            margin: 0,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2.3, useCORS: true, letterRendering: true, scrollX: 0, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        await new Promise(r => setTimeout(r, 150)); // düzen otursun
        try {
            return await fn(element, opt);
        } finally {
            pages.forEach(p => {
                p.page.style.transform = p.transform;
                p.page.style.marginRight = p.mr;
                p.page.style.marginBottom = p.mb;
                p.wrap.style.height = p.h;
            });
            element.style.boxShadow = '';
            element.classList.remove('generating-pdf');
            element.querySelectorAll('.form-qr-stamp').forEach(q => q.innerHTML = '');
            restoreTextareas();
            restoreChecks();
        }
    }

    // Bir canvas'ı jsPDF sayfasına, sayfaya tam oturacak şekilde (taşarsa yüksekliğe göre ölçekle) ekler
    function addCanvasToPdf(pdf, canvas, isFirst) {
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        let w = pageW;
        let h = pageW * canvas.height / canvas.width;
        if (h > pageH) { h = pageH; w = pageH * canvas.width / canvas.height; }
        const x = (pageW - w) / 2;
        if (!isFirst) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', x, 0, w, h);
    }

    // PDF blob'unu indir (masaüstü) veya paylaş (Capacitor)
    async function savePdfBlob(blob, sanitizedName) {
        const isMobileApp = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Filesystem;
        if (isMobileApp) {
            const base64data = await new Promise((res) => {
                const reader = new FileReader();
                reader.onloadend = () => res(reader.result.split(',')[1]);
                reader.readAsDataURL(blob);
            });
            const { Filesystem, Share } = window.Capacitor.Plugins;
            const result = await Filesystem.writeFile({ path: sanitizedName + '.pdf', data: base64data, directory: 'CACHE' });
            if (Share) {
                await Share.share({ title: sanitizedName, text: 'Toplu Form PDF Belgesi', url: result.uri, dialogTitle: 'PDF Kaydet veya Paylaş' });
            } else {
                alert('Dosya başarıyla oluşturuldu: ' + result.uri);
            }
        } else {
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = sanitizedName + '.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        }
    }

    // Toplu İndirme: tüm seçili formları TEK bir PDF'te, her form ayrı sayfada birleştirir (Yalnızca Premium)
    async function triggerBulkDownload() {
        if (!state.settings.isPremium) {
            alert("Toplu PDF İndirme özelliği sadece Premium üyelerimize özeldir. Lütfen devam etmek için Premium plana yükseltin.");
            document.getElementById('modal-premium').classList.remove('hidden');
            return;
        }

        const filtered = getFilteredForms();

        if (filtered.length === 0) {
            alert("İndirilecek form bulunamadı.");
            return;
        }

        if (!confirm(`${filtered.length} adet form tek bir PDF dosyasında (her form ayrı sayfa) birleştirilecektir. Onaylıyor musunuz?`)) {
            return;
        }

        const bulkModal = document.getElementById('modal-bulk-loading');
        const bulkProgress = document.getElementById('bulk-loading-progress');
        bulkModal.classList.remove('hidden');

        const originalActiveCompanyId = state.activeCompanyId;
        suppressA4Fit = true; // Toplu render sırasında zoom ölçeklemesini bastır

        try {
            let pdf = null;

            for (let i = 0; i < filtered.length; i++) {
                const form = filtered[i];
                bulkProgress.innerHTML = `Hazırlanıyor: ${i + 1} / ${filtered.length}<br><strong>${form.id}</strong>`;

                setActiveCompany(form.companyId);
                const elementId = form.type === 'servis' ? 'service-print-area' : 'quote-print-area';

                if (form.type === 'servis') {
                    openServiceFormEditor(form);
                } else {
                    openQuoteFormEditor(form);
                }
                if (form._imported) applyImportedDocStyling(form);
                injectQrIntoPrintArea(form, false);

                if (!pdf) {
                    pdf = await withPrintAreaPrepared(elementId, async (el, opt) => {
                        const p = await html2pdf().set(opt).from(el).toPdf().get('pdf');
                        try {
                            while (p.internal.getNumberOfPages() > 1) {
                                p.deletePage(p.internal.getNumberOfPages());
                            }
                        } catch (e) { }
                        return p;
                    });
                } else {
                    const canvas = await withPrintAreaPrepared(elementId, (el, opt) =>
                        html2pdf().set(opt).from(el).toCanvas().get('canvas')
                    );
                    addCanvasToPdf(pdf, canvas, false);
                }
            }

            bulkProgress.innerHTML = 'PDF kaydediliyor…';
            const activeComp = state.companies.find(c => c.id === originalActiveCompanyId);
            const compName = activeComp ? activeComp.name : 'Kolay Form';
            const rawName = `${compName} - Toplu Belgeler (${filtered.length} form)`;
            const sanitized = rawName.replace(/[/\\?%*:|"<>]/g, '_').trim();
            await savePdfBlob(pdf.output('blob'), sanitized);
        } catch (err) {
            console.error("Toplu indirme sırasında hata:", err);
            alert("Toplu indirme sırasında bir hata oluştu.");
        } finally {
            suppressA4Fit = false;
            setActiveCompany(originalActiveCompanyId);
            showView('dashboard');
            bulkModal.classList.add('hidden');
        }
    }

    // Geri Bildirim Modalı & Tabları
    const feedbackModal = document.getElementById('modal-feedback');
    const tabFeedbackBtn = document.getElementById('tab-feedback-btn');
    const tabAboutBtn = document.getElementById('tab-about-btn');
    const tabFeedbackContent = document.getElementById('tab-feedback-content');
    const tabAboutContent = document.getElementById('tab-about-content');

    document.getElementById('btn-feedback').addEventListener('click', () => {
        document.getElementById('feedback-message').value = '';
        switchFeedbackTab('feedback');
        feedbackModal.classList.remove('hidden');
    });

    document.getElementById('btn-close-feedback').addEventListener('click', () => {
        feedbackModal.classList.add('hidden');
    });

    tabFeedbackBtn.addEventListener('click', () => switchFeedbackTab('feedback'));
    tabAboutBtn.addEventListener('click', () => switchFeedbackTab('about'));

    function switchFeedbackTab(tabName) {
        if (tabName === 'feedback') {
            tabFeedbackBtn.classList.add('active');
            tabAboutBtn.classList.remove('active');
            tabFeedbackContent.classList.remove('hidden');
            tabAboutContent.classList.add('hidden');
        } else {
            tabFeedbackBtn.classList.remove('active');
            tabAboutBtn.classList.add('active');
            tabFeedbackContent.classList.add('hidden');
            tabAboutContent.classList.remove('hidden');
        }
    }

    document.getElementById('btn-send-feedback').addEventListener('click', () => {
        const msg = document.getElementById('feedback-message').value.trim();
        if (!msg) {
            alert("Lütfen bir geri bildirim mesajı giriniz.");
            return;
        }

        // Yerel saklama
        const localFeedbacks = JSON.parse(localStorage.getItem('kolayform_feedbacks') || '[]');
        localFeedbacks.push({
            date: new Date().toISOString(),
            message: msg
        });
        localStorage.setItem('kolayform_feedbacks', JSON.stringify(localFeedbacks));

        alert("Geri bildiriminiz başarıyla iletildi. Katkılarınız için teşekkür ederiz!");
        feedbackModal.classList.add('hidden');
    });

    // Ayarlar Modalı
    const settingsModal = document.getElementById('modal-settings');
    document.getElementById('btn-settings').addEventListener('click', () => {
        document.getElementById('settings-kdv').value = state.settings.defaultKdv;
        document.getElementById('settings-currency').value = state.settings.currency;
        
        // Load QR checkbox state and lock if not premium
        const enableQrCheckbox = document.getElementById('settings-enable-qr');
        const premiumLock = document.getElementById('settings-qr-premium-lock');
        const qrHelp = document.getElementById('settings-qr-help');
        
        if (state.settings.isPremium) {
            enableQrCheckbox.disabled = false;
            enableQrCheckbox.checked = state.settings.enableQr !== false; // default true
            premiumLock.style.display = 'none';
            qrHelp.textContent = "PDF çıktılarının altına doğrulama ve dijital aktarım için QR kod yerleştirilir.";
            qrHelp.style.color = "var(--text-muted)";
        } else {
            enableQrCheckbox.disabled = true;
            enableQrCheckbox.checked = false;
            premiumLock.style.display = 'inline-block';
            qrHelp.textContent = "🔒 QR Doğrulama Kodu ekleme özelliği sadece Premium üyeler içindir.";
            qrHelp.style.color = "#fbbf24";
        }
        
        settingsModal.classList.remove('hidden');
    });

    document.getElementById('btn-close-settings').addEventListener('click', () => {
        settingsModal.classList.add('hidden');
    });

    document.getElementById('btn-save-settings').addEventListener('click', () => {
        state.settings.defaultKdv = parseInt(document.getElementById('settings-kdv').value) || 20;
        state.settings.currency = document.getElementById('settings-currency').value;
        if (state.settings.isPremium) {
            state.settings.enableQr = document.getElementById('settings-enable-qr').checked;
        } else {
            state.settings.enableQr = false;
        }
        saveSettings();
        settingsModal.classList.add('hidden');
        renderFormsList();
    });

    // Nasıl Kullanılır Modalı
    const howToModal = document.getElementById('modal-how-to');
    document.getElementById('btn-how-to').addEventListener('click', () => {
        howToModal.classList.remove('hidden');
    });

    const closeHowTo = () => howToModal.classList.add('hidden');
    document.getElementById('btn-close-how-to').addEventListener('click', closeHowTo);
    document.getElementById('btn-close-how-to-footer').addEventListener('click', closeHowTo);

    // Premium & Reklam Modalları Olay Dinleyicileri
    const premiumModal = document.getElementById('modal-premium');
    const adPromptModal = document.getElementById('modal-ad-prompt');
    const iapSimModal = document.getElementById('modal-iap-simulation');

    // Header Premium Butonu
    const goPremiumBtn = document.getElementById('btn-go-premium');
    if (goPremiumBtn) {
        goPremiumBtn.addEventListener('click', () => {
            const alertBanner = document.getElementById('premium-limit-alert');
            if (alertBanner) alertBanner.style.display = 'none';
            premiumModal.classList.remove('hidden');
        });
    }

    // Ayarlar Premium Butonu
    const settingsPremiumBtn = document.getElementById('btn-settings-premium');
    if (settingsPremiumBtn) {
        settingsPremiumBtn.addEventListener('click', () => {
            const alertBanner = document.getElementById('premium-limit-alert');
            if (alertBanner) alertBanner.style.display = 'none';
            settingsModal.classList.add('hidden');
            premiumModal.classList.remove('hidden');
        });
    }

    // Modalları Kapatma Butonları
    document.getElementById('btn-close-premium').addEventListener('click', () => {
        if (window.limitCountdownInterval) {
            clearInterval(window.limitCountdownInterval);
        }
        premiumModal.classList.add('hidden');
    });
    
    document.getElementById('btn-close-ad-prompt').addEventListener('click', () => {
        adPromptModal.classList.add('hidden');
    });

    document.getElementById('btn-close-iap-sim').addEventListener('click', () => {
        iapSimModal.classList.add('hidden');
    });

    // Satın Alma Plan Butonları
    document.querySelectorAll('.btn-buy-plan').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const plan = e.currentTarget.getAttribute('data-plan');
            const price = e.currentTarget.getAttribute('data-price');
            PurchaseService.buyPlan(plan, price);
        });
    });

    // Ödeme Yap Butonu (Simülatör)
    document.getElementById('btn-iap-sim-pay').addEventListener('click', () => {
        PurchaseService.confirmPayment();
    });

    // Tema Değiştirme (Aydınlık / Karanlık Mod)
    const btnThemeToggle = document.getElementById('btn-theme-toggle');
    
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            btnThemeToggle.querySelector('span').textContent = '☀️';
        } else {
            document.body.classList.remove('light-theme');
            btnThemeToggle.querySelector('span').textContent = '🌙';
        }
    }

    btnThemeToggle.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('kolayform_theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('kolayform_theme', newTheme);
        applyTheme(newTheme);
    });


    // ==========================================
    // 11. BAŞLANGIÇ İNİSİYALİZASYONU
    // ==========================================
    function initApp() {
        applyTheme(localStorage.getItem('kolayform_theme') || 'dark');
        renderCompanyCards();
        updateFilterSelectors();
        renderFormsList();
        
        // Reklam ve Premium Servislerini Başlat
        AdService.init();
        PurchaseService.init();
        updatePremiumUI();

        // Mobil Geri Tuşu (Android Back Button) Yönetimi
        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
            window.Capacitor.Plugins.App.addListener('backButton', () => {
                // 1. Açık modal var mı kontrol et ve kapat
                const openModals = document.querySelectorAll('.modal-backdrop:not(.hidden)');
                if (openModals.length > 0) {
                    const activeModal = openModals[openModals.length - 1];
                    const closeBtn = activeModal.querySelector('.modal-close, #btn-cancel-exit, #btn-close-how-to-footer');
                    if (closeBtn) {
                        closeBtn.click();
                    } else {
                        activeModal.classList.add('hidden');
                    }
                    return;
                }

                // 2. Aktif ekran kontrolü
                const activeView = Object.keys(views).find(key => !views[key].classList.contains('hidden'));
                
                if (activeView === 'companyEdit') {
                    showView('dashboard');
                } else if (activeView === 'serviceEditor' || activeView === 'quoteEditor') {
                    openExitConfirmation();
                } else {
                    window.Capacitor.Plugins.App.exitApp();
                }
            });
        }
        
        // Mobil Zooming ve Düzgün A4 Sığdırma Ayarı
        // Tarayıcı ekran genişliği 210mm (~794px) altındaysa A4 sayfasını ölçeklendir
        function applyA4Scale(wrap, page, finalScale) {
            page.style.transform = `scale(${finalScale})`;
            page.style.transformOrigin = 'top left';
            
            const baseWidth = 794; // 210mm
            const baseHeight = 297 * 3.779; // ~1122px
            
            // Zoom durumunda kaydırma çubuklarının çalışabilmesi için margin-right ve margin-bottom ayarla
            if (finalScale > 1.001) {
                page.style.marginRight = `${baseWidth * (finalScale - 1)}px`;
                page.style.marginBottom = `${baseHeight * (finalScale - 1)}px`;
            } else {
                page.style.marginRight = '0px';
                page.style.marginBottom = '0px';
            }
            
            wrap.style.height = `${baseHeight * finalScale + 40}px`;
        }

        function fitA4ToScreen() {
            if (suppressA4Fit) return; // Toplu PDF üretimi sırasında ölçeklemeyi atla
            const wrappers = document.querySelectorAll('.a4-container-wrapper');
            wrappers.forEach(wrap => {
                const page = wrap.querySelector('.a4-page');
                if (!page) return;
                
                const wrapWidth = wrap.getBoundingClientRect().width;
                const pageWidth = 794; // 210mm genişliğin pixel karşılığı
                
                let baseScale = 1.0;
                if (wrapWidth < pageWidth + 20) {
                    baseScale = (wrapWidth - 20) / pageWidth;
                }
                
                wrap.dataset.baseScale = baseScale;
                const userScale = wrap.dataset.userScale ? parseFloat(wrap.dataset.userScale) : 1.0;
                
                applyA4Scale(wrap, page, baseScale * userScale);
            });
        }
        
        // Çift parmak zoom (pinch to zoom) entegrasyonu
        const zoomWrappers = document.querySelectorAll('.a4-container-wrapper');
        zoomWrappers.forEach(wrap => {
            const page = wrap.querySelector('.a4-page');
            if (!page) return;

            let initialPinchDistance = 0;
            let initialUserScale = 1.0;

            wrap.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    initialPinchDistance = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                    initialUserScale = wrap.dataset.userScale ? parseFloat(wrap.dataset.userScale) : 1.0;
                }
            }, { passive: true });

            wrap.addEventListener('touchmove', (e) => {
                if (e.touches.length === 2 && initialPinchDistance > 0) {
                    e.preventDefault(); // Varsayılan ekran kaymasını engelle
                    
                    const currentDistance = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                    const scaleRatio = currentDistance / initialPinchDistance;
                    
                    const oldUserScale = wrap.dataset.userScale ? parseFloat(wrap.dataset.userScale) : 1.0;
                    const baseScale = wrap.dataset.baseScale ? parseFloat(wrap.dataset.baseScale) : 1.0;
                    const oldScale = baseScale * oldUserScale;

                    // userScale sınırları: 0.8 ile 3.0 arası
                    let userScale = Math.min(Math.max(0.8, initialUserScale * scaleRatio), 3.0);
                    wrap.dataset.userScale = userScale;
                    
                    const newScale = baseScale * userScale;

                    // Pinch merkezi hesaplama
                    const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                    const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
                    
                    const rect = wrap.getBoundingClientRect();
                    const viewportX = centerX - rect.left;
                    const viewportY = centerY - rect.top;
                    
                    const scrollX = wrap.scrollLeft;
                    const scrollY = wrap.scrollTop;

                    // Ölçeklemeyi uygula
                    applyA4Scale(wrap, page, newScale);

                    // Kaydırma telafisini yap (Pinch yapılan yerin merkez kalması için)
                    if (oldScale > 0) {
                        wrap.scrollLeft = ((viewportX + scrollX) / oldScale) * newScale - viewportX;
                        wrap.scrollTop = ((viewportY + scrollY) / oldScale) * newScale - viewportY;
                    }
                }
            }, { passive: false }); // preventDefault için passive: false

            wrap.addEventListener('touchend', (e) => {
                if (e.touches.length < 2) {
                    initialPinchDistance = 0;
                }
            });
        });

        window.addEventListener('resize', fitA4ToScreen);
        // Sayfa geçişlerinde tetikle
        const observer = new MutationObserver(() => {
            fitA4ToScreen();
        });
        observer.observe(views.serviceEditor, { attributes: true, attributeFilter: ['class'] });
        observer.observe(views.quoteEditor, { attributes: true, attributeFilter: ['class'] });
    }


    // ==========================================
    // 12. QR EKLENTİSİ (BELGE → QR → BELGE)
    // ==========================================
    // Veri QR'ın içinde URL fragment'ında taşınır; internete hiçbir şey yüklenmez.
    // Uygulama yüklüyse App Link ile açılır; değilse iniş sayfası Play Store'a yönlendirir (Faz 2).
    const QR_SCHEMA_VERSION = 1;
    const QR_URL_PREFIX = 'https://kolayform.app/v#KF1.'; // Placeholder domain (Faz 2'de gerçek domain)
    const QR_PREFIX_MARKER = 'KF1.';                       // Çözümlemede aranan işaret

    // --- base64url yardımcıları (URL-güvenli) ---
    function bytesToB64url(u8) {
        let bin = '';
        const CHUNK = 0x8000;
        for (let i = 0; i < u8.length; i += CHUNK) {
            bin += String.fromCharCode.apply(null, u8.subarray(i, i + CHUNK));
        }
        return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    function b64urlToBytes(s) {
        s = s.replace(/-/g, '+').replace(/_/g, '/');
        while (s.length % 4) s += '=';
        const bin = atob(s);
        const u8 = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
        return u8;
    }

    // --- QR için şirketi çöz (yeniden ihraç edilen QR'larda orijinal gömülü şirketi korur) ---
    function resolveQrCompany(form) {
        if (state.currentEditingForm && state.currentEditingForm._imported && state.currentEditingForm.importedCompany) {
            return state.currentEditingForm.importedCompany;
        }
        return state.companies.find(c => c.id === form.companyId) || {};
    }

    // --- Editör için şirketi çöz (QR ile gelen formda gömülü şirket) ---
    function resolveEditorCompany(formData) {
        if (formData && formData._imported && formData.importedCompany) return formData.importedCompany;
        return state.companies.find(c => c.id === state.activeCompanyId);
    }

    // --- Yağsız (görselsiz, kısa anahtarlı) payload üret ---
    function buildLeanPayload(form) {
        const co = resolveQrCompany(form);
        const lean = {
            v: QR_SCHEMA_VERSION,
            t: form.type,
            id: form.id,
            d: form.date,
            cn: form.clientName || '',
            cc: form.clientCity || '',
            co: { // Yalnızca metin şirket bilgisi (görsel YOK)
                n: co.name || '', a: co.address || '', p: co.phone || '',
                e: co.email || '', w: co.website || '', to: co.taxOffice || '',
                tn: co.taxNumber || '', m: co.mersisNo || ''
            }
        };
        const dd = form.data || {};
        if (form.type === 'teklif') {
            lean.ca = dd.clientAddress || '';
            lean.cond = dd.conditionsText || '';
            lean.st = dd.subtotal || '';
            lean.tx = dd.taxTotal || '';
            lean.gt = form.grandTotal || '';
            lean.it = (dd.items || []).map(i => ({ d: i.desc, q: i.qty, u: i.unit, p: i.price, k: i.kdv }));
        } else {
            lean.cb = {
                b: dd.chkBakim ? 1 : 0, o: dd.chkOnarim ? 1 : 0, a: dd.chkAriza ? 1 : 0,
                k: dd.chkKontrol ? 1 : 0, g: dd.chkGaranti ? 1 : 0, ku: dd.chkKurulum ? 1 : 0
            };
            lean.pr = dd.processText || '';
            lean.rs = dd.resultText || '';
            lean.tnm = dd.techName || '';
            lean.cp = dd.clientPerson || '';
            lean.up = dd.unitPerson || '';
            lean.dev = (dd.devices || []).map(x => ({ m: x.model, s: x.sn, c: x.contract }));
            lean.prt = (dd.parts || []).map(x => ({ c: x.code, n: x.name, q: x.qty, ch: x.changed ? 1 : 0, r: x.recommend ? 1 : 0 }));
        }
        return lean;
    }

    // --- Form → QR URL (deflate + base64url) ---
    function buildQrUrl(form) {
        const json = JSON.stringify(buildLeanPayload(form));
        const deflated = pako.deflate(json);
        return QR_URL_PREFIX + bytesToB64url(deflated);
    }

    // --- PDF anında textarea'ları sol-üst hizalı, içeriğe oturan div'lerle değiştir; geri yükleyiciyi döndür ---
    function swapTextareasForPrint(element) {
        const created = [];
        element.querySelectorAll('textarea.print-textarea').forEach(ta => {
            const div = document.createElement('div');
            div.className = 'print-textarea-clone';
            div.textContent = ta.value;
            ta.style.display = 'none';
            ta.parentNode.insertBefore(div, ta.nextSibling);
            created.push({ ta, div });
        });
        return function restore() {
            created.forEach(({ ta, div }) => {
                ta.style.display = '';
                if (div.parentNode) div.parentNode.removeChild(div);
            });
        };
    }

    // --- html2canvas radio/checkbox işaretlerini bozabilir; durumlarını koru ve geri yükle ---
    function preserveCheckStates(element) {
        const saved = [];
        element.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(inp => {
            saved.push({ inp, checked: inp.checked });
        });
        return function restore() {
            saved.forEach(({ inp, checked }) => { inp.checked = checked; });
        };
    }

    // --- QR görselini footer/imza satırı ortasındaki kaba bas (sadece PDF anında). showWarn: tekli PDF'te uyarı ---
    function injectQrIntoPrintArea(form, showWarn) {
        const containerId = form.type === 'servis' ? 'srv-print-qr' : 'qte-print-qr';
        const container = document.getElementById(containerId);
        if (!container) return false;
        container.innerHTML = '';

        // QR kod ekleme özelligini yalnızca pro ve ayarı açık kullanıcılar için çalıştır
        if (!state.settings.isPremium || state.settings.enableQr === false) {
            return false;
        }

        try {
            const url = buildQrUrl(form);
            const qr = qrcode(0, 'M');     // Otomatik versiyon, EC seviyesi M
            qr.addData(url);               // Byte modu (ASCII)
            qr.make();                     // Veri çok büyükse burada hata fırlatır
            const dataUrl = qr.createDataURL(6); // 6px/modül, varsayılan 4-modül sessiz alan
            container.innerHTML = '<img src="' + dataUrl + '" alt="QR Doğrulama Kodu">';
            return true;
        } catch (e) {
            console.warn('QR üretilemedi (veri QR kapasitesini aşmış olabilir):', e);
            if (showWarn) {
                alert('Bu form, QR koduna sığmayacak kadar büyük (çok fazla kalem veya çok uzun metin). Belge QR olmadan oluşturulacak.');
            }
            return false;
        }
    }

    // --- QR metnini çöz → form nesnesi (veya null) ---
    function parseQrPayload(text) {
        if (!text) return null;
        const idx = text.indexOf(QR_PREFIX_MARKER);
        if (idx === -1) return null;
        const b64 = text.substring(idx + QR_PREFIX_MARKER.length);
        let lean;
        try {
            const json = pako.inflate(b64urlToBytes(b64), { to: 'string' });
            lean = JSON.parse(json);
        } catch (e) {
            console.warn('QR çözme/açma hatası:', e);
            return null;
        }
        if (!lean || lean.v !== QR_SCHEMA_VERSION || !lean.t) return null;
        return leanToForm(lean);
    }

    // --- Yağsız payload → tam form nesnesi (gömülü metin şirketiyle) ---
    function leanToForm(L) {
        const co = L.co || {};
        const importedCompany = {
            id: '__imported__', name: co.n || '', address: co.a || '', phone: co.p || '',
            email: co.e || '', website: co.w || '', taxOffice: co.to || '', taxNumber: co.tn || '',
            mersisNo: co.m || '', logo: null, stamp: null, signature: null, stamps: []
        };
        const form = {
            id: L.id, type: L.t, date: L.d,
            companyId: '__imported__',
            clientName: L.cn || '', clientCity: L.cc || '',
            grandTotal: '', data: {}, signatures: {},
            _imported: true, importedCompany: importedCompany
        };
        if (L.t === 'teklif') {
            form.grandTotal = L.gt || '';
            form.data = {
                clientAddress: L.ca || '', conditionsText: L.cond || '',
                subtotal: L.st || '', taxTotal: L.tx || '',
                items: (L.it || []).map(i => ({ desc: i.d || '', qty: i.q, unit: i.u || '', price: i.p, kdv: i.k }))
            };
        } else {
            const cb = L.cb || {};
            form.data = {
                chkBakim: !!cb.b, chkOnarim: !!cb.o, chkAriza: !!cb.a,
                chkKontrol: !!cb.k, chkGaranti: !!cb.g, chkKurulum: !!cb.ku,
                processText: L.pr || '', resultText: L.rs || '',
                techName: L.tnm || '', clientPerson: L.cp || '', unitPerson: L.up || '',
                devices: (L.dev || []).map(x => ({ model: x.m || '', sn: x.s || '', contract: x.c || 'yok' })),
                parts: (L.prt || []).map(x => ({ code: x.c || '', name: x.n || '', qty: x.q || 1, changed: !!x.ch, recommend: !!x.r }))
            };
        }
        return form;
    }

    // --- Kaydederken QR ile alınan formun gömülü şirket/işaret bilgilerini koru ---
    function applyImportedMetaToFormData(formData) {
        const cur = state.currentEditingForm;
        if (cur && cur._imported) {
            formData.companyId = '__imported__';
            formData._imported = true;
            formData.importedCompany = cur.importedCompany;
        }
    }

    // --- QR ile alınan belgeyi editörde aç (görseller yerine doğrulama notu) ---
    function openImportedForm(form) {
        if (!form) return;
        if (form.type === 'servis') {
            openServiceFormEditor(form);
        } else {
            openQuoteFormEditor(form);
        }
        applyImportedDocStyling(form);
    }

    function applyImportedDocStyling(form) {
        const noteHtml = '<span class="qr-verified-note">✓ Kolay Form QR ile<br>dijital olarak aktarıldı</span>';
        // Kaydet butonu QR ile alınan belgelerde de açık kalır (geçmişe kaydedilebilir)

        if (form.type === 'servis') {
            const stamp = document.getElementById('srv-print-stamp');
            if (stamp) { stamp.style.display = 'flex'; stamp.innerHTML = noteHtml; }
            ['srv-sig-tech-img-cont', 'srv-sig-client-img-cont', 'srv-sig-unit-img-cont'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = '<span class="sig-placeholder-text">— QR ile alındı —</span>';
            });
        } else {
            const stampImg = document.getElementById('qte-print-stamp-img');
            const sigImg = document.getElementById('qte-print-sig-img');
            const wrapper = document.getElementById('qte-stamp-sig-container');
            if (wrapper) { wrapper.classList.remove('stamp-centered'); wrapper.onclick = null; }
            if (stampImg) stampImg.innerHTML = noteHtml;
            if (sigImg) sigImg.innerHTML = '';
        }
    }

    // --- Kamera tarama motoru (getUserMedia + jsQR) ---
    let qrScanStream = null;
    let qrScanRAF = null;
    let qrScannedForm = null;
    let qrWorkCanvasEl = null;

    function qrWorkCanvas() {
        if (!qrWorkCanvasEl) qrWorkCanvasEl = document.createElement('canvas');
        return qrWorkCanvasEl;
    }

    function setScanStatus(html) {
        document.getElementById('qr-scan-status').innerHTML = html;
    }

    function openQrScanner() {
        qrScannedForm = null;
        document.getElementById('qr-scan-result').classList.add('hidden');
        document.getElementById('btn-qr-open-doc').classList.add('hidden');
        document.getElementById('qr-scan-viewport').classList.remove('hidden');
        setScanStatus('Kamera başlatılıyor…');
        document.getElementById('modal-qr-scan').classList.remove('hidden');
        startQrCamera();
    }

    function closeQrScanner() {
        stopQrCamera();
        document.getElementById('modal-qr-scan').classList.add('hidden');
    }

    function stopQrCamera() {
        if (qrScanRAF) { cancelAnimationFrame(qrScanRAF); qrScanRAF = null; }
        if (qrScanStream) { qrScanStream.getTracks().forEach(t => t.stop()); qrScanStream = null; }
        const v = document.getElementById('qr-scan-video');
        if (v) v.srcObject = null;
    }

    async function startQrCamera() {
        const video = document.getElementById('qr-scan-video');
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setScanStatus('📷 Bu ortamda kamera kullanılamıyor. Lütfen <strong>"Görüntüden Tara"</strong> ile QR fotoğrafı yükleyin.');
            return;
        }
        try {
            qrScanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            video.srcObject = qrScanStream;
            await video.play();
            setScanStatus('QR kodu çerçeveye getirin…');
            qrScanRAF = requestAnimationFrame(scanLoop);
        } catch (e) {
            console.warn('Kamera açılamadı:', e);
            setScanStatus('📷 Kameraya erişilemedi. Lütfen <strong>"Görüntüden Tara"</strong> ile QR fotoğrafı yükleyin.');
        }
    }

    function scanLoop() {
        const video = document.getElementById('qr-scan-video');
        if (!qrScanStream || !video) return;
        if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0) {
            const canvas = qrWorkCanvas();
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imgData.data, imgData.width, imgData.height, { inversionAttempts: 'dontInvert' });
            if (code && code.data) {
                const form = parseQrPayload(code.data);
                if (form) { onQrDecoded(form); return; }
                // QR var ama Kolay Form belgesi değil → taramaya devam
            }
        }
        qrScanRAF = requestAnimationFrame(scanLoop);
    }

    function scanFromImageFile(file) {
        setScanStatus('Görüntü taranıyor…');
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = qrWorkCanvas();
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                let w = img.width, h = img.height;
                const MAX = 1600;
                if (Math.max(w, h) > MAX) { const r = MAX / Math.max(w, h); w = Math.round(w * r); h = Math.round(h * r); }
                canvas.width = w; canvas.height = h;
                ctx.drawImage(img, 0, 0, w, h);
                const d = ctx.getImageData(0, 0, w, h);
                const code = jsQR(d.data, d.width, d.height);
                if (code && code.data) {
                    const form = parseQrPayload(code.data);
                    if (form) { onQrDecoded(form); return; }
                    setScanStatus('⚠️ Okunan QR bir Kolay Form belgesi değil.');
                } else {
                    setScanStatus('⚠️ Görüntüde QR kodu bulunamadı. Daha net bir fotoğraf deneyin.');
                }
            };
            img.onerror = () => setScanStatus('⚠️ Görüntü yüklenemedi.');
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function onQrDecoded(form) {
        stopQrCamera();
        qrScannedForm = form;
        document.getElementById('qr-res-type').textContent = form.type === 'servis' ? 'Teknik Servis Formu' : 'Proforma Fiyat Teklifi';
        document.getElementById('qr-res-id').textContent = form.id || '—';
        document.getElementById('qr-res-client').textContent = form.clientName || '—';
        document.getElementById('qr-res-total').textContent = form.type === 'teklif'
            ? formatCurrency(parseFloat(form.grandTotal || 0)) : 'Ücretsiz';
        document.getElementById('qr-scan-viewport').classList.add('hidden');
        document.getElementById('qr-scan-result').classList.remove('hidden');
        setScanStatus('✓ Belge başarıyla okundu.');
        document.getElementById('btn-qr-open-doc').classList.remove('hidden');
    }

    // --- QR eklentisi olay dinleyicileri ---
    document.getElementById('btn-scan-qr').addEventListener('click', openQrScanner);
    document.getElementById('btn-close-qr-scan').addEventListener('click', closeQrScanner);
    document.getElementById('btn-qr-from-image').addEventListener('click', () => {
        document.getElementById('qr-file-input').click();
    });
    document.getElementById('qr-file-input').addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) scanFromImageFile(e.target.files[0]);
        e.target.value = '';
    });
    document.getElementById('btn-qr-open-doc').addEventListener('click', () => {
        const f = qrScannedForm;
        closeQrScanner();
        if (f) openImportedForm(f);
    });


    // ==========================================
    // 13. GÖRSEL KIRPMA (4 KÖŞE SERBEST — PERSPEKTİF DÜZELTME)
    // ==========================================
    // Kullanıcı 4 köşeyi serbestçe sürükler; seçilen dörtgen homografi ile
    // düz bir dikdörtgene çevrilir (belge tarayıcı tarzı deskew).
    let cropImg = null;
    let cropPoints = [];        // overlay (ekran) piksel koordinatlarında 4 köşe: TL, TR, BR, BL
    let cropOnApply = null;
    let cropDragIndex = -1;
    let cropNatW = 0, cropNatH = 0;

    function openCropper(dataUrl, onApply) {
        cropOnApply = onApply;
        const img = new Image();
        img.onload = () => {
            cropImg = img;
            cropNatW = img.naturalWidth;
            cropNatH = img.naturalHeight;

            const canvas = document.getElementById('crop-canvas');
            const overlay = document.getElementById('crop-overlay');
            const maxW = Math.min(480, window.innerWidth - 80);
            const maxH = Math.min(440, window.innerHeight - 250);
            const scale = Math.min(maxW / cropNatW, maxH / cropNatH, 1);
            const dw = Math.max(1, Math.round(cropNatW * scale));
            const dh = Math.max(1, Math.round(cropNatH * scale));

            canvas.width = dw; canvas.height = dh;
            overlay.width = dw; overlay.height = dh;
            canvas.getContext('2d').drawImage(img, 0, 0, dw, dh);

            resetCropPoints();
            drawCropOverlay();
            document.getElementById('modal-crop').classList.remove('hidden');
        };
        img.onerror = () => alert('Görsel yüklenemedi.');
        img.src = dataUrl;
    }

    function resetCropPoints() {
        const o = document.getElementById('crop-overlay');
        const ix = o.width * 0.08, iy = o.height * 0.08;
        cropPoints = [
            { x: ix, y: iy },
            { x: o.width - ix, y: iy },
            { x: o.width - ix, y: o.height - iy },
            { x: ix, y: o.height - iy }
        ];
    }

    function drawCropOverlay() {
        const o = document.getElementById('crop-overlay');
        const ctx = o.getContext('2d');
        ctx.clearRect(0, 0, o.width, o.height);

        // Dörtgen dışını karart
        ctx.fillStyle = 'rgba(8, 13, 22, 0.55)';
        ctx.fillRect(0, 0, o.width, o.height);
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.moveTo(cropPoints[0].x, cropPoints[0].y);
        for (let i = 1; i < 4; i++) ctx.lineTo(cropPoints[i].x, cropPoints[i].y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Dörtgen kenarları
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cropPoints[0].x, cropPoints[0].y);
        for (let i = 1; i < 4; i++) ctx.lineTo(cropPoints[i].x, cropPoints[i].y);
        ctx.closePath();
        ctx.stroke();

        // Köşe tutamaçları
        cropPoints.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(6, 182, 212, 0.9)';
            ctx.fill();
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
        });
    }

    function cropPointerPos(e) {
        const o = document.getElementById('crop-overlay');
        const rect = o.getBoundingClientRect();
        const cx = (e.touches && e.touches.length) ? e.touches[0].clientX : e.clientX;
        const cy = (e.touches && e.touches.length) ? e.touches[0].clientY : e.clientY;
        return {
            x: (cx - rect.left) * (o.width / rect.width),
            y: (cy - rect.top) * (o.height / rect.height)
        };
    }

    function cropDown(e) {
        if (!cropImg) return;
        const p = cropPointerPos(e);
        let best = -1, bestD = 1e9;
        cropPoints.forEach((pt, i) => {
            const d = Math.hypot(pt.x - p.x, pt.y - p.y);
            if (d < bestD) { bestD = d; best = i; }
        });
        if (bestD <= 28) { cropDragIndex = best; e.preventDefault(); }
    }

    function cropMove(e) {
        if (cropDragIndex < 0) return;
        e.preventDefault();
        const o = document.getElementById('crop-overlay');
        const p = cropPointerPos(e);
        cropPoints[cropDragIndex].x = Math.max(0, Math.min(o.width, p.x));
        cropPoints[cropDragIndex].y = Math.max(0, Math.min(o.height, p.y));
        drawCropOverlay();
    }

    function cropUp() { cropDragIndex = -1; }

    // 4 nokta eşleşmesinden homografi çöz (dst -> src eşlemesi): [a,b,c,d,e,f,g,h]
    function solvePerspective(src, dst) {
        const A = [], b = [];
        for (let i = 0; i < 4; i++) {
            const dx = dst[i].x, dy = dst[i].y, sx = src[i].x, sy = src[i].y;
            A.push([dx, dy, 1, 0, 0, 0, -dx * sx, -dy * sx]); b.push(sx);
            A.push([0, 0, 0, dx, dy, 1, -dx * sy, -dy * sy]); b.push(sy);
        }
        return gaussSolve(A, b);
    }

    function gaussSolve(A, b) {
        const n = b.length;
        const M = A.map((row, i) => row.concat(b[i]));
        for (let col = 0; col < n; col++) {
            let piv = col;
            for (let r = col + 1; r < n; r++) {
                if (Math.abs(M[r][col]) > Math.abs(M[piv][col])) piv = r;
            }
            const tmp = M[col]; M[col] = M[piv]; M[piv] = tmp;
            const pv = M[col][col];
            if (Math.abs(pv) < 1e-12) continue;
            for (let r = 0; r < n; r++) {
                if (r === col) continue;
                const f = M[r][col] / pv;
                for (let c = col; c <= n; c++) M[r][c] -= f * M[col][c];
            }
        }
        const x = new Array(n);
        for (let i = 0; i < n; i++) x[i] = M[i][n] / M[i][i];
        return x;
    }

    function applyCrop() {
        if (!cropImg || !cropOnApply) return;
        const o = document.getElementById('crop-overlay');
        const sxR = cropNatW / o.width, syR = cropNatH / o.height;
        // overlay (ekran) köşelerini orijinal görsel koordinatlarına çevir (TL,TR,BR,BL)
        const src = cropPoints.map(p => ({ x: p.x * sxR, y: p.y * syR }));

        const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
        let outW = Math.round(Math.max(dist(src[0], src[1]), dist(src[3], src[2])));
        let outH = Math.round(Math.max(dist(src[0], src[3]), dist(src[1], src[2])));
        outW = Math.max(8, outW); outH = Math.max(8, outH);
        const cap = 500, longest = Math.max(outW, outH);
        if (longest > cap) { const r = cap / longest; outW = Math.round(outW * r); outH = Math.round(outH * r); }

        const dst = [{ x: 0, y: 0 }, { x: outW, y: 0 }, { x: outW, y: outH }, { x: 0, y: outH }];
        const H = solvePerspective(src, dst); // dst -> src

        // Kaynak piksellerini oku
        const sc = document.createElement('canvas');
        sc.width = cropNatW; sc.height = cropNatH;
        const sctx = sc.getContext('2d');
        sctx.drawImage(cropImg, 0, 0);
        const sdata = sctx.getImageData(0, 0, cropNatW, cropNatH).data;

        const out = document.createElement('canvas');
        out.width = outW; out.height = outH;
        const octx = out.getContext('2d');
        const odata = octx.createImageData(outW, outH);
        const od = odata.data;

        for (let y = 0; y < outH; y++) {
            for (let x = 0; x < outW; x++) {
                const denom = H[6] * x + H[7] * y + 1;
                const ux = (H[0] * x + H[1] * y + H[2]) / denom;
                const uy = (H[3] * x + H[4] * y + H[5]) / denom;
                const oi = (y * outW + x) * 4;
                if (ux < 0 || uy < 0 || ux > cropNatW - 1 || uy > cropNatH - 1) {
                    od[oi] = 0; od[oi + 1] = 0; od[oi + 2] = 0; od[oi + 3] = 0; // dış: şeffaf
                    continue;
                }
                const x0 = Math.floor(ux), y0 = Math.floor(uy);
                const x1 = Math.min(x0 + 1, cropNatW - 1), y1 = Math.min(y0 + 1, cropNatH - 1);
                const fx = ux - x0, fy = uy - y0;
                for (let c = 0; c < 4; c++) {
                    const p00 = sdata[(y0 * cropNatW + x0) * 4 + c];
                    const p10 = sdata[(y0 * cropNatW + x1) * 4 + c];
                    const p01 = sdata[(y1 * cropNatW + x0) * 4 + c];
                    const p11 = sdata[(y1 * cropNatW + x1) * 4 + c];
                    const top = p00 + (p10 - p00) * fx;
                    const bot = p01 + (p11 - p01) * fx;
                    od[oi + c] = top + (bot - top) * fy;
                }
            }
        }
        octx.putImageData(odata, 0, 0);
        const result = out.toDataURL('image/png');

        document.getElementById('modal-crop').classList.add('hidden');
        const cb = cropOnApply;
        cropOnApply = null; cropImg = null;
        cb(result);
    }

    // Kırpma modalı olay dinleyicileri
    document.getElementById('btn-close-crop').addEventListener('click', () => {
        document.getElementById('modal-crop').classList.add('hidden');
        cropOnApply = null; cropImg = null; cropDragIndex = -1;
    });
    document.getElementById('btn-crop-reset').addEventListener('click', () => {
        if (cropImg) { resetCropPoints(); drawCropOverlay(); }
    });
    document.getElementById('btn-crop-apply').addEventListener('click', applyCrop);

    const cropOverlayEl = document.getElementById('crop-overlay');
    cropOverlayEl.addEventListener('mousedown', cropDown);
    window.addEventListener('mousemove', cropMove);
    window.addEventListener('mouseup', cropUp);
    cropOverlayEl.addEventListener('touchstart', cropDown, { passive: false });
    cropOverlayEl.addEventListener('touchmove', cropMove, { passive: false });
    window.addEventListener('touchend', cropUp);

});
