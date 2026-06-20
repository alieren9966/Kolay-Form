# Kolay Form - Genel Mimari, Akış ve APK Paketleme Kılavuzu

Bu dosya, **Kolay Form** uygulamasının mimari yapısını, veri şemalarını, işleyiş mantığını ve ileride bu proje üzerinde çalışacak diğer geliştiriciler (veya yapay zeka ajanları) için gerekli tüm teknik detayları içermektedir.

---

## 1. Uygulama Genel Bakış ve Hedef
**Kolay Form**, teknik servis personeli ve KOBİ'lerin sahada veya ofiste hızlı bir şekilde **Teknik Servis Bilgi Formu** ve **Proforma Fiyat Teklifi** oluşturmalarını sağlayan, mobil öncelikli (mobile-first) ve tamamen cihaz üzerinde (offline-first) çalışan bir Web uygulamasıdır.

- **Bağımlılık Durumu:** Harici Node/npm paketlerine veya sunucu taraflı bir veritabanına ihtiyaç duymaz. Tamamen tarayıcı üzerinde HTML5, CSS3 ve Vanilla ES6 JavaScript ile çalışır.
- **Güvenlik Politikası:** Tüm kullanıcı şirket bilgileri, logolar, kaşeler ve oluşturulan formlar sadece ve sadece kullanıcının kendi cihazında (`localStorage` üzerinde) tutulur.

---

## 2. Klasör ve Dosya Yapısı

```
c:\Users\Ali Eren\Desktop\Kolay Form\
├── index.html                  # Uygulama iskeleti, ekran container'ları ve modallar (KAYNAK)
├── css/
│   └── style.css               # Arayüz tasarımları, koyu/aydınlık tema ve print stilleri
├── js/
│   ├── app.js                  # Uygulama mantığı, Canvas çizim, matematik motoru ve state yönetimi
│   └── libs/
│       ├── html2pdf.bundle.min.js   # Tarayıcı tarafında PDF üreten harici kütüphane (jsPDF + html2canvas)
│       ├── pako.min.js              # QR: veri sıkıştırma (deflate/inflate)
│       ├── qrcode-generator.min.js  # QR: kod üretimi (otomatik versiyon, EC seviyesi)
│       └── jsQR.min.js              # QR: kameradan/görüntüden QR okuma (çözme)
└── www/                        # Capacitor webDir — APK bu klasörden paketlenir (kökün kopyası)
```

> **ÖNEMLİ — Kök ↔ www senkronu:** Geliştirme **kök dizinde** yapılır (`index.html`, `css/`, `js/`). Ancak `capacitor.config.json` içinde `webDir: "www"` olduğu için APK derlemesi `www/`'den okur. Kökte değişiklik yaptıktan sonra `index.html`, `css/style.css`, `js/app.js` ve `js/libs/*` dosyaları **`www/`'ye kopyalanmalıdır**, yoksa APK eski kodu paketler. (Not: bölüm 5'teki `--web-dir=.` kılavuzu eskidir; geçerli ayar `www`'dir.)

---

## 3. Teknik Mimari ve Önemli Çözümler

### A. Veri Saklama Modeli (LocalStorage JSON)
Uygulama yerel hafızada iki anahtarda veri saklar:

1. **`kolayform_companies` (Şirket Profilleri):**
   ```json
   [
     {
       "id": "comp-171828...",
       "name": "ABC Ajans Ltd. Şti.",
       "phone": "0216 216 16 16",
       "email": "info@abc.com",
       "website": "www.abc.com",
       "taxOffice": "Beşiktaş V.D",
       "taxNumber": "1234567890",
       "mersisNo": "1234567890123456",
       "address": "Hisar Mah. 1202 Sk. No: 99 Beşiktaş/İstanbul",
       "logo": "data:image/jpeg;base64,...",
       "stamp": "data:image/jpeg;base64,...",
       "signature": "data:image/jpeg;base64,...",
       "stamps": ["data:image/jpeg;base64,...", "data:image/jpeg;base64,..."]
     }
   ]
   ```

