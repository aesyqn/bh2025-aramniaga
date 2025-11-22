// Convert file to base64 string
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Format number with animation (for stats)
export const animateNumber = (start, end, duration, callback) => {
  const range = end - start;
  const increment = range / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    callback(Math.floor(current));
  }, 16);
};

// Get day title and description
export const getDayInfo = (day) => {
  const days = {
    1: { title: 'Setup Profil', desc: 'Mulakan perjalanan anda' },
    2: { title: 'Bio Generator', desc: 'Jana bio menarik dengan AI' },
    3: { title: 'Analisis Gambar', desc: 'Buat caption yang "sadap"' },
    4: { title: 'Chat Coach', desc: 'Latih customer service' },
    5: { title: 'Hashtag Tool', desc: 'Cari hashtag yang ngam' },
    6: { title: 'Story Canvas', desc: 'Design Instagram Story' },
    7: { title: 'Laporan Mingguan', desc: 'Lihat progress anda!' },
  };
  return days[day] || { title: `Hari ${day}`, desc: '' };
};

// Check if day is unlocked
export const isDayUnlocked = (day, currentDay, completedDays) => {
  return day <= currentDay || completedDays.includes(day);
};

// Format date in Malay
export const formatDate = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('ms-MY', options);
};
