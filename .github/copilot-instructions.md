# Copilot Project Instructions — adgenai

These instructions guide GitHub Copilot (and contributors) toward consistent, secure, and maintainable code for **adgenai**.

> TL;DR for Copilot:
> - Prefer **Python 3.11**, **FastAPI**, **Pydantic v2**, **SQLModel** over raw SQL, and **pytest** for tests.
> - Frontend (if needed) is **TypeScript + Next.js 14 (App Router)** with **TailwindCSS**.
> - Follow the patterns below. Never invent secrets, keys, or environment variables that aren’t listed here.

---

## 1) Project context

- **Purpose:** Generate and evaluate ad creatives (text + optional images) with prompt templates, variants, A/B evaluation, and metadata.
- **High-level modules:**
  - `app/` – FastAPI app (routes, services, models)
  - `app/services/generation.py` – model/prompt interfacing
  - `app/services/eval.py` – scoring & heuristics
  - `app/db/` – SQLModel models & CRUD
  - `app/core/` – settings, logging, security
  - `web/` – Next.js 14 UI (if present)
  - `tests/` – pytest suites
- **Data:** Ad copy (headline, body, CTA), audience targets, campaign metadata, generation configs, evaluation scores.

---

## 2) Tech stack & versions

**Backend**
- Python **3.11**
- FastAPI **>=0.111**
- Pydantic **v2**
- SQLModel **>=0.0.16** with SQLite or Postgres via SQLAlchemy 2.x
- httpx for outbound HTTP
- loguru for structured logging
- pytest + pytest-asyncio; coverage via `pytest --cov=app`

**Frontend (when touched)**
- TypeScript **5.x**
- Next.js **14** (App Router)
- TailwindCSS **3.x**
- Zustand for light state; no Redux unless state gets complex

**Infra/dev**
- Ruff for lint/format (`ruff check --fix && ruff format`)
- uv or pip-tools for locking deps
- Docker for local runs (optional)

---

## 3) Coding conventions

**Python**
- Use type hints everywhere. Enable `from __future__ import annotations` if helpful.
- Prefer `@router.get/post/...` with explicit response models.
- Keep functions ≤ 40–50 lines; extract helpers where needed.
- Use dependency injection for services (FastAPI `Depends`).
- Errors: raise `HTTPException(status_code=..., detail="...")` at the edges; internally use custom exceptions in `app/core/errors.py`.

**Models**
- Define domain models with SQLModel; separate request/response DTOs via Pydantic if shapes diverge.
- Add `created_at`, `updated_at` (UTC, server-set) where relevant.

**Logging**
- Use `loguru` with structured fields: `logger.info("generated_variant", campaign_id=..., model=..., latency_ms=...)`.

**Async**
- Prefer async routes (`async def`) and async DB I/O where possible.

**Frontend**
- Use server components by default; client components only when stateful/interactive.
- Co-locate component styles. Keep components small and composable.

---

## 4) Prompting & model calls

- Keep prompts in **versioned templates** under `app/prompts/`.
- Provide **few-shot** examples when useful; keep total tokens reasonable.
- **Never** hardcode API keys or model names; read from `Settings` (see below).
- Return a **structured schema** (JSON) from the model when feasible, then validate with Pydantic.

**Do**
```py
output = await llm.generate_text(
    template="headline_v1.j2",
    variables={"product": product_name, "tone": tone},
)
data = HeadlineVariant.model_validate_json(output.json)
```

**Don’t**

```py
# Hardcoded key / magic strings
openai.api_key = "sk-..."
model = "whatever-latest"
```

---

## 5) Configuration & secrets

All configuration is centralized in `app/core/settings.py`:

```py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ENV: str = "local"
    DATABASE_URL: str = "sqlite:///./var/app.db"
    PROVIDER: str = "openai"  # or "bedrock", "vertex"
    OPENAI_API_KEY: str | None = None
    OPENAI_MODEL: str = "gpt-4o-mini"
    TIMEOUT_S: int = 30

    model_config = {
        "env_file": ".env",
        "extra": "ignore",
    }

settings = Settings()
```