2. **`kolayform_forms` (Geçmiş Form Verileri):**
   ```json
   [
     {
       "id": "TEK-2026-0001",
       "type": "teklif",
       "companyId": "comp-171828...",
       "companyName": "ABC Ajans Ltd. Şti.",
       "companyLogo": "data:image/jpeg;base64,...",
       "date": "2026-06-13",
       "clientName": "Acıbadem Atakent Hastanesi",
       "clientCity": "İstanbul",
       "grandTotal": "145200.00",
       "data": {
         "clientAddress": "Küçükçekmece",
         "conditionsText": "* KDV hariçtir.\n* Teslim süresi 15 gündür.",
         "subtotal": "121000.00",
         "taxTotal": "24200.00",
         "items": [
           { "desc": "Ürün A", "qty": 1, "unit": "AD", "price": 87500, "kdv": 20 }
         ]
       },
       "signatures": {
         "signature": "data:image/png;base64,..."
       }
     }
   ]
   ```

### B. Görsel Sıkıştırma ve Çözünürlük Kontrolü
Uygulama `localStorage` limitini aşmamak için resimleri yükleme anında sıkıştırır:
- Logolar, kaşeler ve tescil damgaları yüklenirken arka planda Canvas ile maksimum **400px** genişliğe sıkıştırılır.
- Görsel yüklenirken çözünürlük kontrol edilir. Eğer görsel **150x150 piksel** altındaysa yükleme kesilir ve kullanıcıya bilgilendirme uyarısı verilir.
- Dosya seçici pencerenin çift açılmasını önlemek için tıklama olaylarında `event.stopPropagation()` uygulanmıştır.

### C. PDF Çıktı ve Güvenli İndirme Motoru
Chrome ve mobil tarayıcılarda PDF dosyalarının rastgele UUID ismiyle inmesi veya `blob:` yönlendirme hatası vermesi durumunu çözmek için **Blob İndirme Köprüsü** kurulmuştur:
1. `html2pdf.js` ile A4 DOM elemanı offscreen olarak PDF Blob dosyasına çevrilir.
2. `URL.createObjectURL(pdfBlob)` ile geçici bir URL üretilir.
3. Arka planda bir `<a>` elemanı oluşturulup `download` niteliği atanır.
4. Dosya ismi dinamik olarak `[Şirket İsmi]_[Formun Adı]_[Müşteri Adı].pdf` formatında düzenlenir.
5. Programatik tıklama (`link.click()`) ile dosya indirilir ve bellek temizlenir (`URL.revokeObjectURL`).

**Baskı öncesi DOM hazırlığı (`downloadFormAsPDF` içinde, sonrasında geri yüklenir):**
- **Textarea → div dönüşümü (`swapTextareasForPrint`):** html2canvas `<textarea>` metnini dikey ortalayıp taşırdığı için, YAPILAN İŞLEM / SONUÇ / TEKLİF KOŞULLARI alanları PDF anında sol-üst hizalı, içeriğe oturan `.print-textarea-clone` div'leri ile değiştirilir (boşluk azalır, metin sığar).
- **Radio/checkbox koruması (`preserveCheckStates`):** html2canvas klonlama sırasında aynı `name`'li **radio düğmelerinin işaretini bozar**. Servis formundaki "Sözleşme Var/Yok" radyoları ve parça checkbox'larının durumu üretimden önce kaydedilip sonra geri yüklenir. (Bu olmadan: ilk PDF'ten sonra radio işareti kaybolur ve 2. PDF'te `getServiceFormData` null `.value` ile çöker — kaydetmeden art arda indirme bu yüzden bozulurdu.)
- **QR enjeksiyonu (`injectQrIntoPrintArea`):** Bkz. bölüm 3.J. QR sadece üretim anında köşeye basılır, sonra temizlenir.
- **Zoom transform sıfırlama:** A4 `.a4-page` üzerindeki mobil ölçek `transform`'u `none` yapılır (yoksa içerik küçük görünüp sayfanın sol üstüne sıkışır).

