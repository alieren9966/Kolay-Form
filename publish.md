# Kolay Form - Mobil Mağaza Yayınlama Takip Kılavuzu (Publish Tracker)

Bu dosya, **Kolay Form** uygulamasının Google Play Store ve Apple App Store üzerindeki yayınlama süreçlerini, güncel durumlarını ve sonraki adımları takip etmek amacıyla oluşturulmuştur.

---

## 📊 Güncel Mağaza Durumları (Son Güncelleme: 20 Haziran 2026)

| Platform | Hesap Durumu | Yayınlama Durumu | Notlar / Bekleyen Süreçler |
| :--- | :--- | :--- | :--- |
| **Apple App Store** | ⏳ **Enrollment Pending** (Kayıt Beklemede) | - | Apple Geliştirici Programı ($99/yıl) ödeme ve kayıt doğrulama süreci bekleniyor. |
| **Google Play Console** | ⏳ **Doğrulanıyor** (Kimlik Doğrulama Sürecinde) | - | Google Play Console geliştirici hesabı doğrulama süreci devam ediyor. |

---

## 🛠️ Yayınlama Öncesi Yol Haritası ve Yapılacaklar Listesi

### 1. Hesap Doğrulamaları ve Kurulum (Mevcut Aşama)
- [ ] Apple Developer Program üyeliğinin onaylanması.
- [ ] Google Play Console kimlik doğrulamasının tamamlanması.
- [ ] App Store Connect API Key oluşturulması ve `.p8` dosyasının indirilmesi.
- [ ] Codemagic üzerinde `Apple Developer Connection` entegrasyonunun tamamlanması.

### 2. Mağaza Hazırlıkları (Metin ve Görseller)
- [ ] Google Play Store için mağaza metinleri (Başlık, Kısa Açıklama, Uzun Açıklama) hazırlığı.
- [ ] Apple App Store için mağaza metinleri (Uygulama Adı, Alt Başlık, Açıklama, Anahtar Kelimeler) hazırlığı.
- [ ] Uygulama İkonunun (App Icon) 1024x1024 boyutlarında hazırlanması.
- [ ] Google Play Ekran Görüntüleri (Telefon, 7" Tablet, 10" Tablet) hazırlanması.
- [ ] App Store Ekran Görüntüleri (6.7" iPhone, 6.5" iPhone, 12.9" iPad) hazırlanması.
- [ ] Play Store için "Öne Çıkan Grafik" (Feature Graphic - 1024x500 px) tasarımı.

### 3. Tanıtım Web Sitesi (Landing Page) Hazırlığı
- [ ] Landing page tasarımı ve kodlanması.
- [ ] Projenin web sitesinin GitHub Pages veya Vercel üzerinde canlıya alınması.
- [ ] Gizlilik Politikası (Privacy Policy) ve Kullanım Koşulları (Terms of Service) sayfalarının oluşturulması (Mağaza onayları için zorunludur).
- [ ] `kolayform.app` domain yönlendirmelerinin yapılması.

### 4. İlk Sürümlerin Gönderilmesi
- [ ] Codemagic üzerinden ilk iOS build'inin alınması ve TestFlight'a yüklenmesi.
- [ ] Android Studio üzerinden AAB (Android App Bundle) sürümünün alınması ve Play Console'da "Kapalı Test" veya "Üretim" kanalına yüklenmesi.
- [ ] Mağaza incelemelerinin başlatılması ve onay süreci takibi.

---

## ✨ Tamamlanan Özellikler ve İş Kuralları (Implemented Features & Business Rules)

* **Günlük İndirme Sınırı (Free):** Ücretsiz kullanıcılar günde maksimum **3 adet PDF** indirebilir (reklam izleyerek). 4. indirmede işlem engellenerek Premium satın alma modalı otomatik gösterilir. Ayrıca kullanıcıya yeni indirme haklarının tanımlanacağı zamanı gösteren **24 saatlik gerçek zamanlı bir geri sayım sayacı** gösterilir.
* **Toplu PDF İndirme (Pro-Only):** Filtrelenmiş geçmiş formların tek bir PDF dosyasında birleştirilip indirilmesi (Toplu İndir) özelliği tamamen Premium üyelere özel hale getirilmiştir.
* **PDF QR Doğrulama Kodu Kontrolü:** PDF çıktılarında QR kod eklenmesi/kaldırılması ayarı Pro kullanıcılara özeldir (Ayarlar menüsünden yönetilir). Ücretsiz üyelerde bu kod eklenmez ve ayar kilitlenir.
* **Otomatik Kaydetme (Auto-Save):** Editörde kaydetmeden doğrudan PDF İndir denildiğinde veri kaybını önlemek amacıyla form arka planda otomatik olarak kaydedilir.
* **Kurumsal Paket Lisanslama Kurgusu:** 9999 TL'lik Kurumsal paket için sunucu bağımlılığını sıfırlamak ve veri gizliliğini korumak amacıyla Google Play Console ve App Store Connect'in **yerleşik Promo/Tanıtım Kodları** altyapısının kullanılması kararlaştırıldı ve satın alma kartına bu bilgi eklendi.
* **Arayüz Düzeltmeleri:** Premium butonunun taşma sorunu CSS ile giderildi. Kapsül tasarımı uygulandı.

