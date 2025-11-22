const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { SABAHAN_SYSTEM_INSTRUCTION } = require('../config/sabahan-prompt');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-pro';
const GEMINI_VISION_MODEL = process.env.GEMINI_VISION_MODEL || 'gemini-1.5-flash';

// @route   POST /api/ai/generate-bio
// @desc    Generate Instagram & Facebook bios using AI
// @access  Private
// NOTE: Uses PROFESSIONAL tone - output is for business profiles
router.post('/generate-bio', protect, async (req, res) => {
  try {
    const { niche, description } = req.body;

    if (!niche || !description) {
      return res.status(400).json({ message: 'Please provide niche and description' });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const prompt = `Buat 3 bio PROFESIONAL untuk Instagram/Facebook bisnes ${niche}: "${description}"

Syarat:
- Max 150 aksara setiap satu
- Guna 100% BAHASA MALAYSIA (takde English langsung!)
- Tone profesional tapi mesra
- Letak emoji yang sesuai
- Jangan guna dialek Sabahan yang pekat (ini untuk halaman bisnes umum)

Return JSON array saja:
["bio1", "bio2", "bio3"]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Try to parse the response as JSON
    let bios;
    try {
      // Remove markdown code blocks if present
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      bios = JSON.parse(text);
    } catch (parseError) {
      // If parsing fails, try to extract bios manually
      const bioMatches = text.match(/"([^"]+)"/g);
      if (bioMatches) {
        bios = bioMatches.map(bio => bio.replace(/"/g, ''));
      } else {
        // Fallback: split by newlines and filter
        bios = text.split('\n').filter(line => line.trim().length > 0).slice(0, 3);
      }
    }

    // Ensure we have exactly 3 bios
    if (!Array.isArray(bios) || bios.length < 3) {
      return res.status(500).json({ message: 'Failed to generate bios in correct format' });
    }

    // Save to user's history
    const user = await User.findById(req.user._id);
    user.generatedBios.push(...bios.slice(0, 3));
    await user.save();

    res.json({
      bios: bios.slice(0, 3),
      message: 'Bios generated successfully',
    });
  } catch (error) {
    console.error('Error generating bio:', error);
    res.status(500).json({
      message: 'Failed to generate bio',
      error: error.message
    });
  }
});

// @route   POST /api/ai/analyze-image
// @desc    Analyze image and generate caption for Instagram/Facebook posts
// @access  Private
// NOTE: Captions are friendly/engaging but still readable (light local flavor)
router.post('/analyze-image', protect, async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ message: 'Please provide an image' });
    }

    // Get the vision model
    const model = genAI.getGenerativeModel({ model: GEMINI_VISION_MODEL });

    const prompt = `Tengok gambar ni untuk post social media.

Buat:
1. Caption (2 ayat max) - Mesra, menarik, mudah faham. Boleh guna sedikit gaya tempatan tapi kekal profesional
2. Terang kenapa caption ni berkesan (1 ayat)

WAJIB: 100% Bahasa Malaysia saja, jangan guna English!

JSON: {"caption":"...", "explanation":"..."}`;

    // Remove data URL prefix if present
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const imageParts = [
      {
        inlineData: {
          data: base64Data,
          mimeType: 'image/jpeg',
        },
      },
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    let text = response.text();

    // Parse the response
    let analysisResult;
    try {
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysisResult = JSON.parse(text);
    } catch (parseError) {
      // Fallback parsing
      const captionMatch = text.match(/"caption"\s*:\s*"([^"]+)"/);
      const explanationMatch = text.match(/"explanation"\s*:\s*"([^"]+)"/);

      analysisResult = {
        caption: captionMatch ? captionMatch[1] : text.split('\n')[0],
        explanation: explanationMatch ? explanationMatch[1] : text.split('\n').slice(1).join(' '),
      };
    }

    // Save to user's history
    const user = await User.findById(req.user._id);
    user.savedCaptions.push({
      caption: analysisResult.caption,
      explanation: analysisResult.explanation,
      imageUrl: imageBase64.substring(0, 100) + '...', // Store truncated for size
    });
    await user.save();

    res.json({
      caption: analysisResult.caption,
      explanation: analysisResult.explanation,
      message: 'Image analyzed successfully',
    });
  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({
      message: 'Failed to analyze image',
      error: error.message
    });
  }
});

// @route   POST /api/ai/chat-coach
// @desc    Grade customer service reply and provide feedback
// @access  Private
// NOTE: Feedback uses FULL Sabahan dialect - this is coaching/teaching
router.post('/chat-coach', protect, async (req, res) => {
  try {
    const { scenario, userReply } = req.body;

    if (!scenario || !userReply) {
      return res.status(400).json({ message: 'Please provide scenario and user reply' });
    }

    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const prompt = `${SABAHAN_SYSTEM_INSTRUCTION}

Customer: "${scenario}"
Jawapan: "${userReply}"

Kasi grade (A-F) + 1 tip untuk improve. Guna Bahasa Malaysia penuh bah!
JSON: {"grade":"...", "feedback":"..."}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Parse the response
    let coachingResult;
    try {
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      coachingResult = JSON.parse(text);
    } catch (parseError) {
      // Fallback parsing
      const gradeMatch = text.match(/"grade"\s*:\s*"([^"]+)"/);
      const feedbackMatch = text.match(/"feedback"\s*:\s*"([^"]+)"/);

      coachingResult = {
        grade: gradeMatch ? gradeMatch[1] : 'B',
        feedback: feedbackMatch ? feedbackMatch[1] : text,
      };
    }

    res.json({
      grade: coachingResult.grade,
      feedback: coachingResult.feedback,
      message: 'Reply graded successfully',
    });
  } catch (error) {
    console.error('Error coaching chat:', error);
    res.status(500).json({
      message: 'Failed to grade reply',
      error: error.message
    });
  }
});