### D. Tema Motoru (Light / Dark Theme)
Uygulamanın varsayılan görünümü karanlık moddur. Header alanındaki Toggle butonu `body` etiketine `.light-theme` sınıfını ekler veya kaldırır.
- CSS değişkenleri (CSS Variables) sayesinde tüm kart, arka plan, metin renkleri dinamik değişir.
- Form şablonunun kendisi (`.a4-page`), aydınlık ve karanlık moddan bağımsız olarak her zaman beyaz kağıt arka planını (`background: #ffffff`) korur.

### E. Özel Çıkış Onay Modalı
Tarayıcıların engelleyebileceği yerleşik `confirm()` pencereleri yerine, uygulama içinde şık ve güvenilir çalışan bir **Özel Çıkış Onay Modalı** (Custom Exit Modal) kurgulanmıştır.

### F. Çift Parmak Zoom (Pinch to Zoom) Matematik Motoru
Mobil cihazlarda A4 kağıt formunun rahat düzenlenebilmesi için geliştirilmiş çift parmak yakınlaştırma algoritması kullanılır:
1. İki parmakla dokunulduğu anda dokunma merkezinin client koordinatları (`centerX`, `centerY`) hesaplanır.
2. Bu merkezin kaydırılabilir ana sarmalayıcıya (`.a4-container-wrapper`) göre göreli konumu (`viewportX`, `viewportY`) belirlenir.
3. Ölçek değişimi (`newScale` / `oldScale`) hesaplandıktan sonra sarmalayıcının scroll pozisyonu (`scrollLeft`, `scrollTop`) matematiksel olarak yeniden ayarlanarak zoom yapılan noktanın parmakların tam ortasında sabit kalması (pivot kilitlemesi) sağlanır.

### G. Toplu PDF Motoru (Tek Çok-Sayfalı Belge)
Geçmiş formlar ekranında yapılan filtrelemelere (form tipi, şirket, müşteri adı, form no veya servis cihaz bilgileri) göre filtrelenmiş **tüm formları TEK bir PDF dosyasında, her form ayrı sayfa** olacak şekilde indirir (kaç form varsa o kadar sayfa). `triggerBulkDownload` (`async/await`):
1. Filtre `getFilteredForms()` ile alınır; ilerleme `#modal-bulk-loading` ekranında gösterilir.
2. `suppressA4Fit = true` yapılır — toplu render sırasında `fitA4ToScreen` zoom ölçeklemesini atlar (yoksa içerik küçük basılır; "sayfanın sol üstünde minik form" hatasının kökü budur).
3. Her form için: şirket aktif edilir, ilgili editöre yüklenir, `withPrintAreaPrepared()` ile A4 alanı hazırlanır (transform sıfır, textarea→div, radio koruma, QR enjekte).
4. **İlk form:** `html2pdf().from(el).toPdf().get('pdf')` ile gerçek bir `jsPDF` örneği alınır (1. sayfa). Görselin sayfaya oturtulurken oluşan minik taşmadan kaynaklı fazladan boş sayfalar `deletePage` ile silinir.
5. **Sonraki formlar:** `html2pdf().from(el).toCanvas().get('canvas')` ile canvas alınır; `addCanvasToPdf` ile `pdf.addPage()` + sayfaya tam oturan `addImage` (taşarsa yüksekliğe göre ölçeklenir).
6. Tek `pdf.output('blob')` masaüstünde indirilir / Capacitor'da cache'e yazılıp Paylaş ile sunulur.

> **Önemli teknik not:** `jsPDF` doğrudan `new` ile kurulmaz — html2pdf bundle minified olduğu için `pdf.constructor` güvenilir değildir (`Object` döner). Bu yüzden `jsPDF` örneği yalnızca ilk formun `toPdf` çıktısından alınır.

