# Kolay Form - Mobil Mağaza Yayınlama Takip Kılavuzu (Publish Tracker)

Bu dosya, **Kolay Form** uygulamasının Google Play Store ve Apple App Store üzerindeki yayınlama süreçlerini, güncel durumlarını ve sonraki adımları takip etmek amacıyla oluşturulmuştur.

---

## 📊 Güncel Mağaza Durumları (Son Güncelleme: 22 Haziran 2026)

| Platform | Hesap Durumu | Yayınlama Durumu | Notlar / Bekleyen Süreçler |
| :--- | :--- | :--- | :--- |
| **Apple App Store** | ✅ **Tamamlandı** (Onaylandı) | - | Apple Geliştirici Programı ($99/yıl) aktif ve doğrulamalar bitti. |
| **Google Play Console** | ✅ **Tamamlandı** (Doğrulandı) | - | Google Play Console geliştirici hesabı doğrulaması tamamlandı. |
| **Google AdMob** | ✅ **Tamamlandı** (Entegre Edildi) | - | AdMob hesabı ve reklam birimleri aktif edildi. |
| **Web Sitesi & Domain**| ✅ **Tamamlandı** (Yayında) | - | `kolayform.com.tr` alan adı Hostinger üzerinde yayına alındı. |

---

## 🛠️ Yayınlama Öncesi Yol Haritası ve Yapılacaklar Listesi

### 1. Hesap Doğrulamaları ve Kurulum (Mevcut Aşama)
- [x] Apple Developer Program üyeliğinin onaylanması.
- [x] Google Play Console kimlik doğrulamasının tamamlanması.
- [x] Google AdMob kurulumu ve hesap entegrasyonu.
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
- [x] Landing page tasarımı ve kodlanması.
- [x] Projenin web sitesinin Hostinger üzerinde canlıya alınması (`kolayform.com.tr`).
- [ ] Gizlilik Politikası (Privacy Policy) ve Kullanım Koşulları (Terms of Service) sayfalarının web sitesine eklenmesi (Mağaza onayları için zorunludur).

### 4. İlk Sürümlerin Gönderilmesi
- [ ] Codemagic üzerinden ilk iOS build'inin alınması ve TestFlight'a yüklenmesi.
- [ ] Android Studio üzerinden AAB (Android App Bundle) sürümünün alınması ve Play Console'da "Kapalı Test" kanalına yüklenmesi (20 Testçi Süreci).
- [ ] Mağaza incelemelerinin başlatılması ve onay süreci takibi.

---

## 🎯 Detaylı Yayınlama Yol Haritası (Step-by-Step Publishing Guide)

Uygulamanın `kolayform.com.tr` üzerinden yayına alınmasıyla birlikte, hem Google Play hem de Apple App Store için izlenmesi gereken teknik adımlar aşağıda maddeler halinde listelenmiştir:

### A. GOOGLE PLAY STORE YAYINLAMA SÜRECİ

#### 1. Kod Yapılandırması ve AdMob Entegrasyonu
* **AndroidManifest.xml:** `android/app/src/main/AndroidManifest.xml` dosyasındaki AdMob App ID değerini canlı AdMob ID'niz ile güncelleyin:
  ```xml
  <meta-data
      android:name="com.google.android.gms.ads.APPLICATION_ID"
      android:value="ca-app-pub-XXXXXXXXXX~YYYYYYYYYY"/> <!-- Canlı AdMob App ID -->
  ```
* **Paket Adı ve Versiyonlama:** `android/app/build.gradle` dosyasında `applicationId` alanının benzersiz olduğundan emin olun (Örn: `com.alieren.kolayform`). `versionCode` (örn: 1) ve `versionName` (örn: "1.0.0") değerlerini tanımlayın.

#### 2. Android App Bundle (AAB) Sürümü Üretmek
* **Android Studio** programı ile projenizin `android` klasörünü açın.
* Üst menüden **Build > Generate Signed Bundle / APK...** seçeneğini seçin.
* **Android App Bundle (AAB)** seçip ilerleyin.
* Yeni bir Keystore (İmzalama Anahtarı) oluşturun. *Bu keystore dosyasını ve şifrelerini asla kaybetmeyin, sonraki güncellemelerde zorunludur.*
* Build type olarak **release** seçip derleme işlemini tamamlayarak `.aab` dosyasını alın.

