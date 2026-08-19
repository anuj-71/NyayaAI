NyayaAI backend

Quickstart (macOS / Linux):

1. Create and activate a virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

2. Install requirements

```bash
pip install -r requirements.txt
```

3. Run the FastAPI server (from the `backend` folder)

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

4. In the frontend, set the API base url (optional). Create a `.env` file in project root with:

```
VITE_API_BASE_URL=http://localhost:8000
```

Then run the frontend:

```bash
npm install
npm run dev
```

Notes:
- The backend accepts a file upload at `/audit` and an explainability endpoint at `/explain/{decision_id}`.
- CORS is enabled for development; restrict origins in production.
