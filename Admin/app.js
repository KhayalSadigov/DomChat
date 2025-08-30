// Şəkili Base64-ə çevirən funksiya
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const file = document.getElementById("photo").files[0];

  if (!file) {
    alert("Please select a photo");
    return;
  }

  // Şəkili Base64-ə çevir
  const base64Photo = await toBase64(file);

  // API-ə göndəriləcək data
  const data = {
    title,
    description,
    photo: base64Photo
  };

  // Burada API linkini öz linkinlə əvəz et
  const API_URL = "http://localhost:3300/api/tricks";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("Server response:", result);
    alert("Data sent successfully!");
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to send data!");
  }
});