#### 3. Google Play Console Kurulumu
* Google Play Console panelinizde **Uygulama Oluştur** butonuna tıklayın:
  * **Uygulama Adı:** Kolay Form (veya tercih ettiğiniz isim)
  * **Varsayılan Dil:** Türkçe (veya English)
  * **Uygulama Türü:** Uygulama (App)
  * **Ücretsiz/Ücretli:** Ücretsiz (Uygulama içi satın alma barındırıyor)
* **Kontrol Paneli (Dashboard) Görevlerini Tamamlayın:**
  * **Gizlilik Politikası Linki:** Web sitenizde barındıracağınız linki girin: `https://kolayform.com.tr/privacy-policy` (Hostinger sitenizin altına bu sayfayı ekleyin).
  * **Uygulama Erişimi:** "Tüm işlevler özel erişim olmadan kullanılabilir" seçeneğini seçin (Çünkü form doldurma için üyelik girişi zorunlu değildir).
  * **Reklamlar:** "Uygulamamda reklamlar var" seçeneğini işaretleyin (Çünkü AdMob entegrasyonu var).
  * **İçerik Derecelendirmesi:** Formu doldurarak içerik derecelendirme sertifikasını alın.
  * **Hedef Kitle:** Yaş gruplarını seçin (Örn: 18 yaş ve üzeri / İş odaklı).
  * **Finansal Özellikler:** Uygulama içi satın alımlar olduğunu beyan edin.
  * **Veri Güvenliği (Data Safety):** Formu doldururken: "Uygulama veri topluyor mu?" sorusuna **Hayır (No)** deyin (Çünkü tüm formlar yerel `localStorage` üzerinde saklanmaktadır, sunucuya aktarılmamaktadır).

#### 4. Kapalı Test & 20 Testçi Kuralı (KRİTİK)
* Bireysel geliştirici hesapları için Google, doğrudan Canlı (Production) sürüme çıkmanıza izin vermez.
* **Kapalı Test (Closed Testing)** sekmesinde bir test kanalı oluşturun.
* En az **20 testçinin** (arkadaşlarınız veya test ekiplerinin e-posta listesini) e-postasını girin.
* Oluşturduğunuz `.aab` sürümünü buraya yükleyin ve onay gönderin.
* Testçilerin uygulamayı **14 gün boyunca kesintisiz** olarak telefonlarında yüklü tutması ve test etmesi gerekir. 14 gün tamamlandıktan sonra Play Console üzerinden Canlı Sürüme geçiş talebinde bulunabilirsiniz.

#### 5. Google Play Console Sık Karşılaşılan Hatalar ve Çözümleri

Google Play Console'a sürüm yüklerken veya yayına gönderirken karşılaşabileceğiniz yaygın hatalar ve bunların çözümleri aşağıda listelenmiştir:

*   **Hata: "Bu APK, daha yüksek sürüm koduna sahip bir veya daha fazla APK tarafından tamamen sınırlandırıldığı için hiçbir kullanıcıya sunulmayacak."**
    *   **Nedeni:** Google Play'e yüklediğiniz yeni AAB/APK dosyasının sürüm kodu (`versionCode`), zaten yüklü olan veya yayında olan diğer sürümün koduna eşit ya da ondan daha düşüktür.
    *   **Çözümü:** `android/app/build.gradle` dosyasındaki `versionCode` değerini (örneğin `6` ise `7` yapın) bir artırarak yeni bir sürüm derleyin ve yükleyin. Ayrıca, eski/sınırlandırılmış sürümleri sürüm hazırlama ekranından kaldırın.
*   **Hata: "Bu kanal için hiçbir ülke veya bölge seçilmedi. Bu sürümü kullanıma sunmak için en az 1 ülke veya bölge ekleyin."**
    *   **Nedeni:** Oluşturduğunuz test veya üretim kanalında uygulamanın hangi ülkelerde indirilebileceğini belirtmemişsinizdir.
    *   **Çözümü:** Play Console'da ilgili kanala (örn. Kapalı Test veya Üretim) gidin. **"Ülkeler/Bölgeler" (Countries/Regions)** sekmesini seçin, **"Ülke/Bölge Ekle"** butonuna tıklayarak uygulamanızı yayınlamak istediğiniz ülkeleri (örn. Türkiye) seçip kaydedin.
