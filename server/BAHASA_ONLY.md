# 100% Bahasa Malaysia Output 🇲🇾

## Overview

**Semua output AI mesti 100% Bahasa Malaysia/Sabahan. Tiada English!**

Target audience: Orang Malaysia, khususnya Sabahan.

---

## What Changed

### ✅ Before (Had English):
```
"☕ Premium artisan coffee | Serving happiness daily | 📍 KL | Mon-Sun 8AM-10PM"
```

### ✅ After (100% Bahasa Malaysia):
```
"☕ Kopi premium berkualiti | Hidangkan kebahagiaan setiap hari | 📍 KL | Isnin-Ahad 8PTG-10MLM"
```

---

## Updated Prompts

All AI endpoints now enforce Bahasa Malaysia:

### 1. **System Instruction**
```
BAHASA: WAJIB 100% Bahasa Malaysia/Sabahan. JANGAN guna English langsung!
```

### 2. **Generate Bio**
```
- Guna 100% BAHASA MALAYSIA (takde English langsung!)
```

### 3. **Analyze Image**
```
WAJIB: 100% Bahasa Malaysia saja, jangan guna English!
```

### 4. **Chat Coach**
```
Guna Bahasa Malaysia penuh bah!
```

### 5. **General Chat**
```
Guna full Bahasa Malaysia/Sabahan, jangan campur English.
```

---

## Exception: Hashtags

**Hashtags are the ONLY exception** where English is acceptable:

### Why?
- Common practice in social media
- English hashtags often have more reach
- Example: `#CoffeeLovers`, `#FoodPorn`, `#SmallBusiness`

### Best Practice:
Mix Malay and English hashtags:
```
[
  "#KopiSabah",      // Malay/Sabahan
  "#MalaysiaFood",   // English
  "#BisnisLokal",    // Malay
  "#SabahBusiness",  // English
  "#MakananSedap"    // Malay
]
```

---

## Examples by Endpoint

### 📱 Chat with Coach
```json
Input: {"message": "Macam mana mau dapat follower?"}

Output: 
"Bosku, kena rajin posting bah! Pakai hashtag yang ngam, 
posting waktu ramai orang aktif. Konfem naik sikit-sikit."
```
✅ Full Bahasa Malaysia/Sabahan

---

### 💼 Generate Bio
```json
Input: {"niche": "Cafe", "description": "Kopi premium di Sabah"}

Output:
[
  "☕ Kopi premium berkualiti tinggi di Sabah | Jom cuba! | Setiap hari 8PTG-10MLM",
  "🌟 Hidangan kopi terbaik untuk anda | Tempat tersembunyi Sabah | DM untuk order",
  "Kopi terbaik untuk hari terbaik ☕ | Biji kopi pilihan | 📍 Kota Kinabalu"
]
```
✅ 100% Bahasa Malaysia, professional

---

### 📸 Image Caption
```json
Input: {imageBase64: "..."}

Output:
{
  "caption": "Pagi ni best dengan kopi panas! ☕ Jom lepak, ramai dah orang. 10 pelanggan pertama dapat diskaun 20%! 🎉",
  "explanation": "Caption ni menarik sebab ada tawaran istimewa dan panggilan untuk bertindak (call-to-action)."
}
```
✅ Friendly, readable, 100% Bahasa Malaysia

---

### 🎓 Customer Service Coaching
```json
Input: {
  "scenario": "Barang saya rosak! Nak refund!",
  "userReply": "Maaf, boleh tukar barang baru?"
}

Output:
{
  "grade": "B+",
  "feedback": "Okay suda tu bosku! Tapi lain kali cuba tambah 'atas kesulitan ini' untuk nampak lebih prihatin. Customers suka bila kita tunjuk empati bah!"
}
```
✅ Full Sabahan dialect for coaching

---

### #️⃣ Hashtags
```json
Input: {"keyword": "Kopi"}

Output:
[
  "#KopiSabah",
  "#CoffeeLover",
  "#MalaysiaFood",
  "#KotaKinabalu",
  "#SabahCafe",
  "#KopiPagi",
  "#MalaysiaCoffee",
  "#SupportLocal",
  "#BisnisLokal",
  "#SabahBusiness"
]
```
✅ Mix Malay & English (acceptable for hashtags)

---

## Word Replacements

Common English words to replace:

| ❌ English | ✅ Bahasa Malaysia |
|-----------|-------------------|
| Coffee | Kopi |
| Food | Makanan |
| Business | Bisnes/Perniagaan |
| Customer | Pelanggan |
| Order | Tempahan |
| Discount | Diskaun/Potongan |
| Premium | Premium/Berkualiti |
| Monday-Sunday | Isnin-Ahad |
| AM/PM | PTG/MLM |
| Try | Cuba |
| Daily | Setiap hari |
| Best | Terbaik |
| Happy | Gembira |
| Record | Rakam |
| Phone | Telefon |

---

## Why This Matters

### 1. **Target Audience**
- App dibuat untuk Sabahan
- Orang Malaysia lebih selesa dengan Bahasa Malaysia
- Rasa lebih dekat dan relatable

### 2. **Local Pride**
- Bangga guna bahasa sendiri
- Beza dari platform lain yang full English
- Support local language & culture

### 3. **Better Understanding**
- Tak semua orang pandai English
- Especially orang kampung & luar bandar
- Bahasa Malaysia lebih mudah faham

### 4. **Unique Selling Point**
- First AI coach yang full Bahasa Malaysia
- With authentic Sabahan dialect
- Tiada pesaing yang buat macam ni

---

## Testing

When testing, verify outputs are 100% Bahasa Malaysia:

### ✅ Good Examples:
- "Jom cuba kopi kami!"
- "10 pelanggan pertama dapat diskaun"
- "Rakam video pendek untuk posting"
- "Pakai hashtag yang sesuai"

### ❌ Bad Examples:
- "Try our coffee!" (English)
- "First 10 customers" (English)
- "Record a short video" (English)
- "Use relevant hashtags" (English)

---

## Summary

🎯 **Main Rule:** 100% Bahasa Malaysia/Sabahan in all outputs

🎯 **Exception:** Hashtags boleh English (common practice)

🎯 **Why:** Target Sabahan/Malaysian audience, more relatable

🎯 **Benefit:** Unique, authentic, better understanding

---

**Restart server to apply changes!**
