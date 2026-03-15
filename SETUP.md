# Setup Instructions

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher

## Local Development Setup

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser
# Document Extraction Prompts — with Guardrails

> Use these prompts in ChatGPT (or any LLM) to extract content from documents with maximum fidelity.
> Run the **QA prompt** after every extraction to verify completeness.

---

## Workflow

1. Open document in ChatGPT
2. Pick the right extraction prompt below → paste it
3. Get extraction output
4. Paste the **QA prompt** in the same chat
5. Fix any issues flagged
6. Copy final output → save as `.txt`

---

## Excel / Sheet

```
You are a document extraction assistant. Your only job is to extract content — not interpret, not summarize, not add context.

STRICT RULES — read before starting:
1. Extract EVERYTHING. Every row, every cell, every sheet.
2. Do NOT paraphrase. Do NOT summarize. Do NOT skip anything.
3. Do NOT infer or fill in blanks — if a cell is empty, leave it empty in the output.
4. Do NOT add commentary, explanations, or your own words anywhere in the extraction body.
5. If you are unsure about a cell value (blurry, ambiguous), write it as-is and flag: [UNCERTAIN: your reading]
6. If any content is cut off or you cannot fit everything in one response, stop at a clean row boundary and write: [TRUNCATED — respond with "continue" to get the next section]
7. Never silently truncate. Always flag it.

FORMAT:
- Each sheet: === SHEET: [Tab Name] === followed by row count: TOTAL ROWS: N
- Tables: | Col1 | Col2 | Col3 |
- Highlighted cells: [HIGHLIGHTED: text]
- Strikethrough: [STRIKETHROUGH: text]
- Merged cells: [MERGED: text]
- Empty cell: (blank)

After ALL sheets, output this self-check block — fill it honestly:
=== EXTRACTION SELF-CHECK ===
Sheets extracted: [list all tab names]
Total rows extracted per sheet: [Sheet name: N rows]
Anything skipped or unclear: [list or "none"]
Any content you were unsure about: [list or "none"]
Truncated: [Yes — respond "continue" / No]
Fidelity confidence: [High / Medium / Low] — reason if not High

Start extracting now.
```

---

## Word Doc

```
You are a document extraction assistant. Your only job is to extract content — not interpret, not summarize, not add context.

STRICT RULES — read before starting:
1. Extract EVERYTHING. Every section, every paragraph, every table, every list item.
2. Do NOT paraphrase. Do NOT summarize. Do NOT skip anything.
3. Do NOT infer — if text is unclear or partially visible, write it as-is and flag: [UNCERTAIN: your reading]
4. Do NOT add your own commentary anywhere in the extraction body.
5. Preserve document structure exactly: heading levels, numbered lists, indentation.
6. If content is too long for one response, stop at a clean section boundary and write: [TRUNCATED — respond with "continue" to get the next section]
7. Never silently truncate. Always flag it.

FORMAT:
- Start: DOC TITLE: [title] | DOC TYPE: [MD070 / Design Doc / Pre-read / Spec / SOP / other]
- Headings: ## Heading / ### Subheading
- Tables: | Col1 | Col2 | Col3 |
- Highlighted text: [HIGHLIGHTED: text]
- Footnotes: [FOOTNOTE: text]
- Page breaks: --- PAGE BREAK ---

After full extraction, output this self-check block — fill it honestly:
=== EXTRACTION SELF-CHECK ===
Sections extracted: [list all heading names]
Tables found and extracted: [N tables]
Anything skipped or unclear: [list or "none"]
Any content you were unsure about: [list or "none"]
Truncated: [Yes — respond "continue" / No]
Fidelity confidence: [High / Medium / Low] — reason if not High

Start extracting now.
```

---

## Slides / Presentation

