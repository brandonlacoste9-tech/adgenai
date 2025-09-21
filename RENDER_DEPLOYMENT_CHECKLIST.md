# AdGenAI Render Deployment Checklist

## 1. Project Location
- [ ] Confirm **AdGenAI** project is under the **brandonlacoste9-tech** Render account.
- [ ] Verify it is linked to the correct GitHub repo: [brandonlacoste9-tech/adgenai](https://github.com/brandonlacoste9-tech/adgenai).

## 2. Deployment Configuration
- [ ] Ensure the **main branch** is connected to the Render service.
- [ ] Confirm Render service type is **Web Service**.

## 3. Domain & SSL
- [ ] Make sure **adgenai.ca** is listed under Domains in Render.
- [ ] DNS for **adgenai.ca** points to Render’s addresses.
- [ ] SSL is enabled (padlock/“Secure” in browser).

## 4. Environment Variables
- [ ] Double-check all required environment variables (API keys, DB URLs, etc.) are set in the Render dashboard.

## 5. Deployment & Testing
- [ ] Trigger deployment if not already running.
- [ ] Monitor build logs for errors/warnings.
- [ ] Visit [https://adgenai.ca](https://adgenai.ca) after deployment:
    - [ ] SSL active
    - [ ] Navigation, login, and core features work

## 6. Status Update
- [ ] Notify **Brandon** (or project lead) when deployment is live.
- [ ] Report any issues immediately.

---

_Once all boxes are checked, your app should be live and ready!_