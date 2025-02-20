# 💱 Currency Converter

A modern currency converter app built with **Next.js** that allows users to convert currencies in real-time and view exchange rates.

## ✨ Features
- ✅ **Real-time currency conversion**
- 🔄 **Swap currencies easily**
- 📊 **View latest exchange rates**
- 🕘 **Recent conversion history (stored in local storage)**
- 🌍 **Filters & Sorting** for exchange rates (Popular, Exotic, A-Z, Value, etc.)
- 🛡 **Secure API keys using `.env` file**

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/YOUR_USERNAME/currency-converter.git
cd currency-converter
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env.local` file in the root of the project and add the following:
```env
NEXT_PUBLIC_EXCHANGE_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=https://v6.exchangerate-api.com/v6
```
> Replace `your_api_key_here` with your actual API key.

### 4️⃣ Run the App
```sh
npm run dev
```
Now open **[http://localhost:3000](http://localhost:3000)** in your browser.

## 🛠 Technologies Used
- **Next.js** – React framework for SSR and static generation
- **Tailwind CSS** – For modern UI styling
- **Axios** – For fetching exchange rates from API
- **ExchangeRate-API** – Provides real-time currency conversion
- **LocalStorage** – Stores recent conversions

## 🌍 Deployment
To deploy, use **Vercel** (recommended for Next.js apps):
```sh
npm run build
vercel deploy
```

## 📌 Roadmap (Future Enhancements)
- 🌐 **Multi-language support**
- 📈 **Historical exchange rate charts**
- 🔔 **Notifications for significant rate changes**

## 📞 Contact
For any inquiries, feel free to reach out:
- **GitHub Issues** – [Report bugs or suggest features](https://github.com/kostyantyn94)
- **Email** – kostynatyn.karimov@gmail.com

---

Made with ❤️ by [Kostyantyn Karimov](https://github.com/kostyantyn94) 🚀