```
You are a document extraction assistant. Your only job is to extract content — not interpret, not summarize, not add context.

STRICT RULES — read before starting:
1. Extract EVERY slide. Do not skip any slide including title, agenda, or "thank you" slides.
2. Do NOT paraphrase. Do NOT summarize. Do NOT merge slides together.
3. Do NOT infer — if text is unclear, write as-is and flag: [UNCERTAIN: your reading]
4. Do NOT add your own commentary anywhere in the extraction body.
5. If content is too long for one response, stop at a clean slide boundary and write: [TRUNCATED — respond with "continue" to get the next section]
6. Never silently truncate. Always flag it.

FORMAT:
- Each slide: === SLIDE [N] of [TOTAL]: [Title] ===
- All bullets, sub-bullets, footnotes, speaker notes — preserve indentation
- Diagrams / process flows: extract as numbered steps with arrow notation (Step 1 → Step 2)
- Tables: | Col1 | Col2 | Col3 |
- Emphasized text: [EMPHASIS: text]
- Animations/builds (if visible): [BUILD: text appeared separately]

After all slides, output this self-check block — fill it honestly:
=== EXTRACTION SELF-CHECK ===
Total slides in deck: [N]
Slides extracted: [N]
Slides skipped (if any): [list or "none"]
Diagrams found: [N — extracted as steps / could not extract: reason]
Anything unclear or uncertain: [list or "none"]
Truncated: [Yes — respond "continue" / No]
Fidelity confidence: [High / Medium / Low] — reason if not High

Start extracting now.
```

---

## Any Doc (Generic)

```
You are a document extraction assistant. Your only job is to extract content — not interpret, not summarize, not add context.

STRICT RULES — read before starting:
1. Extract EVERYTHING. No exceptions.
2. Do NOT paraphrase. Do NOT summarize. Do NOT skip anything.
3. Do NOT infer — if any content is unclear, write as-is and flag: [UNCERTAIN: your reading]
4. Do NOT add your own commentary anywhere in the extraction body.
5. Preserve all structure: sections, tables, lists, numbered steps, flows.
6. Preserve all values exactly: numbers, codes, percentages, dates, names, account codes.
7. If content is too long for one response, stop at a clean boundary and write: [TRUNCATED — respond with "continue" to get the next section]
8. Never silently truncate. Always flag it.

FORMAT:
- Tables: | Col1 | Col2 | Col3 |
- Highlighted: [HIGHLIGHTED: text]
- Strikethrough: [STRIKETHROUGH: text]
- Uncertain reading: [UNCERTAIN: text]
- Empty fields: (blank)

After full extraction, output this self-check block — fill it honestly:
=== EXTRACTION SELF-CHECK ===
Document type identified: [questionnaire / design doc / pre-read / spec / matrix / SOP / other]
Sections / sheets / slides extracted: [list]
Tables found and extracted: [N]
Anything skipped or unclear: [list or "none"]
Truncated: [Yes — respond "continue" / No]
Fidelity confidence: [High / Medium / Low] — reason if not High

After the self-check, also output:
KEY TOPICS COVERED: [list]
SYSTEMS / TOOLS MENTIONED: [list]
MARKETS / COUNTRIES MENTIONED: [list]
PEOPLE / TEAMS MENTIONED: [list]
KEY DECISIONS OR RULES FOUND: [list]
OPEN QUESTIONS / TBDs: [list]

Start extracting now.
```

---

## QA Verify — run this after extraction in the same chat

```
Now verify the extraction you just produced. Do not re-extract — only audit what you already output.

Check each of the following and answer honestly:

1. COMPLETENESS
   - Did you extract every sheet / section / slide?
   - Did you extract every row of every table? Or did any table get cut short?
   - Are there any sections you skipped because they seemed repetitive or unimportant?
   → Answer: Complete / Incomplete — list what is missing

2. FIDELITY
   - Did you paraphrase or summarize anything instead of extracting verbatim?
   - Did you merge or combine any rows, cells, or bullets that were separate in the source?
   - Did you add any words, labels, or context that were not in the original document?
   → Answer: Faithful / Issues found — describe them

3. TRUNCATION
   - Is the extraction complete or was anything cut off?
   - If truncated: where did it stop and what remains?
   → Answer: Complete / Truncated at [location] — [what remains]

4. UNCERTAIN VALUES
   - List any values you were unsure about (numbers, names, codes, dates)
   - If you did not flag any uncertainties, confirm: were there truly none, or did you guess silently?
   → Answer: [list of uncertain items or "none — all values were clear"]

5. OVERALL CONFIDENCE
   - On a scale of High / Medium / Low — how confident are you that this extraction is complete and accurate?
   - If Medium or Low: what would make it High?
   → Answer: [confidence level] — [reason]

Output format:
=== QA REPORT ===
1. Completeness: ...
2. Fidelity: ...
3. Truncation: ...
4. Uncertain values: ...
5. Overall confidence: ...

Action required (if any): [what I should ask you to redo or clarify]
```

---

## Flag Reference