// @route   POST /api/ai/generate-hashtags
// @desc    Generate relevant hashtags for Instagram/Facebook posts
// @access  Private
router.post('/generate-hashtags', protect, async (req, res) => {
  try {
    const { keyword } = req.body;

    if (!keyword) {
      return res.status(400).json({ message: 'Please provide a keyword' });
    }

    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const prompt = `${SABAHAN_SYSTEM_INSTRUCTION}

10 hashtags untuk "${keyword}" (campur popular, sederhana, niche). Masukkan yang berkaitan Sabah/Malaysia.
Hashtag boleh ada English sikit, tapi kalau ada perkataan Malay lagi bagus.
JSON: ["#tag1", "#tag2", ...]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Parse the response
    let hashtags;
    try {
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      hashtags = JSON.parse(text);
    } catch (parseError) {
      // Extract hashtags manually
      const hashtagMatches = text.match(/#\w+/g);
      if (hashtagMatches) {
        hashtags = hashtagMatches.slice(0, 10);
      } else {
        hashtags = [
          '#' + keyword,
          '#Malaysia',
          '#MalaysiaBusiness',
          '#SupportLocal',
          '#MadeinMalaysia',
        ];
      }
    }

    res.json({
      hashtags: hashtags,
      message: 'Hashtags generated successfully',
    });
  } catch (error) {
    console.error('Error generating hashtags:', error);
    res.status(500).json({
      message: 'Failed to generate hashtags',
      error: error.message
    });
  }
});

// @route   POST /api/ai/chat
// @desc    General chat with Coach Digital Sabah
// @access  Private
// NOTE: Uses FULL Sabahan dialect - casual conversation with coach
router.post('/chat', protect, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Please provide a message' });
    }

    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const prompt = `${SABAHAN_SYSTEM_INSTRUCTION}

Soalan: "${message}"

Jawab 2-3 ayat jak. Guna full Bahasa Malaysia/Sabahan, jangan campur English.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      response: text,
      message: 'Chat response received',
    });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({
      message: 'Failed to get response',
      error: error.message
    });
  }
});

module.exports = router;
