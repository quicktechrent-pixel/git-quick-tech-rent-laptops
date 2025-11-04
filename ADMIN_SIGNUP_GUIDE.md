# Admin Sign Up Page - Testing Guide

## Overview
The Admin Sign Up page is now fully functional with validation and integration with the Supabase backend.

## Access the Page
Navigate to: `/admin/signup` or click "Sign up as regular user" link from the admin login page.

## Demo Credentials

### Admin Secret Code
Use the following code to create an admin account:
```
ADMIN2024TECH
```

### Test Admin Account
To test the admin signup flow:
1. Fill in your details:
   - Name: Your full name
   - Email: admin@example.com (or any email)
   - Phone: +1 (555) 000-0000 (optional)
   - Admin Code: **ADMIN2024TECH**
   - Password: minimum 6 characters
   - Confirm Password: must match password

2. Click "Create Admin Account"
3. You'll be automatically logged in and redirected to the admin panel

## Features

### Form Validation
- ✅ Password must be at least 6 characters
- ✅ Passwords must match
- ✅ Admin code verification
- ✅ Email uniqueness check
- ✅ All required fields validation

### Security
- Admin secret code required (prevents unauthorized admin account creation)
- Password confirmation
- Email validation
- Duplicate email prevention

### User Experience
- Loading states with spinner
- Clear error messages
- Helpful hints and instructions
- Automatic navigation after signup
- Link to admin login for existing users

## API Integration
The page integrates with:
- `usersService.getByEmail()` - Check for existing users
- `usersService.create()` - Create new admin user
- Role is automatically set to 'admin'

## Production Notes
⚠️ In production, the admin code verification should be done server-side for security.

## Testing Checklist
- [ ] Form displays correctly
- [ ] Password validation works
- [ ] Admin code validation works
- [ ] Error messages display properly
- [ ] Loading state shows during signup
- [ ] Successful signup redirects to admin panel
- [ ] User is logged in after signup
- [ ] Duplicate email check works