| Flag | Meaning |
|------|---------|
| `[UNCERTAIN: text]` | Extraction was unclear / ambiguous |
| `[HIGHLIGHTED: text]` | Cell/text was highlighted in source |
| `[STRIKETHROUGH: text]` | Text had strikethrough formatting |
| `[MERGED: text]` | Merged cell in Excel |
| `[EMPHASIS: text]` | Bold / large / colored emphasis |
| `[FOOTNOTE: text]` | Footnote in document |
| `[BUILD: text]` | Animation build on slide |
| `[TRUNCATED — respond with "continue"]` | Response hit limit, more content remains |
| `(blank)` | Empty cell / field |
4. **Navigate the demo**
   - Start at the homepage (Attestation Form)
   - Check the logging attestation and click "Attest"
   - View compliance results on POA Page 1
   - Click "Explain Non-Compliance" to see detailed analysis
   - Explore the graphs, logs, and policy-as-code pages

## Build for Production (GitHub Pages)

1. **Update `next.config.js`** 
   
   Change `basePath` to match your GitHub repository name:
   ```javascript
   basePath: '/your-repo-name',  // e.g., '/policy-as-graph-demo'
   ```

2. **Build the static site**
   ```bash
   npm run build
   ```
   
   This creates an `out/` directory with all static files

3. **Test the build locally**
   ```bash
   # Install a simple HTTP server
   npm install -g serve
   
   # Serve the static build
   serve out
   ```

4. **Deploy to GitHub Pages**
   
   **Option A: GitHub Actions (Recommended)**
   
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [main]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: 18
             
         - name: Install dependencies
           run: npm ci
           
         - name: Build
           run: npm run build
           
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```
   
   **Option B: Manual Deployment**
   
   ```bash
   # Build the site
   npm run build
   
   # Push the out/ directory to gh-pages branch
   npm install -g gh-pages
   gh-pages -d out
   ```

5. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - Click Save

6. **Access your site**
   - URL: `https://[username].github.io/[repo-name]/`

## Troubleshooting

### Issue: "Module not found" errors

**Solution**: Ensure all dependencies are installed
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Blank page after deployment

**Solution**: Check `basePath` in `next.config.js` matches your repo name

### Issue: Graph not rendering

**Solution**: This is a client-side component using Canvas. Ensure JavaScript is enabled in browser.

### Issue: Build fails with TypeScript errors

**Solution**: Run TypeScript check
```bash
npx tsc --noEmit
```

Fix any type errors reported.

## Performance Optimization

For production, consider:

1. **Minimize basePath updates** - Use environment variables
   ```javascript
   basePath: process.env.NODE_ENV === 'production' ? '/policy-as-graph-demo' : '',
   ```

2. **Add loading states** - Especially for graph rendering

3. **Optimize graph rendering** - For very large graphs (100+ nodes), consider:
   - WebGL-based rendering (e.g., sigma.js)
   - Graph virtualization
   - Progressive loading

## Development Tips

1. **Hot reload works** - Changes to pages auto-refresh

2. **Data changes require browser refresh** - Changes to JSON files in `/data` need manual refresh

3. **Graph debugging** - Open browser DevTools → Console to see graph render logs

4. **Policy engine testing** - Check console for evaluation results

## File Structure Reference

```
/
├── data/                    # Static data (policies, graphs, logs)
├── src/
│   ├── pages/              # Next.js pages (routes)
│   ├── components/         # React components
│   ├── lib/                # Business logic (policy engine)
│   ├── types/              # TypeScript types
│   └── styles/             # Global styles
├── public/                 # Static assets (if any)
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Customization Guide

### Add a new policy

1. Create `/data/policies/techXX_XX.json` with same structure as `tech05_01.json`
2. Create graphs in `/data/graphs/`
3. Update policy engine in `src/lib/policyEngine.ts` to add new rules
4. Create new page(s) or update existing ones

### Add new graph relationships

Edit `/data/graphs/*.json` and add new edges with appropriate types:
- `relate_to`, `mention`, `hyperlink_to`, `mention_in_context`, `maps_to`
- `has_section`, `has_requirement`, `requires`, `evidenced_by`, `violated_by`, `supported_by`

### Modify UI styling

Edit `src/styles/globals.css` for global styles or add inline styles in components.

### Change graph colors

Edit `GraphViewer.tsx` → `colorMap` object to change node colors by type.

## Support

For issues or questions:
1. Check this setup guide
2. Review README.md for architecture details
3. Check DEMO_SCRIPT.md for usage examples
4. Open an issue on GitHub (if applicable)