*   **Hata: "Uygulamanız henüz yayınlanamaz. Kontrol Paneli'nde listelenen adımları tamamlayın."**
    *   **Nedeni:** Play Console Kontrol Paneli'ndeki (Dashboard) zorunlu beyanlar ve adımlar henüz tamamlanmamıştır.
    *   **Çözümü:** Kontrol Paneli'ne dönün ve listelenen tüm eksik adımları (Gizlilik Politikası, Uygulama Erişimi, Reklamlar vb.) tamamlayın.
*   **Hata: "Uygulamanızın finans ile ilgili özellikler içerip içermediğini bize bildirmeniz gerekir."**
    *   **Nedeni:** Finansal özellikler beyan formu doldurulmamıştır.
    *   **Çözümü:** Kontrol Paneli'nde yer alan **"Finansal Özellikler" (Financial Features)** formunu doldurun. Uygulamada doğrudan finansal işlemler olmadığını (sadece uygulama içi satın alma / abonelik olduğunu) beyan edin.
*   **Hata: "Sağlık beyan formunu doldurmanız gerekir."**
    *   **Nedeni:** Google Play'in sağlık uygulamaları için zorunlu kıldığı beyan formu boş bırakılmıştır.
    *   **Çözümü:** Kontrol Paneli'nden veya "Uygulama İçeriği" (App Content) menüsünden **"Sağlık uygulaması beyanı" (Health App Declaration)** formunu açın. Uygulamanın bir sağlık uygulaması olmadığını ve sağlıkla ilişkili hiçbir özellik sunmadığını beyan edin.

---


### B. APPLE APP STORE YAYINLAMA SÜRECİ

#### 1. Kod Yapılandırması ve İzin Tanımları
* **Info.plist:** `ios/App/App/Info.plist` dosyasına AdMob ID'nizi ekleyin:
  ```xml
  <key>GADApplicationIdentifier</key>
  <string>ca-app-pub-XXXXXXXXXX~YYYYYYYYYY</string> <!-- Canlı AdMob App ID -->
  ```
* **Kamera ve Fotoğraf Kütüphanesi İzinleri:** Logo yükleme ve QR kod tarama işlevleri için izin metinlerinin `Info.plist` içinde tanımlı olduğundan emin olun:
  * `NSCameraUsageDescription` (Kamera ile QR kod tarama izni için)
  * `NSPhotoLibraryUsageDescription` (Fotoğraflardan Logo/İmza seçmek için)
* **App Tracking Transparency (ATT):** Reklam kişiselleştirme için kullanıcıdan izin istemek adına `NSUserTrackingUsageDescription` izin metnini ekleyin.

