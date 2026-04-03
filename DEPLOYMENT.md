# Deployment Guide

Complete guide to deploying your AI portfolio chat to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- OpenAI API key (get one at [platform.openai.com](https://platform.openai.com/api-keys))

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
   Name: OPENAI_API_KEY
   Value: sk-proj-... (your actual API key)
   Environment: Production, Preview, Development
   ```

   ```
   Name: VITE_OPENAI_API_KEY
   Value: sk-proj-... (same as above)
   Environment: Production, Preview, Development
   ```

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
   vercel env add OPENAI_API_KEY
   # Paste your API key when prompted
   # Select: Production, Preview, Development

   vercel env add VITE_OPENAI_API_KEY
   # Paste same API key
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
vercel env add OPENAI_API_KEY
vercel env add VITE_OPENAI_API_KEY
vercel --prod
```

### Chat Not Working

**API Key Issues**
- Verify API key is correct in Vercel environment variables
- Check OpenAI account has credits
- Ensure key has correct permissions

**Fallback Mode**
- If API fails, app automatically uses rule-based responses
- Check browser console for errors
- Verify API endpoint is accessible

### Styling Issues

**Tailwind not working**
- Ensure `tailwind.config.js` is in root directory
- Check `postcss.config.js` exists
- Verify `@tailwind` directives in `src/style.css`

## Environment Variables Reference

| Variable | Purpose | Where to Add |
|----------|---------|--------------|
| `OPENAI_API_KEY` | Backend API calls | Vercel Dashboard |
| `VITE_OPENAI_API_KEY` | Frontend build time | Vercel Dashboard |

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

### OpenAI Usage
- Monitor API usage at [platform.openai.com/usage](https://platform.openai.com/usage)
- Set usage limits to control costs
- Track token consumption

## Security Best Practices

1. **Never commit `.env` file**
   - Already in `.gitignore`
   - Only use Vercel environment variables

2. **Rotate API keys regularly**
   - Generate new key in OpenAI dashboard
   - Update in Vercel settings
   - Delete old key

3. **Enable Vercel authentication** (optional)
   - Add password protection
   - Restrict access during development

## Cost Estimation

### Vercel
- **Hobby Plan**: Free
  - 100 GB bandwidth/month
  - Unlimited deployments
  - Serverless functions

### OpenAI
- **GPT-3.5-turbo**: ~$0.002 per conversation
- **Expected**: <$5/month for personal portfolio
- **Optimization**: Use rule-based fallback for common questions

## Support

If you encounter issues:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review [OpenAI API Docs](https://platform.openai.com/docs)
3. Check build logs in Vercel dashboard
4. Test locally first: `npm run build && npm run preview`

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
