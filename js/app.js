/* ==========================================================================
   KOLAY FORM - JAVASCRIPT MOTORU (ES6)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // TRANSLATIONS & MULTI-LANGUAGE ENGINE
    // ==========================================
    const translations = {
        tr: {
            "btn-theme-toggle": "Tema Değiştir",
            "btn-feedback": "Geri Bildirim & Hakkında",
            "btn-how-to": "Nasıl Kullanılır?",
            "btn-settings": "Ayarlar",
            "btn-go-premium": "Premium'a Geç",
            "dashboard-title-companies": "Şirketiniz",
            "dashboard-btn-create": "Form Oluştur",
            "dashboard-btn-company": "Şirket Ekle",
            "dashboard-btn-qr": "QR Oku",
            "dashboard-security-note": "🔒 Oluşturulan formlar ve eklenen kaşeler yalnızca telefonunuzda saklanmaktadır.",
            "dashboard-title-past": "Geçmiş Formlar",
            "dashboard-btn-bulk": "Toplu İndir",
            "dashboard-btn-filter": "Filtrele",
            "filter-label-search": "Ara",
            "filter-search-placeholder": "Müşteri Adı, Form ID veya Cihaz...",
            "filter-label-type": "Form Türü",
            "filter-type-all": "Tümü",
            "filter-type-servis": "Servis Formu",
            "filter-type-teklif": "Teklif Formu",
            "filter-label-company": "Şirket",
            "filter-company-all": "Tüm Şirketler",
            "settings-title": "Genel Ayarlar",
            "settings-label-kdv": "Varsayılan KDV Oranı (%)",
            "settings-label-currency": "Varsayılan Para Birimi Sembolü",
            "settings-label-lang": "Varsayılan Dil (Default Language)",
            "settings-qr-text": "PDF Çıktılarına QR Doğrulama Kodu Ekle",
            "settings-qr-lock": "👑 Sadece Pro",
            "settings-premium-label": "Abonelik Durumu",
            "settings-btn-save": "Ayarları Kaydet",
            "howto-title": "Uygulama Kullanım Kılavuzu",
            "howto-step1-title": "Şirketini Ekle:",
            "howto-step1-desc": "\"Şirket Ekle\" butonuna basarak firmanızın unvan, adres, vergi dairesi ve no bilgilerini girin. Logo, kaşe ve damgaları yükleyin.",
            "howto-step2-title": "Aktif Şirketi Seç:",
            "howto-step2-desc": "Ana panelin üst kısmından hangi şirketinizle işlem yapacaksanız o şirketinin kartına tıklayıp aktif hale getirin.",
            "howto-step3-title": "Form Oluştur:",
            "howto-step3-desc": "\"Form Oluştur\" butonuna basın, Servis veya Teklif formundan birini seçerek düzenleme ekranına geçin.",
            "howto-step4-title": "Tıkla ve Doldur (Inline Edit):",
            "howto-step4-desc": "Form üzerindeki tüm alanlar etkileşimlidir. Cihazları, kalemleri veya yapılan işlemleri tıklayarak klavyenizle doğrudan doldurun.",
            "howto-step5-title": "İmzalat ve PDF İndir:",
            "howto-step5-desc": "İmza kutularına tıklayarak telefon ekranından parmakla dijital imza attırın. Üst bardaki \"PDF İndir\" butonuna basarak anında A4 boyutunda çıktısını indirin. Formunuz yerel geçmişe de otomatik olarak kaydedilecektir.",
            "howto-btn-close": "Anladım",
            "create-title": "Yeni Form Oluştur",
            "create-label-company": "Şirketiniz",
            "create-label-type": "Form Kategorisi",
            "create-option-servis": "Teknik Servis Bilgi Formu",
            "create-option-teklif": "Proforma Fiyat Teklifi",
            "create-btn-start": "Formu Hazırla ➡️",
            "sigpad-title": "Dokunmatik İmza Paneli",
            "sigpad-warning": "⚠️ Bu imza yalnızca bu oluşturulan formda tek seferlik kullanılmak üzere alınmaktadır.",
            "sigpad-btn-clear": "🧹 Temizle",
            "sigpad-btn-blank": "📭 Boş Bırak",
            "sigpad-btn-preset": "👤 Hazır İmzamı Kullan",
            "sigpad-btn-save": "💾 İmzayı Ekle",
            "exit-title": "Çıkış Onayı",
            "exit-message": "Kaydedilmemiş değişiklikler kaybolabilir. Çıkmak istediğinizden emin misiniz?",
            "exit-btn-cancel": "Vazgeç",
            "exit-btn-confirm": "Çıkış Yap",
            "feedback-title": "Geri Bildirim & Hakkında",
            "feedback-tab-feedback": "💬 Geri Bildirim",
            "feedback-tab-about": "ℹ️ Hakkında & Kredi",
            "feedback-desc": "Görüş, öneri veya hata bildirimlerinizi geliştiriciye doğrudan iletebilirsiniz.",
            "feedback-label-msg": "Mesajınız",
            "feedback-placeholder": "Geri bildiriminizi buraya yazın...",
            "feedback-btn-send": "Geri Bildirimi Gönder",
            "about-title": "Kolay Form v1.1.0",
            "about-desc": "Bu uygulama, teknik servis ekiplerinin ve işletmelerin hızlı, pratik ve çevrimdışı (offline) form & teklif yönetimi yapabilmesi amacıyla geliştirilmiştir.",
            "about-dev-title": "Geliştirici & Krediler:",
            "about-dev-desc": "💻 <strong>Tasarım & Geliştirme:</strong> Alieren3D<br>🎯 <strong>Vizyon & Katkılar:</strong> Haydar Şeker<br>🔒 <strong>Gizlilik:</strong> Uygulama tamamen cihazınızda çalışır, hiçbir veri uzak sunucuya aktarılmaz.",
            "bulk-title": "Toplu PDF İndiriliyor",
            "bulk-progress": "Hazırlanıyor...",
            "qrscan-title": "📷 QR ile Belge Al",
            "qrscan-status": "Kamera başlatılıyor…",
            "qrscan-label-type": "Belge Türü",
            "qrscan-label-no": "Belge No",
            "qrscan-label-client": "Müşteri",
            "qrscan-label-total": "Tutar",
            "qrscan-note": "İpucu: QR okunmuyorsa, QR'ın net göründüğü bir fotoğrafı yükleyerek de tarayabilirsiniz.",
            "qrscan-btn-image": "🖼️ Görüntüden Tara",
            "qrscan-btn-open": "📄 Belgeyi Aç",
            "crop-title": "✂️ Görseli Kırp / Düzelt",
            "crop-hint": "4 köşeyi sürükleyerek kırpılacak alanı belirleyin. Seçilen dörtgen düzeltilerek dik bir dikdörtgene çevrilir.",
            "crop-btn-reset": "↺ Sıfırla",
            "crop-btn-apply": "✓ Uygula",
            "premium-title": "👑 Kolay Form Premium",
            "premium-hero-title": "Sınırsız Gücü Serbest Bırakın",
            "premium-hero-desc": "Uygulamayı reklamsız kullanın, toplu indirmeleri sınırsızca yapın ve profesyonelliğinizi artırın.",
            "premium-benefit1": "✓ <strong>Sınırsız PDF İndirme:</strong> Günlük indirme limitini kaldırın ve reklam izlemeden anında indirin.",
            "premium-benefit2": "✓ <strong>PDF QR Doğrulama Kodu:</strong> PDF çıktılarınızın altına dijital doğrulama ve aktarım için QR kod ekleyin.",
            "premium-benefit3": "✓ <strong>Toplu PDF İndirme:</strong> Tüm geçmiş arşivi tek tuşla birleşik PDF raporu olarak indirin.",
            "premium-benefit4": "✓ <strong>Sınırsız Şirket Profili:</strong> İstediğiniz kadar şirket tanımlayın ve yönetin.",
            "premium-btn-buy": "Satın Al",
            "premium-plan-monthly": "Aylık",
            "premium-plan-monthly-desc": "Küçük işletmeler ve serbest çalışanlar için ideal.",
            "premium-plan-yearly": "Yıllık",
            "premium-plan-yearly-desc": "Uzun vadeli kullanımda en iyi tasarruf.",
            "premium-plan-enterprise": "Sınırsız",
            "premium-plan-enterprise-desc": "Büyük ekipler ve yoğun kullanım için.",
            "company-label-name": "Şirket Adı",
            "company-placeholder-name": "Örn: ABC Ajans Ltd. Şti.",
            "company-label-phone": "Telefon",
            "company-placeholder-phone": "Örn: 0216 216 16 16",
            "company-label-email": "E-Posta",
            "company-placeholder-email": "info@abc.com",
            "company-label-website": "Web Sitesi",
            "company-placeholder-website": "Örn: www.abc.com",
            "company-label-taxoffice": "Vergi Dairesi",
            "company-placeholder-taxoffice": "Beşiktaş",
            "company-label-taxnumber": "Vergi Numarası",
            "company-placeholder-taxnumber": "Örn: 1234567890",
            "company-label-mersis": "Mersis No",
            "company-placeholder-mersis": "Örn: 1234567890123456",
            "company-label-address": "Şirket Adresi",
            "company-placeholder-address": "Örn: Hisar Mah. 1202 Sk. No: 99 Beşiktaş/İstanbul",
            "company-section-media": "Şirket Görselleri (Sıkıştırılmış & Kaydedilmiş)",
            "company-label-logo": "Şirket Logosu",
            "company-placeholder-logo": "Logo Seç/Bırak",
            "company-btn-crop": "✂️ Kırp / Düzelt",
            "company-label-stamp": "Şirket Kaşesi",
            "company-placeholder-stamp": "Kaşe Seç/Bırak",
            "company-label-sig": "Varsayılan Yetkili İmzası",
            "company-btn-draw-sig": "✍️ İmza Çiz",
            "company-or": "veya",
            "company-placeholder-sig-empty": "İmza Yok",
            "company-section-certs": "Tescil/Sertifika Damgaları (TSE, ISO, CE vb.)",
            "company-btn-add-cert": "➕ Damga Ekle",
            "company-btn-save": "Şirketi Kaydet",
            "company-btn-delete": "Şirketi Sil",
            "service-title": "Servis Formu Düzenleyici",
            "service-btn-exit": "⬅️ Çıkış",
            "service-btn-save": "💾 Kaydet",
            "service-btn-pdf": "📥 PDF İndir",
            "service-print-title": "TEKNİK SERVİS BİLGİ FORMU",
            "service-print-label-date": "Tarih:",
            "service-print-label-no": "No:",
            "service-print-section-client": "KURUM BİLGİLERİ",
            "service-print-label-client-name": "Kurum Adı:",
            "service-print-placeholder-client-name": "Kurum adını yazın...",
            "service-print-label-city": "Şehir:",
            "service-print-placeholder-city": "Şehir yazın...",
            "service-print-section-device": "CİHAZ BİLGİLERİ",
            "service-print-btn-add-device": "➕ Satır Ekle",
            "service-print-th-model": "Marka / Model",
            "service-print-th-sn": "Künye / Seri No",
            "service-print-th-contract": "Bakım Anlaşması",
            "service-print-th-action": "İşlem",
            "service-print-section-reason": "SERVİS NEDENİ",
            "service-print-chk-bakim": " Bakım",
            "service-print-chk-onarim": " Onarım",
            "service-print-chk-ariza": " Arıza Tespiti",
            "service-print-chk-kontrol": " Kontrol",
            "service-print-chk-garanti": " Garanti",
            "service-print-chk-kurulum": " Kurulum",
            "service-print-section-process": "YAPILAN İŞLEM",
            "service-print-placeholder-process": "Servis sürecinde yapılan işlemleri detaylandırın...",
            "service-print-section-parts": "DEĞİŞİMİ TAVSİYE EDİLEN / DEĞİŞEN PARÇALAR",
            "service-print-btn-add-part": "➕ Parça Ekle",
            "service-print-th-part-code": "Parça Kodu",
            "service-print-th-part-name": "Yedek Parça İsmi",
            "service-print-th-part-qty": "Adet",
            "service-print-th-part-changed": "Değişti",
            "service-print-th-part-recommend": "Tavsiye",
            "service-print-section-result": "SONUÇ",
            "service-print-placeholder-result": "Servis sonucu veya tavsiyeler...",
            "service-print-section-signatures": "ONAY VE İMZALAR",
            "service-print-sig-tech": "FİRMA YETKİLİSİ",
            "service-print-sig-client": "KURUM SORUMLUSU",
            "service-print-sig-unit": "KLİNİK MÜH. / TEKNİK BİRİM",
            "service-print-placeholder-sign": "İmza Atmak İçin Tıklayın",
            "service-print-placeholder-name": "İsim Soyisim",
            "service-print-placeholder-name-unit": "İsim Soyisim / Birim",
            "service-print-footer-text": "Oluşturulan bu teknik servis formu elektronik ortamda onaylanmıştır.",
            "quote-title": "Fiyat Teklifi Düzenleyici",
            "quote-btn-exit": "⬅️ Çıkış",
            "quote-btn-save": "💾 Kaydet",
            "quote-btn-pdf": "📥 PDF İndir",
            "quote-print-title": "PROFORMA FİYAT TEKLİF MEKTUBU",
            "quote-print-footer-text": "Oluşturulan bu Proforma teklif mektubu elektronik ortamda onaylanmıştır.",
            "quote-print-section-client": "TEKLİF SUNULAN KURUM",
            "quote-print-placeholder-client-name": "Kişi / Kurum Adı yazınız...",
            "quote-print-placeholder-client-addr": "Kurum adresi...",
            "quote-print-placeholder-client-city": "Şehir yazın...",
            "quote-print-section-meta": "TEKLİF BİLGİLERİ",
            "quote-print-label-date": "TARİH:",
            "quote-print-label-no": "TEKLİF NO:",
            "quote-print-placeholder-no": "Örn: DRP-0621",
            "quote-print-section-items": "TEKLİF KALEMLERİ",
            "quote-print-btn-add-item": "➕ Kalem Ekle",
            "quote-print-th-index": "Sıra",
            "quote-print-th-desc": "Mal / Hizmet Açıklaması",
            "quote-print-th-qty": "Miktar",
            "quote-print-th-unit": "Birim",
            "quote-print-th-price": "Birim Fiyat",
            "quote-print-th-discount": "İskonto %",
            "quote-print-th-kdv": "KDV %",
            "quote-print-th-total": "Toplam",
            "quote-print-th-action": "İşlem",
            "quote-print-label-subtotal": "Ara Toplam:",
            "quote-print-label-tax": "KDV Toplamı:",
            "quote-print-label-grand": "Genel Toplam:",
            "quote-print-section-conditions": "TEKLİF KOŞULLARI VE ŞARTLARI",
            "quote-print-placeholder-conditions": "* Fiyatlarımız KDV hariçtir.\n* Teslim süresi 15 gündür.",
            "quote-print-sig-title": "Kaşe & Yetkili İmza",
            "pro-title": "👑 Kolay Form Pro",
            "pro-badge-text": "Pro Pakete Sahipsiniz!",
            "pro-thanks-text": "Uygulamamızı desteklediğiniz için yürekten teşekkür ederiz. Pro üyelik avantajlarınızın keyfini çıkarın!",
            "pro-sub-type-label": "Abonelik Tipi:",
            "pro-sub-start-label": "Başlangıç Tarihi:",
            "pro-feat-unlimited": "✓ Sınırsız PDF İndirme",
            "pro-feat-qr": "✓ QR Kod Doğrulama",
            "pro-feat-bulk": "✓ Toplu PDF İndirme",
            "pro-feat-companies": "✓ Sınırsız Şirket Profilili",
            "pro-btn-close": "Harika!"
        },
        en: {
            "btn-theme-toggle": "Toggle Theme",
            "btn-feedback": "Feedback & About",
            "btn-how-to": "How to Use?",
            "btn-settings": "Settings",
            "btn-go-premium": "Upgrade to Pro",
            "dashboard-title-companies": "Your Companies",
            "dashboard-btn-create": "Create Form",
            "dashboard-btn-company": "Add Company",
            "dashboard-btn-qr": "Scan QR",
            "dashboard-security-note": "🔒 Created forms and added stamps are only stored on your phone.",
            "dashboard-title-past": "Past Forms",
            "dashboard-btn-bulk": "Bulk Download",
            "dashboard-btn-filter": "Filter",
            "filter-label-search": "Search",
            "filter-search-placeholder": "Client Name, Form ID or Device...",
            "filter-label-type": "Form Type",
            "filter-type-all": "All",
            "filter-type-servis": "Service Form",
            "filter-type-teklif": "Quote Form",
            "filter-label-company": "Company",
            "filter-company-all": "All Companies",
            "settings-title": "General Settings",
            "settings-label-kdv": "Default VAT Rate (%)",
            "settings-label-currency": "Default Currency Symbol",
            "settings-label-lang": "Default Language",
            "settings-qr-text": "Add QR Verification Code to PDF Outputs",
            "settings-qr-lock": "👑 Pro Only",
            "settings-premium-label": "Subscription Status",
            "settings-btn-save": "Save Settings",
            "howto-title": "Application User Guide",
            "howto-step1-title": "Add Your Company:",
            "howto-step1-desc": "Click the \"Add Company\" button to enter your company's title, address, tax office, and tax number. Upload your logo, stamp, and certification stamps.",
            "howto-step2-title": "Select Active Company:",
            "howto-step2-desc": "Click on the card of the company you want to use from the top section of the dashboard to activate it.",
            "howto-step3-title": "Create Form:",
            "howto-step3-desc": "Click the \"Create Form\" button, choose either Service or Quote form, and proceed to the editor screen.",
            "howto-step4-title": "Click and Fill (Inline Edit):",
            "howto-step4-desc": "All fields on the form are interactive. Directly fill in the details of devices, items, or performed processes using your keyboard.",
            "howto-step5-title": "Sign and Download PDF:",
            "howto-step5-desc": "Click on signature boxes to get a digital signature by drawing with a finger on the phone screen. Click \"Download PDF\" on the top bar to download the A4-size document. Your form will be saved to history automatically.",
            "howto-btn-close": "Got it",
            "create-title": "Create New Form",
            "create-label-company": "Your Company",
            "create-label-type": "Form Category",
            "create-option-servis": "Technical Service Information Form",
            "create-option-teklif": "Proforma Price Quotation",
            "create-btn-start": "Prepare Form ➡️",
            "sigpad-title": "Touchscreen Signature Pad",
            "sigpad-warning": "⚠️ This signature is taken only for one-time use on this created form.",
            "sigpad-btn-clear": "🧹 Clear",
            "sigpad-btn-blank": "📭 Leave Blank",
            "sigpad-btn-preset": "👤 Use Saved Signature",
            "sigpad-btn-save": "💾 Add Signature",
            "exit-title": "Confirm Exit",
            "exit-message": "Unsaved changes may be lost. Are you sure you want to exit?",
            "exit-btn-cancel": "Cancel",
            "exit-btn-confirm": "Exit",
            "feedback-title": "Feedback & About",
            "feedback-tab-feedback": "💬 Feedback",
            "feedback-tab-about": "ℹ️ About & Credits",
            "feedback-desc": "You can send your feedback, suggestions, or bug reports directly to the developer.",
            "feedback-label-msg": "Your Message",
            "feedback-placeholder": "Write your feedback here...",
            "feedback-btn-send": "Send Feedback",
            "about-title": "Easy Form v1.1.0",
            "about-desc": "This application was developed to allow technical service teams and businesses to quickly, practically, and offline manage forms & quotes.",
            "about-dev-title": "Developer & Credits:",
            "about-dev-desc": "💻 <strong>Design & Development:</strong> Alieren3D<br>🎯 <strong>Vision & Contributions:</strong> Haydar Şeker<br>🔒 <strong>Privacy:</strong> The app runs entirely on your device, no data is sent to remote servers.",
            "bulk-title": "Downloading Bulk PDF",
            "bulk-progress": "Preparing...",
            "qrscan-title": "📷 Import Document via QR",
            "qrscan-status": "Initializing camera...",
            "qrscan-label-type": "Document Type",
            "qrscan-label-no": "Document No",
            "qrscan-label-client": "Client",
            "qrscan-label-total": "Total Amount",
            "qrscan-note": "Tip: If the QR is not read, you can also scan it by uploading a clear photo of the QR.",
            "qrscan-btn-image": "🖼️ Scan from Image",
            "qrscan-btn-open": "📄 Open Document",
            "crop-title": "✂️ Crop / Correct Image",
            "crop-hint": "Determine the crop area by dragging the 4 corners. The selected quadrilateral will be warped and corrected.",
            "crop-btn-reset": "↺ Reset",
            "crop-btn-apply": "✓ Apply",
            "premium-title": "👑 Easy Form Premium",
            "premium-hero-title": "Unleash Unlimited Power",
            "premium-hero-desc": "Use the application ad-free, perform unlimited bulk downloads, and increase your professionalism.",
            "premium-benefit1": "✓ <strong>Unlimited PDF Downloads:</strong> Remove daily download limit and download instantly without ads.",
            "premium-benefit2": "✓ <strong>PDF QR Verification Code:</strong> Add QR code under PDF outputs for digital verification and transfer.",
            "premium-benefit3": "✓ <strong>Bulk PDF Download:</strong> Download the entire history archive as a single combined PDF report.",
            "premium-benefit4": "✓ <strong>Unlimited Company Profiles:</strong> Define and manage as many companies as you want.",
            "premium-btn-buy": "Buy Plan",
            "premium-plan-monthly": "Monthly",
            "premium-plan-monthly-desc": "Ideal for small businesses and freelancers.",
            "premium-plan-yearly": "Yearly",
            "premium-plan-yearly-desc": "Best value for long-term usage.",
            "premium-plan-enterprise": "Unlimited",
            "premium-plan-enterprise-desc": "For large teams and intensive usage.",
            "company-label-name": "Company Name",
            "company-placeholder-name": "e.g. ABC Agency Ltd. Co.",
            "company-label-phone": "Phone",
            "company-placeholder-phone": "e.g. +90 216 216 16 16",
            "company-label-email": "Email",
            "company-placeholder-email": "info@abc.com",
            "company-label-website": "Website",
            "company-placeholder-website": "e.g. www.abc.com",
            "company-label-taxoffice": "Tax Office",
            "company-placeholder-taxoffice": "Besiktas",
            "company-label-taxnumber": "Tax Number",
            "company-placeholder-taxnumber": "e.g. 1234567890",
            "company-label-mersis": "Mersis No",
            "company-placeholder-mersis": "e.g. 1234567890123456",
            "company-label-address": "Company Address",
            "company-placeholder-address": "e.g. Hisar Mah. 1202 Sk. No: 99 Besiktas/Istanbul",
            "company-section-media": "Company Images (Compressed & Saved)",
            "company-label-logo": "Company Logo",
            "company-placeholder-logo": "Select/Drop Logo",
            "company-label-stamp": "Company Stamp",
            "company-placeholder-stamp": "Select/Drop Stamp",
            "company-label-sig": "Default Authorized Signature",
            "company-btn-draw-sig": "✍️ Draw Signature",
            "company-or": "or",
            "company-placeholder-sig-empty": "No Signature",
            "company-section-certs": "Registration/Certification Seals (TSE, ISO, CE etc.)",
            "company-btn-add-cert": "➕ Add Seal",
            "company-btn-save": "Save Company",
            "company-btn-delete": "Delete Company",
            "service-title": "Service Form Editor",
            "service-btn-exit": "⬅️ Exit",
            "service-btn-save": "💾 Save",
            "service-btn-pdf": "📥 Download PDF",
            "service-print-title": "TECHNICAL SERVICE INFORMATION FORM",
            "service-print-label-date": "Date:",
            "service-print-label-no": "No:",
            "service-print-section-client": "CLIENT INFORMATION",
            "service-print-label-client-name": "Client Name:",
            "service-print-placeholder-client-name": "Write client name...",
            "service-print-label-city": "City:",
            "service-print-placeholder-city": "Write city...",
            "service-print-section-device": "DEVICE INFORMATION",
            "service-print-btn-add-device": "➕ Add Row",
            "service-print-th-model": "Brand / Model",
            "service-print-th-sn": "Asset / Serial No",
            "service-print-th-contract": "Maintenance Contract",
            "service-print-th-action": "Action",
            "service-print-section-reason": "SERVICE REASON",
            "service-print-chk-bakim": " Maintenance",
            "service-print-chk-onarim": " Repair",
            "service-print-chk-ariza": " Diagnosis",
            "service-print-chk-kontrol": " Inspection",
            "service-print-chk-garanti": " Warranty",
            "service-print-chk-kurulum": " Installation",
            "service-print-section-process": "PROCESS PERFORMED",
            "service-print-placeholder-process": "Detail the processes performed during the service...",
            "service-print-section-parts": "RECOMMENDED / CHANGED SPARE PARTS",
            "service-print-btn-add-part": "➕ Add Part",
            "service-print-th-part-code": "Part Code",
            "service-print-th-part-name": "Spare Part Name",
            "service-print-th-part-qty": "Qty",
            "service-print-th-part-changed": "Changed",
            "service-print-th-part-recommend": "Recommend",
            "service-print-section-result": "RESULT",
            "service-print-placeholder-result": "Service results or recommendations...",
            "service-print-section-signatures": "APPROVALS AND SIGNATURES",
            "service-print-sig-tech": "COMPANY REPRESENTATIVE",
            "service-print-sig-client": "CLIENT REPRESENTATIVE",
            "service-print-sig-unit": "CLINICAL ENG. / TECHNICAL UNIT",
            "service-print-placeholder-sign": "Click to Sign",
            "service-print-placeholder-name": "Name Surname",
            "service-print-placeholder-name-unit": "Name Surname / Unit",
            "service-print-footer-text": "This technical service form has been approved electronically.",
            "quote-title": "Price Quote Editor",
            "quote-btn-exit": "⬅️ Exit",
            "quote-btn-save": "💾 Save",
            "quote-btn-pdf": "📥 Download PDF",
            "quote-print-title": "PROFORMA PRICE QUOTATION",
            "quote-print-footer-text": "This Proforma quotation letter has been electronically approved.",
            "quote-print-section-client": "CLIENT DETAILS",
            "quote-print-placeholder-client-name": "Write Person / Client Name...",
            "quote-print-placeholder-client-addr": "Client address...",
            "quote-print-placeholder-client-city": "Write city...",
            "quote-print-section-meta": "QUOTATION INFORMATION",
            "quote-print-label-date": "DATE:",
            "quote-print-label-no": "QUOTATION NO:",
            "quote-print-placeholder-no": "e.g. DRP-0621",
            "quote-print-section-items": "QUOTATION ITEMS",
            "quote-print-btn-add-item": "➕ Add Item",
            "quote-print-th-index": "No",
            "quote-print-th-desc": "Item / Service Description",
            "quote-print-th-qty": "Quantity",
            "quote-print-th-unit": "Unit",
            "quote-print-th-price": "Unit Price",
            "quote-print-th-discount": "Discount %",
            "quote-print-th-kdv": "VAT %",
            "quote-print-th-total": "Total",
            "quote-print-th-action": "Action",
            "quote-print-label-subtotal": "Subtotal:",
            "quote-print-label-tax": "VAT Total:",
            "quote-print-label-grand": "Grand Total:",
            "quote-print-section-conditions": "QUOTATION TERMS AND CONDITIONS",
            "quote-print-placeholder-conditions": "* Our prices exclude VAT.\n* Delivery time is 15 days.",
            "quote-print-sig-title": "Stamp & Authorized Signature",
            "pro-title": "👑 Easy Form Pro",
            "pro-badge-text": "You Have Pro Plan!",
            "pro-thanks-text": "Thank you from the bottom of our hearts for supporting our app. Enjoy your Pro membership benefits!",
            "pro-sub-type-label": "Subscription Type:",
            "pro-sub-start-label": "Start Date:",
            "pro-feat-unlimited": "✓ Unlimited PDF Downloads",
            "pro-feat-qr": "✓ QR Code Verification",
            "pro-feat-bulk": "✓ Bulk PDF Download",
            "pro-feat-companies": "✓ Unlimited Company Profiles",
            "pro-btn-close": "Awesome!"
        }
    };

    function applyLanguage(lang) {
        state.settings.lang = lang;
        const dict = translations[lang];
        if (!dict) return;

        const mappings = {
            "btn-theme-toggle": { id: "btn-theme-toggle", attr: "title" },
            "btn-feedback": { id: "btn-feedback", attr: "title" },
            "btn-how-to": { id: "btn-how-to", attr: "title" },
            "btn-settings": { id: "btn-settings", attr: "title" },
            "btn-go-premium": { id: "btn-go-premium", attr: "title" },
            "dashboard-title-companies": { selector: ".company-selection-section .section-title" },
            "dashboard-btn-create": { selector: "#btn-create-form .btn-text" },
            "dashboard-btn-company": { selector: "#btn-add-company .btn-text" },
            "dashboard-btn-qr": { selector: "#btn-scan-qr .btn-text" },
            "dashboard-security-note": { selector: ".security-privacy-note" },
            "dashboard-title-past": { selector: ".past-forms-section .section-title" },
            "dashboard-btn-bulk": { selector: "#btn-bulk-download .btn-text" },
            "dashboard-btn-filter": { selector: "#filter-toggle .btn-text" },
            "filter-label-search": { selector: "label[for='search-input']" },
            "filter-search-placeholder": { id: "search-input", attr: "placeholder" },
            "filter-label-type": { selector: "label[for='filter-type']" },
            "filter-type-all": { selector: "#filter-type option[value='all']" },
            "filter-type-servis": { selector: "#filter-type option[value='servis']" },
            "filter-type-teklif": { selector: "#filter-type option[value='teklif']" },
            "filter-label-company": { selector: "label[for='filter-company']" },
            "filter-company-all": { selector: "#filter-company option[value='all']" },
            "settings-title": { selector: "#modal-settings .modal-header h3" },
            "settings-label-kdv": { selector: "label[for='settings-kdv']" },
            "settings-label-currency": { selector: "label[for='settings-currency']" },
            "settings-label-lang": { selector: "label[for='settings-lang']" },
            "settings-qr-text": { id: "settings-qr-label-text" },
            "settings-qr-lock": { id: "settings-qr-premium-lock" },
            "settings-premium-label": { selector: ".settings-premium-divider label" },
            "settings-btn-save": { id: "btn-save-settings" },
            "howto-title": { selector: "#modal-how-to h3" },
            "howto-step1-title": { selector: ".guide-step:nth-child(1) strong" },
            "howto-step1-desc": { selector: ".guide-step:nth-child(1) .step-desc", html: true },
            "howto-step2-title": { selector: ".guide-step:nth-child(2) strong" },
            "howto-step2-desc": { selector: ".guide-step:nth-child(2) .step-desc", html: true },
            "howto-step3-title": { selector: ".guide-step:nth-child(3) strong" },
            "howto-step3-desc": { selector: ".guide-step:nth-child(3) .step-desc", html: true },
            "howto-step4-title": { selector: ".guide-step:nth-child(4) strong" },
            "howto-step4-desc": { selector: ".guide-step:nth-child(4) .step-desc", html: true },
            "howto-step5-title": { selector: ".guide-step:nth-child(5) strong" },
            "howto-step5-desc": { selector: ".guide-step:nth-child(5) .step-desc", html: true },
            "howto-btn-close": { id: "btn-close-how-to-footer" },
            "create-title": { selector: "#modal-create-form h3" },
            "create-label-company": { selector: "label[for='create-form-company']" },
            "create-label-type": { selector: "label[for='create-form-type']" },
            "create-option-servis": { selector: "#create-form-type option[value='servis']" },
            "create-option-teklif": { selector: "#create-form-type option[value='teklif']" },
            "create-btn-start": { id: "btn-start-form" },
            "sigpad-title": { id: "sig-pad-title" },
            "sigpad-warning": { selector: ".sig-pad-warning" },
            "sigpad-btn-clear": { id: "btn-clear-sig-pad" },
            "sigpad-btn-blank": { id: "btn-leave-blank-sig" },
            "sigpad-btn-preset": { id: "btn-use-preset-sig" },
            "sigpad-btn-save": { id: "btn-save-sig-pad" },
            "exit-title": { selector: "#modal-confirm-exit h3" },
            "exit-message": { selector: "#modal-confirm-exit p" },
            "exit-btn-cancel": { id: "btn-cancel-exit" },
            "exit-btn-confirm": { id: "btn-confirm-exit" },
            "feedback-title": { selector: "#modal-feedback h3" },
            "feedback-tab-feedback": { id: "tab-feedback-btn" },
            "feedback-tab-about": { id: "tab-about-btn" },
            "feedback-desc": { selector: "#tab-feedback-content p" },
            "feedback-label-msg": { selector: "#tab-feedback-content label" },
            "feedback-placeholder": { id: "feedback-message", attr: "placeholder" },
            "feedback-btn-send": { id: "btn-send-feedback" },
            "about-title": { selector: "#tab-about-content strong" },
            "about-desc": { selector: "#tab-about-content p", html: true },
            "about-dev-title": { selector: "#tab-about-content div strong:nth-of-type(1)" },
            "about-dev-desc": { selector: "#tab-about-content div p:nth-of-type(2)", html: true },
            "bulk-title": { selector: "#modal-bulk-loading h4" },
            "bulk-progress": { id: "bulk-loading-progress" },
            "qrscan-title": { selector: "#modal-qr-scan h3" },
            "qrscan-status": { id: "qr-scan-status" },
            "qrscan-label-type": { selector: ".qr-result-line:nth-child(1) span" },
            "qrscan-label-no": { selector: ".qr-result-line:nth-child(2) span" },
            "qrscan-label-client": { selector: ".qr-result-line:nth-child(3) span" },
            "qrscan-label-total": { selector: ".qr-result-line:nth-child(4) span" },
            "qrscan-note": { selector: ".qr-scan-note" },
            "qrscan-btn-image": { id: "btn-qr-from-image" },
            "qrscan-btn-open": { id: "btn-qr-open-doc" },
            "crop-title": { selector: "#modal-crop h3" },
            "crop-hint": { selector: ".crop-hint" },
            "crop-btn-reset": { id: "btn-crop-reset" },
            "crop-btn-apply": { id: "btn-crop-apply" },
            "premium-title": { selector: "#modal-premium h3" },
            "premium-hero-title": { selector: ".premium-hero h4" },
            "premium-hero-desc": { selector: ".premium-hero p" },
            "premium-benefit1": { selector: ".premium-benefits .benefit-item:nth-child(1)", html: true },
            "premium-benefit2": { selector: ".premium-benefits .benefit-item:nth-child(2)", html: true },
            "premium-benefit3": { selector: ".premium-benefits .benefit-item:nth-child(3)", html: true },
            "premium-benefit4": { selector: ".premium-benefits .benefit-item:nth-child(4)", html: true },
            "company-label-name": { selector: "label[for='company-name']" },
            "company-placeholder-name": { id: "company-name", attr: "placeholder" },
            "company-label-phone": { selector: "label[for='company-phone']" },
            "company-placeholder-phone": { id: "company-phone", attr: "placeholder" },
            "company-label-email": { selector: "label[for='company-email']" },
            "company-placeholder-email": { id: "company-email", attr: "placeholder" },
            "company-label-website": { selector: "label[for='company-website']" },
            "company-placeholder-website": { id: "company-website", attr: "placeholder" },
            "company-label-taxoffice": { selector: "label[for='company-taxoffice']" },
            "company-placeholder-taxoffice": { id: "company-taxoffice", attr: "placeholder" },
            "company-label-taxnumber": { selector: "label[for='company-taxnumber']" },
            "company-placeholder-taxnumber": { id: "company-taxnumber", attr: "placeholder" },
            "company-label-mersis": { selector: "label[for='company-mersis']" },
            "company-placeholder-mersis": { id: "company-mersis", attr: "placeholder" },
            "company-label-address": { selector: "label[for='company-address']" },
            "company-placeholder-address": { id: "company-address", attr: "placeholder" },
            "company-section-media": { selector: ".media-upload-section .media-section-title" },
            "company-label-logo": { selector: ".upload-card:nth-child(1) label" },
            "company-placeholder-logo": { selector: "#preview-logo .upload-placeholder" },
            "company-label-stamp": { selector: ".upload-card:nth-child(2) label" },
            "company-placeholder-stamp": { selector: "#preview-stamp .upload-placeholder" },
            "company-label-sig": { selector: ".upload-card:nth-child(3) label" },
            "company-btn-draw-sig": { id: "btn-draw-default-sig" },
            "company-or": { selector: ".upload-or-text" },
            "company-placeholder-sig-empty": { selector: "#preview-sig .upload-placeholder" },
            "company-section-certs": { selector: ".certification-section .media-section-title" },
            "company-btn-add-cert": { id: "btn-add-cert" },
            "company-btn-save": { id: "btn-save-company" },
            "company-btn-delete": { id: "btn-delete-company" },
            "service-title": { selector: "#service-form-view .editor-title-sticky" },
            "service-btn-exit": { id: "btn-close-service-editor" },
            "service-btn-save": { id: "btn-save-service-form" },
            "service-btn-pdf": { id: "btn-pdf-service-form" },
            "service-print-title": { selector: "#service-print-area .form-print-title" },
            "service-print-label-date": { selector: "#srv-label-date" },
            "service-print-label-no": { selector: "#srv-label-no" },
            "service-print-section-client": { selector: "#service-print-area .form-print-section:nth-of-type(1) .print-section-title" },
            "service-print-label-client-name": { selector: "#service-print-area .print-grid-2 .print-form-field:nth-child(1) label" },
            "service-print-placeholder-client-name": { id: "srv-input-client-name", attr: "placeholder" },
            "service-print-label-city": { selector: "#service-print-area .print-grid-2 .print-form-field:nth-child(2) label" },
            "service-print-placeholder-city": { id: "srv-input-client-city", attr: "placeholder" },
            "service-print-section-device": { selector: "#service-print-area .form-print-section:nth-of-type(2) .print-section-title" },
            "service-print-btn-add-device": { id: "srv-btn-add-device" },
            "service-print-th-model": { selector: "#srv-table-devices th:nth-child(1)" },
            "service-print-th-sn": { selector: "#srv-table-devices th:nth-child(2)" },
            "service-print-th-contract": { selector: "#srv-table-devices th:nth-child(3)" },
            "service-print-th-action": { selector: "#srv-table-devices th:nth-child(4)" },
            "service-print-section-reason": { selector: "#service-print-area .form-print-section:nth-of-type(3) .print-section-title" },
            "service-print-section-process": { selector: "#service-print-area .form-print-section:nth-of-type(4) .print-section-title" },
            "service-print-placeholder-process": { id: "srv-txt-process", attr: "placeholder" },
            "service-print-section-parts": { selector: "#service-print-area .form-print-section:nth-of-type(5) .print-section-title" },
            "service-print-btn-add-part": { id: "srv-btn-add-part" },
            "service-print-th-part-code": { selector: "#srv-table-parts th:nth-child(1)" },
            "service-print-th-part-name": { selector: "#srv-table-parts th:nth-child(2)" },
            "service-print-th-part-qty": { selector: "#srv-table-parts th:nth-child(3)" },
            "service-print-th-part-changed": { selector: "#srv-table-parts th:nth-child(4)" },
            "service-print-th-part-recommend": { selector: "#srv-table-parts th:nth-child(5)" },
            "service-print-section-result": { selector: "#service-print-area .form-print-section:nth-of-type(6) .print-section-title" },
            "service-print-placeholder-result": { id: "srv-txt-result", attr: "placeholder" },
            "service-print-section-signatures": { selector: "#service-print-area .form-print-section:nth-of-type(7) .print-section-title" },
            "service-print-sig-tech": { selector: "#srv-sig-box-tech .sig-title" },
            "service-print-sig-client": { selector: "#srv-sig-box-client .sig-title" },
            "service-print-sig-unit": { selector: "#srv-sig-box-unit .sig-title" },
            "service-print-footer-text": { selector: "#service-print-area .form-print-footer-text" },
            "quote-title": { selector: "#quote-form-view .editor-title-sticky" },
            "quote-btn-exit": { id: "btn-close-quote-editor" },
            "quote-btn-save": { id: "btn-save-quote-form" },
            "quote-btn-pdf": { id: "btn-pdf-quote-form" },
            "quote-print-title": { selector: "#quote-print-area .form-print-title" },
            "quote-print-footer-text": { selector: "#qte-print-footer-text" },
            "quote-print-section-client": { selector: "#quote-print-area .client-box .quote-meta-title" },
            "quote-print-placeholder-client-name": { id: "qte-input-client-title", attr: "placeholder" },
            "quote-print-placeholder-client-addr": { id: "qte-input-client-address", attr: "placeholder" },
            "quote-print-placeholder-client-city": { id: "qte-input-client-city", attr: "placeholder" },
            "quote-print-section-meta": { selector: "#quote-print-area .details-box .quote-meta-title" },
            "quote-print-label-date": { selector: "#quote-print-area .details-box label:nth-child(1)" },
            "quote-print-label-no": { selector: "#quote-print-area .details-box label:nth-child(2)" },
            "quote-print-placeholder-no": { id: "qte-input-no", attr: "placeholder" },
            "quote-print-section-items": { selector: "#quote-print-area .form-print-section:nth-of-type(1) .print-section-title" },
            "quote-print-btn-add-item": { id: "qte-btn-add-item" },
            "quote-print-th-index": { selector: "#qte-table-items th:nth-child(1)" },
            "quote-print-th-desc": { selector: "#qte-table-items th:nth-child(2)" },
            "quote-print-th-qty": { selector: "#qte-table-items th:nth-child(3)" },
            "quote-print-th-unit": { selector: "#qte-table-items th:nth-child(4)" },
            "quote-print-th-price": { selector: "#qte-table-items th:nth-child(5)" },
            "quote-print-th-discount": { selector: "#qte-table-items th:nth-child(6)" },
            "quote-print-th-kdv": { selector: "#qte-table-items th:nth-child(7)" },
            "quote-print-th-total": { selector: "#qte-table-items th:nth-child(8)" },
            "quote-print-th-action": { selector: "#qte-table-items th:nth-child(9)" },
            "quote-print-label-subtotal": { selector: "#quote-print-area .quote-summary-row:nth-child(1) .summary-label" },
            "quote-print-label-tax": { selector: "#quote-print-area .quote-summary-row:nth-child(2) .summary-label" },
            "quote-print-label-grand": { selector: "#quote-print-area .quote-summary-row:nth-child(3) .summary-label" },
            "quote-print-section-conditions": { selector: "#quote-print-area .form-print-section:nth-of-type(2) .print-section-title" },
            "quote-print-placeholder-conditions": { id: "qte-txt-conditions", attr: "placeholder" },
            "quote-print-sig-title": { selector: ".quote-stamp-sig-title" },
            "pro-title": { id: "pro-title" },
            "pro-badge-text": { id: "pro-badge-text" },
            "pro-thanks-text": { id: "pro-thanks-text" },
            "pro-sub-type-label": { id: "pro-sub-type-label" },
            "pro-sub-start-label": { id: "pro-sub-start-label" },
            "pro-feat-unlimited": { id: "pro-feat-unlimited" },
            "pro-feat-qr": { id: "pro-feat-qr" },
            "pro-feat-bulk": { id: "pro-feat-bulk" },
            "pro-feat-companies": { id: "pro-feat-companies" },
            "pro-btn-close": { id: "btn-close-pro-status-footer" }
        };

        for (const [key, text] of Object.entries(dict)) {
            const rule = mappings[key];
            if (!rule) continue;

            const elements = rule.id 
                ? [document.getElementById(rule.id)] 
                : (rule.selector ? (rule.all ? document.querySelectorAll(rule.selector) : [document.querySelector(rule.selector)]) : []);

            elements.forEach(el => {
                if (!el) return;
                if (rule.attr) {
                    el.setAttribute(rule.attr, text);
                } else if (rule.html) {
                    el.innerHTML = text;
                } else {
                    el.textContent = text;
                }
            });
        }

        const serviceReasonLabels = document.querySelectorAll("#service-print-area .print-checkbox-label");
        if (serviceReasonLabels.length >= 6) {
            const reasons = ["chk-bakim", "chk-onarim", "chk-ariza", "chk-kontrol", "chk-garanti", "chk-kurulum"];
            reasons.forEach((id, idx) => {
                const label = serviceReasonLabels[idx];
                if (!label) return;
                const input = label.querySelector("input");
                if (input) {
                    label.innerHTML = "";
                    label.appendChild(input);
                    label.appendChild(document.createTextNode(dict["service-print-" + id.replace("chk-", "chk")] || ""));
                }
            });
        }
        
        const cropLogoBtn = document.getElementById("btn-crop-logo");
        if (cropLogoBtn) cropLogoBtn.textContent = dict["company-btn-crop"];
        const cropStampBtn = document.getElementById("btn-crop-stamp");
        if (cropStampBtn) cropStampBtn.textContent = dict["company-btn-crop"];
        const cropSigBtn = document.getElementById("btn-crop-sig");
        if (cropSigBtn) cropSigBtn.textContent = dict["company-btn-crop"];

        const techNameInput = document.getElementById("srv-input-tech-name");
        if (techNameInput) techNameInput.placeholder = dict["service-print-placeholder-name"];
        const clientPersonInput = document.getElementById("srv-input-client-person");
        if (clientPersonInput) clientPersonInput.placeholder = dict["service-print-placeholder-name"];
        const unitPersonInput = document.getElementById("srv-input-unit-person");
        if (unitPersonInput) unitPersonInput.placeholder = dict["service-print-placeholder-name-unit"];
        
        const techSigCont = document.getElementById("srv-sig-tech-img-cont");
        if (techSigCont && !techSigCont.querySelector("img")) {
            const span = techSigCont.querySelector(".sig-placeholder-text");
            if (span) span.textContent = dict["service-print-placeholder-sign"];
        }
        const clientSigCont = document.getElementById("srv-sig-client-img-cont");
        if (clientSigCont && !clientSigCont.querySelector("img")) {
            const span = clientSigCont.querySelector(".sig-placeholder-text");
            if (span) span.textContent = dict["service-print-placeholder-sign"];
        }
        const unitSigCont = document.getElementById("srv-sig-unit-img-cont");
        if (unitSigCont && !unitSigCont.querySelector("img")) {
            const span = unitSigCont.querySelector(".sig-placeholder-text");
            if (span) span.textContent = dict["service-print-placeholder-sign"];
        }
        
        const companyViewTitle = document.getElementById("company-view-title");
        if (companyViewTitle) {
            const compId = document.getElementById("company-edit-id").value;
            companyViewTitle.textContent = compId ? dict["company-editor-title-edit"] : dict["company-editor-title-add"];
        }

        const isFilterHidden = document.getElementById('filter-panel').classList.contains('hidden');
        const filterToggle = document.getElementById('filter-toggle');
        if (filterToggle) {
            if (lang === 'en') {
                filterToggle.innerHTML = isFilterHidden 
                    ? '<span>🔍</span><span class="btn-text">Filter</span>' 
                    : '<span>❌</span><span class="btn-text">Close Filter</span>';
            } else {
                filterToggle.innerHTML = isFilterHidden 
                    ? '<span>🔍</span><span class="btn-text">Filtrele</span>' 
                    : '<span>❌</span><span class="btn-text">Filtreyi Kapat</span>';
            }
        }

        renderCompanyCards();
        renderFormsList();
        updateFilterSelectors();
        updatePremiumUI();
    }

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
            if (state.settings.lang === undefined) {
                state.settings.lang = 'tr';
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
                            initializeForTesting: false // Canlı reklam birimleri için test modu kapatıldı
                        });
                        this.isInitialized = true;
                        console.log("AdMob native initialized successfully.");

                        // Premium olmayan kullanıcılar için açılışta banner'ı göster ve ödüllü reklamı önbelleğe al
                        if (!state.settings.isPremium) {
                            this.showBanner();
                            this.preloadRewardedAd();
                        }
                    }
                } catch (err) {
                    console.error("AdMob native initialization failed:", err);
                }
            } else {
                console.log("AdMob runs in browser simulation mode.");
            }
        },

        async showBanner() {
            if (state.settings.isPremium) return;
            const isNative = window.Capacitor && window.Capacitor.isNativePlatform();
            if (isNative && this.admob) {
                try {
                    const platform = window.Capacitor.getPlatform();
                    const adId = platform === 'ios'
                        ? 'ca-app-pub-3016010033385907/2802981634' // iOS Live Banner ID
                        : 'ca-app-pub-3016010033385907/4750754053'; // Android Live Banner ID

                    await this.admob.showBanner({
                        adId: adId,
                        position: 'BOTTOM_CENTER',
                        adSize: 'ADAPTIVE_BANNER',
                        margin: 0
                    });
                    document.body.classList.add('has-banner');
                    console.log("AdMob banner shown successfully.");
                } catch (err) {
                    console.error("AdMob showBanner failed:", err);
                }
            }
        },

        async removeBanner() {
            const isNative = window.Capacitor && window.Capacitor.isNativePlatform();
            if (isNative && this.admob) {
                try {
                    await this.admob.removeBanner();
                    document.body.classList.remove('has-banner');
                    console.log("AdMob banner removed successfully.");
                } catch (err) {
                    console.error("AdMob removeBanner failed:", err);
                }
            }
        },

        async preloadRewardedAd() {
            if (state.settings.isPremium) return;
            const isNative = window.Capacitor && window.Capacitor.isNativePlatform();
            if (isNative && this.admob) {
                try {
                    const platform = window.Capacitor.getPlatform();
                    const adId = platform === 'ios'
                        ? 'ca-app-pub-3016010033385907/3521432860' // iOS Live Rewarded ID
                        : 'ca-app-pub-3016010033385907/5026086228'; // Android Live Rewarded ID

                    await this.admob.prepareRewardVideoAd({
                        adId: adId,
                        isTesting: false
                    });
                    console.log("AdMob Rewarded Ad preloaded successfully.");
                } catch (err) {
                    console.error("AdMob preloading Rewarded Ad failed:", err);
                }
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
                    const platform = window.Capacitor.getPlatform();
                    const adId = platform === 'ios'
                        ? 'ca-app-pub-3016010033385907/3521432860' // iOS Live Rewarded ID
                        : 'ca-app-pub-3016010033385907/5026086228'; // Android Live Rewarded ID

                    await this.admob.prepareRewardVideoAd({
                        adId: adId,
                        isTesting: false
                    });

                    let rewardedListener = await this.admob.addListener('rewarded', (info) => {
                        console.log("AdMob Reward Earned:", info);
                        rewardedListener.remove();
                        if (onRewardCallback) onRewardCallback();
                    });

                    await this.admob.showRewardVideoAd();
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
            state.settings.premiumType = this.activePlan ? this.activePlan.planId : 'yearly';
            state.settings.premiumStartDate = new Date().toISOString();
            
            saveSettings();
            updatePremiumUI();
            
            const successMsg = state.settings.lang === 'en'
                ? "Congratulations! Your purchase was successful and Pro features have been unlocked."
                : "Tebrikler! Satın alma işlemi başarıyla gerçekleşti ve Premium özellikler tanımlandı.";
            alert(successMsg);
            
            this.activePlan = null;
        }
    };

    function updatePremiumUI() {
        const premiumBtn = document.getElementById('btn-go-premium');
        const settingsStatus = document.getElementById('settings-premium-status');
        const settingsPremiumBtn = document.getElementById('btn-settings-premium');
        
        if (state.settings.isPremium) {
            AdService.removeBanner(); // Premium aktif ise reklamı kaldır
            if (premiumBtn) {
                premiumBtn.innerHTML = '<span>👑 Pro</span>';
                premiumBtn.classList.add('is-active-premium');
                premiumBtn.title = state.settings.lang === 'en' ? 'Pro Member' : 'Pro Üyesiniz';
            }
            if (settingsStatus) {
                settingsStatus.textContent = state.settings.lang === 'en' ? 'Pro Member (Ad-free)' : 'Pro Üye (Reklamsız)';
                settingsStatus.style.color = '#fbbf24';
            }
            if (settingsPremiumBtn) {
                settingsPremiumBtn.style.display = 'none';
            }
        } else {
            if (premiumBtn) {
                premiumBtn.innerHTML = '<span>👑</span>';
                premiumBtn.classList.remove('is-active-premium');
                premiumBtn.title = state.settings.lang === 'en' ? 'Go Pro' : "Premium'a Geç";
            }
            if (settingsStatus) {
                settingsStatus.textContent = state.settings.lang === 'en' ? 'Standard Member (Ad-supported)' : 'Standart Üye (Reklamlı)';
                settingsStatus.style.color = 'var(--text-main)';
            }
            if (settingsPremiumBtn) {
                settingsPremiumBtn.style.display = 'block';
            }
        }
    }

    function checkDownloadLimit() {
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
            showFreeLimitReachedModal(data.firstDownloadTime || now);
            return false;
        }
        
        return true;
    }

    function incrementDownloadLimit() {
        if (state.settings.isPremium) {
            return;
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
        
        data.count++;
        if (data.count === 1) {
            data.firstDownloadTime = now;
        }
        
        localStorage.setItem('kolayform_free_downloads', JSON.stringify(data));
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
        
        const adPromptModal = document.getElementById('modal-ad-prompt');
        adPromptModal.classList.remove('hidden');
        
        // Kullanıcı modala bakarken arka planda ödüllü reklamı hemen yükle
        AdService.preloadRewardedAd();
        
        document.getElementById('btn-ad-prompt-watch').onclick = () => {
            adPromptModal.classList.add('hidden');
            
            // Reklam izlenmesini başlatıyoruz. Reklam bittiğinde veya simüle edildiğinde callback çalışacak.
            AdService.showRewardedAd(() => {
                // Reklam bittikten sonra limiti kontrol ediyoruz
                if (checkDownloadLimit()) {
                    incrementDownloadLimit(); // Sadece indirme başarılı olduğunda haktan düşüyoruz
                    onConfirmAction();
                }
            });
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
        serviceEntry: document.getElementById('service-entry-view'),
        serviceEditor: document.getElementById('service-form-view'),
        quoteEntry: document.getElementById('quote-entry-view'),
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
        // Sabit alt aksiyon butonları (Form Oluştur / QR Oku) yalnızca ana menüde görünsün
        const fabBar = document.getElementById('dashboard-fab-bar');
        if (fabBar) fabBar.style.display = (viewName === 'dashboard') ? 'flex' : 'none';
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
        const confirmMsg = state.settings.lang === 'en'
            ? "Are you sure you want to delete this company and all its related data?"
            : "Bu şirketi ve şirkete ait verileri silmek istediğinizden emin misiniz?";
        if (id && confirm(confirmMsg)) {
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
            <td><textarea class="print-inline-input val-model bold-input" rows="1" placeholder="Marka / Model Giriniz..." style="resize:none; overflow-y:hidden;">${device.model}</textarea></td>
            <td><textarea class="print-inline-input val-sn" rows="1" placeholder="Künye No / Seri No..." style="resize:none; overflow-y:hidden;">${device.sn}</textarea></td>
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
        bindTableTextareaAutoGrow(tr);
    }

    // Servis Parça Satırı Ekle
    function addPartRow(part = { code: '', name: '', qty: 1, changed: false, recommend: false }) {
        const tbody = document.querySelector('#srv-table-parts tbody');
        const tr = document.createElement('tr');
        
        const rowId = 'part-row-' + Date.now() + Math.random().toString(36).substr(2, 4);
        tr.id = rowId;
        
        tr.innerHTML = `
            <td><textarea class="print-inline-input val-pcode" rows="1" placeholder="Parça Kodu..." style="resize:none; overflow-y:hidden;">${part.code}</textarea></td>
            <td><textarea class="print-inline-input val-pname" rows="1" placeholder="Parça Adı..." style="resize:none; overflow-y:hidden;">${part.name}</textarea></td>
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
        bindTableTextareaAutoGrow(tr);
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
            document.getElementById('srv-input-no').value = formData.id;
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
            
            // Servis No Otomatik Sayaç oluştur
            const dateStr = new Date().toISOString().split('T')[0];
            const year = dateStr.split('-')[0];
            const count = state.forms.filter(f => f.type === 'servis' && f.date.startsWith(year)).length + 1;
            const padCount = String(count).padStart(4, '0');
            document.getElementById('srv-input-no').value = `SRV-${year}-${padCount}`;

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

        // Form rengini uygula (kayıtlı/seçili renk veya varsayılan)
        applyFormColor(document.getElementById('service-print-area'), (formData && formData.themeColor) || null);

        showView('serviceEditor');
        // Görünür olduktan sonra tüm metin alanlarını içeriğe göre boyutlandır
        requestAnimationFrame(() => resizeFormTextareas('service-print-area'));
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

        // Form ID'sini girdiden oku
        const formId = document.getElementById('srv-input-no').value.trim();
        if (!formId) {
            alert(state.settings.lang === 'en' ? "Please enter a form number." : "Lütfen bir servis numarası girin.");
            return null;
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
            signatures: { ...serviceSignatures },
            themeColor: getCanvasColor('service-print-area')
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
    function addQuoteItemRow(item = { desc: '', qty: 1, unit: 'AD', price: 0, discount: 0, kdv: null }) {
        const tbody = document.querySelector('#qte-table-items tbody');
        const tr = document.createElement('tr');
        
        const rowId = 'qte-item-row-' + Date.now() + Math.random().toString(36).substr(2, 4);
        tr.id = rowId;
        
        // Eğer KDV girilmemişse ayarlardakini kullan
        const kdvVal = item.kdv === null ? state.settings.defaultKdv : item.kdv;
        const discountVal = item.discount !== undefined ? item.discount : 0;
        
        const descPlaceholder = state.settings.lang === 'en' ? 'Item / Service Description...' : 'Mal / Hizmet Açıklaması...';
        const unitPlaceholder = state.settings.lang === 'en' ? 'Unit' : 'Birim';

        tr.innerHTML = `
            <td class="qte-row-index" style="text-align:center; font-weight:700"></td>
            <td><textarea class="print-inline-input val-desc bold-input" rows="1" placeholder="${descPlaceholder}" style="resize:none; overflow-y:hidden;">${item.desc}</textarea></td>
            <td><input type="number" class="print-inline-input val-qty" value="${item.qty}" min="0.01" step="any" style="text-align:center"></td>
            <td><textarea class="print-inline-input val-unit" rows="1" placeholder="${unitPlaceholder}" style="resize:none; overflow-y:hidden; text-align:center;">${item.unit}</textarea></td>
            <td><input type="number" class="print-inline-input val-price" value="${item.price}" min="0" step="any" style="text-align:right"></td>
            <td><input type="number" class="print-inline-input val-discount" value="${discountVal}" min="0" max="100" style="text-align:center"></td>
            <td><input type="number" class="print-inline-input val-kdv" value="${kdvVal}" min="0" max="100" style="text-align:center"></td>
            <td class="qte-row-total" style="text-align:right; font-weight:700">0.00</td>
            <td class="no-print">
                <button type="button" class="table-row-delete-btn" onclick="document.getElementById('${rowId}').remove(); recalculateQuoteTotals()">🗑️</button>
            </td>
        `;
        
        tbody.appendChild(tr);

        // Textarea yüksekliklerini otomatik ayarlama
        const descArea = tr.querySelector('.val-desc');
        const unitArea = tr.querySelector('.val-unit');
        
        const adjustHeight = (el) => {
            if (!el) return;
            el.style.height = 'auto';
            el.style.height = el.scrollHeight + 'px';
        };

        descArea.addEventListener('input', () => adjustHeight(descArea));
        unitArea.addEventListener('input', () => adjustHeight(unitArea));

        // Input/textarea olaylarını bağla (Her değişiklikte hesaplama tetikle)
        const inputs = tr.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', recalculateQuoteTotals);
        });

        // DOM'a eklendikten hemen sonra yükseklikleri hesapla
        setTimeout(() => {
            adjustHeight(descArea);
            adjustHeight(unitArea);
        }, 50);

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
            const discount = parseFloat(tr.querySelector('.val-discount').value) || 0;
            const kdv = parseFloat(tr.querySelector('.val-kdv').value) || 0;
            
            const discountedPrice = price * (1 - discount / 100);
            const rowTotal = qty * discountedPrice;
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
        const locale = state.settings.lang === 'en' ? 'en-US' : 'tr-TR';
        return state.settings.currency + ' ' + amount.toLocaleString(locale, {
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

        // Form rengini uygula (kayıtlı/seçili renk veya varsayılan)
        applyFormColor(document.getElementById('quote-print-area'), (formData && formData.themeColor) || null);

        showView('quoteEditor');
        // Görünür olduktan sonra tüm metin alanlarını içeriğe göre boyutlandır
        requestAnimationFrame(() => resizeFormTextareas('quote-print-area'));
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
            const errName = state.settings.lang === 'en' ? "Please enter the client name." : "Lütfen teklif sunulan kurum adını girin.";
            alert(errName);
            return null;
        }

        if (!formId) {
            const errNo = state.settings.lang === 'en' ? "Please enter a quotation number." : "Lütfen bir teklif numarası girin.";
            alert(errNo);
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
            const discount = parseFloat(tr.querySelector('.val-discount').value) || 0;
            const kdv = parseFloat(tr.querySelector('.val-kdv').value) || 0;
            
            if (desc || qty || price) {
                items.push({ desc, qty, unit, price, discount, kdv });
                
                const discountedPrice = price * (1 - discount / 100);
                const itemTotal = qty * discountedPrice;
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
            signatures: { ...quoteSignatures },
            themeColor: getCanvasColor('quote-print-area')
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
            const confirmMsg = state.settings.lang === 'en'
                ? "A quotation with this number already exists. Do you want to overwrite it?"
                : "Bu teklif numarasıyla başka bir teklif zaten var. Üzerine yazmak ister misiniz?";
            if (confirm(confirmMsg)) {
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
                    <div class="company-card-compact-actions">
                        <button class="cc-icon-btn btn-edit-comp" data-id="${comp.id}" title="Düzenle">⚙️</button>
                        <button class="cc-icon-btn cc-del btn-delete-comp" data-id="${comp.id}" title="Sil">🗑️</button>
                    </div>
                </div>
                <div class="company-card-taxno"><span>No:</span> <strong>${comp.taxNumber || '—'}</strong></div>
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
        const confirmMsg = state.settings.lang === 'en'
            ? "Are you sure you want to delete this company and all its related data?"
            : "Bu şirketi ve şirkete ait bilgileri silmek istediğinizden emin misiniz?";
        if (!confirm(confirmMsg)) return;
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
                (f.id && f.id.toLowerCase().includes(query)) ||
                (f.clientName && f.clientName.toLowerCase().includes(query)) ||
                (f.clientCity && f.clientCity.toLowerCase().includes(query)) ||
                matchesDevice;

            // Tip filtresi
            const matchesType = type === 'all' || f.type === type;

            // Şirket filtresi
            const matchesComp = companyId === 'all' || f.companyId === companyId;

            return matchesQuery && matchesType && matchesComp;
        });

        if (filtered.length === 0) {
            const emptyMsg = state.settings.lang === 'en'
                ? 'No registered documents found matching criteria.'
                : 'Aranan kriterlere uygun form bulunamadı.';
            container.innerHTML = `
                <div class="empty-forms-placeholder">
                    <span class="empty-forms-icon">📂</span>
                    <span>${emptyMsg}</span>
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
                <div class="form-card-right">
                    <div class="form-card-total">${form.type === 'teklif' ? formatCurrency(parseFloat(form.grandTotal)) : (state.settings.lang === 'en' ? 'Free' : 'Ücretsiz')}</div>
                    <div class="form-card-date">${new Date(form.date).toLocaleDateString(state.settings.lang === 'en' ? 'en-US' : 'tr-TR')}</div>
                </div>
                <button class="btn-card-delete" title="${state.settings.lang === 'en' ? 'Delete Form' : 'Formu Sil'}">🗑️</button>
            `;

            // Kırmızı silme butonu (karta tıklamayı tetiklemesin)
            card.querySelector('.btn-card-delete').addEventListener('click', (e) => {
                e.stopPropagation();
                const confirmMsg = state.settings.lang === 'en'
                    ? `Are you sure you want to delete form "${form.id}" from history?`
                    : `"${form.id}" numaralı formu geçmişten silmek istediğinize emin misiniz?`;
                if (confirm(confirmMsg)) {
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

        // Yeni akış: önce temiz bilgi giriş listesi, sonra "Kaydet ve Ön İzle" ile PDF canvas'ı
        if (formType === 'servis') {
            openServiceEntry();
        } else {
            openQuoteEntry();
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
        const isHidden = filterPanel.classList.contains('hidden');
        if (state.settings.lang === 'en') {
            filterToggle.innerHTML = isHidden 
                ? '<span>🔍</span><span class="btn-text">Filter</span>' 
                : '<span>❌</span><span class="btn-text">Close Filter</span>';
        } else {
            filterToggle.innerHTML = isHidden 
                ? '<span>🔍</span><span class="btn-text">Filtrele</span>' 
                : '<span>❌</span><span class="btn-text">Filtreyi Kapat</span>';
        }
        if (!isHidden) {
            filterToggle.classList.add('active-filter');
        } else {
            filterToggle.classList.remove('active-filter');
        }
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
                (f.id && f.id.toLowerCase().includes(query)) ||
                (f.clientName && f.clientName.toLowerCase().includes(query)) ||
                (f.clientCity && f.clientCity.toLowerCase().includes(query)) ||
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
        document.getElementById('settings-lang').value = state.settings.lang || 'tr';
        
        // Load QR checkbox state and lock if not premium
        const enableQrCheckbox = document.getElementById('settings-enable-qr');
        const premiumLock = document.getElementById('settings-qr-premium-lock');
        const qrHelp = document.getElementById('settings-qr-help');
        
        if (state.settings.isPremium) {
            enableQrCheckbox.disabled = false;
            enableQrCheckbox.checked = state.settings.enableQr !== false; // default true
            premiumLock.style.display = 'none';
            if (state.settings.lang === 'en') {
                qrHelp.textContent = "QR verification code is placed under PDF outputs for digital validation.";
                qrHelp.style.color = "var(--text-muted)";
            } else {
                qrHelp.textContent = "PDF çıktılarının altına doğrulama ve dijital aktarım için QR kod yerleştirilir.";
                qrHelp.style.color = "var(--text-muted)";
            }
        } else {
            enableQrCheckbox.disabled = true;
            enableQrCheckbox.checked = false;
            premiumLock.style.display = 'inline-block';
            if (state.settings.lang === 'en') {
                qrHelp.textContent = "🔒 Adding QR Verification Code is a Pro feature only.";
                qrHelp.style.color = "#fbbf24";
            } else {
                qrHelp.textContent = "🔒 QR Doğrulama Kodu ekleme özelliği sadece Premium üyeler içindir.";
                qrHelp.style.color = "#fbbf24";
            }
        }
        
        settingsModal.classList.remove('hidden');
    });

    document.getElementById('btn-close-settings').addEventListener('click', () => {
        settingsModal.classList.add('hidden');
    });

    document.getElementById('btn-save-settings').addEventListener('click', () => {
        state.settings.defaultKdv = parseInt(document.getElementById('settings-kdv').value) || 20;
        state.settings.currency = document.getElementById('settings-currency').value;
        state.settings.lang = document.getElementById('settings-lang').value || 'tr';
        if (state.settings.isPremium) {
            state.settings.enableQr = document.getElementById('settings-enable-qr').checked;
        } else {
            state.settings.enableQr = false;
        }
        saveSettings();
        settingsModal.classList.add('hidden');
        applyLanguage(state.settings.lang);
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
    const proStatusModal = document.getElementById('modal-pro-status');
    
    function openProStatusModal() {
        const pType = state.settings.premiumType || 'yearly';
        const pDate = state.settings.premiumStartDate || new Date().toISOString();
        
        let typeStr = 'Yıllık Pro Paket';
        if (pType === 'monthly') typeStr = 'Aylık Pro Paket';
        else if (pType === 'enterprise') typeStr = 'Kurumsal Pro Paket';
        
        if (state.settings.lang === 'en') {
            typeStr = pType === 'monthly' ? 'Monthly Pro Plan' : (pType === 'enterprise' ? 'Enterprise Pro Plan' : 'Yearly Pro Plan');
        }
        
        const dateFormatted = new Date(pDate).toLocaleDateString(state.settings.lang === 'en' ? 'en-US' : 'tr-TR');
        
        document.getElementById('pro-sub-type').textContent = typeStr;
        document.getElementById('pro-sub-start-date').textContent = dateFormatted;
        
        proStatusModal.classList.remove('hidden');
    }

    // Header Premium Butonu
    const goPremiumBtn = document.getElementById('btn-go-premium');
    if (goPremiumBtn) {
        goPremiumBtn.addEventListener('click', () => {
            if (state.settings.isPremium) {
                openProStatusModal();
            } else {
                const alertBanner = document.getElementById('premium-limit-alert');
                if (alertBanner) alertBanner.style.display = 'none';
                premiumModal.classList.remove('hidden');
            }
        });
    }

    // Ayarlar Premium Butonu
    const settingsPremiumBtn = document.getElementById('btn-settings-premium');
    if (settingsPremiumBtn) {
        settingsPremiumBtn.addEventListener('click', () => {
            if (state.settings.isPremium) {
                settingsModal.classList.add('hidden');
                openProStatusModal();
            } else {
                const alertBanner = document.getElementById('premium-limit-alert');
                if (alertBanner) alertBanner.style.display = 'none';
                settingsModal.classList.add('hidden');
                premiumModal.classList.remove('hidden');
            }
        });
    }

    // Modalları Kapatma Butonları
    document.getElementById('btn-close-pro-status').addEventListener('click', () => {
        proStatusModal.classList.add('hidden');
    });
    document.getElementById('btn-close-pro-status-footer').addEventListener('click', () => {
        proStatusModal.classList.add('hidden');
    });

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
        applyLanguage(state.settings.lang || 'tr');
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
                
                if (activeView === 'companyEdit' || activeView === 'serviceEntry' || activeView === 'quoteEntry') {
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
            lean.it = (dd.items || []).map(i => ({ d: i.desc, q: i.qty, u: i.unit, p: i.price, ds: i.discount || 0, k: i.kdv }));
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
        // Büyük metin alanları (İşlem / Sonuç / Teklif Koşulları)
        element.querySelectorAll('textarea.print-textarea').forEach(ta => {
            const div = document.createElement('div');
            div.className = 'print-textarea-clone';
            div.textContent = ta.value;
            ta.style.display = 'none';
            ta.parentNode.insertBefore(div, ta.nextSibling);
            created.push({ ta, div });
        });
        // Tablo içi metin alanları (cihaz/parça/teklif kalemi). html2canvas textarea içeriğini
        // doğru saramaz; içeriğe oturan, satır kaydıran bir div ile değiştir.
        element.querySelectorAll('textarea.print-inline-input').forEach(ta => {
            const div = document.createElement('div');
            div.className = 'print-inline-clone';
            const cs = window.getComputedStyle(ta);
            div.style.textAlign = cs.textAlign;
            if (ta.classList.contains('bold-input')) div.style.fontWeight = '700';
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
                items: (L.it || []).map(i => ({ desc: i.d || '', qty: i.q, unit: i.u || '', price: i.p, discount: i.ds || 0, kdv: i.k }))
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


    // ==========================================
    // 13. FORM BİLGİ GİRİŞ EKRANI (TEMİZ LİSTE) AKIŞI
    //  Form Hazırla -> temiz liste -> "Kaydet ve Ön İzle" -> PDF canvas
    //  PDF canvas -> "✏️ Düzenle" -> tekrar temiz liste
    // ==========================================
    let entryContext = null; // { type, mode: 'new' | 'edit' }

    function genServiceNo() {
        const year = new Date().toISOString().split('T')[0].split('-')[0];
        const count = state.forms.filter(f => f.type === 'servis' && f.date && f.date.startsWith(year)).length + 1;
        return `SRV-${year}-${String(count).padStart(4, '0')}`;
    }
    function genQuoteNo() {
        const year = new Date().toISOString().split('T')[0].split('-')[0];
        const count = state.forms.filter(f => f.type === 'teklif' && f.date && f.date.startsWith(year)).length + 1;
        return `TEK-${year}-${String(count).padStart(4, '0')}`;
    }

    function clearEntryInvalid() {
        document.querySelectorAll('.entry-invalid').forEach(el => el.classList.remove('entry-invalid'));
    }

    // Zorunlu alan uyarı pop-up'ı
    function showRequiredWarn(fieldEl, fieldLabel) {
        const modal = document.getElementById('modal-required-warn');
        const txt = document.getElementById('required-warn-text');
        if (txt && fieldLabel) {
            txt.innerHTML = `Devam etmeden önce lütfen zorunlu alan olan <strong>${fieldLabel}</strong> kısmını doldurun.`;
        }
        if (fieldEl) {
            fieldEl.classList.add('entry-invalid');
            fieldEl.addEventListener('input', () => fieldEl.classList.remove('entry-invalid'), { once: true });
        }
        modal.classList.remove('hidden');
    }
    document.getElementById('btn-close-required-warn').addEventListener('click', () => {
        document.getElementById('modal-required-warn').classList.add('hidden');
    });
    document.getElementById('btn-ok-required-warn').addEventListener('click', () => {
        document.getElementById('modal-required-warn').classList.add('hidden');
        const f = document.querySelector('.entry-invalid');
        if (f) f.focus();
    });

    // ---------- SERVİS GİRİŞ EKRANI ----------
    function addServiceDeviceEntryRow(d) {
        d = d || { model: '', sn: '', contract: 'yok' };
        const row = document.createElement('div');
        row.className = 'entry-row entry-device-row';
        row.innerHTML = `
            <input class="e-dev-model" type="text" placeholder="Marka / Model">
            <input class="e-dev-sn" type="text" placeholder="Künye / Seri No">
            <div class="entry-row-foot">
                <label class="entry-inline-check"><input type="checkbox" class="e-dev-contract"> Bakım Anlaşması Var</label>
                <button type="button" class="entry-row-del" title="Cihazı Sil">🗑️</button>
            </div>
        `;
        row.querySelector('.e-dev-model').value = d.model || '';
        row.querySelector('.e-dev-sn').value = d.sn || '';
        row.querySelector('.e-dev-contract').checked = (d.contract === 'var');
        row.querySelector('.entry-row-del').addEventListener('click', () => row.remove());
        document.getElementById('se-devices').appendChild(row);
    }

    function addServicePartEntryRow(p) {
        p = p || { code: '', name: '', qty: 1, changed: false, recommend: false };
        const row = document.createElement('div');
        row.className = 'entry-row entry-part-row';
        row.innerHTML = `
            <input class="e-part-code" type="text" placeholder="Parça Kodu">
            <input class="e-part-name" type="text" placeholder="Yedek Parça İsmi">
            <div class="entry-row-foot">
                <div class="entry-row-checks">
                    <label class="entry-inline-check">Adet <input class="e-part-qty" type="number" min="1" style="width:58px"></label>
                    <label class="entry-inline-check"><input type="checkbox" class="e-part-changed"> Değişti</label>
                    <label class="entry-inline-check"><input type="checkbox" class="e-part-recommend"> Tavsiye</label>
                </div>
                <button type="button" class="entry-row-del" title="Parçayı Sil">🗑️</button>
            </div>
        `;
        row.querySelector('.e-part-code').value = p.code || '';
        row.querySelector('.e-part-name').value = p.name || '';
        row.querySelector('.e-part-qty').value = p.qty || 1;
        row.querySelector('.e-part-changed').checked = !!p.changed;
        row.querySelector('.e-part-recommend').checked = !!p.recommend;
        row.querySelector('.entry-row-del').addEventListener('click', () => row.remove());
        document.getElementById('se-parts').appendChild(row);
    }

    function fillServiceEntryFromData(d) {
        const data = d.data || {};
        document.getElementById('se-no').value = d.id || '';
        document.getElementById('se-date').value = d.date || new Date().toISOString().split('T')[0];
        document.getElementById('se-client-name').value = d.clientName || '';
        document.getElementById('se-client-city').value = d.clientCity || '';
        document.getElementById('se-chk-bakim').checked = !!data.chkBakim;
        document.getElementById('se-chk-onarim').checked = !!data.chkOnarim;
        document.getElementById('se-chk-ariza').checked = !!data.chkAriza;
        document.getElementById('se-chk-kontrol').checked = !!data.chkKontrol;
        document.getElementById('se-chk-garanti').checked = !!data.chkGaranti;
        document.getElementById('se-chk-kurulum').checked = !!data.chkKurulum;
        document.getElementById('se-process').value = data.processText || '';
        document.getElementById('se-result').value = data.resultText || '';
        document.getElementById('se-tech-name').value = data.techName || '';
        document.getElementById('se-client-person').value = data.clientPerson || '';
        document.getElementById('se-unit-person').value = data.unitPerson || '';
        document.getElementById('se-devices').innerHTML = '';
        const devices = (data.devices && data.devices.length) ? data.devices : [undefined];
        devices.forEach(dev => addServiceDeviceEntryRow(dev));
        document.getElementById('se-parts').innerHTML = '';
        const parts = (data.parts && data.parts.length) ? data.parts : [undefined];
        parts.forEach(pt => addServicePartEntryRow(pt));
    }

    function buildServiceDataFromEntry() {
        const devices = [];
        document.querySelectorAll('#se-devices .entry-device-row').forEach(row => {
            const model = row.querySelector('.e-dev-model').value.trim();
            const sn = row.querySelector('.e-dev-sn').value.trim();
            const contract = row.querySelector('.e-dev-contract').checked ? 'var' : 'yok';
            if (model || sn) devices.push({ model, sn, contract });
        });
        const parts = [];
        document.querySelectorAll('#se-parts .entry-part-row').forEach(row => {
            const code = row.querySelector('.e-part-code').value.trim();
            const name = row.querySelector('.e-part-name').value.trim();
            const qty = parseInt(row.querySelector('.e-part-qty').value) || 1;
            const changed = row.querySelector('.e-part-changed').checked;
            const recommend = row.querySelector('.e-part-recommend').checked;
            if (code || name) parts.push({ code, name, qty, changed, recommend });
        });
        return {
            id: document.getElementById('se-no').value.trim(),
            type: 'servis',
            companyId: state.activeCompanyId,
            date: document.getElementById('se-date').value,
            clientName: document.getElementById('se-client-name').value.trim(),
            clientCity: document.getElementById('se-client-city').value.trim(),
            grandTotal: '',
            data: {
                chkBakim: document.getElementById('se-chk-bakim').checked,
                chkOnarim: document.getElementById('se-chk-onarim').checked,
                chkAriza: document.getElementById('se-chk-ariza').checked,
                chkKontrol: document.getElementById('se-chk-kontrol').checked,
                chkGaranti: document.getElementById('se-chk-garanti').checked,
                chkKurulum: document.getElementById('se-chk-kurulum').checked,
                processText: document.getElementById('se-process').value.trim(),
                resultText: document.getElementById('se-result').value.trim(),
                techName: document.getElementById('se-tech-name').value.trim(),
                clientPerson: document.getElementById('se-client-person').value.trim(),
                unitPerson: document.getElementById('se-unit-person').value.trim(),
                devices: devices,
                parts: parts
            },
            signatures: { tech: null, client: null, unit: null }
        };
    }

    // Canvas (A4) -> sade veri (doğrulama/uyarı yok)
    function readServiceCanvas() {
        const devices = [];
        document.querySelectorAll('#srv-table-devices tbody tr').forEach(tr => {
            const model = tr.querySelector('.val-model').value.trim();
            const sn = tr.querySelector('.val-sn').value.trim();
            const contractEl = tr.querySelector('.val-contract:checked');
            const contract = contractEl ? contractEl.value : 'yok';
            if (model || sn) devices.push({ model, sn, contract });
        });
        const parts = [];
        document.querySelectorAll('#srv-table-parts tbody tr').forEach(tr => {
            const code = tr.querySelector('.val-pcode').value.trim();
            const name = tr.querySelector('.val-pname').value.trim();
            const qty = parseInt(tr.querySelector('.val-pqty').value) || 1;
            const changed = tr.querySelector('.val-pchanged').checked;
            const recommend = tr.querySelector('.val-precommend').checked;
            if (code || name) parts.push({ code, name, qty, changed, recommend });
        });
        return {
            id: document.getElementById('srv-input-no').value.trim(),
            date: document.getElementById('srv-input-date').value,
            clientName: document.getElementById('srv-input-client-name').value.trim(),
            clientCity: document.getElementById('srv-input-client-city').value.trim(),
            data: {
                chkBakim: document.getElementById('srv-chk-bakim').checked,
                chkOnarim: document.getElementById('srv-chk-onarim').checked,
                chkAriza: document.getElementById('srv-chk-ariza').checked,
                chkKontrol: document.getElementById('srv-chk-kontrol').checked,
                chkGaranti: document.getElementById('srv-chk-garanti').checked,
                chkKurulum: document.getElementById('srv-chk-kurulum').checked,
                processText: document.getElementById('srv-txt-process').value,
                resultText: document.getElementById('srv-txt-result').value,
                techName: document.getElementById('srv-input-tech-name').value.trim(),
                clientPerson: document.getElementById('srv-input-client-person').value.trim(),
                unitPerson: document.getElementById('srv-input-unit-person').value.trim(),
                devices: devices,
                parts: parts
            }
        };
    }

    function openServiceEntry(formData = null) {
        const company = resolveEditorCompany(formData);
        if (!company) { alert("Lütfen önce bir aktif şirket ekleyin."); return; }

        if (formData) {
            entryContext = { type: 'servis', mode: 'edit' };
            fillServiceEntryFromData(formData);
        } else {
            entryContext = { type: 'servis', mode: 'new' };
            document.getElementById('se-date').valueAsDate = new Date();
            document.getElementById('se-no').value = genServiceNo();
            document.getElementById('se-client-name').value = '';
            document.getElementById('se-client-city').value = '';
            ['bakim', 'onarim', 'ariza', 'kontrol', 'garanti', 'kurulum']
                .forEach(k => document.getElementById('se-chk-' + k).checked = false);
            document.getElementById('se-process').value = '';
            document.getElementById('se-result').value = '';
            document.getElementById('se-tech-name').value = '';
            document.getElementById('se-client-person').value = '';
            document.getElementById('se-unit-person').value = '';
            document.getElementById('se-devices').innerHTML = '';
            document.getElementById('se-parts').innerHTML = '';
            addServiceDeviceEntryRow();
            addServicePartEntryRow();
        }
        clearEntryInvalid();
        showView('serviceEntry');
    }

    function editServiceFromCanvas() {
        const d = readServiceCanvas();
        entryContext = { type: 'servis', mode: 'edit', themeColor: getCanvasColor('service-print-area') };
        fillServiceEntryFromData(d);
        clearEntryInvalid();
        showView('serviceEntry');
    }

    // "Kaydet ve Ön İzle" -> PDF canvas
    function previewServiceFromEntry() {
        const nameEl = document.getElementById('se-client-name');
        if (!nameEl.value.trim()) {
            showRequiredWarn(nameEl, 'Kurum / Kişi Adı');
            return;
        }
        const built = buildServiceDataFromEntry();
        if (!built.id) built.id = genServiceNo();

        let fd;
        if (entryContext && entryContext.mode === 'edit' && state.currentEditingForm && state.currentEditingForm.type === 'servis') {
            // Mevcut formun meta verilerini (QR/şirket vb.) koru, alanları girişten güncelle
            fd = { ...state.currentEditingForm };
            fd.id = built.id;
            fd.date = built.date;
            fd.clientName = built.clientName;
            fd.clientCity = built.clientCity;
            fd.grandTotal = '';
            fd.data = built.data;
            fd.signatures = { ...serviceSignatures };
        } else {
            fd = built;
            fd.companyId = state.activeCompanyId;
            const company = state.companies.find(c => c.id === state.activeCompanyId) || state.companies[0];
            fd.signatures = { tech: (company && company.signature) ? company.signature : null, client: null, unit: null };
        }
        // Canvas'ta seçilmiş form rengini koru
        fd.themeColor = (entryContext && entryContext.themeColor) || '';
        openServiceFormEditor(fd);
    }

    document.getElementById('se-add-device').addEventListener('click', () => addServiceDeviceEntryRow());
    document.getElementById('se-add-part').addEventListener('click', () => addServicePartEntryRow());
    document.getElementById('btn-srv-entry-preview').addEventListener('click', previewServiceFromEntry);
    document.getElementById('btn-srv-entry-cancel').addEventListener('click', () => showView('dashboard'));
    document.getElementById('btn-srv-entry-back').addEventListener('click', () => showView('dashboard'));
    document.getElementById('btn-edit-service-form').addEventListener('click', editServiceFromCanvas);

    // ---------- TEKLİF GİRİŞ EKRANI ----------
    function recalcQuoteEntryTotals() {
        let subtotal = 0, taxTotal = 0;
        document.querySelectorAll('#qe-items .entry-item-row').forEach(row => {
            const qty = parseFloat(row.querySelector('.e-item-qty').value) || 0;
            const price = parseFloat(row.querySelector('.e-item-price').value) || 0;
            const discount = parseFloat(row.querySelector('.e-item-discount').value) || 0;
            const kdv = parseFloat(row.querySelector('.e-item-kdv').value) || 0;
            const lineTotal = qty * price * (1 - discount / 100);
            subtotal += lineTotal;
            taxTotal += lineTotal * (kdv / 100);
            row.querySelector('.e-item-total').textContent = formatCurrency(lineTotal * (1 + kdv / 100));
        });
        document.getElementById('qe-grand-total').textContent = formatCurrency(subtotal + taxTotal);
    }

    function addQuoteItemEntryRow(item) {
        item = item || { desc: '', qty: 1, unit: 'AD', price: 0, discount: 0, kdv: null };
        const kdvVal = (item.kdv === null || item.kdv === undefined) ? state.settings.defaultKdv : item.kdv;
        const row = document.createElement('div');
        row.className = 'entry-row entry-item-row';
        row.innerHTML = `
            <textarea class="e-item-desc" rows="2" placeholder="Mal / Hizmet Açıklaması"></textarea>
            <div class="entry-item-grid">
                <div class="ig-field"><label>Miktar</label><input class="e-item-qty" type="number" min="0" step="any"></div>
                <div class="ig-field"><label>Birim</label><input class="e-item-unit" type="text"></div>
                <div class="ig-field"><label>Birim Fiyat</label><input class="e-item-price" type="number" min="0" step="any"></div>
                <div class="ig-field"><label>İskonto %</label><input class="e-item-discount" type="number" min="0" max="100" step="any"></div>
                <div class="ig-field"><label>KDV %</label><input class="e-item-kdv" type="number" min="0" max="100" step="any"></div>
            </div>
            <div class="entry-row-foot">
                <span class="e-item-total">₺ 0,00</span>
                <button type="button" class="entry-row-del" title="Kalemi Sil">🗑️</button>
            </div>
        `;
        row.querySelector('.e-item-desc').value = item.desc || '';
        row.querySelector('.e-item-qty').value = (item.qty !== undefined ? item.qty : 1);
        row.querySelector('.e-item-unit').value = item.unit || 'AD';
        row.querySelector('.e-item-price').value = (item.price !== undefined ? item.price : 0);
        row.querySelector('.e-item-discount').value = (item.discount !== undefined ? item.discount : 0);
        row.querySelector('.e-item-kdv').value = kdvVal;
        row.querySelectorAll('input').forEach(inp => inp.addEventListener('input', recalcQuoteEntryTotals));
        row.querySelector('.entry-row-del').addEventListener('click', () => { row.remove(); recalcQuoteEntryTotals(); });
        document.getElementById('qe-items').appendChild(row);
    }

    function fillQuoteEntryFromData(d) {
        const data = d.data || {};
        document.getElementById('qe-no').value = d.id || '';
        document.getElementById('qe-date').value = d.date || new Date().toISOString().split('T')[0];
        document.getElementById('qe-client-title').value = d.clientName || '';
        document.getElementById('qe-client-address').value = data.clientAddress || '';
        document.getElementById('qe-client-city').value = d.clientCity || '';
        document.getElementById('qe-conditions').value = data.conditionsText || '';
        document.getElementById('qe-items').innerHTML = '';
        const items = (data.items && data.items.length) ? data.items : [undefined];
        items.forEach(it => addQuoteItemEntryRow(it));
        recalcQuoteEntryTotals();
    }

    function buildQuoteDataFromEntry() {
        const items = [];
        let subtotal = 0, taxTotal = 0;
        document.querySelectorAll('#qe-items .entry-item-row').forEach(row => {
            const desc = row.querySelector('.e-item-desc').value.trim();
            const qty = parseFloat(row.querySelector('.e-item-qty').value) || 0;
            const unit = row.querySelector('.e-item-unit').value.trim();
            const price = parseFloat(row.querySelector('.e-item-price').value) || 0;
            const discount = parseFloat(row.querySelector('.e-item-discount').value) || 0;
            const kdv = parseFloat(row.querySelector('.e-item-kdv').value) || 0;
            if (desc || qty || price) {
                items.push({ desc, qty, unit, price, discount, kdv });
                const lineTotal = qty * price * (1 - discount / 100);
                subtotal += lineTotal;
                taxTotal += lineTotal * (kdv / 100);
            }
        });
        const grandTotal = subtotal + taxTotal;
        return {
            id: document.getElementById('qe-no').value.trim(),
            type: 'teklif',
            companyId: state.activeCompanyId,
            date: document.getElementById('qe-date').value,
            clientName: document.getElementById('qe-client-title').value.trim(),
            clientCity: document.getElementById('qe-client-city').value.trim(),
            grandTotal: grandTotal.toFixed(2),
            data: {
                clientAddress: document.getElementById('qe-client-address').value.trim(),
                conditionsText: document.getElementById('qe-conditions').value.trim(),
                items: items,
                subtotal: subtotal.toFixed(2),
                taxTotal: taxTotal.toFixed(2)
            },
            signatures: { stamp: null, signature: null }
        };
    }

    function readQuoteCanvas() {
        const items = [];
        document.querySelectorAll('#qte-table-items tbody tr').forEach(tr => {
            const desc = tr.querySelector('.val-desc').value.trim();
            const qty = parseFloat(tr.querySelector('.val-qty').value) || 0;
            const unit = tr.querySelector('.val-unit').value.trim();
            const price = parseFloat(tr.querySelector('.val-price').value) || 0;
            const discount = parseFloat(tr.querySelector('.val-discount').value) || 0;
            const kdv = parseFloat(tr.querySelector('.val-kdv').value) || 0;
            if (desc || qty || price) items.push({ desc, qty, unit, price, discount, kdv });
        });
        return {
            id: document.getElementById('qte-input-no').value.trim(),
            date: document.getElementById('qte-input-date').value,
            clientName: document.getElementById('qte-input-client-title').value.trim(),
            clientCity: document.getElementById('qte-input-client-city').value.trim(),
            data: {
                clientAddress: document.getElementById('qte-input-client-address').value.trim(),
                conditionsText: document.getElementById('qte-txt-conditions').value.trim(),
                items: items
            }
        };
    }

    function openQuoteEntry(formData = null) {
        const company = resolveEditorCompany(formData);
        if (!company) { alert("Lütfen önce bir aktif şirket ekleyin."); return; }

        if (formData) {
            entryContext = { type: 'teklif', mode: 'edit' };
            fillQuoteEntryFromData(formData);
        } else {
            entryContext = { type: 'teklif', mode: 'new' };
            document.getElementById('qe-date').valueAsDate = new Date();
            document.getElementById('qe-no').value = genQuoteNo();
            document.getElementById('qe-client-title').value = '';
            document.getElementById('qe-client-address').value = '';
            document.getElementById('qe-client-city').value = '';
            document.getElementById('qe-conditions').value = "* Fiyatlarımız KDV hariçtir.\n* Teslim süresi 15 gündür.\n* Ödeme: Teslimatta nakit veya havale.";
            document.getElementById('qe-items').innerHTML = '';
            addQuoteItemEntryRow();
            recalcQuoteEntryTotals();
        }
        clearEntryInvalid();
        showView('quoteEntry');
    }

    function editQuoteFromCanvas() {
        const d = readQuoteCanvas();
        entryContext = { type: 'teklif', mode: 'edit', themeColor: getCanvasColor('quote-print-area') };
        fillQuoteEntryFromData(d);
        clearEntryInvalid();
        showView('quoteEntry');
    }

    function previewQuoteFromEntry() {
        const nameEl = document.getElementById('qe-client-title');
        if (!nameEl.value.trim()) {
            showRequiredWarn(nameEl, 'Kişi / Kurum Adı');
            return;
        }
        const built = buildQuoteDataFromEntry();
        if (!built.id) built.id = genQuoteNo();

        let fd;
        if (entryContext && entryContext.mode === 'edit' && state.currentEditingForm && state.currentEditingForm.type === 'teklif') {
            fd = { ...state.currentEditingForm };
            fd.id = built.id;
            fd.date = built.date;
            fd.clientName = built.clientName;
            fd.clientCity = built.clientCity;
            fd.grandTotal = built.grandTotal;
            fd.data = built.data;
            fd.signatures = { ...quoteSignatures };
        } else {
            fd = built;
            fd.companyId = state.activeCompanyId;
            const company = state.companies.find(c => c.id === state.activeCompanyId) || state.companies[0];
            fd.signatures = {
                stamp: (company && company.stamp) ? company.stamp : null,
                signature: (company && company.signature) ? company.signature : null
            };
        }
        // Canvas'ta seçilmiş form rengini koru
        fd.themeColor = (entryContext && entryContext.themeColor) || '';
        openQuoteFormEditor(fd);
    }

    document.getElementById('qe-add-item').addEventListener('click', () => { addQuoteItemEntryRow(); recalcQuoteEntryTotals(); });
    document.getElementById('btn-qte-entry-preview').addEventListener('click', previewQuoteFromEntry);
    document.getElementById('btn-qte-entry-cancel').addEventListener('click', () => showView('dashboard'));
    document.getElementById('btn-qte-entry-back').addEventListener('click', () => showView('dashboard'));
    document.getElementById('btn-edit-quote-form').addEventListener('click', editQuoteFromCanvas);


    // ==========================================
    // 14. METİN ALANI AUTO-GROW + FORM RENK KİŞİSELLEŞTİRME
    // ==========================================

    // Bir textarea'yı içeriğine göre dikey büyüt (kaydırma çubuğu yerine alttan uzasın)
    function autoGrowField(el) {
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = (el.scrollHeight) + 'px';
    }

    // Verilen kapsayıcıdaki tablo textarea'larına auto-grow bağla + ilk boyutu ayarla
    function bindTableTextareaAutoGrow(container) {
        if (!container) return;
        container.querySelectorAll('textarea.print-inline-input').forEach(ta => {
            ta.addEventListener('input', () => autoGrowField(ta));
            autoGrowField(ta);
        });
    }

    // Bir A4 print alanındaki tüm metin alanlarını içeriğe göre yeniden boyutlandır
    function resizeFormTextareas(printAreaId) {
        const pa = document.getElementById(printAreaId);
        if (!pa) return;
        pa.querySelectorAll('textarea.print-inline-input, textarea.print-textarea').forEach(autoGrowField);
    }

    // Büyük metin alanları (Yapılan İşlem / Sonuç / Teklif Koşulları) editörde aşağı uzasın
    ['srv-txt-process', 'srv-txt-result', 'qte-txt-conditions'].forEach(id => {
        const ta = document.getElementById(id);
        if (ta) ta.addEventListener('input', () => autoGrowField(ta));
    });

    // --- Form Renk Kişiselleştirme ---
    // Bir rengi koyulaştır (başlık/toplam gibi koyu vurgular için)
    function darkenColor(hex, amt) {
        let c = (hex || '').replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        if (c.length !== 6) return hex || '#000000';
        const n = parseInt(c, 16);
        let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
        r = Math.round(r * (1 - amt));
        g = Math.round(g * (1 - amt));
        b = Math.round(b * (1 - amt));
        return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
    }

    // A4 print alanına uygulanmış form rengini oku (yoksa boş = varsayılan)
    function getCanvasColor(printAreaId) {
        const pa = document.getElementById(printAreaId);
        return pa ? (pa.style.getPropertyValue('--form-accent').trim() || '') : '';
    }

    // Renk seçicideki aktif swatch'i güncelle
    function updateActiveSwatch(picker, color) {
        if (!picker) return;
        const norm = (color || '').toLowerCase();
        let matched = false;
        picker.querySelectorAll('.fcp-swatch:not(.fcp-custom)').forEach(sw => {
            const dc = (sw.getAttribute('data-color') || '').toLowerCase();
            const active = (dc === norm);
            sw.classList.toggle('active', active);
            if (active) matched = true;
        });
        const custom = picker.querySelector('.fcp-custom');
        if (custom) custom.classList.toggle('active', !!norm && !matched);
    }

    // Form rengini uygula: color boş/null ise varsayılana (orijinal mavi/lacivert) döner
    function applyFormColor(printArea, color) {
        if (!printArea) return;
        if (color) {
            printArea.style.setProperty('--form-accent', color);
            printArea.style.setProperty('--form-accent-strong', darkenColor(color, 0.3));
        } else {
            printArea.style.removeProperty('--form-accent');
            printArea.style.removeProperty('--form-accent-strong');
        }
        const pickerId = (printArea.id === 'service-print-area') ? 'srv-color-picker' : 'qte-color-picker';
        updateActiveSwatch(document.getElementById(pickerId), color || '');
    }

    // Renk seçici butonlarını bağla
    function wireColorPicker(pickerId, printAreaId) {
        const picker = document.getElementById(pickerId);
        const printArea = document.getElementById(printAreaId);
        if (!picker || !printArea) return;
        picker.querySelectorAll('.fcp-swatch:not(.fcp-custom)').forEach(sw => {
            sw.addEventListener('click', () => {
                const color = sw.getAttribute('data-color') || '';
                applyFormColor(printArea, color || null);
            });
        });
        const customInput = picker.querySelector('.fcp-custom-input');
        if (customInput) {
            customInput.addEventListener('input', () => applyFormColor(printArea, customInput.value));
        }
    }
    wireColorPicker('srv-color-picker', 'service-print-area');
    wireColorPicker('qte-color-picker', 'quote-print-area');

});