#### 2. Apple Developer Portal Sertifika Kurulumları
* [Apple Developer Portal](https://developer.apple.com) üzerinde oturum açın.
* **Certificates, Identifiers & Profiles** kısmından:
  * **Identifiers:** `com.alieren.kolayform` adında bir App ID tanımlayın. Uygulama içi satın alımlar (In-App Purchases) özelliğini aktif edin.
  * **Certificates:** Bir adet **Apple Distribution Certificate** (Dağıtım Sertifikası) oluşturun ve bilgisayarınıza indirin.
  * **Profiles:** App Store dağıtımı için bir **App Store Provisioning Profile** oluşturup sertifikanız ve App ID'niz ile ilişkilendirin.

#### 3. iOS Sürüm Derleme (Codemagic veya Xcode)
* Projenizde yer alan `codemagic.yaml` dosyasını kullanarak ya da yerel olarak bir Mac bilgisayarda **Xcode** açarak derleme yapabilirsiniz:
  * Xcode ile `ios/App` klasörünü açın.
  * **Signing & Capabilities** sekmesinden oluşturduğunuz sertifika ve profili seçin.
  * Target cihaz olarak **Any iOS Device (arm64)** seçip üst menüden **Product > Archive** deyin.
  * İşlem bittikten sonra **Distribute App** diyerek sürümü doğrudan App Store Connect'e gönderin (veya Codemagic webhook tetikleyerek otomatik gönderilmesini sağlayın).

#### 4. App Store Connect Kurulumu
* [App Store Connect](https://appstoreconnect.apple.com) paneline girin ve **Yeni Uygulama** oluşturun.
* **Mağaza Bilgileri:**
  * **Uygulama Adı:** Kolay Form
  * **Alt Başlık:** Mobil Servis & Teklif Formu Oluşturucu
  * **Açıklama & Anahtar Kelimeler:** Uygulamanın ne işe yaradığını detaylandıran metinler.
  * **Gizlilik Politikası URL'i:** `https://kolayform.com.tr/privacy-policy` linkini girin.
* **TestFlight (Test Aşaması):**
  * Sürüm yüklendikten sonra TestFlight sekmesinde görünür. Buradan kendinizi veya dahili testçilerinizi ekleyerek uygulamayı App Store onayından önce test edebilirsiniz.
* **Uygulama İçi Satın Alma (In-App Purchase):**
  * App Store Connect'te sol menüden **In-App Purchases** sekmesine gidin.
  * TR ve EN dilleri için abonelik türlerini (Aylık, Yıllık Pro) oluşturun. `js/app.js` içerisindeki satın alma tetikleyicilerinde bu Apple Store ID'lerini kullanın.
* **İncelemeye Gönderme:**
  * TestFlight sürümünü seçin, ekran görüntülerini yükleyin (6.7" ve 6.5" iPhone, 12.9" iPad ekran boyutları zorunludur).
  * **İncelemeye Gönder** butonuna basarak Apple Store onay sürecini (ortalama 24-48 saat sürer) başlatın.

---

## ✨ Tamamlanan Özellikler ve İş Kuralları (Implemented Features & Business Rules)

* **Günlük İndirme Sınırı (Free):** Ücretsiz kullanıcılar günde maksimum **3 adet PDF** indirebilir (reklam izleyerek). 4. indirmede işlem engellenerek Premium satın alma modalı otomatik gösterilir. Ayrıca kullanıcıya yeni indirme haklarının tanımlanacağı zamanı gösteren **24 saatlik gerçek zamanlı bir geri sayım sayacı** gösterilir.
* **Toplu PDF İndirme (Pro-Only):** Filtrelenmiş geçmiş formların tek bir PDF dosyasında birleştirilip indirilmesi (Toplu İndir) özelliği tamamen Premium üyelere özel hale getirilmiştir.
* **PDF QR Doğrulama Kodu Kontrolü:** PDF çıktılarında QR kod eklenmesi/kaldırılması ayarı Pro kullanıcılara özeldir (Ayarlar menüsünden yönetilir). Ücretsiz üyelerde bu kod eklenmez ve ayar kilitlenir.
* **Otomatik Kaydetme (Auto-Save):** Editörde kaydetmeden doğrudan PDF İndir denildiğinde veri kaybını önlemek amacıyla form arka planda otomatik olarak kaydedilir.
* **Kurumsal Paket Lisanslama Kurgusu:** 9999 TL'lik Kurumsal paket için sunucu bağımlılığını sıfırlamak ve veri gizliliğini korumak amacıyla Google Play Console ve App Store Connect'in **yerleşik Promo/Tanıtım Kodları** altyapısının kullanılması kararlaştırıldı ve satın alma kartına bu bilgi eklendi.
* **Arayüz Düzeltmeleri:** Premium butonunun taşma sorunu çözülerek Premium aktifken buton metni `👑 Pro` olacak şekilde optimize edildi. Geçmiş Formlar başlığının yanındaki "Toplu İndir" (yeşil) ve "Filtrele" (mavi) butonları aynı capsule estetiğine kavuşturuldu.
* **İskonto Entegrasyonu:** Fiyat Teklif Formuna "İskonto %" sütunu eklendi. Hesaplamalarda önce birim fiyata iskonto uygulanıp, ardından indirimli tutar üzerinden KDV hesaplanması sağlandı.
* **Çoklu Dil Desteği (TR/EN):** Arayüzün tamamı ve dinamik form içerikleri (yazdırılabilir A4 şablonları dahil) Türkçe ve İngilizce dil seçeneğine göre anında yerelleşecek şekilde güncellendi.
* **Pro Üyelik Durum Ekranı:** Pro kullanıcıların taç ikonlu Pro butonuna tıkladıklarında plan detaylarını (başlangıç tarihi, abonelik türü) görebilecekleri özel, animasyonlu bir teşekkür/bilgilendirme ekranı eklendi.

