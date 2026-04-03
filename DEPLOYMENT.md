# Deployment Guide

Complete guide to deploying your AI portfolio chat to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Groq API key (get FREE key at [console.groq.com/keys](https://console.groq.com/keys))
- OpenRouter API key (get FREE key at [openrouter.ai/keys](https://openrouter.ai/keys))

## Step-by-Step Deployment

### 1. Prepare Your Repository

1. **Initialize Git (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI portfolio chat"
   ```

2. **Create GitHub repository**
   - Go to [github.com/new](https://github.com/new)
   - Name it (e.g., "portfolio" or "ai-portfolio-chat")
   - Don't initialize with README (you already have one)
   - Click "Create repository"

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/jakebalbedina/portfolio.git
   git branch -M main
   git push -u origin main
   ```

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Log in with GitHub

2. **Import Repository**
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   Name: VITE_GROQ_API_KEY
   Value: gsk_... (your Groq API key)
   Environment: Production, Preview, Development
   ```

   ```
   Name: VITE_OPENROUTER_API_KEY
   Value: sk-or-v1-... (your OpenRouter API key)
   Environment: Production, Preview, Development
   ```

   **Note**: Both API keys are required. Groq is the primary provider (fast), OpenRouter is the fallback (reliable).

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Your site will be live at `your-project.vercel.app`

#### Option B: Vercel CLI (Advanced)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? **Your account**
   - Link to existing project? **N**
   - What's your project's name? **portfolio**
   - In which directory is your code located? **/**

4. **Add Environment Variables**
   ```bash
   vercel env add VITE_GROQ_API_KEY
   # Paste your Groq API key when prompted
   # Select: Production, Preview, Development

   vercel env add VITE_OPENROUTER_API_KEY
   # Paste your OpenRouter API key when prompted
   # Select: Production, Preview, Development
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### 3. Verify Deployment

1. **Check your deployed site**
   - Visit the URL provided by Vercel
   - Test the chat functionality
   - Try both light and dark modes
   - Test on mobile devices

2. **Test with questions:**
   - "Who are you?"
   - "What are your skills?"
   - "Show me your projects"
   - "How can I contact you?"

### 4. Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Example DNS Settings**
   - Type: **A**
   - Name: **@**
   - Value: **76.76.21.21**

   - Type: **CNAME**
   - Name: **www**
   - Value: **cname.vercel-dns.com**

## Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
vercel --prod
```

**Error: Environment variable not set**
```bash
# Solution: Add environment variables
vercel env add VITE_GROQ_API_KEY
vercel env add VITE_OPENROUTER_API_KEY
vercel --prod
```

### Chat Not Working

**API Key Issues**
- Verify both API keys are correct in Vercel environment variables
- Check Groq API key is valid at [console.groq.com](https://console.groq.com)
- Verify OpenRouter API key at [openrouter.ai](https://openrouter.ai)
- Both services offer FREE tier with generous limits

**Automatic Failover System**
- Primary: Groq API (ultra-fast inference)
- Retry: Up to 2 automatic retries with exponential backoff
- Fallback: OpenRouter API (if Groq fails)
- Final fallback: Graceful error message
- Check browser console for detailed error logs

### Styling Issues

**Tailwind not working**
- Ensure `tailwind.config.js` is in root directory
- Check `postcss.config.js` exists
- Verify `@tailwind` directives in `src/style.css`

## Environment Variables Reference

| Variable | Purpose | Provider | Where to Add |
|----------|---------|----------|--------------|
| `VITE_GROQ_API_KEY` | Primary AI provider (fast inference) | Groq | Vercel Dashboard |
| `VITE_OPENROUTER_API_KEY` | Fallback AI provider (reliability) | OpenRouter | Vercel Dashboard |

**How it works:**
1. **Primary**: All requests go to Groq API first (llama-3.3-70b-versatile model)
2. **Retry**: Automatic retry up to 2 times with 500ms and 1000ms delays
3. **Fallback**: If Groq fails after retries, automatically switches to OpenRouter (llama-3.2-3b-instruct:free)
4. **Seamless**: Users never see errors, conversation history is preserved across providers

## Performance Optimization

### Already Implemented
- ✅ Vite for fast builds
- ✅ Code splitting
- ✅ Lazy loading components
- ✅ Optimized images
- ✅ Minified CSS/JS

### Additional Optimizations

1. **Enable Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```

   Add to `src/main.js`:
   ```js
   import { inject } from '@vercel/analytics'
   inject()
   ```

2. **Add Vercel Speed Insights**
   ```bash
   npm install @vercel/speed-insights
   ```

   Add to `src/main.js`:
   ```js
   import { injectSpeedInsights } from '@vercel/speed-insights'
   injectSpeedInsights()
   ```

## Continuous Deployment

Once connected to GitHub, Vercel automatically:
- Deploys on every push to `main` branch
- Creates preview deployments for pull requests
- Runs builds and checks

### Workflow
```bash
# Make changes
git add .
git commit -m "Update chatbot responses"
git push

# Vercel automatically deploys!
```

## Monitoring

### Vercel Dashboard
- View deployment logs
- Monitor function invocations
- Track bandwidth usage
- Check error rates

### API Usage Monitoring
- **Groq**: Monitor usage at [console.groq.com](https://console.groq.com)
- **OpenRouter**: Track usage at [openrouter.ai/activity](https://openrouter.ai/activity)
- Both services offer FREE tier with generous limits
- Set up usage alerts to monitor consumption

## Security Best Practices

1. **Never commit `.env` file**
   - Already in `.gitignore`
   - Only use Vercel environment variables

2. **Rotate API keys regularly**
   - Generate new keys in Groq and OpenRouter dashboards
   - Update in Vercel environment variables
   - Delete old keys after verification

3. **Enable Vercel authentication** (optional)
   - Add password protection
   - Restrict access during development

## Cost Estimation

### Vercel
- **Hobby Plan**: FREE
  - 100 GB bandwidth/month
  - Unlimited deployments
  - Serverless functions

### AI APIs
- **Groq**: FREE
  - Fast inference with llama-3.3-70b-versatile
  - Generous free tier limits
  - No credit card required

- **OpenRouter**: FREE
  - Free tier with llama-3.2-3b-instruct:free model
  - Used as backup/fallback only
  - Minimal usage (only when Groq fails)

**Total Expected Cost**: $0/month 🎉
- Both Groq and OpenRouter offer generous FREE tiers
- Perfect for personal portfolios
- Automatic failover ensures reliability

## Support

If you encounter issues:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review [Groq API Docs](https://console.groq.com/docs)
3. Check [OpenRouter Documentation](https://openrouter.ai/docs)
4. View build logs in Vercel dashboard
5. Test locally first: `npm run build && npm run preview`

## Next Steps

After deployment:
1. ✅ Test all functionality
2. ✅ Share your portfolio URL
3. ✅ Add to resume and LinkedIn
4. ✅ Monitor analytics
5. ✅ Gather feedback and iterate

---

**Your portfolio is now live! 🚀**

Share it with: `https://your-project.vercel.app`