### H. İmza "Boş Bırak" ve Dinamik Kaşe/İmza Yönetimi
Firma yetkilisi imzası gerektiren onay kutularında kullanıcıya "Boş Bırak" seçeneği sunulur. Eğer kullanıcının kaşesinde zaten ıslak imzası yer alıyorsa bu özellik kullanılır:
- **Teknik Servis Formu:** Firma yetkilisi imzası "Boş Bırak" seçildiğinde, imza alanına şirketin kaşesi yerleştirilir ve formun en sol altındaki kaşe alanı (`#srv-print-stamp`) mükerrerliği önlemek amacıyla otomatik olarak gizlenir (`display: none`).
- **Fiyat Teklif Formu:** İmza alanı temizlenerek şirket kaşesi imza kutusunun tam ortasına hizalanır (`.stamp-centered` sınıfı ile).

### I. Offline Geri Bildirim ve Hakkında Modalı
Gizlilik ve offline-first mimarisine uygun olarak, geri bildirim ekranındaki veriler sunucu yerine yerel veritabanında saklanır:
- Kullanıcının yazdığı geri bildirimler `localStorage` üzerindeki `kolayform_feedbacks` JSON dizisine kaydedilir.
- "Hakkında ve Krediler" sekmesinde uygulamanın geliştiricisi (Alieren3D), vizyon & katkılar (Haydar Şeker), versiyon bilgisi ve veri güvenliği notları yer alır.

### J. QR Doğrulama Eklentisi (Belge ↔ QR, internet gerektirmez)
Üretilen A4 belgelerine, başka bir Kolay Form kullanıcısının okutup belgeyi **dijital olarak yeniden üretebilmesi** için QR kodu eklenir. Belge internete yüklenmez; **veri QR'ın içinde taşınır.**

- **Yük (payload) formatı:** Formun **görselsiz** (logo/kaşe/imza HARİÇ) ve kısa anahtarlı "yağsız" hali → `JSON.stringify` → `pako.deflate` → `base64url`. Sonuç bir URL'in fragment'ına gömülür:
  `https://kolayform.app/v#KF1.<base64url-veri>` (domain şimdilik **placeholder**, bkz. Faz 2).
  - URL `#fragment` kısmı tarayıcı tarafından sunucuya gönderilmez → veri cihazda kalır.
  - Görseller bilinçli olarak dışarıda; tek bir QR'a sığmazlar (tek imza PNG'si bile QR kapasitesinden büyük). deflate sayesinde 20 kalemlik teklif bile ~650 bayta iner.
- **Üretim (`injectQrIntoPrintArea`):** `qrcode-generator` (otomatik versiyon, EC seviyesi M) ile GIF data-URL üretilir; sadece PDF anında köşeye basılır:
  - **Servis formu:** alt footer'ın **ortasında** (kaşe ile onay metni arasında).
  - **Teklif formu:** imza satırının **ortasında** (bandrol ile kaşe/imza kutusu arasında).
  - Boyut aşarsa kullanıcı uyarılır, belge QR'sız üretilir.
