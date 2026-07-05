# PostpartumRecovery - Community Platform

A beautiful, warm, and supportive web platform where postpartum moms can connect, share activities, and support each other through their recovery journey.

## ✨ Features

- **👭 Group Chats**: Join topic-based group discussions for postpartum recovery, yoga, exercise, mental health, and more
- **🧘 Activities**: Browse and join postpartum activities like yoga classes, walks, picnics, exercise classes, and support groups
- **🤝 Help & Support**: Request help (meals, childcare, cleaning, errands) and offer support to other moms in your community
- **👶 Babysitter Directory**: Find and connect with trusted babysitters in your community
- **💫 Warm, Pastel Design**: Beautiful, inviting interface with warm pastel colors designed for comfort and community

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with React and TypeScript
- **Styling**: Tailwind CSS with custom warm pastel color palette
- **Icons**: Lucide React
- **Deployment**: Vercel (free tier supported)

## 🚀 Quick Start

### Local Development

1. **Clone/Download the project**
   ```bash
   cd postpartum-recovery-simple
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Go to [http://localhost:3000](http://localhost:3000)

## 📦 Deploy to Vercel (Free!)

The easiest way to deploy your app - takes less than 2 minutes!

### Option 1: Connect GitHub (Recommended)

1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Click "Deploy"
6. Done! Your app is live 🎉

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts and your app will be live!

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Home/landing page
│   ├── app/
│   │   └── page.tsx          # Main application dashboard
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── lib/
│   └── mockData.ts           # Mock data for all features
├── components/               # Reusable components (future expansion)
├── public/                   # Static files
├── tailwind.config.ts        # Tailwind configuration
└── package.json              # Dependencies
```

## 🎨 Features Demo

The app includes sample data for:

- **4 Community Groups** with different topics
- **4 Activities** ranging from yoga to park walks
- **4 Help Requests** showing different types of support
- **3 Babysitters** with verified profiles

Navigate using the tabs at the top to explore all features!

## 🌈 Color Palette

The design uses warm, pastel colors designed to create a comforting atmosphere:

- **Primary**: Warm Sage/Taupe (#a89b86)
- **Secondary**: Pastel Pink (#e8c9c9)
- **Accent**: Soft Peach (#e6d1c1)
- **Background**: Cream (#f5e6d3)

## 🚀 Next Steps for Enhancement

To add real functionality, you could:

1. **Add a Backend**: Connect to a database (PostgreSQL, MongoDB, Firebase)
2. **User Authentication**: Add login/signup functionality
3. **Real-time Chat**: Integrate WebSockets for live messaging
4. **Email Notifications**: Send updates to community members
5. **Payments**: Add babysitter booking with payments
6. **Mobile App**: Use React Native to create iOS/Android apps

## 📝 Notes

- This is a prototype with mock data - perfect for demos and testing the concept
- All data is stored locally in the browser (refreshing clears it)
- To make changes permanent, you'll need to connect a database backend

## 🙌 Support

For questions about deploying or using this app, feel free to reach out!

---

**Made with 💚 for postpartum moms everywhere**
