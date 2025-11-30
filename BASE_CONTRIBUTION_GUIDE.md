# Contributing to base/web Repository

## Quick Start Guide for Simple Fixes

### Step 1: Fork and Clone
```bash
# Go to https://github.com/base/web
# Click "Fork" button (top right)
# Then clone YOUR fork:
git clone https://github.com/YOUR_USERNAME/web.git base-web
cd base-web
```

### Step 2: Set Up Upstream
```bash
git remote add upstream https://github.com/base/web.git
git fetch upstream
```

### Step 3: Create a Branch
```bash
git checkout -b fix/issue-number-description
# Example: git checkout -b fix/2606-broken-link
```

---

## Easy Issues to Tackle

### 🎯 Issue #2606: Broken Link on Prospective Members Page
**Status:** Open, No PRs yet  
**Type:** Documentation fix  
**Difficulty:** Very Easy

**What to do:**
1. Search for "Prospective members" or "About the CTC" in the codebase
2. Find the broken link
3. Update it to the correct URL
4. Test locally

**Expected files to check:**
- `apps/web/src/pages/**/*.tsx`
- `apps/web/src/components/**/*.tsx`

---

### 🎯 Alternative: Look for Typos & Documentation Improvements

**Search strategy:**
```bash
# In the base-web directory:
grep -r "TODO" apps/web/src/
grep -r "FIXME" apps/web/src/
```

---

## Making Your Contribution

### 1. Make Changes
Edit the files with fixes (typos, broken links, etc.)

### 2. Commit Your Changes
```bash
git add .
git commit -m "fix: broken link on Prospective members page

Fixes #2606"
```

### 3. Push to Your Fork
```bash
git push origin fix/2606-broken-link
```

### 4. Create Pull Request
1. Go to `https://github.com/YOUR_USERNAME/web`
2. Click "Compare & pull request"
3. Write a clear description:
   - What issue you're fixing
   - What changes you made
   - Reference the issue number: `Fixes #2606`

---

## Tips for Getting Your PR Accepted

✅ **DO:**
- Keep changes minimal (only fix what's needed)
- Reference the issue number in commit message
- Test your changes locally
- Follow existing code style
- Be polite and patient

❌ **DON'T:**
- Make unrelated changes in the same PR
- Change code formatting unnecessarily
- Submit without testing

---

## Example PR Description Template

```markdown
## Description
Fixes broken link on the Prospective members page as reported in #2606

## Changes Made
- Updated link in `apps/web/src/components/XYZ.tsx`
- Changed from: `[incorrect URL]`
- Changed to: `[correct URL]`

## Testing
- [x] Clicked link and verified it works
- [x] No broken references

Fixes #2606
```

---

## Next Steps

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Search for the issue** (#2606 - broken link)
4. **Make the fix** (usually 1-2 lines)
5. **Submit PR** with clear description

Good luck with your contribution! 🚀