- **Okuma (tarama):** Dashboard'daki "📷 QR ile Belge Al" → `#modal-qr-scan`. Kamera (`getUserMedia` + `jsQR` kare döngüsü) veya **görüntü/fotoğraf yükleyerek** okur. `parseQrPayload`: prefix kırpılır → `base64url` çöz → `pako.inflate` → JSON.
- **Yeniden üretim (`openImportedForm`):** Çözülen form, gömülü **metin şirket bilgisiyle** (`importedCompany`) mevcut editöre yüklenir. Eşleşen şirket profili olmadığından logo/kaşe/imza yerine **"✓ Kolay Form QR ile dijital olarak aktarıldı"** doğrulama notu basılır. Şirket çözümü `resolveEditorCompany` / `resolveQrCompany` ile yapılır.
- **Faz 2 (uygulama Play Store'da yayınlanınca):** `QR_URL_PREFIX` gerçek domain ile değiştirilir; `AndroidManifest.xml`'deki (yorumlu) **App Link intent-filter** açılır; gerçek domaine `/.well-known/assetlinks.json` + basit iniş sayfası konur (uygulama yoksa Play Store'a yönlendirir). QR formatı değişmez; bugün basılan QR'lar geçerli kalır.

### K. Geçmiş/Şirket Silme ve QR ile Alınan Belgeler
- **Silme butonları:** Hem şirket kartlarında ("🗑️ Şirketi Sil") hem geçmiş form kartlarında ("🗑️") kırmızı silme butonu vardır; karta tıklamayı tetiklememek için `stopPropagation` + onay diyaloğu kullanır.
- **QR ile alınan belgeler veri modeli:** İçe alınan formlar `_imported: true` ve `importedCompany` (yalnızca metin, görselsiz) alanlarını taşır; `companyId` sabit `"__imported__"` değeridir. Bunlar **Kaydet** ile geçmişe eklenebilir; geçmiş listesinde şirket logosu yerine **"QR" rozeti** ile gösterilir ve karta tıklanınca `openImportedForm` ile açılır.

---

## 4. Yerel Ağ Üzerinde Çalıştırma ve Hata Ayıklama

### Telefon Bağlantı Sorunu Çözümü (Siteye Ulaşılamıyor Hatası):
Mobil telefonunuzun tarayıcısından bilgisayarınızda açık olan teste bağlanmaya çalıştığınızda **"Bağlanmayı reddetti / Ulaşılamıyor"** hatası alıyorsanız bunun 3 sebebi vardır:

1. **Yanlış IP / Sunucu Adresi:**
   Telefonunuzda router adresi olan `192.168.1.1` veya benzeri ağ geçitlerini değil, bilgisayarınızın yerel IP adresini girdiğinizden emin olun (CMD/PowerShell'de `ipconfig` yazıp `IPv4 Address` kısmından öğrenebilirsiniz, örn: `192.168.1.45`).
2. **Python IP Sınırlaması (Bind Hatası):**
   Standart `python -m http.server 8000` komutu bazı Windows bilgisayarlarda sunucuyu sadece `127.0.0.1` (localhost) arayüzüne bağlayarak dışarıdan erişimi engeller. Bunu aşmak için sunucuyu tüm ağ kartlarına açacak şekilde şu komutla başlatın:
   ```bash
   python -m http.server 8000 --bind 0.0.0.0
   ```
3. **Windows Güvenlik Duvarı Engeli:**
   Windows Güvenlik Duvarı gelen bağlantı isteklerini bloke ediyor olabilir. Portu açmak için PowerShell'i **Yönetici olarak** açıp şu komutu yapıştırın:
   ```powershell
   New-NetFirewallRule -DisplayName "Kolay Form Port 8000" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 8000
   ```

---

## 5. Uygulamayı Android APK Dosyasına Dönüştürme Kılavuzu

Uygulamayı bir Android telefona doğrudan yüklenebilir APK dosyasına çevirmek için en modern ve performanslı yöntem **Capacitor** (Ionic ekibi tarafından geliştirilen) kütüphanesini kullanmaktır. Cordova'ya kıyasla çok daha hızlıdır ve saf HTML/CSS/JS kodunuzu doğrudan bir Android projesine paketler.

### APK Oluşturma Adımları (Adım Adım):

#### 1. Ön Hazırlık
Bilgisayarınızda şunların kurulu olması gerekir:
1. **Node.js & npm** (https://nodejs.org/ adresinden kurabilirsiniz).
2. **Android Studio** (Android SDK ve Gradle paketlerini yüklemek için gereklidir).

#### 2. Projeyi npm Projesi Olarak Başlatma
Uygulamanın kurulu olduğu dizinde (`c:\Users\Ali Eren\Desktop\Kolay Form`) bir terminal açın ve sırasıyla şu komutları çalıştırın:
```bash
# Projede package.json oluştur
npm init -y

# Gerekli Capacitor kütüphanelerini kur
npm install @capacitor/core @capacitor/cli
```

#### 3. Capacitor'ı Yapılandırma
Capacitor'ı projeniz için başlatın:
```bash
npx cap init "Kolay Form" "com.kolayform.app" --web-dir=.
```
*(Bu komut, uygulamanın adını ve paket kimliğini belirler. `--web-dir=.` parametresi, HTML/CSS/JS dosyalarınızın kök dizinde olduğunu söyler).*

#### 4. Android Platformunu Ekleme
Projeye Android derleme altyapısını kurun:
```bash
# Android paketini yükle
npm install @capacitor/android

# Android platformunu projeye ekle
npx cap add android
```
Bu komuttan sonra proje dizininizde `android/` adında tam teşekküllü bir Android Studio projesi klasörü oluşacaktır.

#### 5. Kodları Senkronize Etme
HTML/CSS/JS dosyalarınızda değişiklik yaptığınızda, bu değişiklikleri Android klasörüne aktarmak için şu komutu kullanın:
```bash
npx cap sync
```

#### 6. APK Olarak Derleme (Build)
Uygulamayı APK'ya dönüştürmek için Android Studio'yu kullanacağız:
```bash
# Projeyi Android Studio ile aç
npx cap open android
```
1. Android Studio açıldığında projenin Gradle eşitlemesinin (sync) tamamlanmasını bekleyin (sağ altta bar ilerleyecektir).
2. Üst menüden sırasıyla: **Build > Build Bundle(s) / APK(s) > Build APK(s)** adımlarını takip edin.
3. Derleme tamamlandığında sağ altta bir bildirim kutusu çıkacaktır. Oradaki **"locate"** yazısına tıklayarak üretilen `app-debug.apk` dosyasını bulabilirsiniz.
4. Bu APK dosyasını telefonunuza kablo, e-posta veya WhatsApp ile gönderip doğrudan kurabilirsiniz!

---

## 6. Uygulamayı iOS (App Store) için Codemagic ile Derleme ve Yayınlama Kılavuzu

iOS işletim sistemi yapısı gereği Xcode derleme aracı sadece macOS (Mac bilgisayarlar) üzerinde çalışır. Ancak Windows üzerinde geliştirme yapıyorsanız, **GitHub** ve **Codemagic (bulut macOS derleme aracı)** kullanarak kodlarınyızı App Store'a gönderebilirsiniz.

### Adım Adım iOS Paketleme Süreci:

#### 1. Yerel Hazırlıklar (Zaten Yapıldı)
Projenizde iOS desteği ve GitHub entegrasyonu başarıyla tamamlanmıştır:
- `@capacitor/ios` kütüphanesi kuruldu ve `npx cap add ios` ile `ios/` klasörü oluşturuldu.
- Kodlar `git` deposu haline getirilip GitHub üzerindeki [Kolay-Form Reposu](https://github.com/alieren9966/Kolay-Form.git) adresine yüklendi.
- `package.json` içindeki sync komutu `npm run copy-assets && npx cap sync` olarak revize edildi, böylece her sync işleminde hem Android hem de iOS klasörleri güncellenir.

#### 2. Kod Değişikliği Yaptığınızda Yapılacaklar
Uygulama arayüzünde (HTML/CSS/JS) değişiklik yaptığınızda, bu değişiklikleri iOS ve Android platformlarına göndermek ve GitHub'a yüklemek için terminalde sırasıyla şu komutları çalıştırın:
```bash
# 1. Kodları platformlara kopyala ve eşitle
npm run sync

# 2. Değişiklikleri Git'e kaydet ve GitHub'a push et
git add .
git commit -m "Uygulama guncellendi"
git push
```

#### 3. Apple Developer Hesabı ve API Key (Sadece 1 kez)
Uygulamayı imzalamak ve App Store'a yüklemek için:
1. Bir **Apple Developer** ($99/yıl) üyeliği açın.
2. [App Store Connect API Portal](https://appstoreconnect.apple.com/access/api) adresine gidin.
3. **Anahtarlar (Keys)** sekmesinden yeni bir API Key (Admin veya App Manager yetkili) oluşturun.
4. Bilgisayarınıza inen `.p8` uzantılı API Key dosyasını güvenli bir yerde saklayın.
5. Sayfada yazan **Key ID** ve **Issuer ID** değerlerini not edin.

#### 4. Codemagic Bulut Kurulumu ve Derleme
1. [Codemagic](https://codemagic.io/) sitesine **GitHub hesabınızla** giriş yapın.
2. **Add application** diyerek `Kolay-Form` reponuzu bağlayın.
3. Proje tipi olarak **Capacitor application** seçin.
4. **iOS** derleme kutucuğunu işaretleyin.
5. **App signing (Uygulama İmzalama)** kısmında **Automatic code signing** seçip Apple Developer API Key bilgilerinizi (dosya, Key ID, Issuer ID) yükleyin.
6. **Publishing (Yayınlama)** kısmında **App Store Connect**'i aktif edin ve **Submit to TestFlight** seçeneğini seçin.
7. **Start new build** butonuna basarak macOS sunucularında derlemeyi başlatın. Derleme bittiğinde uygulama otomatik olarak TestFlight hesabınıza yüklenecektir.

---

## 7. Ücretsiz ve Premium (Pro) Üyelik Modeli İş Kuralları

Uygulamanın sürdürülebilirliği ve ticari yapısı için tanımlanan Free/Premium limitleri ve çalışma kuralları şu şekildedir:

### A. Günlük İndirme Limiti (Free)
- Ücretsiz kullanıcılar yerel cihazlarında günde en fazla **3 adet PDF** indirebilirler. Limit hesabı, günün ilk PDF indirme zamanı (`firstDownloadTime` timestamp) kaydedilerek başlatılır.
- 3 adet indirildikten sonraki istekler engellenir ve kullanıcı Premium satın alma ekranına yönlendirilir. Burada ilk indirme anından itibaren 24 saatin bitmesi için kalan süreyi gösteren **gerçek zamanlı bir geri sayım sayacı** gösterilir. 24 saat dolduğunda indirme hakkı sıfırlanır ve tekrar 3 hak tanımlanır. Veriler yerel hafızada (`kolayform_free_downloads`) saklanır.

### B. Toplu PDF İndirme (Pro-Only)
- Geçmiş formları filtreleyip tek bir PDF'te birleştirme (Toplu İndir) işlemi tamamen Premium üyelere özeldir. Ücretsiz üyeler bu butona tıkladığında Premium modalı açılır.

### C. PDF QR Doğrulama Kodu Kontrolü
- PDF belgelerinin altına doğrulama QR kodu eklenmesi özelliği yalnızca Premium kullanıcılar tarafından kapatılabilir/açılabilir.
- Ücretsiz kullanıcılar için bu ayar kapatılmıştır, QR kodlar PDF'lerine eklenmez ve Ayarlar menüsündeki checkbox kilitli durur.

### D. Otomatik Arka Plan Kaydı (Auto-Save)
- Kullanıcıların editörden kaydetmeden doğrudan PDF İndir butonuna tıklayıp sonrasında uygulamayı kapatarak veri kaybetmelerini önlemek için, PDF indirme tıklandığı anda form verileri arka planda otomatik olarak kaydedilir.

### E. Kurumsal 10'lu Lisans Kurgusu
- 9999 TL'lik Kurumsal Paket satın alımında, offline gizlilik modelini bozmamak amacıyla Google Play Console ve App Store Connect'in kendi **Promo/Tanıtım Kodları** altyapısı kullanılır. Alıcıya mağazalardan üretilen 10 adet tek kullanımlık indirme/lisans kodu e-posta veya fatura yoluyla teslim edilir.