**Copilot:** Only reference the fields above. If a new variable is required, add it to `Settings` first and document it in `README.md`.

---

## 6) Security & privacy

* **PII:** Ad copy can include user-provided data. Treat all payloads as sensitive.
* **No secrets in code or tests.** Use `.env`, GitHub Actions secrets, or local dev overrides.
* **Rate limiting:** Expose a simple token bucket or per-API key limiter in `app/core/ratelimit.py` (if touching external endpoints).
* **Validation:** Validate all external inputs with Pydantic models; strip/escape HTML where necessary.
* **Logging:** Do not log raw tokens, API keys, or full prompts with user PII. Log hashes or redacted forms.

---

## 7) Data & DB patterns

* Default to **soft deletes** (`deleted_at`) for user-generated content.
* Wrap multi-step writes in transactions.
* Provide CRUD via repository pattern (`app/db/repo_*.py`), keeping routes thin.

---

## 8) Testing

* **pytest** with **async tests** where needed.
* Unit tests for services; API tests using FastAPI `AsyncClient`.
* Mock external LLM calls with fakes in `tests/fakes/llm.py`.
* Target **≥85% coverage** for changed lines in PRs.
* Example:

```py
@pytest.mark.asyncio
async def test_generate_headline_ok(llm_fake, client):
    resp = await client.post("/v1/generate/headline", json={...})
    assert resp.status_code == 200
    data = resp.json()
    assert "headline" in data
```

---

## 9) Git & PR hygiene

* Conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `chore:`, `docs:`.
* Small, focused PRs. Include a brief “Why” in the description.
* Update or add tests for behavior changes.
* Run `ruff check --fix && ruff format && pytest`.

---

## 10) UI/UX (if editing web/)

* Accessible by default (semantic HTML, labels, focus states).
* Components in `web/app/(marketing)/...` or `web/app/(app)/...`.
* Copy is concise; prefer explicit labels over placeholders.

---

## 11) Example file layout for new features

```
app/
  routes/
    v1_generation.py         # FastAPI router
  services/
    generation.py            # Core logic
  prompts/
    headline_v1.j2           # Jinja2 prompt template(s)
  db/
    models.py                # SQLModel entities
    repo_generation.py       # CRUD/repo
  core/
    settings.py              # Config
    logging.py               # Log setup
tests/
  test_generation_api.py
  fakes/llm.py
```

---

## 12) Things Copilot must avoid

* ❌ Creating env vars or config keys that aren’t in `Settings`.
* ❌ Suggesting plaintext secrets, tokens, or hard-coded API URLs with keys.
* ❌ Mixing sync & async DB patterns in the same module.
* ❌ Auto-migrating schemas without an explicit migration step (e.g., Alembic).

---

## 13) Ready-made snippets Copilot can reuse

**FastAPI route skeleton**

```py
from fastapi import APIRouter, Depends
from app.services.generation import GenerationService, get_service
from app.schemas import GenerateRequest, GenerateResponse

router = APIRouter(prefix="/v1/generate", tags=["generation"])

@router.post("/headline", response_model=GenerateResponse)
async def generate_headline(req: GenerateRequest, svc: GenerationService = Depends(get_service)):
    return await svc.generate_headline(req)
```

**Service skeleton**

```py
class GenerationService:
    def __init__(self, llm, repo):
        self.llm = llm
        self.repo = repo

    async def generate_headline(self, req: GenerateRequest) -> GenerateResponse:
        # prepare prompt from template
        # call llm with timeout from settings
        # validate output with Pydantic
        # persist variant via repo
        # return response DTO
        ...
```

---

By following this document, Copilot should propose code that matches our patterns, is secure by default, and is easy to maintain.