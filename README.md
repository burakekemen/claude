# Denge Marin – Web Sitesi

[dengemarin.com](https://www.dengemarin.com) için tek sayfalık, kaydırmalı kurumsal web sitesi.
Saf HTML, CSS ve JavaScript ile yazıldı; derleme adımı veya bağımlılık yoktur.

## Özellikler

- **Tek sayfa:** Menüdeki bağlantılar ilgili bölüme yumuşak kaydırır, bulunulan bölüm menüde vurgulanır.
- **Kaydırdıkça belirme:** Bölümler ve kartlar ekrana girdikçe yumuşakça belirir (hareket azaltma tercihine saygı gösterir).
- **Mobil uyumlu:** Telefonda tam ekran açılan menü, tek sütunlu düzen.
- **WhatsApp entegrasyonu:** Tüm "Teklif Al / Paketi Seç" butonları ve iletişim formu, mesajı hazır şekilde WhatsApp'ta açar. Sağ altta sabit WhatsApp butonu bulunur.
- **SEO:** Başlık/açıklama etiketleri, Open Graph etiketleri ve Google için `LocalBusiness` yapısal verisi.

## Bölümler

1. Anasayfa (hero + öne çıkanlar)
2. Güven şeridi ve Hakkımızda
3. Hizmetlerimiz (7 hizmet)
4. Yetkili servisi olunan markalar
5. Kontrol paketleri, kontrol edilen sistemler ve koşullar
6. İletişim (adres, harita, form)

## Klasör yapısı

```
index.html          Sayfanın tamamı
css/style.css       Tüm stiller (renkler en üstte :root içinde)
js/main.js          Menü, kaydırma efektleri, form
assets/favicon.svg  Tarayıcı sekmesi ikonu
assets/img/         Fotoğraflar ve logolar (bkz. assets/img/README.md)
```

## Yerelde çalıştırma

`index.html` dosyasını tarayıcıda açmanız yeterli. Görsellerin de yüklenmesi için basit bir sunucu önerilir:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Görselleri ekleme

Site görseller olmadan da tam çalışır. Kendi fotoğraflarınızı ve logolarınızı
`assets/img/` altına belirtilen adlarla koyduğunuzda otomatik olarak kullanılır.
Liste için: [`assets/img/README.md`](assets/img/README.md)

## İçerik güncelleme

- **Metinler, fiyatlar:** `index.html` içinde ilgili bölümü bulup düzenleyin (bölümler `<!-- HİZMETLER -->` gibi yorumlarla ayrılmıştır).
- **Telefon numarası:** `index.html` içindeki `905332271207` ve `0533 227 12 07` geçen yerler ile `js/main.js` içindeki `WHATSAPP_NUMBER`.
- **Renkler:** `css/style.css` başındaki `--navy` ve `--teal` değişkenleri.

## Yayınlama

Statik bir site olduğu için ücretsiz servislerde barındırılabilir:

- **Netlify / Cloudflare Pages:** Bu repoyu bağlayın, derleme komutu boş, yayın klasörü `/`.
- **GitHub Pages:** Repo ayarları → Pages → `main` dalı, kök klasör.

Ardından alan adı sağlayıcınızın DNS ayarlarında `dengemarin.com`'u seçtiğiniz servise yönlendirin
ve Canva'daki eski sitenin alan adı bağlantısını kaldırın.
