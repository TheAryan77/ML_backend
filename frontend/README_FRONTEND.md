# Energy Analytics AI - Frontend

Modern React frontend for ML-powered energy monitoring and anomaly detection.

## Features

- 🎨 Modern UI with white & orange theme
- ⚡ Real-time energy data analysis
- 🎯 Cluster-based pattern recognition
- 🔍 Anomaly detection with detailed insights
- 📱 Fully responsive design

## Getting Started

### Prerequisites

- Node.js 16+ installed
- Backend server running (see backend folder)

### Installation

```bash
cd frontend
npm install
```

### Configuration

1. Copy `.env.example` to `.env`
2. Update `VITE_API_URL` with your backend URL:
   - Local: `http://localhost:8001`
   - Production: Your deployed backend URL

### Running Locally

```bash
npm run dev
```

The app will run on `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

## Deployment

### Deploy to Vercel/Netlify

1. Push your code to GitHub
2. Connect your repository to Vercel or Netlify
3. Set environment variable:
   - `VITE_API_URL`: Your deployed backend URL
4. Deploy!

### Important: Update CORS

Make sure your backend allows requests from your frontend domain. Update the CORS settings in `backend/main.py`:

```python
allow_origins=["https://your-frontend-domain.com"]
```

## API Integration

The frontend connects to these backend endpoints:

- `POST /predict/all` - Get cluster and anomaly predictions
- `GET /health/` - Check backend health

## Tech Stack

- React 18
- Vite
- Axios for API calls
- Modern CSS with animations

## Color Theme

- Primary Orange: `#ff6b35`
- Secondary Orange: `#ff8c42`
- White/Light backgrounds
- Clean, professional design
