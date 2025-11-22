# Dialect Usage Strategy 🎯

## Overview

**PENTING: Semua output MESTI 100% Bahasa Malaysia/Sabahan. Tiada English!**

Different endpoints use different levels of Sabahan dialect based on the **context** and **audience** of the output.

---

## The Strategy

### 🎓 **Full Sabahan Dialect** (Coaching/Learning)
**When to use:** Internal communication between user and Coach Digital Sabah

**Endpoints:**
- ✅ `/api/ai/chat` - General conversation with coach
- ✅ `/api/ai/chat-coach` - Customer service feedback

**Why:** 
- This is for learning and coaching
- User is talking to Coach Digital Sabah directly
- Casual, friendly tone builds trust
- Makes learning feel less intimidating

**Example:**
```
Input: "Macam mana mau dapat follower?"
Output: "Bosku, kena rajin post bah! Pakai hashtag yang ngam, posting waktu ramai orang aktif. Konfem naik sikit-sikit."
```

---

### 💼 **Professional Tone** (Public Business Content)
**When to use:** Content that will be published on user's business profile

**Endpoints:**
- ✅ `/api/ai/generate-bio` - Instagram/Facebook bios

**Why:**
- This goes on the user's PUBLIC business page
- Needs to attract customers (not just friends)
- Professional = credibility
- Light local flavor OK, but not heavy dialect

**Example:**
```
Input: {niche: "Cafe", description: "Kopi artisan di KL"}
Output: 
[
  "☕ Kopi premium berkualiti tinggi di KL | Jom cuba! | Isnin-Ahad 8PTG-10MLM",
  "🌟 Hidangan kopi terbaik untuk anda | Tempat tersembunyi KL | DM untuk order",
  "Kopi terbaik untuk hari terbaik ☕ | Biji kopi pilihan | 📍 Kuala Lumpur"
]
```

Notice: Professional but still friendly, minimal dialect

---

### 😊 **Friendly & Readable** (Social Media Posts)
**When to use:** Content for posts (not profile), can be more casual

**Endpoints:**
- ✅ `/api/ai/analyze-image` - Caption generation
- ✅ `/api/ai/generate-hashtags` - Hashtags

**Why:**
- Posts can be more casual than bios
- Still needs to be readable by ALL Malaysians
- Light local touch adds personality
- But must be understandable

**Example Caption:**
```
"Pagi ni best dengan kopi panas! ☕ Jom lepak, ramai dah orang. 10 pelanggan pertama dapat diskaun 20%! 🎉"
```

Notice: Casual but clear, anyone can understand

---

## Comparison Table

| Endpoint | Dialect Level | Tone | Output Audience |
|----------|--------------|------|-----------------|
| `/chat` | 🔥🔥🔥 Full | Very casual | User only |
| `/chat-coach` | 🔥🔥🔥 Full | Coaching | User only |
| `/analyze-image` | 🔥 Light | Friendly | Public (social media) |
| `/generate-hashtags` | 🔥 Light | Professional | Public (social media) |
| `/generate-bio` | ☕ Minimal | Professional | Public (profile) |

---

## Example Outputs

### ❌ Wrong: Heavy dialect in bio
```
"Sia punya kopi paling manang bah! Datang pigi kedai sia, nda rugi. Mau order? DM jak."
```
**Problem:** Too casual, unprofessional, might be hard for non-Sabahans

---

### ✅ Right: Professional bio with local touch
```
"☕ Kopi premium berkualiti | Hidangkan kebahagiaan setiap hari | 📍 KL | Jom cuba!"
```
**Good:** Professional, clear, 100% Bahasa Malaysia

---

### ✅ Right: Full dialect for coaching
```
User: "Susah la buat video"
Coach: "Bosku, jangan risau bah! Mula sikit-sikit jak. Rakam pakai telefon pun okay suda. Janji buat, nanti pandai tu."
```
**Good:** Encouraging, relatable, builds connection, 100% Bahasa Malaysia

---

## Best Practices

### For Bios:
- ✅ Use standard Malay/English
- ✅ Include emojis for personality
- ✅ Max 1-2 casual words ("Jom", "datang lah")
- ❌ No heavy dialect
- ❌ No "sia", "bosku", "bah" in output

### For Captions:
- ✅ Friendly and engaging
- ✅ Can use some casual words
- ✅ Must be readable
- ✅ 100% Bahasa Malaysia
- ❌ Don't overdo the dialect

### For Coaching/Chat:
- ✅ Full Sabahan dialect
- ✅ "Sia", "bosku", "bah", "ka", "nda", "mau"
- ✅ Very casual and supportive
- ✅ Like talking to a friend
- ✅ 100% Bahasa Malaysia/Sabahan

### For Hashtags:
- ✅ Hashtags boleh ada English (common practice)
- ✅ Tapi kalau ada yang Malay/Sabahan lagi bagus
- ✅ Example: #KopiSabah #MalaysiaFood #SabahBusiness

---

## Why This Matters

### 1. **Professionalism**
- Business bios need to attract customers
- Professional tone = more credibility
- Heavy dialect might confuse non-Sabahans

### 2. **Accessibility**
- Content should be understood by ALL Malaysians
- Not just Sabahans
- Light local flavor adds personality without barriers

### 3. **Context-Appropriate**
- Coach talks casually to user (private)
- But user's business content is public (professional)
- Different contexts need different tones

### 4. **User Experience**
- Users get friendly coaching from Coach
- But their business looks professional to customers
- Best of both worlds!

---

## Testing

When testing endpoints, check the output matches the expected tone:

**Test `/api/ai/chat`:**
```json
{"message": "Macam mana mau buat bio yang bagus?"}
```
**Expected:** Full Sabahan dialect in response

**Test `/api/ai/generate-bio`:**
```json
{"niche": "Cafe", "description": "Artisan coffee"}
```
**Expected:** Professional bios with minimal/no dialect

---

## Summary

| User Needs | Endpoint | Coach Speaks | Output Content |
|------------|----------|--------------|----------------|
| "Teach me!" | `/chat`, `/chat-coach` | Full Sabahan 🗣️ | Coaching in dialect |
| "Make my bio" | `/generate-bio` | - | Professional bio 💼 |
| "Caption this" | `/analyze-image` | - | Friendly caption 😊 |

**Remember:** Coach speaks Sabahan to YOU, but creates professional content for YOUR CUSTOMERS.
