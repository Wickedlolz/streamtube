# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within StreamTube, please send an email to viktor.dimitrov.dev@gmail.com. All security vulnerabilities will be promptly addressed.

## Supported Versions

Currently supported versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Security Best Practices

### Environment Variables

**CRITICAL**: Never commit sensitive environment variables to version control.

1. **Server-side only variables** (API routes, server components):

   - Do NOT prefix with `NEXT_PUBLIC_`
   - Examples: `EMAIL_USER`, `EMAIL_PASS`, database credentials

2. **Client-side variables** (accessible in browser):
   - Must be prefixed with `NEXT_PUBLIC_`
   - Examples: `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_TMDB_BASE_URL`
   - Note: These are visible to end users

### API Security

1. **Rate Limiting**: Consider implementing rate limiting for API routes
2. **Input Validation**: All user inputs are validated using Zod schemas
3. **CORS**: Next.js API routes have built-in CORS protection
4. **Authentication**: Firebase Authentication is used for user management

### Image Security

- Remote images are restricted to trusted domains only (TMDB, Google, Placeholder)
- All image URLs use HTTPS protocol
- Next.js Image component provides automatic optimization and security

### Authentication

- Firebase Authentication handles all user authentication
- Passwords are never stored directly (managed by Firebase)
- Use App Passwords for Gmail integration, not regular passwords

### Data Protection

1. **User Data**: Stored in Firestore with proper security rules
2. **Session Management**: Handled by Firebase Auth
3. **HTTPS**: Always use HTTPS in production

## Known Limitations

1. Firebase API keys are public by design (protected by Firebase Security Rules)
2. TMDB API tokens have limited access and are safe to expose client-side

## Security Checklist for Deployment

- [ ] All sensitive env variables are server-side only
- [ ] `.env.local` is in `.gitignore`
- [ ] HTTPS is enforced in production
- [ ] Firebase Security Rules are properly configured
- [ ] Gmail uses App Password (not regular password)
- [ ] Image domains are restricted in `next.config.ts`
- [ ] Regular dependency updates via `npm audit`

## Contact

For security concerns, contact: viktor.dimitrov.dev@gmail.com
