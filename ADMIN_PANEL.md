# Admin Panel Kullanım Kılavuzu

## 🔐 Giriş Bilgileri

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin`

## 📍 Admin Panel Erişimi

Admin paneline erişmek için:
```
http://localhost:5173/admin/login
```

## 🎯 Özellikler

### 1. **Dashboard** (`/admin/dashboard`)
- Toplam haber sayısı
- Kategori sayısı
- Tag sayısı
- Toplam görüntülenme sayısı
- Hızlı erişim butonları

### 2. **Categories Management** (`/admin/categories`)
- ✅ Kategori listesi görüntüleme
- ✅ Yeni kategori ekleme
- ✅ Kategori düzenleme
- ✅ Kategori silme

**Kategori Alanları:**
- Name (İsim)
- Slug (URL dostu isim)
- Description (Açıklama - opsiyonel)

### 3. **Tags Management** (`/admin/tags`)
- ✅ Tag listesi görüntüleme
- ✅ Yeni tag ekleme
- ✅ Tag düzenleme
- ✅ Tag silme

**Tag Alanları:**
- Name (İsim)
- Slug (URL dostu isim)

### 4. **News Management** (`/admin/news`)
- ✅ Haber listesi görüntüleme
- ✅ Yeni haber ekleme
- ✅ Haber düzenleme
- ✅ Haber silme

**Haber Alanları:**
- Title (Başlık)
- Summary (Özet)
- Content (İçerik)
- Author (Yazar)
- Category (Kategori)
- Image URL (Resim URL'i)
- Tags (Etiketler - çoklu seçim)
- Featured (Öne çıkan - evet/hayır)

## 🔌 Backend API Endpoints

Admin paneli aşağıdaki backend endpoint'leri kullanır:

### Authentication
```
POST /api/admin/login
Body: { username, password }
Response: { success, token, message }
```

### Categories
```
GET    /api/admin/categories
POST   /api/admin/categories
PUT    /api/admin/categories/:id
DELETE /api/admin/categories/:id
```

### Tags
```
GET    /api/admin/tags
POST   /api/admin/tags
PUT    /api/admin/tags/:id
DELETE /api/admin/tags/:id
```

### News
```
GET    /api/admin/news
POST   /api/admin/news
PUT    /api/admin/news/:id
DELETE /api/admin/news/:id
```

## 🔒 Güvenlik

- Tüm admin route'ları authentication gerektir
- Token localStorage'da saklanır
- Token olmadan admin sayfalarına erişim engellenir
- Logout yapıldığında token temizlenir

## 🎨 Kullanıcı Arayüzü

- Modern ve responsive tasarım
- Sidebar navigasyon
- Kolay kullanılabilir formlar
- Tablo görünümü ile liste yönetimi
- Onay dialogları (silme işlemleri için)
- Loading göstergeleri
- Başarı/Hata mesajları

## 📝 Notlar

1. **Backend Bağlantısı**: Tüm servisler `baseUrl.ts` dosyasındaki endpoint'leri kullanır
2. **Token Yönetimi**: `adminService.ts` içinde otomatik token yönetimi yapılır
3. **Form Validasyonu**: Tüm formlarda gerekli alan kontrolleri vardır
4. **Responsive**: Mobil ve tablet cihazlarda da kullanılabilir

## 🚀 Geliştirme

Admin paneli tamamen backend ile entegre çalışacak şekilde tasarlanmıştır. 
Backend API'larınız hazır olduğunda direkt çalışacaktır.

**Servis Dosyaları:**
- `src/services/adminService.ts` - Tüm admin API çağrıları
- `src/config/baseUrl.ts` - API endpoint tanımlamaları
- `src/types/index.ts` - TypeScript type tanımlamaları
