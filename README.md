# DevTriage AI  
**An AI-powered Skill-Based Ticket Routing & Developer Assistance Agent**

##  Overview
DevTriage AI is an **enterprise-grade AI agent** designed to assist software development teams.  
It helps developers when they’re stuck by **analyzing their issue**, **assigning a priority**, **extracting required skills**, **matching them with the right moderator**, and **generating solution guidance**.

It acts like an **AI Project Manager / Mentor Coordinator**, reducing manual triage work and improving productivity across the team.

---

##  Why DevTriage AI?
Developers often get stuck and don’t know whom to ask.  
Mentors may be available—but finding the *right one* takes time.  
Traditional ticket systems lack **intelligence**.

>  **DevTriage AI solves this problem using AI-powered ticket analysis & skill-based assignment.**  
It bridges the gap between **struggling developers** and **experienced mentors** using AI.

---

##  Features

###  AI-Powered Ticket Processing
- Automatic ticket **categorization**
- Smart **priority prediction** (High / Medium / Low)
- AI-driven **skill extraction**
- AI-generated **helpful solution notes**

###  Smart Moderator Assignment
- Matches required skills with moderator profiles  
- Generates **matching score**  
- Automatically **assigns the best moderator**  
- Sends an **email notification** to assigned moderator  
- Falls back to **admin** if no suitable moderator found

###  User Management & Roles
| Role | Permissions |
|------|-------------|
| **User (Developer)** | Creates tickets when stuck |
| **Moderator (Mentor)** | Receives issues based on skill match |
| **Admin** | Manages skills, roles & user profiles |

###  Background Job Handling
- Event-driven workflow using **Inngest**
- Mailing system via **Nodemailer + Mailtrap**
- Asynchronous ticket processing

---

##  Tech Stack

| Area | Technology |
|------|------------|
| Backend | Node.js + Express |
| Database | MongoDB |
| Authentication | JWT |
| AI | Google Gemini API |
| Background Jobs | Inngest |
| Email | Nodemailer + Mailtrap |
| Development | Nodemon |

---

##  Project Structure
```
devtriage-ai/
    ├── backend/
    │   ├── index.js
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── controllers/
    │   │   ├── ticket.js
    │   │   └── user.js
    │   ├── inngest/
    │   │   ├── client.js
    │   │   └── functions/
    │   │       ├── on-signup.js
    │   │       └── on-ticket-create.js
    │   ├── middlewares/
    │   │   └── auth.js
    │   ├── models/
    │   │   ├── ticket.js
    │   │   └── user.js
    │   ├── routes/
    │   │   ├── ticket.js
    │   │   └── user.js
    │   └── utils/
    │       ├── ai.js
    │       └── mailer.js
    └── frontend/
        ├── README.md
        ├── eslint.config.js
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── vite.config.js
        ├── .gitignore
        ├── public/
        └── src/
            ├── App.jsx
            ├── index.css
            ├── main.jsx
            ├── assets/
            ├── components/
            │   ├── check-auth.jsx
            │   └── navbar.jsx
            └── pages/
                ├── admin.jsx
                ├── login.jsx
                ├── signup.jsx
                ├── ticket.jsx
                └── tickets.jsx
```

##  .env Configuration

Create a `.env` file with the following values:

MONGO_URI=
JWT_SECRET=
MAILTRAP_SMTP_HOST=
MAILTRAP_SMTP_PORT=
MAILTRAP_SMTP_USER=
MAILTRAP_SMTP_PASS=
GEMINI_API_KEY=
APP_URL=http://localhost:3000

##  Getting Started

###  Clone the Repo
```bash
git clone https://github.com/yourusername/devTriageAI.git
cd devTriageAI

nstall Dependencies
npm install

Setup Environment

Create .env file (use example above)

Run Project
npm run dev   # using nodemon
````

##  Future Enhancements
Moderator performance metrics

AI-based code debugging

Learning recommendations

Analytics dashboard

Multi-language support

AI code-execution tools



